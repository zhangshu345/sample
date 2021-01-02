auto.waitFor()
var appname="刷宝短视频"
var apppkg="com.jm.video"
var apphome="com.jm.video.ui.main.MainActivity"


creatsetfloatywindow()  //创建设置悬浮窗
toastLog("指定："+appname+"即将启动")
home()
if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,刷宝包名)
}

toastLog("刷宝邀请完成")
app.launchApp(appname)
var 刷宝视频恭喜获取关闭按钮id ="com.jm.video:id/imgClose"
var 视频次数=0
var 刷宝视频广告跳过按钮id="com.jm.video:id/tt_top_skip"
var 刷宝视频广告关闭按钮1id="com.jm.video:id/tt_video_ad_close_layout"
var 刷宝视频广告关闭按钮2id="com.jm.video:id/iv_close"

var 回到刷宝视频页=function(){
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
    while(i<30){
        i=i+1
      //  "恭喜获取","去邀请","com.jm.video:id/imgClose"
        if(textclick("任务")){
            n=0
            while(n<15){
                n=n+1
                sleep(3000)
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
               if(textclick("看视频签到")){
                    i=0
                    while(i<20){
                        show("等待视频广告3秒")
                        sleep(5000)
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
       if(id("login_tip").exists()){
         loginet=  id("com.jmvideo:id/login_edit").findOne(500)
         et=id("login_edit").findOne()
         loginet.setText(phonenumber())
         id("com.jm.video:id/btn_login").waitFor()
            //id("com.jm.video:id/btn_login").findOne().click()
         toastLog("最后一步了")        
       }
        // 
        i=i+1
    }
}

if(!getbooleanvalue("shuabaologin")){
    show("刷宝没有登录过")
    刷宝登录()
}else{
    show("刷宝之前登陆过")
}

刷宝签到()