/* global describe, it, expect */
const Engine = require('../index')

describe('Engine', () => {
  it('should work', () => {
    const cases = [
      ['khong', '6', 'không'],
      ['xuống', '2', 'xuồng'],
      ['nguyên', '4', 'nguyễn'],
      ['nguyễn', '5', 'nguyện'],
      ['không', '6', 'khong6'],
      ['xuống', '6', 'xuóng6'],
      ['nguyên', '6', 'nguyen6'],
      ['duoi', '9', 'đuoi'],
      ['đuoi', '7', 'đươi'],
      ['đươi', '2', 'đười'],
      ['p', '6', 'p6'],
      ['tie', '6', 'tiê'],
      ['tiê', '1', 'tiế']
    ]

    const en = Engine({ inputMethod: 'VNI' })

    cases.forEach(([str, key, expected]) =>
      expect(en.transform(str, key)).toBe(expected)
    )
  })

  it('should keep cases the same', () => {
    const cases = [
      ['XUỐNG', '2', 'XUỒNG'],
      ['nguyên', '4', 'nguyễn'],
      ['nGUYỄn', '5', 'nGUYỆn'],
      ['duOi', '9', 'đuOi'],
      ['ĐUoi', '7', 'ĐƯơi'],
      ['đƯƠi', '2', 'đƯỜi'],
      ['P', '6', 'P6']
    ]

    const en = Engine({ inputMethod: 'VNI' })

    cases.forEach(([str, key, expected]) =>
      expect(en.transform(str, key)).toBe(expected)
    )
  })
})
