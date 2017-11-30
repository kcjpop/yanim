const { lastIndexOf } = require('../utils')

module.exports = function extractWord(str, cursorPosition) {
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
