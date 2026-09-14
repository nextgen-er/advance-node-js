import EventEmitter from 'events'
import fs from 'fs'
import path from 'path'

class TaskQueue extends EventEmitter {
    constructor(concurrency) {
        super()
        this.concurrency = concurrency
        this.running = 0
        this.queue = []
    }

    pushTask(task) {
        this.queue.push(task)
        process.nextTick(this.next.bind(this))
        return this
    }

    next() {
        if (this.running === 0 && this.queue.length === 0) return this.emit('empty')
        while (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift()
            task((err) => {
                if (err) this.emit('error', err)
                this.running--
                process.nextTick(this.next.bind(this))
            })
            this.running++
        }
    }
}



function recursiveFind(dir, keyword, cb) {

    const queue = new TaskQueue(4)
    const matchingFiles = []
    let activeOperations = 0
    let finished = false

    function handleError(err) {
        if (finished) return
        finished = true
        cb(err)
    }

    function checkFinished() {
        if (finished) return
        if (activeOperations === 0 && queue.queue.length === 0 && queue.running === 0) {
            finished = true
            cb(null, matchingFiles)
        }
    }

    function scanDir(currentDir) {
        activeOperations++
        fs.readdir(currentDir, { withFileTypes: true }, (err, entries) => {
            activeOperations--
            if (err) return handleError(err)

            entries.forEach(entry => {
                const fullPath = path.join(currentDir, entry.name)

                if (entry.isDirectory()) {
                    scanDir(fullPath)
                } else if (entry.isFile()) {
                    activeOperations++
                    queue.pushTask((taskDone) => {
                        fs.readFile(fullPath, 'utf8', (err, content) => {
                            activeOperations--
                            if (err) {
                                taskDone(err)
                                return handleError(err)
                            }

                            if (content.includes(keyword)) matchingFiles.push(fullPath)
                            taskDone()
                            checkFinished()
                        })
                    })
                }
            })
            checkFinished()
        })
    }
    scanDir(dir)
}

recursiveFind('myDir', 'batman',
    (err, files) => {
        if (err) {
            console.error('error in matching the keyword', err)
            return
        }
        console.log(files)
        console.log('Successfully fetched the list of files with matching keywords')
    }
)
