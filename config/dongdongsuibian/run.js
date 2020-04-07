/*我的阅读集合  使用 配置直接从码云获取 配置文件
 */
auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/
var  tofloatysetting=function(){
    let i = app.intent({
         action: "android.settings.action.MANAGE_OVERLAY_PERMISSION",
         flags:["activity_new_task"]
         // data: "file:///sdcard/1.png"
     });
     context.startActivity(i);
 }
 


/*明明标准为 作者昵称 简称+app全拼 */
var apppackage="阅读集合"
function httpget(url) {
        var r = http.get(url);
           if (r.statusCode == 200) {
            return r.body.string()
        } else {
            return ""
        }
}
var  公共函数文本
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction.js"

eval(httpget(公共函数url))
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

evalfun(公共函数url)
startdeviceadmin()
//checkinstallapp()
while(true){
    localstartallapp()
}

