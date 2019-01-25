const router = require('express').Router()
const { SalesController } = require('./controller')
const { cleanCache } = require('../../middlewares/')

module.exports = (app) => {
  const saleController = new SalesController(app.db.models)

  router.get('/',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await saleController.getAll(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.post('/',
    app.auth.authenticate(),
    cleanCache,
    async (req, res) => {
      const response = await saleController.create(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.get('/meta',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await saleController.getMetadata(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.get('/:id',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await saleController.getById(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.put('/:id',
    app.auth.authenticate(),
    cleanCache,
    async (req, res) => {
      const response = await saleController.update(req)
      res.sendStatus(response.statusCode)
    })

  router.delete('/:id',
    app.auth.authenticate(),
    cleanCache,
    async (req, res) => {
      const response = await saleController.delete(req)
      res.sendStatus(response.statusCode)
    })

  return router
}
