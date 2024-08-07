import dictionary from "../../i18n/ja-en/dictionary.json" with { type: "json" };
import fs from "fs";

// Read the machine translated .txt file and reconcile into a single-object .json
const original_strings = fs.readFileSync("./i18n/ja-en/ja_JP_unique_strings.txt", 'utf8').split("\n")
const translated_strings = fs.readFileSync("./i18n/ja-en/en_US_unique_strings.txt", 'utf8').split("\n")
const machine_tx_dict =
    original_strings.reduce((acc, og_str, index) => {
        acc[og_str] = translated_strings[index].replace("\r", "")
        return acc
    }, {})

// TODO: New dictionary should be the previous one + newest entries
fs.writeFileSync('./i18n/ja-en/dictionary.json', JSON.stringify(machine_tx_dict, null, 4), 'utf8')
