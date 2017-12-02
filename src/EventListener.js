/* global window */
const { isMetaKey, isCombiningKeys } = require('./utils')

module.exports = function(selector, processor) {
  const elements = document.querySelectorAll(selector)
  if (elements) {
    elements.forEach(el => {
      el.addEventListener('keydown', e => {
        const { target } = e
        // console.log(target.selectionStart, target.selectionEnd, target.selectionDirection)
        // If a shortcut is pressing, we do nothing
        if (isCombiningKeys(e)) return

        // Prevent default when user is entering printable character, so that
        // input content won't be duplicated
        !isMetaKey(e.key) && e.preventDefault()

        // Special handling for [contenteditable]
        if (target.isContentEditable) {
          return (target.innerHTML = processor.process(target.innerHTML, e.key))
        }

        const cursorPosition = target.selectionStart - 1
        const result = processor.process(target.value, e.key, cursorPosition)
        if (result != null) {
          const [accented, newCursor] = result
          target.value = accented
          target.selectionStart = newCursor
          target.selectionEnd = newCursor
        }
      })
    })
  }
}
