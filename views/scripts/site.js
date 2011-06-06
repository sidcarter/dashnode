$(document).ready(function() {
	var $h1head = $('span.head');
	var $h1welcome = $('span.welcome');
	$h1welcome.fadeOut(2000, function(){
		$('.footer').animate({
				opacity: 0.5},
				2000);
	});
});