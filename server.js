// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var myApp= require('./myApp.js');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.route("/api/timestamp/:date_string").get(function(req,res){
    let parsedDate = isNaN(req.params.date_string)?new Date(req.params.date_string):parseInt(req.params.date_string);
  console.log(Number.isInteger(parsedDate));
    let date={}; 
    if(parsedDate=='Invalid Date') date={error:'Invalid Date'};
    else date= !Number.isInteger(parsedDate)?{unix:parsedDate.getTime(),utc:parsedDate.toUTCString()}:{unix:parsedDate,utc:new Date(parsedDate).toUTCString()}
    res.json(date);
});
app.route("/api/timestamp").get(function(req,res){

  let date = new Date();
  res.json({unix:date.getTime(),utc:date.toUTCString()})
  
  
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});