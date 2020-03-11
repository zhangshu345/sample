var request = require("request");
 var options = {
        url: "http://8yue.xiequbo.cn/api/jiuzhou/noticelist",
       	qs : {//query
       		
        },
        headers:{
            
        },//req.headers
        form: {// form-data
            page:1,
            
        }  //req.body
        // body: filedata   // bin data
    };

    request.post(options, function(error, response, body) {
        console.info('response:' + JSON.stringify(response));
        console.info("statusCode:" + response.statusCode)
        console.info('body: ' + body );
    });

