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

var logintype="weixin"  //weixin 是微信登录 phone 是手机号登录
//engines.stopOther()
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}

var tomoney=true
var apppkg= "com.jm.video"  //app.getPackageName(appname)
var apphomeactivity="com.jm.video.ui.main.MainActivity"
var appname="刷宝短视频"
var login=getbooleanvalue(appname+"_login",false)

var appminelikeactivity="com.jm.video.ui.mine.MineLikeVideoActivity"
var appvideolistactivity="com.jm.video.ui.videolist.list.ListVideoActivity"
var appwebactivity="com.jm.video.ui.web.WebViewActivity" //我的钱包

var appliveactivity="com.jm.video.ui.live.guest.LiveGuestActivity" //直播页

刷宝邀请()
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
   if(doactionmaxtime(function(){
       app_go_home(1)
        if(!idallexist(["com.jm.video:id/image_view","com.jm.video:id/comment"])){
            if(textclick("同意并继续")){
    
            }
            idclick(刷宝视频广告关闭按钮2id)
            idclick(刷宝视频广告关闭按钮1id)
            if(text("首页").exists()){
                textclick("首页")
                sleep(1000)
                textclick("推荐")
                return true
            }
        }else{
            return true
        }
    },20000)){
        return true
    }else{
        forcestop(appname)
        app.launch(apppkg)
        sleep(1000)
    }
}

