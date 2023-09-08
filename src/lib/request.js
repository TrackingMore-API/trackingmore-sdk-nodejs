const https = require('https')
const http = require('http')

class Request {
    constructor(apiKey) {
         this.apiBaseUrl = 'https://api.trackingmore.com'

         this.apiVersion = 'v4'

         this.timeout  = 10000
         
         this.apiKey = apiKey
    }

    getBaseUrl( path ) {
        return this.apiBaseUrl + '/' + this.apiVersion + '/' + path
    }

    getRequestHeader() {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Tracking-Api-Key': this.apiKey,
        }
    }

    static sendApiRequest(apiPath, apiKey, method, params = null) {
        return new Promise((resolve, reject) => {
        
            const instance = new Request(apiKey)
            const url = instance.getBaseUrl(apiPath)
            const parsedUrl = new URL(url)

            let headers = instance.getRequestHeader()
            let isHttps = parsedUrl.protocol === 'https:' ? true : false
            let client = isHttps ? https : http

            method = method.toUpperCase()

            let requestOptions = {
              hostname:parsedUrl.hostname,
              path: parsedUrl.pathname, 
              method: method,
              port: isHttps ? 443 : 80, 
              headers: headers,
              timeout: instance.timeout
            }

            const req = client.request(requestOptions, (res) => {
              let responseData = ''
        
              res.on('data', (chunk) => {
                responseData += chunk
              })
        
              res.on('end', () => {
                resolve(responseData)
              })
            })

            req.on('error', (error) => {
              reject(error)
            })

            if (params) {
              const requestData = JSON.stringify(params)
              req.setHeader('Content-Type', 'application/json')
              req.setHeader('Content-Length', Buffer.byteLength(requestData))
              req.write(requestData)
            }
        
            req.end()
          })
    }
}

module.exports = Request