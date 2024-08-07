@echo off

@rem Get server text
node scripts\server\fetch_api.cjs

@rem Get client files
cd scripts\client\UnrealExporter
UnrealExporter.exe config

@rem Extract client text
cd ..\UE4localizationsTool
UE4localizationsTool.exe exportall ..\UnrealExporter\BLUEPROTOCOL\Content\Text ja_JP.txt

@rem Translate client and server files
cd ..\..\tx
node compileJaText
node fetchTranslation
node updateDictionary
node applyTranslation @rem Create translated server files

@rem Create translated .uassets
cd ..\client\UE4localizationsTool
UE4localizationsTool.exe -importall ..\UnrealExporter\BLUEPROTOCOL\Content\Text en_US.txt

@rem Create translated .pak
cd ..\repak
repak.exe pack ..\UnrealExporter\BLUEPROTOCOL ..\..\..\patch\blast_translation_mod_1_P.pak
@rem List contents
@REM repak.exe list ..\..\..\patch\blast_translation_mod_1_P.pak