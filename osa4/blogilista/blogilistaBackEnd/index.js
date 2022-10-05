const http = require('http')
const app = require('./app.js')

const server = http.createServer(app)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})