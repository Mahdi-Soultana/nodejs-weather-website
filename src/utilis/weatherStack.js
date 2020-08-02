const request = require("request");
const weatherStack = (longitude, altitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=148344f434109e4f9567f9470479cc7b&query=${altitude},${longitude}`;
    request({ url, json: true }, (err, res) => {
        if (err) {
            callback(" unabled your Connection to coonnect in the Service Weather !", undefined);
        }
        else if (res.body.error) {
            callback("unabled your location Try another Search!", undefined);
        } else {
           
            callback(undefined,`${res.body.current.weather_descriptions[0]} . The Tempreture Here Is ${res.body.current.temperature} dergree, But it's Fell Like ${res.body.current.feelslike} dergree . and The Humudity there Is ${res.body.current.humidity}% . `);
        }
    })

}


module.exports = weatherStack;