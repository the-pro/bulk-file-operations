const fs = require('graceful-fs')
const rimraf = require('rimraf')
const searchFiles = (options) => {
    let depth = options.depth || 1000001
    let paths = options.paths
    let onFiles = options.onFiles || /[^]*/
    let matchLines = options.matchLines || /[^]*/
    let result = []

    let filePaths = []
    for(const path of paths){
        filePaths.push({
            path:path,
            depth:0
        })
    }

    for(let currPath of filePaths){
        if(fs.lstatSync(currPath.path).isDirectory()){
            const files = fs.readdirSync(currPath.path)
            if(currPath.depth < depth){
                for (const file of files) {
                    filePaths.push({
                        path:`${currPath.path}/${file}`,
                        depth: currPath.depth + 1
                    })
                }
            }
        } else {
            let filename = currPath.path.split("/")
            filename = filename[filename.length -1]
            if(onFiles.test(currPath.path)) {
                let data = fs.readFileSync(currPath.path)
                data = data.toString()
                const lines = data.split("\n")
                for(const line of lines){
                    if(matchLines.test(line)){
                        result.push({
                            path:currPath,
                            depth:currPath.depth,
                            match:line
                        })
                    }
                }

            }
        }
    }

    return result
}


const deleteFiles = (options) => {

    let depth = options.depth || 1000001
    let paths = options.paths
    let onFiles = options.onFiles || new RegExp("*")
    let result = []

    let filePaths = []
    for(const path of paths){
        filePaths.push({
            path:path,
            depth:0
        })
    }

    for(let currPath of filePaths){
        if(fs.lstatSync(currPath.path).isDirectory()){
            const files = fs.readdirSync(currPath.path)
            if(currPath.depth < depth){
                for (const file of files) {
                    filePaths.push({
                        path:`${currPath.path}/${file}`,
                        depth: currPath.depth + 1
                    })
                }
            }
        } else {
            let filename = currPath.path.split("/")
            filename = filename[filename.length -1]
            if(onFiles.test(currPath.path)) {
                fs.unlinkSync(currPath.path)
            }
        }
    }

}

const deletePaths = (options) => {
    let depth = options.depth || 1000001
    let paths = options.paths
    let onFiles = options.onFiles || /[^]*/
    let result = []

    let filePaths = []
    for(const path of paths){
        filePaths.push({
            path:path,
            depth:0
        })
    }

    for(let currPath of filePaths){
        if(fs.lstatSync(currPath.path).isDirectory()){
            rimraf.sync(currPath.path)
        } else {
            fs.unlinkSync(currPath.path)
        }
    }


}

module.exports.searchFiles = searchFiles
module.exports.deleteFiles = deleteFiles
module.exports.deletePaths = deletePaths