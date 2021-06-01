const op = require('./index')

// const res = op.searchFiles({
//     paths:[
//         'test',
//         'package.json',
//         // 'package-lock.json',
//     ],
// })


// console.log(res)

op.deleteFiles({
    paths: [
        'test'
    ],
    onFiles: /[^]*.json/
})