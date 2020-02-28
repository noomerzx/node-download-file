const HttpConnector = require('@/services/connectors/http.connector.js')
const fs = require('fs')
const axios = require('axios')
jest.mock('fs', () => {
  return {
    createWriteStream: jest.fn().mockReturnValue({
      write: jest.fn(),
      end: jest.fn()
    })
  }
})
jest.mock('axios', () => {
  return jest.fn().mockResolvedValue({
    data: jest.fn().mockResolvedValue()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Test HTTP Connector', () => {
  it('Should init() class properly', async () => {
    const connector = new HttpConnector('http://xxx.com/test.txt')
    expect(connector.method).toEqual('GET')
    expect(connector.url).toEqual('http://xxx.com/test.txt')
  })

  // To be Modify  
  // it('Should download() work properly', async () => {
  //   const connector = new HttpConnector('http://xxx.com/test.txt')
  //   try {
  //     const run = connector.download('./download/test.txt')
  //     mockStream.emit('end')
  //     await run
  //     expect(axios).toHaveBeenCalledTimes(1)
  //     esxpect(fs.createWriteStream).toHaveBeenCalledTimes(1)
  //   } catch (e) {
  //     console.log(e)
  //     // expect(fs.createWriteStream).toHaveBeenCalledTimes(1)
  //   }
  // })
})
