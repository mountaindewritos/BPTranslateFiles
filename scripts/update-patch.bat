@echo off

@rem Get server text
node scripts\server\fetch_api.cjs

@rem Get client files
cd scripts\client\UnrealExporter
UnrealExporter.exe config

@rem Extract client text
cd ..\UE4localizationsTool
UE4localizationsTool.exe exportall ..\UnrealExporter\BLUEPROTOCOL\Content\Text ja_JP.txt

@rem 
cd ..\..\tx
node compileJaText