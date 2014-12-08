// Contextually-dependent config object:
var config = (process.env.HEROKU)? // if Heroku environment...
	{ //...build config object using config/environment vars
		dbKey:     process.env.DBKEY,
		sampleKey: process.env.SAMPLEKEY
	} : //else load module
	require('./config.js');

// Usage example:
//var db = require('orchestrate')(config.dbKey);

//  To set config vars on Heroku, use terminal:
// $ cd <your-repo>
// $ heroku config:set HEROKU=true SAMPLEKEY=whatever DBKEY=secret

// For more details, see
// https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-config-vars

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!  Your key is: '+config.sampleKey);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
