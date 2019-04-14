var fs = require('fs')
var path = require('path')

module.exports = function(dir, ext, callback) {
  fs.readdir(dir, (err, list) => {
    if (err) return callback(err)
    list = list.filter((file) => {return path.extname(file) === '.' + ext})
    return callback(null, list)
  })
}
