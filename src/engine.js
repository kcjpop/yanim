import { lastIndexOf } from './utils'
import { METHOD_VNI } from './constants'
import transform from './transform'

export function extractBuffer (str, cursorPosition) {
  // Cursor position can be at the end of the word
  //      lorem ipsum|
  //
  // Or in the middle
  //      lorem ips|um
  //
  // Beside normal whitespaces, there are also other stop characters
  //     lorem ips^sum
  //     lorem ips91sum
  //     lorem ips---sum
  const stopPattern = /\s+|[-{}!@#$%^&*()_+=[\]|\\:";'<>?,./~`\r\n\t]/i

  const index = lastIndexOf(str, c => stopPattern.test(c), cursorPosition)
  const pos = index >= 0 ? index : -1

  return [str.substring(pos + 1, cursorPosition + 1), pos + 1]
}

// Receive a raw string input, current key code and cursor position
// Return accented string if applicable
//
// String -> String -> String -> String
export function putAccent (input, keyCode, cursorPosition) {
  // Find the buffer that can be put accents
  const [buffer, index] = extractBuffer(input, cursorPosition)
  if (!buffer || buffer.length === 0) return input

  // Put accents into buffer
  const accented = transform(METHOD_VNI, buffer, keyCode)

  // Return the original raw input with accented buffer replaced
  return input.substring(0, index) + accented + input.substring(index + accented.length)
}

const Engine = putAccent
export default Engine
