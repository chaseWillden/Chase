/*
*	Establish the chase.element object
*/
chase.element = chase.element || {};

/*
*	Define the type of this module
*/
chase.element.type = chase.GLOBAL;

/*
*	Define the current element
*/
chase.element.curr_ = null;

/*
*	Create a new element
*/
chase.element.create = function(name, attrsObj, callback){
	if (chase.check.str(name)){
		if (chase.check.func(callback) && chase.deps.check('chase.element.' + name)){
			chase.include('chase.element.a', function(){
				var url = attrsObj.url ? attrsObj.url : null;
				var a = chase.element.a.create(name, url);
				callback(a);
			});	
		}
		else{
			var ele = document.createElement(name);
			if (chase.check.obj(attrsObj)){
				var keys = Object.keys(attrsObj);
				for (var i = 0; i < keys.length; i++){
					ele[keys[i]] = attrsObj[keys[i]];
				}
			}
			return ele;
		}
	}
	else{
		chase.ex.param('element', 'String');
	}
}

/*
*	Append an element to another
*/
chase.element.append = function(parent, child){
	if (this.type == chase.SPECIFIC){
		child = parent;
		parent = this.curr_;
	}
	if (chase.check.ele(parent) && chase.check.str(child)){
		parent.innerHTML += child;
	}
	else if (chase.check.ele(child)){
		parent.appendChild(child);
	}
}

/**
 * Replace an element
 * @param  {Element} whatEle
 * @param  {Element} withEle [description]
 */
chase.element.replace = function(whatEle, withEle){
	if (!chase.check.ele(whatEle) || !chase.check.ele(withEle)){
		chase.ex.param('element.replace', 'Element');
	}
	whatEle.parentElement.replaceChild(withEle, whatEle);
}

/*
*	Get the width of an element
*/
chase.element.width = function(ele){
	if (this.type == chase.SPECIFIC){
		ele = this.curr_;
	}
	if (chase.check.ele(ele)){
		return chase.element.rect_(ele).width;
	}
	else{
		chase.ex.param('Element', 'Element');
	}
}

/*
*	Get the height of an element
*/
chase.element.height = function(ele){
	if (this.type == chase.SPECIFIC){
		ele = this.curr_;
	}
	if (chase.check.ele(ele)){
		return chase.element.rect_(ele).height;
	}
	else{
		chase.ex.param('Element', 'Element');
	}
}

/*
*	Add an attribute to the element
*/
chase.element.attr = function(ele, name, value){
	if (this.type == chase.SPECIFIC){
		ele = this.curr_;
	}
	if (chase.check.ele(ele) && chase.check.str(name)){
		if (chase.check.str(value)){
			ele[name] = value;
			ele.setAttribute(name, value);
		}
		else{
			return ele.getAttribute(name);
		}
	}
	else{
		chase.ex.param('element.attr', 'Element or String');
	}
}

/*
*	Add a class to the element
*/
chase.element.addClass = function(ele, name){
	if (this.type == chase.SPECIFIC){
		ele = this.curr_;
	}
	if (chase.check.ele(ele) && chase.check.str(name)){
		if (ele.className.length == 0){
			ele.className += name;
		}
		else{
			ele.className += ' ' + name;
		}
	}
	else{
		chase.ex.param('element.attr', 'Element or String');
	}
}

/**
 * Toggles an elements class
 * @param  {Element} ele  
 * @param  {String} name
 */
chase.element.toggleClass = function(ele, name){
	if (!chase.check.ele(ele) || !chase.check.str(name)){
		chase.ex.param('element.toggleClass', 'Element | String');
	}

	if (ele.className.indexOf(name) > -1){
		ele.className = ele.className.replace(name, '');
	}
	else{
		ele.className += ' ' + name;
	}
}

/**
 * Returns true if the element has the class
 * @param  {Element}  ele 
 * @param  {String}  name 
 * @return {Boolean}      
 */
chase.element.hasClass = function(ele, name){
	if (!chase.check.ele(ele) || !chase.check.str(name)){
		chase.ex.param('element.hasClass', 'Element | String');
	}
	return ele.className.indexOf(name) > -1;
}

/*
*	Attach an event to an element
*/
chase.element.event = function(ele, eventName, callback){
	if (chase.check.ele(ele) && chase.check.str(eventName)){

		/*
		*	Prevent anonymous function
		*/
		function _eventListener(e){
			if (chase.check.func(callback)){
				var n = callback(this, e);
				if (n){
					_eventListenerRemove(e);
				}
			}
		}

		function _eventListenerRemove(e){
			e.target.removeEventListener(e.type, _eventListener);
		}

		ele.addEventListener(eventName, _eventListener, true);
	}
	else{
		chase.ex.param('element.event', 'Element or String');
	}
}

/*
*	Simple selection engine
* Todo:
*    1) Build a better selection engine
*/
chase.element.select = function(cssQuery){
	chase.require('chase.element.query');
	return chase.element.query.all(cssQuery);
}

/*
*	Get the x
*/
chase.element.x = function(ele){
	return chase.element.rect_(ele).left;
}

/*
*	Get the y
*/
chase.element.y = function(ele){
	return chase.element.rect_(ele).top;
}

/*
*	Get the element's rectange
*/
chase.element.rect_ = function(ele){
	return ele.getBoundingClientRect();
}