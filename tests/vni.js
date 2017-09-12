const test = require('tape')
const { transformVni } = require('../src/transform')

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
  t.equal(transformVni('ia', '1'), 'ía')
  t.equal(transformVni('ia', '2'), 'ìa')
  t.equal(transformVni('ia', '3'), 'ỉa')
  t.equal(transformVni('ia', '4'), 'ĩa')
  t.equal(transformVni('ia', '5'), 'ịa')
  t.equal(transformVni('ia', '6'), null)
  t.equal(transformVni('ia', '7'), null)
  t.equal(transformVni('ia', '8'), null)
  t.equal(transformVni('ia', '9'), null)
  t.equal(transformVni('ia', '0'), 'ia')

  t.equal(transformVni('uô', '5'), 'uộ')

  t.end()
})
