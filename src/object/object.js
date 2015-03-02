/**
 * Establish the chase.object object
 * @type {Object}
 */
chase.object = chase.object || {};

/**
 * Set the Object prototype to chase.object
 * @type {Object}
 */
chase.object.PROTOTYPE = Object.prototype;

/*
* object.watch v0.0.1: Cross-browser object.watch
*
* By Elijah Grey, http://eligrey.com
*
* A shim that partially implements object.watch and object.unwatch
* in browsers that have accessor support.
*
* Public Domain.
* NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
*/

// object.watch
chase.object.PROTOTYPE.watch = function (prop, handler) {
  var oldval = this[prop], newval = oldval,
  getter = function () {
    return newval;
  },
  setter = function (val) {
    oldval = newval;
    return newval = handler.call(this, prop, oldval, val);
  };
  if (delete this[prop]) { // can't watch constants
    if (Object.defineProperty) // ECMAScript 5
      Object.defineProperty(this, prop, {
        get: getter,
        set: setter
      });
    else if (chase.object.PROTOTYPE.__defineGetter__ && chase.object.PROTOTYPE.__defineSetter__) { // legacy
      chase.object.PROTOTYPE.__defineGetter__.call(this, prop, getter);
      chase.object.PROTOTYPE.__defineSetter__.call(this, prop, setter);
    }
  }
};

// object.unwatch
chase.object.PROTOTYPE.unwatch = function (prop) {
  var val = this[prop];
  delete this[prop]; // remove accessors
  this[prop] = val;
};