import server_ja_JP from "../server/apiext/texts/ja_JP.json"
import fs from "fs";
import uniq from "lodash/uniq";

// Create a .txt file with every unique Japanese string in the server and client
function compileJaText() {
    const server_strings = server_ja_JP.flatMap(ns =>
        ns.texts.flatMap(obj => obj.text.split("\n")) // Split by "\n" to further reduce duplicates. \"enemy name"\ not handled.
    )

    const client_strings = fs.readFileSync("./scripts/client/UE4LocalizationsTool/ja_JP.txt", 'utf8')
        .split("\r\n")
        .reduce((acc, str) => {
            if (str.startsWith("Text=")) acc.push(str.replace("Text=", ""))
            return acc
        }, [])

    const ja_unique_strings = uniq([...server_strings, ...client_strings])

    // TODO: Only add the strings that don't already exist in the dictionary
    fs.writeFileSync('ja_JP_strings.txt', ja_unique_strings.join("\n"), 'utf8')
}

// Translate ja_JP_strings.txt into en_US_strings.txt
function fetchTranslation() {
    // DeepL API
    // Use glossary
}

// Read the machine translated .txt file and reconcile into a single-object .json
function createDictionary() {
    const original_strings = fs.readFileSync("./ja_JP_strings.txt", 'utf8').split("\n")
    const translated_strings = fs.readFileSync("./en_US_strings.txt", 'utf8').split("\n")
    const machine_tx_dict =
        original_strings.reduce((acc, og_str, index) => {
            acc[og_str] = translated_strings[index]
            return acc
        }, {})

    // TODO: New dictionary should be the previous one + newest entries
    fs.writeFileSync('ja_en_dictionary.json', JSON.stringify(machine_tx_dict), 'utf8')
}

// Construct new localization files based on the dictionary
function applyDictionary() {
    const server_en_US = server_ja_JP.map(ns => {
        const texts = ns.texts.map(obj => {
            const text = obj.text.split("\n").map(line => machine_translation_bank[line] || line).join("\n")
            return { ...obj, text }
        })
        return { ...ns, texts }
    })

    fs.writeFileSync('./scripts/server/apiext/texts/en_US.json', JSON.stringify(server_en_US), 'utf8')

    const client_en_US = ""

    fs.writeFileSync('./scripts/client/UE4LocalizationsTool/en_US.txt', client_en_US, 'utf8')
}

// compileJaText()
// fetchTranslation()
// createDictionary()
// applyDictionary()