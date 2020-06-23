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
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
}else {
toastLog("公共函数实例化失败,程序返回")
}
engines.stopOther()
alltest()
floaty.closeAll()
creatgfloatywindow()
creatsetfloatywindow()  //创建设置悬浮窗
show("开始定时套餐5")
if(!gfw){
    show("悬浮未定义")
}
gfw.setPosition(0,220)
device.setMusicVolume(0)
toastLog("自动设置音量为0")
selfrewardlisturl="https://gitee.com/zhangshu345012/sample/raw/v1/config/newrewardapplist.json"
selfscriptpath="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/阅读集合1.js"

// addbmobchannel("yuedutimer5")
readercheck()
localstartreaderapps("阅读集合",selfscriptpath,selfrewardlisturl,true)
//js:runurl:https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/阅读集合1.js
