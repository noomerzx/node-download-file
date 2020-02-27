const ftp = require("basic-ftp")
const urlLib = require('url')
const fs = require('fs')

class FtpConnector {
  constructor(source) {
    const url = urlLib.parse(source)
    this.url = url.hostname
    this.port = url.port
    this.fullPath = url.pathname
    this.file = source.substring(source.lastIndexOf('/') + 1)
    this.client = new ftp.Client()
  }

  async download(destination) {
    const greeting = await this.client.access({
      host: this.url,
      port: this.port
    })
    console.log(`>>> Greeting from FTP: ${greeting.message}`)
    return new Promise(async (resolve, reject) => {
      const writer = fs.createWriteStream(destination)
      try {
        await this.client.downloadTo(writer, this.fullPath)
        this.client.close()
        resolve('\n')
      } catch (err) {
        reject()
      }
    })
  }
}

module.exports = FtpConnector
