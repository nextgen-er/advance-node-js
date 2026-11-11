function addCps(a, b, callback) {
    callback(a + b)
}

function subtractCps(a, b, callback) {
    callback(a - b)
}

module.exports = {
    addCps,
    subtractCps
}
