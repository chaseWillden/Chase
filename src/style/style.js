/*
*	Establish the chase.style object
*/
chase.style = chase.style || {};

/*
*	Set element's style
*/
chase.style.set = function(ele, name, value){
	if (chase.check.str(name) && chase.check.ele(ele)){
		ele.style[name] = value;
	}
	else{
		chase.ex.param('style.set', 'String or Element');
	}
}

/*
*	Center an element on the screen
*/
chase.style.center = function(ele, type){
	if (chase.check.ele(ele)){
		chase.require('chase.element');
		chase.require('chase.math');
		var eleWidth = chase.element.width(ele);
		if (type == 'window'){
			chase.require('chase.window');
			var winWidth = chase.window.width();
			try{
				var centered = chase.math.marginsCentered(winWidth, eleWidth);
				chase.style.set(ele, 'marginLeft', centered + 'px');
				chase.style.set(ele, 'textAlign', 'center');
			} 
			catch(ex){
				throw ex;
			}
		}
		else if (type == 'parent'){

		}
		else{
			chase.ex.exception('Center element in "window" or "parent"');
		}
	}
	else{
		chase.ex.param('Style', 'Element');
	}
}