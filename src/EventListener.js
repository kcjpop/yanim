/* global document */
const { isMetaKey, isCombiningKeys } = require('./utils')

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
  const firstChild = range.startContainer.firstChild
    ? range.startContainer.firstChild
    : range.startContainer
  const node = firstChild.nodeName === 'BR' ? firstChild.parentNode : firstChild

  const result = processor.process(content, e.key, position)
  if (result == null) return

  const [accented, newPosition] = result
  // TEXT_NODE = 3
  node[node.nodeType === 3 ? 'data' : 'textContent'] = accented

  const r = getFirstRange()
  const pos = newPosition <= node.textContent.length ? newPosition : 0
  console.table(node, { newPosition, pos })
  if (r) {
    r.selectNodeContents(node)
    r.setStart(node, pos)
    r.setEnd(node, pos)
  }
}

function attachEventHandler(el, processor) {
  // Don't want to attach handler twice
  if (el.dataset.yavim) return

  el.dataset.yavim = true
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
}

function shouldEnableByDefault(el) {
  return (
    el.isContentEditable ||
    (el.nodeName === 'INPUT' && el.type === 'text') ||
    el.nodeName === 'TEXTAREA'
  )
}

function findUpperContentEditable(el) {
  if (el.contenteditable === 'true') return el
  while (el.parentNode && el.parentNode.getAttribute) {
    if (el.parentNode.getAttribute('contenteditable') === 'true')
      return el.parentNode

    el = el.parentNode
  }
}

function observeDomChanges(selector, processor) {
  const observer = new MutationObserver(records => {
    records.forEach(node => {
      // Search through newly added nodes
      node.addedNodes.forEach(node => {
        if (node.matches == null) return

        if (node.matches(selector) || shouldEnableByDefault(node)) {
          // FACEBOOK: SPANs having `contenteditable="inherit"` are inserted into editor, thus we need to
          // tranverse back until a node with `contenteditable="true"` is found
          // TODO: Bug happens when space is input
          const target = node.isContentEditable
            ? findUpperContentEditable(node)
            : node

          target != null && attachEventHandler(target, processor)
        }
      })
    })
  })
  observer.observe(document, { childList: true, subtree: true })
}

module.exports = function(selector, processor) {
  // Attach event handlers to newly added DOM elements
  observeDomChanges(selector, processor)

  const elements = document.querySelectorAll(selector)
  if (elements.length === 0) return
  elements.forEach(el => attachEventHandler(el, processor))
}
