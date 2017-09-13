export function contains(haystack, needle) {
  return haystack.indexOf(needle) !== -1
}

export function isUpper(str) {
  return str.toUpperCase() === str
}

export function normalizeCase(source, target) {
  if (source.length !== target.length) throw new Error('Cannot normalize case of strings with different lengths')

  return target.split('').reduce((str, char, index) => str + (isUpper(source[index]) ? char.toUpperCase() : char), '')
}

export function lastIndexOf(str, predicate, startIndex = null) {
  const n = startIndex != null && startIndex >= 0 && startIndex <= str.length ? startIndex : str.length
  let i = n
  for (; i >= 0; i--) if (predicate(str[i])) return i
}
