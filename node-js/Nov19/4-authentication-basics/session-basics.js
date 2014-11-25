var http = require("http");
var sendHtml = require("send-data/html"); // for generating responses
// Make Response Templates:
var templates = require('./server-templates/compiled-templates');

// routing:
var Router = require("routes-router");
var router = Router();

// Session memory
var Session = require("generic-session"); // session factory
var store = Session.MemoryStore(); // memory-store instance shared by all sessions

// Data-watching:
var _ = require('underscore');
function showSession(session) {
  // display subset of session properties:
  console.log(_.pick(session,['options','store','expire','token','id']));
                    // excludes: 'cookies','request','response'
  //actual session data must be read through getter method:
  session.getAll(function(err,props) {
    console.log(props); // data from store belonging to session
  });
}

// Route for setting prop:
router.addRoute("/:prop/:val", function(req,res,opts) {
  var session = Session(req,res,store);
  var prop = opts.params.prop;
  var val =  opts.params.val;
  session.set(prop, val, function(err) {
    if (!err) {
      showSession(session);
      sendHtml(req,res, templates.simple({message:'Property '+prop+' is now '+val}) );
    }
  });
});

// Route for getting props:
router.addRoute("/:prop", function(req,res,opts) {
  var session = Session(req,res,store);
  var prop = opts.params.prop;
  session.get(prop, function(err,val) {
    if (!err) {
      showSession(session);
      sendHtml(req,res, templates.simple({message:'Property '+prop+' is '+val}) );
    }
  });
});



var server = http.createServer(router);
server.listen(3000);
console.log("example auth server listening on port 3000");
