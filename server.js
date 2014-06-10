var express = require('express');
var request = require('request');
var config = require('./config');
var answers = require('./answers');
var app = express();

app.configure(function(){
  app.use(express.urlencoded());
});

app.post('/', function(req, res) {

  if(req.body.channel_name != "directmessage"){
    var answer = answers[Math.floor(Math.random() * answers.length)];

    var options = {
      "channel": "#"+req.body.channel_name,
      "username": "Magic 8 Ball",
      "text": answer,
      "icon_emoji": ":8ball:"
    };

    request.post({url: config.slack.baseURL + '/services/hooks/incoming-webhook?token=' + config.slack.token, body: JSON.stringify(options)}, function(err,response,body){});
    res.send("");
  }
});

app.get('/', function(req, res) {
  var answer = answers[Math.floor(Math.random() * answers.length)];
  res.end(answer);
});

var server = app.listen(config.server.port, function() {
    console.log('Listening on port %d', server.address().port);
});
