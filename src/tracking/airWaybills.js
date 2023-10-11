const Request = require('../lib/request')

class AirWaybills {

    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('API Key is missing')
        }
        this.apiKey = apiKey
        this.apiModule = ''
    }

    createAnAirWayBill(params) {
        if (!params.awb_number) {
            throw new Error('Awb number cannot be empty')
        }
        if (params.awb_number.length != 12) {
            throw new Error('The air waybill number format is invalid and can only be 12 digits in length')
        }
        const apiPath =  'awb'
        const response = Request.sendApiRequest(this.apiModule + '/' + apiPath, this.apiKey, 'POST', params)
        return response
    }

}

module.exports = AirWaybills
