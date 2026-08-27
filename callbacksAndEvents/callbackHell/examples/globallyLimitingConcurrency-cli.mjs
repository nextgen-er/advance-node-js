import { TaskQueue } from "../src/globallyLimitingConcurrency.mjs";

function makeSampleTask(name) {
    return (cb) => {
        console.log(`${name} started`)
        setTimeout(() => {
            console.log(`${name} completed`)
            cb()
        }, Math.random() * 2000)
    }
}

const queue = new TaskQueue(2)

function task1(cb) {
    console.log(`Task 1 started`)

    queue.pushTask(makeSampleTask('task 1 -> subtask 1'))
    queue.pushTask(makeSampleTask('task 1 -> subtask 2'))
    queue.pushTask(makeSampleTask('task 1 -> subtask 3'))

    setTimeout(() => {
        console.log(`Task 1 completed`)
        cb()
    }, Math.random() * 2000)
}


function task2(cb) {
    console.log(`Task 2 started`)

    queue.pushTask(makeSampleTask('task 2 -> subtask 1'))
    queue.pushTask(makeSampleTask('task 2 -> subtask 2'))
    queue.pushTask(makeSampleTask('task 2 -> subtask 3'))

    setTimeout(() => {
        console.log(`Task 2 completed`)
        cb()
    }, Math.random() * 2000)
}

queue.pushTask(task1)
queue.pushTask(task2)
