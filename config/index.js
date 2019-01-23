const dotenv = require('dotenv')
const logger = require('./logger')
const { setVariables } = require('./variables')
const { configDatabase } = require('./database')
const { applyDatasource } = require('./datasource')

module.exports.applyConfiguration = (app) => {
  dotenv.config()

  app.logger = logger

  setVariables(app)
  configDatabase(app)
  applyDatasource(app)

  app.logger.info('Configuration successfully applied!')
}
