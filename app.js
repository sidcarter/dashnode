var http = require('http'),
	sys = require('sys'),
	slave = require('./controllers');

// process.on('uncaughtException', function(e) {
//	console.log("Got " + e);
// })

var server = http.createServer();

server.on('request', slave.respond);

server.listen(4242);

console.log('Server listening on http://127.0.0.1:4242');