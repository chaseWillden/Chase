/*
*	Establish the chase.network object
*/
chase.net = chase.net || {};

/*
*	Determines if the browser is online or offline
*/
chase.net.online = function(){
	chase.require('chase.browser');
	return navigator.onLine;
}

/*
*	Discovers if the network is connected
* Todo:
*   1) The setinterval isn't working, it's creating an endless loop.
*      The purpose behind this was to create a regular network check.
*/
chase.net.check = function(callback, options, notAgain){
	if (chase.check.func(callback)){
		chase.get_(window.location.href, function(data, xhr){
			var passed = xhr.status == 200;
			if (!notAgain){
				if (chase.check.obj(options) && options.loop){
					var timeout = chase.check.null(options.timeout) ? options.timeout : 15000;
					setInterval(function(){
						callback(passed, xhr.status, xhr.statusText);
						chase.net.check(callback, options, true);
					}, timeout);
				}
				else if (notAgain == undefined){
					callback(passed, xhr.status, xhr.statusText);
				}
			}
		})
	}	
	else{
		chase.ex.param('net.check', 'Function');
	}
}