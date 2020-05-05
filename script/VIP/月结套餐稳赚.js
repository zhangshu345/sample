auto.waitFor()
auto.setMode("normal")
importClass(com.hongshu.utils.AppUtils)
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
滑动次数=0
engines.stopOther()
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
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
device.wakeUpIfNeeded()
toastLog("自动设置音量为0")
selfrewardlisturl="https://gitee.com/zhangshu345012/sample/raw/v1/config/viprewardapplist.json"
var run=function(){
    
    var appconfig=httpget(selfrewardlisturl)
     apps=JSON.parse(appconfig)
    var last
   apps= shuffleArray(apps)

    apps.forEach(app => {
           if(last){
               记录今日时长(last.name,last.onetime)
               forcestop(last.name)
               今日记录("lastapp",app)
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
                    if(AppUtils.getAppVersionCode(app.pkg)<app.version){
                        uninstallapp(app.name)
                        downloadApk(app.name,app.downloadurl,true)
                    }
                }
                if(app.scripturl && getPackageName(app.name)){
                    log(app.name+":云端url脚本存在："+app.scripturl)
                    content=httpget(app.scripturl)
                    if(content){
                       engines.execScript(app.name,content, {"useFeatures":["continuation"]})
                       last=app
                       sleep(app.onetime*60*1000)
                    }
               }else{
                   last=app
                   log("运行："+app.name)
                   // runrewardapp(app.name,app.pkg,app.onetime*60*1000)
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
var runrewardapp=function(appname,apppkg,showadtime){
    app.launchApp(appname)
    appruntime=showadtime||random(5,10)*60*1000
    runstarttime=nowdate().getTime()
 
    while(nowdate().getTime()-runstarttime<appruntime){
        cz=nowdate().getTime()-runstarttime
      
        if(!idContains(apppkg).findOne(1000)){
            show(appname+"不在前台")
            app.launchPackage(apppkg)
            sleep(5000)
        }else{
            if (textclick("工具箱")){
                show("工具箱点击成功")
                sleep(1500)
                i=0
                r=random(5,10)
                while(i<r){
                 i=i+1
                 滑动(20,10,17,11,3,500,1500)
                 sleep(random(5,10)*1000)
                //  scriptlist=id(apppkg+":id/recyclerView").findOne(1000)
                //  if(scriptlist){
                //     show("scriptlist 找到")
                //      scriptlist.scrollForward()
                //      sleep(random(5,10)*1000)
                //  }else{
                //      show("scriptlist 没有找到")
                //  }
                }
            }else{
               
                show("工具箱点击失败，回到首页")
                sleep(2000)
            }
            maytextclick("跳过")
            clicktexts(["同意并继续","开始授权","允许","允许","允许"],300,1500)
        }
  

    }
}
addbmobchannel("hongshureward")
while(true){
    sleep(5000)
    run()
}