/*
*	Establish the chase.date object
*/
chase.date = chase.date || {};

/*
*	This is the base date object
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

/*
*	Get the previous day
*/
chase.date.obj_.prototype.previousDay = function(){
	return new chase.date.obj_({
		date: this.date - chase.date.DAY
	});
}

/*
*	Get the next day
*/
chase.date.obj_.prototype.nextDay = function(){
	return new chase.date.obj_({
		date: this.date + chase.date.DAY
	});
}

/*
*	Months array
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

/*
*	Today
*/
chase.date.today = function(){
	return new chase.date.obj_();
}

/*
*	1 Minute in miliseconds
*/
chase.date.MINUTE = 60000;

/*
*	1 Second in miliseconds
*/
chase.date.SECOND = 1000;

/*
*	1 Hour in miliseconds
*/
chase.date.HOUR = chase.date.MINUTE * 60;

/*
*	1 Day in miliseconds
*/
chase.date.DAY = chase.date.HOUR * 24;

/*
*	1 Week in miliseconds
*/
chase.date.WEEK = chase.date.DAY * 7;

/*
*	This is a rough estimate of a month
*/
chase.date.MONTH = chase.date.DAY * 30.5;

/*
*	1 Year in miliseconds
*/
chase.date.YEAR = chase.date.DAY * 365;

/*
*	This is the calculations the inputted time from now
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

/*
*	This creates the ago text
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