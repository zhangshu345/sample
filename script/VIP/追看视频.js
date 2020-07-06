const { text } = require("express");

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

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}
//微信链接邀请绑定 之后登陆 需要绑定手机和 身份证号  放弃


/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */

var tomoney=false   //填现
var invite=false // 邀请
var logintype="weixin"  //登录使用微信  
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3000  //最小今天的赚的金币
var onlyscript=true  //仅允许当前一个脚本运行 
var changesetting=false
 
var appname="追看视频"
var apppkg="com.yy.yylite"
var apphomeactivity="com.yy.yylite.MainActivity"

var 奖励标识中心="com.yy.lite.plugin.liveextension:id/mIvRedBag"
var 奖励进度id="com.yy.lite.plugin.liveextension:id/mCircleProgressBar" 
var 奖励进度背景="com.yy.lite.plugin.liveextension:id/mRlRedBag"  //看直播随机30次金币 基本就是25 
 ["视频","直播","任务","我"] // 直播上滑之后变成刷新  




//app 运行
var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_checklogin()
    n_i=0
    while(true){
        sleep(2000)
        log("循环次数："+n_i)
        ca=currentActivity()
        if(ca!=apphomeactivity){
            app_home_video()
        }else{
            //这里是视频上滑操作
        }
        close_ad_qq(apppkg)
        close_ad_toutiao(apppkg)
        close_ad_iclicash(apppkg)
        n_i=n_i+1
    }
}

var app_checklogin=function(){
    doactionmaxtime(function(){
        clicktexts(["我知道了","立即提现"])
        if(text("登录追看视频").exists()){
           clicknode( className("android.widget.CheckBox").clickable().selected(false).findOne(300))
           if(clicknode(className("android.widget.ImageView").clickable(true).drawingOrder(2).depth(6).findOne(300))){
               sleep(1000)
               textclick("同意并登录")
               doactionmaxtime(function(){
                  if(textclick("同意")){
                      return 
                  }
               },20000)
           }
           
        }
    },6000)
}

//app 登录
var app_login=function(){

}

//app 微信登录
var app_login_weixin=function(){

}

//app_手机号登录
var app_login_phone=function(){

}

//app 签到
var app_sign=function(){

}

//app提现
var app_tomoney=function(){

}

var app_home_video=function(){
    ca=currentActivity()
    if(ca!=currentActivity()){
        doactionmaxtime(function(){
            if(!idContains(apppkg).findOne(100)){
                app.launch(apppkg)
            }

        },10000)
    }
}

startapp(appname,apppkg,0,device.height-200,false,false,true,true)