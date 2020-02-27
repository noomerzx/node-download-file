const connectors = require('./connectors')
const { ERR_MSG } = require('../config/const.js')
const fs = require('fs')

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
    throw ERR_MSG.FILE_NOT_SUPPORTED
  }

  async download(destination) {
    const timestamp = Date.now()
    const filename = `${this.protocol}-${timestamp}-${this.url.substring(this.url.lastIndexOf('/') + 1)}`
    let success = false
    try {
      success = await this.connector.download(`${destination}/${filename}`)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      if (!success) {
        await fs.unlinkSync(filename)
      }
    }
  }
}

module.exports = DownloadService