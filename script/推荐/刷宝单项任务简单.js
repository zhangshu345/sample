auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/




function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}

滑动次数=0
floaty.closeAll()
engines.stopOther()

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
log("公共函数实例化成功")

}else {
log("公共函数实例化失败,程序返回")
}
alltest()
var 刷宝包名="com.jm.video"
var 刷宝首页="com.jm.video.ui.main.MainActivity"
var appname="刷宝短视频"
show("开始刷宝短视频辅助滑动")
creatsetfloatywindow()  //创建设置悬浮窗
toastLog("指定："+appname+"即将启动")
home()
if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname)
    刷宝邀请()
}
var 回到刷宝视频页=function(){
    i=0
   while(i<10){
       i=i+1
       if(currentPackage()!=刷宝包名){
           app.launch(刷宝包名)
           sleep(3000)
       }else{
          if(currentActivity()!=刷宝首页){
                back()
                sleep(2000)
          }
          closedialog()
       }
       if(idallexist(["com.jm.video:id/image_view","com.jm.video:id/comment"])){
           return true
       }
       textclick("首页","推荐")
   }
   return false
}

var apppkg=app.getPackageName(appname)
app.launchApp(appname)
var 刷宝视频恭喜获取关闭按钮id ="com.jm.video:id/imgClose"

var 视频次数=0

while(true){
    if(currentPackage()!=apppkg){
        app.launch(apppkg)
        sleep(1000)
        while(true){
            if(!idallexist(["com.jm.video:id/image_view","com.jm.video:id/comment"])){
                if(currentPackage()!=apppkg){
                    app.launch(apppkg)
                    sleep(2000)
                }else{
                    back()
                    sleep(2000)
                }
                if(text("首页").exists()){
                    textclick("首页")
                    textclick("推荐")
                }
            }else{
                break
            }
        }
    }
    if(id(刷宝视频恭喜获取关闭按钮id).exists()){
        back()
        textclick("首页")
        textclick("推荐")
        sleep(2000)
    }
    c=1
    while(c<视频重复次数){
        滑动(20,13,16,10,4,500,500)
        滑动次数=滑动次数+1
        sleepr(8000*ratio,12000*ratio)
        下滑()
        sleepr(8000*ratio,12000*ratio)
        滑动次数=滑动次数+1
        c=c+1
    }
    视频次数=视频次数+1
    sleepr(8000*ratio,12000*ratio)
    滑动(20,13,16,10,4,500,500)
    滑动次数=滑动次数+1
    视频次数=视频次数+1
    sleepr(8000*ratio,12000*ratio)
}


