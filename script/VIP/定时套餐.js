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
show("开始定时套餐")
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
    
    appruntime=[]
    let xiaoshi=0
    let fen=2
    while (xiaoshi<24){
        apps= shuffleArray(apps)
        apps.forEach(app => {
            show("开始设置："+app.name)
            if(scriptappname==app.name){
                return
            }
            if(app.open){
                show(app.name+"启动")
                let runconfig=app.runconfig
                if(runconfig&&app.path){
                    fen=fen+runconfig.onetime/60
                    if(fen>=60){
                        xiaoshi=xiaoshi+1
                        fen=fen-60
                    }
                    if(xiaoshi<=23){
                        show("设置"+app.name+"运行"+runconfig.onetime+"秒")
                        com.hongshu.androidjs.core.script.Scripts.INSTANCE.addDailyTask(app.name,app.path,2,xiaoshi,fen)
                    }
                }
            }
    
        })
    }
    
    sleep(2000)
    show("开始强制关闭运行app")
    apps.forEach(app => {
        if(scriptappname==app.name){
            return
        }
        if(app.open){
            forcestop(app.name)
        }
    })
    let app=apps[0]

    runurlscript(app.name,app.path)
 
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
