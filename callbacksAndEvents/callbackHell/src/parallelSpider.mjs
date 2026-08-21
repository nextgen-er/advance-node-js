import fs from 'fs'
import { urlToFilename, getPageLinks, download } from "../../../utils/spider.mjs"


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


export function spiderLinks(currentUrl, body, nesting, cb) {
    if (nesting === 0) return process.nextTick(cb)

    const links = getPageLinks(currentUrl, body)
    if (links.length === 0) return process.nextTick(cb)

    let completed = 0;
    let hasErrors = false;

    function done(err) {
        if (err) {
            hasErrors = true;
            return cb(err)
        }
        if (++completed === links.length && !hasErrors) return cb()
    }

    links.forEach(link => spider(link, nesting - 1, done))
}
