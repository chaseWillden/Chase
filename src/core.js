/**
 * Ensure the creation of the chase object.
 * @type {Object}
 */
var chase = chase || {};

/**
 * Define the global macro
 * @type {String}
 */
chase.GLOBAL = 'global';

/**
 * Define if the chase object is meant for a specific instance
 * @type {String}
 */
chase.SPECIFIC = 'specific';

/**
 * Define the chase.check object. The chase.check object
 * is used to do any checks on types, or other test related items.
 * @type {Object}
 */
chase.check = chase.check || {};

/**
 * Returns true if the parameter is a string
 * @param  {String}
 * @return {Boolean}
 */
chase.check.str = function(val){
	return typeof val === 'string';
}

/**
 * Returns true if the parameter is an int
 * @param  {Number}
 * @return {Boolean}
 */
chase.check.int = function(val){
	return typeof val === 'number' && val.indexOf('.') < 0;
}

/**
 * Returns true if the value is a float
 * @param  {Number}
 * @return {Boolean}
 */
chase.check.float = function(val){
	return typeof val === 'number' && val.indexOf('.') > -1;
}

/**
 * Returns true if the parameter is a number in general
 * @param  {Number}
 * @return {Boolean}
 */
chase.check.num = function(val){
	return chase.check.float(val) || chase.check.int(val);
}

/**
 * Returns true if the parameter is an array
 * @param  {[type]}
 * @return {[type]}
 */
chase.check.array = function(val){
	return Object.prototype.toString.call(val) === '[object Array]';
}

/**
 * Returns
 * @param  {Object}
 * @return {Boolean}
 */
chase.check.obj = function(val){
	return Object.prototype.toString.call(val) === '[object Object]';
}

/**
 * Returns true if the parameter is a function
 * @param  {Function}
 * @return {Boolean}
 */
chase.check.func = function(val){
	return Object.prototype.toString.call(val) === '[object Function]';
}

/**
 * Returns true if the value is null or undefined
 * @param  {Any}
 * @return {Boolean}
 */
chase.check.null = function(val){
	return val === undefined || val === null;
}

/**
 * Returns true if the value is an element
 * @param  {Element}
 * @return {Boolean}
 */
chase.check.ele = function(val){
	return val['tagName'] && chase.check.str(val.tagName) && val.tagName.length > 0;
}

/**
 * Verifies that the module loaded.
 * @param  {Module}
 * @return {Boolean}
 */
chase.check.loaded = function(module, scope){
	var split = module.split('.');
	var parent = scope || window;
	for (var i = 0; i < split.length; i++){
		if (!chase.check.obj(parent[split[i]])){
			return false;
		}
		parent = parent[split[i]];
	}
	return true;
}

/**
 * Determines if the property is part of the object
 * and the object property contains value
 * @param  {Object}
 * @param  {Property}
 * @return {Boolean}
 */
chase.check.prop = function(obj, prop){
	if (chase.check.obj(obj)){
		return obj[prop] && chase.check.null(obj[prop]);
	}
	return false;
}

/**
 * Ensure the creation of the chase.ex object.
 * This is reserve for exceptions
 * @type {Object}
 */
chase.ex = chase.ex || {};

/**
 * Throw a invalid parameter exception
 * @param  {String}
 * @param  {String}
 * @return {Exception}
 */
chase.ex.param = function(lib, type){
	throw new String('Expected parameters in "' + lib + '" to be ' + type);
}

/**
 * Throw a general exception
 * @param  {String}
 * @return {Exception}
 */
chase.ex.exception = function(msg){
	throw new String(msg);
}

/**
 * Throws a required exception
 * @param  {String}
 * @param  {String}
 * @return {Exception}
 */
chase.ex.required = function(what, where){
	throw new String('Required ' + what + ' in ' + where);
}

/**
 * Ensure the creation of the chase.ex object.
 * This is reserved for chase.include('chase.')'s
 * along with dependency css files and images
 * @type {Object}
 */
chase.deps = chase.deps || {};

/**
 * Get the module path. This is just a quick 
 * way to get the path
 * @type {Object}
 */
chase.deps.modules = {
	'chase.window': 'window/window.js',
	'chase.core': 'core.js',
	'chase.element': 'element/element.js',
	'chase.element.a': 'element/a.js',
	'chase.style': 'style/style.js',
	'chase.math': 'math/math.js',
	'chase.net': 'net/network.js',
	'chase.ui.color': 'ui/color.js',
	'chase.ui.calendar': 'ui/calendar/calendar.js',
	'chase.ui.colorpicker': 'ui/colorpicker/colorpicker.js',
	'chase.ui.alert': 'ui/alert/alert.js',
	'chase.ui.table': 'ui/table/table.js',
	'chase.ui.menu.rightclick': 'ui/menu/rightclick.js',
	'chase.browser': 'browser/browser.js',
	'chase.date': 'date/date.js'
};

