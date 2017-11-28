export function contains (haystack, needle) {
  return haystack.indexOf(needle) !== -1
}

export function isUpper (str) {
  return str.toUpperCase() === str
}

// Make case of characters in source same as in target, char by char
export function normalizeCase (source, target) {
  if (source.length !== target.length) throw new Error('Cannot normalize case of strings with different lengths')

  return target.split('').reduce((str, char, index) => str + (isUpper(source[index]) ? char.toUpperCase() : char), '')
}

export function lastIndexOf (str, predicate, startIndex = null) {
  const n = startIndex != null && startIndex >= 0 && startIndex <= str.length ? startIndex : str.length
  let i = n
  for (; i >= 0; i--) if (predicate(str[i])) return i
}

export function removeAccents (buffer) {
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

  return charMap.reduce((str, [replacer, pattern]) => str.replace(pattern, replacer), buffer)
}
