auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        toastLog("五秒后重试")
        sleep(5000)
        return httpget(url)
    }
}

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}

// 签到增加 活跃度  不然 每天到不了 3500 
//微信登录 点击邀请链接 注册 再微信登录
var apppkg="com.jifen.dandan"
var apphomeactivity="com.jifen.dandan.sub.home.activity.HomeActivity"
var appname="彩蛋视频"
var  apprewardactivity="com.jifen.dandan.webview.WebViewActivity"
var appliveactivity="com.uqu.live.liveroom.pages.LiveActivity"
var tomoney=false  
var logintype="phone"  //weixin 是微信登录 phone 是手机号登录
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3500  //最小今天的赚的金币
var onlyscript=true  //仅允许当前一个脚本运行 
var changesetting=true
var login=getbooleanvalue(appname+"_login",false)
//应用登录状态
var logintype=getstrvalue(appname+"_login_type","weixin")
// 应用是否被邀请
var appinvitestate=getbooleanvalue(appname+"_invite_state",false);
var tomoney=getbooleanvalue(appname+"_tomoney",false)  //填现
var invite=getbooleanvalue(appname+"_invite",false) // 邀请

const 彩蛋视频广告立即领取id="com.jifen.dandan:id/tv_ad_red_pack_staus"
const 彩蛋首页奖励计时布局id="com.jifen.dandan:id/view_default_timer"
const 彩蛋首页任务状态id="com.jifen.dandan:id/tv_task_status" // text 3/5
const 彩蛋首页奖励中心图标id="com.jifen.dandan:id/image_red_bg_icon"
const 彩蛋首页喜欢按钮id="com.jifen.dandan:id/iv_like_icon"
const 彩蛋首页评论按钮id="com.jifen.dandan:id/iv_comment_icon"
const 彩蛋立即翻倍关闭按钮id="com.jifen.dandan:id/close_bottom_button"
//"恭喜您，获得彩蛋奖励！金币已自动发送至您的钱包"
const 彩蛋视频录像id="com.jifen.dandan:id/iv_ugc_enter"
const 彩蛋底部奖励id="com.jifen.dandan:id/bt_tab_welfare_task"
const 彩蛋弹窗标题id="com.jifen.dandan:id/title_text_view"
var 彩蛋视频首页标识id =[彩蛋首页喜欢按钮id,彩蛋首页评论按钮id,彩蛋视频广告立即领取id,彩蛋视频录像id,彩蛋底部奖励id]
var 视频次数=0
var lastdesc=""
var 滑动次数=0
var seevideo= true  //记录是不是看视频
var 当前金蛋=false
function app_run(){
    app.launchApp(appname)
    sleep(3000)
    xhcs=0
    if(!今日签到(appname)){
        app_sign()
    }
    while(true){
        xhcs=xhcs+1
        toastLog("循环 "+xhcs)
        device.wakeUpIfNeeded()
     
        n_tj=text("推荐").clickable().boundsInside(0,0,device.width,device.height/5).findOne(100)
        if(n_tj){
            n_tj.click()
        }
        if(idclick("com.jifen.dandan:id/iv_close")){
        }
        closeappundostate()
        if(textclick("立即翻倍")){
            seead()
         }

        app_home_sweep()
        if(text("注册/登录").clickable().boundsInside(0,0,300,300).exists()){
           if (textclick("注册/登录")){
               app_login()

           }
        }
        if(text("点击重播").exists()){
            back()
            sleep(2500)
        }
       
        if(xhcs%200==0){
           show(appname+":循环:"+xhcs)
           app_tomoney()
           app_getreward()
        }
      
    }
}

var app_home_sweep=function(){
    doactionmaxtime(function(){
        app_go_home(1)
        if(textclick("立即翻倍")){
            seead()
         }
         滑动(20,10,15,10,3,688,200)
         sleep(2388)
         jl=getTextfromid("com.jifen.dandan:id/tv_ad_red_pack_status")
         if(jl=="立即领取"){
             show("立即领取 看广告30秒")
             doactionmaxtime(function(){
               if(!id("com.jifen.dandan:id/tv_ad_red_pack_count_down").exists()){
                   return true
               }else{
                   sleepr(3000)
               }
             },30000)
            idclick("com.jifen.dandan:id/tv_ad_red_pack_status")
           
            sleep(1000)
         }else if(jl.search("上限")>-1){
            seevideo=false
         }
        desc=  id("com.jifen.dandan:id/tv_like_num").findOne(300)
        if(desc){
            currentdesc=desc.text()
            show("之前："+lastdesc+"--当前："+currentdesc)
            if(currentdesc==lastdesc){
                if(textclick("立即翻倍")){
                    seead()
                 }
                sleep(500)
            }else{
                lastdesc=currentdesc
               txt_like= getTextfromid("com.jifen.dandan:id/tv_like_num")
               if(txt_like){
                   show("喜欢人数："+txt_like)
                   n=parseInt(txt_like)
                   if(n>1000){
                       idclick("com.jifen.dandan:id/tv_like_num")
                       sleepr(7000*ratio,9000*ratio)
                   }else if(n>500){
                    sleepr(5000*ratio,7000*ratio)
                   }else if(n>100){
                    sleepr(3000*ratio,5000*ratio)
                   }
               }
                return true
            }
        }
    },10000)
  
}

