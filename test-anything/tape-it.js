var test = require('tape')
var fancify = require(process.argv[2])
var testString = 'tap'

test('fancify', (t) => {
    t.equal(fancify(testString), '~*~tap~*~', 'returns the str wrapped in ~*~')
    t.deepEqual(fancify(testString, true), '~*~TAP~*~', 'optionally makes it ALLCAPS')
    t.deepEqual(fancify(testString, false, '!'), '~!~tap~!~', 'Optionally sets the character')
    t.end()
})
