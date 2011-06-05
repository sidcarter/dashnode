$(document).ready(function() {
	var $h1head = $('span.head');
	var $h1welcome = $('<span class=welcome>');
	$h1welcome.html('Welcome to ');
	$h1welcome.insertBefore($h1head).fadeOut(2000).animate({"left": "-=50px"}, 'slow');
});