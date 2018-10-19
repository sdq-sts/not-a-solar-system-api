const auth = require('../api/Auth')
const users = require('../api/Users')

module.exports = (app) => ({
  init () {
    app.use('/api/v1/auth', auth(app))
    app.use('/api/v1/users', users(app))
  }
})
