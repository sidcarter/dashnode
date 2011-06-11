var http = exports.http = require('http'),
	url = require('url'),
	jade = require('jade'),
	stylus = require('stylus'),
	fs = require('fs');

var viewDir = process.cwd() + '/views/';
var cssDir = viewDir + 'stylesheets/';
var imageDir = viewDir + 'images/';
var scriptDir = viewDir + 'scripts/';
var favicon = 'AW_Sid.jpg';

function respond(request,response){
	
	var remoteAddress = request.headers['x-real-ip'] || request.socket.remoteAddress;

	console.log('Connection from: ' + remoteAddress + ' for url: ' + request.url);

	fullUrl = url.parse(request.url);

	route(fullUrl, response);
}

function route(url, response){

	var pathname = url.pathname.split('/');
	var path = pathname[1];
	var options = {
			myTitle: 'My Dash Node',
			body: ''
	};
	
	switch(path) {
		case '' : 
		case 'index.html' :
		case 'index' :
			response.writeHead(200,{
				'Content-type': 'text/html'
			});
			response.write(renderPage('index', options));
			response.end();
			break;

		case 'style.css': 
			response.writeHead(200,{
				'Content-type': 'text/css'
			});
			response.write(renderCss(path));
			response.end();
			break;

		case 'site.js': 
			response.writeHead(200,{
				'Content-type': 'text/css'
			});
			response.write(fs.readFileSync(scriptDir + path), 'utf-8');
			response.end();
			break;

		case 'favicon.jpeg':
			response.writeHead(200,{
				'Content-type': 'image/jpeg'
			})
			response.end(fs.readFile(imageDir + favicon, function(err, data) {
				if (err) {
					console.log(err.stack);
				}
				return data;
			}));
			break;

		case 'testing': 
			response.writeHead(200,{
				'Content-type': 'text/html'
			});
			response.write(renderPage(path));
			response.end();
			break;
	
		default: 
			NotFound(url.pathname, response);
			break;
	}
}

function renderPage(path, options) {
	var layoutFile = viewDir + '_layout.jade';
	var bodyFile = viewDir + path + '.jade';
	try {
		options.body = jade.render(fs.readFileSync(bodyFile, 'utf8'));
//		console.log(options.myTitle + options.body);
		var html = jade.render(fs.readFileSync(layoutFile, 'utf8'), {locals: options});
	} catch (ex) {
		console.log('Got ' + ex);
	}
	return html || '404';
}

function renderCss(path) {
	var css;
	var fileName = cssDir + path + '.styl';
	try {
		var data = fs.readFileSync(fileName, 'utf8');
		stylus.render(data, {filename: path + '.styl'}, function(err,data){
			css = data;
		});
	} catch (ex) {
		console.log(ex.stack);
	}
	return css;
}

function NotFound(pathname,response){
	
	response.writeHead(404,{
		'Content-type': 'text/html'
	});
	
	response.write('Hello You!<br/>');
	response.write('You want the URL: ' + pathname + ', which incidentally does not exist yet.<br/>');
	response.end('Running ' + process.title + ' version: ' + process.version);
}

exports.respond = respond;