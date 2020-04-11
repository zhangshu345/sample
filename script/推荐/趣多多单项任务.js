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
var apppkg="cn.lingyongqian.bronn"
var appname="趣多多"
show("开始趣多多短视频辅助滑动")
creatsetfloatywindow()  //创建设置悬浮窗
toastLog("指定："+appname+"即将启动")
home()
if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}

toastLog("趣多多完成")

app.launchApp(appname)


var 视频次数=0
var 趣多多首次=function(){
    while(true){
        log("趣多多首次登录")
           if(!idContains("cn.lingyongqian.bronn").findOne(1000)){
                log("找到存在包名id控件")
                app.launch(apppkg)
                sleep(3000)
            }else{
                back()
                sleep(2000)
            }
            log("刷宝登录2")
        if(idallexist(["com.jm.video:id/tv_name","com.jm.video:id/iv_setting"])){
            
                break
        }else{
            back()
            sleep(1000)
        }
        clicktexts(["去授权","允许","允许","允许","我","微信账号登录","同意"],1000,1000)
        // 
    }
}

//同意 允许 允许      新手专享  cn.lingyongqian.bronn:id/ivBeginnerChest  
while(true){
   
    if(!idallexist(["com.jm.video:id/image_view","com.jm.video:id/comment"])){
        if(!idContains(apppkg).findOne(1000)){
            app.launch(apppkg)
            sleep(3000)
            while(true){
                if(!idallexist(["com.jm.video:id/image_view","com.jm.video:id/comment"])){
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


