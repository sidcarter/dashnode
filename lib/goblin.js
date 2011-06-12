var http = exports.http = require('http'),
	url = require('url'),
	jade = require('jade'),
	stylus = require('stylus'),
	fs = require('fs');

var viewDir = process.cwd() + '/views/';
var cssDir = viewDir + 'stylesheets/';
var imageDir = viewDir + 'images/';
var scriptDir = viewDir + 'scripts/';
var layoutFile = viewDir + '_layout.jade';
var options = {
		myTitle: 'My Dash Node',
		body: ''
};
var favicon = 'AW_Sid.jpg';

function respond(request,response){
	
	var remoteAddress = request.headers['x-real-ip'] || request.socket.remoteAddress;

	console.log('Connection from: ' + remoteAddress + ' for url: ' + request.url);

	completeUrl = url.parse(request.url);

	var pathName = completeUrl.pathname.split('/');
	var fileType = completeUrl.pathname.split('.').pop();
//	console.log(fileType); 
	var path = pathName[1];

	
	switch(fileType) {
		case 'js' :
			fs.readFile(scriptDir + path, 'utf8', function(err,data){
				if (err) {
					notFound(err, response);
					console.log('Got ' + err.stack);
				}
				renderJs(data,response);
			});
			break;
			
		case 'css' :
			fs.readFile(cssDir + path + '.styl', 'utf8', function(err,data){
				if (err) notFound(err,response);
				renderCss(data,response);
			});
			break;
		
		case 'jpg' :	
		case 'jpeg' :
			fs.readFile(imageDir + path, function(err,data){
				if (err) notFound(err,response);
				renderImage(data,response);
			});
			break;		
			
		case '/':
			options.myTitle = 'About Sid Carter';
			renderPage('index', response);
			break;
	
		default:
			var err = path;
			notFound(err, response);
			break;
	}
}

var renderPage = function(path, response) {
	var statusCode = 200;
	var contentType = 'text/html' ;
	var bodyFile = viewDir + path + '.jade';
	
	response.writeHead(statusCode,{
		'Content-type': contentType
	});
	
	jade.renderFile(bodyFile, function(err,data){
		if (err) {
			console.log(err.stack);
			statusCode = 404;
		}
		options.body = data;
	});
//		console.log(options.myTitle + options.body);
	jade.renderFile(layoutFile, {locals: options}, function(err,data){
		if (err) console.log(err.stack);
		response.end(data);
	});
}

var renderCss = function(data, response) {
	response.writeHead(200,{
		'Content-Type': 'text/css'
	});
	try {
		stylus.render(data, function(err,data){
			response.end(data);
		});
	} catch (ex) {
		console.log(ex.stack);
	}
}

var renderJs = function(data, response) {
	
	response.writeHead(200,{
		'Content-Type': 'text/plain'
	});
	response.end(data);
}

var renderImage = function(data, response) {
	
	response.writeHead(200,{
		'Content-Type': 'image/jpeg'
	});
	response.end(data);
}

var notFound = function(err,response){
	
	response.writeHead(404,{
		'Content-type': 'text/html'
	});
	
	options.body = "Got error: " + err;
	jade.renderFile(layoutFile, {locals: options}, function(err,data){
		if (err) console.log(err.stack);
		response.end(data);
	});
	
}

exports.respond = respond;
exports.version = "0.2"