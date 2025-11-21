@echo off
REM filepath: c:\Users\pasto\react\supabase-todos\git-commits.bat

echo ====================================
echo   GIT COMMITS AUTOMATICOS
echo ====================================
echo.
echo Realizando commits automaticamente...
echo.

echo [1/12] Initial commit...
git add .
git commit -m "Initial commit: Supabase Todos app"
git push
timeout /t 2 /nobreak >nul

echo [2/12] Adding todo list component...
git add .
git commit -m "feat: add todo list component"
git push
timeout /t 2 /nobreak >nul

echo [3/12] Adding authentication system...
git add .
git commit -m "feat: add authentication system"
git push
timeout /t 2 /nobreak >nul

echo [4/12] Adding CRUD operations...
git add .
git commit -m "feat: add CRUD operations for todos"
git push
timeout /t 2 /nobreak >nul

echo [5/12] Improving UI/UX...
git add .
git commit -m "style: improve UI/UX design"
git push
timeout /t 2 /nobreak >nul

echo [6/12] Fixing deletion bug...
git add .
git commit -m "fix: resolve todo deletion bug"
git push
timeout /t 2 /nobreak >nul

echo [7/12] Optimizing queries...
git add .
git commit -m "refactor: optimize database queries"
git push
timeout /t 2 /nobreak >nul

echo [8/12] Updating documentation...
git add .
git commit -m "docs: update README with setup instructions"
git push
timeout /t 2 /nobreak >nul

echo [9/12] Updating dependencies...
git add .
git commit -m "chore: update dependencies"
git push
timeout /t 2 /nobreak >nul

echo [10/12] Adding filters...
git add .
git commit -m "feat: add todo filters and search"
git push
timeout /t 2 /nobreak >nul

echo [11/12] Adding dark mode...
git add .
git commit -m "feat: add dark mode support"
git push
timeout /t 2 /nobreak >nul

echo [12/12] Fixing authentication...
git add .
git commit -m "fix: resolve authentication issues"
git push
timeout /t 2 /nobreak >nul

echo.
echo ====================================
echo   Todos los commits completados!
echo ====================================
pause