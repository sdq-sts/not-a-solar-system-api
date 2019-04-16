require('dotenv').config()
require('./logger')

const { initServices } = require('@/services')
const { setVariables } = require('./variables')
const { applyDatasource } = require('./datasource')

module.exports.setAppConfig = (app) => {
  setVariables(app)
  initServices(app)
  applyDatasource(app)

  log.info('Configuration successfully applied!')
}
