const test = require('tape')
const { transform } = require('../src/transform')
const { METHOD_VNI } = require('../src/constants')

test('transform VNI', t => {
  const inputMode = METHOD_VNI

  t.equal(transform(inputMode, 'kha', '1'), 'khá')
  t.equal(transform(inputMode, 'khuyu', '5'), 'khuỵu')
  t.equal(transform(inputMode, 'khong', '6'), 'không')

  t.equal(transform(inputMode, 'Thanh', '2'), 'Thành')
  t.equal(transform(inputMode, 'pho', '6'), 'phô')
  t.equal(transform(inputMode, 'phô', '1'), 'phố')
  t.equal(transform(inputMode, 'suong', '7'), 'sương')
  t.equal(transform(inputMode, 'sương', '1'), 'sướng')

  t.equal(transform(inputMode, 'an', '8'), 'ăn')
  t.equal(transform(inputMode, 'uong', '6'), 'uông')
  t.equal(transform(inputMode, 'uông', '1'), 'uống')
  t.equal(transform(inputMode, 'uông', '7'), 'ương')

  t.equal(transform(inputMode, 'quy', '5'), 'quỵ')
  t.equal(transform(inputMode, 'luy', '5'), 'lụy')

  t.equal(transform(inputMode, 'quyt', '5'), 'quỵt')

  t.end()
})
