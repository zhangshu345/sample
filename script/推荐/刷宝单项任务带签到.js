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
var 刷宝包名="com.jm.video"
var 刷宝首页="com.jm.video.ui.main.MainActivity"
var appname="刷宝短视频"
show("开始刷宝短视频辅助滑动")
creatsetfloatywindow()  //创建设置悬浮窗
toastLog("指定："+appname+"即将启动")
home()
if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,刷宝包名)
   
}
刷宝邀请()
toastLog("刷宝邀请完成")
var apppkg= "com.jm.video"  //app.getPackageName(appname)
app.launchApp(appname)
var 刷宝视频恭喜获取关闭按钮id ="com.jm.video:id/imgClose"


var 视频次数=0
var 刷宝登录=function(){
    while(true){
        log("刷宝登录")
           if(!idContains("com.jm.video").findOne(1000)){
                log("没有找到存在包名id控件")
                app.launch(apppkg)
                sleep(3000)
            }else{
                log("找到存在包名id控件")
                back()
                sleep(2000)
            }
            clicktexts(["去授权","允许","允许","允许","我","微信账号登录","同意"],1000,1000)
        if(idallexist(["com.jm.video:id/tv_name","com.jm.video:id/iv_setting"])){
                break
        }else{
            
            
            sleep(1000)
        }
       
        // 
    }
}

var 刷宝视频广告跳过按钮id="com.jm.video:id/tt_top_skip"
var 刷宝视频广告关闭按钮1id="com.jm.video:id/tt_video_ad_close_layout"
var 刷宝视频广告关闭按钮2id="com.jm.video:id/iv_close"

var 回到刷宝视频页=function(){
    i=0
    while (i<10){
        i=i+1
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
        return true
    }
}
}

var 刷宝签到=function(){
    i=0
    while(i<10){
        i=i+1
        "恭喜获取","去邀请","com.jm.video:id/imgClose"
        if(textclick("任务")){
            n=0
            while(n<15){
                n=n+1
                textclick("任务")
            if(textclick("立即签到")){
                sleep(1000)
                if(text("继续赚元宝").exists()){
                    textclick("首页")
                    return false
                }
                sleep(1000)
                if(textclick("看视频签到")){
                    i=0
                    while(i<20){
                        show("等待视频广告3秒")
                        sleep(3000)
                        t= idclick(刷宝视频广告关闭按钮1id)
                        show("点击关闭按钮")
                       if(t ) {
                        show("成功点击关闭按钮")
                         今日已签到("shuabao")
                         return true
                        }
                        t= idclick(刷宝视频广告关闭按钮2id)
                        show("点击关闭按钮")
                       if(t ) {
                         show("成功点击关闭按钮")
                         今日已签到("shuabao")
                         return true
                        }
                        i=i+1
                    }
                }else{
                    下滑()
                    back()
                    return false
                }
            }
            if(id("com.jm.video:id/imgClose").exists()){
                back()
            }
            if(text("继续赚元宝").exists()){
                textclick("首页")
                return false
            }
        }
        }

    
    }
}
刷宝登录()
刷宝签到()

while(true){
    if(!idallexist(["com.jm.video:id/image_view","com.jm.video:id/comment"])){
        if(!idContains(apppkg).findOne(1000)){
            app.launch(apppkg)
            sleep(3000)
            i=0
            while(i<10){
                i=i+1
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
        clickonetexts(["首页","推荐","等待"])
    }
    if(id(刷宝视频恭喜获取关闭按钮id).exists()){
        back()
        textclick("首页")
        textclick("推荐")
        sleep(2000)
    }
    c=1
    if(!idContains(apppkg).findOne(1000)){
        app.launch(apppkg)
        sleep(3000)
        i=0
    }
    while(c<视频重复次数){
        textclick("等待")
        滑动(20,13,16,10,4,500,500)
        回到刷宝视频页()
        滑动次数=滑动次数+1
        sleepr(8000*ratio,12000*ratio)
        下滑()
        sleepr(8000*ratio,12000*ratio)
        滑动次数=滑动次数+1
        c=c+1
    }
    textclick("等待")
    视频次数=视频次数+1
    sleepr(8000*ratio,12000*ratio)
    滑动(20,13,16,10,4,500,500)
    滑动次数=滑动次数+1
    视频次数=视频次数+1
    sleepr(8000*ratio,12000*ratio)
}


