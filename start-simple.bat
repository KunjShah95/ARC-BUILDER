@echo off
echo Starting ArcBuilder Development Environment
echo =============================================

echo.
echo Step 1: Setting up backend...
cd "backend\app builder" || goto :error

echo Installing Python dependencies...
python -m pip install uv
if %errorlevel% neq 0 (
    echo Error: Failed to install uv. Make sure Python is installed.
    pause
    goto :error
)

uv sync
if %errorlevel% neq 0 (
    echo Error: Failed to sync dependencies. Check if pyproject.toml exists.
    pause
    goto :error
)

echo.
echo Step 2: Starting backend server...
start "ArcBuilder Backend" python start_server.py
echo Backend starting at: http://localhost:8000

cd ..\..

echo.
echo Step 3: Setting up frontend...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: npm not found. Please install Node.js from https://nodejs.org/
    pause
    goto :error
)

echo Installing frontend dependencies with npm...
npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install frontend dependencies.
    pause
    goto :error
)

echo.
echo Step 4: Starting frontend...
echo Frontend will be available at: http://localhost:3000
echo.
echo Both services are now starting!
echo   Backend API: http://localhost:8000
echo   Frontend:    http://localhost:3000
echo.
echo Press Ctrl+C to stop the frontend
echo.

npm run dev

goto :end

:error
echo.
echo Setup failed. Please check the error messages above.
echo.
echo Common issues:
echo - Python not installed or not in PATH
echo - Node.js not installed or not in PATH  
echo - Missing .env file in backend directory
echo.
pause
exit /b 1

:end
echo.
echo Shutting down...