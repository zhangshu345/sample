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
/*
长豆短视频  未知  实名卡可以 虚拟卡不要勾选 微信登录后直接弹出绑卡页面不能跳过
*/


var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}
//微信链接邀请绑定 之后登陆

/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */
//应用名
var appname="长豆短视频"
var apppkg="com.zf.shuashua"
//应用登录
var applogin=getbooleanvalue(appname+"_login",false)
//应用登录状态
var applogintype=getstrvalue(appname+"_login_type","weixin")
// 应用是否被邀请
var appinvitestate=getbooleanvalue(appname+"_invite_state",false);
var tomoney=getbooleanvalue(appname+"_tomoney",false)  //填现
var invite=getbooleanvalue(appname+"_invite",false) // 邀请
var logintype="weixin"  //登录使用微信  
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3000  //最小今天的赚的金币
var onlyscript=true  //仅允许当前一个脚本运行 
var changesetting=false
var apphomeactivity=""
var keepappnewer=true

//关闭最新的app

//app 运行
var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_login_check()
    n_i=0
    

    // while(true){
    //     sleep(2000)
    //     log("循环次数："+n_i)
    //     ca=currentActivity()
    //     if(ca!=apphomeactivity){
    //         app_home_video()
    //     }else{
    //         //这里是视频上滑操作
    //         app_seevideo()
    //     }
    //     close_ad_qq(apppkg)
    //     close_ad_toutiao(apppkg)
    //     close_ad_iclicash(apppkg)
    //     n_i=n_i+1
    // }
}

var app_login_check=function(){
    show("检测"+appname+"登录状况")
    if(applogin){
        return
    }else{
        app_login()
    }
}

//app 登录
var app_login=function(){
    doactionmaxtime(function(){
        clicktexts(["允许","允许","允许","同意并继续"],200,1500)
        if(idclick("com.zf.shuashua:id/tab_mine")){
            sleep(1000)
            if(textclick("登录/注册")){
                sleep("1000")
                if(currentActivity()=="com.zf.shuashua.ui.mine.LoginActivity"){
                  if(  idclick("com.zf.shuashua:id/weixin_login")){
                      text("同意").waitFor()
                      textclick("同意")
                      text("已使用微信快捷登录，还需绑定手机号").waitFor()
                      id("com.zf.shuashua:id/phone_number").findOne(200).setText(phonenumber())

                  }
                }
            }
        }
    },60000)
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

//app 回到操作的主页

function  app_home_video(){
    if(doactionmaxtime(function(){
         

 
 
     },10000)){return true}else{
         forcestop(appname)
         app.launch(apppkg)
     }
 }


//app邀请
var app_invite=function(){
    
    

}



let runscriptapp= spt.getString("hongshuyuedu_run_app",null)
log("正在集合运行的APP"+runscriptapp)
let isreaderunning=spt.getBoolean("hongshuyuedu_running",false)
log("是否是集合运行："+isreaderunning)
// 集合运行
if(runscriptapp==appname && isreaderunning){

}else{
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
        if(keepappnewer){
            keepappisnewer(appname,apppkg)
        }
        show(appname+"已经安装")
    }

    closelastscriptapp()
    spt.put("lastscriptapp",appname)

    spt.put("hongshuyuedu_running",false)
    try {
        app_run()
    } catch (error) {
        
    }
}

