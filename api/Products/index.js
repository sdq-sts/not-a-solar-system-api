const { ProductsController } = require('./controller')
const express = require('express')
const router = express.Router()

module.exports = (app) => {
  const productController = new ProductsController(app.db.models.Product)

  router.get('/',
    app.auth.authenticate(),
    (req, res) => {
      productController.getAll(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.post('/',
    app.auth.authenticate(),
    (req, res) => {
      productController.create(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.get('/:id',
    app.auth.authenticate(),
    (req, res) => {
      productController.getById(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.put('/:id',
    app.auth.authenticate(),
    (req, res) => {
      productController.update(req)
        .then((response) => {
          res.sendStatus(response.statusCode)
        })
    })

  router.delete('/:id',
    app.auth.authenticate(),
    (req, res) => {
      productController.delete(req)
        .then((response) => {
          res.sendStatus(response.statusCode)
        })
    })

  return router
}
