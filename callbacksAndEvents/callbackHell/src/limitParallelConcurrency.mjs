export function makeSampleTask(name) {
    return (cb) => {
        console.log(`${name} started`)
        setTimeout(() => {
            console.log(`${name} completed`)
            cb()
        }, Math.random() * 2000)
    }
}
