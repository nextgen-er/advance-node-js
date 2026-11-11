import path from "node:path";
import { fileURLToPath } from "node:url";

import { FileLogger } from "../src/fileLogger.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFile = path.join(__dirname, "app.log");

const logger = new FileLogger(logFile);

logger.clear();

logger.log("Application started");
logger.log("User logged in");
logger.log("Application stopped");

console.log(logger.readLogs());
