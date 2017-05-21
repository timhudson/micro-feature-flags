const { json } = require('micro')
const { parse } = require('url')
const checkFeatures = require('./lib/check-features')

module.exports = async (req, res) => {
  const opts = await json(req)
  return checkFeatures(opts)
}
