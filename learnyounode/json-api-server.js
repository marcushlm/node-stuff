var http = require('http')
var url = require('url')

http.createServer((req, res) => {
  if (req.method != 'GET') return "API only responds to GET\n"
  var url_data = url.parse(req.url, true)
  if (url_data.query == null) return "Use the iso key\n"

  var date = new Date(url_data.query.iso)
  var result

  if (url_data.pathname === '/api/parsetime') {
    result = {
      "hour": date.getHours(),
      "minute": date.getMinutes(),
      "second": date.getSeconds()
    }
  }

  if (url_data.pathname === '/api/unixtime') {
    result = {"unixtime":date.getTime()}
  }

  if (result) {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(result))
  }

  res.writeHead(404)
  res.end()
}).listen(process.argv[2]).on('error', (err) => {
  console.error(err);
})
