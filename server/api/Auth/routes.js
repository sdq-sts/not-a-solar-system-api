const router = require('express').Router()
const { AuthController } = require('./controller')

module.exports = (app) => {
  const authController = new AuthController(app.db.models, app.config.jwtSecret)

  router.post('/', async (req, res) => {
    const response = await authController.authenticate(req)

    res.status(response.statusCode)
    res.json(response.data)
  })

  router.post('/validate', async (req, res) => {
    const response = await authController.validatePassword(req)

    res.status(response.statusCode)
    res.json(response.data)
  })

  return router
}
