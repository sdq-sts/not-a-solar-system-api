const http = require('http')

const app = require('./app')
const port = app.get('port')

const server = http.createServer(app)

server.listen(port, () => {
  app.logger.info(`Server running on port:${port}`)
})
