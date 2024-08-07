import server_ja_JP from "../server/apiext/texts/ja_JP.json" assert { type: "json"};
import server_mount from "../server/apiext/mount.json" assert { type: "json" };
import fs from "fs";

// Reconstruct the original game files with the translations
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
