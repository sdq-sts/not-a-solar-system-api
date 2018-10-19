const dotenv = require('dotenv')
const variables = require('./variables')()
const datasource = require('./datasource')()
const middlewares = require('./middlewares')()
const database = require('./database')()

module.exports = (app) => ({
  init () {
    dotenv.config()
    variables.config(app)
    database.connect(app)
    datasource.config(app)
    middlewares.config(app)
  }
})
