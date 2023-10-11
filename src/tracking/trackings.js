const Request = require('../lib/request')

class Trackings {

    constructor(apiKey) {
        if(!apiKey) {
            throw new Error('API Key is missing')
        }
        this.apiKey = apiKey
        this.apiModule = 'trackings'
    }

    createTracking(params) {
        if(!params.tracking_number) {
            throw new Error('Tracking number cannot be empty')
        }
        if(!params.courier_code) {
            throw new Error('Courier Code cannot be empty')
        }
        const apiPath =  'create'
        const response = Request.sendApiRequest(this.apiModule + '/' + apiPath, this.apiKey, 'POST', params)
        return response
    }

    getTrackingResults(params) {
        const paramsValue = new URLSearchParams(params).toString()
        const apiPath =  'get?' + paramsValue
        const response = Request.sendApiRequest(this.apiModule + '/' + apiPath, this.apiKey, 'GET')
        return response
    }

    batchCreateTrackings(params) {
        if(params.length > 40) {
            throw new Error('Max. 40 tracking numbers create in one call')
        }
        for(let i=0;i<params.length;i++){
           if(!params[i]['tracking_number']){
            throw new Error('Tracking number cannot be empty')
           }
           if(!params[i]['courier_code']){
            throw new Error('Courier Code cannot be empty')
           }
        }
        const apiPath =  'batch'
        const response = Request.sendApiRequest(this.apiModule + '/' + apiPath, this.apiKey, 'POST', params)
        return response
    }

    updateTrackingByID(idString, params) {
        if(!idString) {
            throw new Error('Id cannot be empty')
        }
        const apiPath =  'update/'+ idString
        const response = Request.sendApiRequest(this.apiModule + '/' + apiPath, this.apiKey, 'PUT', params)
        return response
    }

    deleteTrackingByID(idString) {
        if(!idString) {
            throw new Error('Id cannot be empty')
        }
        const apiPath =  'delete/'+ idString
        const response = Request.sendApiRequest(this.apiModule + '/' + apiPath, this.apiKey, 'DELETE')
        return response
    }

    retrackTrackingByID(idString) {
        if(!idString) {
            throw new Error('Id cannot be empty')
        }
        const apiPath =  'retrack/'+ idString
        const response = Request.sendApiRequest(this.apiModule + '/' + apiPath, this.apiKey, 'POST')
        return response
    }

}

module.exports = Trackings
