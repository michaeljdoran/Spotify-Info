const express = require('express'); // Express web server framework
const request = require('request');
const cors = require('cors');

var app = express();

module.exports = function(app) {
  app.use(cors());

  app.post('/refresh/:token', (req, res) => {
    var refreshToken = req.params.token;
    var base_uri = 'http://localhost:4200'
    // var base_uri = 'http://www.mdsneakers.com'

    var options = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: 
      { 
        'cache-control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic YWU3MDMzZTFlYmRlNDJjNWEyZjY1YWZkODk0OWQwYzU6Mzk3OTE4OTI2OWI0NGEzNTgwMjNmMGRmZmY2NDI0Y2I=' },
        form: 
        { 
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          redirect_uri: base_uri + '/spotify/artists/'
        } 
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send({ body: JSON.parse(body) });
      });
    });

  app.post('/token/:module/:code', (req, res) => {
    var code = req.params.code;
    var base_uri = 'http://localhost:4200'
    //var base_uri = 'http://www.mdsneakers.com'

    var options = { 
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: 
      { 
        'cache-control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic YWU3MDMzZTFlYmRlNDJjNWEyZjY1YWZkODk0OWQwYzU6Mzk3OTE4OTI2OWI0NGEzNTgwMjNmMGRmZmY2NDI0Y2I=' },
        form: 
        { 
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: base_uri + '/spotify/artists/'
        } 
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send({ body: JSON.parse(body) });
      });
  });
}