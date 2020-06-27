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
//微信链接邀请绑定 之后登陆  http://xiaoma.cmsswkj.cn/s5i/QmLB.html?pid=634ee0f0&app_id=80

/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */
//应用名
var appname="小糖糕"
var apppkg="com.jifen.ponycamera"
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
var apphomeactivity="com.jifen.ponycamera.commonbusiness.MainActivity"
var keepappnewer=true

var 小视频广告翻倍次数=0
//关闭最新的app

//app 运行
var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_login_check()
    n_i=0
    while(true){
        sleep(2000)
        log("循环次数："+n_i)
        if(n_i%100==0){
            app_sign()
        }
            //这里是视频上滑操作
            app_home_sweep()
       
        close_ad_qq(apppkg)
        close_ad_toutiao(apppkg)
        close_ad_iclicash(apppkg)
        sleep(5000)
        n_i=n_i+1
    }
}

var app_home_sweep=function(){
    lastlike=""
    doactionmaxtime(function(){
        if(!idoneexist(["com.jifen.ponycamera:id/image_gold_egg","com.jifen.ponycamera:id/tv_like"])){
            app_go_home(1)
        }
        clickgold()
        if(idclick("com.jifen.ponycamera:id/base_card_dialog_confirm")){
            seead()
        }
        滑动(20,10,17,10,3,500,300)
        sleep(2000)
        txt_like=getTextfromid("com.jifen.ponycamera:id/tv_like")
        if(txt_like){
            if(txt_like.search("w")>-1){
               // idclick("com.jifen.ponycamera:id/tv_like")
            }else{
                n_like=parseInt(txt_like)
                
            }
            if(lastlike!=txt_like){
                lastlike=txt_like
                return true
            }
        }
    },30000)

}

var app_login_check=function(){
    show("检测"+appname+"登录状况")
    doactionmaxtime(function(){
        app_go_home(4)

        clicktexts(["同意","允许","允许","始终允许","始终允许"],200,1500)
        if(idclick("com.jifen.ponycamera:id/iv_open_btn")){
            app_login()
        }
    if( node_ktx=text("可提现").depth(13).findOne(300)){
        return true
    }
    },60000)
}



var app_close_alter=function(){

}
//app 登录
var app_login=function(){
 app_login_weixin()
}

//app 微信登录
var app_login_weixin=function(){
    doactionmaxtime(function(){
        clicktexts(["微信一键登录","同意","立即提现"],150,2000)
        if(text("我的钱包").exists()){
            return true
        }
        if(idclick("com.jifen.ponycamera:id/base_card_dialog_close")){

        }
        if(maytextclick("看视频再送")){
            seead()
        }

    },60000)
}

//app_手机号登录
var app_login_phone=function(){

}

//app 签到
var app_sign=function(){
    app_go_home(3)
}

//app提现
// //app提现
var app_tomoney=function(){
    show("开始提现")
    if(今日提现(appname)){
        show(appname+":今日已经提现了")
        return true
    }
  return doactionmaxtime(function(){
       app_go_home(4)
       sleep(1000)
       nca=currentActivity()
       show("当前activity:"+nca)
       idclick("com.xiaoqiao.qclean:id/iv_close")
       if(nca==apphomeactivity){
          node_ktx=text("可提现").depth(13).findOne()
          if(node_ktx){
              node_money=node_ktx.parent().child(0)
              if(node_money){
                  f_money=parseFloat(node_money.text())
                  toastLog(appname+"可提现金额:"+node_money.text())
                  if(f_money<minmoney){
                      toastLog("不够提现余额")
                      return true
                  }else{
                      textclick("可提现")
                    
                  }
              }
          }
       }else if(nca=="com.jifen.qu.withdraw.WithdrawActivity"){
           clicktexts(["去提现","每天可提现","立即提现"],300,2000)
           
       }else{
           if(!idContains(apppkg).exists()){
               app.launch(apppkg)
               sleep(4000)
           }else{
               back()
           }
       }
    
       if(textContains("提现申请提交成功").exists()){
           今日已提现(appname)
           return true
       }
   },20000)
}




//app邀请
var app_invite=function(){
    
    

}


var app_go_home=function(index){
    if(doactionmaxtime(function(){
        ca=currentActivity()
        if(ca==apphomeactivity){
            if(index==1){
                if(idoneexist(["com.jifen.ponycamera:id/image_complete","com.jifen.ponycamera:id/tv_task_status","com.jifen.ponycamera:id/image_gold_egg","com.jifen.ponycamera:id/tv_like"])){
                    return true
                }else{
                    selectnavi(1)
                }
            }else if(index==2){
                selectnavi(2)
                return true
            }else if(index==3){
                selectnavi(3)
                return true
            } else if(index==4){
                if( node_ktx=text("可提现").depth(13).findOne(300)){
                    return true
                }else{
                    selectnavi(4)
                    sleep(1000)
                }
            }

        }else{
            if(currentPackage()!=apppkg){
                app.launch(apppkg);
                sleep(3000)
            }else{
                back()
            }
           
        }
      
        if(maytextclick("看视频再领")){
            seead()
        }
 
     },30000)){return true
    
    }else{
         forcestop(appname)
         app.launch(apppkg)
         sleep(3000)
     }
}

var clickgold=function(){
  
  if(idclick("com.jifen.ponycamera:id/image_complete")){
    sleep(2000)
    if(maytextclick("看视频再领")){
        seead()
        小视频广告翻倍次数=小视频广告翻倍次数+1
    }
  }

}

var selectnavi=function(index){
    node_bottom=id("com.jifen.ponycamera:id/main_bottom_layout").findOne(300)
    if(node_bottom){
        if(node_bottom.childCount()>=index){
            if(node_bottom.child(index-1)){
                clicknode(node_bottom.child(index-1))
                return true
            }
        }
       
    }
   node_navi= className("android.widget.FrameLayout").clickable(true).drawingOrder(index).depth(7).findOne(200)
   if(node_navi){
       node_navi.click()
   }
}

var seead=function(){
    log("seead")
    doactionmaxtime(function(){
        show(appname+"看广告")
        if(text("勋章殿堂").exists()){
            clickonetexts(["去领取","待领取","可领取"])
        }
         if(maytextclick("看视频再领")){
            
        }
        if(clickoneids(["com.jifen.ponycamera:id/iv_close","com.jifen.ponycamera:id/tv_close"],150,1500)){
            back()
            return true
        }
        if(text("点击重播").exists()){
            back()
            sleep(2500)
            back()
            return  true
        }
       if(idclick("com.jifen.ponycamera:id/tt_video_ad_close")){
           return  true
       }
       
        if(text("邀请好友").findOne(500)){
            back()
            return  true
        }
        if(textclick("金币已到账")){
            back()
            return true
        }
      if(close_ad_iclicash(apppkg)){
         
      }
       if(close_ad_toutiao(apppkg)){
           
       }
      if(close_ad_qq(apppkg)){
         
      }
        sleep(2000)
    },60000)
}
selectnavi(4)


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
    alltest()
    // checkfloaty()
    // checksystemsettings()
    // floaty.closeAll()
    // creatgfloatywindow()
    // creatsetfloatywindow()  //创建设置悬浮窗
    // gfw.setPosition(0,220)
    if(changesetting){
        device.setMusicVolume(0)
        toastLog("自动设置音量为0")
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

