@echo off
REM Ouvrir le site vitrine sur Windows
REM Double-cliquez simplement sur ce fichier.

cd /d "%~dp0"
set PORT=8000

where python >nul 2>nul
if %errorlevel%==0 (
    set PY=python
) else (
    where py >nul 2>nul
    if %errorlevel%==0 ( set PY=py ) else ( set PY= )
)

if "%PY%"=="" (
    echo.
    echo Python n'est pas installe.
    echo Ouvrez simplement le fichier index.html a la main (double-clic).
    echo.
    pause
    exit /b
)

echo Demarrage du serveur sur le port %PORT% ...
start "" http://localhost:%PORT%/index.html
%PY% -m http.server %PORT% --bind 127.0.0.1

echo.
echo Serveur arrete.
pause
