import dictionary from "../../i18n/ja-en/dictionary.json" with { type: "json" };
import fs from "fs";

console.log("Updating dictionary...")

// Read the machine translated .txt file and reconcile into a single-object .json
const original_strings = fs.readFileSync("./i18n/ja-en/ja_JP_unique_strings.txt", 'utf8').split("\n")
const translated_strings = fs.readFileSync("./i18n/ja-en/en_US_unique_strings.txt", 'utf8').split("\n")

if (original_strings.length === translated_strings.length) {

    let linesAdded = 0

    // Add new translations to the existing dictionary
    original_strings.forEach((og_str, index) => {
        if (!(og_str in dictionary)) {
            dictionary[og_str] = translated_strings[index].replace("\r", "")
            linesAdded++
        }
    })

    fs.writeFileSync('./i18n/ja-en/dictionary.json', JSON.stringify(dictionary, null, 4), 'utf8')

    console.log(`Updated dictionary.json with ${linesAdded} strings (${Object.keys(dictionary).length} total)`)
}
else {
    console.log("ERROR: Dictionary not updated. ja_JP_unique_strings.txt and en_US_unique_strings.txt need to have the same number of lines so that translations line up properly.")
}