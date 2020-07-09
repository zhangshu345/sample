auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
function httpget(url) {
    let r = http.get(url);
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
//微信链接邀请绑定 之后登陆 广告有qq 

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
var 首次点击文本集合=["允许","允许","始终允许","始终允许","立即提现","点这里设置铃声","立即登录","微信登录"]
var 设置第一个来电铃声赚钱的关闭id="com.zheyun.bumblebee:id/base_card_dialog_close"  //设置第一个来电铃声   赚
var 设置第一个来电铃声赚钱的立即设置按钮id="com.zheyun.bumblebee:id/tv_confirm"  // 立即设置    之后弹出暂不领取
var 视频广告结束弹窗关闭id="com.zheyun.bumblebee:id/iv_close"
var loopn=0
var keepappnewer=true
//app 运行
var app_run=function(){
    app_invite()
    app.launch(apppkg)
    sleep(3000)
    app_checklogin()
    app_tomoney()
    app_sign()
    app_see_music()
    app_reward_xunzhang()
    app_tomoney()
    app_see_video()
    app_see_lingsheng()
    app_tomoney()
    app_reward()
}

var app_invite=function(){
    if(!获取记录(appname,"login",false)){
        return true
    }
    微信发消息("微信团队","http://ling.kdeye.cn/imfh/asyb.html?pid=62ce793f&app_id=39",true)
    doactionmaxtime(function(){
            clicknode(className("android.view.View").clickable().depth(22).findOne(1000))
            textclick("同意")
    },30000)

}


var app_checklogin=function(){
 
    doactionmaxtime(function(){
        show(appname+"检测登录状态")
        clicktexts(["允许","始终允许"])
        if(textStartsWith("邀请码").findOne(500)){
            return true
        }
         //立即设置的对话框的关闭按钮 
       if(idclick("com.zheyun.bumblebee:id/base_card_dialog_close")){
           return true
       } 
      //  趣铃声给您发红包了弹窗  開这个字的id
       if(idclick("com.zheyun.bumblebee:id/iv_open_red_packet")){
           app_login()
       }
       if(clickonetexts(["微信登录","立即登录"])){
           app_login()
       }
       if(clickonemaytexts(["看视频再","获得"])){
           sleep(3000)
           seead()
       }
       app_go_home(5)
    },38000)
    记录(appname,"login",true)
}
//app 签到
var app_sign=function(){
    if(今日签到(appname)){
        toastLog(appname+"今日已经完成签到")
        return true
    }
    doactionmaxtime(function(){
        app_go_home(4)
        if(clickonetexts(["看视频，签到奖励翻倍！","领取","立即领取"])){
            sleep(3000)
            seead()
            今日已签到(appname)
            return true
        }
       
    },30000)

}


var app_see_lingsheng=function(){

doactionmaxnumber(function(n){
    show(appname+"看铃声视频"+n)
    app_go_home(1)
    if(textexists("点这里设置铃声")){
        press(300,300,50)
    }
    滑动(20,10,17,10,3,500,300)
    doactionmaxtime(function(){
        closeappundostate()
        if(maytextclick("看视频")){
            sleep(3000)
            seead()
        }
        if(clickonetexts(["看视频，签到奖励翻倍！","领取","立即领取"])){
            sleep(3000)
            seead()
        }
        idclick("com.zheyun.bumblebee:id/iv_close")
        if(isadviceactivity()>-1){
            seead()
        }
    },10000,1500)

},100)

}


var app_see_music=function(){

    doactionmaxnumber(function(n){
        show(appname+"看小视频"+n)
        app_go_home(2)
        
        selectmusictab("抖音")
        sleep(1000)
        idclick("com.zheyun.bumblebee:id/iv_player_next")
        doactionmaxtime(function(){
            closeappundostate()
            if(maytextclick("看视频")){
                sleep(3000)
                seead()
            }
            if(clickonetexts(["看视频，签到奖励翻倍！","领取","立即领取"])){
                sleep(3000)
                seead()
            }
            idclick("com.zheyun.bumblebee:id/iv_close")
            if(isadviceactivity()>-1){
                seead()
            }
        },28000,3000)
    
    },50)
}


var  app_see_video=function(){
    doactionmaxnumber(function(n){
        show(appname+"看小视频"+n)
        app_go_home(3)
        sleep(1000)
       state= getTextfromid("com.zheyun.bumblebee:id/tv_task_status")
       if(state){
           log("奖励状态:"+state.text())
           if(state.text().search("10|30")>-1){
               return true
           }
       }
        滑动(20,10,16,10,3,500,300)
        doactionmaxtime(function(){
            closeappundostate()
            if(maytextclick("看视频")){
                sleep(3000)
                seead()
            }
            if(clickonetexts(["看视频，签到奖励翻倍！","领取","立即领取"])){
                sleep(3000)
                seead()
            }
            idclick("com.zheyun.bumblebee:id/iv_close")
            if(isadviceactivity()>-1){
                seead()
            }
        },10000,2000)
    
    },100)
    
}

var selectmusictab=function(tab){
  node_tab=  text(tab).id("com.zheyun.bumblebee:id/custom_tab_text").findOne(500)
  if(node_tab){
      if(!node_tab.selected()){
        clicknode(node_tab)
      }
  }
}

var seead=function(){
    n_seead=0
    doactionmaxtime(function(){
        show(appname+"广告循环:"+n_seead)
         n_seead=n_seead+1
         if(textoneexist(["勋章殿堂"])){
             clicktexts(["可领取","快速领取下一个勋章奖励"])
         }
        if(textclick("金币已到账")){
            back()
            sleep(1000)
            return true
        }
        if(close_ad_toutiao(apppkg)){
            return true
        }
        if( close_ad_qq(apppkg)){
            return true
        }
        if(close_ad_iclicash(apppkg)){
           return true
        }
        if(isadviceactivity()<0){
            return true
        }
 
        sleep(2500)
    },60000)

}

//app 登录  
var app_login=function(){
     clicktexts(首次点击文本集合)
     app_login_weixin()
}

//app 微信登录
var app_login_weixin=function(){
    // if(currentActivity()==apploginactivity){
        clicktexts(["微信登录","微信","同意"],100,2000)
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
            if(text("新手提现大礼包").exists()){
                clicktexts([])
            }
        }
    //}
}

