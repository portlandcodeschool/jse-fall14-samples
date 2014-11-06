// st is a module from npm that helps load static assets 
var st = require('st');

// "http" is a module from node.js, sometimes referred to as "node core"
// this just means that if you have node installed, you can require this 
// module without having to download 'http' specifically.
// "http" is a module that helps you write "clients" and "servers" that use
// the HTTP protocol
var http = require('http');

// "routes-router" is a module from npmjs.org that helps you make routes in 
// your server *much* more easily
var Router = require("routes-router");

// Router() returns a function that we will later pass to http.createServer
var router = Router(); 

// Index.html can be handled in the same route!
router.addRoute("/*", st({
  path: __dirname + "/public",
  index:'/index.html'
}));


// create a server, pass in our router function, store the server instance in a variable
var server = http.createServer(router);
console.log('server listening on port # 1337');
//tell the server to start listening on port # 1337
server.listen(1337);