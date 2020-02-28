const generatorModule = require('@/utils/generate.file.js')
const fs = require('fs')

process.argv[1] = ''

jest.mock('fs', () => {
  return {
    createWriteStream: jest.fn().mockReturnValue({
      write: jest.fn(),
      end: jest.fn()
    })
  }
})

describe('Generate File Utils Tests', () => {
  it('Should run as expected', () => {
    generatorModule.writeFile()
    expect(fs.createWriteStream).toHaveBeenCalledTimes(1)
    expect(fs.createWriteStream().write).toHaveBeenCalledTimes(1e6 + 1)
    expect(fs.createWriteStream().end).toHaveBeenCalledTimes(1)
  })
})
