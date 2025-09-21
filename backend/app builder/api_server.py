"""
FastAPI server for ArcBuilder backend
Exposes the website generation functionality as REST API endpoints
"""

import uuid
import shutil
import zipfile
from datetime import datetime
from typing import Dict, Optional
from pathlib import Path

import uvicorn
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

from agent.graph import agent
from agent.tools import init_project_root, PROJECT_ROOT


# Pydantic models for API
class GenerateWebsiteRequest(BaseModel):
    user_prompt: str
    recursion_limit: Optional[int] = 100


class GenerateWebsiteResponse(BaseModel):
    task_id: str
    status: str
    message: str


class WebsiteStatus(BaseModel):
    task_id: str
    status: str  # "pending", "processing", "completed", "failed"
    progress: Dict
    error_message: Optional[str] = None
    result: Optional[Dict] = None
    created_at: datetime
    updated_at: datetime


class FileInfo(BaseModel):
    path: str
    content: str
    purpose: str


# Global storage for task status (in production, use Redis or database)
task_storage: Dict[str, WebsiteStatus] = {}

app = FastAPI(
    title="ArcBuilder API",
    description="AI-powered website generation API",
    version="1.0.0",
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def generate_website_task(task_id: str, user_prompt: str, recursion_limit: int):
    """Background task to generate website"""
    try:
        # Update status to processing
        task_storage[task_id].status = "processing"
        task_storage[task_id].progress = {
            "step": "initializing",
            "message": "Starting website generation...",
        }
        task_storage[task_id].updated_at = datetime.now()

        # Initialize project root for this task
        task_project_root = Path(PROJECT_ROOT.parent / f"generated_project_{task_id}")
        task_project_root.mkdir(parents=True, exist_ok=True)

        # Update progress
        task_storage[task_id].progress = {
            "step": "planning",
            "message": "Creating project plan...",
        }
        task_storage[task_id].updated_at = datetime.now()

        # Run the agent
        result = agent.invoke(
            {"user_prompt": user_prompt}, {"recursion_limit": recursion_limit}
        )

        # Update progress
        task_storage[task_id].progress = {
            "step": "generating",
            "message": "Generating website files...",
        }
        task_storage[task_id].updated_at = datetime.now()

        # Extract generated files info
        files_info = []
        if task_project_root.exists():
            for file_path in task_project_root.rglob("*"):
                if file_path.is_file():
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            content = f.read()
                        files_info.append(
                            {
                                "path": str(file_path.relative_to(task_project_root)),
                                "content": content,
                                "size": len(content),
                            }
                        )
                    except Exception as e:
                        print(f"Error reading file {file_path}: {e}")

        # Create zip file of generated project
        zip_path = task_project_root.parent / f"website_{task_id}.zip"
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for file_path in task_project_root.rglob("*"):
                if file_path.is_file():
                    zipf.write(file_path, file_path.relative_to(task_project_root))

        # Update status to completed
        task_storage[task_id].status = "completed"
        task_storage[task_id].progress = {
            "step": "completed",
            "message": "Website generation completed successfully!",
        }
        task_storage[task_id].result = {
            "plan": result.get("plan", {}).model_dump()
            if hasattr(result.get("plan", {}), "model_dump")
            else result.get("plan", {}),
            "task_plan": result.get("task_plan", {}).model_dump()
            if hasattr(result.get("task_plan", {}), "model_dump")
            else result.get("task_plan", {}),
            "files": files_info,
            "download_url": f"/api/download/{task_id}",
            "file_count": len(files_info),
        }
        task_storage[task_id].updated_at = datetime.now()

    except Exception as e:
        # Update status to failed
        task_storage[task_id].status = "failed"
        task_storage[task_id].error_message = str(e)
        task_storage[task_id].updated_at = datetime.now()
        print(f"Error generating website for task {task_id}: {e}")


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "ArcBuilder API is running", "status": "healthy"}


