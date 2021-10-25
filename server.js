// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
    const {date: dateTimeStamp} = req.params

    let result = {error : "Invalid Date"};
    let d;

      if (!dateTimeStamp.trim().length) {
        d = new Date();
        result = {
          unix: d.getTime(),
          utc: d.toUTCString()
        }
      } else if (dateTimeStamp.split("-").length >= 3) {
        d = new Date(dateTimeStamp);
        if(!isNaN(d)){
          result = {
            unix: d.getTime(),
            utc: d.toUTCString()
          }
        }
      } else {
        d = new Date(+dateTimeStamp)
        if(!isNaN(d)){
          result = {
            unix: d.getTime(),
            utc: d.toUTCString()
          }
        }
      }

    res.json(result)
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
