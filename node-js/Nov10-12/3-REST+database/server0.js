var st = require('st');
var http = require('http');

var Router = require("routes-router");
var router = Router(); 


// Route for static files:
router.addRoute("/*", st({
  path: __dirname + "/public",
  index:'/test1.html'
}));

var server = http.createServer(router);
console.log('server listening on port # 1337');
server.listen(1337);