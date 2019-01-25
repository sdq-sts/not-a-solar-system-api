const HttpStatus = require('http-status')
const { logger } = require('../config/logger')

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode
})

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => {
  logger.error(`${message}, status: ${statusCode}`)
  return defaultResponse({ error: message }, statusCode)
}

module.exports = {
  defaultResponse,
  errorResponse
}
