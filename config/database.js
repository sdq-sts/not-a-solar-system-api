const mongoose = require('mongoose')

module.exports = () => {
  mongoose.Promise = global.Promise

  return {
    db: () => mongoose,

    connect: async (app) => {
      const opts = { useCreateIndex: true, useNewUrlParser: true }
      const { config } = app

      app.db = mongoose

      try {
        await mongoose.connect(config.dbURI, opts)
        console.log('Conectado ao banco de dados!')
      } catch (error) {
        console.log(error)
      }
    },

    disconnect: async () => {
      await mongoose.disconnect()
      console.log('Desconectado ao banco de dados!')
    }
  }
}
