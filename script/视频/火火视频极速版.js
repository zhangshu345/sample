auto.waitFor()
auto.setMode("normal")
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
滑动次数=0
engines.stopOther()
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}
alltest()
floaty.closeAll()
creatgfloatywindow()
creatsetfloatywindow()  //创建设置悬浮窗

gfw.setPosition(0,220)
device.setMusicVolume(0)
device.wakeUpIfNeeded()
toastLog("自动设置音量为0")
var apppkg="com.jt.hanhan.video"
var apphomeactivity=""
var appname="火火视频极速版"

show("开始："+appname+"辅助滑动")
home()
sleep(1000)
recents()
sleep(2000)
textclick("全部关闭")
sleep(1000)
if(!app.getPackageName(appname)){
    show("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}else{
    show(appname+"已经安装")
}
// 看小视频和视频的 每圈获取金币数 越来越低  最后还是要荣耀殿堂 来     9次看视频广告  720

// "金币翻倍" ,"com.jt.hanhan.video:id/jp"    // 关闭弹窗的关闭按钮 com.jt.hanhan.video:id/jw
// "com.jt.hanhan.video:id/jr"

// "恭喜您，获得彩蛋奖励！金币已自动发送至您的钱包"

const 火火视频极速版录像id="com.jifen.dandan:id/iv_ugc_enter"
const 彩蛋底部奖励id="com.jifen.dandan:id/bt_tab_welfare_task"
const 彩蛋弹窗标题id="com.jifen.dandan:id/title_text_view"
const 火火视频极速版导航按钮id="com.jt.hanhan.video:id/a9f"
const 火火视频极速版奖励布局id="com.jt.hanhan.video:id/ii"
const 火火视频极速版领取红包id="com.jt.hanhan.video:id/a9l"
const 火火视频金蛋大奖id="com.jt.hanhan.video:id/ga"
var 火火视频极速版首页标识id =[火火视频极速版导航按钮id,火火视频极速版奖励布局id,火火视频极速版领取红包id]
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
app.launch(apppkg)
show(appname+"开始进入app操作")
var action="小视频"
var lastdesc=""
var 小视频广告翻倍次数=0
var tomoney=true
function run(){
    while(true){
    if(!idallexist(火火视频极速版小视频页标识id)){
        log("没有找到一个"+appname+"小视频标识")
        if(!idContains(apppkg).findOne(1000)){
            show(appname+"不在前台")
           
            back()
            sleep(300)
            home()
            app.launch(apppkg)
            sleep(3000)
            i=0
            clicktexts(进入小视频页面点击文本集合,300,1500)
            if(clickonetexts(未登录点击显示文本集合),200,1500){
                sleep(2000)
                show(appname+"未登录点击显示文本集合")
              //  app_login()
            }
            if(idclick("com.jt.hanhan.video:id/jw")){
                sleep(1000)
               
            }
        }else{
            show(appname+"已经在前台")
            clicktexts(进入小视频页面点击文本集合,300,1500)
            if(idclick("com.jt.hanhan.video:id/jw")){
                sleep(1000)
            }
            back()
            滑动(20,13,16,10,4,500,700)
            sleep(500)
        
            if(clickonetexts(广告点击按钮文本集合,500,1500)){
                seead()
               
             }
             if(text("点击重播").exists()){
                back()
                sleep(2500)
            }
        }
    }else{
        if(action=="短视频"){
                //短视频的操作


        }else{
            //小视频的操作
            desc=  id(小视频简介id).findOne(300)
            if(desc){
                滑动(20,13,16,10,4,500,700)
                sleep(1000)
                currentdesc=desc.text()
                log("之前："+lastdesc+"--当前："+currentdesc)
                if(currentdesc==lastdesc){
                    if(textclick("立即翻倍")){
                        seead()
                     }
                   
                    textclick("刷新")
                    sleep(500)
                  
                }else{
                    lastdesc=currentdesc
                    滑动次数=滑动次数+1
                }
            }else{
                if(clickonetexts(广告点击按钮文本集合,500,1500)){
                    seead()
                    小视频广告翻倍次数=小视频广告翻倍次数+1
                 }
                滑动(20,13,16,10,4,500,700)
                sleep(1500)
            }
        }
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
        if(close_ad_toutiao(apppkg)){
            sleep(1000)
         
        }
        if(idclick("com.jt.hanhan.video:id/jw")){
            sleep(1000)
        }
        tv_hb=text("领取红包").findOne(300)
        if(tv_hb){
            show("领取红包id："+tv_hb.id())
            if (clicknode(tv_hb)){
                sleep(1500)
                if(idclick("com.jt.hanhan.video:id/m3")){
                    seead()
                }
            }
            
        }
        if(textoneexist(广告展示页面可关闭文本集合)){
            back()
            sleep(2500)
        }
        jddj=id(火火视频金蛋大奖id).findOne(500)
        if(jddj){
            if(jddj.text()=="金蛋大奖"){
                sleep(7000)
                if( idclick(火火视频金蛋大奖id)){
                    sleep(1500)
                    if(maytextclick("看视频再送")){
                        seead()
                        小视频广告翻倍次数=小视频广告翻倍次数+1
                    }
                   
                }
            }
        }
       
        sleepr(6000*ratio,8000*ratio)
        if(滑动次数%10==1){
            if(device.getBattery()<20){
                toastLog("电量低")
                if(device.isCharging()){
                 device.setMusicVolume(0)
                 device.setBrightnessMode(0)
                 device.setBrightness(0)
                }else{
                    //休眠三十分钟
                    device.lockScreen()
                    sleep(1800000)
                }
            }
        }
      
        if(滑动次数%50==1){
            if(!今日签到(appname)){
                app_sign()
            }
        }
      }
    }
}
var seead=function(){
    i=0
    sleep(10000)
    while(i<20){
        sleep(2500)
        if(text("点击重播").exists()){
            back()
            sleep(2500)
            back()
            
        }
        i=i+1
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
        close_ad_qq(apppkg)
        if(idclick("com.jt.hanhan.video:id/jw")){
            sleep(1000)
            return 
        }
        jddj=id(火火视频金蛋大奖id).findOne(500)
        if(jddj){
            return
        }
        if(text("点击下载").exists()){
            back()
            sleep(1000)
            if(idclick("com.jt.hanhan.video:id/jw")){
                sleep(1000)
                return 
            }
            return
        }
     
    }
    back()
    if(idclick("com.jt.hanhan.video:id/jw")){
        sleep(1000)
        return 
    }
}


var app_go_home=function(){
    i=0
    while (i<10){
        i=i+1
    if(!idallexist(火火视频极速版首页标识id)){
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
    i=0
    while(i<3){
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
                    记录现在余额(appname,parseFloat(tv_money().text())/1000)
                }
                if(tomoney){
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
        i=i+1
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
            刷宝微信登录()
           }else{
            刷宝手机登录()
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
    while (i<10){
        textclick("微信账号登录")
        sleepr(2000)
        clicktexts(["微信账号登录","同意","同意并继续"],500,2500)
        if(idallexist([登录成功后界面显示id集合])){
            show("我界面找到昵称和设置")
            spt.put(apppkg+"login",true)
            return true
        }
    }
}

run()