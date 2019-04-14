var assert = require('assert')
var isCoolNumber = require(process.argv[2])
assert.ok(isCoolNumber(42), 'should be 42')

