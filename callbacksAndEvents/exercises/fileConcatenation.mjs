import fs from 'fs'

function fileConcatenat(...args) {
    const cb = args.pop()
    const dest = args.pop()

    const sources = args

    if (sources.length < 2) return cb(new Error('At least two source files are required'))

    let currentIndex = 0;

    function processNext() {
        if (currentIndex === sources.length) return cb(null)

        const currentFile = sources[currentIndex++]
        fs.readFile(currentFile, 'utf8', (err, data) => {
            if (err) return cb(err)

            const writeMethod = (currentIndex === 1) ? fs.writeFile : fs.appendFile

            writeMethod(dest, data, 'utf8', (err) => {
                if (err) return cb(err)
                processNext()
            })
        })
    }

    processNext()
}


fileConcatenat(
    './sourceFileConcat/data.txt',
    './sourceFileConcat/long-doc.txt',
    './sourceFileConcat/simple.txt',
    './destinationFileConcat/output.txt',
    (err) => {
        if (err) {
            console.error('Error concatenating files:', err)
            return
        }
        console.log('Files concatenated successfully!')
    }
)
