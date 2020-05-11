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
// engines.stopOther()
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
show("开始彩蛋视频辅助滑动")
gfw.setPosition(0,220)
device.setMusicVolume(0)
device.wakeUpIfNeeded()
toastLog("自动设置音量为0")
var apppkg="com.jifen.dandan"
var apphomeactivity=""
var appname="彩蛋视频"
toastLog("指定："+appname+"即将启动")
home()
if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}

const 彩蛋视频广告立即领取id="com.jifen.dandan:id/tv_ad_red_pack_staus"
const 彩蛋首页奖励计时布局id="com.jifen.dandan:id/view_default_timer"
const 彩蛋首页任务状态id="com.jifen.dandan:id/tv_task_status" // text 3/5
const 彩蛋首页奖励中心图标id="com.jifen.dandan:id/image_red_bg_icon"
const 彩蛋首页喜欢按钮id="com.jifen.dandan:id/iv_like_icon"
const 彩蛋首页评论按钮id="com.jifen.dandan:id/iv_comment_icon"
const 彩蛋立即翻倍关闭按钮id="com.jifen.dandan:id/close_bottom_button"

"恭喜您，获得彩蛋奖励！金币已自动发送至您的钱包"
const 彩蛋视频录像id="com.jifen.dandan:id/iv_ugc_enter"
const 彩蛋底部奖励id="com.jifen.dandan:id/bt_tab_welfare_task"
const 彩蛋弹窗标题id="com.jifen.dandan:id/title_text_view"
var 彩蛋视频首页标识id =[彩蛋首页喜欢按钮id,彩蛋首页评论按钮id,彩蛋视频广告立即领取id,彩蛋视频录像id,彩蛋底部奖励id]

var logintype="phone"  //weixin 是微信登录 phone 是手机号登录
var 视频次数=0


app.launchApp(appname)
// if(!getbooleanvalue("彩蛋登录")){
//     show("彩蛋没有登录过")
//     彩蛋登录()
// }else{
//     show("彩蛋之前登陆过")
// }
var lastdesc=""
function run(){
    while(true){
    if(!idoneexist(彩蛋视频首页标识id)){
        log("没有找到一个彩蛋标识")
        if(!idContains(apppkg).findOne(1000)){
            log("彩蛋不在前台")
            app.launch(apppkg)
            sleep(3000)
            i=0
            clicktexts(["首页","推荐","等待"],500,1500)
           
        }else{
            log("彩蛋标识前台")
            back()
             滑动(20,13,16,10,4,500,700)
            sleep(500)
            if(textclick("立即翻倍")){
                seead()
             }
             if(text("点击重播").exists()){
                back()
                sleep(2500)
            }

        }
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
        if(滑动次数%10==1){
            if(device.getBattery()<20){
                toastLog("电量低")
                if(device.isCharging()){
                    if(changesetting){
                        device.setMusicVolume(0)
                        device.setBrightnessMode(0)
                        device.setBrightness(0)
                    }
                
                }else{
                    //休眠三十分钟
                    device.lockScreen()
                    sleep(1800000)
                }
            }
        }
        if(滑动次数%100==1){
            if(!今日签到(appname)){
                app_sign()
            }
        }
      }
    }
}
var seead=function(){
    i=0
    while(i<10){
        sleep(4000)
        if(text("点击重播").exists()){
            back()
            sleep(2500)
            back()
            return 
        }
       if(idclick("com.jifen.dandan:id/tt_video_ad_close")){
           return 
       }
        i=i+1
        if(text("邀请好友").findOne(500)){
            back()
            return 
        }
        if(textclick("金币已到账")){
            return
        }

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
    i=0
    while(i<10){
        
        i=i+1
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
    loginet= id("com.jm.video:id/login_edit").findOne(500)
    if(loginet){
       loginet.setText(phonenumber())
       id("com.jm.video:id/btn_login").waitFor()
       if(idclick("com.jm.video:id/btn_login")){
           reg = /\d{4}/ig
           code= get_phone_code("刷宝登录验证码",reg,"刷宝短视频","刷宝登录验证码")
            toastLog("最后一步了验证码："+code )       
            loginet= id("com.jm.video:id/login_edit").findOne(500).setText(code)
           
           id( "btn_login").waitFor()
           id("btn_login").findOne(500).click()
          sleepr(6000)
       }
    }
}

var app_login_weixin=function(){
    while (i<10){
        textclick("微信账号登录")
        sleepr(2000)
        clicktexts(["微信账号登录","同意","同意并继续"],500,2500)
        if(idallexist(["com.jm.video:id/tv_name","com.jm.video:id/iv_setting"])){
            show("我界面找到昵称和设置")
            spt.put("shuabaologin",true)
            return true
        }
    }
}

run()