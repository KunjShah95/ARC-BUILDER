# ArcBuilder Deployment Guide

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/arc-builder)

## 📋 Prerequisites

Before deploying, make sure you have:

1. **Supabase Account** - For authentication and database
2. **OpenAI API Key** - For AI code generation
3. **Google OAuth Credentials** - For Google authentication
4. **Vercel Account** - For deployment

## 🔧 Environment Variables

Set up the following environment variables in your Vercel dashboard:

### Required Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 🗄️ Database Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key

2. **Run Database Migrations**
   ```bash
   # The SQL files in the scripts/ folder will be automatically applied
   # Or run them manually in your Supabase SQL editor:
   ```

3. **Enable Google OAuth in Supabase**
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials

## 🔑 Google OAuth Setup

1. **Create Google OAuth App**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials

2. **Configure OAuth**
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/callback` (development)
     - `https://your-domain.vercel.app/auth/callback` (production)
   - Add your domain to authorized domains

## 🚀 Deployment Steps

### Option 1: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add OPENAI_API_KEY
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET

# Redeploy with environment variables
vercel --prod
```

### Option 2: Deploy via GitHub

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard
   - Deploy

## 🔧 Local Development

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

## 📁 Project Structure

```
arc-builder/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── generator/         # AI generator
│   └── integrations/      # Integrations page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility libraries
├── public/               # Static assets
├── scripts/              # Database scripts
└── styles/               # Global styles
```

## 🛠️ Customization

### Adding New Integrations

1. **Create Integration Component**
   ```typescript
   // components/integrations/new-integration.tsx
   export function NewIntegration() {
     // Your integration logic
   }
   ```

2. **Add to Integrations Page**
   ```typescript
   // app/integrations/page.tsx
   import { NewIntegration } from '@/components/integrations/new-integration'
   ```

### Customizing AI Generation

1. **Modify Generation Logic**
   ```typescript
   // app/api/generate/route.ts
   // Update the AI prompt and generation logic
   ```

2. **Add New Templates**
   ```typescript
   // app/generator/page.tsx
   // Add new templates to the templates array
   ```

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit API keys to version control
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Supabase Security**
   - Enable Row Level Security (RLS)
   - Configure proper policies
   - Use service role keys only on server-side

3. **API Rate Limiting**
   - Implement rate limiting for AI generation
   - Monitor API usage
   - Set up alerts for unusual activity

## 📊 Monitoring & Analytics

1. **Vercel Analytics**
   - Built-in performance monitoring
   - Real user metrics
   - Core Web Vitals tracking

2. **Supabase Monitoring**
   - Database performance metrics
   - Authentication analytics
   - API usage tracking

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules .next
   pnpm install
   pnpm build
   ```

2. **Environment Variables**
   - Check variable names match exactly
   - Ensure no trailing spaces
   - Verify Supabase URL format

3. **Authentication Issues**
   - Verify Google OAuth configuration
   - Check redirect URIs
   - Ensure Supabase auth is enabled

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Supabase documentation](https://supabase.com/docs)
- Join our [Discord community](https://discord.gg/arcbuilder)

## 🎉 Success!

Once deployed, your ArcBuilder instance will be available at:
`https://your-project.vercel.app`

### Next Steps

1. **Test all features**
   - User registration/login
   - AI generation
   - Project management
   - Integrations

2. **Customize branding**
   - Update logo and colors
   - Modify copy and messaging
   - Add your domain

3. **Scale up**
   - Monitor performance
   - Add more integrations
   - Implement advanced features

---

**Happy Building! 🚀**
