@echo off
echo Starting ARC-BUILDER Backend Server...
echo.

cd /d "%~dp0"

REM Check if .env exists
if not exist ".env" (
    echo ERROR: .env file not found!
    echo Please copy and configure the .env file with your API keys
    echo.
    pause
    exit /b 1
)

REM Check if virtual environment exists, if not create one
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -e .

REM Start the server
echo.
echo Starting server on http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
python main.py