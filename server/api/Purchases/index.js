const router = require('express').Router()
const { PurchasesController } = require('./controller')
const { cleanCache } = require('../../middlewares/')

module.exports = (app) => {
  const purchaseController = new PurchasesController(app.db.models)

  router.get('/',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await purchaseController.getAll(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.post('/',
    app.auth.authenticate(),
    cleanCache,
    async (req, res) => {
      const response = await purchaseController.create(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.get('/meta',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await purchaseController.getMetadata(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.get('/:id',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await purchaseController.getById(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.put('/:id',
    app.auth.authenticate(),
    cleanCache,
    async (req, res) => {
      const response = await purchaseController.update(req)
      res.sendStatus(response.statusCode)
    })

  router.delete('/:id',
    app.auth.authenticate(),
    cleanCache,
    async (req, res) => {
      const response = await purchaseController.delete(req)
      res.sendStatus(response.statusCode)
    })

  return router
}
