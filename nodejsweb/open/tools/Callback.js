var extend=function(errorcode,n,override){
	var o = {error:errorcode};
	for(var p in n)
		if(n.hasOwnProperty(p)&&(!o.hasOwnProperty(p)||override))
			o[p]=n[p];
	console.log("返回数据");
	console.log(JSON.stringify(o));
	return JSON.stringify(o);
};
exports.extend = extend;
// console.log(extend(0));