
var stringify = require('json-stringify-safe');
var _ = require('underscore'); // Optional
//var util = require('util');


var debug = {
	logRequest: function(req) {
		//console.log('Received request: '+ stringify(req,null,'\t'));
		console.log('Request received: ');
		//util.inspect(req);
		console.dir(_(req).pick('url','method','headers'));
		//console.log(_(req).pick('url','method','headers'));
		//console.log(JSON.stringify(req.url,null,'\t'));
	}, 
	logResponse: function(res, firstTime) {
		if (firstTime) {
			console.log('Sending reply: ');
			console.dir(_(res).pick('statusCode','_header','headersSent','domain','_hasBody'));
		}
		console.log('Bytes sent: '+ res.socket._bytesDispatched)
		//console.log(stringify(res.socket,null,'\t'));
	}
};

module.exports = debug;
