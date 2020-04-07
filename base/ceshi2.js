function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
var  公共函数文本
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/%E5%9F%BA%E7%A1%80/allfunction.js"
function evalfun(url){
funstr=httpget(url)
if (funstr != "") {
    eval(funstr)
    log("实例化成功："+url)
}
else {
    log("实例化失败,程序返回")
}
}

eval(httpget(公共函数url))

startdeviceadmin()




