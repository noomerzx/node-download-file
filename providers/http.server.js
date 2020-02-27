const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const port = process.argv[2] || 9999

const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.doc': 'application/msword',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'application/x-font-ttf',
}

http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`)

  // parse URL
  const parsedUrl = url.parse(req.url)

  // extract URL path
  const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')
  let pathname = path.join(__dirname, sanitizePath)

  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404
      res.end(`File ${pathname} not found!`)
      return
    }

    // if is a directory, then look for index.html
    if (fs.statSync(pathname).isDirectory()) {
      res.statusCode = 500
      res.end(`Please specific file name and location.`)
    }

    // read file from file system
    // fs.readFile(pathname, function(err, data){
    //   if(err){
    //     res.statusCode = 500
    //     res.end(`Error getting the file: ${err}.`)
    //   } else {
    //     // based on the URL path, extract the file extention. e.g. .js, .doc, ...
    //     const ext = path.parse(pathname).ext
    //     // if the file is found, set Content-type and send data
    //     res.setHeader('Content-type', mimeType[ext] || 'text/plain' )
    //     res.end(data)
    //   }
    // })
    var readStream = fs.createReadStream(pathname)
    readStream.on('open', function () {
      // This just pipes the read stream to the response object (which goes to the client)
      readStream.pipe(res)
    })
  
    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function(err) {
      res.end(err)
    })
  })


}).listen(parseInt(port))

console.log(`Server listening on port ${port}`)