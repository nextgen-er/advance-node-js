console.log("▶ Evaluating moduleA");

export let valueA = "Initial A";

import { valueB } from "./successModuleB.mjs";

export function printA() {
    console.log("\nprintA()");
    console.log("valueA =", valueA);
    console.log("valueB =", valueB);
}

valueA = "Updated A";

console.log("✔ moduleA evaluated");
