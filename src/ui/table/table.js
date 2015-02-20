/*
*	Establish the chase.ui object
*/
chase.ui = chase.ui || {};

/*
*	Establish the chase.ui.table object
*/
chase.ui.table = chase.ui.table || {};

/*
*	Create a table. If a 2dAry is passed through, a 2d table will output
*/
chase.ui.table.create = function(twoDAry){
	chase.require('chase.element');
	if (chase.check.array(twoDAry)){
		var table = new chase.ui.table.obj_();
	}
	else{
		return new chase.ui.table.obj_();
	}
}

/*
*	the base table object
*/
chase.ui.table.obj_ = function(){
	this.ele_ = chase.element.create('table');

	/*
	*	This will hold all of the table row elements. This
	* allows for easy access and manipulation
	*/
	this.rows_ = [];
}

/*
*	Create a table row object
*/
chase.ui.table.obj_.prototype.createRow = function(){
	var len = this.rows_.length;
	var row = new chase.ui.table.row_();
	this.rows_.push(row);
	return row;
}

/*
*	Get row at index
*/
chase.ui.table.obj_.prototype.getRow = function(idx){
	if (chase.check.num(idx)){
		return this.rows_[idx];
	}
	else{
		chase.ex.param('ui.table.getRow', 'Number');
	}
}

/*
*	Table row object
*/
chase.ui.table.row_ = function(){
	/*
	*	This will hold all of the table cell elements. This 
	* allows for easy access and manipulation
	*/
	this.cells_ = [];
}