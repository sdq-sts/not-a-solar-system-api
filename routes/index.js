const express = require('express')
const auth = require('../api/Auth')
const users = require('../api/Users')
const products = require('../api/Products')
const path = require('path')

module.exports = (app) => ({
  init () {
    const clientPath = path.join(__dirname, '../client/dist')

    app.use('/api/v1/users', users(app))
    app.use('/api/v1/products', products(app))
    app.use('/api/v1/auth', auth(app))
    app.use('/', express.static(clientPath))
    app.use('*', express.static(clientPath))
  }
})
