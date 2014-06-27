/*
 * jQuery Dropdown
 * http://dedepress.com
 */

(function($) {
	$.fn.fadeToggle = function(speed, easing, callback) {
		return this.animate({opacity: 'toggle'}, speed, easing, callback);  
	};
	
	$.fn.slideFadeToggle = function(speed, easing, callback) {
		return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
	};

	$.fn.blindToggle = function(speed, easing, callback) {
		var h = this.outerHeight();
		return this.show().animate({marginTop: parseInt(this.css('marginTop')) < 0 ? 0 : -h}, speed, easing, callback);  
	};
})(jQuery);
 
(function($) {
	$ = jQuery;
	
    $.fn.dpDrop = function(options) {
        var defaults = {
			event: 'hover', // click, hover
			effect: 'toggle', // toggle, slideToggle, fadeToggle, slideFadeToggle, blindToggle
			content: '', // content selector
			activeClass: '' // class for handler when active
        };

        var options = $.extend(defaults, options);
		
        this.each(function(){
			var handler = $(this);
			var content = handler.next(options.content);
			var activeClass = options.activeClass ? options.activeClass : 'drop-handler-active';	

			var fx = function() {
				if(options.event != 'hover') {
					if( content.css('display') == 'block' && handler.attr('data-drop') == '1') {
						$(options.content).hide();
						content.show();
					} else
						$(options.content).hide();
				}
					
				content.css({'z-index':'200'});

				if(options.effect == 'slideToggle')
					content.slideToggle();
				else if(options.effect == 'fadeToggle')
					content.fadeToggle();
				else if(options.effect == 'slideFadeToggle')
					content.slideFadeToggle();
				else if(options.effect == 'blindToggle') {
					content.children('.drop-inner').blindToggle();
				} else 
					content.toggle();
					
				handler.toggleClass(activeClass); 
				handler.attr('data-drop', '1');
				
				return false;
			}
			
			if(options.event == 'click')
				handler.click(fx);
			else
				handler.hover(fx);
				
			content.mouseup(function() {return false});
			content.hover(fx);
			
			$(document).mouseup(function(e) {
				if(content.css('display') == 'block') {
					if(options.effect == 'slideToggle')
						content.slideToggle();
					else if(options.effect == 'fadeToggle')
						content.fadeToggle();
					else if(options.effect == 'slideFadeToggle')
						content.slideFadeToggle();
					else if(options.effect == 'blindToggle')
						content.children('.drop-inner').blindToggle();
					else 
						content.toggle();
						
					handler.toggleClass(activeClass); 
				}
			});
		});
	};
})(jQuery);
