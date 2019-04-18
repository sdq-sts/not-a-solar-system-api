require('dotenv').config()
require('./logger')
require('./handleErrors')

const { initServices } = require('@/services')
// const { handleErrors } = require('./handleErrors')
const { setVariables } = require('./variables')
const { applyDatasource } = require('./datasource')

module.exports.setAppConfig = (app) => {
  // handleErrors()
  setVariables(app)
  initServices(app)
  applyDatasource(app)
}
