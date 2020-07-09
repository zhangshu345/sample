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
loopn=0
var logintype="weixin"  //weixin 是微信登录 phone 是手机号登录
//engines.stopOther()
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/yuedulib.js"
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
var 刷宝首页奖励id="com.jm.video:id/imgUp"
var 刷宝首页视频点赞人数id=""  
var 刷宝首页视频点赞可点击id="com.jm.video:id/praise"
var 刷宝首页标记id集合=[刷宝首页奖励id,刷宝首页视频点赞可点击id]
var lastdesc=""
var loopn=0
//回到视频页


var  app_run=function(){
    toastLog(appname+"---apprun")
    app.launchApp(appname)
    sleep(3000)
    app_login()
        if(!今日提现(appname)){
            app_tomoney()
        }
    app_sign()
    loopn=0
    while(true){
    show("循环次数:"+(loopn+1))
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

        app_home_swipe()

        textclick("继续看视频")
        
        idclick("com.jm.video:id/imgClose")
     
        if(text("空空如也").exists()){
            // 脚本完成了
            app_go_likevideolist()
        }
        if(loopn%50==0){
            checkbattery(30)
        }
        if(loopn%100==0){
                if(!今日提现(appname)){
                    app_tomoney()
                }
                app_go_home(3)
        }
    
    }
    loopn=loopn+1
    }
}
var  app_go_home=function(index){
    index=index||1
   if(doactionmaxtime(function(){
    show(appname+"回到首页"+index)
       closeappundostate()
        if(currentPackage()!=apppkg){
            app.launch(apppkg)
            sleep(3000)
            textclick("取消")
        }else{
        idclick("com.jm.video:id/imgClose")
        textclick("取消")
        if(textclick("立即观看")){
            seead()
        }
        ca=currentActivity()
        if(ca=="com.jm.video.ui.main.MainActivity"){
            sleep(300)
            if(index==1){
                if(idoneexist(刷宝首页标记id集合)){
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
        }else if(ca=="com.jm.video.ui.live.PublishActivity"){
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
    textclick("取消")
    },30000)){return true
    }else{
        app.launch(apppkg)
        sleep(3000)
        return false
    }
}

var selectnavi=function(index){
    node_ll=className("android.widget.RelativeLayout").drawingOrder(index).depth(9).clickable().visibleToUser().findOne(500)
    if(node_ll){
        bd=node_ll.bounds()
        show("点击导航位置"+bd.centerX()+","+bd.centerY())
        press(bd.centerX(),bd.centerY(),50)
        return true
    }else{
        show("没有找到导航")
    }
    if(index==1){
        textclick("首页")
    }else if(index==2){
        textclick("直播")
    }else if(index==3){
      
    }else if(index==4){
        textclick("任务")
    }else if(index==5){
        textclick("我")
    }
}

var seead=function(){
    doactionmaxtime(function(){
        if(close_ad_qq(apppkg,-1)){
            return true
        }
        if(close_ad_toutiao(apppkg,-1)){
            return true
        }
       if(isadviceactivity()<0){
           return true
       }
    },40000,1000)
}
var app_sign=function(){
    app_go_home(4)
       doactionmaxtime(function(){
        show(appname+":签到")
        // 滑动(20,10,3,10,17,500,100)
            idclick("com.jm.video:id/imgClose")
            if(textContains("恭喜您获得").findOne(300)){
                 back()
                 return true
            }
            
           if(textclick("立即签到",300)){
               sleep(2000)
           }
           if(textexists("继续赚元宝")){
                 if(textclick("点击领取",300)){
                  sleep(1000)
                 }
               return true
            }
            if(textclick("看视频签到",300)){
                        let  i=0
                   doactionmaxnumber(function(i){
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
                },20)
            }   
            
            if(textclick("点击领取",300)){
                sleep(1000)
             }
     
    },45000)
}


var app_checklogin=function(){
    doactionmaxtime(function(){
        show(appname+"检测登录")
         app_go_home(5)
         滑动(20,10,3,10,17,500,400)
         sleep(2000)
         idclick("com.jm.video:id/imgClose")
        
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
         
         clicktexts(["跳过","去授权","允许","允许","允许","我","同意并继续"],200,1500)
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
    let n_coin=0
     doactionmaxtime(function(){
        show(appname+"获取金币数")
        app_go_home(5)
        sleep(2000)
            coin=id(刷宝金币id).findOne(1000)
            if(coin){
              n_coin=parseInt(coin.text())
                今日记录(appname,"coin",n_coin)
                 show("当前金币数:"+n_coin)
               return true
             }else{
                滑动(20,10,3,10,17,500,300)
                sleep(2000)
             }
        
     },60000)
     return n_coin
 }
        

var app_getmoneyinfo=function(){
    f_money=0
    doactionmaxtime(function(){
        app_go_home(5)
            sleep(2000)
            money=id(刷宝余额id).findOne(1000)
            if(money){
                f_money=parseFloat(money.text())
                数据库.put("lastmoney",f_money)
                return f_money
            }else{
                滑动(20,10,3,10,17,500,300)
                sleep(2000)
            }

    },20000)
    return f_money

}

//直接界面获取元素判断
var cantomoney=function(){
    show("判断可提现")
    t= textContains("已解锁").findOne(300)
    if(t){
        show("找到了已解锁")
        return true
    }
    t= textContains("今日已使用").findOne(300)
    if(t){
        show("找到了今日已使用")
        return false
    }
  t= textContains("已得").findOne(300)
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
    if(今日提现(appname)=="true"){
        show(appname+"已经提现")
        return true
    }
    show(appname+"提现")
    n_coin=app_getcoinnumber()
    show("金币数："+n_coin)
        if(app_getcoinnumber()>7800){
            show("可以提现了")
            i=0
           doactionmaxnumber(function(){
              if(idclick(刷宝余额id)){
                show("点击刷宝余额成功")
                   sleep(1000)
               }
               clicknode(className("android.view.View").clickable().depth(6).drawingOrder(0).findOne(300))
               if(textclick("立即提现")){
                }
                if(clickonetexts(["每日可提","已解锁","仅当日有效"])){
                       show("点击每日可提")
                       if(cantomoney()){
                           show("今日可以提现")
                        let i=0
                          while(i<5){
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
                          return true
                     }else{
                         show("今日不可以提现")
                      return true
                     }
                 }

           },10)
         
        }else{
            show(appname+"当前金币不够每日提现")
            return true
        }


}


function app_go_likevideolist(){
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
            app_go_home(5)
            textclick("取消")
        }
    },60000)
}
var app_home_swipe=function(){
    doactionmaxtime(function(){
        show(appname+"滑动")
        滑动(20,15,16,10,4,500,700)
        sleep(2000)
        id_desc=  id("com.jm.video:id/desc").findOne(1000)
       if(id_desc){
           currentdesc=id_desc.text()
           log("之前："+lastdesc+"--当前："+currentdesc)
           if(currentdesc==lastdesc){
              
           }else{
               like=id("com.jm.video:id/text_view").findOne(500)
               if(like){
                   tlike=like.text()
                   if(tlike){
                      if(tlike.includes("万")){
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
                       sleepr(5000*ratio,8000*ratio)
                      }else{
                        sleep(3000)
                      }
                      return true
                   }
               }
           }
       }
    },20000)
}



app_tomoney()

startapp(appname,apppkg,0,device.height-200,false,false,true,true)


