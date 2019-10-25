/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const fetchMyIP = function(callback) {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


function fetchCoordsByIP(ip, callback) {
  request(`https://ipvigilante.com/162.245.144.188`,(error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates: ${body}`), null);
      
    } else {
      let result = {};
      let coords = JSON.parse(body);
      result.latitude = coords.data['latitude'];
      result.longitude = coords.data['longitude'];
      callback(null, result);
    }
  });
}

module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };