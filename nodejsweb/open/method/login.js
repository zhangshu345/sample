var Callback = require('../tools/Callback');
var Check = require('../tools/CheckParameter');
var parameters = ['user','passwd'];
function login(res,data,pool,roleMap){
	console.log('收到登录请求');
	var userd = JSON.parse(data);
	if(Check.CheckParameters(res,userd,parameters)){
		return;
	}
	pool.getConnection(function(err,conn){
		var uid =0;
		if(err)
			console.log('POOL==>'+err);
		var values =[userd.user,userd.passwd];
		conn.query(selectSQL,values,function(err,rows){
        	if(err)
        		console.log(err);
        	console.log(err);
        	console.log('SELECT==>');
        	for(var i in rows){
        		console.log(rows[i]);
        		var str = JSON.stringify(rows[i]);
        		var u = JSON.parse(str);
        		uid = u.uid;
        		break;
        	}
        	console.log("查询获得玩家账号id");
        	console.log(uid);
        	if(uid!=0){
        		//根据账号id 查询时否已经创建过玩家
        		selectSQL = 'select * from role where uid=?';
        		values = [uid];
        		conn.query(selectSQL,values,function(err,rows){
        			if(err)
        				console.log(err);
        			console.log('SELECT2==>');
        			var hasrole = 0;
        			for(var i in rows){
	        			console.log('获得玩家数据');
	        			var str = Callback.extend(0,rows[i]);
	        			res.write(str);
	        			var jsonrole = JSON.stringify(rows[i]);
	        			var role = JSON.parse(jsonrole);
	        			if(role.pets==null){
	        				console.log('宠物数据为空');
	        			}
	        			var player = roleMap.get(role.uid);
	        			player.username = userd.user;
	        			player.role = jsonrole;
	        			roleMap.put(role.uid,player);
	        			console.log('登录成功返回存在玩家');
	        			res.end();
	        			break;
        			} 
	        		if(hasrole==0){
	        			console.log('账号登录成功未创建玩家');
	        			var str = Callback.extend(5,{uid:uid});
	        			res.write(str);
	        			res.end();
	        		}
        		});
        	}else{
        		console.log('账号或则密码错误');
        		res.write(Callback.extend(4));
        		res.end();
        	}
        	conn.release();
		});
	});

}
exports.module = login;