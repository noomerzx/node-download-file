const axios = require('axios')
const fs = require('fs')

class HttpConnector {
  constructor(url) {
    this.method = 'GET'
    this.url = url
  }

  async download(destination) {
    const response = await axios({
      method: this.method,
      url: this.url,
      responseType: 'stream'
    })
    const downloadStream = fs.createWriteStream(destination)
    return new Promise((resolve, reject) => {
      response.data.pipe(downloadStream)
      downloadStream.on("close", () => {
        console.log('111')
        return resolve(true)
      })
      downloadStream.on("error", (err) => {
        console.log('222')
        // return reject(false)
      })
      downloadStream.on('unpipe', (src) => {
        console.log('333')
      })
    })
  }
}

module.exports = HttpConnector
