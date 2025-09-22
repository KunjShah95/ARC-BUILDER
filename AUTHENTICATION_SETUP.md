# ARC-BUILDER Authentication Setup Guide

This guide will help you complete the Google OAuth authentication setup between your Next.js frontend and FastAPI backend.

## 🚀 Current Status

✅ **Completed:**
- Backend authentication system with FastAPI
- Frontend authentication hooks and components
- Supabase integration for user management
- Environment variable configuration files
- API route integration with authentication

## 📋 Setup Requirements

### 1. Google OAuth Setup

1. **Create Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Set application type to "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/auth/callback`
     - `https://your-domain.com/auth/callback` (for production)

2. **Get Your Credentials:**
   - Copy the Client ID and Client Secret

### 2. Supabase Setup

1. **Create Supabase Project:**
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Go to Settings → API → Copy your project URL and anon key
   - Go to Authentication → Providers → Enable Google OAuth
   - Add your Google OAuth credentials to Supabase

2. **Database Setup:**
   - The backend expects a `profiles` table
   - Run the SQL scripts in the `scripts/` folder:
     ```sql
     -- This should already be done, but verify these tables exist:
     -- profiles, projects, integrations
     ```

### 3. Environment Configuration

1. **Frontend (.env.local):**
   ```bash
   # Update with your actual values:
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Add your Google OAuth credentials:
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
   ```

2. **Backend (backend/.env):**
   ```bash
   # Update with your actual values:
   GROQ_API_KEY=your_groq_api_key  # Already set
   
   # Add Supabase credentials:
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Add Google OAuth credentials (same as frontend):
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Security (generate secure random strings):
   JWT_SECRET=your_secure_jwt_secret_here
   ```

## 🔄 Testing the Setup

### 1. Start Both Services

1. **Backend:**
   ```bash
   cd backend
   .venv\Scripts\activate  # Windows
   # source .venv/bin/activate  # Linux/Mac
   python main.py
   ```

2. **Frontend:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

### 2. Test Authentication Flow

1. **Visit the Login Page:**
   - Go to `http://localhost:3000/auth/login`
   - Try Google OAuth login
   - Should redirect to dashboard after successful login

2. **Test Backend Connection:**
   - Go to `http://localhost:3000/generator`
   - Check the authentication status badge in the header
   - Should show "AI Connected" when fully authenticated

3. **Test API Integration:**
   - Try generating code in the generator
   - Check browser dev tools for API calls
   - Backend should receive authenticated requests

### 3. Backend API Endpoints

Test these endpoints directly:

```bash
# Health check
GET http://localhost:8000/health

# Test authentication (requires token)
POST http://localhost:8000/api/auth/verify
{
  "token": "your_supabase_jwt_token"
}

# Test protected route (requires Authorization header)
GET http://localhost:8000/api/auth/protected
Authorization: Bearer your_backend_token

# Code generation (requires auth for full features)
POST http://localhost:8000/api/generate
Authorization: Bearer your_backend_token
{
  "user_prompt": "Create a simple landing page",
  "framework": "html-css-js"
}
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Supabase configuration missing" error:**
   - Check that SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in backend/.env

2. **"Invalid Google token" error:**
   - Verify Google OAuth credentials are correct
   - Check that Google+ API is enabled in Google Cloud Console

3. **Frontend shows "Not Signed In":**
   - Check Supabase configuration in frontend
   - Verify Google OAuth is enabled in Supabase dashboard

4. **Backend authentication fails:**
   - Check that backend can connect to Supabase
   - Verify service role key has proper permissions

5. **CORS errors:**
   - Backend CORS is configured for localhost:3000
   - Update CORS_ORIGINS in backend/.env if needed

## 🔒 Security Notes

- Never commit actual API keys to version control
- Use environment variables for all sensitive data
- JWT secrets should be long, random strings
- Service role keys should be kept secure and never exposed to frontend

## 📁 File Structure

```
ARC-BUILDER/
├── backend/
│   ├── main.py          # FastAPI app with auth routes
│   ├── auth.py          # Authentication logic
│   └── .env             # Backend environment variables
├── app/
│   ├── auth/            # Authentication pages
│   ├── api/generate/    # Generation API route with auth
│   └── generator/       # Generator page with auth status
├── lib/
│   ├── backend-api.ts   # Backend API client with auth
│   ├── hooks/
│   │   └── use-backend-auth.ts  # Auth hook
│   └── supabase/        # Supabase client config
└── .env.local           # Frontend environment variables
```

## ✅ Next Steps

Once setup is complete:

1. **Production Deployment:**
   - Update redirect URLs for production domain
   - Set production environment variables
   - Configure HTTPS for all OAuth redirects

2. **Enhanced Features:**
   - Add user profile management
   - Implement project saving/loading
   - Add collaboration features

3. **Monitoring:**
   - Set up error tracking
   - Monitor authentication success rates
   - Track API usage and performance

---

## 🆘 Need Help?

If you encounter issues:

1. Check the browser console for error messages
2. Check backend logs for authentication errors
3. Verify all environment variables are set correctly
4. Test each component (Supabase, Google OAuth, Backend) separately

The system is designed to gracefully fallback - users can still use simple code generation even without full authentication.