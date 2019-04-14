var args = process.argv
args = args.slice(2)

var result = 0
args.map(arg => result+= Number(arg))

console.log(result)