const { SalesController } = require('./controller')
const express = require('express')
const router = express.Router()

module.exports = (app) => {
  const saleController = new SalesController(app.db.models)

  router.get('/',
    app.auth.authenticate(),
    (req, res) => {
      saleController.getAll(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.post('/',
    app.auth.authenticate(),
    (req, res) => {
      saleController.create(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.get('/meta',
    app.auth.authenticate(),
    (req, res) => {
      saleController.getMetadata(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.get('/:id',
    app.auth.authenticate(),
    (req, res) => {
      saleController.getById(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.put('/:id',
    app.auth.authenticate(),
    (req, res) => {
      saleController.update(req)
        .then((response) => {
          res.sendStatus(response.statusCode)
        })
    })

  router.delete('/:id',
    app.auth.authenticate(),
    (req, res) => {
      saleController.delete(req)
        .then((response) => {
          res.sendStatus(response.statusCode)
        })
    })

  return router
}
