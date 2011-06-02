var http = require('http'),
	sys = require('sys'),
	slave = require('./slave');

process.on('TypeError', function(e) {
	console.log(e);
})

var server = http.createServer();

server.on('request', slave.respond);

server.on('connection', slave.log);

server.listen(4242);

console.log('Server listening on http://127.0.0.1:4242');
