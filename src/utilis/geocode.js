
const request = require("request");
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=pk.eyJ1Ijoic291bHRhbmEiLCJhIjoiY2tkNGc5c2g5MGhjdDJwb2NlMno2bmN3NCJ9.GfS_wYQUoQlxi8_dn9n6lg&limit=1`

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback( "unabled your Connection to coonnect in the Service Weather !",undefined)
        } else if (res.body.features.length === 0) {
            callback( "unabled your location Try another Search!",undefined)

        } else {
            callback(undefined,{
                longitude: res.body.features[0].center[0],
                latitude: res.body.features[0].center[1],
                location:res.body.features[0].place_name
            })
        }
    })
}
module.exports=geocode;