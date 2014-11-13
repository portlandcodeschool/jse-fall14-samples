var st = require('st');
var http = require('http');
var Router = require("routes-router");
var router = Router(); 

// Database access:
var config = require('./config.js');
var db = require('orchestrate')(config.dbKey);
var dbCollectionName = 'memory-simple';

// Display:
//var stringify = require('json-stringify-safe');

// Body Parsing:
var jsonBody = require('body/json');


function saveModel(err,body,res,id) {
    if (id === undefined) { //first post; add unique id to body
        id = String(body.loc);
        console.log("posting new id "+id);
        body.id = id;
    } else {
        console.log("updating id "+id);
    }

    db.put(dbCollectionName,id,body)
    .then(function(result){
        res.end(JSON.stringify({id:id})); //always reply to success with id object
    })
    .fail(function(err){
        //throw err;
        console.log('failed to put id: '+id);
        console.log(err);
        res.end();
    });

}

// MAKE ROUTES!

// Database interactions:
router.addRoute("/api/:id", {
	GET:  function(req,res,opts) { // get one model
            var id = opts.params.id;
            console.log("getting id "+ id);
			db.get(dbCollectionName,String(id))
        	.then(function(result){
            	res.end(stringify(result.body));
        	})
        	.fail(function(err){
	            //throw err;
            	console.log("error getting id: "+id);
                console.log(error);
        	});
	},
	PUT:  function(req,res,opts) { //update one model
        jsonBody(req,res,function(err,body) {
            saveModel(err,body,res,opts.params.id); //use id from route
        });
	}
});


router.addRoute("/api", {
	GET:  function(req,res,opts) { // get entire collection
            function getValue(obj) { return obj.value; }

            console.log('get all...')
			db.list(dbCollectionName,{limit:100})
        	.then(function(result){
        		var values = result.body.results.map(getValue);
            	res.end(JSON.stringify(values));
        	})
        	.fail(function(err){
	            //throw err;
            	console.log("error listing collection: "+err);
        	});
    },
	POST: function(req,res,opts) { // post a new model
			jsonBody(req,res,function(err,body) {
                saveModel(err,body,res);  //no id, will generate one
            });
	}
});


// Static site route:
router.addRoute("/*", st({
  path: __dirname + "/public",
  index:'/memory-simple.html'
  //index:'/index.html'
}));

var server = http.createServer(router);
console.log('server listening on port # 1337');
server.listen(1337);
