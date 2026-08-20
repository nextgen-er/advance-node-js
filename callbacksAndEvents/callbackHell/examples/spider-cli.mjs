import { spider } from '../src/spider.mjs'

spider(process.argv[2], (err, filename, downloaded) => {
    if (err) {
        console.error(err)
    } else if (downloaded) {
        console.log(`Completed the download of "${filename}"`)
    } else {
        console.log(`"${filename}" was already downloaded`)
    }
})
