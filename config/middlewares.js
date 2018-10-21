const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const compression = require('compression')
const authStrategy = require('../auth')

module.exports = () => ({
  config (app) {
    const authentication = authStrategy(app)
    const clientPath = path.join(__dirname, '../client/dist')

    app.set('port', process.env.PORT || 7777)
    app.use(bodyParser.json())
    app.use(express.static(clientPath))
    app.use(cors())
    app.use(helmet())
    app.use(compression())
    app.use(morgan('dev'))
    app.use(authentication.initialize())

    app.auth = authentication
  }
})
