var url = require('url');
var haml = require('haml');
var sass = require('sass');


function respond(request,response){
	response.writeHead(200,{
		'Content-type': 'text/html'
	});

	route(request.url);

	response.write('Hello You!<br/>');
	response.write('You are connecting from : ' + request.socket.remoteAddress + '<br/>');
	response.write('And trying to access the URL: ' + request.url + '<br/>');
	response.write('My current dir: ' + __dirname + '<br/>');
	response.end('Running ' + process.title + ' version: ' + process.version);
}

function log(stream) {
	console.log('Someone connected from: ' + stream.remoteAddress);
}

function route(pathname){
	console.log('You are looking for path: ' + pathname);
}

exports.respond = respond;

exports.log = log;