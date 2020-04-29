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
每日提现=false
var logintype="weixin"  //weixin 是微信登录 phone 是手机号登录
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

show("开始刷宝短视频辅助滑动")


gfw.setPosition(0,220)
device.setMusicVolume(0)
device.wakeUpIfNeeded()
var apppkg="com.jm.video"
var apphomeactivity="com.jm.video.ui.main.MainActivity"
var appname="刷宝短视频"
var apppkg= "com.jm.video"  //app.getPackageName(appname)
creatsetfloatywindow()  //创建设置悬浮窗

home()
if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}

刷宝邀请()
app.launchApp(appname)
var 刷宝视频恭喜获取关闭按钮id ="com.jm.video:id/imgClose"
var 视频次数=0
var 刷宝视频广告跳过按钮id="com.jm.video:id/tt_top_skip"
var 刷宝视频广告关闭按钮1id="com.jm.video:id/tt_video_ad_close_layout"
var 刷宝视频广告关闭按钮2id="com.jm.video:id/iv_close"
var 刷宝余额id="com.jm.video:id/tv_mine_money"
var 刷宝金币id="com.jm.video:id/tv_gold_num"



//回到视频页
var gotoappvideo=function(){
    show("回到视频页")
    i=0
    while (i<5){
       
    if(!idallexist(["com.jm.video:id/image_view","com.jm.video:id/comment"])){
        if(!idContains(apppkg).findOne(500)){
            show("没有找到存在包名id控件")
            app.launch(apppkg)
            sleep(3000)
        }else{
            show("找到存在包名id控件")
            back()
            sleep(1500)
        }
        if(textclick("同意并继续")){

        }
        if(text("首页").exists()){
            textclick("首页")
            sleep(1000)
            textclick("推荐")
            return true
        }
       
    }else{
        
        return true
    }
    i=i+1
}
}

