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

device.setMusicVolume(0)
toastLog("自动设置音量为0")
var appname="淘金号"
var apppkg="com.xubai.taojinhao"
show("开始"+appname+"辅助滑动")
creatsetfloatywindow()  //创建设置悬浮窗
toastLog("指定："+appname+"即将启动")
home()
if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
   
}

app.launchApp(appname)
var 视频次数=0
// 
//  视频广告页面 广告  今日头条的视频广告关闭按钮  com.xubai.taojinhao:id/tt_video_ad_close_layout   点我砸金蛋   出现弹窗双倍 广告
var 滑动页面标记=["com.xubai.taojinhao:id/read_progress_container","com.xubai.taojinhao:id/home_tab_img"]
while(true){
    if(!idallexist(滑动页面标记)){
        if(!idContains(apppkg).findOne(1000)){
            app.launch(apppkg)
            sleep(3000)
            i=0
            while(i<10){
                i=i+1
                if(!idallexist(滑动页面标记)){
                    if(idContains(apppkg).findOne(1000)){
                        log("找到存在包名id控件")
                        app.launch(apppkg)
                        sleep(3000)
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
        clickonetexts(["首页","推荐"])
    }
  
    c=1
    while(c<视频重复次数){
        滑动(20,13,16,10,4,500,500)
        滑动次数=滑动次数+1
        视频次数=视频次数+1
        sleepr(8000*ratio,12000*ratio)
        c=c+1
    }
    滑动(20,13,16,10,4,500,500)
    滑动次数=滑动次数+1
    视频次数=视频次数+1
    sleepr(8000*ratio,12000*ratio)
}


