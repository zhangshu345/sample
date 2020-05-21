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
selfrewardlisturl="https://gitee.com/zhangshu345012/sample/raw/v1/config/newrewardapplist.json"
selfscriptpath="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/定时套餐.js"
var run=function(){
    listapp()
    com.hongshu.androidjs.core.script.Scripts.INSTANCE.delectAllTask()
    sleep(1000)
    com.hongshu.androidjs.core.script.Scripts.INSTANCE.addDailyTask("定时套餐",selfscriptpath,2,0,0)
    var appconfig=httpget(selfrewardlisturl)
    apps=JSON.parse(appconfig)
    apps= shuffleArray(apps)
    let xiaoshi=0
    let fen=1
    apps.forEach(app => {
        if(scriptappname==app.name){
            return
        }
        if(app.open){
            let runconfig=app.runconfig
            if(runconfig&&runconfig.path){
                fen=fen+runconfig.onetime/60
                if(fen>=60){
                    xiaoshi=xiaoshi+1
                    fen=fen-60
                }
                if(xiaoshi<=23){
                    com.hongshu.androidjs.core.script.Scripts.INSTANCE.addDailyTask("测试定时",run,runconfig.path,xiaoshi,fen)
                }
            }
        }

    })
    apps.forEach(app => {
        if(scriptappname==app.name){
            return
        }
        if(app.open){
            forcestop(app.name)
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