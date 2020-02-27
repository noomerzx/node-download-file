const axios = require('axios')
const fs = require('fs')

class HttpConnector {
  constructor(source) {
    this.method = 'GET'
    this.url = source
  }

  async download(destination) {
    const responseStream = await axios({
      method: this.method,
      url: this.url,
      responseType: 'stream'
    })
    const writer = fs.createWriteStream(destination)
    return new Promise((resolve) => {
      let lastChunk = 'x'
      responseStream.data.on('data', (chunk) => {
        writer.write(chunk)
        lastChunk = chunk
      })
      responseStream.data.on('end', () => {
        writer.end()
        const data = lastChunk.toString()
        const result = data[data.length - 1]
        resolve(result)
      })
    })
  }
}

module.exports = HttpConnector
