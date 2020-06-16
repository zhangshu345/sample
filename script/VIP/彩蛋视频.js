auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        toastLog("五秒后重试")
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




//微信登录 点击邀请链接 注册 再微信登录
var apppkg="com.jifen.dandan"
var apphomeactivity="com.jifen.dandan.sub.home.activity.HomeActivity"
var appname="彩蛋视频"

var tomoney=false  
var logintype="phone"  //weixin 是微信登录 phone 是手机号登录
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3500  //最小今天的赚的金币
var onlyscript=true  //仅允许当前一个脚本运行 
var changesetting=true
var login=getbooleanvalue(appname+"_login",false)
//应用登录状态
var logintype=getstrvalue(appname+"_login_type","weixin")
// 应用是否被邀请
var appinvitestate=getbooleanvalue(appname+"_invite_state",false);
var tomoney=getbooleanvalue(appname+"_tomoney",false)  //填现
var invite=getbooleanvalue(appname+"_invite",false) // 邀请


const 彩蛋视频广告立即领取id="com.jifen.dandan:id/tv_ad_red_pack_staus"
const 彩蛋首页奖励计时布局id="com.jifen.dandan:id/view_default_timer"
const 彩蛋首页任务状态id="com.jifen.dandan:id/tv_task_status" // text 3/5
const 彩蛋首页奖励中心图标id="com.jifen.dandan:id/image_red_bg_icon"
const 彩蛋首页喜欢按钮id="com.jifen.dandan:id/iv_like_icon"
const 彩蛋首页评论按钮id="com.jifen.dandan:id/iv_comment_icon"
const 彩蛋立即翻倍关闭按钮id="com.jifen.dandan:id/close_bottom_button"
//"恭喜您，获得彩蛋奖励！金币已自动发送至您的钱包"
const 彩蛋视频录像id="com.jifen.dandan:id/iv_ugc_enter"
const 彩蛋底部奖励id="com.jifen.dandan:id/bt_tab_welfare_task"
const 彩蛋弹窗标题id="com.jifen.dandan:id/title_text_view"
var 彩蛋视频首页标识id =[彩蛋首页喜欢按钮id,彩蛋首页评论按钮id,彩蛋视频广告立即领取id,彩蛋视频录像id,彩蛋底部奖励id]
var 视频次数=0
var lastdesc=""
var 滑动次数=0

function app_run(){
    app.launchApp(appname)
    sleep(3000)
    while(true){
        device.wakeUpIfNeeded()
        ca=currentActivity()
        if(ca!=apphomeactivity){
            app_go_home()
        }else{
            //这里是视频上滑操作
        }
        if(idclick("com.jifen.dandan:id/iv_close")){
        }
        closeappundostate()
    if(!idoneexist(彩蛋视频首页标识id)){
        log("没有找到一个彩蛋标识")
        app_go_home()
    }else{
        desc=  id("com.jifen.dandan:id/tv_title").findOne(300)
        if(desc){
            currentdesc=desc.text()
            log("之前："+lastdesc+"--当前："+currentdesc)
            if(currentdesc==lastdesc){
                if(textclick("立即翻倍")){
                    seead()
                 }
                滑动(20,13,16,10,4,500,700)
                sleep(500)
            }else{
                lastdesc=currentdesc
                滑动次数=滑动次数+1
            }
        }else{
            if(textclick("立即翻倍")){
                seead()
             }
            滑动(20,13,16,10,4,500,700)
            sleep(500)
        }
        if(text("点击重播").exists()){
            back()
            sleep(2500)
        }
        sleepr(4000*ratio,6000*ratio)
       
        if(滑动次数%300==1){
            if(!今日签到(appname)){
                app_sign()
            }
        }
      }
    }
}

var seead=function(){
let  n_seead=0
    while(n_seead<20){
        if(maytextclick("看视频再送")){

        }
        if(clickoneids(["com.jifen.dandan:id/iv_close","com.jifen.dandan:id/tv_close"],100,1500)){
            back()
            return
        }
        if(text("点击重播").exists()){
            back()
            sleep(2500)
            back()
            return 
        }
       if(idclick("com.jifen.dandan:id/tt_video_ad_close")){
           return 
       }
       
        if(text("邀请好友").findOne(500)){
            back()
            return 
        }
        if(textclick("金币已到账")){
            return
        }
        close_ad_iclicash()
        close_ad_toutiao()
        close_ad_qq()
        sleep(2000)
        n_seead=n_seead+1
    }
}
var app_go_home=function(){
    i=0
    while (i<10){
        i=i+1
    if(!idallexist(彩蛋视频首页标识id)){
        if(!idContains(apppkg).findOne(1000)){
            show("没有找到存在包名id控件")
            app.launch(apppkg)
            sleep(3000)
        }else{
            show("找到存在包名id控件")
            back()
            sleep(1500)
        }
        if(text("首页").exists()){
            textclick("首页")
            sleep(1000)
            textclick("推荐")
        }
        if(textclick("同意并继续")){

        }
    }else{
        return true
    }
}
}

