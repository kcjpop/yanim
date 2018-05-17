/* global describe, it, expect */

const { findVowelCombination } = require('../extractor')

describe('Extractor', () => {
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
})
