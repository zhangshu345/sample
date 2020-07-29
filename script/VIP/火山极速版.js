auto.waitFor()
auto.setMode("normal")

/** 这里应该是配置 */
var tomongy=false  //提现
var invite=false // 邀请
var logintype="weixin"  //登录使用微信
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3000  //最小今天的赚的金币
var onlyscript=true  //仅允许当前一个脚本运行 
var installappnames=[]
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
var seevideofinish=false  //看海量视频 广告任务 任务完成 标记
滑动次数=0

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
log("公共函数实例化成功")
}else {
log("公共函数实例化失败,程序重启")
//这里应该是重新启动脚本 todo
}


//关闭其他脚本
if(onlyscript){
    floaty.closeAll()
    engines.stopOther()
}
//关闭最新的app
closelastscriptapp()
var appname="火山极速版"
var apppkg="com.ss.android.ugc.livelite"  

show("开始火山极速版辅助滑动")
creatsetfloatywindow()  //创建设置悬浮窗
toastLog("指定："+appname+"即将启动")
home()

if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}

var waitvideoad=function(){
    t_wvd=0
    while(t_wvd<20){
        sleep(3000)
      if(textclick("关闭广告")){
        sleep(1500)
          if(textclick("继续观看")){
              sleep(6000)
          }else{
              return
          }
      }
      t_wvd=t_wvd+1
   
    }
}
var installappanduninstallapp=function(){
    install_app()
    sleep(5000)
    if(installappnames.length>0){
        installappnames.forEach(app=>{
            if(getPackageName(app)){
                if( uninstallapp(app)){
                    installappnames.pop(app)
                }
            }else{
                installappnames.pop(app)
            }
           
        })
       
    }
}

//等待视频 和安装应用 之后卸载
var waitvideoadandinstall=function(){
    i=0
    while(i<10){
        sleep(6000)
        if(textclick("关闭广告")){
            sleep(1500)
              if(textclick("继续观看")){
                  sleep(6000)
              }
          }
       if(text("安装再领300金币").exists()){
           tem=id("com.ss.android.ugc.livelite:id/title").findOne(500)
           if(tem){
               temappname=tem.text()
               installappnames.push(temappname)
               show("安装的应用："+temappname)
           }
       }
     if(textclick("安装再领300金币")){
        threads.start(installappanduninstallapp)
        return
     }
       if(textallexist(["红包","邀请好友"])){
           return
       }
       i=i+1
    }
}
var app_update=function(){
    install_app(null,appname)
}

var onlyseevideo=function(){
        if(id("com.ss.android.ugc.livelite:id/a2f").exists()||id("com.ss.android.ugc.livelite:id/rc")){
                textclick("领取")
                if(textContains("剩余").exists()){
                    textContains("剩余").findOne(500).click()
                    sleep(1000)
                    滑动(20,13,16,10,4,500,500)
                }
                if(maytextclick("查看领取")){
                    sleep(2000)
                    滑动(20,13,16,10,4,500,500)
                    sleep(2000)
                    滑动(20,13,16,10,4,500,500)
                    sleep(2000)
                    back()
                }
                if(textContains("剩余").exists()){
                    textContains("剩余").findOne(500).click()
                    sleep(1000)
                    滑动(20,13,16,10,4,500,500)
                }
                textclick("领取")
                滑动(20,13,16,10,4,500,500)
                滑动次数=滑动次数+1

                

        }
        vide=text("视频").boundsInside(0,0 ,device.width , 300).findOne(500)
        red=text("红包").boundsInside(0,0 ,device.width , 300).findOne(500)
        if(vide&&red){
            log("视频和红包同时在的界面")
           click(100,400)
        }
            back()
            sleep(1200)
           textclick("视频")
            sleep(1000)
           
            textclick("首页")
            click(100,400)
            sleep(1000)

}
//  app.getPackageName(appname)


var app_login=function(){
    t_login=0
    while(t_login<10){
        if(textclick("登录")){
            sleep(2000)
           }
            
           if( textclick("微信登录")){
            sleep(2000)
           }
           t_login=t_login+1
    }
  
        
}
var run=function(){
app.launchApp(appname)
视频重复次数=1
while(true){
   if(!idContains(apppkg).exists()){
       show(appname+"不在前台")
                    app.launch(apppkg)
                    sleep(3000)
     }else{
        show(appname+"在前台")
     }
    if(textclick("注册/登录")){
            app_login()
   }
  
    if(text("登录立即可得8元").exists()){
        app_login()
  
    }
    if(textclick("点击激活")){
        text("去红包页面")
        if(textclick("去红包页面")){
            sleep(2000)
            // text("金币").waitFor()
            // text("兑换").waitFor()
            if(text("签到").exists()){
                if (textclick("签到")){
                    sleep(1000)
                    back()
                }
            }
        }
    }
  
    //邀请弹窗
    if(idclick("com.ss.android.ugc.livelite:id/a5o")){

    }
    if(idclick("com.ss.android.ugc.livelite:id/a60")){

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
    if(text("火山又更新啦").exists()){
        l_p=text("火山又更新啦").findOne(300).parent()
        if(l_p){
            if(l_p.ChildCount()==4){
                if(  clicknode(l_p.child(2))){
                    app_update()
                }
            }
        
        }
    }

    //看海量视频任务
    if(!seevideofinish){
        textclick("红包")
        sleep(1000)
        v=text("看视频赚海量金币").findOne(500)
        if(v){
            var hlsp=textContains("每次最高得100金币").findOne(500)
             t=hlsp.text()
             show("取出当前提醒："+t)
             i=t.substring(t.indexOf("成")+1,t.indexOf("\/"))
             show("取出当前次数："+i)
             i=Number(i)
             if(i<20){
                if( clicknode(v)){
                    //这个是安装赚金币 之后要卸载
                    waitvideoadandinstall()
                }
             }else{
                 seevideofinish=true
             }
        }
        v=text("看广告视频赚海量金币").findOne(500)
        if(v){
              hlsp=textContains("看广告得金币").findOne(500)
              if(hlsp){
                t=hlsp.text()
              }else{
                hlsp=textContains("每次最高的").findOne(500) 
                if(hlsp){
                    t=hlsp.text()
                  }
              }
              if(t){
                show("取出当前提醒："+t)
                i=t.substring(t.indexOf("成")+1,t.indexOf("\/"))
                show("取出当前次数："+i)
                i=Number(i)
                if(i<20){
                   if(clicknode(v)){
                       //这个是安装赚金币 之后要卸载
                       waitvideoadandinstall()
                   }
                }else{
                    seevideofinish=true
                    onlyseevideo()
                }
              }
            
        }
    }else{
        onlyseevideo()
    }
}
}

run()

