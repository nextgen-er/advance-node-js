import path from "node:path";
import { fileURLToPath } from "node:url";

import {
    readFile,
    writeFile,
    fileExists,
    getExtension
} from "../src/fsUtils.mjs";

// Equivalent of __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, "input.txt");
const outputFile = path.join(__dirname, "output.txt");

console.log("Input exists:", fileExists(inputFile));
console.log("Extension:", getExtension(inputFile));

const content = readFile(inputFile);

console.log("\nFile Content:");
console.log(content);

writeFile(
    outputFile,
    "This file was generated using ES Modules."
);

console.log("\noutput.txt created successfully.");
