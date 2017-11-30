const Processor = require('../processor')
const Engine = require('../engine')
const EventListener = require('../EventListener')

{
  const engine = Engine({ inputMethod: 'VNI' })
  const processor = Processor(engine)

  EventListener('textarea, input[type=text], [contenteditable]', processor)
  window.YavimEventListener = EventListener
}
