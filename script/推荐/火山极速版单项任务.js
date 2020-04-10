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

var appname="火山极速版"
show("开始火山极速版辅助滑动")
creatsetfloatywindow()  //创建设置悬浮窗
toastLog("指定："+appname+"即将启动")
home()
if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname)
   
}

toastLog("开始火山极速版")
var apppkg="com.ss.android.ugc.livelite:id/yx"  //  app.getPackageName(appname)
app.launchApp(appname)
threads.start(火山极速版邀请(), )

var 视频次数=0

while(true){
              if(!idContains(apppkg).findOne()){
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