var appsign=function(){
    i=0
    while(i<3){
        i=i+1
      //  "恭喜获取","去邀请","com.jm.video:id/imgClose"
        if(textclick("任务")){
            n=0
            while(n<3){
                n=n+1
                if(textContains("恭喜您获得").findOne(200)){
                    back
                    return true
                }
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
                    
                       if(t ) {
                        show("成功点击关闭按钮")
                         今日已签到(appname)
                         return true
                        }
                        t= idclick(刷宝视频广告关闭按钮2id)
                        show("点击关闭按钮")
                       if(t ) {
                         show("成功点击关闭按钮")
                         今日已签到(appname)
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
        }else{

        }
    }
}
var applogin=function(){
    i=0
    while(i<10){
        show(appname+"登录")
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
           show("登录页面")
           if(logintype=="weixin"){
            login_weixin()
           }else{
            login_phone()
           }
       }
        // 
        i=i+1
    }
}

var login_phone=function(){
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

var login_weixin=function(){
    i=0
    while (i<10){
        textclick("微信账号登录")
        sleepr(2000)
        clicktexts(["微信账号登录","同意","同意并继续"],500,2500)
        if(idallexist(["com.jm.video:id/tv_name","com.jm.video:id/iv_setting"])){
            show("我界面找到昵称和设置")
            spt.put("shuabaologin",true)
            return true
        }
        i=i+1
    }

}


function appgetcoinnumber(){
     show(appname+"获取金币数")
     gotoappvideo()
    i=0
    while(i<10){
    textclick("我")
    sleep(2000)
    coin=id(刷宝金币id).findOne(1000)
    if(coin){
        n=parseInt(coin.text())
        今日记录(appname,"coin",n)
       show("当前金币数:"+n)
       return n
     }
     i=i+1
    }
   
 }
       
        

var appgetmoneyinfo=function(){
    i=0
    gotoappvideo()
   while(i<10){
       if(textclick("我")){
        sleep(3000)
        money=id(刷宝余额id).findOne(1000)
        if(money){
            f=parseFloat(money.text())
            数据库.put("lastmoney",f)
            return f
        }
       }
       i=i+1
   }

}

//直接界面获取元素判断
var cantomoney=function(){
    show("判断可提现")
    t= textContains("今日已解锁").findOne()
    if(t){
        return true
    }
    t= textContains("已解锁").findOne()
    if(t){
        return false
    }
    t= textContains("今日已使用").findOne()
    if(t){
        return false
    }
  t=  textContains("已得").findOne()
  if(t){
      ss=t.text().split("已得")[1]
      log("已得："+ss)
      cc= parseInt(ss.substr(0,4))
      ms=t.text().substr(t.text().length-7,4)
      log("ms:"+ms)
      if(cc>parseInt(ms)){
          return true
      }else{
          return false
      }
  }
}

var apptomoney=function(){
    show(appname+"提现")
       f=appgetcoinnumber()
     if(f>6800){
         i=0
        while(i<10){
           if(idclick(刷宝余额id)){
             show("点击刷宝余额成功")
                sleep(1000)
            }
            if(textclick("立即提现")){

             }
             if(textclick("每日可提")){
                    show("点击每日")
                    return false
              }
             if(textclick("仅当日有效")){
                    show("仅当日有效")
                    break
              }
              if(textclick("已解锁")){
                    show("点击每日")
                    break
              }
           i=i+1
        }
        if(cantomoney()){
            i=0
             while(i<10){
                if(textclick("仅当日有效")){
                    show("点击仅当日有效")
                   
                }

                 sleep(1000)
                 textclick("立即提现")
                             
                 if(textclick("同意")){
                     show("微信同意")
                 }
                 if(text("提现详情").exists()){
                      今日已提现(appname)
                     return true
                 }
                 if(text("去邀请好友").exists()){
                     back()
                     今日已提现(appname)
                               return true
                 }
                 i=i+1
             }
            return false
        }else{
         return false
        }
     }else{
         return false
     }
  }



lastbattery=0
applogin()
appsign()
show("签到结束")
xhcs=0

function run(){
while(true){
    show("循环次数:"+(xhcs+1))
    if(!idallexist(["com.jm.video:id/image_view","com.jm.video:id/comment"])){
          show("不是视频页")
        if(!idContains(apppkg).findOne(1000)){
            app.launch(apppkg)
            sleep(3000)
            i=0
            clickonetexts(["首页","推荐","等待"],300,1500)
        }else{
            show("")
            gotoappvideo()
            sleep(1500)
        }
   }else{
        show("视频页关闭弹窗")
        idclick(刷宝视频广告关闭按钮1id)
        if(id(刷宝视频恭喜获取关闭按钮id).exists()){
            back()
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
        if(text("空空如也").exists()){
            // 脚本完成了
            device.lockScreen()
           
        }
        if(滑动次数%10==1){
            battery=device.getBattery()
            if(battery<20){
                device.lockScreen()
                lastbattery=battery
                show("电量低:"+battery+"-休眠30分钟")
                device.lockScreen()
                sleep(1800000)
                  device.wakeUpIfNeeded()
                // if(device.isCharging()){
                //     device.setMusicVolume(0)
                //     device.setBrightnessMode(0)
                //     device.setBrightness(10)
                //         if(battery<lastbattery){
                //            
                //             device.lockScreen()
                //             sleep(1800000)
                //             device.wakeUpIfNeeded()
                //         }
                   
               
                //  
                // }else{
                //     //休眠三十分钟
                //     show("电量低:"+battery+"-休眠30分钟")
                //     device.lockScreen()
                //     sleep(1800000)
                //     device.wakeUpIfNeeded()
                // }
            }
        }
        if(滑动次数%100==1){
            if(!今日已签到(appname)){
                appsign()
            }
        }
        
        if(滑动次数%200==1){
            if(每日提现){
                if(!今日提现(appname)){
                    apptomoney()
                }
            }
         
        }
    }
    xhcs=xhcs+1
}
}

run()

