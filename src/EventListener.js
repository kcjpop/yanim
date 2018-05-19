/* global document */
const { isMetaKey, isCombiningKeys } = require('./utils')
const l = console.log

function getFirstRange() {
  const s = document.getSelection()

  return s.rangeCount > 0 ? s.getRangeAt(0) : null
}

function hasSelection(target) {
  if (target.isContentEditable)
    return document.getSelection().toString().length > 0
  return target.selectionStart !== target.selectionEnd
}

function handleInput(e, processor) {
  const { target } = e

  const cursorPosition = target.selectionStart - 1
  const result = processor.process(target.value, e.key, cursorPosition)
  const range = getFirstRange()

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
  node.data = accented
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
      // If a shortcut is pressing, or there is text selection on target node,
      // we do nothing
      // TODO: we might want to select text and press accent key, but that's for future I guess
      if (isCombiningKeys(e) || hasSelection(e.target)) return

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
