var http = require("http"); // essential
var st = require('st'); // essential
var Router = require("routes-router"); // essential
var pwd = require("pwd");
var redirect = require("redirecter");
var Session = require("generic-session");
var MemoryStore = require("generic-session").MemoryStore;
var sendHtml = require("send-data/html"); // essential, also bring in send-data/json
var formBody = require("body/form"); // essential
var config = require('./config');
var templates = require('./server-templates/compiled-templates');
var db = require('orchestrate')(config.dbKey); //essential

var store = MemoryStore();
var router = Router();

var _ = require('underscore');
function showSession(session) {
  console.log(_.pick(session,['options','store','expire','token','id']));
  // excludes: 'cookies','request','response'
  session.getAll(function(err,props) {
    console.log(props); // data from store belonging to session
  });
}

function createUser (user, password) {
  pwd.hash(password, function (err, salt, hash) {
    if (err) {
      throw err
    }
    user.salt = salt;
    user.hash = String(hash);

    db.put('users', user.name, user)
    .then(function (result) {
      console.log("success!")
    })
    .fail(function (err) {
      console.error(err);
    })
  })
}

//uncomment to create a user
//createUser({name: "steve"}, "123"); 

function authenticate(name, password, callback) {
  if (!name) name = " ";//ensure non-empty name
  db.get('users', name)
    .then(function(result){
      var user = result.body;
        if (!user) {
          return callback(new Error("cannot find user"))
        }

      pwd.hash(password, user.salt, function (err, hash) {
        if (err) {
          return callback(err)
        }

        if (String(hash) === user.hash) {
          return callback(null, user)
        }

        callback(new Error("invalid password for "+name))
      })
    })
    .fail(function (err) {
      callback(new Error("user not found: "+name));
    });
}


function restrict(proceed) { // proceed only after authenticating via login page...
  return function (req, res, opts, callback) {
    var session = Session(req, res, store);
    // check session for current user:
    session.get("user", function (err, user) {
      if (err) return callback(err);
      if (user) //a user is currently logged in, may proceed:
        return proceed(req, res, opts, callback);

      // else no current user; demand login:
      redirect(req,res,"/login");
    });
  }
}

router.addRoute("/", restrict(function (req, res) {
  //how to proceed when a user is already logged in:
  var session = Session(req, res, store);
  session.get("user", function (err, user) {
    var message = "Welcome " + user.name.toString();
    sendHtml(req, res, templates.index({message:message}));
  });
}));

router.addRoute("/logout", function (req, res, opts, callback) {
  var session = Session(req, res, store);

  session.destroy(function (err) { //delete user's session
    if (err) return callback(err);
    redirect(req, res, "/login");
  });
});

router.addRoute("/login", {
  GET: function (req, res, opts, callback) { //display login page...
    //return callback("hello world"); //<-- uncomment to see default callback

    var message = "";
    if (opts.parsedUrl.query)
      message = "<p class='msg error'> Login failed.  Try again. </p>";
    sendHtml(req, res, templates.login({ message: message }))
  },

  POST: function (req, res, opts, callback) { //process login form...

    formBody(req, res, function (err, body) { // when form body is ready...
      if (err) return callback(err);

      authenticate(body.username, body.password, function (err, user) {
        // if authentication successful, user will be non-null
        var session = Session(req, res, store);

        if (err || !user) {// login failed, try again...
          console.log(err);
          redirect(req, res, "/login?retry");

        } else { //have user, proceed...

          console.log('user validated: ' + user.name);
          //session.del(function (err) { //clear all session data but retain cookie
            //if (err) return callback(err);
            session.set("user", user, function (err) { //reset session user data
              if (err) return callback(err);
              showSession(session);//for debugging
              redirect(req, res, "/");
            })
          //})//session.del
          

        }//else
      })//authenticate
    })//formBody
  }
});

// serve static client files:
router.addRoute("/public/*", st({
  path: __dirname + "/public",
  url: "/public"
}));

var server = http.createServer(router);
server.listen(3000);
console.log("example auth server listening on port 3000");
