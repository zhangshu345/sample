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
var apppkg="com.zheyun.bumblebee"
var apphomeactivity="com.zheyun.bumblebee.ui.MainActivity"
var appname="趣铃声"
var apploginactivity="com.jifen.open.biz.login.ui.activity.JFLoginActivity"

var 首次开图片id="com.zheyun.bumblebee:id/iv_open_red_packet"
var 首次点击文本集合=["允许","允许","始终允许","始终允许","立即提现","点这里设置铃声","立即登录"]
var 设置第一个来电铃声赚钱的关闭id="com.zheyun.bumblebee:id/base_card_dialog_close"  //设置第一个来电铃声   赚
var 设置第一个来电铃声赚钱的立即设置按钮id="com.zheyun.bumblebee:id/tv_confirm"  // 立即设置    之后弹出暂不领取
var 视频广告结束弹窗关闭id="com.zheyun.bumblebee:id/iv_close"
alltest()
// checkfloaty()
// checksystemsettings()
floaty.closeAll()
creatgfloatywindow()
creatsetfloatywindow()  //创建设置悬浮窗
gfw.setPosition(0,220)

if(changesetting){
    device.setMusicVolume(1)
    toastLog("自动设置音量为2")
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
var run=function(){
    app.launch(apppkg)
    sleep(3000)
    n_i=0
    while(true){
        sleep(2000)
        log("循环次数："+n_i)
        if(!idContains(apppkg).exists()){
            app.launch(apppkg)
            sleep(3000)
        }
        ca=currentActivity()
        if(ca!=apphomeactivity){
            
        }else{

        }
           //这里是视频上滑操作
           if(textclick("看视频，金币再翻1倍！")){
            if (app_seevideoad()){
                sleep(1500)
                idclick(视频广告结束弹窗关闭id)
            }
        }
  
        if(n_i<100){
            textclick("音乐")
            if(n_i%20==0){
                textclick("音乐")
                sleep(1000)
                node_tablay=id("com.zheyun.bumblebee:id/tab_layout").className("android.widget.HorizontalScrollView").findOne(100)
                if(node_tablay){
                  node_tabs=  node_tablay.child(0)
                    if(node_tabs){
                       let rn=randomint(0,node_tabs.childCount()-1)
                       clicknode(node_tabs.child(rn))
                       sleep(1000)
                       
                    }
                }else{
                    textclick("音乐")
                    textclick("抖音")
                    sleep(1000)
                }

            }
            滑动(20,10,16,10,14,400,100)
            sleep(1000)
            idclick("com.zheyun.bumblebee:id/iv_music_play")
            
            
        }else{
            if(n_i%150){
                app_tomoney()
            }
            if(n_i%20==0){
                textclick("小视频")
            }

            滑动(20,10,16,10,4,400,300)
            sleep(1500)
            text_like=getTextfromid("com.zheyun.bumblebee:id/tv_like")
            if(text_like){
                if(text_like.search("w")){
                    idclick("com.zheyun.bumblebee:id/tv_like")
                }else{
                    
                }
            }else{
                textclick("小视频")
            }
        }

        doactionmaxtime(function(){
            if(textclick("看视频，金币再翻1倍！")){
                if (app_seevideoad()){
                    sleep(1500)
                    idclick(视频广告结束弹窗关闭id)
                }
            }
            idclick(设置第一个来电铃声赚钱的关闭id)
            idclick(视频广告结束弹窗关闭id)
        },6000,1000)
        idclick(设置第一个来电铃声赚钱的关闭id)
        idclick(视频广告结束弹窗关闭id)
        close_ad_qq(apppkg)
        close_ad_toutiao(apppkg)
        close_ad_iclicash(apppkg)
      
        n_i=n_i+1
    }
}

//app 登录  
var app_login=function(){
     clicktexts(首次点击文本集合)
     app_login_weixin()
}

//app 微信登录
var app_login_weixin=function(){
    if(currentActivity()==apploginactivity){
        clicktexts(["微信","同意"],100,2000)
        //之后进入提现页 com.jifen.qu.open.QX5WebViewActivity
        while(true){
            node_title=id("com.zheyun.bumblebee:id/tv_title").findOne(100)
            if(node_title){
                if(node_title.text()=="我的钱包"){
                    textclick("立即提现")
                    sleep(1000)
                    idclick("com.zheyun.bumblebee:id/imv_boy")
                    sleep(1000)
                    textclick("上班族") //其他职业 学生
                    sleep(500)
                    maytextclick("领取")
                    sleep(2000)
                    if(desc("提现成功").exists()){
                        idclick("设置第一个来电铃声赚钱的关闭id")
                        sleep(1000)
                        clicktexts(["暂不领取","暂不领取","暂不领取"],100,1500)
                        sleep(1000)
                        // if(textclick("完成首次提现任务再拿500金币！")){
                        // }
                    }
                    //这里设置APP已经登录过的标记
                    return
                }
            }
  
        }
    }
}

//app_手机号登录
var app_login_phone=function(){
    if(currentActivity()==apploginactivity){

        

    }
}

//app 签到
var app_sign=function(){

}

//app提现
var app_tomoney=function(){

}

var app_home_video=function(){
    doactionmaxnumber(function(){
        if(currentActivity()==apphomeactivity){
            return true
        }
       if(!idContains(apppkg).findOne(1000)){
           app.launch(apppkg)
           sleep(3888)
       }else{
           back()
           sleep(500)
       }
    },10)
    if(currentActivity()!=apphomeactivity){
        forcestop(appname)
        app.launch(apppkg)
           sleep(3888)
        return true
    }
}

var app_seevideoad=function(){
    let n_seead=0
    while(n_seead<30){
       if(close_ad_qq(apppkg)){
           return true
       }
       if(close_ad_toutiao(apppkg)){
           return true
       }
        
        sleep(1000)
        n_seead=n_seead+1
    }
    forcestop(appname)
}

run()