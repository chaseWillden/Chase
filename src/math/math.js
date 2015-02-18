/*
*	Establish the chase.math object
*/
chase.math = chase.math || {};

/*
*	Return the margins of the centered object
*/
chase.math.marginsCentered = function(larger, smaller){
	if (chase.check.num(larger) && chase.check.num(smaller)){
		return (larger - smaller) / 2;
	}
	else{
		chase.ex.param('MarginsCentered', 'Numbers');
	}
}

/*
*	Returns the floor of the number to the perscribed decimal place
*/
chase.math.floor = function(num, decimalPlaces, wholeNumber){
	if (chase.check.num(num)){
		if (chase.check.num(decimalPlaces)){
			var inc = '1';
			for (var i = 0; i < decimalPlaces; i++){
				inc += '0';
			}
			var inc = parseInt(inc);
			var floor = Math.floor(num * inc);
			if (wholeNumber){
				return floor;
			}
			return Math.floor(floor / inc);
		}
		else{
			return Math.floor(num);
		}
	}
	else{
		chase.ex.param('math.floor', 'Number');
	}
}