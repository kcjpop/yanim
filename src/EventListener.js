const { isMetaKey } = require('./utils')

module.exports = function(selector, processor) {
  const elements = document.querySelectorAll(selector)
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
