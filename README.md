# 🚀 ArcBuilder - AI-Powered Website Generator

ArcBuilder is a professional AI-powered website generation platform that creates production-ready websites from natural language descriptions. Simply describe what you want, and ArcBuilder will generate complete, modern websites with clean code, responsive design, and best practices.

## ✨ Features

- **AI-Powered Generation**: Uses advanced LangGraph agents with GPT models
- **Production-Ready Code**: Generates clean, maintainable HTML, CSS, and JavaScript
- **Modern Tech Stack**: Next.js frontend with Python/FastAPI backend
- **Real-time Progress**: Live updates during website generation
- **Download & Deploy**: Get complete source code ready for deployment
- **Professional UI**: Beautiful, responsive interface with dark/light themes

## 🏗️ Architecture

### Frontend (Next.js)

- **Framework**: Next.js 14 with App Router
- **UI**: shadcn/ui components with Tailwind CSS
- **Animations**: Framer Motion for smooth interactions
- **Authentication**: Built-in auth system
- **Real-time**: WebSocket-like polling for live updates

### Backend (Python)

- **Framework**: FastAPI for high-performance API
- **AI Engine**: LangGraph with multiple AI agents:
  - **Planner Agent**: Analyzes requirements and creates project plans
  - **Architect Agent**: Designs file structure and implementation steps
  - **Coder Agent**: Generates actual code files
- **Models**: Groq with GPT models for fast generation
- **File Management**: Automatic project organization and ZIP creation
- **File Management**: Automatic project organization and ZIP creation

### Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.11+ (for backend)
- **Groq API Key** (for AI models)
- **Python** 3.11+ (for backend)
- **Groq API Key** (for AI models)

#### For Windows

### Option 1: Automated Setup (Recommended)

```cmd
#### For macOS/Linux
```

#### For macOS/Linux

```bash
chmod +x start-dev.sh
./start-dev.sh

```

### Option 2: Manual Setup

#### 1. Setup Backend (Manual)

```bash
cd "backend/app builder"

# Install uv package manager
pip install uv

# Install dependencies
uv sync

# Create .env file with your Groq API key
echo "GROQ_API_KEY=your_groq_api_key_here" > .env

# Start backend server
#### 2. Setup Frontend
```

#### 2. Setup Frontend

```bash
# In project root
cd ../..

# Install dependencies (choose one)
pnpm install   # Recommended
# or npm install
# or yarn install

# Start frontend
### 3. Access the Application

- **Frontend**: <http://localhost:3000>
- **Backend API**: <http://localhost:8000>
- **API Docs**: <http://localhost:8000/docs>
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
1. **Open the Application**: Navigate to <http://localhost:3000>
2. **Sign In**: Use the authentication system to access the chat interface
3. **Describe Your Website**: In the chat, describe what you want:
   - "Create a modern portfolio website for a photographer"
   - "Build an e-commerce store for handmade jewelry"
   - "Make a landing page for a SaaS productivity app"
4. **Watch the Magic**: See real-time progress as AI agents work
5. **Download Your Website**: Get the complete source code as a ZIP file
   - "Build an e-commerce store for handmade jewelry"
   - "Make a landing page for a SaaS productivity app"
4. **Watch the Magic**: See real-time progress as AI agents work
### Core Endpoints

- `POST /api/generate` - Start website generation
- `GET /api/status/{task_id}` - Check generation progress
- `GET /api/download/{task_id}` - Download generated website
- `GET /api/preview/{task_id}/{file_path}` - Preview specific files
### Example API Usage
- `GET /api/status/{task_id}` - Check generation progress
- `GET /api/download/{task_id}` - Download generated website
- `GET /api/preview/{task_id}/{file_path}` - Preview specific files

### Example API Usage
```javascript
// Start generation
const response = await fetch('http://localhost:8000/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_prompt: "Create a modern portfolio website",
    recursion_limit: 100
  })
});

const { task_id } = await response.json();

// Check status
const status = await fetch(`http://localhost:8000/api/status/${task_id}`);
const statusData = await status.json();

// Download when complete
if (statusData.status === 'completed') {
  window.location.href = `http://localhost:8000/api/download/${task_id}`;
### Project Structure
```

## 🛠️ Development

### Project Structure

ArcBuilder/
├── app/                    # Next.js pages and layouts
│   ├── auth/              # Authentication pages
│   ├── chat/              # Main chat interface
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── chat-interface.tsx # Main chat component
├── lib/                   # Utilities and services
│   ├── api-service.ts    # Backend API client
│   └── utils.ts          # Helper functions
├── backend/              # Python backend
│   └── app builder/      # FastAPI application
│       ├── agent/        # AI agents and tools
│       ├── api_server.py # FastAPI server

```

### Key Technologies

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Python, FastAPI, LangGraph, LangChain, Groq
- **AI**: GPT models via Groq for fast inference
- **Deployment**: Vercel (frontend), Docker (backend)
### Key Technologies
- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
### Backend (.env in backend/app builder/)
- **AI**: GPT models via Groq for fast inference
- **Deployment**: Vercel (frontend), Docker (backend)

## 🔑 Environment Variables
### Frontend (.env.local in root)
### Backend (.env in backend/app builder/)
```env
GROQ_API_KEY=your_groq_api_key_here
```

### Frontend (.env.local in root)

### Frontend (Vercel)

NEXT_PUBLIC_API_URL=<http://localhost:8000>

```

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Deploy to Vercel
### Backend (Docker)

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL
```

### Backend (Docker)

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/app\ builder/ .
RUN pip install uv && uv sync
EXPOSE 8000
CMD ["python", "api_server.py"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

### Backend won't start

- **Check Python version**: Must be 3.11+
- **Install dependencies**: Run `uv sync` in backend directory
- **Check Groq API key**: Ensure it's set in .env file
- **Port conflict**: Make sure port 8000 is available

#### Frontend can't connect to backend

- **Check backend status**: Visit <http://localhost:8000>
- **Verify API URL**: Check NEXT_PUBLIC_API_URL in .env.local
- **CORS issues**: Backend allows localhost:3000 by default

#### Generation fails

- **Check API key**: Ensure Groq API key is valid and has credits

### Getting Help

- 📖 **Documentation**: Check this README
- 🐛 **Issues**: Open a GitHub issue
- 💬 **Discussions**: Use GitHub Discussions
- 📧 **Email**: Contact the maintainers
- **Check API key**: Ensure Groq API key is valid and has credits
- **Prompt too complex**: Try simpler, more specific descriptions
- **Rate limits**: Wait a moment and try again

### Troubleshooting & Support

- 📖 **Documentation**: Check this README
- 🐛 **Issues**: Open a GitHub issue
- 💬 **Discussions**: Use GitHub Discussions
- 📧 **Email**: Contact the maintainers

## Built with ❤️ for developers who want to ship faster

- **LangChain & LangGraph** for the AI framework
- **Groq** for fast AI inference
- **Vercel** for the Next.js framework
- **shadcn/ui** for beautiful components
- **Tailwind CSS** for styling system

---
