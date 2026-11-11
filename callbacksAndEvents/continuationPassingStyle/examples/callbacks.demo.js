const { addCps, subtractCps } = require('../src/callbacks')

console.log('before addition')
addCps(1, 2, (result) => console.log(`Result: ${result}`))
console.log("after addition")

console.log('before subtraction')
subtractCps(1, 2, (result) => console.log(`Result: ${result}`))
console.log("after subtraction")
