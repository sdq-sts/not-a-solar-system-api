module.exports = () => ({
  config (app) {
    app.config = {
      dbURI: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URI : process.env.DB_URI,
      jwtSecret: process.env.NODE_ENV === 'test' ? process.env.JWT_TEST_SECRET : process.env.JWT_SECRET,
      jwtSession: { session: false }
    }
  }
})
