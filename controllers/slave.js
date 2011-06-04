var url = require('url'),
	jade = require('jade'),
	stylus = require('stylus'),
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
		case 'index.html' :
		case 'index' :
			response.writeHead(200,{
				'Content-type': 'text/html'
			});
			response.write(renderPage('index'));
			response.end();
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

function renderPage(path) {
	var viewDir = '/../views/';
	var fileName = __dirname + viewDir + path + '.jade';
	try {
		var data = fs.readFileSync(fileName, 'utf8');
		var html = jade.render(data);
//		console.log(fileName + data + html);
	} catch (ex) {
		console.log('Got ' + ex);
	}
	return html || '404';
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