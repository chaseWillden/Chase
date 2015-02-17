/*
*	Establish the chase.element object
*/
chase.element = chase.element || null;
if (chase.check.null(chase.element)){
	chase.require('chase.element');
}

/*
*	Establish the chase.element.a object
*/
chase.element.a = chase.element.a || {};

chase.element.a.create = function(name, url){
	if (chase.check.null(url)){
		url = '#';
	}
	var ele = chase.element.create('a', {href: url});
	var specific = Object.create(chase.element);
	specific.type = chase.SPECIFIC;
	specific.curr_ = ele;
	ele.chase = specific;
	return ele;
}