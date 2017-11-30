const { findVowelCombination } = require('./extractor')
const { putAccent } = require('../methods/base')

const reconstructWord = (word, accentedPosition, accented) =>
  word.substring(0, accentedPosition) +
  accented +
  word.substring(accentedPosition + accented.length)

const isUpper = str => str.toUpperCase() === str

const restoreCase = (source, target) => {
  if (source.length !== target.length)
    throw new Error('Cannot restore case of strings with different lengths')

  return target
    .split('')
    .reduce(
      (str, char, index) =>
        str + (isUpper(source[index]) ? char.toUpperCase() : char),
      ''
    )
}

/**
 * Create input engine
 *
 * @param {Object}  options
 * @param {String}  options.method Either 'VNI' or 'TELEX'
 * @param {Boolean} options.debug Turn debug mode on/off
 *
 * @return Engine
 */
module.exports = function(options = {}) {
  function transform(word, key) {
    const buffer = findVowelCombination(word)
    if (!buffer || buffer.length === 0) return word + key

    // Detected vowel combination and try to put accents onto it
    const [vowels, position] = buffer
    console.log({ vowels, position, key })
    const accented = putAccent(vowels, key)

    return accented.cata({
      Accented: result =>
        restoreCase(word, reconstructWord(word, position, result)),
      Undone: result =>
        restoreCase(word, reconstructWord(word, position, result)) + key,
      None: () => word + key
    })
  }

  return { transform }
}
