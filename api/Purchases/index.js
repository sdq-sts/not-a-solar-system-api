const { PurchasesController } = require('./controller')
const express = require('express')
const router = express.Router()

module.exports = (app) => {
  const purchaseController = new PurchasesController(app.db.models)

  router.get('/',
    app.auth.authenticate(),
    (req, res) => {
      purchaseController.getAll(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.post('/',
    app.auth.authenticate(),
    (req, res) => {
      purchaseController.create(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.get('/meta',
    app.auth.authenticate(),
    (req, res) => {
      purchaseController.getMetadata(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.get('/:id',
    app.auth.authenticate(),
    (req, res) => {
      purchaseController.getById(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.put('/:id',
    app.auth.authenticate(),
    (req, res) => {
      purchaseController.update(req)
        .then((response) => {
          res.sendStatus(response.statusCode)
        })
    })

  router.delete('/:id',
    app.auth.authenticate(),
    (req, res) => {
      purchaseController.delete(req)
        .then((response) => {
          res.sendStatus(response.statusCode)
        })
    })

  return router
}
