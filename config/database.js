const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const connectDatabase = async (app) => {
  try {
    await app.db.connect(app.config.dbURI, { useCreateIndex: true, useNewUrlParser: true })
    app.logger.info('Connected to the database!')
  } catch (error) {
    app.logger.error(`Error while trying connect to database: ${error}`)
  }
}

const disconnectDatabase = async (app) => {
  try {
    await app.db.disconnect()
    app.logger.info('Disconnected from the database!')
  } catch (error) {
    app.logger.error(`Error while trying disconnect from database: ${error}`)
  }
}

module.exports.configDatabase = (app) => {
  app.db = mongoose
  app.connectDatabase = connectDatabase
  app.disconnectDatabase = disconnectDatabase
}
