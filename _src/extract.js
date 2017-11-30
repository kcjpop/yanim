import { contains, lastIndexOf, removeAccents } from './utils'
import {
  ACCENTED_VOWELS, DIPHTHONGS, TRIPHTHONGS, TRIPHTHONG_LENGTH, DIPHTHONG_LENGTH
} from './constants'

export function findLastVowelPosition (buffer) {
  return lastIndexOf(buffer.toLowerCase(), char => contains(ACCENTED_VOWELS, char))
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
export function extractPossibleVowels (s) {
  const str = s.toLowerCase()

  // Edge case for "qu"
  const isQu = str.startsWith('qu')
  if (isQu) return extractQuWords(str)

  // First, find vowel starting from the end
  const vowelPosition = findLastVowelPosition(str)
  if (vowelPosition == null) return null

  // If a vowel was found, get a subtring of 3 characters, including the found
  // vowel, and check if it's a triphthong
  const indexTripth = vowelPosition - TRIPHTHONG_LENGTH + 1
  if (indexTripth >= 0) {
    const lastThree = str.substr(indexTripth, TRIPHTHONG_LENGTH)
    if (contains(TRIPHTHONGS, removeAccents(lastThree))) return [lastThree, indexTripth]
  }

  // Not a triphthong, let's check if it's a diphthong
  const indexDiph = vowelPosition - DIPHTHONG_LENGTH + 1
  if (indexDiph >= 0) {
    const lastTwo = str.substr(indexDiph, DIPHTHONG_LENGTH)
    if (contains(DIPHTHONGS, removeAccents(lastTwo))) return [lastTwo, indexDiph]
  }

  // Not a diphthong either, so it's the first case, just vowel
  const lastOne = str[vowelPosition]
  return [lastOne, vowelPosition]
}
