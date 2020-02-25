const axios = require('axios')

class HttpConnector {
  constructor(url) {
    this.method = 'GET'
    this.url = url
  }

  download(destination) {
    axios({
      method: this.method,
      url: this.url,
      responseType: 'stream'
    }).then(function (response) {
      response.data.pipe(fs.createWriteStream(destination))
    })
  }
}

module.exports = HttpConnector
