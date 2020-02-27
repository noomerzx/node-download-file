const DownloadServices = require('./services/download.service.js')
const config = require('./config')

const main = async () => {
  const sources = process.argv
  sources.splice(0, 2)
  for (let i = 0; i < sources.length; i++) {
    try {
      const downloadService = new DownloadServices(sources[i])
      console.log(`>>> Downloading from "${sources[i]}" ...`)
      await downloadService.download(config.destination)
      console.log(`>>> Download Successfully !`)
    } catch (err) {
      console.log(`>>> Download Failed, source = "${sources[i]}".`)
      console.log(`>>> Error: ${err}`)
    }
  }
}

main()
