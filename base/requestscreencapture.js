const { text } = require("body-parser");

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
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v2/base/allfunction.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
log("公共函数实例化成功")
}
else {
log("公共函数实例化失败,程序返回")
}
while(true){
    if(text("不在提醒").findOne(300))
    if(clicktexts(["不再提醒","不再显示"],300,1500)){
        log("不再出现")
    }
   if(clickonetexts(["立即开始","允许"],100,100)){
       log("点击 立即开始")
       exit()
      return
   }
    sleep(1000)
}