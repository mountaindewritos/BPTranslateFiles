const start = performance.now();
const outputDir = "./scripts/server/apiext/"

const crypto = require('crypto');
const fs = require('fs');
const axios = require('axios');
const endpoints = require('./endpoints.json');
const headersSrc = fs.readFileSync('./scripts/server/request.txt', 'utf8');
const headersArr = headersSrc.split('\r\n');
headersArr.shift();
headersArr.shift();
const headers = {};

function decrypt(path, payload, iv) {
    const key = Buffer.from(
        '42777B2B69744B3625427C236D342E6279372429617E327A3D664D597A5E7E38',
        'hex',
    );

    iv = Buffer.from(iv, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let data = decipher.update(payload, 'base64', 'utf8');
    data += decipher.final('utf8');

    data = JSON.stringify(JSON.parse(data), null, 4);

    let fullFilePath = outputDir + path + ".json"
    try {
        fs.mkdirSync(fullFilePath.substring(0, fullFilePath.lastIndexOf("/")), { recursive: true });
    } catch { }
    fs.writeFileSync(fullFilePath, data, () => { });
}

for (let row of headersArr) {
    if (row.length < 3) continue;
    row = row.split(':');
    headers[row[0]] = row[1].substring(1);
}

console.log(headers);

let batches = [[]];
for (let endpoint of endpoints) {
    let topIdx = batches.length - 1;
    if (batches[topIdx].length > endpoints.length) {
        batches.push([]);
        topIdx++;
    }

    batches[topIdx].push(endpoint);
}

let top = [];
let doneCount = 0;
let totalFiles = 0;
let intvl = setInterval(() => {
    if (doneCount !== top.length) return;
    if (batches.length === 0) return clearInterval(intvl);
    doneCount = 0;
    totalFiles = 0;
    top = batches.shift() || [];
    if (top.length === 0) return clearInterval(intvl);
    for (let endpoint of top) {
        console.log(endpoint);
        totalFiles++;
        axios
            .get(`https://masterdata-main.aws.blue-protocol.com/apiext/${endpoint}`, {
                headers: {
                    'x-env-access-token': headers['x-env-access-token'],
                },
            })
            .then((res) => {
                let iv = res.headers['x-amz-meta-x-sb-iv'];
                let payload = res.data;
                doneCount++;
                decrypt(endpoint, payload, iv);
            });
    }

    console.log(`\nFetched ${totalFiles} files in ${((performance.now() - start) / 1000).toFixed(2)} seconds.\nDecrypting...`)
}, 1000);