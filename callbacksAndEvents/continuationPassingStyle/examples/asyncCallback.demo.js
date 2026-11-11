const { addAsync } = require('../src/asyncCallbacks')

console.log('before addition')
addAsync(1, 2, (result) => console.log(`Result: ${result}`))
console.log("after addition")
