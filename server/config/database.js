const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const connectDatabase = async (app) => {
  try {
    await app.db.connect(app.config.dbURI, { useCreateIndex: true, useNewUrlParser: true })
    log.info('Connected to the database!')
  } catch (error) {
    log.error(`Error while trying connect to database: ${error}`)
    process.exit(1)
  }
}

const disconnectDatabase = async (app) => {
  try {
    await app.db.disconnect()
    log.info('Disconnected from the database!')
  } catch (error) {
    log.error(`Error while trying disconnect from database: ${error}`)
    process.exit(1)
  }
}

module.exports.configDatabase = (app) => {
  app.db = mongoose
  app.connectDatabase = connectDatabase
  app.disconnectDatabase = disconnectDatabase
}
