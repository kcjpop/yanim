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
      ['p', '6', 'p6']
    ]

    cases.forEach(([str, key, expected]) =>
      expect(Engine(str, key)).toBe(expected))
  })
})
