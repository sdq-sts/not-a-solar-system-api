const path = require('path')
const express = require('express')
const auth = require('../api/Auth')
const users = require('../api/Users')
const products = require('../api/Products')
const services = require('../api/Services')
const purchases = require('../api/Purchases')
const sales = require('../api/Sales')
const { swaggerDocs } = require('../docs')

module.exports.setRoutes = (app) => {
  const clientPath = path.join(__dirname, '../client/dist')
  const apiBasePath = '/api/v1'

  app.use(`${apiBasePath}/auth`, auth(app))
  app.use(`${apiBasePath}/users`, users(app))
  app.use(`${apiBasePath}/services`, services(app))
  app.use(`${apiBasePath}/sales`, sales(app))
  app.use(`${apiBasePath}/products`, products(app))
  app.use(`${apiBasePath}/purchases`, purchases(app))

  app.use(`${apiBasePath}/docs`, ...swaggerDocs())

  app.use('/', express.static(clientPath))
  app.use('*', express.static(clientPath))

  app.logger.info('App routes successfully applied!')
}
