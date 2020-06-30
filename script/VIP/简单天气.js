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
var  lastlike=""
var loopn=0
var 小视频广告翻倍次数=0
//关闭最新的app

//app 运行
var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_login_check()
    app_tomoney()
    app_sign()
    loopn=0
    while(true){
        sleep(2000)
        log("循环次数："+loopn)
            //这里是视频上滑操作
        app_home_sweep()
        // close_ad_qq(apppkg)
        // close_ad_toutiao(apppkg)
        close_ad_iclicash(apppkg)
        sleep(5000)
        loopn=loopn+1
    }
}

var app_home_sweep=function(){
   
    doactionmaxtime(function(){
        if(!idoneexist(["com.jifen.ponycamera:id/image_gold_egg","com.jifen.ponycamera:id/tv_like"])){
            show(appname+"不在视频页 回到视频页")
            app_go_home(1)
        }
        if(idclick("com.jifen.ponycamera:id/base_card_dialog_confirm")){
            show(appname+"点击看领金币 id")
            sleep(3000)
            seead()
        }else{
            show("金币对话框确认没找到")
        }
        if(idclick("com.jifen.ponycamera:id/tv_ad_button")){
            show(appname+"点击看视频再领 id")
            sleep(3000)
            seead()
        }else{
            show(appname+"点击看视频再领 id 没有找到")
        }
        if(maytextclick("看视频再领")){
            show(appname+"点击 看视频再领")
            sleep(3000)
            seead()
            小视频广告翻倍次数=小视频广告翻倍次数+1
        }else{
            show("看视频再领 没有找到")
        }
        if(maytextclick("看视频再送")){
            sleep(3000)
            seead()
            小视频广告翻倍次数=小视频广告翻倍次数+1
        }
        clickgold()

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
    
    doactionmaxtime(function(){
        show("检测"+appname+"登录状况")
        app_go_home(4)
        clicktexts(["同意","允许","允许","始终允许","始终允许"],200,1500)
        if(idclick("com.jifen.ponycamera:id/iv_open_btn")){
            app_login()
        }
    if(text("可提现").exists()){
        return true
    }else{
       show(appname+" 没有找到可提现")
    }

    if(textContains("邀请码").exists()){
        return true
    }else{
        show(appname+" 没有找到邀请码")
    }
    if(desc("可提现").exists()){
        return true
    }else{
       show(appname+" 没有找到可提现")
    }

    if(descContains("邀请码").exists()){
        return true
    }else{
        show(appname+" 没有找到邀请码")
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
        show(appname+"微信登录")
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
    doactionmaxtime(function(){
        if(maytextclick("看视频再送")){
            seead()
        }
        if(textclick("天天分现金")){
            app_reward_luck()
        }

        if(text("看福利视频").exists()){
            app_reward_video()
        }else{
            滑动(20,10,17,10,3,500,300)
        }
    },20000)
}

var app_reward_video=function(){
    doactionmaxnumber(function(){
        if(textclick("去观看")){
          
        }
        if(descclick("去观看")){
 
        }
        seead()
      sleep(1000)
    },5)
}


//小糖糕是12 
var app_reward_luck=function(){
    doactionmaxtime(function(){
        if(text("幸运抽奖").exists()){
            if(text("本期剩余次数0").exists()){
                return true
            }
            textclick("返回",200)
           node_yyy= className("android.widget.Button").visibleToUser().depth(12).clickable().findOne(300)
            if(node_yyy){
                show("找到摇一摇")
                bd=node_yyy.bounds()
                log("摇一摇位置:"+bd.centerX()+","+bd.centerY())
                click(bd.centerX(),bd.centerY())
                seead()
            }
        }else{

        }
   
    },500000)
}

//app提现
// //app提现
var app_tomoney=function(){

    if(今日提现(appname)){
        show(appname+":今日已经提现了")
        return true
    }
    app_go_home(4)
  return doactionmaxtime(function(){
    show(appname+"开始提现")
       sleep(1000)
       nca=currentActivity()
       show("当前activity:"+nca)
       //idclick("com.xiaoqiao.qclean:id/iv_close")
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
                      sleep(1000)
                  }
              }
          }
       }else if(nca=="com.jifen.qu.withdraw.WithdrawActivity"){
           clicktexts(["去提现","每天可提"],300,2000)
           if(idclick("com.jifen.ponycamera:id/withdraw_btn")){
               show("点击立即提现")
               sleep(500)
               if(textContains("每日最多提现一次").findOne(1000)){
                今日已提现(appname)
                return true
                }
               sleep(5000)
               if(currentActivity()=="com.jifen.qu.withdraw.WithdrawActivity"){
                    今日已提现(appname)
                   return true
               }
               seead()
               
           }
           
       }else{
           if(!idContains(apppkg).exists()){
               app.launch(apppkg)
               sleep(4000)
           }
       }
    
       if(textContains("提现申请提交成功").exists()){
           今日已提现(appname)
           return true
       }
   },60000)
}




//app邀请
var app_invite=function(){


}


var app_go_home=function(index){
    if(doactionmaxtime(function(){
        closeappundostate()
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
                selectnavi(4)
                return true
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
  if(idclick("com.jifen.ponycamera:id/image_complete",300)){
      show(appname+"金蛋点击成功")
     sleep(1500)
    if(maytextclick("看视频再领")){
        seead()
        return true
        小视频广告翻倍次数=小视频广告翻倍次数+1
    }
    if(maytextclick("看视频再送")){
        seead()
        return true
        小视频广告翻倍次数=小视频广告翻倍次数+1
    }
    selectnavi(1)
    return false
  }
  return false
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
    doactionmaxtime(function(){
        show(appname+"看广告")
     
        if(text("勋章殿堂").exists()){
            clickonetexts(["去领取","待领取","可领取"])
        }
        if(maytextclick("看视频再领")){
            
        }
        if(maytextclick("看视频再送")){
            
        }
        if(clickoneids(["com.jifen.ponycamera:id/iv_close","com.jifen.ponycamera:id/tv_close"],150,1500)){
            back()
            return true
        }
        if(text("点击重播").exists()){
            back()
            sleep(500)
            back()
            return  true
        }
       if(idclick("com.jifen.ponycamera:id/tt_video_ad_close")){
           return  true
       }
        if(text("邀请好友").findOne(500)){
           
            return  true
        }
        if(textclick("金币已到账")){
            back()
            return true
        }
      if(close_ad_iclicash(apppkg)){
         return true
      }
       if(close_ad_toutiao(apppkg)){
           return true 
       }
      if(close_ad_qq(apppkg)){
         return true
      }

      ca=currentActivity()
      if(ca==apphomeactivity){
          return true
      }
      sleep(1000)
    },60000)
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

