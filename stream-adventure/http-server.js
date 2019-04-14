var through = require('through2')
var http = require('http')

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        req.pipe(through(function write (buffer, encoding, next) {
            this.push(buffer.toString().toUpperCase())
            next()
        })).pipe(res)
    } else {
        res.end('Send a POST\n')
    }
})
server.listen(process.argv[2])



