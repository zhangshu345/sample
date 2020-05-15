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
                            uninstallapp(app.name)
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

var seerewardvideo=function(apppkg){
    sleep(10000)
    gbgg=0
    while(gbgg<20){
        show("关闭广告："+gbgg)
        back()
      if(close_ad_qq(apppkg)){
          return
      }
       if(close_ad_toutiao(apppkg)){
           return 
       }
       if(text("创意视频").findOne(300)){
           return
       }
       if(textoneexist(["点击下载"])){
           back()
       }
       sleep(2000)
       gbgg=gbgg+1
    }
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
    runurlscript("月结套餐稳赚","https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/月结套餐稳赚.js")