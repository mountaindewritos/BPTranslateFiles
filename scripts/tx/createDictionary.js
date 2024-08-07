import fs from "fs";

// Read the machine translated .txt file and reconcile into a single-object .json
const original_strings = fs.readFileSync("./ja_JP_strings.txt", 'utf8').split("\n")
const translated_strings = fs.readFileSync("./en_US_strings.txt", 'utf8').split("\n")
const machine_tx_dict =
    original_strings.reduce((acc, og_str, index) => {
        acc[og_str] = translated_strings[index]
        return acc
    }, {})

// TODO: New dictionary should be the previous one + newest entries
fs.writeFileSync('ja_en_dictionary.json', JSON.stringify(machine_tx_dict), 'utf8')
