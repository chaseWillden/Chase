/**
 * Create the element object
 * @type {Object}
 */
chase.element = chase.element || {};

/**
 * Create the element query object
 * @type {Object}
 */
chase.element.query = chase.element.query || {};

chase.element.query.all = function(ele){
	if (!chase.check.str(ele)){
		chase.ex.param('element.query.all', 'String');
	}
	return document.querySelectorAll(ele);
}