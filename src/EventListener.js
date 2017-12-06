/* global window */
const { isMetaKey, isCombiningKeys } = require('./utils')

const getCursorPosition = function(el) {
  if (el.isContentEditable) {
    el.focus()
    console.log(el, el.innerHTML, el.selectionStart, el.selectionEnd)
    const range = window.getSelection().getRangeAt(0)
    const cloned = range.cloneRange()
    cloned.selectNodeContents(el)
    cloned.setEnd(range.endContainer, range.endOffset)
    console.log(cloned)
    return cloned.toString().length
  }

  return el.selectionStart
}

module.exports = function(selector, processor) {
  const elements = document.querySelectorAll(selector)

  if (elements.length === 0) return
  elements.forEach(el => {
    el.addEventListener('keydown', e => {
      const { target } = e
      // If a shortcut is pressing, we do nothing
      if (isCombiningKeys(e)) return

      // Prevent default when user is entering printable character, so that
      // input content won't be duplicated
      !isMetaKey(e.key) && e.preventDefault()

      const cursorPosition = getCursorPosition(target) - 1
      const content = target.isContentEditable ? target.textContent : target.value

      // Special handling for [contenteditable]
      if (target.isContentEditable) {
        const result = processor.process(content, e.key, cursorPosition)
        if (result) {
          const [accented, newCursor] = result
          target.textContent = accented
          console.log(accented, newCursor)
          window.getSelection().collapseToEnd()
          return
        }
      }

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
