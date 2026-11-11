console.log("▶ Evaluating moduleB");

export let valueB = "Initial B";

import { valueA, printA } from "./fialedModuleA.mjs";

console.log("moduleB sees valueA:", valueA);

export function printB() {
    console.log("printB()");
    console.log("valueA =", valueA);
    console.log("valueB =", valueB);
}

valueB = "Updated B";

console.log("✔ Finished evaluating moduleB");
