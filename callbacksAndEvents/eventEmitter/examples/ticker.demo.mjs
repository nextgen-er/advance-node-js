import { ticker } from '../src/ticker.mjs'

ticker(900, count => {
    console.log(`Total ticks: ${count}`)
})
    .on('tick', () => {
        console.log(`tick`)
    })
