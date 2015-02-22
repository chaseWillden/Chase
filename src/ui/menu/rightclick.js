/*
*	Establish the chase.ui object
*/
chase.ui = chase.ui || {};

/*
*	Establish the chase.ui.menu object
*/
chase.ui.menu = chase.ui.menu || {};

/*
*	Establish the chase.ui.menu.rightclick object
*/
chase.ui.menu.rightclick = chase.ui.menu.rightclick || {};

/*
*	Create a right click menu
*/
chase.ui.menu.rightclick.create = function(options, callback){
	chase.require('chase.ui.color');
	chase.require('chase.element');
	chase.require('chase.style');

	var id = document.getElementById('rightClickMenu');
	if (!chase.check.null(id)){
		chase.ui.menu.rightclick.draw_(null, options, callback);
	}
	else{
		var path = chase.path_() + chase.deps.css['chase.ui.menu.rightclick'];
		chase.get_(path, function(css){
			chase.ui.menu.rightclick.draw_(css, options, callback);
		});
	}
}	

/*
*	Create the right click menu
*/
chase.ui.menu.rightclick.draw_ = function(css, options, callback){
	if (chase.check.str(css)){
		chase.style.fromText(css, 'rightClickMenu');
	}

	if (chase.check.obj(options) && options['items'] && options.items.length > 0){
		var items = options.items;

		/*
		*	Create the menu container
		*/
		var container = chase.element.create('div', {className: 'right-click'});

		for (var i = 0; i < items.length; i++){
			var item = items[i];
			var div = chase.element.create('div', {className: 'right-click-item'});

			switch (item.type){
				case 'item': {
					if (item['name']){
						chase.element.append(div, item.name);
					}
					else{
						chase.ex.exception('Unable to display name for menu');
					}
					break;
				}
				case 'divider': {
					div['className'] += ' right-click-divider';
					break;
				}
				default: {
					chase.ex.exception('Unable to render menu');
				}
			}
			chase.element.append(container, div);
		}

		/*
		*	Output the menu
		*/
		chase.element.append(document.body, container);
	}
	else{
		chase.ex.exception('Unable to create right click menu, there\'s nothing to create');
	}
}