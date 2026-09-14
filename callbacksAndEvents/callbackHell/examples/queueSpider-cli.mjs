import { spider } from '../src/queueSpider.mjs'
import { TaskQueue } from '../../../utils/spider.mjs'

const url = process.argv[2]                                         //(1)
const nesting = Number.parseInt(process.argv[3], 10) || 1
const concurrency = Number.parseInt(process.argv[4], 10) || 2

const spiderQueue = new TaskQueue(concurrency)                      //(2)
spiderQueue.on('error', console.error)
spiderQueue.on('empty', () => console.log('Download complete'))

spider(url, nesting, spiderQueue)                                   //(3)