function app_go_home(index){
    show(appname+"回到首页"+index)
    index=index||1
    doactionmaxtime(function(){
        if(currentPackage()!=apppkg){
            app.launch(apppkg)
            sleep(3000)
        }else{
        idclick("com.jm.video:id/imgClose")
        ca=currentActivity()
        if(ca=="com.jm.video.ui.main.MainActivity"){
            if(index==1){
                if(id("com.jm.video:id/iv_home_search").exists()){
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
            }else if(index==5){
                selectnavi(5)
                return true
            }else{
                return true
            }
           
        }else if(ca==appminelikeactivity){
            back()
            sleep(1000)
        }
        else if(ca==appvideolistactivity){
            back()
            sleep(1000)
        }
        else if(ca==appwebactivity){
            back()
            sleep(1000)
        }else if(ca=="android.widget.FrameLayout"){
            textclick("取消")
        }
    }
       
    },15000)
}

var selectnavi=function(index){
    node_ll=className("android.widget.RelativeLayout").drawingOrder(index).depth(9).clickable().packageName(apppkg).boundsInside(0,device.height*4/5,device.width,device.height).findOne()
    if(node_ll){
        node_ll.click()
    }
}


var app_sign=function(){
    show(appname+":签到")
    doactionmaxtime(function(){
            app_go_home(4)
            sleep(2000)
            idclick("com.jm.video:id/imgClose")
           if(textContains("恭喜您获得").findOne(400)){
                 back()
                 return true
            }
            textclick("点击领取",500)
            textclick("立即签到",500)
                    if(text("继续赚元宝").exists()){
                        back()
                        return true
                    }
                    if(textclick("看视频签到",300)){
                        let  i=0
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
                      
                          }
                      }      
                      sleep(2000)
       
    },60000)

}
var app_login=function(){
      doactionmaxtime(function(){
        show(appname+"登录")
         app_go_home(5)
         滑动(20,10,3,10,17,500,400)
         sleep(2000)
         idclick("com.jm.video:id/imgClose")
         clicktexts(["跳过","去授权","允许","允许","允许","我","同意并继续"],200,1500)
         if(idallexist(["com.jm.video:id/tv_name","com.jm.video:id/iv_setting"])){
             show("我界面找到昵称和设置")
             spt.put(appname+"_login",true)
             return true
         }
         if(id("login_tip").exists()||text("微信账号登录")){
             show("登录页面")
             if(logintype=="weixin"){
              app_login_weixin()
              return true
             }else{
              app_login_phone()
              return true
             }
         }
    },60000)
        // 
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


function app_getcoinnumber(){
     show(appname+"获取金币数")
     app_go_home()
     doactionmaxtime(function(){
         if(textclick("我")){
            sleep(1000)
            coin=id(刷宝金币id).findOne(1000)
            if(coin){
                n=parseInt(coin.text())
                今日记录(appname,"coin",n)
               show("当前金币数:"+n)
               return n
             }else{
                滑动(20,10,3,10,17,500,300)
                sleep(2000)
             }
             i=i+1
         }
     },60000)
 }
        

var app_getmoneyinfo=function(){
    doactionmaxtime(function(){
        app_go_home()
        if(textclick("我")){
            sleep(1000)
            money=id(刷宝余额id).findOne(1000)
            if(money){
                f=parseFloat(money.text())
                数据库.put("lastmoney",f)
                return f
            }else{
                滑动(20,10,3,10,17,500,300)
                sleep(2000)
            }
         }
    },20000)


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
  t= textContains("已得").findOne()
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

var app_tomoney=function(){
    show(appname+"提现")
    f=app_getcoinnumber()
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

function app_go_videolist(){
    doactionmaxtime(function(){
        ca=currentActivity()
        if(ca=="com.jm.video.ui.videolist.list.ListVideoActivity"){
            return true
        }else if(ca=="com.jm.video.ui.mine.MineLikeVideoActivity"){
            press(200,600 ,50)
            sleep(1000)
        }else if(ca=="com.jm.video.ui.main.MainActivity"){
            clicktexts(["我","喜欢","查看更多"],200,1500)
        }else{
            textclick("取消")
        }
    },60000)
}


function app_run(){
    toastLog(appname+"---apprun")
    app.launchApp(appname)
    sleep(3000)
    app_login()
    app_sign()
    show("签到结束")
    xhcs=0
    while(true){
    show("循环次数:"+(xhcs+1))
    closeappundostate()
    if(!idallexist(["com.jm.video:id/image_view","com.jm.video:id/comment","com.jm.video:id/imgUp"])){
        if(text("点击进入直播间").exists()){
            滑动(20,10,16,10,3,500,300)
            sleep(1000)
        }
          show("不是视频页")
          app_go_home(1)
          clickonetexts(["推荐","等待"],300,1500)
   
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
        close_ad_toutiao(apppkg)
        close_ad_qq(apppkg)
        id_desc=  id("com.jm.video:id/desc").findOne(1000)
        if(id_desc){
            lastdesc=id_desc.text()
            log("当前："+lastdesc)
        }
        滑动(20,13,16,10,4,500,700)
         sleep(2000)
         id_desc=  id("com.jm.video:id/desc").findOne(1000)
        if(id_desc){
            currentdesc=id_desc.text()
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
                                id("list").findOne().children().forEach(child => {var target = child.findOne(id("image_view"));
                                if(target){clicknode(target);}});
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
        idclick("com.jm.video:id/imgClose")
        clicktexts(["继续看视频领取"],100,1500)
        滑动次数=滑动次数+1
        sleepr(6000*ratio,10000*ratio)
        if(text("空空如也").exists()){
            // 脚本完成了
            app_go_videolist()
        }
        if(滑动次数%50==0){
            checkbattery(30)
        }
        if(滑动次数%200==0){
            if(!今日已签到(appname)){
                app_sign()
            }
            if(tomoney){
                if(!今日提现(appname)){
                    app_tomoney()
                }
            }
        }
    
    }
    xhcs=xhcs+1
}
}


let runscriptapp= spt.getString("hongshuyuedu_run_app",null)
log("正在集合运行的APP"+runscriptapp)
let isreaderunning=spt.getBoolean("hongshuyuedu_running",false)
log("是否是集合运行："+isreaderunning)
// 集合运行
if(runscriptapp==appname && isreaderunning){

}else{
    engines.stopOther()
    alltest()
    // checkfloaty()
    // checksystemsettings()
   floaty.closeAll()
   creatgfloatywindow()
  //  creatsetfloatywindow()  //创建设置悬浮窗
    gfw.setPosition(0,device.height-250)
    if(changesetting){
        device.setMusicVolume(0)
        toastLog("自动设置音量为0")
    }
  
    if(!app.getPackageName(appname)){
        show("未找到指定应用:"+appname+"将自动查找应用并下载安装")
        downloadandinstallapp(appname,apppkg)
    }else{
        keepappisnewer(appname,apppkg)
        show(appname+"已经安装")
    }

    closelastscriptapp()
    spt.put("lastscriptapp",appname)
    spt.put("hongshuyuedu_running",false)
    try {
        show("开始运行:"+appname)
        app_run()
    } catch (error) {
        
    }
}



