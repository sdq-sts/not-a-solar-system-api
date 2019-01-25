require('dotenv').config()

const { logger } = require('./logger')
const { setVariables } = require('./variables')
const { configCache } = require('./cache')
const { configDatabase } = require('./database')
const { applyDatasource } = require('./datasource')

module.exports.applyConfiguration = (app) => {
  app.logger = logger

  setVariables(app)
  configCache(app)
  configDatabase(app)
  applyDatasource(app)

  app.logger.info('Configuration successfully applied!')
}
