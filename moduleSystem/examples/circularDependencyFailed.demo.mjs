import {
    printA,
    valueA
} from "../src/fialedModuleA.mjs";

import {
    printB,
    valueB
} from "../src/failedModuleB.mjs";

console.log("\n=== Main Module ===");

console.log("valueA =", valueA);
console.log("valueB =", valueB);

printA();

printB();
