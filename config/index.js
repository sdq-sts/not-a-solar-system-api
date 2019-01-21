const dotenv = require('dotenv')
const { setVariables } = require('./variables')
const { connectDatabase } = require('./database')
const { applyDatasource } = require('./datasource')

module.exports.applyConfiguration = (app) => {
  dotenv.config()
  setVariables(app)
  connectDatabase(app)
  applyDatasource(app)
}
