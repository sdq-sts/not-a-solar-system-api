const dotenv = require('dotenv')
const logger = require('./logger')
const { setVariables } = require('./variables')
const { connectDatabase } = require('./database')
const { applyDatasource } = require('./datasource')

module.exports.applyConfiguration = (app) => {
  dotenv.config()

  app.logger = logger

  setVariables(app)
  connectDatabase(app)
  applyDatasource(app)

  app.logger.info('Configuration successfully applied!')
}
