import { EventEmitter } from 'events'

export class Observables extends EventEmitter {
    constructor(value = {}) {
        super()
        this.value = value
    }

    set(key, value) {
        const oldValue = this.value[key]
        this.value[key] = value

        this.emit('change', {
            key,
            oldValue,
            newValue: value
        })
    }

    get(key) {
        return this.value[key]
    }
}
