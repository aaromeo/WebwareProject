
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
    date: "Dec31",
    activity: 'Highland Trip',
    formattedDate: 'December 18th, 2015',
    description: '(Insert Event Description)',
    proposer: '(Your Name Here)',
    likes: 0,
    dislikes: 0,
    comments: []
  },
  {
    date: "Mar3",
    activity: 'Chiang Mai!',
    formattedDate: 'March 3rd, 2016',
    description: '(Insert Event Description)',
    proposer: '(Your Name Here)',
    likes: 0,
    dislikes: 0,
    comments: []
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
      "<p><input id='like<%= index %>' type='button' name='new' value='Upvote' onclick='addLike(<%= index %>);'> (<%= likes %>)</p>" +
      "<p><input id='dislike<%= index %>'type='button' name='new1' value='Downvote' onclick='addDislike(<%= index %>);'> (<%= dislikes %>)</p>" +
    "</div>");
  events.forEach( function(p, i) {
    p['index'] = i;
    str += compiled(p);
  });

  res.end( str );
});

app.post('/incrementLikes', function(req, res){
  events[req.body.id]['likes']= events[req.body.id]['likes'] + 1;
});

app.post('/decrementLikes', function(req, res){
  events[req.body.id]['dislikes']= events[req.body.id]['dislikes'] + 1;
});

app.get('/event/:id', function (req, res) {
  var id = req.params.id;
  var str = "";
  var compiled = _.template(
    "<div id='eventpage'>" +
      "<div id='back'>" +
        "<button type='button' onclick=\"makeGet('/events');\">Back to Events</button>   " +
      "</div>" +
      "<div id='title'>" +
        "<%= activity %>" +
      "</div>" +
      "<hr>" +
      "<div id='eventcontent'>" +
        "<p>Date: <%= formattedDate %></p>" +
        "<p>Description: <%= description %></p>" +
        "<p>Proposed By: <%= proposer %></p>" +
        "<p><input id='like<%= index %>' type='button' name='new' value='Upvote' onclick='addLike(<%= index %>);'> (<%= likes %>)</p>" +
        "<p><input id='dislike<%= index %>'type='button' name='new1' value='Downvote' onclick='addDislike(<%= index %>);'> (<%= dislikes %>)</p>" +
      "</div>" +
      "<hr>" + 
      "<div id='comments'>" +
        "<h2>Comments</h2>" +
        "<div id='comments-holder'" +
        "</div>" +
        "</div id='comment-form'>" +
          "<form onsubmit='return false;'>" +
            "<input id='comment' type='text' name='comment' />" +
            "<button type='submit' onclick='addComment(<%= index %>);'>Send</button>" +
          "</form>" +
        "</div>" +
      "</div>" +
    "</div>");
  events[id]["index"] = id;
  str += compiled(events[id]);

  res.end( str );
});

app.post('/addComment', function (req, res) {
  var comment = {
    comment: req.body.comment,
    username: req.body.username
  };
  events[req.body.id]['comments'].push(comment);

  res.end();
});

app.get('/event/:id/comments', function (req, res) {
  var id = req.params.id;
  var str = "";
  var compiled = _.template(
    "<div class='comment'>" +
      "<p><strong><%= username %></strong>: <%= comment %></p>" +
    "<hr></div>");
  events[id]['comments'].forEach(function(comment, i) {
    str += compiled(comment);
  });

  res.end( str );
});

app.get('/getNewEvent', function (req, res) {
  var str = "";
  str += 
  "<div class='events'>"+
  "<h1 style='padding: 0 1em; text-align: center; font-size: 3em;'> New Post</h1>" +
  "<button type='button' onclick=\"makeGet('/events');\">Back to Events</button>   " +
  "<form onsubmit='return false;' style='font-size: 1.5em;'>" + 
    "<label for='eventname'>Event Name: </label>" +
    "<input id='eventname' type='text' name='eventname' style='font-size: 1em; width: 100%;'>" +
    "<br><br>" +
    "<label for='date'>Date: </label>"+
    "<input id='date' type='date' style='font-size: 1em; width: 100%;'></input>" +
    "<br><br>" +
    "<label for='description'>Description: </label>" +
    "<input id='description' type='text' name='Description' value='' style='font-size: 1em; width: 100%;'>" +
    "<br><br>" +
    "<input type='button' value='Add Event' onclick='addEvent();' style='font-size: 5em; width: 100%;' />" +
  "</form>"+
  "</div>";

  res.end( str );
});

app.post('/addEvent', function(req, res) {
  var newEvent = {
    activity: req.body.eventname,
    formattedDate: req.body.formattedDate,
    date: req.body.date,
    description: req.body.description,
    proposer: "Placeholder",
    comments: [],
    likes: 0,
    dislikes: 0
  };
  events.unshift(newEvent);
});

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/Final.html'));
});

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
