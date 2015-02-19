/*
*	Establish the chase.ui object
*/
chase.ui = chase.ui || {};

/*
*	Establish the chase.ui.calendar object
*/
chase.ui.calendar = chase.ui.calendar || {};

/*
*	Create an calendar object
*/
chase.ui.calendar.create = function(options){
	chase.require('chase.ui.color');
	chase.require('chase.element');
	chase.require('chase.style');

	var id = document.getElementById('calendarStyle');
	if (!chase.check.null(id)){
		chase.ui.calendar.draw_(null, options);
	}
	else{
		var path = chase.path_() + chase.deps.css['chase.ui.calendar'];
		chase.get_(path, function(css){
			chase.ui.calendar.draw_(css, options);
		});
	}
}

/*
*	Draw the calendar
*/
chase.ui.calendar.draw_ = function(css, options){
	if (chase.check.str(css)){
		chase.style.fromText(css, 'calendarStyle');
	}
	var table = chase.element.create('table', {className: 'chase-calendar'});
	var tr = chase.element.create('tr');
	var left = chase.element.create('th');
	chase.element.append(left, '<');
	chase.element.append(tr, left);
	var header = chase.element.create('th', {colSpan: '5'});
	chase.element.append(header, 'March');
	chase.element.append(tr, header);
	var right = chase.element.create('th');
	chase.element.append(right, '>');
	chase.element.append(tr, right);
	chase.element.append(table, tr);

	var tr = chase.element.create('tr');
	for (var i = 0; i < 31; i++){
		if (i % 7 == 0 && i != 0){
			chase.element.append(table, tr);
			tr = chase.element.create('tr');
		}
		var td = chase.element.create('td', {id: i});
		chase.element.append(td, (i + 1) + '');
		chase.element.append(tr, td);

		if (i == 30){
			chase.element.append(table, tr);
		}
	}

	chase.element.append(document.body, table);
}