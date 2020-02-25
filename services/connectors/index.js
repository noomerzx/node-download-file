const FtpConnector = require('./ftp.connector.js.js')
const HttpConnector = require('./http.connector.js.js')

module.exports = {
  http: HttpConnector,
  https: HttpConnector,
  ftp: FtpConnector,
  protocols: ['http', 'https', 'ftp']
}