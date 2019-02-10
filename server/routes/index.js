const auth = require('@/api/Auth/routes')
const users = require('@/api/Users/routes')
const products = require('@/api/Products/routes')
const services = require('@/api/Services/routes')
const purchases = require('@/api/Purchases/routes')
const sales = require('@/api/Sales/routes')
const { swaggerDocs } = require('@/docs')

module.exports.setRoutes = (app) => {
  const apiBasePath = '/api/v1'

  app.use(`${apiBasePath}/auth`, auth(app))
  app.use(`${apiBasePath}/users`, users(app))
  app.use(`${apiBasePath}/sales`, sales(app))
  app.use(`${apiBasePath}/products`, products(app))
  app.use(`${apiBasePath}/services`, services(app))
  app.use(`${apiBasePath}/purchases`, purchases(app))
  app.use(`${apiBasePath}/docs`, ...swaggerDocs())

  app.logger.info('App routes successfully applied!')
}
