const AirWaybills = require('../src/tracking/airWaybills')
const Request = require('../src/lib/request')

describe('AirWaybills', () => {
    describe('constructor', () => {
      it('should throw an error when apiKey is missing', () => {
        expect(() => new AirWaybills()).toThrow('API Key is missing');
      });
  
      it('should create an AirWaybills instance with apiKey', () => {
        const apiKey = 'your-api-key';
        const airWaybills = new AirWaybills(apiKey);
        expect(airWaybills.apiKey).toBe(apiKey);
        expect(airWaybills.apiModule).toBe('');
      });
    });
  
    describe('createAnAirWayBill', () => {
      it('should throw an error when awb_number is missing', () => {
        const apiKey = 'your-api-key';
        const airWaybills = new AirWaybills(apiKey);
  
        expect(() => airWaybills.createAnAirWayBill({})).toThrow('Awb number cannot be empty');
      });

      it('should throw an error when awb_number is formatted incorrectly', () => {
        const apiKey = 'your-api-key';
        const airWaybills = new AirWaybills(apiKey);
  
        expect(() => airWaybills.createAnAirWayBill({awb_number: '123456'})).toThrow('The air waybill number format is invalid');
      });
  
      it('should send a POST request to /awb with awb_number', () => {
        const apiKey = 'your-api-key';
        const airWaybills = new AirWaybills(apiKey);
        const sendApiRequestMock = jest.spyOn(Request, 'sendApiRequest').mockReturnValue({});
  
        const params = { awb_number: '235-69030430' };
        airWaybills.createAnAirWayBill(params);
  
        expect(sendApiRequestMock).toHaveBeenCalledWith('/awb', apiKey, 'POST', params);
      });
    });
  });