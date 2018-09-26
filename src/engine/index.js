const { findVowelCombination } = require('./extractor')
const { transform } = require('../methods/base')
const { Vowel } = require('../constants')

const reconstructWord = (word, accentedPosition, accented) => {
  return (
    word.substring(0, accentedPosition) +
    accented +
    word.substring(accentedPosition + accented.length)
  )
}

const isUpper = str => str.toUpperCase() === str

const restoreCase = (source, target) => {
  if (source.length !== target.length)
    throw new Error(`Different string length:  ${source} ${target}`)

  return target
    .split('')
    .reduce(
      (str, char, index) =>
        str + (isUpper(source[index]) ? char.toUpperCase() : char),
      ''
    )
}

module.exports = function() {
  const putAccent = (word, key) => {
    const buffer = findVowelCombination(word)
    if (!buffer || buffer.length === 0) return word + key

    // Detected vowel combination and try to put accents onto it
    const [vowels, position] = buffer
    const accented = transform(vowels, key)

    return Vowel.match(accented, {
      Accented: char =>
        restoreCase(word, reconstructWord(word, position, char)),
      Unaccented: char =>
        restoreCase(word, reconstructWord(word, position, char)) + key,
      None: () => word + key
    })
  }

  return { transform: putAccent }
}
