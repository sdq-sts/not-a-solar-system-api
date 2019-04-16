const { configCache } = require('./cache')
const { configDatabase } = require('./database')

module.exports.initServices = (app) => {
  configCache(app)
  configDatabase(app)

  log.info('Services configured!')
}
