const ftp = require("basic-ftp")

class FtpConnector {
  constructor(url) {
    this.url = url.substring(0, url.lastIndexOf('/'))
    this.file = url.substring(url.lastIndexOf('/') + 1)
    this.client = client = new ftp.Client()
  }

  async download(destination) {
    await this.client.access({
      host: this.url
    })
    await client.downloadTo(destination, this.file)
    this.client.close()
  }
}

module.exports = FtpConnector
