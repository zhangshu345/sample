auto.waitFor()
auto.setMode("normal")
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
    apps.forEach(app => {
           if(last){
               记录今日时长(last.name,last.onetime)
               forcestop(last.name)
           }
            stopOtherScript()
            if(app.open){
                if(!getPackageName(app.name)){
                    downloadApk(app.name,app.downloadurl,true)
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
                    runrewardapp(app.name,app.pkg,app.onetime*60*1000)
               }
            }
     
    })
}

var runrewardapp=function(appname,apppkg,showadtime){
    app.launchApp(appname)
    runtime=showadtime||random(5,10)*60*1000
    runstarttime=date.getTime()
 
    while(date.getTime()-runstarttime<runtime){
        cz=date.getTime()-runstarttime
        show("时间差值："+cz+"当前:"+date.getTime()+"start:"+runstarttime+"<"+runtime)
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
                back()
                sleep(2000)
            }
        }
  

    }
}
addbmobchannel("hongshureward")
while(true){
    sleep(5000)
    run()
}