var http = require('http');
var fs = require('fs');
var timer = require('./timer');

var server = http.createServer(function (req, res) {
	timer.start();

 	fs.readFile('data/earth-huge.png' , function (err, data) {
  		timer.check('Start reply');
    	res.writeHead(200, {'Content-Type': 'image/png'});
    	res.end(data);
    	timer.check('End reply');
  });
});

console.log('listening on port 3000');
server.listen(3000);
