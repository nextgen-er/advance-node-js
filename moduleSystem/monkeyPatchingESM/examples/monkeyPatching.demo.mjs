import fs from "node:fs";

import {
    mockEnable,
    mockDisable
} from "../src/mockReadFile.mjs";

console.log("\n--- Before Monkey Patch ---");

fs.readFile("does-not-exist.txt", (err) => {

    if (err) {
        console.log("Original fs.readFile()");
        console.log(err.code);
    }

    console.log("\n--- Enable Monkey Patch ---");

    mockEnable(Buffer.from("Hello World"));

    fs.readFile("fake-path.txt", (err, data) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log("Patched Output:");
        console.log(data.toString());

        console.log("\n--- Disable Monkey Patch ---");

        mockDisable();

        fs.readFile("does-not-exist.txt", (err) => {

            console.log("Original fs.readFile() restored:");
            console.log(err.code);
        });

    });

});
