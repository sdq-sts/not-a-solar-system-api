const express = require('express')
const router = express.Router()
const { ProductsController } = require('./controller')
const { cleanCache } = require('../../middlewares/')

module.exports = (app) => {
  const productController = new ProductsController(app.db.models.Product)

  router.get('/',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await productController.getAll(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.post('/',
    app.auth.authenticate(),
    cleanCache,
    async (req, res) => {
      const response = await productController.create(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.get('/meta',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await productController.getMetadata(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.get('/:id',
    app.auth.authenticate(),
    async (req, res) => {
      const response = await productController.getById(req)
      res.status(response.statusCode)
      res.json(response.data)
    })

  router.put('/:id',
    app.auth.authenticate(),
    cleanCache,
    async (req, res) => {
      const response = await productController.update(req)
      res.sendStatus(response.statusCode)
    })

  router.delete('/:id',
    app.auth.authenticate(),
    cleanCache,
    async (req, res) => {
      const response = await productController.delete(req)
      res.sendStatus(response.statusCode)
    })

  return router
}
