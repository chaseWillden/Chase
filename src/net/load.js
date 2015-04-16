/*
*	Establish the chase.net object
*/
chase.net = chase.net || {};

/*
*	Establish the chase.net.load object
*/
chase.net.load = chase.net.load || {};

/**
 * Each element labeled:
 * 	<load href='path/to/file.html'></load>
 * will load the html into that element
 * @return {[type]} [description]
 */
chase.net.load.all = function(){
	chase.require('chase.element');
	chase.require('chase.element.query');

	var loads = chase.element.select('load');

	for (var i = 0; i < loads.length; i++){
		var load = loads[i];
		if (chase.check.str(chase.element.attr(load, 'href'))){
			var href = chase.element.attr(load, 'href');
			chase.get_(href, function(html){
				load.innerHTML = html;
				// since scripts won't execute off of innerHTML
				// we are going to grab each script tag and
				// eval the contents
				var script = load.querySelectorAll('script');
				for (var j = 0; j < script.length; j++){
					eval(script[j].innerHTML);
				}
			});
		}
	}
}