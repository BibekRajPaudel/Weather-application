const request = require('request')

const forecast = (latitude, longitude, callback) => {

  const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude+ '&appid=e505abc33db376c14a3b54cd71263f3a'


 request({url, json: true}, (error, { body }) => {
  if (error) {
    callback('Unable to connect to weather service!', undefined)
  }  else if (body.message) {
    callback('Unable to find location', undefined)
  } else {

    callback( undefined, 'It is currently ' + body.main.temp + '  degrees out. There is ' + body.main.humidity +'%  chance of raining ')
  }
})
}
module.exports = forecast