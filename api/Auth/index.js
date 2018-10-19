const express = require('express')
const HttpStatus = require('http-status')
const jwt = require('jwt-simple')
const { isValidPassword } = require('../../helpers/mongoose')
const router = express.Router()

module.exports = (app) => {
  const { config } = app
  const { User } = app.db.models

  router.post('/', async (req, res) => {
    const { email, password } = req.body

    if (email && password) {
      const user = await User.findOne({ email })
      const validPassword = user
        ? await isValidPassword(password, user.password)
        : false

      if (user && validPassword) {
        const payload = { id: user.id, email: user.email }
        const token = jwt.encode(payload, config.jwtSecret)

        res.json({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token
        })
      } else {
        res.sendStatus(HttpStatus.UNAUTHORIZED)
      }
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED)
    }
  })

  return router
}
