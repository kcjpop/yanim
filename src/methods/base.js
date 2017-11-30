const { otherOfAPair } = require('../utils')
const { ACCENT_INPUT_MAP } = require('../constants')

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
  if (!combination) return ACCENT_INPUT_MAP[char + key] || false

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

    return ACCENT_INPUT_MAP[newCom]
  }

  // To put accents for non-root vowels
  const newKeys = [
    ...keys.includes(key) ? keys.filter(k => k !== key) : keys,
    key
  ].sort()

  const newCom = [vowel, ...newKeys].join('')
  return ACCENT_INPUT_MAP[newCom] || false
}

/**
 * Put accents for dipthongs
 *
 * @param  {String} str
 * @param  {String} key
 * @return {String|Boolean}
 */
function accentForTwo (str, key) {
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
  if (invalidKeys[str] != null && invalidKeys[str].includes(key)) return false

  // Split the dipthong into head and tail
  const [h, t] = str

  // Edge cases of 'uo', 'uô', and 'uơ'
  // Accents are put at the tail vowel
  if (str.match(/[ưu][oôơ]/i)) {
    if (key === '7') return 'ươ'

    const accented = accentForOne(t, key)
    return accented !== false ? h + accented : false
  }

  const accented = accentForOne(h, key)
  return accented !== false ? accented + t : false
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
  if (invalid[str] != null && invalid[str].includes(key)) return false

  // Edge case to put accent for tail vowel
  if (h === 'u' && m === 'y' && t !== 'u') {
    const accented = accentForOne(t, key)
    return accented !== false ? h + m + accented : false
  }

  // Accents are put in the middle
  const accented = accentForOne(m, key)
  return accented !== false ? h + accented + t : false
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
