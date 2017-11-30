const { findVowelCombination } = require('./extractor')
const { transform } = require('../methods/base')

const reconstructString = (str, position, accented) => str.substring(0, position) + accented + str.substring(position + accented.length)

module.exports = function (str, key) {
  const buffer = findVowelCombination(str)
  if (!buffer || buffer.length === 0) return str

  const [vowels, position] = buffer
  const accented = transform(vowels, key)
  if (Array.isArray(accented)) {
    // Undo marking
    return reconstructString(str, position, accented[0]) + key
  }

  return reconstructString(str, position, accented)
}
