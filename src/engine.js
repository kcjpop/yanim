// Engine will hook into the page, listen to keypress event on applicable elements
// and put accents to their value/textContent accordingly
import { lastIndexOf } from './utils'
import { METHOD_VNI } from './constants'
import transform from './transform'

export function extractBuffer(str, cursorPosition) {
  // Cursor at the end
  //      lorem ipsum|
  //
  // Cursor in the middle of word
  //      lorem ips|um
  //
  // Different stop characters
  //     lorem ips^sum
  //     lorem ips91sum
  //     lorem ips---sum
  const len = str.length
  const stopPattern = /\s+|[-{}!@#$%^&*()_+=\[\]|\\:";\'<>?,./~`\r\n\t]/i

  const index = lastIndexOf(str, c => stopPattern.test(c), cursorPosition)
  const pos = index >= 0 ? index : -1

  return [str.substring(pos + 1, cursorPosition + 1), pos + 1]
}

export function putAccent(input, keyCode, cursorPosition) {
  const [buffer, index] = extractBuffer(input, cursorPosition)
  if (!buffer || buffer.length === 0) return input

  const accented = transform(METHOD_VNI, buffer, keyCode)
  return input.substring(0, index) + accented + input.substring(index + accented.length)
}

// Take raw input string from user, entered keycode and an option object.
// Raw input string could be `HTMLInputElement.value`, `HTMLTextareaElement`
// or `Element.textContent`.
//
// Return accented string if applicable
//
// String -> String -> String -> String
export default function(doc, win) {
  // if (!win.getSelection)
  //   throw new Error('Your browser does not support `window.getSelection` function, which YANIM deeply depends on.')
}
