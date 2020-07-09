auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
滑动次数=0
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}
var apppkg="com.jt.hanhan.video"
var apphomeactivity="com.qukandian.video.qkdbase.activity.MainActivity"
var appname="火火视频极速版"
var apprewardactivity="com.jifen.qu.open.QWebViewActivity"
var appcoinalteractivity="com.qukandian.video.qkdbase.ad.coin.CoinAdDialog"
var changesetting=false
var onlyscript=true
var  lastlike=""

//邀请 
// 看小视频和视频的 每圈获取金币数 越来越低  最后还是要荣耀殿堂 来     9次看视频广告  720

//200 个小视频之后查看 荣耀殿堂 领取金币 

// "金币翻倍" ,"com.jt.hanhan.video:id/jp"    // 关闭弹窗的关闭按钮 com.jt.hanhan.video:id/jw
// "com.jt.hanhan.video:id/jr"
// 第一次进入  我知道了 声明与政策
// "恭喜您，获得彩蛋奖励！金币已自动发送至您的钱包"


var 进入小视频页面点击文本集合=["小视频"]
var 广告点击按钮文本集合=["金币翻倍"]

var 未登录点击显示文本集合=[]
var 登录成功后界面显示id集合=[]
var 广告展示页面可关闭文本集合=["金币已到账","点击重播"]
var logintype="phone"  //weixin 是微信登录 phone 是手机号登录
var 视频次数=0
var action="小视频"
var lastdesc=""
var 小视频广告翻倍次数=0
var tomoney=true



var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_checklogin()
    if(今日签到(appname)!="true"){
        app_sign()
    }
    app_reward_88()
    app_reward_zhuazhua()
    app_reward_todaymoney()
    app_reward_video()
    app_tomoney()
    app_see_video()
    app_tomoney()
    app_see_small_video()
    app_reward_xunzhang()
    app_tomoney()
   
}

var app_checklogin=function(){
    try {
        doactionmaxtime(function(){
            show(appname+"检测登录状况")
            ca=currentActivity()
            if(ca==apphomeactivity){
                if(clicktexts(["同意","声明与政策","我知道了","允许","始终允许","開"],200,1288)){
                 
                }
            }else if(ca=="com.qukandian.video.qkdbase.widget.dialog.CoinChargeIntroDialog"){
                    textclick("取消")
            }
            if(textclick("微信一键登录")){
                app_login_weixin()
            }
           //缺判断登录的标志
           if(idoneexist(["com.jt.hanhan.video:id/ig","com.jt.hanhan.video:id/iq"])){
            return true
            }
            if(clickonetexts(["翻倍","领取"])){
                seead()
            }
            if(textoneexist(["新手任务","已签到"])){
                return true
            }
            if(text("再接再厉，赚更多哦~").exists()){
                clicknode(className("android.widget.FrameLayout").clickable().depth(5).drawingOrder(2).findOne(300))
            }
            app_go_home(4)
           },30000)
    } catch (error) {
        log(appname+"出错：检测登录状况"+error)
    }
   
   show(appname+"检测登录完毕")
}


var clickgold=function(){
    try {
        show(appname+"点击金蛋")
        node_gold=text("金蛋大奖").visibleToUser().findOne(200)
        if(node_gold){
            bd=node_gold.bounds()
            click(bd.centerX(),bd.top-30)
            sleep(2000)
            if(maytextclick("看视频再送")){
                sleep(3000)
                seead()
               小视频广告翻倍次数=小视频广告翻倍次数+1
            }
            if(text("赚钱小技巧").exists()){
               back()
               sleep(1500)
           }
        }else{
            show("没有找到金蛋大奖：")
        }
    } catch (error) {
        
    }
}


