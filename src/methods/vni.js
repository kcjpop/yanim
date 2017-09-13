import contains from '../utils/contains'

const toNull = char => char !== ' ' ? char : null

function accentForOne (char, key) {
  const keyMap = {
    //    1234567890
    'a': 'áàảãạâ ă a'.split('').map(toNull),
    'ă': 'ắằẳẵặâ   a'.split('').map(toNull),
    'â': 'ấầẩẫậ  ă a'.split('').map(toNull),
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

function accentForTwo (str, key) {
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
  if (invalid[str] != null && contains(invalid[str], key)) return null

  // head, tail
  const [h, t] = str

  // Edge case of 'uo', 'uô', and 'uơ'
  // Accents are put at the end
  if (contains('ưu', h) && contains('oôơ', t)) {
    if (key === '7') return 'ươ'

    const accented = accentForOne(t, key)
    return accented != null ? h + accented : null
  }

  const accented = accentForOne(h, key)

  return accented != null ? accented + t : null
}

function accentForThree (str, key) {
  // head, middle, tail
  const [h, m, t] = str
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
  if (invalid[str] != null && contains(invalid[str], key)) return null

  if (h === 'u' && m === 'y' && t !== 'u') {
    const accented = accentForOne(t, key)
    return accented != null ? h + m + accented : null
  }

  const accented = accentForOne(m, key)
  return accented != null ? h + accented + t : null
}

// String -> String -> String
export default function transformVni (str, key) {
  const len = str.length

  if (len === 1) return accentForOne(str, key)
  if (len === 2) return accentForTwo(str, key)
  if (len === 3) return accentForThree(str, key)

  return str
}
