 var HashMap = require('./tools/HashMap.js').HashMap;
 var player = require("./player");

 function LoadRoles(pool){
 	var roleMap = new HashMap();
 	pool.getConnection(function(err,conn){
 		var selectSQL = 'select * from role';
 		if(err)
 			console.log('POOL ==>' + err);
 		conn.query(selectSQL,function(err,rows){
 			if(err)
 				console.log(err);
 			console.log('SELECT ==>');
 			for(var i=0;i<rows.length;i++){
 				var jsonrole = JSON.stringify(rows[i]);
 				var role = JSON.parse(jsonrole);
 				var p = new player(role.uid,'');
 				p.getplayer().role = jsonrole;
 				roleMap.put(role.uid,p);
 			}
 			console.log('初始化-------------');
 			conn.release();
 		});
 	});
 	global.varA = roleMap;
 }

 exports.LoadRoles = LoadRoles;