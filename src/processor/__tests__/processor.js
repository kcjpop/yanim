/* global describe, it, expect */
const Processor = require('../index')
const Engine = require('../../engine')

describe('Processor', () => {
  it('should work', () => {
    const engine = Engine({ inputMethod: 'VNI' })
    const processor = Processor(engine)
    expect(processor.process('thì chịu thoi', '6', 13)).toEqual([
      'thì chịu thôi',
      13
    ])
    expect(processor.process('thì chiu thoi', '5', 6)).toEqual([
      'thì chịu thoi',
      7
    ])
    // expect(processor.process('thì chiu thoi', '4', 6)).toBe('thì 4chiu thoi')
  })
})
