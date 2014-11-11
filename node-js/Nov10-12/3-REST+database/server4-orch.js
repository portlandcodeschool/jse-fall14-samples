var st = require('st');
var http = require('http');

var Router = require("routes-router");
var router = Router(); 

// Body parsing:
var jsonBody = require('body/json');

// Database access:
// You need a config.js with your own database application key
var config = require('./config.js');
// instantiate the orchestrate class with your own key to create a private accessor:
var db = require('orchestrate')(config.dbKey);

var dbCollectionName = 'backbone-test'; // which db collection to use


function getValue(obj) { //helper function to extract values from Orchestrate responses
	return obj.value;
}


router.addRoute("/api", { //retrieve entire db collection
	GET:  function(req,res,opts) {
            console.log("getting...");
            console.log(JSON.stringify(opts));

			db.list(dbCollectionName)// promise...
        	.then(function(result){
        		console.log(result.body);
        		var values = result.body.results.map(getValue);
        		console.log(values);
            	res.end(JSON.stringify(values)); // send values as JSON
        	})
        	.fail(function(err){
	            //throw err;
            	console.log("error: "+err);
        	});
    },
	POST: function(req,res,opts) { // place a new model into db collection
            console.log("posting...");
            console.log(JSON.stringify(opts));
            // The model data is stored in request body; must wait for it...
			jsonBody(req,res, function saveBody(err,body) { //when body is ready...
                var key = String(body.value);
                console.log("Body:");
                console.log(body);
				db.put(dbCollectionName,key,body) //promise...
        		.then(function(result){
        			res.end('done!');
        		})
        		.fail(function(err){
	            	//throw err;
            		console.log("err: "+err);
            		res.end();
        		});

			});
	}
});


// The static route pattern (/*) includes /api, so it should be listed second
router.addRoute("/*", st({
  path: __dirname + "/public",
  index:'/test3.html'
}));


var server = http.createServer(router);
console.log('server listening on port # 1337');
server.listen(1337);