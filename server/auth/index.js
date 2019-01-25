const passport = require('passport')
const strategy = require('./strategy')

module.exports = (app) => {
  const { jwtSession } = app.config

  passport.use(strategy(app))

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', jwtSession)
  }
}
