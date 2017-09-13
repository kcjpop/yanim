import transform from '../transform'
import { METHOD_VNI } from '../constants'

const test = require('tape')

test('transform', t => {
  t.throws(() => transform('invalidmode', 'foo', '1'))
  t.end()
})

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

  t.equal(transform(inputMode, 'ONG', '6'), 'ÔNG')
  t.equal(transform(inputMode, 'THANH', '2'), 'THÀNH')
  t.equal(transform(inputMode, 'phO', '6'), 'phÔ')
  t.equal(transform(inputMode, 'PHô', '1'), 'PHố')
  t.equal(transform(inputMode, 'sƯƠng', '1'), 'sƯỚng')

  t.end()
})
