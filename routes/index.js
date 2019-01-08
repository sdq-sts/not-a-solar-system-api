const path = require('path')
const express = require('express')
const auth = require('../api/Auth')
const users = require('../api/Users')
const products = require('../api/Products')
const services = require('../api/Services')
const purchases = require('../api/Purchases')
const sales = require('../api/Sales')

module.exports = (app) => ({
  init () {
    const clientPath = path.join(__dirname, '../client/dist')

    app.use('/api/v1/users', users(app))
    app.use('/api/v1/products', products(app))
    app.use('/api/v1/auth', auth(app))
    app.use('/api/v1/services', services(app))
    app.use('/api/v1/purchases', purchases(app))
    app.use('/api/v1/sales', sales(app))

    app.use('/', express.static(clientPath))
    app.use('*', express.static(clientPath))
  }
})
