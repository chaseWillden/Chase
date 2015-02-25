/**
 * Make sure the chase.element is set
 * @type {Object}
 */
chase.element = chase.element || {};

/**
 * Create the button object
 * @type {Object}
 */
chase.element.button = chase.element.button || {};

/**
 * Create a button object
 * @param  {String}
 * @param  {Function}
 * @return {Object}
 */
chase.element.button.create = function(text, click){
	return new chase.element.button.obj_(text, click);
}

/**
 * Create a button object
 * @param  {String}
 * @param  {Function}
 * @return {Object}
 */
chase.element.button.obj_ = function(text, click){
	this.txt = text;
	this.click = click;
}

/**
 * Set the button prototype to a const.
 * @type {Object}
 */
chase.element.button.PROTOTYPE = chase.element.button.obj_.prototype;

/**
 * Set the onclick function for the button
 * @param {Function}
 */
chase.element.button.PROTOTYPE.setClick = function(callback){
	if (chase.check.func(callback)){
		this.click = callback;
	}
	else{
		chase.ex.param('button.setClick', 'Function');
	}
}