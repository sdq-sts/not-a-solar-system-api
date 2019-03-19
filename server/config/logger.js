const fs = require('fs')
const path = require('path')
const { createLogger, format, transports } = require('winston')

const logsPath = path.join(__dirname, '../logs/')

if (!fs.existsSync(logsPath)) {
  fs.mkdirSync(logsPath)
}

const options = {
  console: {
    format: format.combine(
      format.colorize(),
      format.simple()
    ),
    handleExceptions: true,
    json: false,
    level: 'info'
  },
  errorFile: {
    filename: path.join(logsPath, 'error.log'),
    format: format.printf((info) => `${new Date().toISOString()}, ${info.message}`),
    handleExceptions: true,
    json: true,
    level: 'error',
    maxFiles: 5,
    maxsize: 1024 * 1024 * 5 // 5MB
  }
}

const logger = createLogger({
  exitOnError: false,
  level: 'info',
  transports: [
    new transports.Console(options.console),
    new transports.File(options.errorFile)
  ]
})

global.log = logger

module.exports = { logger }
