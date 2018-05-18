/* global window */
const { isMetaKey, isCombiningKeys } = require('./utils')

function getFirstRange() {
  const s = window.getSelection()

  return s.rangeCount > 0 ? s.getRangeAt(0) : null
}

function handleInput(e, processor) {
  const { target } = e

  const cursorPosition = target.selectionStart - 1
  const result = processor.process(target.value, e.key, cursorPosition)
  if (result != null) {
    const [accented, newCursor] = result
    target.value = accented
    target.selectionStart = newCursor
    target.selectionEnd = newCursor
  }
}

function handleContenteditable(e, processor) {
  const { target } = e
  const range = getFirstRange()
  if (!range) return

  const content = range.startContainer.textContent
  const position = range.startOffset - 1
  const node = range.startContainer

  const result = processor.process(content, e.key, position)
  if (result == null) return

  const [accented, newPosition] = result
  node.textContent = accented
  const r = getFirstRange()
  if (r) {
    r.selectNodeContents(node)
    r.setStart(node, newPosition)
    r.setEnd(node, newPosition)
  }
}

module.exports = function(selector, processor) {
  const elements = document.querySelectorAll(selector)

  if (elements.length === 0) return
  elements.forEach(el => {
    el.addEventListener('keydown', e => {
      // If a shortcut is pressing, we do nothing
      if (isCombiningKeys(e)) return

      // Prevent default when user is entering printable character, so that
      // input content won't be duplicated
      !isMetaKey(e.key) && e.preventDefault()

      // Special handling for [contenteditable]
      if (e.target.isContentEditable) {
        return handleContenteditable(e, processor)
      }

      return handleInput(e, processor)
    })
  })
}
