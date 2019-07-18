const express = require('express'); // Express web server framework
const request = require('request');
const cors = require('cors');

var app = express();

module.exports = function(app) {
  app.use(cors());

  app.post('/token/:module/:code', (req, res) => {
    // var client_id = 'ae7033e1ebde42c5a2f65afd8949d0c5'; // Your client id
    // var client_secret = '3979189269b44a358023f0dfff6424cb'; // Your secret
    // // var redirect_uri = 'http%3A%2F%2Flocalhost%3A4200%2F'; // Your redirect uri
    var code = req.params.code;
    var module = req.params.module;
    var redirectURI = module == "artists" ? "http://localhost:4200/artists/" : "http://localhost:4200/";

    var options = { 
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: 
      { 
        'cache-control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic YWU3MDMzZTFlYmRlNDJjNWEyZjY1YWZkODk0OWQwYzU6Mzk3OTE4OTI2OWI0NGEzNTgwMjNmMGRmZmY2NDI0Y2I=' },
        form: 
        { grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectURI,
          undefined: undefined 
        } 
      };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send({ body: JSON.parse(body) });
    });
  });
}