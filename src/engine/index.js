const { findVowelCombination } = require('./extractor')
const { transform } = require('../methods/base')

const reconstructString = (str, position, accented) =>
  str.substring(0, position) + accented + str.substring(position + accented.length)

const isUpper = str => str.toUpperCase() === str

const restoreCase = (source, target) => {
  if (source.length !== target.length) throw new Error('Cannot restore case of strings with different lengths')

  return target.split('').reduce((str, char, index) => str + (isUpper(source[index]) ? char.toUpperCase() : char), '')
}

module.exports = function(options) {
  const putAccent = (word, key) => {
    const buffer = findVowelCombination(word)
    if (!buffer || buffer.length === 0) return word + key

    const [vowels, position] = buffer

    const accented = transform(vowels, key)

    return accented.cata({
      Accented: result => restoreCase(word, reconstructString(word, position, result)),
      Undone: result => restoreCase(word, reconstructString(word, position, result)) + key,
      None: () => word + key
    })
  }

  return { transform: putAccent }
}
