import http, { Server } from 'http'
import { app } from './app'

const server: Server = http.createServer(app)

const port: number = Number(process.env.PORT || 3000)

server.listen(port)
server.on('listening', async () => {
  // tslint:disable-next-line: no-console
  console.log(`Server started on port ${port}`)
})
