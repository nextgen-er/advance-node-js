import { EventEmitter } from 'events'

export function ticker(milliseconds, callback) {
    const emitter = new EventEmitter()
    let count = 0;

    const interval = setInterval(() => {
        count++
        emitter.emit('tick')
    }, 50)

    setTimeout(() => {
        clearInterval(interval)
        callback(count)
    }, milliseconds)

    return emitter
}
