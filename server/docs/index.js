const swaggerUi = require('swagger-ui-express')
const docs = require('./doc')

module.exports.swaggerDocs = () => {
  return [ swaggerUi.serve, swaggerUi.setup(docs) ]
}
