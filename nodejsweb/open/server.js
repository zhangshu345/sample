var http = require('http');
var Init = require('./Init');
var log4js  = require('log4js');
var handler = require('./Handler');
var url = require('url');
var qs = require('querystring');
log4js.configure({
	appenders:[
		{type: 'console'},{
		 type: 'dateFile',
		 filename: 'logs/log',
		 pattern: '-yyyy-MM-dd.log',
		 maxLogSize: 1024,
		 alwaysIncludePattern:false,
		 backups: 4,
		 category: ['console','logger']
		}
	],
	replaceConsole: true
});
function start(pool){
	 console.log('open');
	 Init.LoadRoles(pool);
	 var roleMap = global.varA;
	 handler.Handler(roleMap);
	 var Method = require('./RegisterMethod.js').RegisterMethod;
	 var Method = new Method();

	 function onRequest(req,res){
	 	console.log('****************************************************');
	 	console.log(req.connection.remoteAddress);


	 	//网页式访问 
	 	var path = url.parse(req.url).pathname;
	 	var arg = url.parse(req.url).query;
	 	if(path.length>1){
	 		var urlpath = path.substring(1,path.length);
	 		console.log(urlpath);
	 		if(Method.getMethod(urlpath)==null){
	 			console.log("urlpath==null");
	 			res.end(JSON.stringify({error:404}));
	 			return;
	 		}else if(arg==null){
	 			console.log("arg==null");
	 			res.end(JSON.stringify({error:500}));
	 			return;
	 		}else{
	 			console.log(qs.parse(arg));
	 			var urldata = JSON.stringify(qs.parse(arg));
	 			res.setHeader('content-type','text/html;charset=UTF-8');
	 			Method.getMethod(urlpath)(res,urldata,pool,roleMap);
	 			return;
	 		}
	 	}
        //end


        var data = "";
		req.addListener("data",function(postDataChunk){
			   data +=postDataChunk;
		});
		req.addListener("end",function(){ 
			try{
				console.log(data);
				var i = data.indexOf('=');
				console.log(data.substring(0,i));
				if(i!=0){
					var method = data.substring(0,i);
					var d = data.substring(i+1);
					if(Method.getMethod(method)=null){
						res.end(JSON.stringify({error:-1002}));

					}else{
						Method.getMethod(method)(res,d,pool,roleMap);
					}
				}
				

			}catch(e){
				res.end(JSON.stringify({error:-1001}));

			}
 
		});
	 }
	 http.createServer(onRequest).listen(1337);
	 console.log("Server has started");
}
exports.start = start;
 