# Translation Patch Updater Scripts by Zakum
Requires NodeJS and NPM to be installed. 
Run `npm i` to install the required packages.
Then simply run `npm run update-patch` in the root directory whenever you wish to update the translation patch.

## What the script does
1. fetch_api.cjs: grab server `.json`s that need to be translated
2. [UnrealExporter](https://github.com/whotookzakum/UnrealExporter): extract `.uasset`s and `.uexp`s (need both)
3. [UE4LocalizationsTool](https://github.com/amrshaheen61/UE4LocalizationsTool): merge all `.uasset` contents into a single `ja_JP.txt` containing client text
4. compileJaText.js: create `ja_JP_unique_strings.txt` with every unique Japanese string in the game that isn't already translated in `dictionary.json`
5. fetchTranslation.js: translate the `ja_JP_unique_strings.txt` into `en_US_unique_strings.txt` via DeepL API with `glossary.csv`
6. updateDictionary.js: merge `ja_JP_unique_strings.txt` and `en_US_unique_strings.txt` by their indices and update `dictionary.json`
7. applyTranslation.js: loop over game files, using `dictionary.json` to translate text, and output them; server files are now ready
8. UE4LocalizationsTool: inject `en_US.txt` from the previous step into the `.uassets`
9. repak: create a new `.pak` file using the `.uassets` from the previous step; client file is now ready

## Contributing Translations
Translation files can be found inside `/i18n`. **Do not edit any of the `_unique_strings.txt` files as those are overwritten every time the patch is updated, so your changes won't persist.** Kindly make your edits and open a pull request.

Edit `dictionary.json` if the text in question only appears by itself (not inside of multiple sentences) and probably won't be reused in future updates.

For proper nouns and commonly recurring words/phrases, add to `glossary.csv` while maintaining the existing format. DeepL accepts glossaries which allow you to translate parts of text in a specific way. This way we can keep certain names consistent every time they are machine translated. 

### Examples
> "I told Feste where to find Jake"  
"Feste" commonly appears within various sentences throughout the game/probably will in future updates → add `フェステ,Feste` to `glossary.csv`

> "†Chosen by the Bow†" (in-game title)  
"†Chosen by the Bow†" appears only as a title and not in the middle of any sentences and probably won't in future updates → edit `"†弓に選ばれし者†": "†Chosen by the Bow†",` in `dictionary.json`

## Misc
TODO: add tags to glossary (incomplete)
<lf>
<a>
<cf>
<cr>
<word>
<p ...>
<span>
<d ...>
<key>
<value>
</>
{Leader}
other braced text