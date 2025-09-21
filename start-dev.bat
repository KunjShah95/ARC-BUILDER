@echo off
chcp 65001 >nul
echo Starting ArcBuilder Development Environment
echo =============================================

echo.
echo Installing backend dependencies...
cd "backend\app builder" || goto :error

echo Installing Python dependencies...
python -m pip install uv
uv sync

echo.
echo Starting Python backend server...
start "ArcBuilder Backend" python start_server.py

echo Backend started at: http://localhost:8000

cd ..\..

echo.
echo Installing frontend dependencies...

REM Check if pnpm is available
where pnpm >nul 2>nul
if %errorlevel% equ 0 (
    echo Using pnpm...
    pnpm install
    goto :start_frontend
)

REM Check if yarn is available
where yarn >nul 2>nul
if %errorlevel% equ 0 (
    echo Using yarn...
    yarn install
    goto :start_frontend
)

REM Check if npm is available
where npm >nul 2>nul
if %errorlevel% equ 0 (
    echo Using npm...
    npm install
    goto :start_frontend
) else (
    echo Error: No Node.js package manager found. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    goto :error
)

:start_frontend
echo.
echo Starting Next.js frontend...
echo Frontend will be available at: http://localhost:3000
echo.
echo Both services are starting up!
echo    Backend API: http://localhost:8000
echo    Frontend:    http://localhost:3000
echo.
echo Press Ctrl+C to stop the frontend service

REM Start frontend with the available package manager
where pnpm >nul 2>nul
if %errorlevel% equ 0 (
    pnpm dev
    goto :end
)

where yarn >nul 2>nul
if %errorlevel% equ 0 (
    yarn dev
    goto :end
)

where npm >nul 2>nul
if %errorlevel% equ 0 (
    npm run dev
    goto :end
)

goto :end

:error
echo Error: Could not navigate to backend directory
pause

:end