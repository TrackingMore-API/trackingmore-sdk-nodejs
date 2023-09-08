Trackingmore-sdk-nodejs
=================

node.js SDK for Trackingmore API

Contact: <manage@trackingmore.org>

## Official document

[Document](https://www.trackingmore.com/docs/trackingmore/d5ac362fc3cda-api-quick-start)

## Index
1. [Installation](https://github.com/TrackingMores/trackingmore-sdk-nodejs#installation)
2. [Testing](https://github.com/TrackingMores/trackingmore-sdk-nodejs#testing)
3. SDK
    1. [Couriers](https://github.com/TrackingMores/trackingmore-sdk-nodejs#couriers)
    2. [Trackings](https://github.com/TrackingMores/trackingmore-sdk-nodejs#trackings)
    3. [Air Waybill](https://github.com/TrackingMores/trackingmore-sdk-nodejs#air-waybill)

    
## Installation
```
npm install trackingmore-sdk-nodejs
```

## Quick Start

```javascript
const TrackingMore = require('trackingmore-sdk-nodejs')
const key = 'you api key'
const trackingmore = new TrackingMore(key)
try {
    // Get all couriers (couriers/all)
    trackingmore.couriers.getAllCouriers()
        .then(result => console.log(result))
        .catch(e => console.log(e))
} catch (error) {
    console.error('An error occurred:', error.message)
}
```

## Test
```
npm run test or npm test
```

## Error handling

Simply add a try-catch block

```javascript
try {
    // Get all couriers (couriers/all)
    trackingmore.couriers.getAllCouriers()
        .then(result => console.log(result))
        .catch(e => console.log(e))
} catch (error) {
    console.error('An error occurred:', error.message)
}

```

## Couriers
##### Return a list of all supported couriers.
https://api.trackingmore.com/v4/couriers/all
```javascript
const key = 'you api key'
const trackingmore = new TrackingMore(key)
 // Get all couriers (couriers/all)
trackingmore.couriers.getAllCouriers()
    .then(result => console.log(result))
    .catch(e => console.log(e))
```

##### Return a list of matched couriers based on submitted tracking number.
https://api.trackingmore.com/v4/couriers/detect
```javascript
const key = 'you api key'
const trackingmore = new TrackingMore(key)
// Detect courier (couriers/detect)
const params = {'tracking_number': '9400111899562537624326'}
trackingmore.couriers.detect(params)
    .then(result => console.log(result))
    .catch(e => console.log(e))
```

## Trackings
##### Create a tracking.
https://api.trackingmore.com/v4/trackings/create
```javascript
const key = 'you api key'
const trackingmore = new TrackingMore(key)
// Create a Tracking (trackings/create)
const params = {
    'tracking_number': '9400111899562537624326',
    'courier_code': 'usps',
    'order_number': '',
    'customer_name': '',
    'title': '',
    'language': 'en',
    'note': 'test Order'
}
trackingmore.trackings.createTracking(params)
    .then(result => console.log(result))
    .catch(e => console.log(e))
```

##### Get tracking results of multiple trackings.
https://api.trackingmore.com/v4/trackings/get
```javascript
const key = 'you api key'
const trackingmore = new TrackingMore(key)

// Get results (trackings/get)
// Perform queries based on various conditions
// const params = {
//     'tracking_numbers': '9400111899562537624656',
//     'courier_code': 'usps',
// }
// const params = {
//     'tracking_numbers': '9400111899562539126562,9400111899562537624656',
//     'courier_code': 'usps',
// }
const params = {
    'created_date_min': '2023-08-23T06:00:00+00:00',
    'created_date_max': '2023-09-05T07:20:42+00:00',
}
trackingmore.trackings.getTrackingResults(params)
    .then(result => console.log(result))
    .catch(e => console.log(e))
```

##### Create multiple trackings (Max. 40 tracking numbers create in one call).
https://api.trackingmore.com/v4/trackings/batch
```javascript
const key = 'you api key'
const trackingmore = new TrackingMore(key)
// Create trackings (trackings/batch)
const params = [{
    'tracking_number': '9400111899562537680047',
    'courier_code':'usps'
},{
    'tracking_number': '9400111899562537680048',
    'courier_code':'usps'
}]
trackingmore.trackings.batchCreateTrackings(params)
.then(result => console.log(result))
.catch(e => console.log(e))
```

##### Update a tracking by ID.
https://api.trackingmore.com/v4/trackings/update/{id}
```javascript
const key = 'you api key'
const trackingmore = new TrackingMore(key)
// Update a Tracking by ID (trackings/update)
const params = {
    'customer_name': 'New name',
    'note':'New test order note'
}
const idString = "9a135b15b5d983e1d8950d99022db0c7"
trackingmore.trackings.updateTrackingByID(idString, params)
.then(result => console.log(result))
.catch(e => console.log(e))
```

##### Delete a tracking by ID.
https://api.trackingmore.com/v4/trackings/delete/{id}
```javascript
const key = 'you api key'
const trackingmore = new TrackingMore(key)
// Delete Tracking by ID (trackings/delete)
const idString = "9a135b15b5d983e1d8950d99022db0c7"
trackingmore.trackings.deleteTrackingByID(idString)
.then(result => console.log(result))
.catch(e => console.log(e))
```

##### Retrack expired tracking by ID.
https://api.trackingmore.com/v4/trackings/retrack/{id}
```javascript
const key = 'you api key'
const trackingmore = new TrackingMore(key)
// Retrack expired Tracking by ID (trackings/retrack)
const idString = "99f4ed7fc73aa83fe68fd69ab6458b28"
trackingmore.trackings.retrackTrackingByID(idString)
.then(result => console.log(result))
.catch(e => console.log(e))
```
## Air Waybill
##### Create an air waybill.
https://api.trackingmore.com/v4/awb
```javascript
const key = 'you api key'
const trackingmore = new TrackingMore(key)
// Create an air waybill (awb)
const params = {
    'awb_number': '235-69030430',
}
trackingmore.airWaybills.createAnAirWayBill(params)
.then(result => console.log(result))
.catch(e => console.log(e))
```

## Response Code

Trackingmore uses conventional HTTP response codes to indicate success or failure of an API request. In general, codes in the 2xx range indicate success, codes in the 4xx range indicate an error that resulted from the provided information (e.g. a required parameter was missing, a charge failed, etc.), and codes in the 5xx range indicate an TrackingMore's server error.


Http CODE|META CODE|TYPE | MESSAGE
----|-----|--------------|-------------------------------
200    |200     | <code>Success</code>        |    Request response is successful
400    |400     | <code>BadRequest</code>     |    Request type error. Please check the API documentation for the request type of this API.
400    |4101    | <code>BadRequest</code>     |    Tracking No. already exists.
400    |4102    | <code>BadRequest</code>     |    Tracking No. no exists. Please use 「Create a tracking」 API first to create shipment.
400    |4103    | <code>BadRequest</code>     |    You have exceeded the shipment quantity of API call. The maximum quantity is 40 shipments per call.
400    |4110    | <code>BadRequest</code>     |    The value of tracking_number is invalid.
400    |4111    | <code>BadRequest</code>     |    Tracking_number is required.
400    |4112    | <code>BadRequest</code>     |    Invalid Tracking ID.
400    |4113    | <code>BadRequest</code>     |    Retrack is not allowed. You can only retrack an expired tracking.
400    |4120    | <code>BadRequest</code>     |    The value of courier_code is invalid.
400    |4121    | <code>BadRequest</code>     |    Cannot detect courier.
400    |4122    | <code>BadRequest</code>     |    Missing or invalid value of the special required fields for this courier.
400    |4130    | <code>BadRequest</code>     |    The format of Field name is invalid.
400    |4160    | <code>BadRequest</code>     |    The awb_number is required or invaild format.
400    |4161    | <code>BadRequest</code>     |    The awb airline does not support yet.
400    |4190    | <code>BadRequest</code>     |    You are reaching the maximum quota limitation, please upgrade your current plan.
401    |401     | <code>Unauthorized</code>   |    Authentication failed or has no permission. Please check and ensure your API Key is correct.
403    |403     | <code>Forbidden</code>      |    Access prohibited. The request has been refused or access is not allowed.
404    |404     | <code>NotFound</code>       |    Page does not exist. Please check and ensure your link is correct.
429    |429     | <code>TooManyRequests</code>|    Exceeded API request limits, please try again later. Please check the API documentation for the limit of this API.
500    |511     | <code>ServerError</code>    |    Server error. Please contact us: service@trackingmore.org.
500    |512     | <code>ServerError</code>    |    Server error. Please contact us: service@trackingmore.org.
500    |513     | <code>ServerError</code>    |    Server error. Please contact us: service@trackingmore.org.