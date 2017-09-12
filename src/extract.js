const contains = require('./utils/contains')

const { VOWELS, DIPHTHONGS, TRIPHTHONGS } = require('./constants')

function lastIndexOf (str, predicate) {
  const n = str.length
  let i = n
  for (; i >= 0; i--) {
    if (predicate(str[i])) return i
  }
}

function findLastVowelPosition (buffer) {
  return lastIndexOf(buffer.toLowerCase(), char => contains(VOWELS, char))
}

// Remove accents and only remain vowels
function removeAccents (buffer) {
  const charMap = [
    ['a', /[áàảãạ]/gi],
    ['ă', /[ăắằẳẵặ]/gi],
    ['â', /[âấầẩẫậ]/gi],
    ['e', /[éèẻẽẹ]/gi],
    ['ê', /[êếềểễệ]/gi],
    ['i', /[íìỉĩị]/gi],
    ['o', /[óòỏõọ]/gi],
    ['ô', /[ôốồổỗộ]/gi],
    ['ơ', /[ơớờởỡợ]/gi],
    ['u', /[úùủũụ]/gi],
    ['ư', /[ưứừửữự]/gi],
    ['y', /[ýỳỷỹỵ]/gi]
  ]

  return charMap.reduce((str, [replacer, pattern]) => str.replace(pattern, replacer), buffer)
}

// Given a string, find possible substring that needs to be put accents. Cursor
// position is assumed at the end of the string.
// Return substring and its starting index
//
// String -> [String, Int]
function extract (buffer) {
  const normalized = removeAccents(buffer)

  // Find vowel starting from the end
  // eslint-disable-next-line
  const vowelPosition = findLastVowelPosition(normalized)
  if (vowelPosition == null) return null

  if (vowelPosition - 2 >= 0) {
    const lastThree = normalized.substr(vowelPosition - 2, 3)
    if (contains(TRIPHTHONGS, lastThree)) return lastThree
  }

  if (vowelPosition - 1 >= 0) {
    const lastTwo = normalized.substr(vowelPosition - 1, 2)
    if (contains(DIPHTHONGS, lastTwo)) return lastTwo
  }

  const lastOne = buffer[vowelPosition]
  return lastOne
}

module.exports = { extract, findLastVowelPosition, removeAccents }
