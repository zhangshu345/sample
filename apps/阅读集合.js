/*我的阅读集合  使用 配置直接从码云获取 配置文件
 */
auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var apppackage="阅读集合"
var 数据库= storages.create("hongshuyuedujihe");

function httpget(url) {
    log("脚本url:"+url)
        var r = http.get(url);
           if (r.statusCode == 200) {
            return r.body.string()
        } else {
            return ""
        }
}


var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/%E5%9F%BA%E7%A1%80/%E9%98%85%E8%AF%BB%E5%85%AC%E5%85%B1%E5%87%BD%E6%95%B0%E9%9B%86%E5%90%88.js"
var  公共函数文本=httpget(公共函数url)
log(公共函数文本)

if (公共函数文本 != "") {
    eval(公共函数文本)
    log("公共函数实例化成功")
}
else {
    log("公共函数实例化失败,程序返回")
}





while(true){
    startallapp()
}


