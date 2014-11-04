
var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hey there client!  ');
  res.write('How are you today?');
  res.end();
  // Or just:
  //res.end('Hey there client!  How are you today?');
});

console.log('listening on port # 3000');
server.listen(3000);

