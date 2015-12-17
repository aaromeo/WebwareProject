// Author: Josh Audibert

var express = require('express');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ 
  extended: false 
}));

var messages = [
  {
    message: "This is a test message",
    username: "Josh Audibert"
  }
];

app.get('/messages', function(req, res) {
  var message_template = _.template(
    "<div class='message'>" +
      "<p><strong><%= username %></strong>: <%= message %></p>" +
      // "<p><%= dislikes %></p>" +
      // "<div class='comments'><%= (function() { return comments.join('<br /><br />') })() %> </div>" +
    "<hr></div>"
  );

  str = ""
  messages.forEach(function(m, i) {
    str += message_template(m);
  })
  res.send(JSON.stringify(str));
});

app.post('/addMessage', function(req, res) {
  var message = {
    message: req.body.message,
    username: req.body.username
  };

  messages.unshift(message);

  res.end();
});


app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
