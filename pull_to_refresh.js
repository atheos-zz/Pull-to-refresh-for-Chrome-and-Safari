$(document).ready(function(){
	
	$('body').prepend('<div id="pullToRefresh"><h1>Pull to refresh</h1></div>');
	
	$(window).scroll(function() {
		var position = $(window).scrollTop();
		
		if( position <= -50 )
		{
			console.log( 'Got there' );
			window.location.reload();
		}
	});
});