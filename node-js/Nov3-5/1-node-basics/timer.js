var now = require('moment');

var starttime;

function start() {
	starttime = now();
}

function check(msg) {
  	console.log(msg+": "+now().diff(starttime)+' milliseconds');
}

module.exports = {start:start, check:check};