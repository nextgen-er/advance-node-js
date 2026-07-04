console.log("▶ Evaluating moduleA");

export let valueA = "Initial A";

import { valueB, printB } from "./failedModuleB.mjs";

console.log("moduleA sees valueB:", valueB);

export function printA() {
    console.log("printA()");
    console.log("valueA =", valueA);
    console.log("valueB =", valueB);
}

valueA = "Updated A";

console.log("✔ Finished evaluating moduleA");
