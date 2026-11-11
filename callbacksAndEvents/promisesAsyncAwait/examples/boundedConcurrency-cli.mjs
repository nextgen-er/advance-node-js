import { TaskQueue } from "../src/boundedConcurrency.mjs"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const concurrency = 2

async function main() {
    const queue = new TaskQueue(concurrency);
    console.log(`Task Queue initialized with concurrency: ${concurrency}`)

    const jobs = [
        { id: 1, duration: 1500, type: "Resize Image" },
        { id: 2, duration: 500, type: "Send Email" },
        { id: 3, duration: 1000, type: "Generate PDF" },
        { id: 4, duration: 800, type: "Process Payment" },
        { id: 5, duration: 1200, type: "Sync Database" },
    ]

    const promises = jobs.map(job => {
        return queue.runTask(async () => {
            console.log(`[Start] job #${job.id} ${job.type}`)
            await delay(job.duration);
            console.log(`[Done]  job #${job.id} ${job.type} after ${job.duration}ms`)
            return `Result of Job ${job.id}`
        })
    })

    const results = await Promise.all(promises)
    console.log("\nAll tasks completed successfully:", results);
}

main();
