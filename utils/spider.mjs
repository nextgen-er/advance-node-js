import fs from 'fs'
import path from 'path'
import { URL } from 'url'
import slug from 'slug'
import superagent from 'superagent'
import { mkdirp } from 'mkdirp'
import * as cheerio from 'cheerio'


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
