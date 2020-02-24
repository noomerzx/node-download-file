const FtpSvr = require ( 'ftp-srv' )

const hostname = '127.0.0.1'
const port = 22
const options = {
  url: 'ftp://' + hostname + ':' + port,
  pasv_url: hostname,
  anonymous: true,
  greeting: 'Hi Welcome to FTP Server !!'
}

const ftpServer = new FtpSvr (options)

ftpServer.on ('login', ( data, resolve, reject ) => {
  resolve({root: './providers/files'})
})

ftpServer.on ('client-error', (connection, context, error) => {
  console.log('error')
})

ftpServer.listen().then(() => {
  console.log (`Server running at http://${hostname}:${port}/`)
})