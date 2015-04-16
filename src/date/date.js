/**
 * Establish the chase.date object
 * @type {Object}
 */
chase.date = chase.date || {};

/**
 * This is the base date object
 * @param  {Object}
 * @return {Object}
 */
chase.date.obj_ = function(options){
	if (chase.check.obj(options)){
		if (options['date']){
			this.date = new Date(options.date);
		}
		else{
			this.date = new Date();
		}
	}
	else{
		this.date = new Date();
	}
	this.month = chase.date.months_[this.date.getMonth()];
	this.day = this.date.getDate();
	this.year = this.date.getFullYear();
	this.dayOfWeek = this.date.getDay();
}

/**
 * Get the previous day
 * @return {Object}
 */
chase.date.obj_.prototype.previousDay = function(){
	return new chase.date.obj_({
		date: this.date - chase.date.DAY
	});
}

/**
 * Get the next day
 * @return {Object}
 */
chase.date.obj_.prototype.nextDay = function(){
	return new chase.date.obj_({
		date: this.date + chase.date.DAY
	});
}

/**
 * Get the beginning of the month
 * @return {Object}
 */
chase.date.obj_.prototype.beginningOfMonth = function(){
	return new chase.date.obj_({
		date: (this.date - ((this.day - 1) * chase.date.DAY))
	})
}

/**
 * Get the total days in the month
 * @return {Number} 
 */
chase.date.obj_.prototype.totalDaysInMonth = function(){
	return new Date(this.year, this.date.getMonth() + 1, 0).getDate();
}

/**
 * Array of month names
 * @type {Array}
 */
chase.date.months_ = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

/**
 * Get the today's date object
 * @return {Object}
 */
chase.date.today = function(){
	return new chase.date.obj_();
}

/**
 * Get the date of the specified string
 * @param  {String} dateStr 
 * @return {Chase.Date}
 */
chase.date.new = function(dateStr){
	if (!chase.check.str(dateStr)){
		chase.ex.param('date.new', 'String');
	}
	return new chase.date.obj_({
		date: dateStr
	});
}

/**
 * One Minute in miliseconds
 * @type {Number}
 */
chase.date.MINUTE = 60000;

/**
 * 1 Second in miliseconds
 * @type {Number}
 */
chase.date.SECOND = 1000;

/**
 * 1 Hour in miliseconds
 * @type {Number}
 */
chase.date.HOUR = chase.date.MINUTE * 60;

/**
 * 1 Day in miliseconds
 * @type {Number}
 */
chase.date.DAY = chase.date.HOUR * 24;

/**
 * 1 Week in miliseconds
 * @type {Number}
 */
chase.date.WEEK = chase.date.DAY * 7;

/**
 * 1 Month in miliseconds. This is a rough estimate
 * @type {Number}
 */
chase.date.MONTH = chase.date.DAY * 30.5;

/**
 * 1 Year in miliseconds
 * @type {Number}
 */
chase.date.YEAR = chase.date.DAY * 365;

/**
 * This is the calculations the inputted time from now
 * @param  {String}
 * @return {String}
 */
chase.date.fromNow = function(str){
	chase.require('chase.date');
	chase.require('chase.math');
	if (chase.check.str(str)){
		var date = new Date(str);
		var now = new Date();
		var diff = date - now;

		if (diff < 0){
			return chase.date.from_(-diff, 'ago');
		}
		else{
			return chase.date.from_(diff, 'from now');
		}

		return diff;
	}
	else{
		chase.ex.param('date.fromNow', 'String');
	}
}

/**
 * This creates the ago text
 * @param  {Number}
 * @param  {String}
 * @return {String}
 */
chase.date.from_ = function(diff, type){
	if (diff < chase.date.SECOND){
		return diff;
	}
	else if (diff < chase.date.MINUTE){
		var seconds = chase.math.floor(diff / chase.date.SECOND, 0, true);
		if (seconds > 1){
			return seconds + ' seconds ' + type;
		}
		return seconds + ' second ' + type;
	}
	else if (diff < chase.date.HOUR){
		var minutes = chase.math.floor(diff / chase.date.MINUTE, 0, true);
		if (minutes > 1){
			return minutes + ' minutes ' + type;
		}
		return minutes + ' minute ' + type;
	}
	else if (diff < chase.date.DAY){
		var hours = chase.math.floor(diff / chase.date.HOUR, 0, true);
		if (hours > 1){
			return hours + ' hours ' + type;
		}
		return hours + ' hour ' + type;
	}
	else if (diff < chase.date.WEEK){
		var days = chase.math.floor(diff / chase.date.DAY, 0, true);
		if (days > 1){
			return days + ' days ' + type;
		}
		return days + ' day ' + type;
	}
	else if (diff < chase.date.MONTH){
		var weeks = chase.math.floor(diff / chase.date.WEEK, 0, true);
		if (weeks > 1){
			return 'over ' + weeks + ' weeks ' + type;
		}
		return 'over ' + weeks + ' week ' + type;
	}
	else if (diff < chase.date.YEAR){
		var months = chase.math.floor(diff / chase.date.MONTH, 0, true);
		if (months > 1){
			return 'over ' + months + ' months ' + type;
		}
		return 'over ' + months + ' month ' + type;
	}
	else{
		var years = chase.math.floor(diff / chase.date.YEAR, 0, true);
		if (years > 1){
			return 'over ' + years + ' years ' + type;
		}
		return 'over ' + years + ' year ' + type;
	}
}