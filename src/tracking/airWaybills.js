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
        const apiPath =  "awb"
        const response = Request.sendApiRequest(this.apiModule + '/' + apiPath, this.apiKey, "POST", params)
        return response
    }

}

module.exports = AirWaybills
