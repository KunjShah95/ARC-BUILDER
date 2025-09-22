import os
import jwt
import requests
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from fastapi import HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()


# Initialize Supabase client
def get_supabase_client() -> Client:
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if (
        not supabase_url
        or not supabase_key
        or supabase_url == "your_supabase_project_url_here"
    ):
        raise HTTPException(
            status_code=500,
            detail="Supabase configuration missing. Please check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
        )

    return create_client(supabase_url, supabase_key)


# Security scheme
security = HTTPBearer()


class AuthService:
    def __init__(self):
        try:
            self.supabase = get_supabase_client()
            self.supabase_configured = True
        except HTTPException:
            print(
                "⚠️  Supabase not configured. Authentication features will be limited."
            )
            self.supabase = None
            self.supabase_configured = False

        self.jwt_secret = os.getenv("JWT_SECRET", "your-secret-key")
        self.jwt_algorithm = "HS256"
        self.jwt_expiration_hours = 24

    async def verify_supabase_token(self, token: str) -> Dict[str, Any]:
        """Verify Supabase JWT token and return user data"""
        if not self.supabase_configured:
            raise HTTPException(
                status_code=503,
                detail="Supabase not configured. Please set up SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
            )

        try:
            # Verify the token with Supabase
            response = self.supabase.auth.get_user(token)

            if response.user:
                return {
                    "user_id": response.user.id,
                    "email": response.user.email,
                    "user_metadata": response.user.user_metadata,
                    "app_metadata": response.user.app_metadata,
                }
            else:
                raise HTTPException(status_code=401, detail="Invalid token")

        except Exception as e:
            raise HTTPException(
                status_code=401, detail=f"Token verification failed: {str(e)}"
            )

    async def get_or_create_user_profile(
        self, user_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Get existing user profile or create new one"""
        if not self.supabase_configured:
            # Return a mock profile if Supabase is not configured
            return {
                "id": user_data["user_id"],
                "email": user_data["email"],
                "full_name": user_data.get("user_metadata", {}).get("full_name", ""),
                "avatar_url": user_data.get("user_metadata", {}).get("avatar_url", ""),
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat(),
                "note": "Profile created without database (Supabase not configured)",
            }

        try:
            # Check if user profile exists
            result = (
                self.supabase.table("profiles")
                .select("*")
                .eq("id", user_data["user_id"])
                .execute()
            )

            if result.data:
                return result.data[0]
            else:
                # Create new user profile
                profile_data = {
                    "id": user_data["user_id"],
                    "email": user_data["email"],
                    "full_name": user_data.get("user_metadata", {}).get(
                        "full_name", ""
                    ),
                    "avatar_url": user_data.get("user_metadata", {}).get(
                        "avatar_url", ""
                    ),
                    "created_at": datetime.utcnow().isoformat(),
                    "updated_at": datetime.utcnow().isoformat(),
                }

                result = self.supabase.table("profiles").insert(profile_data).execute()

                if result.data:
                    return result.data[0]
                else:
                    raise HTTPException(
                        status_code=500, detail="Failed to create user profile"
                    )

        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Profile management failed: {str(e)}"
            )

    def generate_backend_token(self, user_data: Dict[str, Any]) -> str:
        """Generate a backend-specific JWT token for API access"""
        payload = {
            "user_id": user_data["user_id"],
            "email": user_data["email"],
            "exp": datetime.utcnow() + timedelta(hours=self.jwt_expiration_hours),
            "iat": datetime.utcnow(),
            "iss": "arc-builder-backend",
        }

        return jwt.encode(payload, self.jwt_secret, algorithm=self.jwt_algorithm)

    def verify_backend_token(self, token: str) -> Dict[str, Any]:
        """Verify backend JWT token"""
        try:
            payload = jwt.decode(
                token, self.jwt_secret, algorithms=[self.jwt_algorithm]
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.JWTError:
            raise HTTPException(status_code=401, detail="Invalid token")


# Initialize auth service
auth_service = AuthService()


# Dependencies
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> Dict[str, Any]:
    """Dependency to get current authenticated user"""
    token = credentials.credentials

    # Try to verify as Supabase token first
    try:
        user_data = await auth_service.verify_supabase_token(token)
        # Get or create user profile
        profile = await auth_service.get_or_create_user_profile(user_data)
        return {**user_data, "profile": profile}
    except HTTPException:
        # If Supabase token fails, try backend token
        try:
            user_data = auth_service.verify_backend_token(token)
            return user_data
        except HTTPException:
            raise HTTPException(status_code=401, detail="Invalid authentication token")


async def get_optional_user(request: Request) -> Optional[Dict[str, Any]]:
    """Optional dependency to get current user if authenticated"""
    try:
        auth_header = request.headers.get("authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header.split(" ")[1]
        credentials = HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)
        return await get_current_user(credentials)
    except Exception:
        return None


# Google OAuth helpers
class GoogleOAuth:
    def __init__(self):
        self.client_id = os.getenv("GOOGLE_CLIENT_ID")
        self.client_secret = os.getenv("GOOGLE_CLIENT_SECRET")

    def verify_google_token(self, token: str) -> Dict[str, Any]:
        """Verify Google OAuth token"""
        if not self.client_id:
            raise HTTPException(status_code=500, detail="Google OAuth not configured")

        try:
            # Verify token with Google
            response = requests.get(
                f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={token}"
            )

            if response.status_code == 200:
                token_info = response.json()

                if token_info.get("audience") == self.client_id:
                    # Get user info
                    user_response = requests.get(
                        f"https://www.googleapis.com/oauth2/v1/userinfo?access_token={token}"
                    )

                    if user_response.status_code == 200:
                        return user_response.json()

            raise HTTPException(status_code=401, detail="Invalid Google token")

        except Exception as e:
            raise HTTPException(
                status_code=401, detail=f"Google token verification failed: {str(e)}"
            )


google_oauth = GoogleOAuth()
