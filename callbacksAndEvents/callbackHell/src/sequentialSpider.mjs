import fs from 'fs'
import { urlToFilename, getPageLinks, download } from "../../../utils/spider.mjs"

export function spiderLinks(currentUrl, body, nesting, cb) {
    if (nesting === 0) return process.nextTick(cb)

    const links = getPageLinks(currentUrl, body)
    if (links.length === 0) return process.nextTick(cb)

    function iterate(index) {
        if (index === links.length) return cb()

        spider(links[index], nesting - 1, function (err) {
            if (err) return cb(err)
            iterate(index + 1)
        })
    }

    iterate(0)
}

export function spider(url, nesting, cb) {
    const filename = urlToFilename(url)
    fs.access(filename, err => {
        if (!err || err.code !== 'ENOENT') return cb(null, filename, false)
        console.log(`Downloading ${url} into ${filename}`)

        download(url, filename, (err, requestContent) => {
            if (err) return cb(err)
            spiderLinks(url, requestContent, nesting, cb)
        })
    })
}
