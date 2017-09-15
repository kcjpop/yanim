import { extract, findLastVowelPosition } from '../extract'
const test = require('tape')

test('extract', t => {
  t.equal(extract('kh'), null)
  t.deepEqual(extract('khong'), ['o', 2])

  t.deepEqual(extract('kha'), ['a', 2])
  t.deepEqual(extract('một'), ['ộ', 1])

  t.deepEqual(extract('dieu'), ['ieu', 1])
  t.deepEqual(extract('khuyu'), ['uyu', 2])
  t.deepEqual(extract('nguyên'), ['uyê', 2])
  t.deepEqual(extract('âm'), ['â', 0])
  t.deepEqual(extract('xuống'), ['uố', 1])

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

