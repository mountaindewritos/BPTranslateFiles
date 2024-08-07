import server_ja_JP from "../server/apiext/texts/ja_JP.json" assert { type: "json"};
import server_mount from "../server/apiext/mount.json" assert { type: "json" };
import dictionary from "../../i18n/ja-en/dictionary.json" with { type: "json" };
import fs from "fs";

function splitAndTranslate(str) {
    return str.split("\n").map(line => dictionary[line] || line).join("\n")
}

const server_texts_en = server_ja_JP.map(ns => {
    const texts = ns.texts.map(obj => ({ ...obj, text: splitAndTranslate(obj.text) }))
    return { ...ns, texts }
})

fs.writeFileSync('./patch/en_US.json', JSON.stringify(server_texts_en, null, 4), 'utf8')

const server_mount_en = server_mount.map(obj => ({
    ...obj,
    name: splitAndTranslate(obj.name),
    description: splitAndTranslate(obj.description),
}))

fs.writeFileSync('./patch/mount.json', JSON.stringify(server_mount_en, null, 4), 'utf8')

const client_en_US = fs.readFileSync("./scripts/client/UE4LocalizationsTool/ja_JP.txt", 'utf8')
    .split("\r\n")
    .map(line => {
        if (line.startsWith("Text=")) {
            const ja_text = line.replace("Text=", "")
            return `Text=${splitAndTranslate(ja_text)}`
        }
        return line
    })
    .join("\n")

fs.writeFileSync('./scripts/client/UE4LocalizationsTool/en_US.txt', client_en_US, 'utf8')
