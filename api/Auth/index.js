const express = require('express')
const HttpStatus = require('http-status')
const jwt = require(`jsonwebtoken`)
const { isValidPassword } = require('../../utils')
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
        const payload = { id: user.id, email: user.email, darkMode: user.darkMode }
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '12h' })
        const { id, name, email } = user

        res.json({ id, name, email, token })
      } else {
        res.sendStatus(HttpStatus.UNAUTHORIZED)
      }
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED)
    }
  })

  return router
}
