const swaggerUi = require('swagger-ui-express')
const docs = require('./doc')

module.exports.swaggerDocs = [ swaggerUi.serve, swaggerUi.setup(docs) ]
