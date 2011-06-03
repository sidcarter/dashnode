var url = require('url'),
	haml = require('haml'),
	sass = require('sass'),
	fs = require('fs');


function respond(request,response){

	console.log('Connection from: ' + request.headers['x-real-ip'] + ' for url: ' + request.url);

	fullUrl = url.parse(request.url);
	
	NotFound(request, response);
	
	route(fullUrl);
}

function route(url){
	console.log('User wants to go to : ' + url.pathname);
}

function NotFound(request,response){
	
	var remoteAddress = request.headers['x-real-ip'] || request.socket.remoteAddress;
	
	response.writeHead(404,{
		'Content-type': 'text/html'
	});
	
	response.write('Hello You!<br/>');
	response.write('You are connecting from : ' + remoteAddress + '<br/>');
	response.write('to access the URL: ' + request.headers.host + request.url + '<br/>');
	response.write('My current dir: ' + __dirname + '<br/>');
	response.end('Running ' + process.title + ' version: ' + process.version);
}

exports.respond = respond;
