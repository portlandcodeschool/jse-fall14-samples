var st = require('st');
var http = require('http');

var Router = require("routes-router");
var router = Router(); 

// The body module handles the async parsing of the data in a POST request:
var textBody = require('body');
//var jsonBody = require('body/json'); // include for json posting

// Create api routes:
router.addRoute("/api", {
	GET:  function(req,res,opts) {
			console.log("getting...");
			console.log(JSON.stringify(opts));
			res.end("Got it!");
	},
	PUT:  function(req,res,opts) {
			console.log("putting...");
			console.log(JSON.stringify(opts));
			res.end("It's put!");
	},
	POST: function(req,res,opts) {
			console.log("posting...");
			console.log(JSON.stringify(opts));
			textBody(req,res,function(err,body) {
			//jsonBody(req,res,function(err,body) { //Alternative: expects json body
				if (err) {
		            res.statusCode = 418;// override default 200
 		        	return res.end("Post failed!")
        		}
				console.log('body = '+ body);
				res.end("It's posted!");
			});
	},
	DELETE: function(req,res,opts) {
			console.log("deleting...");
			console.log(JSON.stringify(opts));
			res.end("It's deleted!");
	}
});


// The static route pattern (/*) includes /api, so it should be listed second
router.addRoute("/*", st({
  path: __dirname + "/public",
  //index:'/index.html'
  index:'/test2.html'
}));


var server = http.createServer(router);
console.log('server listening on port # 1337');
server.listen(1337);