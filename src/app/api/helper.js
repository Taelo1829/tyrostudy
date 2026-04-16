export function createUnique() {
    let alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let result = ''
    while (result.length < 36) {
        let rndmInd = parseInt(Math.random() * alphabets.length)
        let casing = parseInt(Math.random() * 2)
        let randomAlph = alphabets[rndmInd]
        if (!casing) randomAlph = randomAlph.toLowerCase()
        result += randomAlph

        if (result.length % 5 === 0 && result.length) {
            result += '-'
        }
    }

    return result.slice(0, result.length - 1)
}