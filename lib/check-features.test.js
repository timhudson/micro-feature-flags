const test = require('ava')
const { checkFeature } = require('./check-features')

test('accurate percent for single feature', t => {
  const feature = 'test-feature'
  const percent = Math.round(Math.random() * 100)
  const totalIds = 100000
  let totalWithFeature = 0

  for (let id = 0; id < totalIds; id++) {
    const hasFeature = checkFeature({
      feature,
      percent,
      id
    })

    if (hasFeature) totalWithFeature++
  }

  const result = Math.floor((totalWithFeature / totalIds) * 100)
  t.truthy(result <= percent + 1)
  t.truthy(result >= percent - 1)
})

test('randomly distribute same user over many features', t => {
  const id = 'id'
  const percent = Math.round(Math.random() * 100)
  const totalFeatures = 100000
  let totalWithFeature = 0

  for (let feature = 0; feature < totalFeatures; feature++) {
    const hasFeature = checkFeature({
      feature,
      percent,
      id
    })

    if (hasFeature) totalWithFeature++
  }

  const result = Math.floor((totalWithFeature / totalFeatures) * 100)
  t.truthy(result <= percent + 1)
  t.truthy(result >= percent - 1)
})
