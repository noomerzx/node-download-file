const FtpConnector = require('@/services/connectors/ftp.connector.js')
const ftp = require('basic-ftp')
const fs = require('fs')

jest.mock('fs', () => {
  return {
    createWriteStream: jest.fn().mockReturnValue({
      write: jest.fn(),
      end: jest.fn()
    })
  }
})

jest.mock('basic-ftp', () => {
  return {
    Client: jest.fn().mockReturnValue({
      access: jest.fn().mockResolvedValue('Hello'),
      downloadTo: jest.fn().mockResolvedValue(),
      close: jest.fn()
    })
  }
})

const mockLog = jest.fn()
beforeEach(() => {
  console.log = mockLog
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Test FTP Connector', () => {
  it('Should init() class properly', async () => {
    const connector = new FtpConnector('ftp://xxx.com:21/folder/test.txt')
    expect(connector.url).toEqual('xxx.com')
    expect(connector.port).toEqual('21')
    expect(connector.fullPath).toEqual('/folder/test.txt')
    expect(connector.file).toEqual('test.txt')
  })

  it('Should download() work properly', async () => {
    const connector = new FtpConnector('ftp://xxx.com:21/folder/test.txt')
    const result = await connector.download('/download/ftp_1150_test.txt')
    expect(result).toEqual('\n')
  })
})
