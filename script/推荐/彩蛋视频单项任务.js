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

彩蛋邀请()
toastLog("彩蛋邀请完成")
app.launchApp(appname)
const 彩蛋首页奖励计时布局id="com.jifen.dandan:id/view_default_timer"
const 彩蛋首页任务状态id="com.jifen.dandan:id/tv_task_status" // text 3/5
const 彩蛋首页奖励中心图标id="com.jifen.dandan:id/image_red_bg_icon"
const 彩蛋首页喜欢按钮id="com.jifen.dandan:id/iv_like_icon"
const 彩蛋首页评论按钮id="com.jifen.dandan:id/iv_comment_icon"
const 彩蛋立即翻倍关闭按钮id="com.jifen.dandan:id/close_bottom_button"
"恭喜您，获得彩蛋奖励！金币已自动发送至您的钱包"
const 彩蛋弹窗标题id="com.jifen.dandan:id/title_text_view"
var 彩蛋视频首页标识id =[彩蛋首页喜欢按钮id,彩蛋首页评论按钮id]
var logintype="phone"  //weixin 是微信登录 phone 是手机号登录
var 视频次数=0

var 回到彩蛋视频页=function(){
    i=0
    while (i<10){
        i=i+1
    if(!idallexist(["com.jm.video:id/image_view","com.jm.video:id/comment"])){
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

var 刷宝签到=function(){
    i=0
    while(i<10){
        i=i+1
      //  "恭喜获取","去邀请","com.jm.video:id/imgClose"
        if(textclick("任务")){
            n=0
            while(n<15){
                n=n+1

            if(textclick("立即签到")){
                sleep(2000)
                if(text("继续赚元宝").exists()){
                    back()
                    sleep(2000)
                    if( textclick("首页")){
                        return true
                    }
                    return false
                }
                sleep(000)
                if(textclick("看视频签到")){
                    i=0
                    while(i<20){
                        show("等待视频广告3秒")
                        sleep(3000)
                        t= idclick(刷宝视频广告关闭按钮1id)
                        show("点击关闭按钮")
                       if(t ) {
                        show("成功点击关闭按钮")
                         今日已签到("shuabao")
                         return true
                        }
                        t= idclick(刷宝视频广告关闭按钮2id)
                        show("点击关闭按钮")
                       if(t ) {
                         show("成功点击关闭按钮")
                         今日已签到("shuabao")
                         return true
                        }
                        i=i+1
                    }
                }else{
                    下滑()
                    back()
                    return false
                }
            }
            if(id("com.jm.video:id/imgClose").exists()){
                back()
            }
            if(text("继续赚元宝").exists()){
                textclick("首页")
                return false
            }
        }
        }
    }
}
var 刷宝登录=function(){
    i=0
    while(i<10){
        log("刷宝登录")
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

var 刷宝手机登录=function(){
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

var 刷宝微信登录=function(){
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


if(!getbooleanvalue("shuabaologin")){
    show("刷宝没有登录过")
    刷宝登录()
}else{
    show("刷宝之前登陆过")
}
刷宝签到()
while(true){
    if(!idallexist(["com.jm.video:id/image_view","com.jm.video:id/comment"])){
        if(!idContains(apppkg).findOne(1000)){
            app.launch(apppkg)
            sleep(3000)
            i=0
            clickonetexts(["首页","推荐","等待"],500,1500)
            
        }else{
            回到刷宝视频页()
            sleep(1500)
        }
    }else{
        if(id(刷宝视频恭喜获取关闭按钮id).exists()){
            back()
            sleep(1500)
            textclick("首页")
            sleep(1500)
            textclick("推荐")
            sleep(1500)
        }
        if( textclick("等待")){
            sleep(1000)
        }
        if(idclick("com.jm.video:id/tt_top_skip")){
            log("穿山甲广告页面")
        }
        if(idclick("com.jm.video:id/tt_video_ad_close_layout")){
            toastLog("穿山甲广告页面")
        }

        desc=  id("com.jm.video:id/desc").findOne(1000)
        if(desc){
            lastdesc=desc.text()
            log("当前："+lastdesc)
        }
            滑动(20,13,16,10,4,500,700)
            sleep(2000)
        desc=  id("com.jm.video:id/desc").findOne(1000)
        if(desc){
            currentdesc=desc.text()
            log("之前："+lastdesc+"--当前："+currentdesc)
            if(currentdesc==lastdesc){
                滑动(20,13,16,10,4,500,700)
                sleep(1000)
            }else{
                like=id("com.jm.video:id/text_view").findOne(500)
                if(like){
                    tlike=like.text()
                    if(tlike){
                       if (tlike.includes("万")){
                           log("喜欢过万")
                        comment= id("com.jm.video:id/comment").findOne()
                        if(comment){
                          if(comment.text()!="评论"){
                              if(comment.text().includes("万")||parseInt(comment.text())>1000){
                                  log('评论过千了')
                                id("list").findOne().children().forEach(child => {var target = child.findOne(id("image_view"));if(target){clicknode(target);}});
                              }
                          }else{
                              log("没有人评论")
                          }
                        }
                       }
                    }
                }
            }
        }else{
            滑动(20,13,16,10,4,500,700)
            sleep(1000)
        }
        滑动次数=滑动次数+1
        sleepr(6000*ratio,10000*ratio)
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
        if(滑动次数%100==1){
            if(!今日已签到("shuabao")){
                刷宝签到()
            }
        }

    }
}


