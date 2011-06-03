var url = require('url');
var haml = require('haml');
var sass = require('sass');


function respond(request,response){
	response.writeHead(200,{
		'Content-type': 'text/html'
	});

	route(request);

	response.write('Hello You!<br/>');
	response.write('You are connecting from : ' + request.socket.remoteAddress + '<br/>');
	response.write('to access the URL: ' + request.headers.host + request.url + '<br/>');
	response.write('My current dir: ' + __dirname + '<br/>');
	response.end('Running ' + process.title + ' version: ' + process.version);
}

function route(request){
	console.log('Connection from: ' + request.headers['x-real-ip'] + ' for url: ' + request.url);
}

exports.respond = respond;
