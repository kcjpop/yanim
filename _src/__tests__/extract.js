import { extractPossibleVowels, findLastVowelPosition } from '../extract'
const test = require('tape')

test('extractPossibleVowels', t => {
  t.equal(extractPossibleVowels('kh'), null)
  t.deepEqual(extractPossibleVowels('khong'), ['o', 2])

  t.deepEqual(extractPossibleVowels('kha'), ['a', 2])
  t.deepEqual(extractPossibleVowels('một'), ['ộ', 1])

  t.deepEqual(extractPossibleVowels('dieu'), ['ieu', 1])
  t.deepEqual(extractPossibleVowels('khuyu'), ['uyu', 2])
  t.deepEqual(extractPossibleVowels('nguyên'), ['uyê', 2])
  t.deepEqual(extractPossibleVowels('âm'), ['â', 0])
  t.deepEqual(extractPossibleVowels('xuống'), ['uố', 1])

  t.end()
})

test('findLastVowelPosition', t => {
  t.true(findLastVowelPosition('kh') == null)
  t.deepEqual(findLastVowelPosition('khong'), 2)
  t.deepEqual(findLastVowelPosition('dieu'), 3)
  t.deepEqual(findLastVowelPosition('nguyên'), 4)
  t.deepEqual(findLastVowelPosition('âm'), 0)
  t.deepEqual(findLastVowelPosition('uy'), 1)

  t.true(findLastVowelPosition('KH') == null)
  t.deepEqual(findLastVowelPosition('KHONG'), 2)
  t.deepEqual(findLastVowelPosition('DIEU'), 3)
  t.deepEqual(findLastVowelPosition('PHƠN'), 2)
  t.end()
})
