auto.waitFor()
auto.setMode("normal")
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        toastLog("5秒后继续")
        sleep(5000)
        return httpget(url)
    }
}
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/yuedulib2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
}else {
toastLog("公共函数实例化失败,程序返回")
}
engines.stopOther()
readercheck()
floaty.closeAll()
creatgfloatywindow()
//creatsetfloatywindow()  //创建设置悬浮窗
show("开始阅读集合1")
if(!gfw){
    show("悬浮未定义")
}
gfw.setPosition(0,220)
device.setMusicVolume(0)
toastLog("自动设置音量为0")
scriptpath="https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/阅读集合1.js"
scriptname="阅读集合自动提现版本不更新";
enabletomoney=true;
enableappnew=false;
configpath="https://gitee.com/zhangshu345012/sample/raw/v2/config/scripts/新阅读.json"
issyncwebconfig=false

startjiajiareaderapps(scriptname,scriptpath,enabletomoney,enableappnew,configpath)
//js:runurl:https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/阅读集合1.js
