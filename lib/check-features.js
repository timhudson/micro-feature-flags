const { fingerprint32 } = require('farmhash')
const stableStringify = require('json-stable-stringify')
const mem = require('mem')
const ms = require('ms')

module.exports = mem(checkFeatures, {
  cacheKey: stableStringify,
  maxAge: ms('24h')
})

// Exported for unit tests
module.exports.checkFeature = checkFeature

function checkFeature ({ feature, percent, id }) {
  const hash = fingerprint32(new Buffer(`${feature}:${id}`))
  const hasFeature = (hash % 100) <= percent
  return hasFeature
}

function checkFeatures ({ features, id }) {
  const result = {}
  for (const feature in features) {
    const percent = features[feature]
    result[feature] = checkFeature({ feature, percent, id })
  }
  return result
}
