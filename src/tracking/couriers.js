const Request = require('../lib/request')

class Couriers {

    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('API Key is missing')
        }
        this.apiKey = apiKey
        this.apiModule = 'couriers'
    }

    getAllCouriers() {
        const apiPath =  "all"
        const response = Request.sendApiRequest(this.apiModule + '/' + apiPath, this.apiKey, "GET")
        return response
    }

    detect(params) {
        if (!params.tracking_number) {
            throw new Error('Tracking number cannot be empty')
        }
        const apiPath =  "detect"
        const response = Request.sendApiRequest(this.apiModule + '/' + apiPath, this.apiKey, "POST", params)
        return response
    }

}

module.exports = Couriers
