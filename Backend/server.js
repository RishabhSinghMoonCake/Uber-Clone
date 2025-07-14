import http from 'http'
import app from './app.js'
const PORT = process.env.PORT || 5001

const server = http.createServer(app)

server.listen(PORT, ()=>{
  console.log('Server has started at port ' + PORT)
})