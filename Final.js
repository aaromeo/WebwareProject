var http = require('http')
  , _ = require('underscore')
  , fs = require('fs')
  , url = require('url')
  , path = require('path')

var server = http.createServer( function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'Final.html')
      break
    case '/index.html':
      sendFile(res, 'Final.html')
      break
    case '/posts':
      sendPosts(req, res, 1);
      break;
    default:
      res.end('404 not found')
  }
})

var posts= [
	{
		activity: '(Event Name)',
		description: '(Insert Event Description)',
		proposer: '(Your Name Here)',
		likes: '(0)',
	}]

function sendPosts(req, res, pref) {
	var str = "";
	if(pref == 1){
    var compiled = _.template(
    "<div class='posts'>" +
      "<h2><%= activity %></h2>" +
      "<p>Description: <%= description %></p>" +
      "<p>Proposer: <%= proposer %></p>" +
      "<p>Likes: <%= likes %></p>" +
    "</div>");
    posts.forEach( function(p, i) {
      str += compiled(p);
    });
  }
  res.end( str );
}

function sendFile(res, filename) {
  res.writeHead(200, {'Content-type': 'text/html'})

  var stream = fs.createReadStream(filename)

  stream.on('data', function(data) {
    res.write(data);
  })

  stream.on('end', function(data) {
    res.end();
    return;
  })
}

server.listen(8080)
console.log("Server is listening on 8080")



