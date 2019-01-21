const mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports.connectDatabase = async (app) => {
  app.db = mongoose

  try {
    await mongoose.connect(app.config.dbURI, { useCreateIndex: true, useNewUrlParser: true })
    console.log('Conectado ao banco de dados!')
  } catch (error) {
    console.log('Erro ao tentar conectar banco de dados', error)
  }
}

module.exports.disconnectDatabase = async () => {
  try {
    await mongoose.disconnect()
    console.log('Desconectado ao banco de dados!')
  } catch (error) {
    console.log('Erro ao tentar desconectar banco de dados', error)
  }
}
