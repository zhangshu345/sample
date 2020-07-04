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
//微信链接邀请绑定 之后登陆

/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */
//应用名
var apppkg="com.kugou.android.elder"
var apphomeactivity="com.kugou.android.app.MediaActivity"
var apploginactivity="com.kugou.common.useraccount.app.KgUserLoginAndRegActivity"  // 登录页面
var appname="酷狗音乐大字版" 
var appmediaactivity="com.kugou.android.app.MediaActivity"  //

var 首次点击文本集合=["同意","确定","允许","允许","始终允许","始终允许","我知道了","赚钱","立即登录"]
var 微信登录文本集合=["微信登录","同意"]
var 微信登录成功文本标志=["获得新人金币","签到成功"]

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

var keepappnewer=true
var 酷狗大字版邀请码格式="【复制此消息】打开酷狗大字版，可自动填我的邀请码【yqm】一起拿钱！"
var 邀请码集合=["5K74NU","YCN0VB"]

//app 运行
var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_login_check()
  
    n_i=0
    while(true){
        log("循环次数："+n_i)
         app_go_home(5)
        if(textclick("赚钱")){
            滑动(20,10,16,10,8,500,200)
            sleep(1000)
        }
        
        if(maytextclick("去填写")){
            let text_yqm=邀请码集合[randomint(0,邀请码集合.length)]
        let text_yqmt=酷狗大字版邀请码格式.replace("yqm",text_yqm)
        setClip(text_yqmt)
        text("一键粘贴").waitFor()
        textclick("一键粘贴")
        sleep(10000)
        back()
        }
        node_rewardvideo_title=textStartsWith("刷创意视频(").findOne(200)
        if(node_rewardvideo_title){
            title=node_rewardvideo_title.text()
            n=title.replace("刷创意视频(","").replace("/20","")
            log("已经奖励的次数："+n)
            i_n=parseInt(n)
            if(i_n<20){
               if( textclick("去赚钱")){
                seead()
               }
                
            }
        }
        

        idclick("com.kugou.android.elder:id/ezq")
        close_ad_qq(apppkg)
        close_ad_toutiao(apppkg)
        close_ad_iclicash(apppkg)
        n_i=n_i+1
        sleep(2000)
    }

}


var app_login_check=function(){
    
    app_go_home(5)
    doactionmaxtime(function(){
        show("检测"+appname+"登录状况")
        if(textclick("赚钱")){
            sleep(2000)
            if(text("未登录").exists()){
               if( textclick("未登录")){
                   sleep(1500)
               }
               clicktexts(["微信登录","同意"],150,1500)
            }else{
                return true
            }
        }
        clicktexts(["同意","确定","允许","我知道了","允许"])
        sleep(1000)
      
    },30000)
}

//app 登录
var app_login=function(){

}


var seead=function(timeout){
    seeadnum=seeadnum+1

if(doactionmaxtime(function(){
    show(appname+":看广告："+seeadnum)
    if(maytextclick("看视频再",300)){
        show("看视频再")
    }
     if(text("点击重播").exists()){
            back()
            sleep(1000)
            return true
     }
     if(close_ad_qq(apppkg)){
            return true
      }
       if(close_ad_toutiao(apppkg)){
           return true
       }
       if(close_ad_iclicash(apppkg)){
            return true
       }
        if(text("奖励已到账").exists()){
            back()
            sleep(1000)
            return true
        }
 
      if(isadviceactivity()>-1){
          show("是广告页:")
          
      }else{
        return true
      }
        if(idoneexist(视频页标记id集合)){
            return true
        }
        if(!idContains(apppkg).exists()){
            return true
        }
    },60000)){
        return true
    }
    return false
}


//
var app_go_home=function(index){
    doactionmaxtime(function(){
        ca=currentActivity()
        if(ca==apphomeactivity){
            if(index==1){
                if(getTextfromid("com.kugou.android.elder:id/fos")=="听歌"){
                    return true
                }else{
                    selectnavi(1)
                }
                
            }else if(index==2){
                if(getTextfromid("com.kugou.android.elder:id/fos")=="视频"){
                    return true
                }else{
                    selectnavi(1)
                }
            }else if(index==3){
                
            }else if(index==4){
              if(text("K歌").findOne(300)){
                  return true
              }else{
                  selectnavi(4)
              }
            }else if(index==5){
                if(text("提现").findOne(300)){
                    return true
                }
                if(text("每日签到").findOne(300)){
                    return true
                }
                if(text("看视频获金币").findOne(300)){
                    return true
                }
                selectnavi(5)
            }
        }else if(ca="com.kugou.android.app.splash.GdtSplashActivity"){
            sleep(5000)
        }else{
            if(currentPackage()==apppkg){
                back()
                sleep(300)
            }else{
                app.launch(apppkg)
                sleep(3000)
            }
        }
    },60000)
}
//app 微信登录


var selectnavi=function(index){
    node_tabs=className("android.widget.RelativeLayout").depth(9).drawingOrder(index).findOne(200)
    if(node_tabs){
       node_tabs.click()
    }
}

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

//app 回到操作的主页

function  app_home_video(){
    if(doactionmaxtime(function(){
        ca=currentActivity()
        if(ca==apphomeactivity){
            return true
        }else if(ca=="com.kugou.android.app.elder.a.c")
        if(currentPackage()!=apppkg){
            log("酷狗音乐大字版不在前台")
            app.launch(apppkg)
            sleep(3000)
        }
        sleep(1000)

 
     },10000)){return true}else{
         forcestop(appname)
         app.launch(apppkg)
     }
 }


//app邀请
var app_invite=function(){
    app_go_home(5)
    if(textclick("赚钱")){
        sleep(1000)
        滑动(20,10,17,11,3,500,300)
        sleep(1000)
        滑动(20,10,17,11,3,500,300)
        sleep(1000)
    }
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


startapp(appname,apppkg,0,device.height-200,false,false,true,true)

