
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type':'image/png'});
    var stream = fs.createReadStream('data/image.png');
    stream.on('data', function(chunk) {
    	console.log(chunk);
    });
    stream.on('end', function() {
    	console.log('finished!');
    });
    stream.pipe(res);
}).listen(3000);
console.log('Server running at http://localhost:3000/');
