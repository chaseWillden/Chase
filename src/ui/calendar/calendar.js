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
chase.ui.calendar.create = function(options, callback){
	chase.require('chase.ui.color');
	chase.require('chase.element');
	chase.require('chase.style');

	var id = document.getElementById('calendarStyle');
	if (!chase.check.func(callback)){
		chase.ex.param('ui.calendar.create', 'Function');
	}
	if (!chase.check.null(id)){
		callback(chase.ui.calendar.draw_(null, options));
	}
	else{
		var path = chase.path_() + chase.deps.css['chase.ui.calendar'];
		chase.get_(path, function(css){
			callback(chase.ui.calendar.draw_(css, options));
		});
	}
}

chase.ui.calendar.next_ = function(){
	var curr = this;
	while (true){
		curr = curr.parentElement;
		if (curr.tagName == 'TABLE'){
			break;
		}
	}
	var month = curr.month + 1 > 12 ? 1 : curr.month + 1;
	var year = curr.month + 1 > 12 ? ++curr.year : curr.year;
	var table = chase.ui.calendar.draw_(null, {
		month: month,
		year: year
	});
	chase.element.replace(curr, table);
}

chase.ui.calendar.prev_ = function(){
	var curr = this;
	while (true){
		curr = curr.parentElement;
		if (curr.tagName == 'TABLE'){
			break;
		}
	}
	var month = curr.month - 1 < 1 ? 12 : curr.month - 1;
	var year = curr.month - 1 < 1 ? --curr.year : curr.year;
	var table = chase.ui.calendar.draw_(null, {
		month: month,
		year: year
	});
	chase.element.replace(curr, table);
}

/**
 * Selected Dates
 * @type {Object}
 */
chase.ui.calendar.selected_ = {};

/*
*	Draw the calendar
*/
chase.ui.calendar.draw_ = function(css, options){
	if (chase.check.str(css)){
		chase.style.fromText(css, 'calendarStyle');
	}
	chase.require('chase.date');

	var date = chase.date.today();
	var today = chase.date.today();
	if (chase.check.obj(options) && chase.check.prop(options, 'month') && chase.check.prop(options, 'year')){
		date = chase.date.new(options.month + '/1/' + options.year);
	}

	var same = (date.month === today.month) && (date.year === today.year);

	/*
	*	Creating the table and headers
	*/
	var table = chase.element.create('table', {className: 'chase-calendar', month: date.date.getMonth() + 1, year: date.year});
	var tr = chase.element.create('tr');
	var left = chase.element.create('th');
	var next = chase.element.create('a', {href: '#', innerHTML: '>'});
	var prev = chase.element.create('a', {href: '#', innerHTML: '<'});

	next.onclick = chase.ui.calendar.next_;
	prev.onclick = chase.ui.calendar.prev_;

	chase.element.append(left, prev);
	chase.element.append(tr, left);
	var header = chase.element.create('th', {colSpan: '5'});
	chase.element.append(header, date.month);
	chase.element.append(tr, header);
	var right = chase.element.create('th');
	chase.element.append(right, next);
	chase.element.append(tr, right);
	chase.element.append(table, tr);

	var beginning = date.beginningOfMonth();
	chase.g = beginning;

	var totalDays = beginning.totalDaysInMonth() + beginning.dayOfWeek;

	var tr = chase.element.create('tr');
	for (var i = 0; i < totalDays; i++){
		if (i % 7 == 0 && i != 0){
			chase.element.append(table, tr);
			tr = chase.element.create('tr');
		}
		var td = chase.element.create('td', {id: 'cal-' + i});
		if (i < beginning.dayOfWeek){
			td.className += 'chase-calendar-nohover';
			chase.element.append(td, ' ');
		}
		else{
			if (same && (i - beginning.dayOfWeek + 1) == today.day){
				td.className += 'chase-today';
				chase.element.append(td, (i - beginning.dayOfWeek + 1) + '');
			}
			else{
				chase.element.append(td, (i - beginning.dayOfWeek + 1) + '');
			}
		}

		if (td.innerHTML != ' ' &&
			  chase.check.prop(chase.ui.calendar.selected_, date.year) && 
			  chase.check.prop(chase.ui.calendar.selected_[date.year], date.month) && 
			  chase.check.prop(chase.ui.calendar.selected_[date.year][date.month], td.innerHTML)){
			chase.element.toggleClass(td, 'chase-calendar-selected');
		}

		var onselect = chase.check.prop(options, 'onSelect') && chase.check.func(options.onSelect);

		td.onclick = function(){
			/**
			 * I know there is a better way of accomplishing this
			 */
			if (chase.element.hasClass(this, 'chase-calendar-selected')){
				delete chase.ui.calendar.selected_[date.year][date.month][this.innerHTML];
			}
			else{
				if (chase.check.prop(chase.ui.calendar.selected_, date.year)){
					if (chase.check.prop(chase.ui.calendar.selected_[date.year], date.month)){
						chase.ui.calendar.selected_[date.year][date.month][this.innerHTML] = true;
					}
					else{
						chase.ui.calendar.selected_[date.year][date.month] = {};
						chase.ui.calendar.selected_[date.year][date.month][this.innerHTML] = true;
					}
				}
				else{
					chase.ui.calendar.selected_[date.year] = {};
					chase.ui.calendar.selected_[date.year][date.month] = {};
					chase.ui.calendar.selected_[date.year][date.month][this.innerHTML] = true;
				}
			}

			chase.element.toggleClass(this, 'chase-calendar-selected');
			if (onselect){
				options.onSelect({
					day: this.innerHTML,
					month: date.month,
					year: date.year,
					str: date.date.toString()
				});
				console.log('');
			}
		}

		chase.element.append(tr, td);

		if (i == totalDays - 1){
			chase.element.append(table, tr);
		}
	}

	return table;
}