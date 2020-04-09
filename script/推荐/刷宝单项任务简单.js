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

var appname="刷宝短视频"
show("开始刷宝短视频辅助滑动")
toastLog("指定："+appname+"即将启动")
home()
if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname)
    刷宝邀请()
}



var apppkg=app.getPackageName(appname)
app.launchApp(appname)
var 刷宝视频恭喜获取关闭按钮id ="com.jm.video:id/imgClose"



while(true){
    if(currentPackage()!=apppkg){
        app.launch(apppkg)
        sleep(1000)
        while(true){
            if(!id("com.jm.video:id/iv_home_search").exists()){
                if(currentPackage()!=apppkg){
                    app.launch(apppkg)
                    sleep(2000)
                }else{
                    back()
                    sleep(2000)
                }
                if(text("首页").exists()){
                    textclick("首页")
                }
            }else{
                break
            }
        }
    }
    if(id(刷宝视频恭喜获取关闭按钮id).exists()){
        back()
        sleep(2000)
    }
    
    if(滑动次数%10==0){
        下滑()
    }else if(滑动次数%10==1){
        上滑()
    }else if(滑动次数%10==2){
         上滑()
    }else if(滑动次数%10==3){
         上滑()
    }else if(滑动次数%10==4){
       下滑()
    }else if(滑动次数%10==5){
        下滑()
    }else if(滑动次数%10==6){
        上滑()
    }else if(滑动次数%10==7){
         上滑()
    }else if(滑动次数%10==8){
         下滑()
    }else if(滑动次数%10==9){
         上滑()
    }else {
        上滑()
    }
    sleepr(8000*ratio,12000*ratio)
    滑动次数=滑动次数+1
}


