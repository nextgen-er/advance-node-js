console.log("Loading a.js");

exports.name = "Module A";

const b = require("./b");

console.log("In a.js");
console.log("b.name =", b.name);
console.log("b.ready =", b.ready);

exports.ready = true;

console.log("Finished loading a.js");
