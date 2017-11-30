const extractWord = require('./extractWord')
const { isMetaKey } = require('../utils')

module.exports = function Processor(engine) {
  // Given a string, a keycode and the cursor position
  //
  // Return accented string if applicable, also a new cursor position, which is
  // useful when putting accents in middle of a sentence
  const putAccent = (str, keyCode, cursorPosition = str.length) => {
    if (isMetaKey(keyCode)) return null

    const [word, position] = extractWord(str, cursorPosition)

    const accented = engine.transform(word, keyCode)

    const first = str.substring(0, position) + accented
    return [first + str.substring(cursorPosition + 1), first.length]
  }

  return { process: putAccent }
}
