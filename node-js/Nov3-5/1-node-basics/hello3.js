
var http = require('http');
var debug = require('./debug.js');

var server = http.createServer(function (req, res) {
  debug.logRequest(req);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  debug.logResponse(res, true);

  res.write('Hey there client!  ');
  debug.logResponse(res);

  res.write('How are you today?');
  debug.logResponse(res);

  res.end();

  // Or just:
  //res.end('Hey there client!  How are you today?');
});

console.log('listening on port # 3000');
server.listen(3000);

