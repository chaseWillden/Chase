/**
 * Establish the chase.ui object
 * @type {Object}
 */
chase.ui = chase.ui || {};

/**
 * Establish the chase.ui.button object
 * @type {Object}
 */
chase.ui.button = chase.ui.button || {};

chase.ui.button.create = function(txt, styles, attrs){
	chase.require('chase.element');
	chase.require('chase.style');
	var btn = chase.element.create('div');
	if (chase.check.obj(styles)){
		for (var style in styles){
			chase.style.set(btn, style, styles[style]);
		}
	}
	chase.element.attr(btn, 'role', 'button');
	chase.element.addClass(btn, 'chase-ui-btn');
	return btn;
}
