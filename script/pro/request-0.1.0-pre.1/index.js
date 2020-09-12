/*
 * @Author: Admin
 * @Date:   2019-10-12 16:22:39
 * @Last Modified by:   Admin
 * @Last Modified time: 2019-10-12 17:01:44
 */
function request(config) {
    var _a = config.url, url = _a === void 0 ? "" : _a, _b = config.method, method = _b === void 0 ? "GET" : _b, _c = config.data, data = _c === void 0 ? {} : _c, _d = config.headers, headers = _d === void 0 ? {
        "Content-Type": "text/html,application/xhtml+xml,application/xml",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko)"
    } : _d, success = config.success, error = config.error;
    var options = {
        headers: headers,
        method: method
    };
    if (method.toUpperCase() == "GET") {
        http.get(url, options, function (res, err) {
            if (err) {
                error(err);
            }
            else {
                success(res);
            }
        });
    }
    else if (method.toUpperCase() == "POST") {
        http.post(url, data, options, function (res) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                success(res);
            }
            else {
                error(res);
            }
        });
    }
}
//例子
request({
    url:"https://www.baidu.com",
    method:"get",
    success:function(res){
        console.log(res)
    },
    error:function(res){
        console.log("错误",res);
    }
})