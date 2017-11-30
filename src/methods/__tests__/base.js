/* global describe, it, expect */

const { accentForOne, accentForTwo, accentForThree, transform } = require('../base')

describe('To put accents for one vowel', () => {
  it('should work', () => {
    const cases = [
      ['a', '1', 'á'],
      ['a', '2', 'à'],
      ['a', '3', 'ả'],
      ['a', '4', 'ã'],
      ['a', '5', 'ạ'],
      ['a', '6', 'â'],
      ['a', '8', 'ă'],
      ['ă', '1', 'ắ'],
      ['ă', '2', 'ằ'],
      ['ă', '3', 'ẳ'],
      ['ă', '4', 'ẵ'],
      ['ă', '5', 'ặ'],
      ['i', '1', 'í'],
      ['i', '2', 'ì'],
      ['i', '3', 'ỉ'],
      ['i', '4', 'ĩ'],
      ['i', '5', 'ị'],
      ['e', '1', 'é'],
      ['e', '2', 'è'],
      ['e', '3', 'ẻ'],
      ['e', '4', 'ẽ'],
      ['e', '5', 'ẹ'],
      ['e', '6', 'ê'],
      ['o', '1', 'ó'],
      ['o', '2', 'ò'],
      ['o', '3', 'ỏ'],
      ['o', '4', 'õ'],
      ['o', '5', 'ọ'],
      ['o', '6', 'ô'],
      ['o', '7', 'ơ'],
      ['u', '1', 'ú'],
      ['u', '2', 'ù'],
      ['u', '3', 'ủ'],
      ['u', '4', 'ũ'],
      ['u', '5', 'ụ'],
      ['u', '7', 'ư'],
      ['y', '1', 'ý'],
      ['y', '2', 'ỳ'],
      ['y', '3', 'ỷ'],
      ['y', '4', 'ỹ'],
      ['y', '5', 'ỵ'],
      ['d', '9', 'đ']
    ]

    cases.forEach(([vowel, keyCode, expected]) =>
      expect(accentForOne(vowel, keyCode)).toBe(expected))
  })

  it('should swap accents in cases of A and O', () => {
    const cases = [
      ['ă', '6', 'â'],
      ['â', '8', 'ă'],
      ['ắ', '6', 'ấ'],
      ['ằ', '6', 'ầ'],
      ['ô', '7', 'ơ'],
      ['ơ', '6', 'ô'],
      ['ộ', '7', 'ợ']
    ]

    cases.forEach(([vowel, keyCode, expected]) =>
      expect(accentForOne(vowel, keyCode)).toBe(expected))
  })

  it('should detect invalid combination', () => {
    const cases = [
      ['a', '9', false],
      ['ă', '7', false],
      ['ă', '9', false],
      ['e', '7', false],
      ['e', '8', false],
      ['u', '6', false],
      ['u', '8', false],
      ['i', '6', false],
      ['i', '7', false],
      ['i', '8', false],
      ['p', '9', false]
    ]

    cases.forEach(([vowel, keyCode, expected]) =>
      expect(accentForOne(vowel, keyCode)).toBe(expected))
  })
})

describe('To put accents for dipthongs', () => {
  it('should work', () => {
    const cases = [
      ['ua', '1', 'úa'],
      ['ưa', '1', 'ứa'],
      ['ai', '1', 'ái'],
      ['oi', '1', 'ói'],
      ['ôi', '1', 'ối'],
      ['uo', '3', 'uỏ'],
      ['uô', '3', 'uổ']
    ]

    cases.forEach(([dipthongs, keyCode, expected]) =>
      expect(accentForTwo(dipthongs, keyCode)).toBe(expected))
  })
})

describe('To put accents for triphthongs', () => {
  it('should work', () => {
    const cases = [
      ['yêu', '1', 'yếu'],
      ['yêu', '2', 'yều'],
      ['yêu', '3', 'yểu'],
      ['yêu', '4', false],
      ['yêu', '5', false]
      // @TODO: Edge cases. Should be handled
      // ['ươi', '6', 'uôi'],
      // ['uôi', '7', 'ươi']
    ]

    cases.forEach(([triphthongs, keyCode, expected]) =>
      expect(accentForThree(triphthongs, keyCode)).toBe(expected))
  })
})

describe('To put accents based on string length', () => {
  it('should work', () => {
    const cases = [
      ['ê', '1', 'ế'],
      ['êu', '2', 'ều'],
      ['yêu', '3', 'yểu']
    ]

    cases.forEach(([triphthongs, keyCode, expected]) =>
      expect(transform(triphthongs, keyCode)).toBe(expected))
  })
})
