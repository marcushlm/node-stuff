var split2 = require('split2')
var through2 = require('through2')
var count = 0
var tr = through2(function (buf, enc, next) {
    var line = buf.toString()
    this.push(count % 2 === 0
        ? line.toLowerCase() + '\n'
        : line.toUpperCase() + '\n'
    )
    count ++
    next()
})
process.stdin.pipe(split2()).pipe(tr).pipe(process.stdout)



