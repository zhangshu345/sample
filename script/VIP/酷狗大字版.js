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
var 酷狗大字版邀请码格式="【复制此消息】打开酷狗大字版，可自动填我的邀请码【yqm】一起拿钱！"
var 邀请码集合=["5K74NU","YCN0VB"]
var tomoney=false   //填现
var invite=false // 邀请
var logintype="weixin"  //登录使用微信  
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3000  //最小今天的赚的金币
var onlyscript=true  //仅允许当前一个脚本运行 
var changesetting=false
var apppkg="com.kugou.android.elder"
var apphomeactivity="com.kugou.android.app.MediaActivity"
var apploginactivity="com.kugou.common.useraccount.app.KgUserLoginAndRegActivity"  // 登录页面
var appname="酷狗音乐大字版"
var 首次点击文本集合=["同意","确定","允许","允许","始终允许","始终允许","我知道了","赚钱","立即登录"]
var 微信登录文本集合=["微信登录","同意"]
var 微信登录成功文本标志=["获得新人金币","签到成功"]
var islogin=获取
var 音乐分享按钮id=""
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
        log("循环次数："+n_i)
        ca=currentActivity()
        if(ca!=apphomeactivity){
            app_home_video()
        }else{
            if (textclick("赚钱")){
                滑动(20,10,16,10,5,500,200)
                sleep(1000)
            }
            //这里是查看广告
            if(text("填写邀请码").exists()){
                app_invite()
            }
            if(textclick("去分享")){
                clickoneids([音乐分享按钮id])
            }
        }
        
        
        close_ad_qq(apppkg)
        close_ad_toutiao(apppkg)
        close_ad_iclicash(apppkg)
        n_i=n_i+1
        sleep(2000)
    }

}

//app 登录
var app_login=function(){

}

//app 微信登录
var app_login_weixin=function(){
    if(currentActivity()==apploginactivity){
        doactionmaxtime(function(){
            clicktexts(微信登录文本集合,100,2000)
            if(textoneexist(微信登录成功文本标志)){
                return true
            }
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

}

var app_home_video=function(){
    if(currentActivity()==apphomeactivity){
        return true
    }
 return doactionmaxnumber(function(){
    if(currentActivity()==apphomeactivity){
        return true
    }
    if(!idContains(apppkg).findOne(1000)){
        log("酷狗不在前台")
        app.launch(apppkg)
        sleep(3000)
    }else{
        back()
    }
    sleep(1000)
 },10)
}

var app_invite=function(){
    if(textclick("去填写")){
        let text_yqm=邀请码集合[randomint(0,邀请码集合.length)]
        let text_yqmt=酷狗大字版邀请码格式.replace("yqm",text_yqm)
        setClip(text_yqmt)
        text("一键粘贴").waitFor()
        textclick("一键粘贴")
        sleep(10000)
        back()
    }
}


run()