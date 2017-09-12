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

function extractQuWords (str) {
  const START_INDEX = 2
  const normalized = removeAccents(str).substring(START_INDEX)
  const vowelPosition = findLastVowelPosition(normalized)

  if (vowelPosition == null) return null

  const index2 = vowelPosition - 1
  if (index2 > START_INDEX) {
    const lastTwo = normalized.substr(index2, 2)
    if (contains(DIPHTHONGS, lastTwo)) return [lastTwo, index2 + START_INDEX]
  }

  return [normalized[vowelPosition], vowelPosition + START_INDEX]
}

// Given a string, find possible substring that needs to be put accents. Cursor
// position is assumed at the end of the string.
// Return substring and its starting index
//
// String -> [String, Int]
function extract (str) {
  // Edge case for "qu"
  const isQu = str.startsWith('qu')
  if (isQu) return extractQuWords(str)

  const normalized = removeAccents(str)

  // Find vowel starting from the end
  const vowelPosition = findLastVowelPosition(normalized)
  if (vowelPosition == null) return null

  const index3 = vowelPosition - 2
  if (index3 >= 0) {
    const lastThree = normalized.substr(index3, 3)
    if (contains(TRIPHTHONGS, lastThree)) return [lastThree, index3]
  }

  const index2 = vowelPosition - 1
  if (index2 >= 0) {
    const lastTwo = normalized.substr(index2, 2)
    if (contains(DIPHTHONGS, lastTwo)) return [lastTwo, index2]
  }

  const lastOne = str[vowelPosition]
  return [lastOne, vowelPosition]
}

module.exports = { extract, findLastVowelPosition, removeAccents }
