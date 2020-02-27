const FtpConnector = require('./ftp.connector.js')
const HttpConnector = require('./http.connector.js')

module.exports = {
  http: HttpConnector,
  https: HttpConnector,
  ftp: FtpConnector,
  protocols: ['http', 'https', 'ftp']
}