const path = require("node:path");

// Apply the monkey patch
require("../src/filePatcher");

const { readFile } = require("../src/fileReader");

const filePath = path.join(__dirname, "input.txt");

const content = readFile(filePath);

console.log("\nFile Content:");
console.log(content);
