const { UsersController } = require('./controller')
const express = require('express')
const router = express.Router()

module.exports = (app) => {
  const userController = new UsersController(app.db.models.User)

  router.get('/',
    app.auth.authenticate(),
    (req, res) => {
      userController.getAll(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.post('/',
    // app.auth.authenticate(),
    (req, res) => {
      userController.create(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.get('/me',
    app.auth.authenticate(),
    (req, res) => {
      userController.getSelf(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.get('/:id',
    // app.auth.authenticate(),
    (req, res) => {
      userController.getById(req)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  router.put('/:id',
    // app.auth.authenticate(),
    (req, res) => {
      userController.update(req)
        .then((response) => {
          res.sendStatus(response.statusCode)
        })
    })

  router.delete('/:id',
    // app.auth.authenticate(),
    (req, res) => {
      userController.delete(req)
        .then((response) => {
          res.sendStatus(response.statusCode)
        })
    })

  return router
}
