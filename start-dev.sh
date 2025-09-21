#!/bin/bash

# ArcBuilder Development Setup Script
# This script helps you start both backend and frontend services

echo "🚀 Starting ArcBuilder Development Environment"
echo "============================================="

# Check if we're on Windows and use appropriate commands
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$OSTYPE" == "cygwin" ]]; then
    # Windows commands
    PYTHON_CMD="python"
    SEPARATOR="&"
else
    # Unix-like systems
    PYTHON_CMD="python3"
    SEPARATOR="&"
fi

echo ""
echo "📦 Installing backend dependencies..."
cd "backend/app builder"

# Install Python dependencies
if command -v uv &> /dev/null; then
    echo "Using uv for dependency management..."
    uv sync
else
    echo "Installing uv package manager..."
    pip install uv
    uv sync
fi

echo ""
echo "🐍 Starting Python backend server..."
# Start backend in background
$PYTHON_CMD start_server.py &
BACKEND_PID=$!

echo "Backend started with PID: $BACKEND_PID"
echo "Backend running at: http://localhost:8000"

# Go back to root directory
cd ../..

echo ""
echo "📦 Installing frontend dependencies..."
# Install Node.js dependencies
if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install
elif command -v yarn &> /dev/null; then
    echo "Using yarn..."
    yarn install
else
    echo "Using npm..."
    npm install
fi

echo ""
echo "⚛️  Starting Next.js frontend..."
echo "Frontend will be available at: http://localhost:3000"
echo ""
echo "🎉 Both services are starting up!"
echo "   Backend API: http://localhost:8000"
echo "   Frontend:    http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both services"
echo ""

# Start frontend (this will block)
if command -v pnpm &> /dev/null; then
    pnpm dev
elif command -v yarn &> /dev/null; then
    yarn dev
else
    npm run dev
fi

# Clean up background process when script exits
trap "kill $BACKEND_PID 2>/dev/null" EXIT