const { fingerprint32 } = require('farmhash')

module.exports = ({ features, id }) => {
  const result = {}
  for (const feature in features) {
    const percent = features[feature]
    result[feature] = checkFeature({ feature, percent, id })
  }
  return result
}

const checkFeature = module.exports.checkFeature = ({ feature, percent, id }) => {
  const hash = fingerprint32(new Buffer(`${feature}:${id}`))
  const hasFeature = (hash % 100) <= percent
  return hasFeature
}
