/*
*	Establish the chase.ui object
*/
chase.ui = chase.ui || {};

/*
*	Establish the chase.ui.menu object
*/
chase.ui.menu = chase.ui.menu || {};

/*
*	Establish the chase.ui.menu.top object
*/
chase.ui.menu.top = chase.ui.menu.top || {};

/**
 * Create a menu
 * @return {Menu} [description]
 */
chase.ui.menu.top.create = function(options){
	if (!chase.check.obj(options)){
		chase.ex.param('ui.menu.top', 'Object');
	}
	chase.require('chase.element');
	chase.require('chase.ui.color');
	chase.require('chase.style');

	var id = document.getElementById('colorpickerStyle');
	if (!chase.check.null(id)){
		chase.ui.colorpicker.draw_(null, options);
	}
	else{
		var path = chase.path_() + chase.deps.css['chase.ui.menu.top'];
		chase.get_(path, function(css){
			chase.ui.menu.top.draw_(css, options);
		});
	}	
}

/**
 * Draw the menu
 * @param  {[type]} css     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
chase.ui.menu.top.draw_ = function(css, options){
	if (chase.check.str(css)){
		chase.style.fromText(css, 'topmenustyle');
	}

	var ul;
	if (chase.check.prop(options, 'items') && chase.check.array(options.items)){
		ul = chase.ui.menu.top.menu_(options.items);
		ul.className = 'chase-menu-top';
	}

	if (chase.check.prop(options, 'dest')){
		var ele = chase.element.select(options.dest);
		chase.element.append(ele[0], ul);
	}
}

chase.ui.menu.top.menu_ = function(items){
	var ul = chase.element.create('ul');
	
	for (var i = 0; i < items.length; i++){
		var li = chase.element.create('li');
		var a = chase.element.create('a');
		var item = items[i];
		if (chase.check.prop(item, 'name')){
			a.innerHTML = item.name;
		}
		if (chase.check.prop(item, 'href')){
			a.href = item.href;
		}
		chase.element.append(li, a);

		if (chase.check.prop(item, 'children') && chase.check.array(item.children)){
			var child = chase.ui.menu.top.menu_(item.children);
			chase.element.append(li, child);
		}

		chase.element.append(ul, li);
	}
	return ul;
}