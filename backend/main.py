import os
import logging
from typing import Dict, Any
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from agent.graph import agent
from auth import get_current_user, get_optional_user, auth_service, google_oauth

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="ARC-BUILDER Backend",
    description="Backend API for ARC-BUILDER code generation",
    version="0.1.0",
)

# Configure CORS
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request models
class GenerateRequest(BaseModel):
    user_prompt: str
    project_type: str = "web"
    framework: str = "html-css-js"


class GenerateResponse(BaseModel):
    success: bool
    message: str
    files: Dict[str, str] = {}
    error: str = None


class AuthRequest(BaseModel):
    token: str


class AuthResponse(BaseModel):
    success: bool
    message: str
    backend_token: str = None
    user: Dict[str, Any] = {}


class GoogleAuthRequest(BaseModel):
    google_token: str


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "ARC-BUILDER Backend is running", "version": "0.1.0"}


@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "backend_port": os.getenv("BACKEND_PORT", "8000"),
        "cors_origins": cors_origins,
        "environment": "development"
        if os.getenv("BACKEND_DEBUG") == "true"
        else "production",
    }


@app.post("/api/generate", response_model=GenerateResponse)
async def generate_code(
    request: GenerateRequest, current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Generate code using the LangGraph agent (requires authentication)"""
    try:
        logger.info(
            f"Generating code for prompt: {request.user_prompt} (User: {current_user.get('email', 'unknown')})"
        )

        # Use the LangGraph agent to generate code
        result = agent.invoke(
            {"user_prompt": request.user_prompt}, {"recursion_limit": 100}
        )

        # Extract generated files from the result
        generated_files = {}
        if "coder_state" in result and result["coder_state"]:
            coder_state = result["coder_state"]
            if hasattr(coder_state, "task_plan") and coder_state.task_plan:
                for step in coder_state.task_plan.implementation_steps:
                    if hasattr(step, "filepath"):
                        # Read the generated file content
                        try:
                            with open(step.filepath, "r", encoding="utf-8") as f:
                                generated_files[step.filepath] = f.read()
                        except FileNotFoundError:
                            logger.warning(f"Generated file not found: {step.filepath}")

        return GenerateResponse(
            success=True, message="Code generated successfully", files=generated_files
        )

    except Exception as e:
        logger.error(f"Error generating code: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Failed to generate code: {str(e)}"
        )


@app.post("/api/generate-simple")
async def generate_simple_code(
    request: GenerateRequest, current_user: Dict[str, Any] = Depends(get_optional_user)
):
    """Simple code generation endpoint for testing (optional authentication)"""
    try:
        user_info = (
            f" (User: {current_user.get('email')})" if current_user else " (Anonymous)"
        )
        logger.info(f"Simple generation for prompt: {request.user_prompt}{user_info}")

        # Simple response for testing connectivity
        sample_files = {
            "index.html": f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Generated App: {request.user_prompt}</h1>
        <p>This is a sample generated HTML file.</p>
    </div>
    <script src="script.js"></script>
</body>
</html>""",
            "styles.css": """body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    text-align: center;
}""",
            "script.js": """document.addEventListener('DOMContentLoaded', function() {
    console.log('Generated app loaded successfully!');
    
    // Add some interactivity
    const heading = document.querySelector('h1');
    if (heading) {
        heading.addEventListener('click', function() {
            this.style.color = this.style.color === 'blue' ? '#333' : 'blue';
        });
    }
});""",
        }

        return GenerateResponse(
            success=True,
            message="Simple code generated successfully",
            files=sample_files,
        )

    except Exception as e:
        logger.error(f"Error in simple generation: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Failed to generate simple code: {str(e)}"
        )


# Authentication routes
@app.post("/api/auth/verify", response_model=AuthResponse)
async def verify_auth(request: AuthRequest):
    """Verify Supabase token and return backend token"""
    try:
        # Verify the Supabase token
        user_data = await auth_service.verify_supabase_token(request.token)

        # Get or create user profile
        profile = await auth_service.get_or_create_user_profile(user_data)

        # Generate backend token
        backend_token = auth_service.generate_backend_token(user_data)

        return AuthResponse(
            success=True,
            message="Authentication successful",
            backend_token=backend_token,
            user={**user_data, "profile": profile},
        )

    except Exception as e:
        logger.error(f"Auth verification failed: {str(e)}")
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")


@app.get("/api/auth/user")
async def get_user_info(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Get current user information"""
    return {"success": True, "user": current_user}


@app.get("/api/auth/protected")
async def protected_route(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Test protected route"""
    return {
        "message": f"Hello {current_user.get('email', 'user')}! This is a protected route.",
        "user_id": current_user.get("user_id"),
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.post("/api/auth/google", response_model=AuthResponse)
async def google_auth(request: GoogleAuthRequest):
    """Authenticate with Google OAuth token"""
    try:
        # Verify Google token
        google_user = google_oauth.verify_google_token(request.google_token)

        # Create user data structure
        user_data = {
            "user_id": f"google_{google_user['id']}",
            "email": google_user["email"],
            "user_metadata": {
                "full_name": google_user.get("name", ""),
                "avatar_url": google_user.get("picture", ""),
                "provider": "google",
            },
        }

        # Get or create user profile
        profile = await auth_service.get_or_create_user_profile(user_data)

        # Generate backend token
        backend_token = auth_service.generate_backend_token(user_data)

        return AuthResponse(
            success=True,
            message="Google authentication successful",
            backend_token=backend_token,
            user={**user_data, "profile": profile},
        )

    except Exception as e:
        logger.error(f"Google auth failed: {str(e)}")
        raise HTTPException(
            status_code=401, detail=f"Google authentication failed: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn

    host = os.getenv("BACKEND_HOST", "localhost")
    port = int(os.getenv("BACKEND_PORT", "8000"))
    debug = os.getenv("BACKEND_DEBUG", "true").lower() == "true"

    logger.info(f"Starting server on {host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=debug, log_level="info")
