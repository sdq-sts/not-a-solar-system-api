const { clearHash } = require('@/config/cache')

module.exports.cleanCache = async (req, res, next) => {
  await next() // this allows the middleware run after the request

  clearHash(req.user.id)
}
