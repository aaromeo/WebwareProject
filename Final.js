var http = require('http')
  , _ = require('underscore')
  , fs = require('fs')
  , url = require('url')
  , path = require('path')


// FAKEBOOK
var posts= [
  {
    activity: '(Event Name)',
    description: '(Insert Event Description)',
    proposer: '(Your Name Here)',
    likes: '(0)',
  },
  {
    activity: '(Event Name)',
    description: '(Insert Event Description)',
    proposer: '(Your Name Here)',
    likes: '(0)',
  }]

var server = http.createServer( function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'Final.html')
      break
    case '/index.html':
      sendFile(res, 'Final.html')
      break
    case '/postsPokemon':
      sendPosts(req, res, 1);
      break;
    case '/postsNewPost':
    	sendPosts(req, res, 2);
    default:
      res.end('404 not found')
  }
})







// (function(window, document, undefined) {

// 	function Month(name, header, weeks) {
// 		//Class for People
// 		this.name = name;
// 		this.header = header;
// 		this.weeks = weeks;
// 		return this;
	

// 	//allows the people and clubs to be created and accessed
// 	window.Month = Month;

// })(window, document);

//  var cal=[
//  	new Month("December", ["S","M","T","W","T","F","S"],
//  		[
//  		["","","1","2","3","4","5"],
//  		["6","7","8","9","10","11","12"],
//  		["13","14","15","16","17","18","19"],
//  		["20","21","22","23","24","25","26"],
//  		["27","28","29","30","31","",""]
//  		]),
//  	new Month("January",["S","M","T","W","T","F","S"],
//  		[["","","","","","1","2"],
//  		["3","4","5","6","7","8","9"],
//  		["10","11","12","13","14","15","16"],
//  		["17","18","19","20","21","22","23"],
//  		["24","25","26","27","28","29","30"],
//  		["31","","","","","",""]
//  		]),
//  	new Month("February", ["S","M","T","W","T","F","S"],
//  		[["","1","2","3","4","5","6"],
//  		["7","8","9","10","11","12","13"],
//  		["14","15","16","17","18","19","20"],
//  		["21","22","23","24","25","26","27"],
//  		["28","29","","","","",""]
//  		]),
//  	new Month ("March", ["S","M","T","W","T","F","S"],
//  		[["","","1","2","3","4","5"],
//  		["6","7","8","9","10","11","12"],
//  		["13","14","15","16","17","18","19"],
//  		["20","21","22","23","24","25","26"],
//  		["27","28","29","30","31","",""]
//  		])
//  ]

// function populateCalendar(calendar, eltClassName) {
// 	//takes a list and where the list should be stored and populates the list
// 	nodes=[];
// 	for(var month in calendar){
// 		var row = document.createElement("tr");
// 		var monthnode = document.createElement("th colspan='7'");//adding Month title
// 		row.appendChild(monthnode);
// 		var monthtextnode = document.createTextNode(calendar[month].name);//getting the 1st element of week which is month title
// 		monthnode.appendChild(monthtextnode);//adds them togeter
// 		var monthlocation = document.getElementsByClassName(eltClassName)[month];//picks the right table to populate it
// 		monthlocation.appendChild(node);
// 		nodes.push(node);
// 		for (var i in calendar[month].header){
// 			var node = document.createElement("th")
// 			var textnode = document.createTextNode(calendar[month][i]);
// 			node.appendChild(textnode);
// 			var location = document.getElementsByClassName(eltClassName)[month];
// 			location.appendChild(node);
// 			nodes.push(node);
// 		for (var week in calendar[month].weeks){
// 				var weeknode = document.createElement("tr");
// 				for (var day in week){
// 					var node = document.createElement("td")
// 					var textnode = document.createTextNode(calendar[month][week][day]);
// 					node.appendChild(textnode);
// 					var location = document.getElementsByClassName(eltClassName)[month];
// 					location.appendChild(node);
// 					nodes.push(node);
// 				}
// 			}
// 			var node = document.createElement("tr");
// 			var textnode = document.createTextNode(population[indivdual].name);
// 			node.appendChild(textnode);//makes the name a list element
// 			var ULnode = document.getElementsByClassName(eltClassName)[0];//finds where to add the list on HTML
// 			ULnode.appendChild(node);
// 			nodes.push(node);
// 		}
// 	}
// 	return nodes;
// }

// populateCalendar(cal, "table");











function sendPosts(req, res, pref) {

  var str = "";
  if(pref == 1){
    var compiled = _.template(
      "<div class='posts'>" +
      "<h2><%= activity %></h2>" +
      "<p>Description: <%= description %></p>" +
      "<p>Proposed By: <%= proposer %></p>" +
      "<p>Likes: <%= likes %></p>" +
      "</div>");
    posts.forEach( function(p, i) {
      str += compiled(p);
    });
  }
  if(pref == 2){
    str += 
    "<h1> New Post</h1>" +
    "<p>Event Name</p>" +
    "<input type='text' name='Event Name' value=''>" +
    "<br>" +
    "<p>Description</p>" +
    "<input type='text' name='Description' value=''>" +
    "<br><br>" +
    "<input type='submit' value='Insert'";
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
