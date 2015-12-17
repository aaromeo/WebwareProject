// Author: Josh Audibert

var colorCell = _.template(
	"<td style='background: rgb(<%= red %>, <%= green %>, <%= blue %>' />"
);

var colorRow = _.template(
	"<tr>" +
		"<%= tds %>" +
	"</tr>"
);

var colorGrid = _.template(
	"<table>" +
		"<caption>" + 
			"<%= title %>" +
		"</caption>" +
		"<tbody>" + 
			"<%= trs %>" +
		"</tbody>" +
	"</table>" +
	"<hr>"
);