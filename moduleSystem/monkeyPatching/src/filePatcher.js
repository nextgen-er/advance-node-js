const fs = require("node:fs");

// Save the original implementation
const originalReadFileSync = fs.readFileSync;

// Replace it with a patched version
fs.readFileSync = function (filePath, encoding) {

    console.log(`[Monkey Patch] Reading file: ${filePath}`);

    const content = originalReadFileSync(filePath, encoding);

    console.log("[Monkey Patch] File read successfully.");

    return content;
};