var app_sign=function(){
    if(idclick(彩蛋首页任务状态id)){
        sleep(2000)
    }
    n_sign=0
    while(n_sign<3){
        if(idContains("coins-number").findOne(100)){
            txt_coin=idContains("coins-number").findOne(100).text()
            if(txt_coin){
                记录现在金币(appname,parseInt(txt_coin))
            }
        }
        n_sign=n_sign+1
       if(textclick("看视频再送100金币")){
           seead()
           今日已签到(appname)
           return true
       }
       if(textclick("翻倍")){
           seead()
           今日已签到(appname)
           return true
       }
       if(text("点击重播").exists()){
           show("点击重播")
        今日已签到(appname)
        back()
        sleep(2500)
        back()
        return  true
    }
    if(text("邀请好友").findOne(500)){
        back()
        return 
    }
    sleep(2000)
    }
}

var app_login=function(){
    i=0
    while(i<10){
        log("彩蛋登录")
           if(!idContains("com.jm.video").findOne(1000)){
                show("找到存在包名id控件")
                app.launch(apppkg)
                sleep(3000)
            }else{
                back()
                sleep(1200)
            }

        if(idallexist(["com.jm.video:id/tv_name","com.jm.video:id/iv_setting"])){
            show("我界面找到昵称和设置")
            spt.put("shuabaologin",true)
               return true
        }else{
            show("没有找到昵称和设置")
            back()
            sleep(1000)
        }
        clicktexts(["去授权","允许","允许","允许","我","同意并继续"],500,1500)
       if(id("login_tip").exists()||text("微信账号登录")){
           toastLog("登录页面")
           if(logintype=="weixin"){
           app_login_weixin()
           }else{
           app_login_phone()
           }
       }
        // 
        i=i+1
    }
}

var app_login_phone=function(){

}


var app_login_weixin=function(){
   
}

var app_tomoney=function(){
    doactionmaxtime(function(){
        nca=currentActivity()
        if(nca==apphomeactivity){

        }else if(nca==""){

        }else{

        }
        if(textclick("我的")){
            textContains("今日金币").waitFor()
            text_coin=getTextfromid("com.jifen.dandan:id/tv_person_total_gold_title")
            if(text_coin){
               n_coin=parseInt(text_coin.replace("我的金币","").trim())
               if(n_coin){
                记录现在金币(appname,n_coin)
               }
            }
            
            text_todaycoin=getTextfromid("com.jifen.dandan:id/tv_person_today_gold_title");
            n_todaycoin=parseInt(text_todaycoin.replace("今日金币","").trim())
            if(n_todaycoin>=mintodaycoin){
                if(idclick("com.jifen.dandan:id/tv_person_total_gold_title")){
                    
                }
            }else{
                show("今日金币数:"+n_todaycoin)
            }
        }
    },20000)
}








let runscriptapp= spt.getString("hongshuyuedu_run_app",null)
log("正在集合运行的APP"+runscriptapp)
let isreaderunning=spt.getBoolean("hongshuyuedu_running",false)
log("是否是集合运行："+isreaderunning)
// 集合运行
if(runscriptapp==appname && isreaderunning){

}else{
    if(onlyscript){
        engines.stopOther()
    }

    // 彩蛋邀请 通过 微信链接绑定上级用户 
        
    toastLog("指定："+appname+"即将启动")
    alltest()
    if(changesetting){
        device.setMusicVolume(0)
        toastLog("自动设置音量为0")
    }
    floaty.closeAll()
    creatgfloatywindow()
    creatsetfloatywindow()  //创建设置悬浮窗
    show("开始彩蛋视频辅助滑动")
    gfw.setPosition(0,220)
    if(!app.getPackageName(appname)){
        toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
        downloadandinstallapp(appname,apppkg)
    }else{
        keepappisnewer(appname,apppkg)
    }

    closelastscriptapp()
    spt.put("lastscriptapp",appname)
    spt.put("hongshuyuedu_running",false)
    try {
        app_run()
    } catch (error) {
        
    }
}

