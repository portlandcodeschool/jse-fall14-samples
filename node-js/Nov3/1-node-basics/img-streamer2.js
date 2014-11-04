var http = require('http');
var fs = require('fs');
var timer = require('./timer.js');

http.createServer(function (req, res) {
	timer.start();

    res.writeHead(200, {'Content-Type':'image/png'});
    var stream = fs.createReadStream('data/earth-huge.png');
    stream.on('data', function(chunk) {
    	timer.check('more');
	   	console.log(chunk);
    });
    stream.on('end', function() {
    	timer.check('done');
    	console.log('finished!');
    });
    stream.pipe(res);
}).listen(3000);
console.log('Server running at http://localhost:3000/');
