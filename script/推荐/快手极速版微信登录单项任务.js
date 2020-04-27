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
floaty.closeAll()
var 视频次数=0
 var seevideofinish=false  //看海量视频 任务完成 
滑动次数=0

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
creatgfloatywindow()
show("公共函数实例化成功")
}else {
show("公共函数实例化失败,程序返回")

}

function 快手极速版登录(){
    
    clicktexts(["","登录"])
    text("微信登录").waitFor()
    textclick("微信登录")
    sleep(2000)
    text("登录").waitFor()
    textclick("登录")
    text("微信登录").waitFor()
    textclick("微信登录")
    sleep(1000)
}
onlyscript=true

if(onlyscript){
    engines.stopOther()
}

var appname="快手极速版"
var apppkg="com.kuaishou.nebula"
show("检测快手极速版是否安装安装")
creatsetfloatywindow()  //创建设置悬浮窗


if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}
home()

toastLog("开始快手极速版")
app.launchApp(appname)
快手极速版邀请()
while(true){
         if(!idContains(apppkg).findOne()){
                    app.launch(apppkg)
                    sleep(3000)
                }else{
                    back()
                    sleep(2000)
                }
     if(textclick("注册/登录")){
        快手极速版登录()
      }
  
    if(text("登录立即可得8元").exists()){
        back()
        sleep(1000)
        快手极速版登录()
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
            if(textclick("看视频 领双倍金币")){
                 waitvideoad() 
            }else{
                back()
                sleep(1000)
                if(textclick("视频")){
                    sleep(1000)
                }
               
            }
        }
    }
    //看海量视频任务
    if(!seevideofinish){
        if(text("看视频赚海量金币").exists()){
            var hlsp=textContains("每次最高得100金币").findOne(500)
             t=hlsp.text()
             log("取出当前提醒："+t)
             i=t.substring(t.indexOf("成")+1,t.indexOf("\/"))
             log("取出当前次数："+i)
             i=Number(i)
             if(i<20){
                 textclick("红包")
                if( textclick("看视频赚海量金币")){
                    //这个是安装赚金币 之后要卸载
                    waitvideoadandinstall()
                }
             }else{
                 seevideofinish=true
             }
        }
    }else{
        onlyseevideo()
    }
    back()
    sleep(1000)
    vide=text("视频").boundsInside(0,0 ,device.width , 300).findOne(500)
    red=text("红包").boundsInside(0,0 ,device.width , 300).findOne(500)
    if(vide&&red){
        log("视频和红包同时在的界面")
       click(100,400)
    }
    if( textclick("关闭广告")){
        sleep(1000)
       }
    if(textContains("剩余").exists()){
        textContains("剩余").findOne(500).click()
        sleep(1000)
        滑动(20,13,16,10,4,500,500)
    }
   if( textclick("首页")){
    sleep(1000)
   }
    
    if(id("com.ss.android.ugc.livelite:id/a2f").exists()||id("com.ss.android.ugc.livelite:id/rc")){
        n=0
        while(n<30){
            if(!idContains(apppkg).findOne()){
                app.launch(apppkg)
                sleep(2000)
            }else{
                back()
                sleep(2000)
            }
            c=1
            while(c<视频重复次数){
                if(id("com.ss.android.ugc.livelite:id/a2f").exists()||id("com.ss.android.ugc.livelite:id/rc")){
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
                c=c+1
            }
            
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


