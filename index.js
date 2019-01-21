const http = require('http')

const app = require('./app')
const port = app.get('port')

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