var app_small_video_swipe=function(){
    doactionmaxtime(function(){
      

    
    
    },20000)

 
}
function app_see_video(){
    closeappundostate()
    app_go_home(1)
    doactionmaxnumber(function(ln){
        show(appname+"看视频:"+ln)
        sleep(1000)
        if(text("再接再厉，赚更多哦~").exists()){
            clicknode(className("android.widget.FrameLayout").clickable().depth(5).drawingOrder(2).findOne(300))
        }
        if(clicknode(className("android.widget.ImageView").clickable().drawingOrder(11).depth(14).visibleToUser().findOne(500))){
            sleep(2000)
                doactionmaxtime(function(){
                    if(!className("com.qukan.media.player.renderview.TextureRenderView").visibleToUser().clickable().exists()){
                        return true
                    }
                    if(text("再接再厉，赚更多哦~").exists()){
                        clicknode(className("android.widget.FrameLayout").clickable().depth(5).drawingOrder(2).findOne(300))
                    }
                    clickgold()
                    sleep(5000)
                    if(isadviceactivity()){
                        seead()
                    }
             },30000)
        }
        sleep(1000)
         滑动(20,10,17,11,7,800,300)
    },50)
  
    
   
}


function app_see_small_video(){
    show(appname+"看小视频")
    app_go_home(2)
    doactionmaxnumber(function(ln){
        show(appname+"看小视频:"+ln)
        sleep(2000)
        tv_like=className("android.widget.TextView").clickable().drawingOrder(1).visibleToUser().findOne(300)
                //点赞多的视频
                if(tv_like){
                    dzstr=tv_like.text()
                    if(dzstr!=lastlike){
                        lastlike=dzstr
                        if(dzstr.search("万") != -1){
                            tv_like.click()
                        }
                      doactionmaxtime(function(){
                          if(clickgold()){
                              seead()
                          }
                          if(clickonetexts(广告点击按钮文本集合,500,1500)){
                            seead()
                            }
                            sleep(2000)
                      },10000)
                    }
                }
            滑动(20,10,16,10,3,500,200)
    },50)
}




var  app_reward_xunzhang=function(){

    let nf=0
doactionmaxnumber(function(){
    show(appname+"勋章殿堂")
    if(text("勋章殿堂").exists()){
        textclick("勋章殿堂")
        if(clicknode(text("可领取").clickable(false).findOne(300),0,-20)){
            sleep(3000)
            seead()
            sleep(1000)
            if(text("再接再厉，赚更多哦~").exists()){
                clicknode(className("android.widget.FrameLayout").clickable().depth(5).drawingOrder(2).findOne(300))
            }
        }else{
            nf=nf+1
            滑动(20,10,16,10,5,500,200)
            sleep(2000)
        }
       if(nf>20){
           return true
       }

    }else{
        app_go_home(4)
        sleep(2000)
        if(text("看视频即可打开").exists()){
            clicknode(text("看视频即可打开").findOne(300),0,-80)
            sleep(3000)
            seead()
        }
        滑动(20,10,3,10,17,1000,200)
        sleep(1000)
        if(!textclick("勋章殿堂")){
            滑动(20,10,17,10,5,1000,200)
            sleep(1000)
           textclick("勋章殿堂")
        }
    }

    sleep(1000)
},20)

}

var seead=function(){
    n_seead=0
    show(appname+"看广告")
    doactionmaxtime(function(){
        show("广告循环:"+n_seead)
        if(idclick("com.jt.hanhan.video:id/k9")){
            return true
        }
        n_seead=n_seead+1
        if(text("邀请好友").findOne(500)){
            back()
            sleep(1000)
        }
        if(textclick("金币已到账")){
            back()
            sleep(1000)
        }
        if(textoneexist(["88元扭蛋机","天天抓好礼","今日有钱花"])){
           clicknode(className("android.view.View").depth(12).drawingOrder(0).clickable().findOne(300))
           return true
        }
        if(text("勋章殿堂").exists()){
            return true
        }
        if(close_ad_toutiao(apppkg)){
            sleep(1000)
            idclick("com.jt.hanhan.video:id/jw")
            return true
        }
        if( close_ad_qq(apppkg)){
            return true
        }
        if(close_ad_iclicash(apppkg)){
           return true
        }
        if(idclick("com.jt.hanhan.video:id/jw")){
            sleep(1000)
            return  true
        }
        node_close=className("android.widget.FrameLayout").clickable(true).depth(5).drawingOrder(2).findOne(100)
        if(node_close){
            if(clicknode(node_close)){
                return true
            }
        }
        if(!isadviceactivity()){
            return true
        }
        jddj=id(火火视频金蛋大奖id).findOne(300)
        if(jddj){
            return true
        }
        if(textclick("确定")){

        }
        if(text("勋章殿堂").visibleToUser().exists()){
            return true
        }
     if(!isadviceactivity()){
          return true
     }
        if(text("已签到").exists()){
            return true
        }
        sleep(2500)
    },60000)
    if(idclick("com.jt.hanhan.video:id/jw")){
        sleep(1000)
        return true
    }
}


