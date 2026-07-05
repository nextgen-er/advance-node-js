console.log("Loading b.js");

exports.name = "Module B";

const a = require("./a");

console.log("In b.js");
console.log("a.name =", a.name);
console.log("a.ready =", a.ready);

exports.ready = true;

console.log("Finished loading b.js");
