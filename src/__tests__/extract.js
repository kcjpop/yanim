import { extract, findLastVowelPosition, removeAccents } from '../extract'
const test = require('tape')

test('extract', t => {
  t.equal(extract('kh'), null)
  t.deepEqual(extract('khong'), ['o', 2])

  t.deepEqual(extract('kha'), ['a', 2])

  t.deepEqual(extract('dieu'), ['ieu', 1])
  t.deepEqual(extract('khuyu'), ['uyu', 2])
  t.deepEqual(extract('nguyên'), ['uyê', 2])
  t.deepEqual(extract('âm'), ['â', 0])
  t.deepEqual(extract('xuống'), ['uô', 1])

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

test('removeAccents', t => {
  t.equal(removeAccents('bắt'), 'băt')
  t.equal(removeAccents('buộc'), 'buôc')
  t.equal(removeAccents('phải'), 'phai')
  t.equal(removeAccents('thêm'), 'thêm')
  t.equal(removeAccents('phần'), 'phân')
  t.equal(removeAccents('âm'), 'âm')
  t.equal(removeAccents('cuối'), 'cuôi')
  t.equal(removeAccents('được'), 'đươc')
  t.equal(removeAccents('chia'), 'chia')
  t.equal(removeAccents('theo'), 'theo')
  t.equal(removeAccents('quy'), 'quy')
  t.equal(removeAccents('tắc'), 'tăc')
  t.equal(removeAccents('đối'), 'đôi')
  t.equal(removeAccents('lập'), 'lâp')
  t.equal(removeAccents('bổ'), 'bô')
  t.equal(removeAccents('sung'), 'sung')
  t.equal(removeAccents('như'), 'như')
  t.equal(removeAccents('sau'), 'sau')
  t.equal(removeAccents('xuống'), 'xuông')
  t.end()
})
