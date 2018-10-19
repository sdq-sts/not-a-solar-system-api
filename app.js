const app = require('express')()
const config = require('./config')(app)
const routes = require('./routes')(app)

config.init()
routes.init()

module.exports = app
