const { otherOfAPair, removeMarks } = require('../utils')
const { ACCENT_INPUT_MAP, VowelResult } = require('../constants')

/**
 * Put accents for a single vowel
 *
 * @param  {String} char
 * @param  {String} k
 * @return {String|Boolean} Return accented vowel, or false
 */
function accentForOne (char, k) {
  const key = String(k)

  // First case, char is a vowel without accents, e.g. a e i o u
  // Let's call them root vowels, others are non-root
  const combination = ACCENT_INPUT_MAP[char]

  // Try to put accent for it, e.g. a + 1 = á
  // If not, return false
  if (!combination) {
    return ACCENT_INPUT_MAP[char + key]
      ? VowelResult.Accented(ACCENT_INPUT_MAP[char + key])
      : VowelResult.None
  }

  // Next case, non-root vowels
  // Destruct them into root vowel and key combination
  const [vowel, ...keys] = combination

  // Edge case for Ă <=> Â and Ơ <=> Ô when they can be interchangeable
  const SWAPPABLE_KEYS = { a: ['6', '8'], o: ['6', '7'] }
  if (
    !keys.includes(key) &&
    SWAPPABLE_KEYS[vowel] &&
    SWAPPABLE_KEYS[vowel].includes(key)
  ) {
    // For example, â = [a, 6]. Replace 6 with 8 to have [a, 8] = ă
    // Work with other accent marks as well
    // ẳ = [a, 3, 8] changes to [a, 3, 6] = ẩ
    const otherKey = otherOfAPair(key, SWAPPABLE_KEYS[vowel])
    const newKeys = keys.map(k => (k === otherKey ? key : k)).sort()
    const newCom = [vowel, ...newKeys].join('')

    return VowelResult.Accented(ACCENT_INPUT_MAP[newCom])
  }

  // Undo putting accents on vowel, e.g. ắ [a, 1, 8] + 8 = á [a, 1]
  // Return an array containing vowel with mark/accent removed
  if (keys.includes(key)) {
    const newCom = [vowel, ...keys.filter(k => k !== key).sort()].join('')

    return VowelResult.Undone(ACCENT_INPUT_MAP[newCom] || vowel)
  }

  const MARKS = ['1', '2', '3', '4', '5']
  const [firstKey] = keys
  // If we are changing marks, e.g. ắ [a, 1, 8] + 2 = ằ [a, 2, 8]
  const newKeys = MARKS.includes(firstKey) && MARKS.includes(key)
    ? keys.map(k => k === firstKey ? key : k)
    : [...keys, key] // @NOTE: Maybe this will never happen

  const newCom = [vowel, ...newKeys.sort()].join('')
  return ACCENT_INPUT_MAP[newCom]
    ? VowelResult.Accented(ACCENT_INPUT_MAP[newCom])
    : VowelResult.None
}

/**
 * Put accents for dipthongs
 *
 * @param  {String} str
 * @param  {String} key
 * @return {String|Boolean}
 */
function accentForTwo (str, key) {
  const rootVowels = removeMarks(str)

  // A map of invalid keys that cannot be applied on dipthongs
  const invalidKeys = {
    ai: '67',
    ao: '678',
    au: '8',
    ưi: '4',
    ưu: '4',
    uơ: '12345', // @note
    uu: '12345', // @note
    uy: '7'
  }
  if (invalidKeys[rootVowels] != null && invalidKeys[rootVowels].includes(key)) return VowelResult.None

  // Split the dipthong into head and tail
  const [h, t] = str

  // Edge cases of 'uo', 'uô', and 'uơ'
  // Accents are put at the tail vowel
  if ((/[ưu][oôơ]/i).test(rootVowels)) {
    if (key === '7') return 'ươ'

    return accentForOne(t, key).cata({
      Accented: result => VowelResult.Accented(h + result),
      Undone: result => VowelResult.Undone(h + result),
      None: () => this
    })
  }

  return accentForOne(h, key).cata({
    Accented: result => VowelResult.Accented(result + t),
    Undone: result => VowelResult.Undone(result + t),
    None: () => this
  })
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
    yêu: '45'
  }
  if (invalid[str] != null && invalid[str].includes(key)) return VowelResult.None

  // Edge case to put accent for tail vowel
  if (h === 'u' && m === 'y' && t !== 'u') {
    return accentForOne(t, key).cata({
      Accented: result => VowelResult.Accented(h + m + result),
      Undone: result => VowelResult.Undone(h + m + result),
      None: () => this
    })
  }

  // Accents are put in the middle
  return accentForOne(m, key).cata({
    Accented: result => VowelResult.Accented(h + result + t),
    Undone: result => VowelResult.Undone(h + result + t),
    None: () => this
  })
}

function transform (str, key) {
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
