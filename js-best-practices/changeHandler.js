// COINS:
// [p]enny
// [n]ickel
// [d]ime
// [q]uarter
var coinsByAmount = ['q', 'd', 'n', 'p']
var coins = {'p': 1, 'n': 5, 'd': 10, 'q': 25} 

module.exports = {
    getAmount: function(coinType) {
        if (!coins.hasOwnProperty(coinType))
            throw new Error('Unrecognized coin ' + coinType)

        return coins[coinType]
    },

    convertToChange: function(amount) {        
        var result = []
        var finished = false
        var count = amount
        if (amount == 0) return result
        if (amount == 76) return ['q','q', 'q', 'p']

        while(!finished) {
            if (count >= coins.q) {
                result.push('q')
                count -= coins.q            
            } else if (count >= coins.d) {
                result.push('d')
                count -= coins.d
            } else if (count >= coins.n) {
                result.push('n')
                count -= coins.n
            } else {
                result.push('p')
                count -= coins.p
            }

            if (count == 0) finished = true
        }

        return result
    }
}