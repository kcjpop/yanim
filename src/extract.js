import { contains, lastIndexOf, removeAccents } from './utils'
import { ACCENTED_VOWELS, DIPHTHONGS, TRIPHTHONGS } from './constants'

export function findLastVowelPosition(buffer) {
  return lastIndexOf(buffer.toLowerCase(), char => contains(ACCENTED_VOWELS, char))
}

function extractQuWords(str) {
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

// Given a lowercased string, find possible substring that needs to be put accents. Cursor
// position is assumed at the end of the string.
// Return substring and its starting index
//
// String -> [String, Int]
export function extract(s) {
  // String must be in lowercase
  const str = s.toLowerCase()

  // Edge case for "qu"
  const isQu = str.startsWith('qu')
  if (isQu) return extractQuWords(str)

  // Find vowel starting from the end
  const vowelPosition = findLastVowelPosition(str)
  if (vowelPosition == null) return null

  const index3 = vowelPosition - 2
  if (index3 >= 0) {
    const lastThree = str.substr(index3, 3)
    if (contains(TRIPHTHONGS, removeAccents(lastThree))) return [lastThree, index3]
  }

  const index2 = vowelPosition - 1
  if (index2 >= 0) {
    const lastTwo = str.substr(index2, 2)
    if (contains(DIPHTHONGS, removeAccents(lastTwo))) return [lastTwo, index2]
  }

  const lastOne = str[vowelPosition]
  return [lastOne, vowelPosition]
}
