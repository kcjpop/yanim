const toNull = char => char !== ' ' ? char : null

function accentForOne (char, key) {
  const keyMap = {
    //    1234567890
    'a': 'áàảãạâ ă a'.split('').map(toNull),
    'ă': 'ắằẳẵặ  a a'.split('').map(toNull),
    'â': 'ấầẩẫậa   a'.split('').map(toNull),
    'e': 'éèẻẽẹê   e'.split('').map(toNull),
    'ê': 'ếềểễệ    e'.split('').map(toNull),
    'i': 'íìỉĩị    i'.split('').map(toNull),
    'o': 'óòỏõọôơ  o'.split('').map(toNull),
    'ô': 'ốồổỗộ ơ  o'.split('').map(toNull),
    'ơ': 'ớờởỡợô   o'.split('').map(toNull),
    'u': 'úùủũụ ư  u'.split('').map(toNull),
    'ư': 'ứừửữự    u'.split('').map(toNull),
    'y': 'ýỳỷỹỵ    y'.split('').map(toNull),
    'd': '        đd'.split('').map(toNull)
  }

  if (keyMap[char] == null) return char

  const index = parseInt(key, 10) - 1
  return keyMap[char][index === -1 ? 9 : index]
}

function accentForTwo (buffer, key) {
  const invalid = {
    'ai': '67',
    'ao': '678',
    'au': '8',
    'ưi': '4',
    'ưu': '4',
    'uơ': '12345', // @note
    'uu': '12345', // @note
    'uy': '7'
  }
  if (invalid[buffer] != null && invalid[buffer].indexOf(key) !== -1) return null

  // head, tail
  const [h, t] = buffer
  // Edge case
  if (buffer === 'uy' && key === '5') {
    const accented = accentForOne(t, key)
    return accented != null ? h + accented : null
  }

  const accented = accentForOne(h, key)

  return accented != null ? accented + t : null
}

function accentForThree (buffer, key) {
  // head, middle, tail
  const [h, m, t] = buffer
  const invalid = {
    'oai': '467',
    'oay': '467',
    'uai': '467',
    'uôi': '47',
    'ươi': '46',
    'ươu': '46',
    'uyu': '124',
    'yêu': '5'
  }
  if (invalid[buffer] != null && invalid[buffer].indexOf(key) !== -1) return null

  const accented = accentForOne(m, key)
  return accented != null ? h + accented + t : null
}

function transformVni (buffer, key) {
  if (buffer.length === 1) return accentForOne(buffer, key)
  if (buffer.length === 2) return accentForTwo(buffer, key)
  if (buffer.length === 3) return accentForThree(buffer, key)
}

// const convert = vowels => '1234567890'.split('').map(key => transformVni(vowels, key))
// const d = [
//   'ia', 'ua', 'ưa', 'ai', 'oi', 'ôi', 'ơi', 'ui', 'ưi', 'ao', 'êu', 'eo', 'uơ',
//   'au', 'eu', 'iu', 'uu', 'ưu', 'âu', 'ay', 'ây', 'uy'
// ].map(convert)
// console.log(d)
// const t = ['iêu', 'oai', 'oay', 'uai', 'uây', 'uôi', 'ươi', 'ươu', 'uyu', 'yêu'].map(convert)

module.exports = transformVni
