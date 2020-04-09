auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/

function 滑动(z,x1,y1,x2,y2,t,r) {
    var w = device.width/z;
    var h = device.height/z;
    r=r||1000
     show("滑动"+x1+","+y1+"->"+x2+","+y2)
    swipe(w * x1, h * y1 , w *x2 , h * y2, t+random(0, r))
}
var sleepr=function(short,long){
    rt=random(short,long)
    show("等待:"+rt +" 毫秒")
    sleep(rt)
}
var ratio=1
var gfw
var  creatgfloatywindow=function(){
    gfw=floaty.rawWindow(
        <horizontal >
           <text id="stop" w="45" h="45" gravity="center" textSize="18sp" background="#55ff0000" >停止</text>
           <text id="jiasu" w="45" h="45" gravity="center" textSize="16sp" background="#55ff0000" >加速</text>
           <text id="jiansu" w="45" h="45" gravity="center" textSize="16sp" background="#55ff0000">减速</text>
            <text id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">提醒</text>
        </horizontal>
        
    );
    gfw.setSize(device.width, 120)
    
    gfw.setPosition(0,80)
    gfw.stop.on("click",function(){
        engines.stopAllAndToast()
    })
    gfw.jiasu.on("click",function(){
        ratio=ratio*0.9
        toastLog("加速 1.1倍 当前速度："+ratio)
    })
    gfw.jiansu.on("click",function(){
        
        ratio=ratio*1.1
        toastLog("减速 0.1倍 当前速度："+ratio)
        if(ratio<10){
            ratio=10
        }
    })
}

var show=function(txt){
    if(!gfw){
      creatgfloatywindow()
    }
    ui.run(function(){
        gfw.text.setText(txt)
     })

}
var 上滑=function(){
    滑动(20,13,17,10,3,500,500)
}

var 下滑=function(){
    滑动(20,10,3,13,17,500,500)
}
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

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
    eval(公共函数文本)
    log("公共函数实例化成功")
   
}else {
    log("公共函数实例化失败,程序返回")
}


var appname="刷宝短视频"

toastLog("指定："+appname+"即将启动")
home()
if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname)
    刷宝邀请()
}
else {
    log("公共函数实例化失败,程序返回")
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


