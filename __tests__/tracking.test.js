const Trackings = require('../src/tracking/trackings')
const Request = require('../src/lib/request')

describe('Trackings', () => {
    describe('constructor', () => {
      it('should throw an error when apiKey is missing', () => {
        expect(() => new Trackings()).toThrow('API Key is missing');
      });
  
      it('should create a Trackings instance with apiKey', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
        expect(trackings.apiKey).toBe(apiKey);
        expect(trackings.apiModule).toBe('trackings');
      });
    });
  
    describe('createTracking', () => {
      it('should throw an error when tracking_number is missing', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
  
        expect(() => trackings.createTracking({ tracking_number: '', courier_code: 'usps' })).toThrow('Tracking number cannot be empty');
      });
  
      it('should throw an error when courier_code is missing', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
  
        expect(() => trackings.createTracking({ tracking_number: '9400111899562537624646', courier_code: '' })).toThrow('Courier Code cannot be empty');
      });
  
      it('should send a POST request to /trackings/create with params', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
        const sendApiRequestMock = jest.spyOn(Request, 'sendApiRequest').mockReturnValue({});
  
        const params = { tracking_number: '9400111899562537624646', courier_code: 'usps' };
        trackings.createTracking(params);
  
        expect(sendApiRequestMock).toHaveBeenCalledWith('trackings/create', apiKey, 'POST', params);
      });
    });
  
    describe('getTrackingResults', () => {
        it('should send a GET request to /trackings/get with params', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
        const sendApiRequestMock = jest.spyOn(Request, 'sendApiRequest').mockReturnValue({});
    
        const params = { tracking_numbers: '9400111899562537624646' };
        const paramsValue = new URLSearchParams(params).toString()
        trackings.getTrackingResults(params);
    
        expect(sendApiRequestMock).toHaveBeenCalledWith('trackings/get?'+paramsValue, apiKey, 'GET');
        });
    });
    
    describe('batchCreateTrackings', () => {
        it('should throw an error when params length is greater than 40', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
    
        const params = Array.from({ length: 41 }, (_, i) => ({ tracking_number: `tracking-${i}`, courier_code: `courier-${i}` }));
    
        expect(() => trackings.batchCreateTrackings(params)).toThrow('Max. 40 tracking numbers create in one call');
        });

        it('should throw an error when tracking_number is missing', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
    
        const params = [{ tracking_number: '', courier_code: 'usps' }];
        expect(() => trackings.batchCreateTrackings(params)).toThrow('Tracking number cannot be empty');
        });

        it('should throw an error when courier_code is missing', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
    
        const params = [{ tracking_number: '9400111899562537624646', courier_code: '' }];
        expect(() => trackings.batchCreateTrackings(params)).toThrow('Courier Code cannot be empty');
        });
    
        it('should send a POST request to /trackings/batch with params', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
        const sendApiRequestMock = jest.spyOn(Request, 'sendApiRequest').mockReturnValue({});
    
        const params = [{ tracking_number: '9400111899562537624646', courier_code: 'usps' }];
        trackings.batchCreateTrackings(params);
    
        expect(sendApiRequestMock).toHaveBeenCalledWith('trackings/batch', apiKey, 'POST', params);
        });
    });
    
    describe('updateTrackingByID', () => {
        it('should throw an error when idString is missing', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
    
        expect(() => trackings.updateTrackingByID()).toThrow('Id cannot be empty');
        });
    
        it('should send a PUT request to /trackings/update/{idString} with params', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
        const sendApiRequestMock = jest.spyOn(Request, 'sendApiRequest').mockReturnValue({});
    
        const idString = 'your-id-string';
        const params = { /* your update params */ };
        trackings.updateTrackingByID(idString, params);
    
        expect(sendApiRequestMock).toHaveBeenCalledWith(`trackings/update/${idString}`, apiKey, 'PUT', params);
        });
    });
    
    describe('deleteTrackingByID', () => {
        it('should throw an error when idString is missing', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
    
        expect(() => trackings.deleteTrackingByID()).toThrow('Id cannot be empty');
        });
    
        it('should send a DELETE request to /trackings/delete/{idString}', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
        const sendApiRequestMock = jest.spyOn(Request, 'sendApiRequest').mockReturnValue({});
    
        const idString = 'your-id-string';
        trackings.deleteTrackingByID(idString);
    
        expect(sendApiRequestMock).toHaveBeenCalledWith(`trackings/delete/${idString}`, apiKey, 'DELETE');
        });
    });
  
    describe('retrackTrackingByID', () => {
        it('should throw an error when idString is missing', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
    
        expect(() => trackings.retrackTrackingByID()).toThrow('Id cannot be empty');
        });
    
        it('should send a POST request to /trackings/retrack/{idString}', () => {
        const apiKey = 'your-api-key';
        const trackings = new Trackings(apiKey);
        const sendApiRequestMock = jest.spyOn(Request, 'sendApiRequest').mockReturnValue({});
    
        const idString = 'your-id-string';
        trackings.retrackTrackingByID(idString);
    
        expect(sendApiRequestMock).toHaveBeenCalledWith(`trackings/retrack/${idString}`, apiKey, 'POST');
        });
    });
  });