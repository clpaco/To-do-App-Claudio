@echo off
REM filepath: c:\Users\pasto\react\supabase-todos\git-commits.bat

echo ====================================
echo   GIT COMMITS - Supabase Todos
echo ====================================
echo.

:menu
echo Selecciona el tipo de commit:
echo.
echo 1. feat: Nueva caracteristica
echo 2. fix: Correccion de bug
echo 3. docs: Documentacion
echo 4. style: Formato/estilos
echo 5. refactor: Refactorizacion
echo 6. test: Tests
echo 7. chore: Mantenimiento
echo 8. Commit personalizado
echo 9. Ver status
echo 0. Salir
echo.

set /p option="Elige una opcion (0-9): "

if "%option%"=="1" goto feat
if "%option%"=="2" goto fix
if "%option%"=="3" goto docs
if "%option%"=="4" goto style
if "%option%"=="5" goto refactor
if "%option%"=="6" goto test
if "%option%"=="7" goto chore
if "%option%"=="8" goto custom
if "%option%"=="9" goto status
if "%option%"=="0" goto end
goto menu

:feat
set /p msg="Mensaje del commit (feat): "
git add .
git commit -m "feat: %msg%"
git push
goto end

:fix
set /p msg="Mensaje del commit (fix): "
git add .
git commit -m "fix: %msg%"
git push
goto end

:docs
set /p msg="Mensaje del commit (docs): "
git add .
git commit -m "docs: %msg%"
git push
goto end

:style
set /p msg="Mensaje del commit (style): "
git add .
git commit -m "style: %msg%"
git push
goto end

:refactor
set /p msg="Mensaje del commit (refactor): "
git add .
git commit -m "refactor: %msg%"
git push
goto end

:test
set /p msg="Mensaje del commit (test): "
git add .
git commit -m "test: %msg%"
git push
goto end

:chore
set /p msg="Mensaje del commit (chore): "
git add .
git commit -m "chore: %msg%"
git push
goto end

:custom
set /p msg="Mensaje completo del commit: "
git add .
git commit -m "%msg%"
git push
goto end

:status
git status
echo.
pause
goto menu

:end
echo.
echo Proceso completado!
pause