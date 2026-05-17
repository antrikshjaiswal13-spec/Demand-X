@echo off
REM Quick deployment guide for Demand-X

echo.
echo 🚀 Demand-X Deployment Setup
echo ================================
echo.
echo Step 1: Backend Deployment (Railway)
echo ------------------------------------
echo 1. Go to https://railway.app
echo 2. Click 'New Project' -^> 'Deploy from GitHub'
echo 3. Select your Demand-X repository
echo 4. Set environment variables:
echo    - FLASK_ENV=production
echo    - SECRET_KEY=your_secret_key
echo 5. Click Deploy
echo 6. Copy your Railway backend URL
echo.
echo.
echo Step 2: Frontend Deployment (Vercel)
echo ------------------------------------
echo 1. Go to https://vercel.com/dashboard
echo 2. Click 'Add New' -^> 'Project'
echo 3. Import your Demand-X repository
echo 4. Set environment variable:
echo    - REACT_APP_API_URL=https://your-railway-backend-url
echo 5. Click Deploy
echo.
echo Deployment Complete! 🎉
echo.
pause
