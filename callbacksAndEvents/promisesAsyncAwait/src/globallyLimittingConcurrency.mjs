import { dirname } from 'path'
import superagent from 'superagent'
import { promises as fspromises } from 'fs'
import { getPageLinks, urlToFilename } from '../../../utils/spider.mjs'
import { mkdirp } from 'mkdirp'

class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency
        this.running = 0
        this.queue = []
    }

    runTask(task) {
        return new Promise((resolve, reject) => {
            this.queue.push(() => {
                return task().then(resolve, reject)
            })
            process.nextTick(this.next.bind(this))
        })
    }

    next() {
        while (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift()
            task().finally(() => {
                this.running--
                this.next()
            })
            this.running++
        }
    }
}


function download(url, filename) {
    console.log(`Downloading ${url}`)

    let content
    return superagent.get(url)
        .then(res => {
            content = res.text
            return mkdirp(dirname(filename))
        })
        .then(() => fspromises.writeFile(filename, content))
        .then(() => {
            console.log(`Downloaded and saved: ${url}`)
            return content
        })
}

const spidering = new Set()

function spiderTask(url, nesting, queue) {
    if (spidering.has(url)) return Promise.resolve()
    spidering.add(url)

    const filename = urlToFilename(url)

    return queue.runTask(() => {
        return fspromises.readFile(filename, 'utf8')
            .catch(err => {
                if (err.code !== 'ENOENT') throw err
                return download(url, filename)
            })
            .then(content => spiderLinks(url, content, nesting, queue))
    })
}

function spiderLinks(currentUrl, content, nesting, queue) {
    if (nesting === 0) return Promise.resolve()

    const links = getPageLinks(currentUrl, content)
    const promises = links.map(link => spiderTask(link, nesting - 1, queue))

    return Promise.all(promises)
}


export default function spider(url, nesting, concurrency) {
    const queue = new TaskQueue(concurrency)
    return spiderTask(url, nesting, queue)
}
