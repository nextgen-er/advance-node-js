import {
    count,
    increment
} from "../src/counter.mjs";

console.log("Initial Count:", count);

increment();

console.log("After increment():", count);

// ❌ Attempt to modify an imported binding
count = 100;

console.log(count);
