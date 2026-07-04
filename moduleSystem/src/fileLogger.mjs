import fs from "node:fs";

export class FileLogger {

    constructor(filePath) {
        this.filePath = filePath;
    }

    log(message) {
        const timestamp = new Date().toISOString();
        fs.appendFileSync(
            this.filePath,
            `[${timestamp}] ${message}\n`
        );
    }

    clear() {
        fs.writeFileSync(this.filePath, "");
    }

    readLogs() {
        return fs.readFileSync(this.filePath, "utf8");
    }
}
