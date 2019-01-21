const app = require('express')()
const { applyConfiguration } = require('./config')
const { applyMiddlewares } = require('./middlewares')
const { setRoutes } = require('./routes')

applyConfiguration(app)
applyMiddlewares(app)
setRoutes(app)

module.exports = app
