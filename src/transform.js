const { METHOD_VNI } = require('./constants')
const transformVni = require('./methods/vni')

function transform (inputMode, buffer, key) {
  if (inputMode === METHOD_VNI) return transformVni(buffer, key)
}

module.exports = { transform, transformVni }
