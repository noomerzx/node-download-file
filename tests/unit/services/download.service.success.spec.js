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
      download: jest.fn().mockResolvedValue('\n')
    }),
    https: jest.fn(),
    ftp: jest.fn(),
    protocols: ['http', 'https', 'ftp']
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Test Download Service Success Cases', () => {
  it('Should initConnector() work properly', async () => {
    const service = new DownloadService('http://xxx.com/test.txt')
    expect(connectors['http']).toHaveBeenCalledTimes(1)
  })

  it('Should download() work properly)', async () => {
    const service = new DownloadService('http://xxx.com/test.txt')
    const result = await service.download('./download/')
    expect(result).toEqual(true)
  })
})