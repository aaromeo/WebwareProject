var http = require('http')
  , express = require('express')
  , _ = require('underscore')
  , fs = require('fs')
  , url = require('url')
  , path = require('path')
  , bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ 
  extended: false 
}));

var events = [
  {
    date: "Dec18",
    activity: 'Highland Trip',
    formattedDate: 'December 18th, 2015',
    description: '(Insert Event Description)',
    proposer: '(Your Name Here)',
    likes: 0,
  },
  {
    date: "Mar3",
    activity: 'Chiang Mai!',
    formattedDate: 'March 3rd, 2016',
    description: '(Insert Event Description)',
    proposer: '(Your Name Here)',
    likes: 0,
  }]

app.get('/events', function (req, res) {
  var str = "";
  var compiled = _.template(
    "<div class='events'>" +
      "<div hidden>Q<%= date %>Q</div>" +
      "<h2><a id='<%= index %>' href='#' onclick='getEvent(<%= index %>);return false;'><%= activity %></a></h2>" +
      "<p>Date: <%= formattedDate %></p>" +
      "<p>Description: <%= description %></p>" +
      "<p>Proposed By: <%= proposer %></p>" +
      "<p>Likes: <%= likes %></p>" +
    "</div>");
  events.forEach( function(p, i) {
    p['index'] = i;
    str += compiled(p);
  });

  console.log(events);

  res.end( str );
});

app.get('/event/:id', function (req, res) {
  var id = req.params.id;
  var str = "";
  var compiled = _.template(
    "<div id='eventpage'>" +
      "<div id='title'>" +
        "<button type='button' onclick=\"makeGet('/events');\">Back to Events</button>   " +
        "<%= activity %>" +
      "</div>" +
      "<hr>" +
      "<div id='eventcontent'>" +
        "<p>Date: <%= formattedDate %></p>" +
        "<p>Description: <%= description %></p>" +
        "<p>Proposed By: <%= proposer %></p>" +
        "<p>Likes: <%= likes %></p>" +
      "</div>" +
      "<hr>" + 
      "<div id='comments'>" +
        "<h2>Comments</h2>" +
        "<div id='comment-holder'>" +
        "</div>" +
        // add label and input here
      "</div>" +
    "</div>");
  events[id]["index"] = id;
  str += compiled(events[id]);
  console.log(str);

  res.end( str );
});

app.get('/getNewEvent', function (req, res) {
  var str = "";
  str += 
  "<h1> New Post</h1>" +
  "<form onsubmit='return false;'>" + 
    "<label for='eventname'>Event Name: </label>" +
    "<input id='eventname' type='text' name='eventname'>" +
    "<br>" +
    "<input id='date' type='date'></input>" +
    "<br>" +
    "<label for='description'>Description: </label>" +
    "<input id='description' type='text' name='Description' value=''>" +
    "<br><br>" +
    "<input type='button' value='Add Event' onclick='addEvent();' />" +
  "</form>";

  res.end( str );
});

app.post('/addEvent', function(req, res) {
  var newEvent = {
    activity: req.body.eventname,
    formattedDate: req.body.formattedDate,
    date: req.body.date,
    description: req.body.description,
    proposer: "Placeholder",
    likes: 0
  };
  events.unshift(newEvent);

});

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/Final.html'));
});

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
