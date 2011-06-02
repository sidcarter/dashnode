var url = require('url');

function respond(request,response){
	response.writeHead(200,{
		'Content-type': 'text/html'
	});

	response.write('Hello You!<br>');
	response.write('You are connecting from : ' + request.socket.remoteAddress + '<br>');
	response.end('Running ' + process.title + ' version: ' + process.version);
}

function log(stream) {
	console.log('Someone connected from: ' + stream.remoteAddress);
}

exports.respond = respond;

exports.log = log;