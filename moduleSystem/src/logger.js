class Logger {
    constructor() {
        console.log("Logger instance created");
        this.logs = [];
    }

    log(message) {
        this.logs.push(message);
    }

    getLogs() {
        return this.logs;
    }
}

module.exports = new Logger();
