@echo off
echo ArcBuilder Setup - First Time Setup
echo ====================================

echo.
echo This script will help you set up ArcBuilder for the first time.
echo.

REM Check if Node.js is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, restart your command prompt and run this script again.
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.11+ from: https://python.org/
    echo Make sure to check "Add Python to PATH" during installation.
    pause
    exit /b 1
)

echo [OK] Node.js and Python are installed.
echo.

REM Setup backend environment
echo Setting up backend environment...
cd "backend\app builder" || goto :error

if not exist ".env" (
    echo.
    echo You need a Groq API key for the AI functionality.
    echo 1. Go to: https://console.groq.com/keys
    echo 2. Sign up/Login and create a free API key
    echo 3. Copy the API key
    echo.
    
    copy ".env.example" ".env" >nul
    
    echo Please edit the .env file and add your Groq API key.
    echo The file has been created at: backend\app builder\.env
    echo.
    echo After adding your API key, run: .\start-simple.bat
    echo.
    pause
    notepad .env
    echo.
    echo Save the file with your API key and close notepad, then press any key...
    pause >nul
)

echo Installing backend dependencies...
python -m pip install uv
uv sync

cd ..\..

echo.
echo Installing frontend dependencies...
npm install

echo.
echo Setup complete!
echo.  
echo To start the application:
echo   .\start-simple.bat
echo.
echo The application will be available at:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo.
pause

goto :end

:error
echo Setup failed. Please check the error messages above.
pause
exit /b 1

:end