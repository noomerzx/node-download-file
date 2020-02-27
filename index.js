const DownloadServices = require('./services/download.service.js')
const config = require('./config')

const main = async () => {
  const sources = process.argv
  sources.splice(0, 2)
  const error = []
  for (let i = 0; i < sources.length; i++) {
    try {
      const downloadService = new DownloadServices(sources[i])
      await downloadService.download(config.destination)
      console.log(`>>> Download Success, source = "${sources[i]}".`)
    } catch (err) {
      console.log(`>>> Download Failed, source = "${sources[i]}".`)
      console.log(`>>> Error: ${err}`)
    }
  }
}

main()