require('dotenv').config()
require('./logger')

const { setVariables } = require('./variables')
const { configCache } = require('./cache')
const { configDatabase } = require('./database')
const { applyDatasource } = require('./datasource')

module.exports.setConfiguration = (app) => {
  setVariables(app)
  configCache(app)
  configDatabase(app)
  applyDatasource(app)

  log.info('Configuration successfully applied!')
}
