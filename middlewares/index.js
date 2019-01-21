const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const compression = require('compression')
const authStrategy = require('../auth')

module.exports.applyMiddlewares = (app) => {
  const auth = authStrategy(app)
  const clientPath = path.join(__dirname, '../client/dist')

  app.set('port', app.config.port)
  app.use(express.static(clientPath))
  app.use(bodyParser.json())
  app.use(helmet())
  app.use(cors())
  app.use(compression())
  app.use(auth.initialize())

  app.auth = auth

  app.logger.info('Middlewares successfully applied!')
}
