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

app.post('/whelm', function(req, res) {

  var whelms = parseInt(req.body.text);

  if(isNaN(whelms)){
    reply = "No whelms specified";
  }else{
    reply = createWhelms(whelms);
  }
  
  if(req.body.channel_name != "directmessage"){
    var options = {
      "channel": "#"+req.body.channel_name,
      "username": "Whelmometer",
      "text": reply,
      "icon_emoji": ":bar_chart:"
    };

    request.post({url: config.slack.baseURL + '/services/hooks/incoming-webhook?token=' + config.slack.token, body: JSON.stringify(options)}, function(err,response,body){});
  }
  res.send("");

});

app.post('/coinflip', function(req, res) {
  var sides = ['heads', 'tails'];
  var answer = sides[Math.round(Math.random() * 1)];
  
  if(req.body.channel_name != "directmessage"){
    var options = {
      "channel": "#"+req.body.channel_name,
      "username": "Coin Flip",
      "text": answer,
      "icon_emoji": ":"+answer+":"
    };

    request.post({url: config.slack.baseURL + '/services/hooks/incoming-webhook?token=' + config.slack.token, body: JSON.stringify(options)}, function(err,response,body){});
  }
  res.send("");

});

app.get('/', function(req, res) {
  var answer = answers[Math.floor(Math.random() * answers.length)];
  res.end(answer);
});

var server = app.listen(config.server.port, function() {
    console.log('Listening on port %d', server.address().port);
});

function createWhelms(whelms)
{
  var labels = ['Underwhelmed', '     Whelmed', ' Overwhelmed'];
  var meter = "```\n";

  for (var i = 8; i >= 0; i--) {
    var start = "            ";
    if(i == 8) {
      start = labels[2];
    }else if(i == 4){
      start = labels[1];
    }else if(i === 0){
      start = labels[0];
    }

    bar = (i < whelms)? "###" : "";

    meter = meter + start + " - " + bar + "\n";
  }
  meter = meter + "```";
  return meter;
}
