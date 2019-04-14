var http = require('http')
var bl = require('bl')

var urls = process.argv.slice(2)
var result = []
var count = 0

for (let i = 0; i < urls.length; i++) {
  http.get(urls[i], (response) => {
    response.on('error', console.error)
    response.pipe(bl((err, data) => {
      if (err) console.error(err)
      result[i] = data.toString()
      count++

      if (count === urls.length)
        result.forEach((item) => {console.log(item)})
    }))
  })
}
