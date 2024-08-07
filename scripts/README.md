# Translation Patch Updater Scripts by Zakum
Requires NodeJS and NPM to be installed. 
Run `npm i` to install the required packages.
Then simply run `npm run update-patch` in the root directory whenever you wish to update the translation patch.

## What the script does
1. fetch_api.cjs: grab server `.json`s that need to be translated
2. [UnrealExporter](https://github.com/whotookzakum/UnrealExporter): extract `.uasset`s and `.uexp`s (need both)
3. [UE4LocalizationsTool](https://github.com/amrshaheen61/UE4LocalizationsTool): merge all `.uasset` contents into a single `ja_JP.txt` containing client text
4. compileJaText.js: create `ja_JP_unique_strings.txt` with every unique Japanese string in the game that isn't already translated in `dictionary.json`


4. DeepL API: translate the `ja_unique_strings.txt` into `en_machine_translation.txt`, optionally including a glossary
5. Script: construct an object matching the indices of `ja_unique_strings.txt` and `en_machine_translation.txt`. Read `en_manual_translation.json`. Loop through `ja_JP.json` and `ja_client_text.txt`, replacing Japanese text with English text by matching object keys. Manual > Machine > Original (fallback). Output as `en_US.json` and `en_client_text.txt`.
6. UE4LocalizationsTool: inject `en_client_text.txt` from step 5 into the `.uassets`
7. repak: create a new `.pak` file using the `.uassets` from step 6

