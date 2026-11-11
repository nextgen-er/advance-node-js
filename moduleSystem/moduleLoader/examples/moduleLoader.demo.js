const path = require("path");

const { myRequire } = require("../src/moduleLoader");

const math = myRequire(
    path.join(__dirname, "math.js")
);

console.log("\nLoaded Module:");
console.log(math);

console.log("\nUsing exported functions:");

console.log("2 + 5 =", math.add(2, 5));
console.log("6 * 8 =", math.multiply(6, 8));
console.log("PI =", math.PI);
