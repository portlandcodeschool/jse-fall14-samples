var st = require('st');
var http = require('http');

var Router = require("routes-router");
var router = Router(); 

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
	POST: function(req,res,opts) { //incomplete; won't read request body
			console.log("posting...");
			console.log(JSON.stringify(opts));
			res.end("It's posted!");
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
  index:'/test1.html'
}));


var server = http.createServer(router);
console.log('server listening on port # 1337');
server.listen(1337);