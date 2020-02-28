const program = require('@/index.js')
var DownloadServices = require('@/services/download.service.js')

jest.mock('@/services/download.service.js', () => {
  return jest.fn().mockReturnValue({
    download: jest.fn().mockRejectedValue('error')
  })
})

const mockLog = jest.fn()

beforeEach(() => {
  console.log = mockLog
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Test Main Program Failed Cases', () => {
  it('Should run as expected when no sources', async () => {
    process.argv = ['']
    await program.main()
    expect(DownloadServices).toHaveBeenCalledTimes(0)
  })

  it('Should run as expected when sources invalid', async () => {
    process.argv = ['', 'source1']
    await program.main()
    expect(mockLog).toHaveBeenCalledTimes(3)
    expect(mockLog.mock.calls[0]).toEqual(['>>> Downloading from \"source1\" ...'])
    expect(mockLog.mock.calls[1]).toEqual(['>>> Download Failed, source = \"source1\".'])
    expect(mockLog.mock.calls[2]).toEqual(['>>> Error: error'])
  })
})
