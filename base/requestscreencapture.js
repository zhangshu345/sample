auto.waitFor()
auto.setMode("normal")


function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
log("公共函数实例化成功")
}
else {
log("公共函数实例化失败,程序返回")
}


while(true){
    if(clicktexts(["不再提醒","不在显示"])){
    }
   if(textclick("立即开始")){
        break
   }
    sleep(2000)
}