const { findLastVowelPosition, removeMarks } = require('../utils')
const {
  DIPHTHONG_LENGTH,
  TRIPHTHONG_LENGTH,
  TRIPHTHONGS,
  DIPHTHONGS
} = require('../constants')

// Given a lowercased string, find possible vowels, dipthongs or triphthongs
// that needs to be put accents on. For example,
//  "khong" => "o"
//  "xuống" => "uố"
//  "nguyên" => "uyê"
//
// Cursor position is assumed at the end of the string.
// Return substring and its starting index
//
// String -> [String, Int]
function findVowelCombination(s) {
  const str = s.toLowerCase()

  // Edge case
  if (str[0] === 'd') return ['d', 0]

  // First, find vowel starting from the end
  const vowelPosition = findLastVowelPosition(str)
  if (vowelPosition == null) return null

  // If a vowel was found, get a subtring of 3 characters, including the found
  // vowel, and check if it's a triphthong
  const indexTripth = vowelPosition - TRIPHTHONG_LENGTH + 1
  if (indexTripth >= 0) {
    const lastThree = str.substr(indexTripth, TRIPHTHONG_LENGTH)
    if (TRIPHTHONGS.includes(removeMarks(lastThree)))
      return [lastThree, indexTripth]
  }

  // Not a triphthong, let's check if it's a diphthong
  const indexDiph = vowelPosition - DIPHTHONG_LENGTH + 1
  if (indexDiph >= 0) {
    const lastTwo = str.substr(indexDiph, DIPHTHONG_LENGTH)
    if (DIPHTHONGS.includes(removeMarks(lastTwo))) return [lastTwo, indexDiph]
  }

  // Not a diphthong either, so it's the first case, just vowel
  const lastOne = str[vowelPosition]
  return [lastOne, vowelPosition]
}

module.exports = { findVowelCombination }
