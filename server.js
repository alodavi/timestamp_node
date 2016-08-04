var express = require('express');
var app = express();
var path = require('path');
var moment = require('moment');

var port = process.env.PORT || 8080; 

app.get('/', function (req, res) {
  var html = path.join(__dirname, 'index.html');
  res.sendFile(html, function(err){
        if (err){
            console.log(err);
        }
  });
});

app.get('/:query', function(req, res){
  var input = req.params.query;
  var unix;
  var natural;
  
  //CASE 1: input is unix
  if (input>0) {
    unix = input;
    natural = moment.unix(input).format("MMMM D, YYYY");
    res.json({
      'unix': unix,
      'natural': natural,
    });
  } 
  
  //CASE 2: input is natural
  else if (isNaN(input) && moment(input, "MMMM D, YYYY").isValid()) {
    unix = moment(input, "MMMM D, YYYY").format("X");
    natural = input;
  }
  
  //CASE 3: input is not valid
  else{
    unix = null;
    natural = null;
    res.json({
      'unix': unix,
      'natural': natural,
    });
  }
  
  
  
  }
  
);

app.listen(port, function () {
  console.log('Node app listening on port ' + port + '!');
});
