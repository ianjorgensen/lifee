var menu = function(el, options) {
	var options = options || {};

  _.defaults(options, {
    opened: false,
    up: false,
    onmove: function(){}
  });

	var pos = 0;
	var startDelta;
	var startPos;
	var handle = el.querySelector('.handle');
	var openedPosition = el.clientHeight;

	var content = $('#content')[0];
	el.style.opacity = '1';
	el.style.webkitTransitionProperty = '-webkit-transform';
	el.style.webkitTransitionDuration = '400ms';
	
	if (options.up) {
		el.style.bottom = '-' + openedPosition + 'px';
	} else {
		content.style.webkitTransitionProperty = '-webkit-transform';
		content.style.webkitTransitionDuration = '400ms';	
		el.style.top = '-' + openedPosition + 'px';	
	}

	if (options.opened === true) {
		open();
	}

	var setPosition = function(pos) {
		this.pos = pos;
		
		el.style.webkitTransform = 'translate3d(0,' + (options.up ? '-' : '') + pos + 'px,0)';

		if(!options.up) {
			content.style.webkitTransform = 'translate3d(0,' + pos + 'px,0)';	
		}	

		if (pos == openedPosition) {
			options.opened = true;
		} else if (pos == 0) {
			options.opened = false;
		}
		
		options.onmove(options.opened);
	};

	var open = function() {
		setPosition(openedPosition);
	};
	
	var close = function() {
		setPosition(0);
	};

	var toggle = function() {
		if (options.opened) {
			close();
		} else {
			open();
		}
	};

	$(handle).bind('touchstart',toggle);
	
	/*

	handle.addEventListener('touchstart', touchStart);

	var handleEvent = function(e) {
		switch (e.type) {
			case 'touchstart': touchStart(e); break;
			case 'touchmove': touchMove(e); break;
			case 'touchend': touchEnd(e); break;
		}
	};

	var touchStart = function(e) {
		console.log('hi');
		e.preventDefault();
		e.stopPropagation();
		
		el.style.webkitTransitionDuration = '0';
		startPos = pos;
		startDelta = e.touches[0].pageY - pos;
		
		handle.addEventListener('touchmove', this);
		handle.addEventListener('touchend', this);
	};
	
	var touchMove = function(e) {
		var delta = e.touches[0].pageY - startDelta;

		if (delta < 0) {
			delta = 0;
		} else if (delta > openedPosition) {
			delta = openedPosition;
		}
		
		this.setPosition(delta);
	};
	
	var touchEnd = function(e) {
		var strokeLength = pos - startPos;
		strokeLength*= strokeLength < 0 ? -1 : 1;
		
		if (strokeLength > 3) {		// It seems that on Android is almost impossibile to have a tap without a minimal shift, 3 pixels seems a good compromise
			el.style.webkitTransitionDuration = '200ms';
			if (pos == openedPosition || !options.opened) {
				setPosition(pos > openedPosition/3 ? openedPosition : 0);
			} else {
				setPosition(pos > openedPosition ? openedPosition : 0);
			}
		} else {
			el.style.webkitTransitionDuration = '400ms';
			setPosition(!options.opened ? openedPosition : 0);
		}

		handle.removeEventListener('touchmove', this);
		handle.removeEventListener('touchend', this);
	};*/
	
	return {
		open: open,
		close: close,
		toggle: toggle,
		opened: function() {
			return options.opened;
		}
	}
};