var http = require('http'),
	sys = require('sys'),
	slave = require('./slave');

// process.on('uncaughtException', function(e) {
//	console.log("Got " + e);
// })

var server = http.createServer();

server.on('request', slave.respond);

server.listen(4242);

console.log('Server listening on http://127.0.0.1:4242');

/* 
var couchDbOptions = {
	host: 'google.com',
	port: 80,
	path: '/'
}

var couchDbRequest = http.get(couchDbOptions, function(response, err) {
	if (err) {
		throw err;
	};
	response.on('data', function(chunk) {
		console.log("Body: " + chunk);
	})
});
*/