import { spider } from '../src/parallelSpider.mjs'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1

spider(url, nesting, err => {
    if (err) return process.exit
    console.log("Download Complete...")
})
