(function(){
 
    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);
 
    special.scrollstart = {
        setup: function() {
 
            var timer,
                handler =  function(evt) {
 
                    var _self = this,
                        _args = arguments;
 
                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.handle.apply(_self, _args);
                    }
 
                    timer = setTimeout( function(){
                        timer = null;
                    }, special.scrollstop.latency);
 
                };
 
            jQuery(this).bind('scroll', handler).data(uid1, handler);
 
        },
        teardown: function(){
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
        }
    };
 
    special.scrollstop = {
        latency: 300,
        setup: function() {
 
            var timer,
                    handler = function(evt) {
 
                    var _self = this,
                        _args = arguments;
 
                    if (timer) {
                        clearTimeout(timer);
                    }
 
                    timer = setTimeout( function(){
 
                        timer = null;
                        evt.type = 'scrollstop';
                        jQuery.event.handle.apply(_self, _args);
 
                    }, special.scrollstop.latency);
 
                };
 
            jQuery(this).bind('scroll', handler).data(uid2, handler);
 
        },
        teardown: function() {
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
        }
    };
 
})();


var pully = {
	
	position: null,
	refreshPossible: false,
	
	init: function() {
		// Inject the div
		$('body').prepend('<div id="pullToRefresh"><h1></h1></div>');
		// listener for scrolling
		$(window).bind('scroll', pully.scrollStart);
		$(window).bind('scrollstop', pully.scrollStop);
	},
	
	scrollStart: function() {
		pully.position = $(window).scrollTop();
		
		if (pully.position <= -30)
		{
			$('#pullToRefresh h1').text('Release to refresh');
			pully.refreshPossible = true;
		}
		else if (pully.position <= -5 && pully.refreshPossible === false)
		{
			pully.slideDownMenu();
		}
		else if (pully.refreshPossible === false)
		{
			pully.slideUpMenu();
		}
		
	},
	
	scrollStop: function() {
		pully.position = $(window).scrollTop();
		
		if (pully.position >= 0 && pully.refreshPossible === true)
		{
			$('#pullToRefresh').addClass('fixed');
			$('#pullToRefresh h1').text('Reloading');
			$(window).scrollTop(0);
			setTimeout(function(){
				window.location.reload();
			}, 1000);
		}
		
	},
	
	slideDownMenu: function() {
		$('#pullToRefresh').slideDown(200);
		$('#pullToRefresh h1').text('Pull to refresh');
	},
	
	slideUpMenu: function() {
		$('#pullToRefresh').slideUp(200);
	}
	
};

$(document).ready(pully.init);