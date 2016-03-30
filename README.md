# chase
A robust library for creating enterprise level applications. This library is not intended to be simple as JQuery, 
but it is supoosed to be much more simple than scratch. This library is intended to follow more of an industry standard
way of coding. (i.e. includes, requires, etc.)

Include Library
---------------
When using this library, not everything is loaded all at once. This is helpful when only certain aspects of this library
is meant to be used while others are not.
```
<script src='chase/src/core.js'></script>
```

Include other modules
---------------------
Modules are included outside of the init function. The init function runs after all is loaded. 
If there are other dependencies, error's will be thrown.

 - [] test

Create a dynamic colorpicker
--------------------------------------------------
```
chase.include('chase.ui.color');
chase.include('chase.ui.colorpicker');
chase.include('chase.element');
chase.include('chase.style');
chase.include('chase.window');

chase.init(function(){
	var btn = chase.element.select('#dynamic')[0];
	chase.element.event(btn, 'click', function(ele){
		chase.ui.colorpicker.create(function(color){
			document.body.style.backgroundColor = color;
		}, {
			below: btn
		});
	});
});
```

Todos
-----
 - https://github.com/gildas-lormeau/zip.js
