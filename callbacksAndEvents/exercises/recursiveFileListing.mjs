import fs from 'fs'
import path from 'path'

export function listNestedFiles(dirPath, cb) {
    const fileList = []

    fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
        if (err) return cb(err)

        let pending = entries.length
        if (pending.length === 0) return cb(null, fileList)

        let finished = false
        entries.forEach(entry => {
            if (finished) return

            const fullPath = path.join(dirPath, entry.name)
            if (entry.isDirectory()) {
                listNestedFiles(fullPath, (err, subFiles) => {
                    if (finished) return
                    if (err) {
                        finished = true
                        return cb(err)
                    }

                    fileList.push(...subFiles)
                    if (--pending === 0) {
                        finished = true
                        cb(null, fileList)
                    }
                })
            } else {
                fileList.push(fullPath)
                console.log(`filePath: ${fullPath}`)
                if (--pending === 0) {
                    finished = true
                    cb(null, fileList)
                }
            }
        })
    })
}

listNestedFiles(
    './fileDir',
    (err) => {
        if (err) {
            console.error(`Error in iterating directories`, err)
            return
        }
        console.log('Files are iterated successfully!')
    }
)