/**
 * Get the css path of the module
 * @type {Object}
 */
chase.deps.css = {
	'chase.ui.colorpicker': 'ui/colorpicker/colorpicker.css',
	'chase.ui.calendar': 'ui/calendar/calendar.css',
	'chase.ui.menu.rightclick': 'ui/menu/rightclick.css',
	'chase.ui.alert': 'ui/alert/alert.css'
};

/**
 * Get the img path of the module
 * @type {Object}
 */
chase.deps.img = {
	'chase.ui.colorpicker': 'ui/colorpicker/map.png'
};

/**
 * Checks if the path is a depedency
 * @param  {String}
 * @return {Boolean}
 */
chase.deps.check = function(path){
	return chase.check.str(chase.deps.modules[path]);
}

/**
 * Extending the chase object for 
 * third party libraries
 * @param  {String}
 * @param  {String}
 * @return {Boolean}
 * Todo: 
 * 		1) Get this working
 */
chase.extend_ = function(name, val){
	if (chase.check.null(name) && chase.check.null(val)){
		var lib = chase.request_
	}
	else{
		chase.ex.param('extention', 'strings');
	}
}

/**
 * This is the bare bones for an AJAX request.
 * @param  {String}
 * @param  {String}
 * @param  {Function}
 * @return {Nothing}
 */
chase.request_ = function(url, method, callback){
	if (chase.check.str(url) && chase.check.str(method)){ // Simple checks
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

/**
 * Template for a GET request
 * @param  {String}
 * @param  {Function}
 * @return {Nothing}
 */
chase.get_ = function(url, callback){
	return chase.request_(url, 'GET', callback);
}

/**
 * Get the current path of the file
 * @return {String}
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

/**
 * This constant is used to determine how many 
 * calls are being made currently. This is specifically
 * used in chase.include(). This prevents chase.init()
 * from firing early or too late.
 * @type {Number}
 */
chase.LOADING = 0;

/**
 * This is the variable we hold the init function
 * @type {[type]}
 */
chase.INIT = null;

/**
 * This will load certain modules. This is the base lazy load function
 * @param  {String}
 * @param  {Function}
 * @return {Nothing}
 */
chase.load_ = function(module, callback){
	if (chase.check.str(module) && chase.deps.check(module)){
		chase.LOADING++; // Increment loading before the request
		var path = chase.deps.modules[module];
		chase.get_(chase.path_() + path, function(lib){
			eval(lib); // This is the simple way to compile the script
			chase.CODE += lib; // Add the code to the chase.CODE object
			chase.LOADING--; // Remove the loading from the stack
			if (chase.check.func(callback)){
					callback();
			}
			else if (chase.LOADING === 0 && chase.check.func(chase.INIT)){ // This will run the init function
				chase.INIT();
				chase.INIT = null;
			}
			if (!chase.check.loaded(module)){ // Simple checks
				chase.ex.param('Unable to load ' + module);
			}
		});
	}
	else{
		chase.ex.param('include', 'strings');
	}
}

/**
 * Include a module in the file
 * @param  {String}
 * @param  {Function}
 * @return {Nothing}
 */
chase.include = function(module, callback){
	if (chase.check.str(module) && chase.deps.check(module)){
		chase.load_(module, callback);
	}
	else{
		chase.ex.exception('Unable to load module ' + module);
	}
}

/**
 * This holds the code for everything. When compiling
 * a script outside of dev mode, this gives the raw
 * code.
 * @type {String}
 */
chase.CODE = '';
chase.get_(chase.path_() + 'core.js', function(data){
	chase.CODE = data + chase.CODE;
})

/**
 * This will fire once everything is loaded
 * @param  {Function}
 * @return {Nothing}
 */
chase.init = function(callback){
	if (chase.check.func(callback)){
		chase.INIT = callback;
	}
	else{
		chase.ex.param('core', 'Function');
	}
}

/**
 * This will check if the module already has been included
 * @param  {String}
 * @param  {String}
 * @return {Nothing}
 */
chase.require = function(module, where){
	if (!chase.check.loaded(module)){
		chase.ex.required(module, where);
	}
}

/**
 * Get the image url
 * @param  {String}
 * @return {String}
 */
chase.img = function(module){
	if (chase.check.str(module)){
		if (chase.deps.img[module]){
			return chase.deps.img[module];
		}
		else{
			chase.ex.exception('Invalid image path');
		}
	}
	else{
		chase.ex.param('img', 'String');
	}
}

/**
 * Attach the chase object to window
 * @type {Object}
 */
window.chase = chase;