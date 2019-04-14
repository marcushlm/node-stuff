/*
A function feedCat takes any kind of food as a String argument and returns
'yum' for everything you feed them. However if you try to feed the cat
'chocolate', the function will throw an error.
*/

var test = require('tape')
var feedCat = require(process.argv[2])

test('feed cat', (t) => {
    t.plan(2)
    t.equal(feedCat('meat'), 'yum')
    t.throws(() => { feedCat('chocolate') })
})