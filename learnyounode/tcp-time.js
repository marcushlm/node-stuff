var net = require('net')
var strftime = require('strftime')

net.createServer((socket) => {
  socket.end(strftime('%Y-%m-%d %H:%M')+'\n')
}).listen(process.argv[2])
