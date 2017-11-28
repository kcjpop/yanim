import { METHOD_VNI } from './constants'
import { extractPossibleVowels } from './extract'
import transformVni from './methods/vni'
import { normalizeCase } from './utils'

export default function transform (inputMode, buffer, keyCode) {
  const transformers = {
    [METHOD_VNI]: transformVni
    // [METHOD_TELEX]: transformTelex
  }

  const putAccents = transformers[inputMode]

  if (putAccents == null) {
    throw new Error('Invalid input mode. Supported: ' + Object.keys(transformers).join(''))
  }

  const result = extractPossibleVowels(buffer)
  if (result == null) return buffer

  // Put accents for the found vowel combination
  const [vowels, startingIndex] = result
  const accented = putAccents(vowels, String(keyCode))
  // If cannot put accents for the vowels, just append key code into it
  if (accented == null) return buffer + keyCode

  // Because `extractPossibleVowels()` will always return string in lower case,
  // we need to restore its original case
  const cased = normalizeCase(buffer.substr(startingIndex, accented.length), accented)

  const head = buffer.substring(0, startingIndex)
  const tail = buffer.substring(startingIndex + accented.length)

  return head + cased + tail
}
