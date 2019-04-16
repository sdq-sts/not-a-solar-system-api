const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const authStrategy = require('@/auth')
const { cleanCache } = require('./cleanCache')

const setMiddlewares = (app) => {
  const auth = authStrategy(app)

  app.set('port', app.config.port)
  app.use(bodyParser.json())
  app.use(helmet())
  app.use(cors())
  app.use(compression())
  app.use(auth.initialize())

  app.auth = auth

  log.info('Middlewares applied!')
}

module.exports = {
  setMiddlewares,
  cleanCache
}
