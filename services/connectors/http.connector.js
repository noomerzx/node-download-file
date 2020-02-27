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
    response.data.pipe(fs.createWriteStream(destination))
  }
}

module.exports = HttpConnector
