const extractWord = require('./extract-word')
const { isMetaKey } = require('../utils')

module.exports = function Processor(engine) {
  const putAccent = (str, keyCode, cursorPosition = str.length) => {
    if (isMetaKey(keyCode)) return str

    const [word, position] = extractWord(str, cursorPosition)

    const accented = engine.transform(word, keyCode)
    return str.substring(0, position) + accented + str.substring(position + accented.length)
  }

  return { process: putAccent }
}
