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
    downloadandinstallapp(appname,apppkg)
   
}

var waitvideoad=function(){
    i=0
    while(i<20){
        sleep(3000)
       
        textclick("关闭广告")
        sleep(1500)
        textclick("继续推出")
    }
}

var waitvideoadandinstall=function(){
    i=0
    while(i<20){
        sleep(3000)
        
       if(text("安装再领300金币").exists()){
           temappname=id("com.ss.android.ugc.livelite").findOne(500).text()
           
           textclick("安装再领300金币")
           install_app()
           if(temappname){
               uninstallappbyname(temappname)
           }
           return
       }
    }
}

toastLog("开始火山极速版")
var apppkg="com.ss.android.ugc.livelite"  //  app.getPackageName(appname)
app.launchApp(appname)
threads.start(火山极速版邀请(), )

var 视频次数=0
 var seevideofinish=false  //看海量视频 任务完成 
while(true){
         if(!idContains(apppkg).findOne()){
                    app.launch(apppkg)
                    sleep(2000)
                }else{
                    back()
                    sleep(2000)
                }
            
                if(textclick("注册/登录")){
                    text("微信登录").waitFor()
                    textclick("微信登录")
                    sleep(1000)
          }
  
    if(text("登录立即可得8元").exists()){
        back()
        sleep(1000)
        text("登录").waitFor()
        textclick("登录")
        text("微信登录").waitFor()
        textclick("微信登录")
        sleep(1000)
    }
    if(textclick("点击激活")){
        text("去红包页面")
        if(textclick("去红包页面")){
            text("金币").waitFor()
            text("兑换").waitFor()
            if(text("签到").exists()){
                if (textclick("签到")){
                    sleep(1000)
                    back()
                }
            }
        }
    }
    if(text("开宝箱得金币").exists()){
       if( textclick("开宝箱得金币")){
            sleep(2000)
            if(textclick("看视频 领双倍金币")){
                 waitvideoad() 
            }
        }
    }
    //看海量视频任务
    if(!seevideofinish){
        if(text("看视频赚海量金币").exists()){
            var hlsp=textContains("每次最高得100金币").findOne(500)
             t=hlsp.text()
             log("取出当前提醒："+t)
             i=t.substring(t.indexOf("成"),t.indexOf("\/"))
             log("取出当前次数："+i)
             i=Number(i)
             if(i<20){
                if( textclick("看视频赚海量金币")){
                    //这个是安装赚金币 之后要卸载
                    waitvideoadandinstall()
                }
             }else{
                 seevideofinish=true
             }
        }
    }
   
    if(textclick("首页")){
        while(n<30){
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
            n=n+1
        }
      
    }

}


