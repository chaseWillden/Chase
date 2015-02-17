# chase
A robust library for creating enterprise level applications. This library is not intended to be simple as JQuery, 
but it is supoosed to be much more simple than scratch. This library is intended to follow more of an industry standard
way of coding. (i.e. includes, requires, etc.)

Include Library
---------------
```
<script src='chase/src/core.js'></script>
```

Create a blank hyperlink and center it on the page
--------------------------------------------------
```
chase.include('chase.window');
chase.include('chase.element');
chase.include('chase.style');
chase.include('chase.math');

chase.init(function(){
	chase.element.create('a', {id: 'test'}, function(link){
		link.chase.append('This is a test');
		link.chase.attr('href', '#');
		chase.element.append(document.body, link);
		chase.style.center(link, 'window');
	});
});
```
