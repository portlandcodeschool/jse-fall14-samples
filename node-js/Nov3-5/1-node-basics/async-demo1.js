
var fs = require('fs');

// Synchronous way:
var syncData = fs.readFileSync('data/some-json.json', {encoding: 'utf8'});
console.log(syncData);


// Async, Wrong way:
var asyncData = undefined;
fs.readFile('data/some-json.json', {encoding: 'utf8'}, function (err, data) {
	asyncData = data;
});
console.log(asyncData);

// Async, Right way:
var asyncData = undefined;
fs.readFile('data/some-json.json', {encoding: 'utf8'}, function (err, data) {
	asyncData = data;
	console.log(asyncData);
});
