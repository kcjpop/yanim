const Processor = require('./processor')
const Engine = require('./engine')
const { isMetaKey } = require('./utils')

{
  const engine = Engine({ inputMethod: 'VNI' })
  const processor = Processor(engine)

  // const elements = document.querySelectorAll('textarea, input[type=text]')
  const elements = document.querySelectorAll('textarea, input[type=text], [contenteditable]')
  if (elements) {
    elements.forEach(el => {
      el.addEventListener('keypress', e => {
        !isMetaKey(e.key) && e.preventDefault()
        const { target } = e
        if (target.isContentEditable) {
          return (target.innerHTML = processor.process(target.innerHTML, e.key))
        }

        target.value = processor.process(target.value, e.key)
      })
    })
  }
}