@app.post("/api/generate", response_model=GenerateWebsiteResponse)
async def generate_website(
    request: GenerateWebsiteRequest, background_tasks: BackgroundTasks
):
    """Start website generation process"""
    task_id = str(uuid.uuid4())

    # Initialize task status
    task_storage[task_id] = WebsiteStatus(
        task_id=task_id,
        status="pending",
        progress={"step": "queued", "message": "Website generation queued"},
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

    # Start background task
    background_tasks.add_task(
        generate_website_task, task_id, request.user_prompt, request.recursion_limit
    )

    return GenerateWebsiteResponse(
        task_id=task_id,
        status="pending",
        message="Website generation started. Use the task_id to check progress.",
    )


@app.get("/api/status/{task_id}", response_model=WebsiteStatus)
async def get_task_status(task_id: str):
    """Get the status of a website generation task"""
    if task_id not in task_storage:
        raise HTTPException(status_code=404, detail="Task not found")

    return task_storage[task_id]


@app.get("/api/download/{task_id}")
async def download_website(task_id: str):
    """Download the generated website as a zip file"""
    if task_id not in task_storage:
        raise HTTPException(status_code=404, detail="Task not found")

    task = task_storage[task_id]
    if task.status != "completed":
        raise HTTPException(
            status_code=400, detail="Website generation not completed yet"
        )

    zip_path = Path(PROJECT_ROOT.parent / f"website_{task_id}.zip")
    if not zip_path.exists():
        raise HTTPException(status_code=404, detail="Download file not found")

    return FileResponse(
        path=zip_path, filename=f"website_{task_id}.zip", media_type="application/zip"
    )


@app.get("/api/preview/{task_id}/{file_path:path}")
async def preview_file(task_id: str, file_path: str):
    """Preview a specific file from the generated website"""
    if task_id not in task_storage:
        raise HTTPException(status_code=404, detail="Task not found")

    task = task_storage[task_id]
    if task.status != "completed":
        raise HTTPException(
            status_code=400, detail="Website generation not completed yet"
        )

    project_path = Path(PROJECT_ROOT.parent / f"generated_project_{task_id}")
    file_full_path = project_path / file_path

    if not file_full_path.exists() or not file_full_path.is_file():
        raise HTTPException(status_code=404, detail="File not found")

    # Security check: ensure file is within project directory
    if not str(file_full_path.resolve()).startswith(str(project_path.resolve())):
        raise HTTPException(status_code=403, detail="Access denied")

    try:
        with open(file_full_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Determine content type based on file extension
        content_type = "text/plain"
        if file_path.endswith(".html"):
            content_type = "text/html"
        elif file_path.endswith(".css"):
            content_type = "text/css"
        elif file_path.endswith(".js"):
            content_type = "application/javascript"
        elif file_path.endswith(".json"):
            content_type = "application/json"

        return JSONResponse(
            content={
                "file_path": file_path,
                "content": content,
                "content_type": content_type,
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")


@app.get("/api/tasks")
async def list_tasks():
    """List all tasks (for debugging)"""
    return {"tasks": list(task_storage.keys())}


@app.delete("/api/tasks/{task_id}")
async def delete_task(task_id: str):
    """Delete a task and its generated files"""
    if task_id not in task_storage:
        raise HTTPException(status_code=404, detail="Task not found")

    # Clean up files
    project_path = Path(PROJECT_ROOT.parent / f"generated_project_{task_id}")
    zip_path = Path(PROJECT_ROOT.parent / f"website_{task_id}.zip")

    try:
        if project_path.exists():
            shutil.rmtree(project_path)
        if zip_path.exists():
            zip_path.unlink()
    except Exception as e:
        print(f"Error cleaning up files for task {task_id}: {e}")

    # Remove from storage
    del task_storage[task_id]

    return {"message": "Task deleted successfully"}


if __name__ == "__main__":
    # Initialize project root
    init_project_root()

    uvicorn.run(
        "api_server:app", host="0.0.0.0", port=8000, reload=True, log_level="info"
    )
