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
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
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
const appcoinalteractivity="com.qukandian.video.qkdbase.ad.coin.CoinAdDialog"
var changesetting=false
var onlyscript=true


//邀请 
// 看小视频和视频的 每圈获取金币数 越来越低  最后还是要荣耀殿堂 来     9次看视频广告  720

//200 个小视频之后查看 荣耀殿堂 领取金币 

// "金币翻倍" ,"com.jt.hanhan.video:id/jp"    // 关闭弹窗的关闭按钮 com.jt.hanhan.video:id/jw
// "com.jt.hanhan.video:id/jr"
// 第一次进入  我知道了 声明与政策
// "恭喜您，获得彩蛋奖励！金币已自动发送至您的钱包"

const 火火视频极速版录像id="com.jifen.dandan:id/iv_ugc_enter"
const 火火视频极速版导航按钮id="com.jt.hanhan.video:id/a9f"
const 火火视频极速版奖励布局id="com.jt.hanhan.video:id/ii"
const 火火视频极速版领取红包id="com.jt.hanhan.video:id/a9l"
const 火火视频金蛋大奖id="com.jt.hanhan.video:id/ga"
var   火火视频极速版首页标识id =[火火视频极速版导航按钮id,火火视频极速版奖励布局id,火火视频极速版领取红包id]
const 火火视频小视频喜欢id="com.jt.hanhan.video:id/s6"
const 火火视频小视频点赞id="com.jt.hanhan.video:id/s7"
const 火火视频小视频评论id="com.jt.hanhan.video:id/s8"
var 火火视频极速版小视频页标识id =[火火视频小视频喜欢id,火火视频小视频点赞id,火火视频小视频评论id]
var 进入小视频页面点击文本集合=["小视频"]
var 广告点击按钮文本集合=["金币翻倍"]

var 未登录点击显示文本集合=[]
var 登录成功后界面显示id集合=[]
var 广告展示页面可关闭文本集合=["金币已到账","点击重播"]
var logintype="phone"  //weixin 是微信登录 phone 是手机号登录
var 视频次数=0
var 小视频简介id="com.jt.hanhan.video:id/sk"

show(appname+"开始进入app操作")
var action="小视频"
var lastdesc=""
var 小视频广告翻倍次数=0
var tomoney=true

var app_checklogin=function(){
    n_islogin=0
   doactionmaxtime(function(){
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
   
   },60000)
       
      
    
}

var 火火关闭锁屏功能=function(){
    火火选中底部导航(2)
}

var 火火选中底部导航=function(indexofbottom){
    node_me=className("android.widget.RelativeLayout").clickable(true).depth(7).indexInParent(indexofbottom).findOne(100)
    if(node_me){
        if(clicknode(node_me)){
            return true
        }
    }
    return false
}

var 点击金蛋=function(){
    node_gold=id("com.jt.hanhan.video:id/ga").visibleToUser().findOne(100)
    if(node_gold){
        if(node_gold.text()=="金蛋大奖"){
            toastLog("找到了金蛋大奖ga")
            sleep(200)
           if( idclick("com.jt.hanhan.video:id/ig")){
            show("点击金蛋大奖成功ga")
            sleep(2500)
            if(text("赚钱小技巧").exists()){
               back()
               sleep(1500)
               滑动(20,13,16,10,3,500,300)
               sleep(6000)
               点击金蛋()
           }
           if(maytextclick("看视频再送")){
               seead()
                   小视频广告翻倍次数=小视频广告翻倍次数+1
           }
           }
   
        }
      
    }else{
        show("没有找到金蛋大奖：")
    }

}


var 火火小视频滑动=function(){
    
    doactionmaxtime(function(){
        滑动(20,13,16,10,4,500,700)
        sleep(1000)
        desc=  id(小视频简介id).findOne(300)
        if(desc){
            currentdesc=desc.text()
            log("之前："+lastdesc+"--当前："+currentdesc)
            if(currentdesc==lastdesc){
                sleep(1500)
                textclick("刷新")
            }else{
                sleep(3000)
                tv_dz=id(火火视频小视频点赞id).findOne(300)
                //点赞多的视频
                if(tv_dz){
                    dzstr=tv_dz.text()
                    if(dzstr.search("万") != -1){
                        clicknode(tv_dz)
                    }else{
                        dz_n=parseInt(dzstr)
                        if(dz_n>5000){
                            clicknode(tv_dz)
                        }
                    }
                }
                lastdesc=currentdesc
                sleep(3000)
                return true
            }
    
        }else{
            if(clickonetexts(广告点击按钮文本集合,500,1500)){
                seead()
                小视频广告翻倍次数=小视频广告翻倍次数+1
             }
            sleep(1500)
        }
        if(textclick("立即翻倍")){
            seead()
         }
       
    },10000)

 
}
function app_see_video(){
    app_go_home()
   
}


function app_see_small_video(){
    if(!idallexist(火火视频极速版小视频页标识id)){
        log("没有找到一个"+appname+"小视频标识")
        app_go_home()
        clicktexts(进入小视频页面点击文本集合,300,1500)
   
        火火小视频滑动()
        if(clickonetexts(广告点击按钮文本集合,500,1500)){
                seead()
       }
        if(text("点击重播").exists()){
                back()
                sleep(1500)
         }
       }
}

