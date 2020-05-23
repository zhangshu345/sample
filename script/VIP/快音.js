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
var onlyscript=true  //仅允许当前一个脚本运行 
var changesetting=false
var apppkg="com.kuaiyin.player"
var apploginactivity="com.kuaiyin.player.v2.ui.login.LoginSupportActivity"
var apphomeactivity=""
var appname="快音"
var 首次进入点击文本集合=["我知道了","允许","允许","始终允许","始终允许"]
var 首次进入弹窗红包点击id="com.kuaiyin.player:id/redPackage"  //  text


var invitecodes=[]
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
if(onlyscript){
    engines.stopOther()
}
if(!app.getPackageName(appname)){
    show("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}else{
    show(appname+"已经安装")
}


//关闭最新的app
closelastscriptapp()
spt.put("lastscriptapp",appname)

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
        }
        close_ad_qq(apppkg)
        close_ad_toutiao(apppkg)
        close_ad_iclicash(apppkg)
        n_i=n_i+1
    }

}

//app 登录
var app_login=function(){

}

//app 微信登录
var app_login_weixin=function(){
    if(currentActivity()==apploginactivity){
        textclick("微信登录")
        doactionmaxtime(function(){
            textclick("同意")
            textclick("立即提现")
            sleep(1000)
        },10000)
        
    }
}

//app_手机号登录
var app_login_phone=function(){

}

//app 签到
var app_sign=function(){

}

//app提现
var app_tomoney=function(){
    if(currentActivity()==apphomeactivity){
        textclick("福利")
        sleep(1000)
        if(textclick("去提现")){
            doactionmaxtime(function(){
                textclick("去提现")
                if(text()){}
            },10000)
        }
    }
    

}

var app_home_video=function(){
    if(currentActivity()==apphomeactivity){
       return true
    }
  return  doactionmaxtime(function(){
        if(currentActivity()==apphomeactivity){
            return true
        }

    },10000)
}

run()