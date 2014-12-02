// Experimental; under construction!

var http = require("http"); // essential
var Router = require("routes-router"); // essential
var router = Router();
var querystring = require('querystring');

router.addRoute("/hello/:name", function (req,res,opts) {
    var name = opts.params.name;
    res.end("hello, "+name+"!")
})

router.addRoute("/*", function (req,res,opts) {
    console.log(opts);
    var queryObj = querystring.decode(opts.parsedUrl.query);
    console.log(queryObj);
    res.end("query is "+ JSON.stringify(queryObj));
});

var server = http.createServer(router);
server.listen(3000);
console.log("example auth server listening on port 3000");
