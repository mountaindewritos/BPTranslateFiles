import server_ja_JP from "../server/apiext/texts/ja_JP.json" with { type: "json"};
import server_mount from "../server/apiext/mount.json" with { type: "json" };
import dictionary from "../../i18n/ja-en/dictionary.json" with { type: "json" };
import fs from "fs";
import uniq from "lodash/uniq.js";

console.log("Compiling untranslated strings...")

const server_ja_JP_strings = server_ja_JP.flatMap(ns =>
    // Split by "\n" to further reduce duplicates. \"enemy name"\ not handled.
    ns.texts.flatMap(obj => obj.text.split("\n"))
)

// Assumes mount.json name and description don't contain any "\n"
const server_mount_strings = server_mount.flatMap(obj => ([obj.name, obj.description]))

const client_strings = fs.readFileSync("./scripts/client/UE4LocalizationsTool/ja_JP.txt", 'utf8')
    .split("\r\n")
    .reduce((acc, str) => {
        if (str.startsWith("Text=")) acc.push(str.replace("Text=", ""))
        return acc
    }, [])


const ja_unique_strings =
    uniq([...server_ja_JP_strings, ...server_mount_strings, ...client_strings])
        // Only add the strings that don't already exist in the dictionary
        .filter(str => !(str in dictionary))

const joined = ja_unique_strings.join("\n")

fs.writeFileSync('./i18n/ja-en/ja_JP_unique_strings.txt', joined, 'utf8')

console.log(`Created ja_JP_unique_strings.txt with ${ja_unique_strings.length} strings (${joined.length} characters)`)