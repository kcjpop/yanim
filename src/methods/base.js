const { otherOfAPair, removeMarks } = require('../utils')
const { ACCENT_INPUT_MAP, Vowel } = require('../constants')

/**
 * Put accents for a single vowel
 *
 * @param  {String} char
 * @param  {String} k
 * @return {String|Boolean} Return accented vowel, or false
 */
function accentForOne(char, k) {
  const keyCode = String(k)

  // First case, char is a vowel without accents, e.g. a e i o u
  // Let's call them root vowels, others are non-root
  const combination = ACCENT_INPUT_MAP[char]

  // Try to put accent for it, e.g. a + 1 = á
  // If not, return false

  if (!combination) {
    return ACCENT_INPUT_MAP[char + keyCode]
      ? Vowel.Accented(ACCENT_INPUT_MAP[char + keyCode])
      : Vowel.None()
  }

  // Next case, non-root vowels
  // Destruct them into root vowel and key combination
  const [vowel, ...keys] = combination
  const MARKS = ['1', '2', '3', '4', '5']
  const [firstKey] = keys

  // Put hat/horn for vowels having tone mark already
  // E.g. á + 8 = ắ, ó + 6 = ố
  if (
    keys.length === 1 &&
    MARKS.includes(firstKey) &&
    ['6', '8', '7'].includes(keyCode)
  ) {
    const newCom = [vowel, ...[...keys, keyCode].sort()].join('')
    return ACCENT_INPUT_MAP[newCom]
      ? Vowel.Accented(ACCENT_INPUT_MAP[newCom])
      : Vowel.None()
  }

  // Edge case for Ă <=> Â and Ơ <=> Ô when they can be interchangeable
  const SWAPPABLE_KEYS = { a: ['6', '8'], o: ['6', '7'] }
  if (
    !keys.includes(keyCode) &&
    SWAPPABLE_KEYS[vowel] &&
    SWAPPABLE_KEYS[vowel].includes(keyCode)
  ) {
    // For example, â = [a, 6]. Replace 6 with 8 to have [a, 8] = ă
    // Work with other accent marks as well
    // ẳ = [a, 3, 8] changes to [a, 3, 6] = ẩ
    const otherKey = otherOfAPair(keyCode, SWAPPABLE_KEYS[vowel])
    const newKeys = keys.map(k => (k === otherKey ? keyCode : k)).sort()
    const newCom = [vowel, ...newKeys].join('')

    return Vowel.Accented(ACCENT_INPUT_MAP[newCom])
  }

  // Undo putting accents on vowel, e.g. ắ [a, 1, 8] + 8 = á [a, 1]
  // Return an array containing vowel with mark/accent removed
  if (keys.includes(keyCode)) {
    const newCom = [vowel, ...keys.filter(k => k !== keyCode).sort()].join('')

    return Vowel.Unaccented(ACCENT_INPUT_MAP[newCom] || vowel)
  }

  // If we are changing marks, e.g. ắ [a, 1, 8] + 2 = ằ [a, 2, 8]
  const newKeys =
    MARKS.includes(firstKey) && MARKS.includes(keyCode)
      ? keys.map(k => (k === firstKey ? keyCode : k))
      : [...keys, keyCode] // @NOTE: Maybe this will never happen

  const newCom = [vowel, ...newKeys.sort()].join('')
  return ACCENT_INPUT_MAP[newCom]
    ? Vowel.Accented(ACCENT_INPUT_MAP[newCom])
    : Vowel.None()
}

/**
 * Put accents for dipthongs
 *
 * @param  {String} str
 * @param  {String} key
 * @return {String|Boolean}
 */
function accentForTwo(str, key) {
  const rootVowels = removeMarks(str)

  // A map of invalid keys that cannot be applied on dipthongs
  const invalidKeys = {
    ai: '67',
    ao: '678',
    au: '8',
    ưi: '4',
    ưu: '4',
    uơ: '12345',
    uu: '12345',
    uy: '7'
  }
  if (invalidKeys[rootVowels] != null && invalidKeys[rootVowels].includes(key))
    return Vowel.None()

  // Split the dipthong into head and tail
  const [h, t] = str

  // Edge cases of 'uo', 'uô', and 'uơ'
  // Accents are put at the tail vowel
  if (/[ưu][oôơ]/g.test(rootVowels)) {
    if (key === '7') return Vowel.Accented('ươ')

    return Vowel.match(accentForOne(t, key), {
      Accented: char => Vowel.Accented(h + char),
      Unaccented: char => Vowel.Unaccented(h + char),
      None: () => Vowel.Unaccented(str)
    })
  }

  return Vowel.match(accentForOne(h, key), {
    Accented: result => Vowel.Accented(result + t),
    Unaccented: result => Vowel.Unaccented(result + t),
    None: () => this
  })
}

function accentForThree(str, key) {
  const rootVowels = removeMarks(str)
  // head, middle, tail
  const [h, m, t] = str
  const invalid = {
    oai: '67',
    oay: '67',
    uai: '67',
    uyu: '12',
    yêu: '5'
  }
  if (invalid[str] != null && invalid[str].includes(key)) return Vowel.None()

  // For UYE, and UYÊ, accent is put in the last vowel
  if (/uy[eê]/gi.test(rootVowels)) {
    return Vowel.match(accentForOne(t, key), {
      Accented: char => Vowel.Accented(h + m + char),
      Unaccented: char => Vowel.Unaccented(h + m + char),
      None: () => this
    })
  }

  // For UOI, UÔI, ƯƠI, UOU, and ƯƠU, they can switch between horn and hat mark
  if (/[uư][oôơ]/gi.test(rootVowels)) {
    return Vowel.match(accentForOne(m, key), {
      // This is a hack, try to understand it by yourself.
      // Examples: ươi + 6, uôi + 7
      Accented: char => Vowel.Accented((key === '6' ? 'u' : 'ư') + char + t),
      Unaccented: char => Vowel.Unaccented('u' + char + t),
      None: () => this
    })
  }

  // For other dipthongs, accent is put in the middle
  return Vowel.match(accentForOne(m, key), {
    Accented: char => Vowel.Accented(h + char + t),
    Unaccented: char => Vowel.Unaccented(h + char + t),
    None: () => this
  })
}

function transform(str, key) {
  const map = {
    1: accentForOne,
    2: accentForTwo,
    3: accentForThree
  }

  return map[str.length](str, key)
}

module.exports = {
  transform,
  accentForOne,
  accentForTwo,
  accentForThree
}
