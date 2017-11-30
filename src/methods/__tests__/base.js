/* global describe, it, expect */
const { accentForOne, accentForTwo, accentForThree, transform } = require('../base')
const { VowelResult } = require('../../constants')

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
      ['ắ', '2', 'ằ'],
      ['ắ', '3', 'ẳ'],
      ['ắ', '4', 'ẵ'],
      ['ắ', '5', 'ặ'],
      ['ắ', '6', 'ấ'],
      ['ằ', '6', 'ầ'],
      ['ẳ', '6', 'ẩ'],
      ['ẵ', '6', 'ẫ'],
      ['ặ', '6', 'ậ'],
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

    cases.forEach(([vowel, keyCode, result]) => expect(accentForOne(vowel, keyCode)).toEqual({ result }))

    const undone = [['ắ', '1', 'ă'], ['ắ', '8', 'á']]
    undone.forEach(([vowel, keyCode, result]) => {
      const accented = accentForOne(vowel, keyCode)

      expect(VowelResult.Undone.is(accented)).toBe(true)
      expect(accented).toEqual({ result })
    })
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

    cases.forEach(([vowel, keyCode, result]) => expect(accentForOne(vowel, keyCode)).toEqual({ result }))
  })

  it('should detect invalid combination', () => {
    const cases = [
      ['a', '9'],
      ['ă', '7'],
      ['ă', '9'],
      ['e', '7'],
      ['e', '8'],
      ['u', '6'],
      ['u', '8'],
      ['i', '6'],
      ['i', '7'],
      ['i', '8'],
      ['p', '9']
    ]

    cases.forEach(([vowel, keyCode, expected]) => expect(VowelResult.None.is(accentForOne(vowel, keyCode))).toBe(true))
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

    cases.forEach(([dipthongs, keyCode, result]) => expect(accentForTwo(dipthongs, keyCode)).toEqual({ result }))
  })
})

describe('To put accents for triphthongs', () => {
  it('should work', () => {
    const cases = [
      ['yêu', '1', 'yếu'],
      ['yêu', '2', 'yều'],
      ['yêu', '3', 'yểu'],
      ['ươi', '6', 'uôi'],
      ['uôi', '7', 'ươi'],
      ['uyê', '1', 'uyế'],
      ['uyê', '2', 'uyề'],
      ['uyê', '3', 'uyể'],
      ['uyê', '4', 'uyễ'],
      ['uyê', '5', 'uyệ']
    ]

    cases.forEach(([triphthongs, keyCode, result]) => expect(accentForThree(triphthongs, keyCode)).toEqual({ result }))

    const invalid = [['uyu', '1'], ['uyu', '2'], ['yêu', '5']]
    invalid.forEach(([triphthongs, keyCode, result]) =>
      expect(VowelResult.None.is(accentForThree(triphthongs, keyCode))).toBe(true)
    )
  })
})

describe('To put accents based on string length', () => {
  it('should work', () => {
    const cases = [['ê', '1', 'ế'], ['êu', '2', 'ều'], ['yêu', '3', 'yểu']]

    cases.forEach(([triphthongs, keyCode, result]) => expect(transform(triphthongs, keyCode)).toEqual({ result }))
  })
})
