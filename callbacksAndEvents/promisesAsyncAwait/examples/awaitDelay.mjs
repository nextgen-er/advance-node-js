// Delay function with Async-Await

function delay(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date())
        }, milliseconds)
    })
}

async function awaitDelay() {
    console.log(`Delaying at ${new Date().getSeconds()}s`)

    const delayAfterOneSecond = await delay(1000)
    console.log(delayAfterOneSecond.getSeconds())

    const delayAfterThreeSecond = await delay(3000)
    console.log(delayAfterThreeSecond.getSeconds())

    return 'done'
}


// Error in Delay function using Async-Await

function delayError(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Error after ${milliseconds}ms`))
        }, milliseconds)
    })
}


async function awaitErrorDelay(throwSyncError) {
    try {
        if (throwSyncError) throw new Error('This is a synchronous Error')
        await delayError(1000)
    } catch (error) {
        console.error(`We have an asynchronous Error: ${error.message}`)
    } finally {
        console.log('Done!')
    }
}


//////// Calling Delay functions ////////
// awaitDelay()
//     .then(result => console.log(`After 4 seconds: ${result}`))

//////// Calling Error functions ////////
// awaitErrorDelay(false)
// awaitErrorDelay(true)
