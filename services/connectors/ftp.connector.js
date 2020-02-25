const ftp = require("basic-ftp")

class FtpConnector {
  constructor(url) {
    this.url = url
    this.client = client = new ftp.Client()
  }

  download() {
    client.access({
      host: this.url,
      secure: false
    })
  }
}

module.exports = FtpConnector