var seead=function(){
    log("seead")
    doactionmaxtime(function(){
        show(appname+"看广告")
        if(text("勋章殿堂").exists()){
            clickonetexts(["去领取","待领取","可领取"])
        }
        if(maytextclick("看视频再送")){
            
        }
        if(clickoneids(["com.jifen.dandan:id/iv_close","com.jifen.dandan:id/tv_close"],150,1500)){
            back()
            return true
        }
        if(text("点击重播").exists()){
            back()
            sleep(2500)
            back()
            return  true
        }
       if(idclick("com.jifen.dandan:id/tt_video_ad_close")){
           return  true
       }

      if(close_ad_iclicash(apppkg)){
            return true
      }
       if(close_ad_toutiao(apppkg)){
            return true
       }
      if(close_ad_qq(apppkg)){
         return true
      }
     sleep(2000)
    },60000)
}

var app_go_home=function(index){
    show(appname+"回到主页:"+index)
    doactionmaxtime(function(){
        ca=currentActivity()
        if(ca==apphomeactivity){
            if(index==1){
                if(idoneexist(["com.jifen.dandan:id/tv_task_status","com.jifen.dandan:id/tv_like_num","com.jifen.dandan:id/view_ad_timer"])){
                    return true
                }else{
                    selectnavi(1)
                    sleep(1000)
                    textclick("推荐",300)
                }
            }else if(index==2){
                selectnavi(2)
                return true
            }else if(index==3){
                selectnavi(3)
                return true
            }else if(index==4){
                if(getTextfromid("com.jifen.dandan:id/tv_title")=="消息"){
                    return true
                }else{
                    selectnavi(4)
                  
                }
            }else if(index==5){
                if(getTextfromid("com.jifen.dandan:id/tv_title")=="个人中心"){
                    return true
                }else{
                    selectnavi(5)
                  
                }
               
            }

        }else if(ca==appliveactivity){
            back()
            sleep(300)
        }else {
            if(textclick("立即翻倍")){
                seead()
             }
             if(textclick("点击领取")){
                 app_getreward()
             }
          
            sleep(1000)
            if(currentPackage()!=apppkg){
                app.launch(apppkg)
                sleep(3000)
            }else{
                back()
                sleep(300)
            }
        }
        

    },30000)
}


var selectnavi=function(index){
    if(index==1){
        idclick("com.jifen.dandan:id/bt_tab_home_page",300)
    }else if(index==2){
        idclick("com.jifen.dandan:id/bt_tab_find",300)
    }else if(index==3){
        idclick("com.jifen.dandan:id/bt_tab_welfare_task",300)
    }else if(index==4){
        idclick("com.jifen.dandan:id/bt_tab_msg",300)
    }else if(index==5){
        idclick("com.jifen.dandan:id/bt_tab_mine",300)
    }
}
var app_sign=function(){
    app_go_home(3)
    doactionmaxtime(function(){
    if(idclick("com.jifen.dandan:id/bt_tab_welfare_task")){
        sleep(4000)
    }
        if(currentActivity()=="com.jifen.dandan.webview.WebViewActivity"){
             if(text("我的金币").exists()){
               log("找到金币")
             }
         }
        if(idContains("coins-number").findOne(100)){
            txt_coin=idContains("coins-number").findOne(100).text()
            if(txt_coin){
                记录现在金币(appname,parseInt(txt_coin))
            }
        }

        if(maytextclick("看视频再送")){
            seead()
            今日已签到(appname)
            return true
        }

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
    doactionmaxtime(function(){
        if(text("日常福利").exists()){
            if(textclick("去赚钱")){
                seead()
            }
            if(textclick("去抢红包")){
                seead()
            }
            sleep(1000)
            back()
           return true
        }else{
            滑动(20,10,18,10,3,500,500)
            sleep(1000)
         
        }
    },10000)

},30000)

}

