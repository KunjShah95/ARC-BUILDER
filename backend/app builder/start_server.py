"""
Startup script for the ArcBuilder backend server
"""

import subprocess
import sys
import os
from pathlib import Path


def install_dependencies():
    """Install Python dependencies using uv"""
    backend_dir = Path(__file__).parent
    os.chdir(backend_dir)

    print("Installing backend dependencies...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "uv"], check=True)
        subprocess.run(["uv", "sync"], check=True)
        print("Dependencies installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"Error installing dependencies: {e}")
        sys.exit(1)


def start_server():
    """Start the FastAPI server"""
    print("Starting ArcBuilder backend server...")
    try:
        import uvicorn

        uvicorn.run(
            "api_server:app", host="0.0.0.0", port=8000, reload=True, log_level="info"
        )
    except ImportError:
        print("FastAPI/Uvicorn not installed. Installing dependencies first...")
        install_dependencies()
        import uvicorn

        uvicorn.run(
            "api_server:app", host="0.0.0.0", port=8000, reload=True, log_level="info"
        )


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "install":
        install_dependencies()
    else:
        start_server()
