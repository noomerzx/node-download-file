const DownloadService = require('@/services/download.service.js')
const connectors = require('@/services/connectors')
const fs = require('fs')

jest.mock('fs', () => {
  return {
    unlinkSync: jest.fn().mockResolvedValue()
  }
})

jest.mock('@/services/connectors', () => {
  return {
    http: jest.fn().mockReturnValue({
      download: jest.fn().mockRejectedValue('\n')
    }),
    https: jest.fn(),
    ftp: jest.fn(),
    protocols: ['http', 'https', 'ftp']
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Test Download Service Failed Cases', () => {
  it('Should download() work properly when connector failed', async () => {
    const service = new DownloadService('http://xxx.com/test.txt')
    try {
      await service.download('./download/')
    } catch (e) {
      expect(fs.unlinkSync).toHaveBeenCalledTimes(1)
      expect(e).toEqual('Downloaded file are incomplete, The file already removed.')
    }
  })
})