var app_getreward=function(){
    app_go_home(3)
    doactionmaxtime(function(){
                if(text("日常福利").exists()){
                    textclick("去领取")
                    sleep(1000)
                   
                }else{
                    滑动(20,10,18,10,3,500,500)
                    sleep(1000)
                }
          if(currentActivity()==apprewardactivity){
            if(text("勋章殿堂").exists()){
              if(clickonetexts(["待领取","可领取"])){
                  sleep(2000)
                  seead()
              }else{
                滑动(20,10,18,10,3,500,500)
                sleep(1000)
              }
              
            if(text("新人解锁").boundsInside(0,device.height/2,device.width,device.height).exists()){
                    return true
              }
              if(text("日积月累").exists()){
                  back()
                  sleep(500)
                  back()
                  return true
              }
           }
        }else{
            app_go_home(3)
        }

        if(maytextclick("看视频抽大奖")){
            seead()
        }
        if(maytextclick("看视频再送100金币")){
            seead()
        }
        if(getTextfromid("com.jifen.dandan:id/tv_title")=="幸运领红包!"){
            back()
        }
        clickoneids(["com.jifen.dandan:id/iv_close","com.jifen.dandan:id/tv_close"],100,1500)
    },300000)
}


var app_getreward1=function(){
    app_go_home(3)
    doactionmaxtime(function(){
                if(text("每日签到").exists()){
                    textclick("抢红包")
                    sleep(1000)
                }else{
                    滑动(20,10,18,10,3,500,500)
                    sleep(1000)
                }
          if(currentActivity()==apprewardactivity){
            if(text("勋章殿堂").exists()){
              if(clickonetexts(["待领取","可领取"])){
                  sleep(2000)
                  seead()
              }else{
                滑动(20,10,18,10,3,500,500)
                sleep(1000)
              }
              
            if(text("新人解锁").boundsInside(0,device.height/2,device.width,device.height).exists()){
                    return true
              }
              if(text("日积月累").exists()){
                  back()
                  sleep(500)
                  back()
                  return true
              }
           }
        }else{
            app_go_home(3)
        }
        if(maytextclick("看视频抽大奖")){
            seead()
        }
        if(maytextclick("看视频再送100金币")){
            seead()
        }
        if(getTextfromid("com.jifen.dandan:id/tv_title")=="幸运领红包!"){
            back()
        }
        clickoneids(["com.jifen.dandan:id/iv_close","com.jifen.dandan:id/tv_close"],100,1500)
    },300000)
}

var app_login=function(){
  doactionmaxtime(function(){
      clicktexts(["微信一键登录","同意"],200,2000)
      if(currentActivity()==apphomeactivity){
          return true
      }
  },10000)
}

var app_login_phone=function(){

}


var app_login_weixin=function(){
   
}

var app_tomoney=function(){
    doactionmaxtime(function(){
         app_go_home(5)
        text_coin=getTextfromid("com.jifen.dandan:id/tv_person_total_gold_title")
            if(text_coin){
               n_coin=parseInt(text_coin.replace("我的金币","").trim())
               if(n_coin){
                记录现在金币(appname,n_coin)
               }
            }
            text_todaycoin=getTextfromid("com.jifen.dandan:id/tv_person_today_gold_title");
            n_todaycoin=parseInt(text_todaycoin.replace("今日金币","").trim())
            if(n_todaycoin>=mintodaycoin){
                if(idclick("com.jifen.dandan:id/tv_person_total_gold_title")){
                    while(true){
                        if(text("金币提现").exists()){
                            n_int_coin=parseInt(n_coin/10000)
                        
                            // if(n_int_coin>=5){
                            //     textclick("5 元")
                            //     sleep(1000)
                            //     n_can=textStartsWith("5元提现说明").findOne(200)
                            //     if(n_can.text.search("未满足")==-1){
                            //         if  (textclick("立即提现")){
                            //             seead()
                            //             back()
                            //             return true
                            //         }
                            //     }
                               
                            // }
                            // else if(n_int_coin>=3){
                            //     textclick("3 元")
                            //     sleep(1000)
                            //     n_can=textStartsWith("3元提现说明").findOne(200)
                            //     if(n_can.text.search("未满足")==-1){
                            //         if  (textclick("立即提现")){
                            //             seead()
                            //             back()
                            //             return true
                            //         }
                            //     }
                            // }else if(n_int_coin>=1){
                            //     textclick("1 元")
                            //     sleep(1000)
                            //     n_can=textStartsWith("1元提现说明").findOne(200)
                            //     if(n_can.text.search("未满足")==-1){
                            //         if  (textclick("立即提现")){
                            //             seead()
                            //             back()
                            //             return true
                            //         }
                            //     }
                            // }else {
                                textclick("0.3 元")
                                sleep(1000)
                              if  (textclick("立即提现")){
                                  seead()
                                  back()
                                  return true
                              }
                            // }
                        }
                    }
                }
            }else{
                show("今日金币数:"+n_todaycoin)
                return false
            }
       
    },20000)
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

