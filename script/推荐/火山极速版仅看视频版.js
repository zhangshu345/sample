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

var 视频次数=0
 var seevideofinish=false  //看海量视频 任务完成 
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
    while(i<15){
        sleep(3000)
      if(textclick("关闭广告")){
        sleep(1500)
          if(textclick("继续观看")){
              sleep(6000)
          }else{
              return
          }
      }
      i=i+1
   
    }
}
var installappanduninstallapp=function(temappname){
    install_app()
    if(temappname){
        uninstallappbyname(temappname)
    }
}

var waitvideoadandinstall=function(){
    i=0
    while(i<10){
        sleep(3000)
       if(text("安装再领300金币").exists()){
           tem=id("com.ss.android.ugc.livelite:id/title").findOne(500)
           if(tem){
               temappname=tem.text()
           }
           textclick("安装再领300金币")
           threads.start(installappanduninstallapp)
           return
       }
       i=i+1
    }
}


var onlyseevideo=function(){
    while(true){
        if(id("com.ss.android.ugc.livelite:id/a2f").exists()||id("com.ss.android.ugc.livelite:id/rc")){
            c=1
            while(c<视频重复次数){
                if(textclick("领取")){

                }
                if(textContains("剩余").exists()){
                    textContains("剩余").findOne(500).click()
                    sleep(1000)
                    滑动(20,13,16,10,4,500,500)
                }
                滑动(20,13,16,10,4,500,500)
                滑动次数=滑动次数+1
                sleepr(8000*ratio,12000*ratio)
                textclick("领取")
                if(textContains("剩余").exists()){
                    textContains("剩余").findOne(500).click()
                    sleep(1000)
                    滑动(20,13,16,10,4,500,500)
                }
                下滑()
                sleepr(8000*ratio,12000*ratio)
                textclick("领取")
                滑动次数=滑动次数+1
                c=c+1
            }
            
        }
        
 
            back()
            sleep(1200)
           textclick("视频")
                sleep(1000)
           
            textclick("首页")
            click(100,400)
            sleep(1000)

    }
}
toastLog("开始火山极速版")
var apppkg="com.ss.android.ugc.livelite"  //  app.getPackageName(appname)
app.launchApp(appname)
火山极速版邀请()

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

    sleep(1000)
    vide=text("视频").boundsInside(0,0 ,device.width , 300).findOne(500)
    red=text("红包").boundsInside(0,0 ,device.width , 300).findOne(500)
    if(vide&&red){
        log("视频和红包同时在的界面")
       click(100,400)
       sleep(1000)
    }

   if( textclick("首页")){
     sleep(1000)
   }
    
    if(id("com.ss.android.ugc.livelite:id/a2f").exists()||id("com.ss.android.ugc.livelite:id/rc")){
        n=0
        while(n<3000){
            if(!idContains(apppkg).findOne()){
                app.launch(apppkg)
                sleep(2000)
            }else{
            
                sleep(2000)
            }

            if( textclick("关闭广告")){
                sleep(1000)
               }
            if(textContains("剩余").exists()){
                textContains("剩余").findOne(500).click()
                sleep(1000)
                滑动(20,13,16,10,4,500,500)
            }
            c=1
      
            if(id("com.ss.android.ugc.livelite:id/a2f").exists()||id("com.ss.android.ugc.livelite:id/rc")){
                
            }else{
                click(100,400)
                textclick("首页")
            }
        
                if(textclick("领取")){

                }
                if(textContains("剩余").exists()){
                    textContains("剩余").findOne(500).click()
                    sleep(1000)
                    滑动(20,13,16,10,4,500,500)
                }
                滑动(20,13,16,10,4,500,500)
                滑动次数=滑动次数+1
                sleepr(8000*ratio,12000*ratio)
                textclick("领取")
                if(textContains("剩余").exists()){
                    textContains("剩余").findOne(500).click()
                    sleep(1000)
                    滑动(20,13,16,10,4,500,500)
                }
                下滑()
                sleepr(8000*ratio,12000*ratio)
                textclick("领取")
                滑动次数=滑动次数+1
            
         
            
            视频次数=视频次数+1
            sleepr(8000*ratio,12000*ratio)
            if(textContains("剩余").exists()){
                textContains("剩余").findOne(500).click()
                sleep(1000)
                滑动(20,13,16,10,4,500,500)
            }
            textclick("领取")
            滑动(20,13,16,10,4,500,500)
            滑动次数=滑动次数+1
            视频次数=视频次数+1
            sleepr(8000*ratio,12000*ratio)
            n=n+1
        }
    }

}


