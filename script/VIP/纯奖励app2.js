auto.waitFor()
auto.setMode("normal")
importClass(com.hongshu.utils.AppUtils)
device.wakeUpIfNeeded()
selfscriptpath="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/纯奖励app2.js"
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
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
    toastLog("公共函数实例化前,程序返回")
eval(公共函数文本)
toastLog("公共函数实例化成功,程序返回")
engines.stopOther()
}else {
toastLog("公共函数实例化失败,程序返回")
}

checkfloaty()
checksystemsettings()
floaty.closeAll()
creatgfloatywindow()
creatsetfloatywindow()  //创建设置悬浮窗
show("开始纯激励APP 2")
gfw.setPosition(0,220)
device.setMusicVolume(0)
toastLog("自动设置音量为0")
selfrewardlisturl="https://gitee.com/zhangshu345012/sample/raw/v1/config/adapplist.json"
var run=function(){
    listapp()
    var appconfig=httpget(selfrewardlisturl)
    apps=JSON.parse(appconfig)
    var last
    apps= shuffleArray(apps)
    apps.forEach(app => {
        if(scriptappname==app.name){
            return
        }
        if(app.open){
            forcestop(app.name,1500,true)
            sleep(1000)
        }
    })
    apps.forEach(app => {
        if(scriptappname==app.name){
            return
        }
        device.wakeUpIfNeeded()
           if(last){
               记录今日时长(last.name,last.onetime)
               forcestop(last.name)
               今日记录("rewardadlastapp","lastapp",app.name)
               if(app.name==last.name){
                   show("和上一次操作APP相同 直接跳过，进行下一个")
                   return 
               }
           }
            stopOtherScript()
            if(app.open){
                if(!getPackageName(app.name)){
                    downloadApk(app.name,app.downloadurl,true)
                }else{
                    if(app.version>1&&app.downloadurl){
                        if(AppUtils.getAppVersionCode(app.pkg)<app.version){
                            downloadApk(app.name,app.downloadurl,true)
                        }
                    }
                }
                if(app.scripturl && getPackageName(app.name)){
                    log(app.name+":云端url脚本存在："+app.scripturl)
                    floaty.closeAll()
                    gfw=null
                    content=httpget(app.scripturl)
                    if(content){
                       engines.execScript(app.name,content, {"useFeatures":["continuation"]})
                       last=app
                       sleep(app.onetime*60*1000)
                    }
               }else{
                   last=app
                   log("运行："+app.name)
                  runrewardapp(app.name,app.pkg,app.onetime*60000)
               }
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

addbmobchannel("rewardad")
var thread = threads.start(function(){
    while(true){
        sleep(60000)
        checkbattery(30)
    }
});
//停止线程执行

com.hongshu.androidjs.core.script.Scripts.INSTANCE.delectAllTask()
sleep(1000)
for(i_t=0;i_t<5;i_t++){
    com.hongshu.androidjs.core.script.Scripts.INSTANCE.addDailyTask("激励套餐",selfscriptpath,2,i_t*4,randomint(0,10))
}
sleep(2000)
while(true){
    try {
        run()
    } catch (error) {
        toastLog(error)
    }
    
}

