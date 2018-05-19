/* global it, expect */

const { findVowelCombination } = require('../extractor')

it('should extract possible vowel combination from string', () => {
  const cases = [
    ['khong', ['o', 2]],
    ['xuống', ['uố', 1]],
    ['nguyên', ['uyê', 2]]
  ]

  cases.forEach(([str, expected]) =>
    expect(findVowelCombination(str)).toEqual(expected)
  )
})

it('should handle "qu" words', () => {
  const cases = [['quo', ['o', 2]], ['qui', ['i', 2]], ['quyen', ['e', 3]]]

  cases.forEach(([str, expected]) =>
    expect(findVowelCombination(str)).toEqual(expected)
  )
})
