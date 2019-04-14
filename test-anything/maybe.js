var test = require('tape')
var repeatCallback = require(process.argv[2])
var n = 5

test('repeatCallback', (t) => {
    t.plan(n)
    repeatCallback(n, () => {
        t.pass('callback called')
    })
})