# ARC-BUILDER

ARC-BUILDER is a powerful full-stack application that combines a Next.js frontend with a Pyth### Required API Keys

1. **Groq API Key** (Primary - Required)
   - Visit: https://console.groq.com/keys
   - Create a new API key with access to `openai/gpt-oss-120b`
   - Add to backend `.env` as `GROQ_API_KEY`

2. **Supabase Credentials** (Optional - for auth/data)
   - Create project at: https://supabase.com
   - Get URL and anon key from Settings > API
   - Add to frontend `.env.local`I-powered code generation. It uses LangGraph agents to create websites and applications based on natural language prompts.

## Features

- 🚀 **AI-Powered Code Generation**: Create websites using natural language descriptions
- 🎨 **Modern UI**: Built with Next.js 14, Tailwind CSS, and shadcn/ui components
- 🤖 **LangGraph Backend**: Sophisticated AI agent system powered by GPT-OSS-120B
- 🔗 **Backend-Only AI**: All AI processing happens on the backend for better security and control
- 📊 **Project Dashboard**: Manage and track your generated projects with backend status monitoring
- 🌐 **Multiple Frameworks**: Support for various web technologies

## Architecture

### Frontend (Next.js 14)

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Authentication**: Supabase Auth
- **AI Integration**: Backend API only - no direct AI API calls

### Backend (Python)

- **Framework**: FastAPI
- **AI Engine**: LangGraph with GPT-OSS-120B via Groq
- **Model**: `openai/gpt-oss-120b` - All AI processing happens here
- **Tools**: File operations, sophisticated code generation
- **API**: RESTful endpoints for secure AI code generation

## Quick Start

git clone <repository-url>
cd ARC-BUILDER

# Install frontend dependencies
pnpm install

# Copy and configure environment variables
cp .env.local.example .env.local
# Edit .env.local with your API keys
```bash
git clone <repository-url>
cd ARC-BUILDER

# Install frontend dependencies
cd backend

# Install Python dependencies
pip install -e .

# Configure environment variables
# Edit backend/.env with your API keys
### 2. Setup Backend

```bash
cd backend

# Install Python dependencies
pip install -e .
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Backend API Configuration
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Server Configuration
BACKEND_PORT=8000
CORS_ORIGINS=http://localhost:3000

#### Backend (.env)

```env
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here
cd backend
python main.py
BACKEND_PORT=8000
CORS_ORIGINS=http://localhost:3000
```

pnpm dev

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
```

**Terminal 2 - Frontend:**
```bash
pnpm dev
```

Visit http://localhost:3000 to access the application.

## API Keys Setup

### Required API Keys

1. **OpenAI API Key**
   - Visit: <https://platform.openai.com/api-keys>
   - Create a new API key
   - Add to frontend `.env.local` as `OPENAI_API_KEY`

2. **Groq API Key**
   - Visit: <https://console.groq.com/keys>
   - Create a new API key
   - Add to backend `.env` as `GROQ_API_KEY`

3. **Supabase Credentials**
   - Create project at: <https://supabase.com>
   - Get URL and anon key from Settings > API
   - Add to frontend `.env.local`

### Optional API Keys

- **LangChain API Key**: For tracing and debugging (backend `.env`)

## Usage

### 1. Basic Code Generation

1. Navigate to the Generator page
2. Enter a description of the website you want to create
3. Select framework and styling options
4. Click "Generate" to create your project

### 2. Backend Integration

1. Go to Dashboard > Backend Status
2. Check connection to the Python backend
3. Test code generation using the advanced LangGraph agent

### 3. Project Management
ARC-BUILDER/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utility functions and hooks
├── backend/                # Python backend
│   ├── agent/              # LangGraph agent code
│   ├── main.py             # FastAPI application
│   └── .env                # Backend environment variables
├── public/                 # Static assets
└── .env.local              # Frontend environment variables
ARC-BUILDER/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utility functions and hooks
├── backend/                # Python backend
│   ├── agent/              # LangGraph agent code
│   ├── main.py             # FastAPI application
│   └── .env                # Backend environment variables
├── public/                 # Static assets
└── .env.local              # Frontend environment variables
```

### Key Components

- **Generator**: Main code generation interface
- **Dashboard**: Project management and backend status
- **Backend API**: LangGraph-powered code generation
- **Authentication**: Supabase-based user management

## Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure backend server is running on port 8000
   - Check CORS configuration
   - Verify API keys in backend/.env

2. **Frontend Build Errors**
   - Check that all environment variables are set
   - Ensure Node.js version is 18+

3. **API Key Issues**
   - Verify all API keys are valid and active
   - Check rate limits on your API accounts

### Getting Help

- Check the Backend Status tab in the dashboard
- Review server logs for detailed error messages
- Ensure all dependencies are installed correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

This project is licensed under the MIT License.
