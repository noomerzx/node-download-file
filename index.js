const DownloadServices = require('./services/download.service.js')

const main = async () => {
  const sources = process.argv
  for (let i = 0; i < sources.length; i++) {
    const downloadService = new DownloadServices(sources)
    console.log(downloadService)
  }
}

main()