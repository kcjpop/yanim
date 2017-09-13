import transformVni from '../vni'
const test = require('tape')

test('transform with one character', t => {
  t.equal(transformVni('a', '1'), 'á')
  t.equal(transformVni('a', '2'), 'à')
  t.equal(transformVni('a', '3'), 'ả')
  t.equal(transformVni('a', '4'), 'ã')
  t.equal(transformVni('a', '5'), 'ạ')
  t.equal(transformVni('a', '6'), 'â')
  t.equal(transformVni('a', '8'), 'ă')

  t.end()
})

test('transform with 2 characters', t => {
  t.equal(transformVni('ua', '1'), 'úa')
  t.equal(transformVni('ua', '2'), 'ùa')
  t.equal(transformVni('ua', '3'), 'ủa')
  t.equal(transformVni('ua', '4'), 'ũa')
  t.equal(transformVni('ua', '5'), 'ụa')
  t.equal(transformVni('ua', '6'), null)
  t.equal(transformVni('ua', '7'), 'ưa')
  t.equal(transformVni('ua', '8'), null)
  t.equal(transformVni('ua', '9'), null)
  t.equal(transformVni('ua', '0'), 'ua')

  t.equal(transformVni('uô', '5'), 'uộ')

  t.end()
})
