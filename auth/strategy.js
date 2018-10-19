const { Strategy, ExtractJwt } = require('passport-jwt')

module.exports = (app) => {
  const { User } = app.db.models
  const opts = {
    secretOrKey: app.config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  const strategy = new Strategy(opts, async (payload, done) => {
    try {
      const user = User.findById(payload.id)
      return user ? done(null, { id: user.id, email: user.email }) : done(null, false)
    } catch (error) {
      return done(error, null)
    }
  })

  return strategy
}
