import fs from 'fs'
import { download, getPageLinks, urlToFilename } from "../../../utils/spider.mjs";

const spidering = new Set()

export function spider(url, nesting, queue) {
    if (spidering.has(url)) return
    spidering.add(url)

    queue.pushTask((cb) => {
        spiderTask(url, nesting, queue, cb)
    })
}

export function spiderTask(url, nesting, queue, cb) {
    const filename = urlToFilename(url)

    fs.readFile(filename, 'utf8', (err, fileContent) => {
        if (err) {
            if (err.code !== 'ENOENT') return cb(err)
            return download(url, filename, (err, requestContent) => {
                if (err) return cb(err)
                spiderLinks(url, requestContent, nesting, queue)
                return cb()
            })
        }

        spiderLinks(url, fileContent, nesting, queue)
    })
}

function spiderLinks(currentUrl, body, nesting, queue) {
    if (nesting === 0) return

    const links = getPageLinks(currentUrl, body)
    if (links.length === 0) return

    links.forEach(link => spider(link, nesting - 1, queue))
}