function app_run(){
    app.launch(apppkg)
    sleep(3000)
    app_checklogin()
    xhcs=0
    while(true){
        device.wakeUpIfNeeded()
        closeappundostate()

        if(action=="短视频"){
            //短视频的操作
            app_see_video()
         }else if(action=="小视频"){
        //小视频的操作
              app_see_small_video()
         }else{
             滑动(20,10,17,11,3,500,300)
             sleep(8000)
         }

        if(xhcs%50==0){
           checkbattery(30,1200000,1800000)
        }
        if(xhcs%200==0){
            if(!今日签到(appname)){
                app_sign()
            }
            app_get_reward()
        }
  
      if (text("看视频即可打开").className("android.widget.TextView").indexInParent(4).exists()){
       node_kai= text("看视频即可打开").className("android.widget.TextView").indexInParent(4).findOne(100).parent().child(3)
       if(node_kai){
         if(clicknode(node_kai)){
                seead()
            }
         }
      }
        点击金蛋()
        if(text("点击重播").findOne(100)){
            
        }
        if(close_ad_toutiao(apppkg)){
            sleep(1000)
        }
        if(idclick("com.jt.hanhan.video:id/jw")){
            sleep(1000)
        }
        if(idclick("com.jt.hanhan.video:id/gi")){
            sleep(1000)
        }
        tv_hb=text("领取红包").findOne(300)
        if(tv_hb){
            show("领取红包id："+tv_hb.id())
            if (clicknode(tv_hb)){
                sleep(2500)
                node_lhb=text("领红包").className("android.widget.TextView").depth(15).findOne(100)
                if(node_lhb){
                    if(clicknode(node_lhb)){
                        sleep(1500)
                        
                    }
                }
               if(clickoneids(["com.jt.hanhan.video:id/m3","com.jt.hanhan.video:id/m4"])){
                seead()
               }
             
            }
        }
        if(textoneexist(广告展示页面可关闭文本集合)){
            back()
            sleep(2500)
        }
       
        xhcs=xhcs+1
    }
}

var seead=function(){
    n_seead=0
    sleep(10000)
    while(n_seead<20){
        show("广告循环:"+n_seead)
        sleep(2500)
        n_seead=n_seead+1
        if(text("邀请好友").findOne(500)){
            back()
            sleep(1000)
        }
        if(textclick("金币已到账")){
            back()
            sleep(1000)
        }
      
        if(close_ad_toutiao(apppkg)){
            sleep(1000)
            idclick("com.jt.hanhan.video:id/jw")
            return
        }
        if( close_ad_qq(apppkg)){
            return
        }
        if(close_ad_iclicash(apppkg)){
           return
        }
        if(idclick("com.jt.hanhan.video:id/jw")){
            sleep(1000)
            return 
        }
        node_close=className("android.widget.FrameLayout").clickable(true).depth(5).drawingOrder(2).findOne(100)
        if(node_close){
            if(clicknode(node_close)){
                return
            }
        }
        jddj=id(火火视频金蛋大奖id).findOne(300)
        if(jddj){
            return
        }
        if(textclick("确定")){

        }
    }
    back()
    if(idclick("com.jt.hanhan.video:id/jw")){
        sleep(1000)
        return 
    }
}


var app_go_home=function(index){
   if( doactionmaxtime(function(){
       ca=currentActivity()
       if(ca==apphomeactivity){
        return true
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
           back()
           sleep(1000)
           if(currentPackage()!=apppkg){
               app.launch(apppkg)
               sleep(300)
           }
       }
       
   },15000)){
       return true
   }else{
       forcestop(apppkg)
       app.launch(apppkg)
       sleep(3000)
       
   }
}

var app_sign=function(){
    n_sign=0
    while(n_sign<3){
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
          seead()
      }
      b_sign=id("com.jt.hanhan.video:id/u8").findOne(200)
      if(b_sign){
          if(b_sign.text().search(":")!=-1){
              if(clicknode(b_sign)){
                  seead()
              }
          }
      }
      n_sign=n_sign+1
    }
}
var selectnavi=function(n){
 let node_navi=  packageName(apppkg).className("android.widget.RelativeLayout").depth(7).clickable().indexInParent(n).findOne()
    if(node_navi){
        node_navi.click()
    }

}

var app_get_reward=function(){
    n_r_h=0
    app_go_home()
    while(true){
        ca=currentActivity()
        if(ca==apphomeactivity){
            selectnavi(2)
            sleep(2000)
            if(!text("日常任务").boundsInside(0,0,device.width,device.height/2).exists()){
                滑动(20,10,17,11,10,500,500)
                sleep(1000)
            }
            n_lingqu=text("日常任务").boundsInside(0,0,device.width,device.height/2).findOne(200)
            if(textclick("领取奖励")){

            }  
            id("a9j").findOne().parent().parent().click()

        }else  if(ca==apprewardactivity){
            if(textclick("可领取")){
                seead()
            }else{
                滑动(20,10,17,10,3,500,300)
                n_r_h=n_r_h+1
                if(text("新手解锁").visibleToUser().exists()){
                    log("找到新手解锁")
                    back()
                    sleep(300)
                    back()
                    return 
                }
            }
        }else{
         
        }
        if(idclick("com.jt.hanhan.video:id/jw")){
            sleep(1000)
            return 
        }
       sleep(1000)
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

