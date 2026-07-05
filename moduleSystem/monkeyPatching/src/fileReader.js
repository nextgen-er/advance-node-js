const fs = require("node:fs");

function readFile(filePath) {
    return fs.readFileSync(filePath, "utf8");
}

module.exports = {
    readFile
};
