import { contains } from '../utils'

const otherOfAPair = (k, [a, b]) => k === a ? b : a

const ACCENT_MAP = {
  á: 'a1',
  à: 'a2',
  ả: 'a3',
  ã: 'a4',
  ạ: 'a5',
  â: 'a6',
  ă: 'a8',
  ắ: 'a18',
  ằ: 'a28',
  ẳ: 'a38',
  ẵ: 'a48',
  ặ: 'a58',
  ấ: 'a16',
  ầ: 'a26',
  ẩ: 'a36',
  ẫ: 'a46',
  ậ: 'a56',
  é: 'e1',
  è: 'e2',
  ẻ: 'e3',
  ẽ: 'e4',
  ẹ: 'e5',
  ê: 'e6',
  ế: 'e61',
  ề: 'e62',
  ể: 'e63',
  ễ: 'e64',
  ệ: 'e65',
  í: 'i1',
  ì: 'i2',
  ỉ: 'i3',
  ĩ: 'i4',
  ị: 'i5',
  ó: 'o1',
  ò: 'o2',
  ỏ: 'o3',
  õ: 'o4',
  ọ: 'o5',
  ô: 'o6',
  ố: 'o61',
  ồ: 'o62',
  ổ: 'o63',
  ỗ: 'o64',
  ộ: 'o65',
  ơ: 'o7',
  ớ: 'o71',
  ờ: 'o72',
  ở: 'o73',
  ỡ: 'o74',
  ợ: 'o75',
  ú: 'u1',
  ù: 'u2',
  ủ: 'u3',
  ũ: 'u4',
  ụ: 'u5',
  ư: 'u7',
  ứ: 'u71',
  ừ: 'u72',
  ử: 'u73',
  ữ: 'u74',
  ự: 'u75',
  ý: 'y1',
  ỳ: 'y2',
  ỷ: 'y3',
  ỹ: 'y4',
  ỵ: 'y5'
}

const TWOWAY_ACCENT_MAP = Object.keys(ACCENT_MAP).reduce((acc, k) => {
  const v = ACCENT_MAP[k]
  acc[k] = v
  acc[v] = k
  return acc
}, {})

function accentForOne (char, k) {
  const key = String(k)
  const combination = TWOWAY_ACCENT_MAP[char]

  if (!combination && TWOWAY_ACCENT_MAP[char + key]) {
    return TWOWAY_ACCENT_MAP[char + key]
  }

  const [vowel, ...keys] = combination

  const SWAPPABLE_KEYS = { a: [6, 8], o: [6, 7] }

  if (
    !keys.includes(key) &&
    SWAPPABLE_KEYS[vowel] &&
    SWAPPABLE_KEYS[vowel].includes(k)
  ) {
    const otherKey = String(otherOfAPair(k, SWAPPABLE_KEYS[vowel]))

    const newKeys = keys.map(k => (k === otherKey ? key : k)).sort()

    const newCom = [vowel, ...newKeys].join('')
    return TWOWAY_ACCENT_MAP[newCom]
  }

  const newKeys = keys.includes(key) ? keys.filter(k => k !== key) : null
  if (newKeys == null) return char + k

  const newCom = [vowel, ...newKeys].join('')
  return TWOWAY_ACCENT_MAP[newCom]
}

function accentForTwo (str, key) {
  const invalid = {
    ai: '67',
    ao: '678',
    au: '8',
    ưi: '4',
    ưu: '4',
    uơ: '12345', // @note
    uu: '12345', // @note
    uy: '7'
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
    oai: '467',
    oay: '467',
    uai: '467',
    uôi: '47',
    ươi: '46',
    ươu: '46',
    uyu: '124',
    yêu: '5'
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
