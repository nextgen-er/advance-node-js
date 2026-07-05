function addAsync(a, b, callback) {
    setTimeout(() => callback(a + b), 100)
}

function subtractAsync(a, b, callback) {
    setTimeout(() => callback(a - b), 100)
}

module.exports = {
    addAsync,
    subtractAsync
}
