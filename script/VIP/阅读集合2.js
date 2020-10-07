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
selfrewardlisturl="https://gitee.com/zhangshu345012/sample/raw/v2/config/newrewardapplist.json"
selfscriptpath="https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/阅读集合2.js"
//addbmobchannel("yuedutimer5")
readercheck()
runapps=["快手极速版","刷宝短视频","天天爱清理","彩蛋视频","小糖糕","火火视频极速版","趣铃声","铃声秀","快音","快看点","酷狗音乐大字版","荔枝铃声","米读极速版"]
startreaderapps("阅读集合最新版本自动提现",selfscriptpath,selfrewardlisturl,"阅读集合2",true,true)
//js:runurl:https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/阅读集合2.js
