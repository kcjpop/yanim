const Processor = require('../processor')
const Engine = require('../engine')
const EventListener = require('../EventListener')

{
  const engine = Engine({ inputMethod: 'VNI' })
  const processor = Processor(engine)
  console.log(':: YANIM loaded')

  EventListener('textarea, input[type=text], [contenteditable]', processor)
}
