import {
    count,
    increment,
    decrement,
    reset
} from "../src/counter.mjs";

console.log("Initial Count:", count);

increment();
console.log("After increment():", count);

increment();
console.log("After second increment():", count);

decrement();
console.log("After decrement():", count);

reset();
console.log("After reset():", count);
