import superagent from 'superagent'
import { promises as fspromises } from 'fs'
import { getPageLinks, urlToFilename } from '../../../utils/spider.mjs'
import { mkdirp } from 'mkdirp'
import { dirname } from 'path'
import { promisify } from 'util'

const mkdirpPromised = promisify(mkdirp)


export function spider(url, nesting) {
    const filename = urlToFilename(url)
    return fspromises.readFile(filename, 'utf8')
        .catch(
            (err) => {
                if (err.code !== 'ENOENT') throw err
                return download(url, filename)
            })
        .then(
            content => spiderLinks(url, content, nesting)
        )
}

function spiderLinks(currentUrl, content, nesting) {
    if (nesting === 0) return Promise.resolve()

    const links = getPageLinks(currentUrl, content)
    const promises = links.map(link => spider(link, nesting - 1))
    return Promise.all(promises)
}


export function download(url, filename) {
    console.log(`Downloading ${url}`)

    let content
    return superagent.get(url)
        .then((res) => {
            content = res.text
            return mkdirp(dirname(filename))
            // Following line was used instead of above for custom Promisifying mkdirp but in the modern version of mkdirp, it natively return promises.
            // return mkdirpPromised(dirname(filename))
        })
        .then(() =>
            fspromises.writeFile(filename, content)
        )
        .then(() => {
            console.log(`Downloaded and saved: ${url}`)
            return content
        })
}
