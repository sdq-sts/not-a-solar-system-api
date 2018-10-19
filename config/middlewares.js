const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const authStrategy = require('../auth')

module.exports = () => ({
  config (app) {
    const authentication = authStrategy(app)

    app.set('port', process.env.PORT || 7777)
    app.use(bodyParser.json())
    app.use(express.static('public'))
    app.use(helmet())
    app.use(cors())
    app.use(authentication.initialize())
    app.use(morgan('dev'))

    app.auth = authentication
  }
})
