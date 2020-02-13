/*我的阅读集合  使用 配置直接从码云获取 配置文件
 */
//快手极速版自动刷金币  签到 和 滑块验证 引流 自动私信 评论 
auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var apppackage="阅读集合"

var 数据库= storages.create("hongshuyuedujihe");

function httpget(url) {
    alter("脚本url:"+url)
        var r = http.get(url);
        // log("code = " + r.statusCode);
        if (r.statusCode == 200) {
            return r.body.string()
        } else {
            return ""
        }
}
var 公共函数url=""
var  公共函数文本=httpget("")

while(true){
    checkinstallapp()
}


