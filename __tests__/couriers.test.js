const Couriers = require('../src/tracking/couriers')
const Request = require('../src/lib/request')

describe('Couriers', () => {
    describe('constructor', () => {
      it('should throw an error when apiKey is missing', () => {
        expect(() => new Couriers()).toThrow('API Key is missing')
      })
  
      it('should create a Couriers instance with apiKey', () => {
        const apiKey = 'your-api-key'
        const couriers = new Couriers(apiKey)
        expect(couriers.apiKey).toBe(apiKey)
        expect(couriers.apiModule).toBe('couriers')
      })
    })
  
    describe('getAllCouriers', () => {
      it('should send a GET request to /couriers/all', () => {
        const apiKey = 'your-api-key'
        const couriers = new Couriers(apiKey)
        const sendApiRequestMock = jest.spyOn(Request, 'sendApiRequest').mockReturnValue({})
  
        couriers.getAllCouriers()
  
        expect(sendApiRequestMock).toHaveBeenCalledWith('couriers/all', apiKey, 'GET')
      })
    })
  
    describe('detect', () => {
      it('should throw an error when tracking_number is missing', () => {
        const apiKey = 'your-api-key'
        const couriers = new Couriers(apiKey)
  
        expect(() => couriers.detect({})).toThrow('Tracking number cannot be empty')
      })
  
      it('should send a POST request to /couriers/detect with tracking_number', () => {
        const apiKey = 'your-api-key'
        const couriers = new Couriers(apiKey)
        const sendApiRequestMock = jest.spyOn(Request, 'sendApiRequest').mockReturnValue({})
  
        const params = { tracking_number: 'your-tracking-number' }
        couriers.detect(params)
  
        expect(sendApiRequestMock).toHaveBeenCalledWith('couriers/detect', apiKey, 'POST', params)
      })
    })
  })