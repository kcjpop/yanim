const { ACCENTED_VOWELS } = require('../constants')

exports.otherOfAPair = (k, [a, b]) => (k === a ? b : a)

function lastIndexOf(str, predicate, startIndex = null) {
  const n =
    startIndex != null && startIndex >= 0 && startIndex <= str.length
      ? startIndex
      : str.length
  let i = n
  for (; i >= 0; i--) if (predicate(str[i])) return i
}
exports.lastIndexOf = lastIndexOf

// Check if keycode is of a non-printable character
exports.isMetaKey = keyCode => !/^[a-zA-Z0-9]$/gi.test(keyCode)

// Use to detect keyboard shortcuts
exports.isCombiningKeys = e => e.ctrlKey || e.metaKey

exports.findLastVowelPosition = buffer =>
  lastIndexOf(buffer.toLowerCase(), char => ACCENTED_VOWELS.includes(char))

function removeMarks(buffer) {
  const charMap = [
    ['a', /[áàảãạ]/gi],
    ['ă', /[ăắằẳẵặ]/gi],
    ['â', /[âấầẩẫậ]/gi],
    ['e', /[éèẻẽẹ]/gi],
    ['ê', /[êếềểễệ]/gi],
    ['i', /[íìỉĩị]/gi],
    ['o', /[óòỏõọ]/gi],
    ['ô', /[ôốồổỗộ]/gi],
    ['ơ', /[ơớờởỡợ]/gi],
    ['u', /[úùủũụ]/gi],
    ['ư', /[ưứừửữự]/gi],
    ['y', /[ýỳỷỹỵ]/gi]
  ]

  return charMap.reduce(
    (str, [replacer, pattern]) => str.replace(pattern, replacer),
    buffer
  )
}
exports.removeMarks = removeMarks
