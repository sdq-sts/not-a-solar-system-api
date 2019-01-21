const mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports.connectDatabase = async (app) => {
  app.db = mongoose

  try {
    await mongoose.connect(app.config.dbURI, { useCreateIndex: true, useNewUrlParser: true })
    app.logger.info('Connected to the database!')
  } catch (error) {
    app.logger.info(`Error while trying connect to database: ${error}`)
  }
}

module.exports.disconnectDatabase = async () => {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from the database!')
  } catch (error) {
    console.log(`Error while trying disconnect from database: ${error}`)
  }
}
