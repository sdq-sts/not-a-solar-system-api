const common = require('./common')
const mongoose = require('./mongoose')
const responses = require('./responses')

module.exports = { ...common, ...mongoose, ...responses }
