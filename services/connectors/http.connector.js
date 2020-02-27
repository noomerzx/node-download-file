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
        return resolve(true)
      })
      downloadStream.on("error", (err) => {
        return reject(false)
      })
    })
  }
}

module.exports = HttpConnector
