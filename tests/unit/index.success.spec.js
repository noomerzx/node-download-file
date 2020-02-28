const program = require('@/index.js')
var DownloadServices = require('@/services/download.service.js')
jest.mock('@/services/download.service.js', () => {
  return jest.fn().mockReturnValue({
    download: jest.fn().mockResolvedValue()
  })
})
const mockLog = jest.fn()
beforeEach(() => {
  console.log = mockLog
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Test Main Program Success Cases', () => {
  it('Should run as expected when sources exist (success)', async () => {
    process.argv = ['', 'http://xxx.com']
    await program.main()
    expect(DownloadServices).toHaveBeenCalledTimes(1)
    expect(DownloadServices().download).toHaveBeenCalledTimes(1)
    expect(mockLog.mock.calls[0]).toEqual(['>>> Downloading from \"http://xxx.com\" ...'])
    expect(mockLog.mock.calls[1]).toEqual(['>>> Download Successfully !'])
  })
})
