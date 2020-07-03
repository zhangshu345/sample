var rf = require('fs');
function readfile(path){
	var data = rf.readFileSync(path,'utf-8');
	return data;
}
exports.readfile = readfile;