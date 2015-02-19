/*
*	Establish the chase.ui object
*/
chase.ui = chase.ui || {};

/*
*	Establish the chase.ui.alert object
*/
chase.ui.alert = chase.ui.alert || {};

/*
*	Create an alert object
*/
chase.ui.alert.create = function(msg, options){
	chase.require('chase.ui.color');
	chase.require('chase.element');
	chase.require('chase.style');

	var id = document.getElementById('alertStyle');
	if (!chase.check.null(id)){
		chase.ui.alert.draw_(null, msg, options);
	}
	else{
		var path = chase.path_() + chase.deps.css['chase.ui.alert'];
		chase.get_(path, function(css){
			chase.ui.alert.draw_(css, msg, options);
		});
	}
}

/*
*	Draw the alert
*/
chase.ui.alert.draw_ = function(css, msg, options){
	if (chase.check.str(css)){
		chase.style.fromText(css, 'alertStyle');
	}

	var div = chase.element.create('div', {className: 'chase-alert'});
	chase.element.append(div, msg);
	chase.element.append(document.body, div);
	setTimeout(function(){
		chase.style.set(div, 'right', '10px');
		setTimeout(function(){
			chase.style.set(div, 'right', '-300px');
			setTimeout(function(){
				div.remove();
			}, 400);
		}, 3000);	
	}, 500);
}