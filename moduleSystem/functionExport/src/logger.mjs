/**
 * Logs a message with a timestamp.
 */
export function log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
}
