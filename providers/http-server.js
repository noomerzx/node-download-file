const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
  const stream = fs.createReadStream('./providers/files/doublebig.file')
  stream.pipe(res)
})

// server.on('request', (req, res) => {
//   fs.readFile('./providers/files/doublebig.file', (err, data) => {
//     if (err) throw err;
//     res.end(data)
//   })
// })

server.listen(8001)