//app_手机号登录
var app_login_phone=function(){
    if(currentActivity()==apploginactivity){

        

    }
}


//app提现
var app_tomoney=function(){
    
    doactionmaxnumber(function(n){
        show(appname+"提现"+n)
        if(!text("我的钱包").exists()){
            app_go_home(5)
            滑动(20,10,4,15,500,100)
            sleep(3000)
            text("提现").findOne(5000)
            node_coinp=text("今日金币").findOne(500)
            if(node_coinp){
               p= node_coinp.parent()
                if(p){
                  todaycoin=  parseInt(p.child(0).text())
                  show(appname+"今日金币")
                  if(todaycoin<3000){
                        return true
                  }else{
                      textclick("提现")
                  }
                }
            }
        }else{
            clicktexts(["提现","天天可提","0.3元"],500,2000)
            if(textclick("立即提现")){
                sleep(3000)
                seead()
                sleep(1000)
            }
        }
        if(text("提现成功").exists()){
            clicknode(className("android.widget.Image").clickable().depth(13).drawingOrder(0).findOne(500))
            back()
            return true
        }
        
    },10)
}

var selectnavi=function(index){
    show(appname+"选择导航:"+index)
    if(clicknode(className("android.widget.FrameLayout").drawingOrder(index).depth(8).clickable().findOne(300))){
        return true
    }
    if(index==1){
       textclick("小视频")
    }else if(index==2){
        textclick("看剧")
    }else if(index==3){
        textclick("任务")
    }else if(index==4){
        textclick("拍摄")
    }else if(index==5){
        textclick("我的")
    }

}


var app_go_home=function(index){
    doactionmaxtime(function(){
        show(appname+"回到首页:"+index)
        if(maytextclick("看视频再")){
            sleep(3000)
            seead()
        }
        if(clickonetexts(["看视频，签到奖励翻倍！","领取","立即领取"])){
            sleep(3000)
            seead()
        }
        idclick("com.zheyun.bumblebee:id/base_card_dialog_close")
        idclick("com.zheyun.bumblebee:id/iv_close")
        ca=currentActivity()
        show(appname+"回到首页:"+index+"|"+ca)
        if(ca==apphomeactivity||ca=="com.zheyun.bumblebee.loginguide.d"){
            if(index==1){
                selectnavi(1)
            }else if(index==2){
                selectnavi(2)
            }else if(index==3){
                selectnavi(3)
            }else if(index==4){
                selectnavi(4)
            }else if(index==5){
                selectnavi(5)
            }
            return true
        }else if(ca=="com.zheyun.bumblebee.video.user.VideoUserActivity"){
            back()
        }else if(ca=="com.jm.video.services.StartNotificationActivity"){
            if(maytextclick("看视频再")){
                sleep(3000)
                seead()
                sleep(2000)
            }
            idclick("com.zheyun.bumblebee:id/iv_close")
            selectnavi(index)
        }else if(ca=="com.jifen.qu.open.QX5WebViewActivity"){
            back()
        }else{
            if(currentPackage()!=apppkg){
                app.launch(apppkg)
                sleep(3888)
            }
        }
        if(isadviceactivity()>-1){
            seead()
        }
     
     sleep(1000)
   
    },30000)

}

var app_reward_xunzhang=function(){
    doactionmaxnumber(function(n){
        show(appname+"勋章奖励:"+n)
        if(currentActivity()!="com.jifen.qu.open.QX5WebViewActivity"){
            app_go_home(5)
            sleep(2000)
            doactionmaxtime(function(){
                if(text("勋章殿堂").exists()){
                      
                        if(clicknode( node_xz=text("勋章殿堂").visibleToUser().findOne(500),0,-35)){
                            return true
                        }

                }
               
            },10000,1000)
        }else{
            滑动(20,10,14,10,8,500,300)
            sleep(200)
        }
        if(text("勋章殿堂").exists()){
            if(textclick("可领取",500)){
                sleep(2000)
                seead()
            }
            if(textclick("快速领取下一个勋章奖励")){
                sleep(3000)
                seead()
            }
        }
        if(clicknode(className("android.widget.Image").clickable().drawingOrder(0).depth(17).findOne(500))){
            
        }
    },20)
}

// while(true){
//     sleep(3000)
//     app_go_home(1)
//     sleep(3000)
//     app_go_home(2)
//     sleep(3000)
//     app_go_home(3)
//     sleep(3000)
//     app_go_home(4)
//     sleep(3000)
//     app_go_home(5)
// }
// app_see_video()
// app_see_music()
// app_reward_xunzhang()
startapp(appname,apppkg,0,device.height-200,false,false,true,true)