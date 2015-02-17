/*
*	Establish the chase.element object
*/
chase.element = chase.element || {};

/*
*	Define the type of this module
*/
chase.element.type = chase.GLOBAL;

/*
*	Define the current element
*/
chase.element.curr_ = null;

/*
*	Create a new element
*/
chase.element.create = function(name, attrsObj, callback){
	if (chase.check.str(name)){
		if (chase.check.func(callback) && chase.deps.check('chase.element.' + name)){
			chase.include('chase.element.a', function(){
				var url = attrsObj.url ? attrsObj.url : null;
				var a = chase.element.a.create(name, url);
				callback(a);
			});	
		}
		else{
			var ele = document.createElement(name);
			if (chase.check.obj(attrsObj)){
				var keys = Object.keys(attrsObj);
				for (var i = 0; i < keys.length; i++){
					ele[keys[i]] = attrsObj[keys[i]];
				}
			}
			return ele;
		}
	}
	else{
		chase.ex.param('element', 'String');
	}
}

/*
*	Append an element to another
*/
chase.element.append = function(parent, child){
	if (this.type == chase.SPECIFIC){
		child = parent;
		parent = this.curr_;
	}
	if (chase.check.ele(parent) && chase.check.str(child)){
		parent.innerHTML += child;
	}
	else if (chase.check.ele(child)){
		parent.appendChild(child);
	}
}

/*
*	Get the width of an element
*/
chase.element.width = function(ele){
	if (this.type == chase.SPECIFIC){
		ele = this.curr_;
	}
	if (chase.check.ele(ele)){
		return ele.offsetWidth;
	}
	else{
		chase.ex.param('Element', 'Element');
	}
}

/*
*	Get the height of an element
*/
chase.element.height = function(ele){
	if (this.type == chase.SPECIFIC){
		ele = this.curr_;
	}
	if (chase.check.ele(ele)){
		return ele.offsetHeight;
	}
	else{
		chase.ex.param('Element', 'Element');
	}
}

/*
*	Add an attribute to the element
*/
chase.element.attr = function(ele, name, value){
	if (this.type == chase.SPECIFIC){
		ele = this.curr_;
	}
	if (chase.check.ele(ele) && chase.check.str(name)){
		if (chase.check.str(value)){
			ele[name] = value;
		}
		else{
			return ele[name];
		}
	}
	else{
		chase.ex.param('element.attr', 'Element or String');
	}
}