var app_go_home=function(index){
    show(appname+"回到主页"+index)
   if( doactionmaxtime(function(){
       closeappundostate()
       ca=currentActivity()
       show(appname+":activity:"+ca)
       if(ca==apphomeactivity){
           if(index==1){

                selectnavi(1)
                return true
           }else if(index==2){
           
            if(textoneexist(["收藏","我来说两句..."])){
                return true
            }
            selectnavi(2)
            return true

           }else if(index==3){
            selectnavi(3)
            return true
           }else if(index==4){
            selectnavi(4)
            return true
           }else{
            selectnavi(1)
            return true
           }
    
       }else if(ca==appcoinalteractivity){
            if(idclick("com.jt.hanhan.video:id/k9")){

            }else{
              node_close=  className("android.widget.FrameLayout").depth(5).visibleToUser().clickable().findOne(200)
              node_close.click()
            }

       } else if(ca==apprewardactivity){
           if(text("荣耀殿堂").exists()){
               app_get_reward()
           }
           back()
           sleep(1000)
       }else{
           if(currentPackage()!=apppkg){
               app.launch(apppkg)
               sleep(3000)
           }else{
            back()
           }
       }
   },30000)){
       return true
   }else{
       forcestop(appname)
       app.launch(apppkg)
       sleep(3000)
       
   }
}

var app_sign=function(){
    n_sign=0
    doactionmaxtime(function(){
        show(appname+"签到")
        hi=id("com.jt.hanhan.video:id/hi").findOne(300)
        if(hi){
            if(clicknode(hi.child(2))){
                    sleep(1000)

           }
        }
        tv_coin=id("com.jt.hanhan.video:id/a4i").findOne(300)
        if(tv_coin){
            n_coin=parseInt(tv_coin.text().replace("今日金币：",""))
            if(n_coin>3000){
                tv_money=id("com.jt.hanhan.video:id/a4f").findOne(3000)
                if(tv_money){
                    记录现在余额(appname,parseFloat(tv_money.text())/1000)
                }
                if(tomoney&&今日提现(appname)){
                    textclick("立即提现")
                    text("立即提现").waitFor()
                    textclick("立即提现")
                    sleep(1000)
                    今日已提现(appname)
                    back()
                }
            }
            记录现在金币(appname,n_coin)
            show("当前金币数:"+n_coin)
        }
     
      if(textclick("金币翻倍")){
          
      }
      b_sign=id("com.jt.hanhan.video:id/u8").findOne(200)
      if(b_sign){
          if(b_sign.text().search(":")!=-1){
              if(clicknode(b_sign)){
                  seead()
              }
          }
      }
      if(textoneexist(["新手任务","已签到"])){
        return true
    }
      seead()
      n_sign=n_sign+1
    },60000)
}
var selectnavi=function(n){
    if(n<1){
        return false
    }
    show(appname+"选择导航:"+n)
 let node_navi=  packageName(apppkg).className("android.widget.RelativeLayout").depth(7).drawingOrder(n).clickable().findOne(300)
 if(node_navi){
        clicknode(node_navi)
 }else{
     selectnavi(n-1)
 }

}

var app_get_reward=function(){
    show(appname+"获取奖励")
    app_go_home(4)
    doactionmaxtime(function(){
    show(appname+"获取奖励内部")
    idclick("com.jt.hanhan.video:id/k9")
    if(text("勋章殿堂").exists()){
        node_clq=text("可领取").className("android.view.View").visibleToUser().findOne(1000)
        if(node_clq){
            bd=node_clq.bounds()
            x=bd.centerX()
            y=bd.centerY()
           if(click(x,y)){
            show("点击可领取位置成功")
             seead()
           }else{
               show("点击可领取位置失败")
           }
        }else{
            show("没有找到可领取")
            滑动(20,10,16,10,3,500,300)
            sleep(1000)
            if(text("新手解锁").visibleToUser().exists()){
                show("找到新手解锁")
                back()
                sleep(300)
                back()
                return  true
            }else{
                show("没有找到新手解锁")
            }
        }
    }
        ca=currentActivity()
        if(ca==apphomeactivity){
            sleep(2000)
            if(!text("日常任务").boundsInside(0,0,device.width,device.height/2).exists()){
                滑动(20,10,16,11,10,500,500)
                sleep(1000)
            }
            n_lingqu=text("日常任务").boundsInside(0,0,device.width,device.height/2).findOne(300)
            if(textclick("领取奖励")){
               
            }  
         //  id("a9j").findOne().parent().parent().click()

        }
        if(idclick("com.jt.hanhan.video:id/jw")){
            sleep(1000)
            return true
        }
        seead()
       sleep(1000)
    },60000)
}

