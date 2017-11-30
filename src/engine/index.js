const { findVowelCombination } = require('./extractor')
const { transform } = require('../methods/base')

const reconstructString = (str, position, accented) =>
  str.substring(0, position) + accented + str.substring(position + accented.length)

module.exports = function(options) {
  const putAccent = (str, key) => {
    const buffer = findVowelCombination(str)
    if (!buffer || buffer.length === 0) return str + key

    const [vowels, position] = buffer

    const accented = transform(vowels, key)

    return accented.cata({
      Accented: result => reconstructString(str, position, result),
      Undone: result => reconstructString(str, position, result) + key,
      None: () => str + key
    })
  }

  return { transform: putAccent }
}
