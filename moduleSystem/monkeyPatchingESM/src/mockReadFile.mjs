import fs from "node:fs";

// Save the original implementation
const originalReadFile = fs.readFile;

/**
 * Enables the monkey patch.
 *
 * @param {Buffer} fakeContent
 */
export function mockEnable(fakeContent) {

    fs.readFile = function (path, options, callback) {

        // Handle both signatures:
        // fs.readFile(path, callback)
        // fs.readFile(path, options, callback)

        if (typeof options === "function") {
            callback = options;
        }

        console.log("[Monkey Patch] Intercepted:", path);

        process.nextTick(() => {
            callback(null, fakeContent);
        });
    };

    console.log("✅ Monkey patch enabled");
}

/**
 * Restores the original implementation.
 */
export function mockDisable() {

    fs.readFile = originalReadFile;

    console.log("✅ Monkey patch disabled");
}