var app_tomoney=function(){
    try {
        show(appname+"提现")
    if(!获取记录("all","switch_tomoney",false)){
        show("全局设置不允许提现")
        return false
    }
    if(今日提现(appname)=="true"){
        show(appname+"今日已经提现了")
        return true
    }
    doactionmaxtime(function(){
        show(appname+"提现")
        if(text("我的钱包").exists()){
            node_tiaojian=textContains("每日获得1000以上金币即可获得一次提现机会").findOne(500)
            if(node_tiaojian){
               if( node_tiaojian.text().search("还需获得")>-1){
                   console.log(appname+"不够提现条件");
                    back()
                    return true
               }else{
                   //这里应该是符合条件的
                    if(textclick("立即提现")){
                        sleep(2000)
                        if(text("申请提现成功").exists()){
                            今日已提现(appname)
                        }
                        textclick("继续做任务赚钱")
                        return true
                    }
               }
            }else{
                滑动(20,10,10,10,8,500,100)
            }

        }else{
            if(text("立即提现").exists()){
                if(textclick("立即提现")){
                }
            }else{
                app_go_home(4)
            }
            
        }
    },30000)
    } catch (error) {
        
    }
    
}

var app_login=function(){
    show(appname+"进行app登录操作")
    if(logintype=="phone"){
        pn=phonenumber()
        if(!pn){
            show("没有获取到手机号请手动登录")
        }
    }

    i=0
    while(i<10){
        show(appname+"登录")
        clicktexts(["允许","允许","允许"],500,1500)
       if( idclick("com.jifen.dandan:id/iv_open")){
           sleep(1000)
       }
  
        if(logintype=="phone"){
            app_login_phone()
        }else{
            app_login_weixin()
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
    reg = /\d{4}/ig
    ephone= id("com.jifen.dandan:id/edt_login_phone").findOne(1000)
            clicknode(ephone)
          sleep(1000)
          ephone.setText(phonenumber())
          sleep(1000)
        if  (idclick("com.jifen.dandan:id/tv_get_captcha")){
            mcode=get_phone_code("",reg,"","")
            if(mcode){
                 id("edt_login_captcha").findOne(1000).setText(mcode)
                 sleep(800)
                 id("btn_confirm").findOne(500).click()
                 sleep(1000)
                 if(apptomoney){

                 }else{
                    back()
                    sleep(1000)
                    back()
                    return true
                 }
            }else{
                show("获取验证码超时")
            }
        }
}

var app_login_weixin=function(){
  doactionmaxtime(function(){
    textclick("微信账号登录")
    sleep(2000)
    clicktexts(["微信账号登录","同意","同意并继续"],500,2500)
    if(idoneexist(["com.jt.hanhan.video:id/ig",""])){
        show("我界面找到昵称和设置")
        spt.put(apppkg+"login",true)
        return true
    }
  },60000)
}
var app_reward_88=function(){
    if(获取今日记录(appname,"88")=="true"){
        return true
    }
    doactionmaxtime(function(){
        show(appname+"88元扭蛋机")
        if(text("88元扭蛋机").exists()){
            if(text("今日免费: 0次").exists()){
                今日记录(appname,"88","true")
                return true
            }
           node_yyy= text("看视频抽大奖").visibleToUser().depth(18).clickable(false).findOne(300)
            if(node_yyy){
                show("找到看视频抽大奖")
               clicknode(node_yyy,0,50)
                sleep(3000)
                seead()
            }else{
                show("没有找到看视频抽大奖")
            }
        }else{
            app_go_home(4)
            sleep(3000)
    
            if(!textclick("抢福利")){
                滑动(20,10,4,10,16,500,200)
            }
        }

        if(text("看视频即可打开").exists()){
            clicknode(text("看视频即可打开").findOne(300),0,-80)
            sleep(3000)
            seead()
        }
        if(text("再接再厉，赚更多哦~").exists()){
            clicknode(className("android.widget.FrameLayout").clickable().depth(5).drawingOrder(2).findOne(300))
        }
        sleep(2000)
    },500000)
    show(appname+"88元扭蛋机结束")
}

var app_reward_zhuazhua=function(){
    if(获取今日记录(appname,"zhuazhua")=="true"){
        return true
    }
    doactionmaxtime(function(){
        show(appname+"天天抓好礼")
        if(text("天天抓好礼").exists()){
            if(text("今日免费: 0次").exists()){
                今日记录(appname,"zhuazhua","true")
                return true
            }
           node_yyy= textContains("今日免费").visibleToUser().findOne(300)
            if(node_yyy){
                cx=node_yyy.bounds().centerX()
                cy=node_yyy.bounds().centerY()-88
                log(cx+","+cy)
               press(cx,cy,50)
               press(cx,cy,50)
               sleep(1000)
               show("找到今日免费")
                sleep(2000)
                seead()
            }else{
                show("没有今日免费")
            }
        }else{
            app_go_home(4)
            sleep(3000)
        
            if(!textclick("领奖品")){
                滑动(20,10,4,10,16,500,200)
            }
            
        }
        if(text("看视频即可打开").exists()){
            clicknode(text("看视频即可打开").findOne(300),0,-80)
            sleep(3000)
            seead()
        }
        if(text("再接再厉，赚更多哦~").exists()){
            clicknode(className("android.widget.FrameLayout").clickable().depth(5).drawingOrder(2).findOne(300))
        }

        sleep(2000)
    },500000)
    show(appname+"天天抓好礼 结束")
}



var app_reward_todaymoney=function(){
    if(获取今日记录(appname,"todaymoney")=="true"){
        return true
    }
    doactionmaxtime(function(){
        show(appname+"今日有钱花")
        if(text("今日有钱花").exists()){
            if(text("今日免费: 0次").exists()){
                今日记录(appname,"todaymoney","true")
                return true
            }
           node_yyy= textContains("今日免费").visibleToUser().findOne(300)
            if(node_yyy){
                cx=node_yyy.bounds().centerX()
                cy=node_yyy.bounds().centerY()-88
                log(cx+","+cy)
               press(cx,cy,50)
               press(cx,cy,50)
               sleep(1000)
               show("找到今日免费")
                sleep(2000)
                seead()
            }else{
                show("没有今日免费")
            }
        }else{
            app_go_home(4)
            sleep(3000)
            while(!textclick("幸运大抽奖")){
                滑动(20,10,16,10,4,100,200)
                sleep(1000)
            }
            
        }
        if(text("看视频即可打开").exists()){
            clicknode(text("看视频即可打开").findOne(300),0,-80)
            sleep(3000)
            seead()
        }
        if(text("再接再厉，赚更多哦~").exists()){
            clicknode(className("android.widget.FrameLayout").clickable().depth(5).drawingOrder(2).findOne(300))
        }

        sleep(2000)
    },500000)
    show(appname+"天天抓好礼 结束")
}

var app_reward_video=function(){
    if(获取今日记录(appname,"video")=="true"){
        return true
    }
    doactionmaxnumber(function(){
            
            sleep(2000)
            doactionmaxtime(function(){
                if(textclick("看福利视频赚金币")){
                    return true
                }
                app_go_home(4)
                滑动(20,10,16,10,4,500,200)
            },10000)
            sleep(3000)
            seead()
        if(text("看视频即可打开").exists()){
            clicknode(text("看视频即可打开").findOne(300),0,-80)
            sleep(3000)
            seead()
        }
        if(text("再接再厉，赚更多哦~").exists()){
            clicknode(className("android.widget.FrameLayout").clickable().depth(5).drawingOrder(2).findOne(300))
        }
        if(isadviceactivity()>-1){
            seead()
        }
        sleep(2000)
    },5)
    show(appname+"福利视频结束")
}


startapp(appname,apppkg,0,device.height-200,false,false,true,true)