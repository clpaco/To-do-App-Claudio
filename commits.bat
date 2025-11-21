@echo off
REM filepath: c:\Users\pasto\react\supabase-todos\git-commits.bat

echo ====================================
echo   GIT COMMITS PREDEFINIDOS
echo ====================================
echo.

:menu
echo Selecciona el commit a realizar:
echo.
echo 1. Initial commit: Supabase Todos app
echo 2. feat: add todo list component
echo 3. feat: add authentication system
echo 4. feat: add CRUD operations for todos
echo 5. style: improve UI/UX design
echo 6. fix: resolve todo deletion bug
echo 7. refactor: optimize database queries
echo 8. docs: update README with setup instructions
echo 9. chore: update dependencies
echo 10. feat: add todo filters and search
echo 11. feat: add dark mode support
echo 12. fix: resolve authentication issues
echo 13. Ver status actual
echo 0. Salir
echo.

set /p option="Elige una opcion (0-13): "

if "%option%"=="1" goto commit1
if "%option%"=="2" goto commit2
if "%option%"=="3" goto commit3
if "%option%"=="4" goto commit4
if "%option%"=="5" goto commit5
if "%option%"=="6" goto commit6
if "%option%"=="7" goto commit7
if "%option%"=="8" goto commit8
if "%option%"=="9" goto commit9
if "%option%"=="10" goto commit10
if "%option%"=="11" goto commit11
if "%option%"=="12" goto commit12
if "%option%"=="13" goto status
if "%option%"=="0" goto end
goto menu

:commit1
git add .
git commit -m "Initial commit: Supabase Todos app"
git push
goto end

:commit2
git add .
git commit -m "feat: add todo list component"
git push
goto end

:commit3
git add .
git commit -m "feat: add authentication system"
git push
goto end

:commit4
git add .
git commit -m "feat: add CRUD operations for todos"
git push
goto end

:commit5
git add .
git commit -m "style: improve UI/UX design"
git push
goto end

:commit6
git add .
git commit -m "fix: resolve todo deletion bug"
git push
goto end

:commit7
git add .
git commit -m "refactor: optimize database queries"
git push
goto end

:commit8
git add .
git commit -m "docs: update README with setup instructions"
git push
goto end

:commit9
git add .
git commit -m "chore: update dependencies"
git push
goto end

:commit10
git add .
git commit -m "feat: add todo filters and search"
git push
goto end

:commit11
git add .
git commit -m "feat: add dark mode support"
git push
goto end

:commit12
git add .
git commit -m "fix: resolve authentication issues"
git push
goto end

:status
git status
echo.
pause
goto menu

:end
echo.
echo Commit realizado exitosamente!
pause