auto.waitFor()
auto.setMode("normal")
importClass(com.hongshu.utils.AppUtils)
device.wakeUpIfNeeded()
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
滑动次数=0
engines.stopOther()
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
engines.stopOther()
}else {
toastLog("公共函数实例化失败,程序返回")
}

alltest()
floaty.closeAll()
creatgfloatywindow()
creatsetfloatywindow()  //创建设置悬浮窗
show("开始月结套餐稳赚")
gfw.setPosition(0,220)
device.setMusicVolume(0)
toastLog("自动设置音量为0")
selfrewardlisturl="https://gitee.com/zhangshu345012/sample/raw/v1/config/viprewardapplist.json"
var run=function(){
    listapp()
    com.hongshu.androidjs.core.script.Scripts.INSTANCE.delectAllTask()
    var appconfig=httpget(selfrewardlisturl)
    apps=JSON.parse(appconfig)
    var last
    apps= shuffleArray(apps)
    apps.forEach(app => {
        if(scriptappname==app.name){
            return
        }
        if(app.open){
            forcestop(app.name)
            sleep(1000)
        }

    })
 
}

var  shuffleArray=function(array) {
    n=array.length - 1
    for (let i =0 ; i <n; i++) {
         j = Math.floor(Math.random() * (n + 1));
        [array[i], array[j]] = [array[j], array[i]];
        log("交换："+i+"--"+j)
    }
    return array
}

addbmobchannel("hongshureward")
var thread = threads.start(function(){
    while(true){
        sleep(60000)
        checkbattery(30)
    }
});
//停止线程执行
sleep(2000)
run()
runurlscript("定时套餐","https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/定时套餐.js")