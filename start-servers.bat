@echo off

echo ===============================
echo Starting WED AURA Servers
echo ===============================

REM Start Backend Server
start cmd /k "cd backend && npm start"

REM Start Frontend Server
start cmd /k "cd frontend && npm start"

REM Start AI Recommendation Server
start cmd /k "cd backend\src\ai && python -m uvicorn recommendVendors:app --reload --port 8000"

echo All servers started!
pause