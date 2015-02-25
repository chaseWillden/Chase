/**
 * Establish the chase.array object
 * @type {Object}
 */
chase.array = chase.array || {};

/**
 * This is the prototype extension of 
 * the array object
 * @type {Prototype}
 */
chase.array.PROTOTYPE = Array.prototype;

/**
 * Return the index of a value in an array.
 * If -1 is returned, the value doesn't exist
 * @param  {String|Number|etc...|!Null}
 * @return {Number}
 */
chase.array.PROTOTYPE.indexOf = function(val){
	if (!chase.check.null(val)){
		for (var i = 0; i < this.length; i++){
			if (this[i] == val){
				return i;
			}
		}
		return -1;
	}
	else{
		chase.ex.param('array.indexOf', 'Value');
	}
}

/**
 * Return the last index of the value in an array.
 * If -1 is returns, the value doesn't exist
 * @param  {String|Number|etc...|!Null}
 * @return {Number}
 */
chase.array.PROTOTYPE.lastIndexOf = function(val){
	var values = [];
	if (!chase.check.null(val)){
		for (var i = 0; i < this.length; i++){
			if (this[i] == val)
				values.push(this[i]);
		}
		if (values.length > 0){
			return values[values.length - 1];
		}
		else{
			return -1;
		}
	}
	else{
		chase.ex.param('array.lastIndexOf', 'Value');
	}
}

/**
 * Return true if the array contains a value
 * @param  {String|Number|etc...|!Null}
 * @return {Boolean}
 */
chase.array.PROTOTYPE.contains = function(val){
	if (!chase.check.null(val)){
		return this.indexOf(val) > -1;
	}
	else{
		chase.ex.param('array.contains', 'Value');
	}
}

/**
 * Split an array at the first value found.
 * Returns -1 if the value is not found.
 * @param  {String|Number|etc...|!Null}
 * @return {Object}
 */
chase.array.PROTOTYPE.splitAtValue = function(val){
	if (!chase.check.null(val)){
		var idx = this.indexOf(val);
		if (idx > -1){
			var left = this.slice(0, idx);
			var right = this.slice(idx);
			return {
				left: left,
				right: right
			};
		}
		else{
			return -1;
		}
	}
	else{
		chase.ex.param('array.splitAtValue', 'Value');
	}
}

/**
 * Empty's the array
 * @return {Nothing}
 */
chase.array.PROTOTYPE.empty = function(){
	this = [];
}

/**
 * Tests the array to see if all values are 
 * of the same type
 * @return {Boolean}
 */
chase.array.PROTOTYPE.sameTypes = function(){
	var type = typeof this[0];
	for (var i = 1; i < this.length; i++){
		if (typeof this[i] !== type)
			return false;
	}
	return true;
}

/**
 * Get a portion of the array. If the stop index
 * is greater than the start or the length of the array
 * is smaller than the stop index, it will return
 * a -1.
 * @param  {Number}
 * @param  {Number}
 * @return {Array}
 */
chase.array.PROTOTYPE.getRange = function(startIdx, stopIdx){
	if (chase.check.number(startIdx) && chase.check.number(stopIdx)){
		if (stopIdx >= startIdx && stopIdx < this.length){
			return this.slice(startIdx, stopIdx);
		}
		else{
			return -1;
		}
	}
	else{
		chase.ex.param('array.getRange', 'Number');
	}
}

/**
 * This iterates through the array. This calls the
 * callback function. The first parameter is the 
 * item in the array, the second parameter is 
 * the index number.
 * @param  {Function}
 * @return {FunctionCallback}
 */
chase.array.PROTOTYPE.forEach = function(callback){
	if (chase.check.func(callback)){
		for (var i = 0; i < this.length; i++){
			callback(this[i], i, this);
		}
	}
	else{
		chase.ex.param('array.forEach', 'Function');
	}
}

/**
 * This returns the reversed version of the array
 * @return {Array}
 */
chase.array.PROTOTYPE.reverse = function(){
	var reversed = [];
	for (var i = this.length - 1; i != -1; i--){
		reversed.push(this[i]);
	}
	return reversed;
}

/**
 * Remove an item in the array with an index
 * @param  {Number}
 * @return {Boolean}
 */
chase.array.PROTOTYPE.remove = function(idx){
	if (!chase.check.int(idx)){
		var removed = this.splice(idx, 1);
		return removed.length > 0;
	}
	else{
		chase.ex.param('array.remove', 'Integer');
	}
}

/**
 * Remove all values from an array at a give type
 * @param  {Value}
 * @return {Boolean}
 */
chase.array.PROTOTYPE.removeAllValues = function(val){
	var worked = true;
	if (!chase.check.null(val)){
		this.forEach(function(item, i){
			if (item == val)
				if (!this.remove(i))
					worked = false;
		});
		return worked;
	}
	else{
		chase.ex.param('array.removeAllValues', 'Value');
	}
}