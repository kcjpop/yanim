const Processor = require('../processor')
const Engine = require('../engine')
const EventListener = require('../EventListener')

{
  const engine = Engine({ inputMethod: 'VNI' })
  const processor = Processor(engine)

  EventListener('textarea, input[type=text], [contenteditable=true]', processor)
  window.YavimEventListener = EventListener
}
