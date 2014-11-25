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

        callback(new Error("invalid password"))
      })
    })
    .fail(function (err) {
      callback(new Error("user not found"));
    });
}

// Helper functions:
// construct message objects stored with session:
function newMessage(type,text) {//type is 'error' or 'success'
  return {type: type, text: text,
          html: "<p class='msg "+type+"'>" + text + "</p>"}
}

function storeMessageAndRedirect(session,req,res,cb,route,errMsg,successMsg) {
  var msg = errMsg? newMessage('error',errMsg):
                    newMessage('success',successMsg);
  session.set("message", msg, function(err) {
    if (err) return cb(err);
    showSession(session);//debugging only
    redirect(req,res,route);
  })
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
      storeMessageAndRedirect(session,req,res,callback,
          "/login",
          "Please enter your login credentials");
    })// session.get
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
    //return callback("hello world"); //uncomment to see default callback

    // retrieve and delete any message stored in session:
    var session = Session(req, res, store);
    session.get("message", function (err, storedMsg) {
      if (err) return callback(err);
      // grab formatted message:
      var html = storedMsg? storedMsg.html: "";
      // delete message from session, then include it in login template:
      session.del("message", function (err) {
        if (err) return callback(err);
        sendHtml(req, res, templates.login({ message: html }))
      })
    })
  },

  POST: function (req, res, opts, callback) { //process login form...

    formBody(req, res, function (err, body) { // when form body is ready...
      if (err) return callback(err);

      authenticate(body.username, body.password, function (err, user) {
        // if authentication successful, user will be non-null
        var session = Session(req, res, store);

        if (err || !user) {
          storeMessageAndRedirect(session,req,res,callback,
            "/login",
            "Authentication failed, please check your username and password.");

        } else { //have user, proceed:

          console.log('user validated...');
          session.del(function (err) { //clear all session data but retain cookie
            if (err) return callback(err);
            session.set("user", user, function (err) {
              if (err) return callback(err);
              storeMessageAndRedirect(session,req,res,callback,
                "/",
                "",//no error
                "Authenticated as " + user.name);
            })//session.set user
          })//session.del

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
