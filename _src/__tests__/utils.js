import { isUpper, normalizeCase, removeAccents } from '../utils'

const test = require('tape')

test('isUpper', t => {
  t.equal(isUpper('ooo'), false)
  t.equal(isUpper('OOO'), true)
  t.equal(isUpper('Thành'), false)
  t.equal(isUpper('THÀNH'), true)
  t.end()
})

test('normalizeCase', t => {
  t.throws(() => normalizeCase('nooo', 'nooooooooo'))
  t.equal(normalizeCase('', ''), '')
  t.equal(normalizeCase('NGUYEN', 'nguyễn'), 'NGUYỄN')
  t.equal(normalizeCase('thi', 'thị'), 'thị')
  t.equal(normalizeCase('ChUOi', 'chuối'), 'ChUỐi')
  t.equal(normalizeCase('CHieN', 'chiên'), 'CHiêN')
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
