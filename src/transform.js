import { METHOD_VNI } from './constants'
import { extract } from './extract'
import transformVni from './methods/vni'
import { normalizeCase } from './utils'

export default function transform(inputMode, input, key) {
  const transformers = {
    [METHOD_VNI]: transformVni
  }

  if (transformers[inputMode] == null) {
    throw new Error('Invalid input mode. Supported: ' + Object.keys(transformers).join(''))
  }

  const result = extract(input)
  if (result == null) return input

  const [buffer, startingIndex] = result
  const accented = transformers[inputMode](buffer, String(key))
  if (accented == null) return input + key

  // Normalize case of accented substring
  const cased = normalizeCase(input.substr(startingIndex, accented.length), accented)

  const head = input.substring(0, startingIndex)
  const tail = input.substring(startingIndex + accented.length)

  return head + cased + tail
}
