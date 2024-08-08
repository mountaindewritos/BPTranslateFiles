# Translation Patch Updater Scripts by Zakum
These scripts automate the process of updating the translation patch. It uses [DeepL](https://www.deepl.com/) to machine translate any text that has been added since the last time the scripts were run--in other words, it will translate the new text added every game update.

After some text has been machine translated once, it won't be overwritten, so you can contribute manual fixes/edits directly to the same file (see [contributing translations](#contributing-translations)).

## Usage
Requires NodeJS and NPM to be installed. 
Run `npm i` to install the required packages.
Then simply run `npm run update-patch` in the root directory whenever you wish to update the translation patch.

Run `npm run delete-tmp` if you wish to clear temporary files that were used to generate the translation files.

## What the script does
1. fetch_api.cjs: grab server `.json`s that need to be translated
2. [UnrealExporter](https://github.com/whotookzakum/UnrealExporter): extract `.uasset`s and `.uexp`s (need both)
3. [UE4LocalizationsTool](https://github.com/amrshaheen61/UE4LocalizationsTool): merge all `.uasset` contents into a single `ja_JP.txt` containing client text
4. compileJaText.js: create `ja_JP_unique_strings.txt` with every unique Japanese string in the game that isn't already translated in `dictionary.json`
5. fetchTranslation.js: translate the `ja_JP_unique_strings.txt` into `en_US_unique_strings.txt` via DeepL API with `glossary.csv`
6. updateDictionary.js: merge `ja_JP_unique_strings.txt` and `en_US_unique_strings.txt` by their indices and update `dictionary.json`
7. applyTranslation.js: reconstruct the original game files using `dictionary.json` to translate text and output them; server files are now ready
8. UE4LocalizationsTool: inject English text from `en_US.txt` from the previous step into the `.uassets`
9. [repak](https://github.com/trumank/repak): create a new `.pak` file using the `.uassets` from the previous step; client file is now ready  

The translated files are available in `/patch`.

## Contributing Translations
Translation files can be found inside `/i18n`. **Do not edit any of the `_unique_strings.txt` files as those are overwritten every time the patch is updated, so your changes won't persist.** Kindly make your edits and open a pull request.

Edit `dictionary.json` if the text in question only appears by itself (not inside of multiple sentences) and probably won't be reused in future updates.

For proper nouns and commonly recurring words/phrases, add to `glossary.csv` while maintaining the existing format. DeepL accepts glossaries which allow you to translate parts of text in a specific way. This way we can keep certain names consistent every time they are machine translated. 

> [!NOTE]
> Editing the glossary will not retroactively change strings--it will only apply to future translations. So if the name you add is already inside of `dictionary.json`, you will have to fix each instance manually. For example, if "Aerinse" already exists in the dictionary, but we want to change her name to "Aeryn", we need to add Aeryn to the glossary and manually change every instance of Aerinse in the glossary.

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