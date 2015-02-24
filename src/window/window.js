/**
 * Establish the chase.window object
 * @type {Object}
 */
chase.window = chase.window || {};

/**
 * Get width of the window
 * @return {Number}
 */
chase.window.width = function(){
	return window.innerWidth;
}

/**
 * Get the height of the window
 * @return {Number}
 */
chase.window.height = function(){
	return window.innerHeight;
}

/**
 * Establishes the chase.window.check object
 * @type {Object}
 */
chase.window.check = chase.window.check || {};

/**
 * Determines if a point is passed the edge of the window
 * To use this function, pass the starting x position of 
 * the element. Then pass the width of the actual element.
 * @param  {Number}
 * @param  {Number}
 * @return {Boolean}
 */
chase.window.check.withinWidth = function(startXPosition, width){
	return chase.window.width() > (startXPosition + width); 
}

/**
 * Returns the number of pixels to the edge that the 
 * element needs to be.To use this function, pass the 
 * starting x position of the element. Then pass the 
 * width of the element.
 * @param  {Number}
 * @param  {Number}
 * @return {Number}
 */
chase.window.fromEdge = function(startXPosition, width){
	var overlap = chase.window.width() - startXPosition;
	return -(width - overlap); 
}