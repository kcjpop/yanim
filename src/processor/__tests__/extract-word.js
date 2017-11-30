/* global describe, it, expect */
const extractWord = require('../extract-word')

describe('extractWord', () => {
  it('should work', () => {
    expect(extractWord('sinh hoạt cung', 13)).toEqual(['cung', 10])
    expect(extractWord('sinh hoạt cung', 12)).toEqual(['cun', 10])
    expect(extractWord('sinh hoạt cung', 11)).toEqual(['cu', 10])
    expect(extractWord('sinh hoạt cung', 9)).toEqual(['', 10])
    expect(extractWord('sinh hoạt   cung', 11)).toEqual(['', 12])
    expect(extractWord('ba-lâm-gu', 8)).toEqual(['gu', 7])
    expect(extractWord('ba&lâm-gu', 5)).toEqual(['lâm', 3])
    expect(extractWord('ba&lâm-gu', 1)).toEqual(['ba', 0])
  })
})
