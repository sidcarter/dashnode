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