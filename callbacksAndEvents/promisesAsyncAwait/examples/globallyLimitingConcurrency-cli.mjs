import spider from '../src/globallyLimittingConcurrency.mjs'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1
const concurrency = Number.parseInt(process.argv[4], 10) || 1

spider(url, nesting, concurrency)
    .then(() => console.log(`Download Completed!`))
    .catch(err => console.error(err))
