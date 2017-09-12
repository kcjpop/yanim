const test = require('tape')
const { transform } = require('../src/transform')
const { METHOD_VNI } = require('../src/constants')

test('transform VNI', t => {
  const inputMode = METHOD_VNI

  // t.equal(transform(inputMode, 'kha', '1'), 'khá')
  // t.equal(transform(inputMode, 'khuyu', '5'), 'khuỵu')

  t.end()
})
