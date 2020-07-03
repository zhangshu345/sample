var Callback = require('../tools/Callback');
var CheckParameters = function(res,data,parameters){
	var nofind = false;
	for(var i=0;i<parameters.length;i++){
		if(data[parameters[i]]==null){
			console.log(parameters[i]+':'+data[parameters[i]]);
			nofind = true;
		}
	}
	if(nofind){
		var str = Callback.extend(-1);
		res.write(str);
		res.end();
	}
	return nofind;
};
exports.CheckParameters = CheckParameters;