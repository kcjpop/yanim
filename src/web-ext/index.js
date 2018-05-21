const Processor = require('../processor')
const Engine = require('../engine')
const EventListener = require('../EventListener')

{
  const engine = Engine({ inputMethod: 'VNI' })
  const processor = Processor(engine)
  console.log(':: YAVIM loaded')

  EventListener('textarea, input[type=text], [contenteditable]', processor)
  window.YavimEventListener = EventListener
}
