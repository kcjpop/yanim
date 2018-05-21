const Processor = require('./processor')
const Engine = require('./engine')
const EventListener = require('./EventListener')

{
  const engine = Engine({ inputMethod: 'VNI' })
  const processor = Processor(engine)

  EventListener('textarea, input[type=text], [contenteditable]', processor)

  setTimeout(() => {
    const container = document.getElementById('js-dynamic')
    container.appendChild(document.createElement('input'))

    const textarea = document.createElement('textarea')
    textarea.classList.add('system-sans-serif', 'w-100', 'h5')
    container.appendChild(textarea)

    const contenteditable = document.createElement('div')
    contenteditable.contentEditable = true
    contenteditable.classList.add('lh-copy', 'bg-white', 'pa3')
    container.appendChild(contenteditable)
  }, 1000)
}
