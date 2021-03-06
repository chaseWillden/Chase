/*
*	Establish the chase.ui object
*/
chase.ui = chase.ui || {};

/*
*	Establish the chase.ui.colorpicker object
*/
chase.ui.colorpicker = chase.ui.colorpicker || {};

chase.ui.colorpicker.create = function(callback, options){
	chase.require('chase.ui.color');
	chase.require('chase.element');
	chase.require('chase.style');

	var id = document.getElementById('colorpickerStyle');
	if (!chase.check.null(id)){
		chase.ui.colorpicker.draw_(null, options, callback);
	}
	else{
		var path = chase.path_() + chase.deps.css['chase.ui.colorpicker'];
		chase.get_(path, function(css){
			chase.ui.colorpicker.draw_(css, options, callback);
		});
	}
}

/*
*	Create a blank row
*/
chase.ui.colorpicker.blankRow_ = function(table){
	var tr = chase.element.create('tr', {className: 'colorpicker-blank'});
	chase.element.append(table, tr);
}

/*
*	Draw the colorpicker
*/
chase.ui.colorpicker.draw_ = function(css, options, callback){
	if (chase.check.str(css)){
		chase.style.fromText(css, 'colorpickerStyle');
	}

	var table = chase.element.create('table', {className: 'colorpicker'});

	/*
	*	create the first row of shades of black
	*/
	var tr = chase.element.create('tr');
	for (var i = 0; i < 10; i++){
		var td = chase.element.create('td');
		var color = chase.ui.color.shade(chase.ui.color.BLACK, ((i + 1)));
		chase.style.set(td, 'backgroundColor', color);
		chase.element.append(tr, td);

		var div = chase.element.create('div', {className: 'colorpicker-hover', 'data-color': color});

		chase.element.event(div, 'click', function(ele){
			var hex = ele['data-color'];
			if (chase.check.func(callback)){
				callback(hex);
			}
		});

		chase.element.append(td, div);
	}
	chase.element.append(table, tr);
	
	/*
	*	Create a blank row
	*/
	chase.ui.colorpicker.blankRow_(table);

	/*
	*	Create standard colors
	*/
	var tr = chase.element.create('tr');
	var standardColors = [
		chase.ui.color.MAROON,
		chase.ui.color.RED,
		chase.ui.color.ORANGE,
		chase.ui.color.YELLOW,
		chase.ui.color.GREEN,
		chase.ui.color.TEAL,
		chase.ui.color.BLUE,
		chase.ui.color.NEON_BLUE,
		chase.ui.color.PURPLE,
		chase.ui.color.PINK
	];
	for (var i = 0; i < 10; i++){
		var td = chase.element.create('td');
		var color = standardColors[i];
		chase.style.set(td, 'backgroundColor', color);
		chase.element.append(tr, td);

		var div = chase.element.create('div', {className: 'colorpicker-hover', 'data-color': color});

		chase.element.event(div, 'click', function(ele){
			var hex = ele['data-color'];
			if (chase.check.func(callback)){
				callback(hex);
			}
		});

		chase.element.append(td, div);
	}
	chase.element.append(table, tr);

	/*
	*	Create a blank row
	*/
	chase.ui.colorpicker.blankRow_(table);

	for (var j = 6; j > -1; j--){
		var tr = chase.element.create('tr');

		for (var i = 0; i < 10; i++){
			var td = chase.element.create('td');
			var color = chase.ui.color.shade(standardColors[i], j - 3);
			chase.style.set(td, 'backgroundColor', color);
			chase.element.append(tr, td);

			var div = chase.element.create('div', {className: 'colorpicker-hover', 'data-color': color});

			chase.element.event(div, 'click', function(ele){
				var hex = ele['data-color'];
				if (chase.check.func(callback)){
					callback(hex);
				}
			});
			chase.element.append(td, div);
		}

		chase.element.append(table, tr);
	}

	if (chase.check.obj(options)){
		if (chase.check.ele(options['below'])){
			chase.require('chase.window');
			var x = chase.element.x(options.below);
			var width = 212;

			/*
			*	Offsets the picker to the edge of the window
			*/
			if (!chase.window.check.withinWidth(x, width)){
				var edge = chase.window.fromEdge(x, width);
				x += edge - 15;
			}

			var y = chase.element.y(options.below) + chase.element.height(options.below);
			chase.style.set(table, 'left', x + 'px');
			chase.style.set(table, 'top', y + 'px');
		}
	}

	var html = chase.element.select('html')[0];
	chase.element.event(html, 'click', function(ele, e){
		var eles = chase.element.select('.colorpicker');
		for (var i = 0; i < eles.length; i++){
			eles[i].remove();
		}
		return true;
	});

	chase.element.append(document.body, table);
}