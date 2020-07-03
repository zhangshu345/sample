var HashMap = require('./tools/HashMap.js').HashMap;
var methodMap = new HashMap();
var dirWalker = require('./tools/DirWalker');
var fs = require('fs');
function handFile(path,floor){
	var blankStr = '';
	for(var i=0;i<floor;i++){
		blankStr+='    ';
	}
	fs.stat(path,function(err1,stats){
		if(err1){
			console.log('stat error');
		}else{
			if(stats.isDirectory()){
				// console.log('-' + blankStr + path);

			}else{
				// console.log('ccc' + blankStr + path);
				var temp = require(path).module;
				console.log(temp);
				var key =''+temp.name;
				methodMap.put(key,temp);
			}
		}
	})
}
function Method(){
	console.log('注册请求');
	dirWalker.walk('./method',0,handFile);
	this.getMethodMap = function(){
		return methodMap;
	}
	this.getMethod = function(method){
		return methodMap.get(method);
	}
}
exports.RegisterMethod = Method;