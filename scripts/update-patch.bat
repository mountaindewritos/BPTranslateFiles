@echo off

@REM Get server text
node scripts\server\fetch_api.cjs

@REM Get client files
cd scripts\client\UnrealExporter
UnrealExporter.exe config

@REM Extract client text
cd ..\UE4localizationsTool
UE4localizationsTool.exe exportall ..\UnrealExporter\BLUEPROTOCOL\Content\Text ja_JP.txt