const express = require('express')
const { AuthController } = require('./controller')
const router = express.Router()

module.exports = (app) => {
  const authController = new AuthController(app.db.models, app.config.jwtSecret)

  router.post('/', async (req, res) => {
    const response = await authController.authenticate(req)

    res.status(response.statusCode)
    res.json(response.data)
  })

  return router
}
