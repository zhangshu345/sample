auto.waitFor()
auto.setMode("normal")
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
var apppkg="com.jt.hanhan.video"
var apphomeactivity=""
var appname="火火视频极速版"
var tomoney=false  
var invite=false // 邀请
var logintype="weixin"  //登录使用微信  
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3000  //最小今天的赚的金币
var onlyscript=true  //仅允许当前一个脚本运行 

alltest()
checkfloaty()
checksystemsettings()
creatgfloatywindow()
creatsetfloatywindow()  //创建设置悬浮窗
gfw.setPosition(0,220)
device.setMusicVolume(0)
device.wakeUpIfNeeded()
toastLog("自动设置音量为0")


floaty.closeAll()
//关闭最新的app
closelastscriptapp()
creatsetfloatywindow()  //创建设置悬浮窗
show("开始："+appname+"辅助滑动")
home()


if(!app.getPackageName(appname)){
    show("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}else{
    show(appname+"已经安装")
}
//关闭其他脚本
if(onlyscript){
    engines.stopOther()
}


//app 运行
var run=function(){
    app.launch(apppkg)
    sleep(3000)
    n_i=0
    while(true){
        log("循环次数："+n_i)
        ca=currentActivity()
        if(ca!=apphomeactivity){
            app_home_video()
        }else{
            //这里是视频上滑操作
        }


        n_i=n_i+1
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

}
//app 签到
var app_sign=function(){

}

//app提现
var app_tomoney=function(){

}

run()