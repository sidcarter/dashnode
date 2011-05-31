var http = require('http'),
	sys = require('sys');

var location = process.env.PWD;

var server = http.createServer(function(request,response){
	response.writeHead(200,{
		'Content-type': 'text/html'
	});

var options = {
	host: 'localhost',
	port: 5984,
	path: '/'
}

	http.get(options, function(res) {
		res.on('data', function(chunk) {
			response.write("Couchdb Info" + chunk);
		});
	}).on('error', function(errmessage) {
		console.log('Got ' + errmessage);
	})

	response.write('Hello You!<br>');
	response.end('Running ' + process.title + ' version: ' + process.version);
})

server.listen(4242);

console.log('Server listening on http://127.0.0.1:4242');

server.on('connection', function(stream) {
	console.log('someone connected' + stream.data);
})

