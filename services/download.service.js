const connectors = require('./connectors')

class DownloadService {
  constructor (url) {
    this.url = url
    this.protocol = ''
    this.connector = this.initConnector(url)
  }

  initConnector(url) {
    for (let i = 0; i < connectors.protocols.length; i++) {
      let p = connectors.protocols[i]
      if (url.startsWith(p)) {
        this.protocol = p
        return new connectors[p](url)
      }
    }
    throw 'Not supported sources.'
  }

  async download(destination) {
    const timestamp = Date.now()
    const filename = `${this.protocol}-${timestamp}-${this.url.substring(this.url.lastIndexOf('/') + 1)}`
    await this.connector.download(`${destination}/${filename}`)
  }
}

module.exports = DownloadService