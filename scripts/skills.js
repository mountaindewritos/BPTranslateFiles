import skills_translated from "./skills_translated.json" with { type: "json" };
import fs from "fs";

const csvFormat = []

const result = []

Object.entries(skills_translated.master_skill_data_text).forEach(([key, value]) => {
    if (!key.includes("\n") && !key.includes(":") && !key.includes("。") && !key.includes("、") && !key.includes("：")) result.push(`${key},${value}`)

    key.split("\n").forEach((part, index) => {
        // if (!part.includes("：") && !part.includes(":")) result.push(`${part},"${value.split("\n")[index]}",JA,EN`)
        
        // result.push(value.split("\n")[index])
    })
})

fs.writeFileSync('./scripts/uniq_skills.csv', result.join("\n"))
