auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        toastLog("网络有问题五秒后重试")
        sleep(5000)
        return httpget(url)
    }
}

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}
//微信链接邀请绑定 之后登陆

/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */

var tomoney=false   //填现
var invite=false // 邀请
var logintype="weixin"  //登录使用微信  
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3000  //最小今天的赚的金币
var onlyscript=false  //仅允许当前一个脚本运行 
var changesetting=false
var apppkg="com.video.yy"
var apphomeactivity="com.liquid.box.home.HomeActivity"
var appname="有颜短视频"
var todaysign=今日签到(appname)
alltest()
// checkfloaty()
// checksystemsettings()
floaty.closeAll()
creatgfloatywindow()
creatsetfloatywindow()  //创建设置悬浮窗
gfw.setPosition(0,220)

if(changesetting){
    device.setMusicVolume(0)
    toastLog("自动设置音量为0")
}

if(!app.getPackageName(appname)){
    show("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}else{
    show(appname+"已经安装")
}
if(onlyscript){
    engines.stopOther()
}

//关闭最新的app
closelastscriptapp()
spt.put("lastscriptapp",appname)

//app 运行
//app 运行
var run=function(){
    app.launch(apppkg)
    sleep(3000)
    n_i=0
    while(true){
        sleep(2000)
        log("循环次数："+n_i)
        ca=currentActivity()
        if(ca!=apphomeactivity){
            app_home_video()
        }else{
            //这里是视频上滑操作
            滑动(20,10,16,11,4,500,500)
            doactionmaxtime(actionother,10000,2000)

        }
        if(maytextclick("看视频奖励最高")){
            seerewardvideo(apppkg)
        }
        if(!todaysign){
            app_sign()
        }
        close_ad_qq(apppkg)
        close_ad_toutiao(apppkg)
        close_ad_iclicash(apppkg)
        n_i=n_i+1
    }

}

var actionother=function(){
    if(maytextclick("看视频奖励最高")){
        seerewardvideo(apppkg)
    }
    if(textclick("重试")){
        sleep(2000)
    }
}
var  app_home_video=function(){
    n_home_video=0
    while(n_home_video<20){
        clicktexts(["同意并继续","允许","允许","允许","首页","推荐"])
        ca=currentActivity()
        if(ca==apphomeactivity){
            return true
        }
        if(maytextclick("看视频奖励最高")){
            seerewardvideo(apppkg)
        }
        if(!idContains(apppkg).findOne(100)){
            app.launch(apppkg)
            sleep(3800)
          }
        n_home_video=n_home_video+1
        sleep(1000)
    }
}
//app 登录
var app_login=function(){

}

//app 微信登录
var app_login_weixin=function(){

}

//app_手机号登录
var app_login_phone=function(){
    pn=phonenumber();
    if(!pn){
        toastLog("暂停300秒用于手动登录")
        sleep(300000) 
        return true
    }
    if(textclick("手机号登录并领取",1000)){
       id("com.video.yy:id/account_edit").findOne(100).setText(pn)
       sleep(500)
       idclick("com.video.yy:id/btn_get_validate")
       sleep(1000)
      let pcode= get_phone_code()
      if(pcode){

      }

    }
}
//app 签到
var app_sign=function(){
    if(currentActivity()==apphomeactivity){
       if( textclick("我的")){

       }

    }

}

//app提现
var app_tomoney=function(){

}

run()