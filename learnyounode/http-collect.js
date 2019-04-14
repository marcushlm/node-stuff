var http = require('http')
var bl = require('bl')

http.get(process.argv[2], (response) => {
  response.pipe(bl((err, data) => {
    if (err) console.error(err)
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
}).on('error', console.error)
