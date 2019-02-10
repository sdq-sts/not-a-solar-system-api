const router = require('express').Router()
const { ServicesController } = require('./controller')

module.exports = (app) => {
  const servicesController = new ServicesController(app)

  router.get('/upload',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await servicesController.getUploadUrl(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  return router
}
