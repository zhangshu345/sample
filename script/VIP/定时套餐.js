auto.waitFor()
auto.setMode("normal")
engines.stopOther()
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

}else {
toastLog("公共函数实例化失败,程序返回")
}

alltest()
floaty.closeAll()
creatgfloatywindow()
creatsetfloatywindow()  //创建设置悬浮窗
show("开始定时套餐")
if(!gfw){
    show("悬浮未定义")
}
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
    let  appruntime={}
    let xiaoshi=0
    let fen=2
    let n_xhcs=0
    while (xiaoshi<24&&n_xhcs<2){
        n_xhcs=n_xhcs+1
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
                    if(!appruntime[app.name]){
                        appruntime[app.name]=0
                    }
                    show("运行时间:"+app.name+":"+appruntime[app.name])
                    if(appruntime[app.name]+runconfig.onetime<runconfig.maxtime){
                         fen=fen+runconfig.onetime/60
                         if(fen>=60){
                            xiaoshi=xiaoshi+1
                            fen=fen-60
                         }
                         if(xiaoshi<=23){
                             com.hongshu.androidjs.core.script.Scripts.INSTANCE.addDailyTask(app.name,app.path,2,xiaoshi,fen)
                             show("设置"+app.name+"运行"+runconfig.onetime+"秒")
                             appruntime[app.name]=appruntime[app.name]+runconfig.onetime
                         }
                        
                    }else{
                        nowruntime=runconfig.maxtime-appruntime[app.name]
                        if(nowruntime>100){
                            show("本次时间:"+nowruntime+"少于一次："+runconfig.onetime)
                            fen=fen+nowruntime/60
                            if(fen>=60){
                               xiaoshi=xiaoshi+1
                               fen=fen-60
                            }
                            if(xiaoshi<=23){
                                com.hongshu.androidjs.core.script.Scripts.INSTANCE.addDailyTask(app.name,app.path,2,xiaoshi,fen)
                                show("设置"+app.name+"运行"+runconfig.onetime+"秒")
                                appruntime[app.name]=runconfig.maxtime
                            }
                        }
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
      //  log("交换："+i+"--"+j)
    }
    return array
}

addbmobchannel("hongshureward")
// var thread = threads.start(function(){
//     while(true){
//         sleep(60000)
//         checkbattery(30)
//     }
// });
//停止线程执行

run()
