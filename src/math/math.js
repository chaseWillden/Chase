/*
*	Establish the chase.math object
*/
chase.math = chase.math || {};

chase.math.marginsCentered = function(larger, smaller){
	if (chase.check.num(larger) && chase.check.num(smaller)){
		return (larger - smaller) / 2;
	}
	else{
		chase.ex.param('MarginsCentered', 'Numbers');
	}
}