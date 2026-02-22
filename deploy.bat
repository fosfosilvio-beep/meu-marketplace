@echo off
echo.
echo ====================================
echo   🚀 DEPLOY AUTOMÁTICO - VERCEL
echo ====================================
echo.

REM Adicionar todas as mudanças
echo [1/3] Adicionando arquivos...
git add .
if %errorlevel% neq 0 (
    echo ❌ Erro ao adicionar arquivos
    pause
    exit /b 1
)

REM Fazer commit
echo [2/3] Criando commit...
git commit -m "Atualização automática - %date% %time%"
if %errorlevel% neq 0 (
    echo ⚠️ Nenhuma mudança detectada
    pause
    exit /b 0
)

REM Enviar para GitHub
echo [3/3] Enviando para GitHub...
git push
if %errorlevel% neq 0 (
    echo ❌ Erro ao enviar
    pause
    exit /b 1
)

echo.
echo ====================================
echo   ✅ DEPLOY REALIZADO COM SUCESSO!
echo ====================================
echo.
echo ⏰ Aguarde 2-3 minutos
echo 🌐 Acesse: https://vercel.com
echo.
pause