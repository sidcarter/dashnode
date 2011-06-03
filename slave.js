var url = require('url'),
	haml = require('haml'),
	sass = require('sass'),
	fs = require('fs');


function respond(request,response){
	
	var remoteAddress = request.headers['x-real-ip'] || request.socket.remoteAddress;

	console.log('Connection from: ' + remoteAddress + ' for url: ' + request.url);

	fullUrl = url.parse(request.url);

	route(fullUrl, response);
}

function route(url, response){

	var pathname = url.pathname.split('/');
	var path = pathname[1];
	console.log('User wants to go to : ' + path);
	
	switch(path) {
		case '' : 
			response.writeHead(200,{
				'Content-type': 'text/html'
			});
			response.end('In index');
			break;
	
		case 'testing': 
			response.writeHead(200,{
				'Content-type': 'text/html'
			});
			response.end('In testing now');
			break;
	
		default: 
			NotFound(url.pathname, response);
			break;
	}
}

function NotFound(pathname,response){
	
	response.writeHead(404,{
		'Content-type': 'text/html'
	});
	
	response.write('Hello You!<br/>');
	response.write('You want the URL: ' + pathname + ', which incidentally does not exist yet.<br/>');
	response.end('Running ' + process.title + ' version: ' + process.version);
}

function render(pathname) {
	
}

exports.respond = respond;