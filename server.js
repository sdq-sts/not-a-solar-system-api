const http = require('http')
const app = require('./app')
const port = app.get('port') || 3000

const server = http.createServer(app)

server.listen(port, async () => {
  await app.connectDatabase(app)
  log.info(`Server running on port:${port}`)
})
