import { extractBuffer, putAccent } from '../engine'

const test = require('tape')

test('extractBuffer', t => {
  t.deepEquals(extractBuffer('sinh hoạt cung', 13), ['cung', 10])
  t.deepEquals(extractBuffer('sinh hoạt cung', 12), ['cun', 10])
  t.deepEquals(extractBuffer('sinh hoạt cung', 11), ['cu', 10])
  t.deepEquals(extractBuffer('sinh hoạt cung', 9), ['', 10])
  t.deepEquals(extractBuffer('sinh hoạt   cung', 11), ['', 12])
  t.deepEquals(extractBuffer('ba-lâm-gu', 8), ['gu', 7])
  t.deepEquals(extractBuffer('ba&lâm-gu', 5), ['lâm', 3])
  t.deepEquals(extractBuffer('ba&lâm-gu', 1), ['ba', 0])
  t.end()
})

test('putAccent', t => {
  t.equals(putAccent('ba&lâm-gu', '1', 8), 'ba&lâm-gú')
  t.equals(putAccent('ba&lâm-gu', '8', 4), 'ba&lăm-gu')
  t.equals(putAccent('tham', '6', 3), 'thâm')
  t.equals(putAccent('thâm', '2', 3), 'thầm')
  t.equals(putAccent('thâm', '2', 2), 'thầm')

  // const keyStrokes = ['t', 'h', 'a', 'm', '6']
  // const result = keyStrokes.reduce((str, key) => {
  //   const
  // }, '')

  t.end()
})
