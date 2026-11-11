console.log("▶ Evaluating moduleB");

export let valueB = "Initial B";

import { valueA } from "./successModuleA.mjs";

export function printB() {
    console.log("\nprintB()");
    console.log("valueA =", valueA);
    console.log("valueB =", valueB);
}

valueB = "Updated B";

console.log("✔ moduleB evaluated");
