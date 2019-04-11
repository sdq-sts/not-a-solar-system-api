const { Strategy, ExtractJwt } = require('passport-jwt')

module.exports = (app) => {
  const { User } = app.db.models
  const opts = {
    secretOrKey: app.config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  const strategy = new Strategy(opts, async (payload, done) => {
    try {
      const { email, id } = await User.findById(payload.id)

      return email
        ? done(null, { id, email })
        : done(null, false)
    } catch (error) {
      return done(error, null)
    }
  })

  return strategy
}
