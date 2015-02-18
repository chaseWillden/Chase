/*
*	Establish the chase.window object
*/
chase.window = chase.window || {};

/*
*	Get width of the window
*/
chase.window.width = function(){
	return window.innerWidth;
}

/*
*	Get the height of the window
*/
chase.window.height = function(){
	return window.innerHeight;
}

/*
*	Establishes the chase.window.check object
*/
chase.window.check = chase.window.check || {};

/*
*	Determines if a point is passed the edge of the window
*/
chase.window.check.withinWidth = function(x, width){
	return chase.window.width() > (x + width); 
}

/*
*	Returns the number of pixels to the edge
*/
chase.window.fromEdge = function(x, width){
	var overlap = chase.window.width() - x;
	return -(width - overlap);
}
