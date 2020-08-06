var request = require('request');

//get方式请求
var url = 'http://localhost:8081/yuedu/api/getshare';
request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); // 请求成功的处理逻辑
    }
});