const connectors = require('./connectors')

class DownloadService {
  constructor (url) {
    this.url = url
    this.connector = this.initConnector(url)
    this.protocol = ''
  }

  initConnector(url) {
    for (let i = 0; i < connectors.protocols.length; i++) {
      let p = connectors.protocols[i]
      if (url.startWith(p)) {
        this.protocol = p
        return connectors[p](url)
      }
    }
  }

  async download(destination) {
    const timestamp = Date.now()
    const filename = `${this.protocol}-${timestamp}-${this.url.substring(this.url.lastIndexOf('/') + 1)}`
    await this.connector.download(`${destination}/${filename}`)
  }
}

module.exports = DownloadService