# bulk-file-operations
This serves as a module to traverse through file systems and search for specific lines in specific files or delete in bulk. The files can be filtered with the help of regex.
It uses the `graceful-fs` module so you dont get the EMFILE errors by searching for too many files which was the problem with [fileSniffer](https://www.npmjs.com/package/filesniffer)

### USAGE
This traverses the files within the paths upto a certain depth and returns all the matches on all the lines of the files.

```javascript
const file_ops = require('bulk-file-operations')
const res = file_ops.searchFiles({
  paths: [
    'testPath/dir',
    'operations.js'
  ],
  onFiles: /[^]*/  // optional
  matchLines: /[^]*/ // optional
  depth: 2 // optional;
})

console.log(res)
```
To delete files with secific pattern of files names until a specific depth

```javascript
const file_ops = require('bulk-file-operations')
file_ops.deleteFiles({
  paths: [
    'testPath/dir',
    'operations.js'
  ],
  onFiles: /[^]*/  // optional
  depth: 2 // optional;
})
```
To delete the whole path

```javascript
const file_ops = require('bulk-file-operations')
file_ops.deletePath({
  paths: [
    'testPath/dir',
    'operations.js'
  ],
})
```

