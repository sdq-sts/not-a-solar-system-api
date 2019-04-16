const { clearHash } = require('@/services/cache')

module.exports.cleanCache = async (req, res, next) => {
  const userId = ((req || {}).user || {}).id

  await next() // this allows the middleware run after the request

  if (userId) {
    clearHash(userId)
  }
}
