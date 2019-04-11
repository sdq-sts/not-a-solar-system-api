const app = require('express')()
const { setConfiguration } = require('./config')
const { setMiddlewares } = require('./middlewares')
const { setRoutes } = require('./routes')

setConfiguration(app)
setMiddlewares(app)
setRoutes(app)

module.exports = app
