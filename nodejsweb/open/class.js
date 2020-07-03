Class = function(){};
Class.extend = function(prop){
	var _super = this.prototype;

	initializing = true;
	var prototype = new this();
	initializing = false;
	fnTest = /xyz/.test(function(){xys;}) ? /\b_super\b/ : /.*/;

	for(var name in prop){
		prototype[name] = typeof prop[name] == "function" &&
			typeof _super[name] == "function" && fnTest.test(prop[name]) ?
			(function(name,fn){
				return function(){
					var tmp = this._super;


					this._super = _super[name];


					var ret = fn.apply(this,arguments);
					this._super = tmp;

					return ret;
				};
				
			})(name,prop[name]) :
			prop[name];

	} 
	function Class(){
		if(!initializing && this.ctor)
			this.ctor.apply(this,arguments);
	}

	Class.prototype = prototype;

	Class.prototype.constructor = Class;

	Class.extend = arguments.callee;
	return Class;
};
module.exports = Class;