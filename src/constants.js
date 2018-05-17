const daggy = require('daggy')
const VowelResult = daggy.taggedSum('VowelResult', {
  Accented: ['result'],
  Undone: ['result'],
  None: []
})

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
  ế: 'e16',
  ề: 'e26',
  ể: 'e36',
  ễ: 'e46',
  ệ: 'e56',
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
  ố: 'o16',
  ồ: 'o26',
  ổ: 'o36',
  ỗ: 'o46',
  ộ: 'o56',
  ơ: 'o7',
  ớ: 'o17',
  ờ: 'o27',
  ở: 'o37',
  ỡ: 'o47',
  ợ: 'o57',
  ú: 'u1',
  ù: 'u2',
  ủ: 'u3',
  ũ: 'u4',
  ụ: 'u5',
  ư: 'u7',
  ứ: 'u17',
  ừ: 'u27',
  ử: 'u37',
  ữ: 'u47',
  ự: 'u57',
  ý: 'y1',
  ỳ: 'y2',
  ỷ: 'y3',
  ỹ: 'y4',
  ỵ: 'y5',
  đ: 'd9'
}

const ACCENT_INPUT_MAP = Object.keys(ACCENT_MAP).reduce((acc, k) => {
  const v = ACCENT_MAP[k]
  acc[k] = v
  acc[v] = k
  return acc
}, {})

const ACCENTED_VOWELS =
  'aáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵ'

const DIPHTHONG_LENGTH = 2

const TRIPHTHONG_LENGTH = 3

const DIPHTHONGS = [
  'ia',
  'ua',
  'ưa',
  'ai',
  'oi',
  'ôi',
  'ơi',
  'ui',
  'ưi',
  'ao',
  'êu',
  'eo',
  'uo',
  'uô',
  'uơ',
  'au',
  'eu',
  'iu',
  'uu',
  'ưu',
  'âu',
  'ay',
  'ây',
  'uy'
]
const TRIPHTHONGS = [
  'ieu',
  'iêu',
  'oai',
  'oay',
  'uai',
  'uay',
  'uây',
  'uoi',
  'uôi',
  'ươi',
  'uou',
  'ươu',
  'uye',
  'uyê',
  'uyu',
  'yeu',
  'yêu'
]

module.exports = {
  ACCENT_INPUT_MAP,
  ACCENTED_VOWELS,
  DIPHTHONG_LENGTH,
  DIPHTHONGS,
  TRIPHTHONG_LENGTH,
  TRIPHTHONGS,
  VowelResult
}
