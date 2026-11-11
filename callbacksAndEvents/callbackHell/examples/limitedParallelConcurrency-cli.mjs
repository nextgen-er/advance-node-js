import { makeSampleTask } from "../src/limitParallelConcurrency.mjs";

const tasks = [
    makeSampleTask('Task 1'),
    makeSampleTask('Task 2'),
    makeSampleTask('Task 3'),
    makeSampleTask('Task 4'),
    makeSampleTask('Task 5'),
    makeSampleTask('Task 6'),
    makeSampleTask('Task 7'),
]

const concurrency = 2
let running = 0, completed = 0, index = 0

function finish() {
    console.log(`All the tasks are completed`)
}

function next() {
    while (running < concurrency && index < tasks.length) {
        const task = tasks[index++]
        task(() => {
            if (++completed == tasks.length) return finish()
            running--
            next()
        })
        running++
    }
}

next()
