const HttpConnector = require('@/services/connectors/ftp.connector.js')
const ftp = require('basic-ftp')

jest.mock('basic-ftp', () => {
  return {
    Client: jest.fn().mockReturnValue()
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Test FTP Connector', () => {
  it('Should init() class properly', async () => {
    const connector = new HttpConnector('http://xxx.com/test.txt')
    expect(connector.method).toEqual('GET')
    expect(connector.url).toEqual('http://xxx.com/test.txt')
  })
})
