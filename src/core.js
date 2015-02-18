/*
*	Make sure the original chase object is created
*/

var chase = chase || {};

/*
*	Define global consts
*/
chase.GLOBAL = 'global';
chase.SPECIFIC = 'specific';

/*
*	Define the check functions
*/
chase.check = {};

/*
*	Returns if the value is a string
*/
chase.check.str = function(val){
	return typeof val === 'string';
}

/*
*	Returns if the value is a int
*/
chase.check.int = function(val){
	return typeof val === 'number' && val.indexOf('.') < 0;
}

/*
*	Returns if the value is a float
*/
chase.check.float = function(val){
	return typeof val === 'number' && val.indexOf('.') > -1;
}

/*
*	Returns if the value is a number
*/
chase.check.num = function(val){
	return typeof val === 'number';
}

/*
*	Returns if the value is an array
*/
chase.check.array = function(val){
	return Object.prototype.toString.call(val) === '[object Array]';
}

/*
*	Returns if the value is an object
*/
chase.check.obj = function(val){
	return Object.prototype.toString.call(val) === '[object Object]';
}

/*
*	Returns if the value is a function
*/
chase.check.func = function(val){
	return Object.prototype.toString.call(val) === '[object Function]';
}

/*
*	Returns not null or undefined
*/
chase.check.null = function(val){
	return val === undefined || val === null;
}

/*
*	Returns if the value is an element
*/
chase.check.ele = function(val){
	return chase.check.str(val.tagName) && val.tagName.length > 0;
}

/*
*	Verifies the module loaded
*/
chase.check.loaded = function(module){
	var split = module.split('.');
	var parent = window;
	for (var i = 0; i < split.length; i++){
		if (!chase.check.obj(parent[split[i]])){
			return false;
		}
		parent = parent[split[i]];
	}
	return true;
}

/*
*	Determines if the property is part of the object
* and the object property contains value
*/
chase.check.prop = function(obj, prop){
	if (chase.check.obj(obj)){
		return obj[prop] && chase.check.null(obj[prop]);
	}
	return false;
}

/*
*	Set the ex object
*/
chase.ex = {};

/*
* Throw parameters exception
*/
chase.ex.param = function(lib, type){
	throw new String('Expected parameters in "' + lib + '" to be ' + type);
}

/*
*	Throw expected exception
*/
chase.ex.exception = function(msg){
	throw new String(msg);
}

/*
*	Throws a required exception
*/
chase.ex.required = function(what, where){
	throw new String('Required ' + what + ' in ' + where);
}

/*
*	check deps object
*/
chase.deps = chase.deps || {};

/*
*	Get the module path
* This is just a quick way to get the path
*/
chase.deps.modules = {
	'chase.window': 'window/window.js',
	'chase.element': 'element/element.js',
	'chase.element.a': 'element/a.js',
	'chase.style': 'style/style.js',
	'chase.math': 'math/math.js',
	'chase.net': 'net/network.js',
	'chase.ui.color': 'ui/color.js',
	'chase.ui.colorpicker': 'ui/colorpicker.js',
	'chase.browser': 'browser/browser.js',
	'chase.flatten': 'util/flatten.js'
};

/*
*	Get the css path of the module
*/
chase.deps.css = {
	'chase.ui.colorpicker': 'ui/colorpicker.css'
};

/*
*	Checks if the path is a depedency
*/
chase.deps.check = function(path){
	return chase.check.str(chase.deps.modules[path]);
}

/*
*	Extends the chase object
*/
chase.extend_ = function(name, val){
	if (chase.check.null(name) && chase.check.null(val)){
		var lib = chase.request_
	}
	else{
		chase.ex.param('extention', 'strings');
	}
}

/*
*	Ajax request
*/
chase.request_ = function(url, method, callback){
	if (chase.check.str(url) && chase.check.str(method)){
		var xmlHttp = null;
		method = method.toUpperCase();
	  xmlHttp = new XMLHttpRequest();
	  xmlHttp.onreadystatechange = function(){
		  if (this.readyState == 4){
		  	if (this.status == 200 && chase.check.func(callback)){
		  		callback(this.responseText, this);
		  	}
		  	else{
		  		chase.ex.exception('Unable to load ' + url);
		  	}
		  }
	  }
	  xmlHttp.open( method, url, true );
	  xmlHttp.send( null );
	}
	else{
		chase.ex.param('request', 'strings');
	}
}

/*
*	Get request
*/
chase.get_ = function(url, callback){
	return chase.request_(url, 'GET', callback);
}

/*
*	Get the current path of this file
*/
chase.path_ = function(){
	var scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++){
		var script = scripts[0];
		if (chase.check.str(script.src) && script.src.indexOf('core.js') > 0){
			return script.src.replace('core.js', '');
		}
	}
	chase.ex.exception('Unable to retrieve path');
}

/*
*	Loading const
*/
chase.LOADING = 0;

/*
*	INIT function
*/
chase.INIT = null;

/*
*	This will load certain modules. This is the base lazy load function
*/
chase.load_ = function(module, callback){
	if (chase.check.str(module) && chase.deps.check(module)){
		chase.LOADING++;
		var path = chase.deps.modules[module];
		chase.get_(chase.path_() + path, function(lib){
			eval(lib);
			chase.LOADING--;
			if (chase.check.func(callback)){
					callback();
			}
			else if (chase.LOADING === 0 && chase.check.func(chase.INIT)){
				chase.INIT();
				chase.INIT = null;
			}
			if (!chase.check.loaded(module)){
				chase.ex.param('Unable to load ' + module);
			}
		});
	}
	else{
		chase.ex.param('include', 'strings');
	}
}

/*
*	Include a module in the file
*/
chase.include = function(module, callback){
	if (chase.check.str(module) && chase.deps.check(module)){
		chase.load_(module, callback);
	}
	else{
		chase.ex.exception('Unable to load module ' + module);
	}
}

/*
*	This will fire once everything is loaded
*/
chase.init = function(callback){
	if (chase.check.func(callback)){
		chase.INIT = callback;
	}
	else{
		chase.ex.param('core', 'Function');
	}
}

/*
*	This will check if the module already has been included
*/
chase.require = function(module, where){
	if (!chase.check.loaded(module)){
		chase.ex.required(module, where);
	}
}

/*
*	Attach the chase object to window
*/
window.chase = chase;