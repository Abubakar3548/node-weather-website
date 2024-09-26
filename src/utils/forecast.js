
// Goal: Create a reusable function for getting the forecast
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(1.576,110.404, (error, data) => {
//    console.log('Error', error)
//    console.log('Data', data)
// })

    const request = require('request');
    const forecast= (latitude, longitude, callback) => {
    const urls ='http://api.weatherstack.com/current?access_key=2f474f7c29fcc50edd98656177899ac8&query=' + latitude + ',' + longitude + '&units=f'  

    request({url: urls, json: true}, (error, {body})=>{
     if(error){
        callback('Unable to get connection', undefined)
     }else if(body.error){
     callback('Unable to find location. Try another Search', undefined)
     } else{
        callback(undefined, body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.feelslike + '% chance of rain')
     }
    })

}

module.exports = forecast 