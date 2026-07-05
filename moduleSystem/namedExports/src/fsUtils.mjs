import fs from "node:fs";
import path from "node:path";

/**
 * Reads the contents of a file.
 */
export function readFile(filePath) {
    return fs.readFileSync(filePath, "utf8");
}

/**
 * Writes content to a file.
 */
export function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content);
}

/**
 * Checks whether a file exists.
 */
export function fileExists(filePath) {
    return fs.existsSync(filePath);
}

/**
 * Returns the file extension.
 */
export function getExtension(filePath) {
    return path.extname(filePath);
}
