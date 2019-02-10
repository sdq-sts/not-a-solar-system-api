const router = require('express').Router()
const { UsersController } = require('./controller')
const { cleanCache } = require('@/middlewares/')

module.exports = (app) => {
  const userController = new UsersController(app.db.models.User)

  router.get('/',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await userController.getAll(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.post('/',
    cleanCache,
    async (req, res) => {
      const response = await userController.create(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.get('/me',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await userController.getSelf(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.get('/:id',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await userController.getById(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.put('/:id',
    app.auth.authenticate(),
    cleanCache,
    async (req, res) => {
      const response = await userController.update(req)
      res.sendStatus(response.statusCode)
    })

  router.delete('/:id',
    app.auth.authenticate(),
    cleanCache,
    async (req, res) => {
      const response = await userController.delete(req)
      res.sendStatus(response.statusCode)
    })

  return router
}
