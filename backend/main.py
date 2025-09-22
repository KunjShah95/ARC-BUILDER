import os
import logging
from typing import Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from agent.graph import agent

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="ARC-BUILDER Backend",
    description="Backend API for ARC-BUILDER code generation",
    version="0.1.0"
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
        "environment": "development" if os.getenv("BACKEND_DEBUG") == "true" else "production"
    }

@app.post("/api/generate", response_model=GenerateResponse)
async def generate_code(request: GenerateRequest):
    """Generate code using the LangGraph agent"""
    try:
        logger.info(f"Generating code for prompt: {request.user_prompt}")
        
        # Use the LangGraph agent to generate code
        result = agent.invoke(
            {"user_prompt": request.user_prompt},
            {"recursion_limit": 100}
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
                            with open(step.filepath, 'r', encoding='utf-8') as f:
                                generated_files[step.filepath] = f.read()
                        except FileNotFoundError:
                            logger.warning(f"Generated file not found: {step.filepath}")
        
        return GenerateResponse(
            success=True,
            message="Code generated successfully",
            files=generated_files
        )
        
    except Exception as e:
        logger.error(f"Error generating code: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate code: {str(e)}"
        )

@app.post("/api/generate-simple")
async def generate_simple_code(request: GenerateRequest):
    """Simple code generation endpoint for testing"""
    try:
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
});"""
        }
        
        return GenerateResponse(
            success=True,
            message="Simple code generated successfully",
            files=sample_files
        )
        
    except Exception as e:
        logger.error(f"Error in simple generation: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate simple code: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("BACKEND_HOST", "localhost")
    port = int(os.getenv("BACKEND_PORT", "8000"))
    debug = os.getenv("BACKEND_DEBUG", "true").lower() == "true"
    
    logger.info(f"Starting server on {host}:{port}")
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=debug,
        log_level="info"
    )
