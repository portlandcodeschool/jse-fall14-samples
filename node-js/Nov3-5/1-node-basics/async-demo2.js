
var fs = require('fs');
var timer = require('./timer');

timer.start()
var syncData = fs.readFileSync('data/some-json.json', {encoding: 'utf8'});
timer.check('sync loading done');
console.log('-----------');

// Async, Wrong way:
var asyncData = undefined;
timer.start();
fs.readFile('data/some-json.json', {encoding: 'utf8'}, function (err, data) {
	asyncData = data;
	timer.check('all done');
	console.log('-----------');
});
console.log(asyncData);
timer.check('are we there yet?');

// Async, Right way:
var asyncData = undefined;
timer.start();
fs.readFile('data/some-json.json', {encoding: 'utf8'}, function (err, data) {
	asyncData = data;
	console.log(asyncData);
	timer.check('all done');
});
