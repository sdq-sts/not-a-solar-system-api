const app = require('express')()
const { setAppConfig } = require('./config')
const { setMiddlewares } = require('./middlewares')
const { setRoutes } = require('./routes')

setAppConfig(app)
setMiddlewares(app)
setRoutes(app)

module.exports = app
