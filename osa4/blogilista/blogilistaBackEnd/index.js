const http = require('http')
const config = require('./utils/config')
const app = require('./app.js')

const server = http.createServer(app)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})