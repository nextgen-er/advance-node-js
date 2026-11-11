import fs from 'fs'
import path from 'path'
import { URL } from 'url'
import slug from 'slug'
import superagent from 'superagent'
import { mkdirp } from 'mkdirp'
import * as cheerio from 'cheerio'
import { EventEmitter } from 'events'



export function urlToFilename(url) {
    const parsedUrl = new URL(url)
    const urlPath = parsedUrl.pathname.split('/')
        .filter(function (component) {
            return component !== ''
        })
        .map(function (component) {
            return slug(component, { remove: null })
        })
        .join('/')
    let filename = path.join(parsedUrl.hostname, urlPath)
    if (!path.extname(filename).match(/htm/)) {
        filename += '.html'
    }

    return filename
}

function saveFile(filename, contents, cb) {
    fs.mkdir(path.dirname(filename), { recursive: true }, err => {
        if (err) return cb(err)
        fs.writeFile(filename, contents, cb)
    })
}

export function download(url, filename, cb) {
    console.log(`Downloading ${url}`)

    superagent.get(url).end((err, res) => {
        if (err) return cb(err)

        const content = res.text

        if (content === undefined) {
            return cb(new Error(`No text response received from ${url}`))
        }

        saveFile(filename, content, err => {
            if (err) return cb(err)

            console.log(`Downloaded and saved: ${url}`)
            cb(null, content)
        })
    })
}

function getLinkUrl(currentUrl, element) {
    const parsedLink = new URL(element.attribs.href || '', currentUrl)
    const currentParsedUrl = new URL(currentUrl)
    if (parsedLink.hostname !== currentParsedUrl.hostname ||
        !parsedLink.pathname) {
        return null
    }
    return parsedLink.toString()
};

export function getPageLinks(currentUrl, body) {
    return Array.from(cheerio.load(body)('a'))
        .map(function (element) {
            return getLinkUrl(currentUrl, element)
        })
        .filter(Boolean)
};

export class TaskQueue extends EventEmitter {
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
        if (this.running === 0 && this.queue.length === 0) {
            return this.emit('empty')
        }

        while (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift()
            task((err) => {
                if (err) {
                    this.emit('error', err)
                }
                this.running--
                process.nextTick(this.next.bind(this))
            })
            this.running++
        }
    }
}
