auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        toastLog("网络有问题五秒后重试")
        sleep(5000)
        return httpget(url)
    }
}

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}
//微信链接邀请绑定 之后登陆  http://xiaoma.cmsswkj.cn/s5i/QmLB.html?pid=634ee0f0&app_id=80 

/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */
//应用名
var appname="小糖糕"
var apppkg="com.jifen.ponycamera"
//应用登录
var applogin=getbooleanvalue(appname+"_login",false)
//应用登录状态
var applogintype=getstrvalue(appname+"_login_type","weixin")
// 应用是否被邀请
var appinvitestate=getbooleanvalue(appname+"_invite_state",false);
var tomoney=getbooleanvalue(appname+"_tomoney",false)  //填现
var invite=getbooleanvalue(appname+"_invite",false) // 邀请
var logintype="weixin"  //登录使用微信  
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3000  //最小今天的赚的金币
var onlyscript=true  //仅允许当前一个脚本运行 
var changesetting=false
var apphomeactivity="com.jifen.ponycamera.commonbusiness.MainActivity"
var keepappnewer=true
var  lastlike=""
var loopn=0
var 小视频广告翻倍次数=0
//关闭最新的app

//app 运行
var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_login_check()
    app_see_video()
    app_reward()
    app_reward_xunzhang()
    app_tomoney()
    app_sign()
    app_reward_video()
    app_see_video()
    app_reward_xunzhang()
   app_tomoney()


}


var app_see_video=function(){
    try {
        doactionmaxnumber(function(n){
            show(appname+"看视频:"+n)
            if(!idoneexist(["com.jifen.ponycamera:id/image_gold_egg","com.jifen.ponycamera:id/tv_like"])){
                show(appname+"不在视频页 回到视频页")
                if(maytextclick("看视频再")){
                    show(appname+"点击 看视频再领")
                    sleep(3000)
                    seead()
                    小视频广告翻倍次数=小视频广告翻倍次数+1
                }else{
                    show("看视频再领 没有找到")
                }
                app_go_home(1)
            }

            txt_state=getTextfromid("com.jifen.ponycamera:id/tv_task_status")
            if(txt_state){
                if(txt_state.search("/10")>-1){
                    show(appname+"看视频达到上限")
                    return true
                }
            }
            if(id("com.jifen.ponycamera:id/exit_button").exists()){
                clicknode(id("com.jifen.ponycamera:id/exit_button").findOne(300),0,-200)
                seead()
            }
            if(idclick("com.jifen.ponycamera:id/base_card_dialog_confirm")){
                show(appname+"点击看领金币 id")
                sleep(3000)
                seead()
            }else{
                show("金币对话框确认没找到")
            }
            if(idclick("com.jifen.ponycamera:id/tv_ad_button")){
                show(appname+"点击看视频再领 id")
                sleep(3000)
                seead()
            }else{
                show(appname+"点击看视频再领 id 没有找到")
            }
            clickgold()
            if(textStartsWith("恭喜获得").exists()){
                clicknode(className("android.widget.FrameLayout").clickable(true).depth(5).drawingOrder(2).findOne(300))
            }
            滑动(20,10,17,10,1,500,300)
            sleep(2000)
            if(text("查看详情").exists()){
                滑动(20,10,14,10,1,300,100)
            }
            txt_like=getTextfromid("com.jifen.ponycamera:id/tv_like")
            if(txt_like){
                let sleeptime=8
                if(txt_like.search("w")>-1){
                   // idclick("com.jifen.ponycamera:id/tv_like")
                   sleeptime=8
                }else{
                    n_like=parseInt(txt_like)
                    if(n_like>1000){
                        sleeptime=7
                    }else if(n_like>500){
                        sleeptime=7
                    }else{
                        sleeptime=6
                    }
                }
                doactionmaxtime(function(){
                    sleep(1000)
                },sleeptime*1000)
                if(lastlike!=txt_like){
                    lastlike=txt_like
                }
            }
        },100)
    } catch (error) {
        log(appname+"看视频："+error)
    }

}


var app_login_check=function(){
    try {
        doactionmaxtime(function(){
            show("检测"+appname+"登录状况")
            clicktexts(["同意","允许","允许","始终允许","始终允许"],200,1500)
            if(idclick("com.jifen.ponycamera:id/iv_open_btn")){
                app_login()
            }
            app_go_home(5)
    
        if(text("可提现").exists()){
            return true
        }else{
           show(appname+" 没有找到可提现")
        }
        if(textContains("邀请码").exists()){
            return true
        }else{
            show(appname+" 没有找到邀请码")
        }
        if(desc("可提现").exists()){
            return true
        }else{
           show(appname+" 没有找到可提现")
        }
        if(descContains("邀请码").exists()){
            return true
        }else{
            show(appname+" 没有找到邀请码")
        }
        },60000)
    } catch (error) {
        log(appname+"登录检测 出错:"+error)
    }
  
}

var app_close_alter=function(){

}
//app 登录
var app_login=function(){
 app_login_weixin()
}

//app 微信登录
var app_login_weixin=function(){
    try {
        doactionmaxtime(function(){
            show(appname+"微信登录")
            clicktexts(["微信一键登录","同意","立即提现"],150,2000)
            if(text("我的钱包").exists()){
                return true
            }
            if(idclick("com.jifen.ponycamera:id/base_card_dialog_close")){
    
            }
            if(maytextclick("看视频再送")){
                seead()
            }
    
        },60000)
    } catch (error) {
        log(appname+"微信登录:"+error)
    }

}

//app_手机号登录
var app_login_phone=function(){

}

//app 签到
var app_sign=function(){
    try {
        doactionmaxnumber(function(n){
            app_go_home(3)
            sleep(3000)
            show(appname+"签到")
            if(maytextclick("看视频再送")){
                seead()
                return true
            }

            if(isadviceactivity()>-1){
                seead()
                return true
            }
        },10)
    } catch (error) {
        log(appname+"签到:"+error)
    }

}


var app_reward=function(){
   // app_reward_haoli()
    app_reward_coinparty()
    app_reward_luckdan()
    app_reward_dayluck()
 }
var app_reward_video=function(){
try {
    doactionmaxnumber(function(){
        show(appname+"看福利视频")
        doactionmaxtime(function(){
            app_go_home(3)
            sleep(2000)
            滑动(20,10,13,10,3,500,300)
            if(textclick("看福利视频")){
                seead()
                return true
            }
            sleep(1000)
        },15000)
        if(textclick("去观看")){
          sleep(3000)
        }
        if(isadviceactivity()){
            seead()
        }
        sleep(1000)
    },5)
} catch (error) {
    log(appname+"福利视频出错"+error)
}
}

//勋章
var app_reward_xunzhang=function(){

doactionmaxnumber(function(){
 if(text("勋章殿堂").exists()){
    if(textclick("领取",500)){
        sleep(3000)
        seead()
        sleep(2000)
        clicknode(className("android.view.View").depth(11).drawingOrder(0).indexInParent(3).clickable().findOne(500))
    }
 }else{
    app_go_home(3)
    doactionmaxtime(function(){
        if(textclick("成就勋章殿堂")){
            return true
        }
        滑动(20,10,14,10,4,800,300)
    },20000,1200)
 }
},20)
}

////豪礼派送
var app_reward_haoli=function(){
try {
    if(获取今日记录(appname,"haoli",false)){
        return true
    }
      doactionmaxtime(function(){
        show(appname+"豪礼派送")
        if(text("豪礼嘉年华").exists()){
            if(text("今日免费: 0次").exists()){
                今日记录(appname,"haoli",true)
                return true
            }
           node_yyy= textStartsWith("今日免费").visibleToUser().findOne(300)
            if(node_yyy){
                show("今日免费")
                clicknode(node_yyy,0,-50)
                sleep(3000)
                seead()
            }else{
                show("没有找到今日免费")
            }
        }else{
            app_go_home(3)
            doactionmaxtime(function(){
                if(clicknode(text("豪礼派送").findOne(300),0,-30)){
                    return true
                }
            },10000)
        }

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
    },500000)
    show(appname+"豪礼派送结束")
} catch (error) {
    log(appname+"豪礼派送出错:"+error)
}
}



////金币派对
var app_reward_coinparty=function(){
    try {
        if(获取今日记录(appname,"coinparty",false)){
            show("金币派对今日已完成")
            return true
        }
        doactionmaxnumber(function(n){
            show(appname+"金币派对："+n)
            // txt_title=getTextfromid("com.jifen.ponycamera:id/tv_title","",300)
            if(text("疯狂2020，夏日狂欢派对").exists(1000)){
                if(textContains("游戏次数已达上限").exists()){
                    今日记录(appname,"coinparty",true)
                    back()
                    return true
                }
                if(textEndsWith("开始游戏0/10").exists()){
                    今日记录(appname,"coinparty",true)
                    back()
                    return true
                }
               node_yyy= textStartsWith("免费").visibleToUser().depth(13).clickable(true).findOne(300)
                if(node_yyy){
                    show("今日免费")
                    clicknode(node_yyy,0,-50)
                    
                    sleep(2000)
                   if(textclick("免费再玩一次")){
                        sleep(2000)
                   }
                    seead()
                }else{
                    show("没有找到今日免费")
                }
                node_yyy= textStartsWith("看视频").visibleToUser().depth(13).clickable(true).findOne(300)
                if(node_yyy){
                    show("看视频")
                    clicknode(node_yyy,0,-50)
                    sleep(3000)
                    if(textclick("免费再玩一次")){
                        sleep(2000)
                   }
                    seead()
                }else{
                    show("没有找到看视频")
                }
            }else{
                app_go_home(3)
                doactionmaxtime(function(){
                    if(clicknode(text("金币派对").findOne(300),0,-30)){
                        return true
                    }
                    滑动(20,10,4,10,10,500,300)
                },10000)
            }
    
            if(isadviceactivity()>-1){
                seead()
            }
            sleep(2000)
        },12)

      
    } catch (error) {
        log(appname+"金币派对 出错:"+error)
    }
   
}



//幸运扭蛋
var app_reward_luckdan=function(){
    try {
        if(获取今日记录(appname,"luckdan",false)){
            return true
        }
        doactionmaxtime(function(){
            show(appname+"幸运扭蛋开始")
                txt_title=getTextfromid("com.jifen.ponycamera:id/tv_title","",300)
            if(txt_title=="幸运扭蛋"){
                if(text("今日免费: 0次").exists()){
                    今日记录(appname,"luckdan",true)
                    return true
                }
               node_yyy= text("看视频抽大奖").visibleToUser().depth(16).clickable(false).findOne(300)
                if(node_yyy){
                    show("找到看视频抽大奖")
                    clicknode(node_yyy,0,50)
                    sleep(3000)
                    seead()
                }else{
                    show("没有找到看视频抽大奖")
                }
            }else{
                app_go_home(3)
                doactionmaxtime(function(){
                    if(clicknode(text("幸运扭蛋").findOne(300),0,-30)){
                        return true
                    }
                    滑动(20,10,4,10,10,500,300)
                },10000,2000)
            }
    
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
        },200000)
        show(appname+"幸运扭蛋结束")
    } catch (error) {
        log(appname+"幸运扭蛋 出错:"+error)
    }
}



//天天抽大奖
var app_reward_dayluck=function(){
   try {
    if(获取今日记录(appname,"dayluck",false)){
        return true
    }

    doactionmaxtime(function(){
        show(appname+"天天抽奖")
        txt_title=getTextfromid("com.jifen.ponycamera:id/tv_title","",300)
        if(txt_title=="天天抽大奖"){
            if(text("今日免费: 0次").exists()){
                今日记录(appname,"dayluck",true)
                return true
            }
           node_yyy= text("看视频中大奖").visibleToUser().depth(17).clickable(false).findOne(300)
            if(node_yyy){
                show("找到看视频中大奖")
                clicknode(node_yyy,0,50)
                sleep(3000)
                seead()
            }else{
                show("没有找到看视频抽大奖")
            }
        }else{
            app_go_home(3)
            doactionmaxtime(function(){
                if(clicknode(text("天天抽奖").findOne(300),0,-30)){
                    return true
                }
                滑动(20,10,4,10,10,500,300)
            },10000)
        }

        if(text("看视频即可打开").exists()){
            clicknode(text("看视频即可打开").findOne(300),0,-80)
            sleep(3000)
            seead()
        }

        if(isadviceactivity()>-1){
            seead()
        }

        sleep(2000)

    },200000)
    show(appname+"天天抽奖结束")
   } catch (error) {
       log(appname+"天天乐出错"+error)
   }
}

//挖红包
var app_reward_wahongbao=function(){
try {
    if(获取今日记录(appname,"wahongbao",false)){
        return true
    }
    doactionmaxnumber(function(n){
        show(appname+"挖红包")
        txt_title=getTextfromid("com.jifen.ponycamera:id/tv_title","",300)
        if(txt_title=="赢大奖"){
            press(device.width/2,device.height-100,50)
            sleep(2000)
            if(text("今日免费: 0次").exists()){
                今日记录(appname,"wahongbao",true)
                return true
            }
           node_yyy= text("看视频立即领取").visibleToUser().findOne(300)
            if(node_yyy){
                show("找到看视频立即领取")
                clicknode(node_yyy,0,50)
                sleep(3000)
                seead()
            }else{
                show("没有找到看视频立即领取")
            }
        }else{
            app_go_home(3)
            doactionmaxtime(function(){
                if(clicknode(text("挖红包").findOne(300),0,-30)){
                    return true
                }
                滑动(20,10,4,10,11,500,300)
            },10000)
        }
        clicknode(className("android.view.View").depth(12).drawingOrder(0).clickable().findOne(300))

        if(isadviceactivity()>-1){
            seead()
        }
        sleep(2000)
    },20)
    show(appname+"挖红包结束")
} catch (error) {
   log(appname+"挖红包 出错"+error) 
}
   
}


//app提现
// //app提现
var app_tomoney=function(){
    try {
            show(appname+"提现")
            if(!获取记录("all","switch_tomoney",false)){
                show("全局设置不允许提现")
                return false
            }
            if(今日提现(appname)){
                return true
            }
        app_go_home(5)
        return doactionmaxtime(function(){
          show(appname+"开始提现")
           sleep(1000)
           nca=currentActivity()
           show("当前activity:"+nca)
           //idclick("com.xiaoqiao.qclean:id/iv_close")
           if(nca==apphomeactivity){
              node_ktx=text("可提现").depth(13).findOne()
              if(node_ktx){
                  node_money=node_ktx.parent().child(0)
                  if(node_money){
                      f_money=parseFloat(node_money.text())
                      toastLog(appname+"可提现金额:"+node_money.text())
                      if(f_money<minmoney){
                          toastLog("不够提现余额")
                          return true
                      }else{
                          textclick("可提现")
                          sleep(1000)
                      }
                  }
              }
           }else if(nca=="com.jifen.qu.withdraw.WithdrawActivity"){
               clicktexts(["去提现","每天可提"],300,2000)
               if(idclick("com.jifen.ponycamera:id/withdraw_btn")){
                   show("点击立即提现")
                   sleep(500)
                   if(textContains("每日最多提现一次").findOne(1000)){
                    今日已提现(appname)
                    return true
                    }
                   sleep(5000)
                   if(currentActivity()=="com.jifen.qu.withdraw.WithdrawActivity"){
                        今日已提现(appname)
                       return true
                   }
                   seead()
               }
           }else{
               if(!idContains(apppkg).exists()){
                   app.launch(apppkg)
                   sleep(4000)
               }
           }
           if(textContains("提现申请提交成功").exists()){
               今日已提现(appname)
               return true
           }
       },60000)
    } catch (error) {
        log(appname+"提现出错"+error)
    }
  
}




//app邀请
var app_invite=function(){


}


var app_go_home=function(index){
    try {
        if(doactionmaxtime(function(){
            show(appname+"回到主页:"+index)
            closeappundostate()
            ca=currentActivity()
            if(ca==apphomeactivity){
                if(index==1){
                    if(idoneexist(["com.jifen.ponycamera:id/image_complete","com.jifen.ponycamera:id/tv_task_status","com.jifen.ponycamera:id/image_gold_egg","com.jifen.ponycamera:id/tv_like"])){
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
                }
                else if(index==5){
                    selectnavi(5)
                    return true
                }
            }else{
                if(currentPackage()!=apppkg){
                    app.launch(apppkg);
                    sleep(3000)
                }else{
                    back()
                }
            }
            if(maytextclick("看视频再领")){
                seead()
            }
            if(isadviceactivity()>-1){
                seead()
            }
         },30000)){
             return true
        }else{
             forcestop(appname)
             app.launch(apppkg)
             sleep(3000)
         }
    } catch (error) {
            log(appname+"回到首页出错:"+error)
    }
    
}


var clickgold=function(){
  if(idclick("com.jifen.ponycamera:id/image_complete",300)){
      show(appname+"金蛋点击成功")
     sleep(1500)
    if(maytextclick("看视频再")){
        seead()
        return true
        小视频广告翻倍次数=小视频广告翻倍次数+1
    }
    selectnavi(1)
    return false
  }
  return false
}

//选择导航
var selectnavi=function(index){
    node_bottom=id("com.jifen.ponycamera:id/main_bottom_layout").findOne(300)
    if(node_bottom){
        if(node_bottom.childCount()>=index){
            if(node_bottom.child(index-1)){
                clicknode(node_bottom.child(index-1))
                return true
            }
        }
    }
   node_navi= className("android.widget.FrameLayout").clickable(true).drawingOrder(index).depth(7).findOne(200)
   if(node_navi){
       node_navi.click()
   }
}

var seead=function(){
    doactionmaxtime(function(){
        show(appname+"看广告")
     
        if(text("勋章殿堂").exists()){
            clickonetexts(["去领取","待领取","可领取"])
        }
        if(maytextclick("看视频再")){
            
        }
        if(textoneexist(["豪礼嘉年华","幸运扭蛋","疯狂2020，夏日狂欢派对","天天抽大奖","赢大奖"])){
            clicknode(className("android.view.View").depth(12).drawingOrder(0).clickable().findOne(300))
            
            return true
        }
        if(clickoneids(["com.jifen.ponycamera:id/iv_close","com.jifen.ponycamera:id/tv_close"],150,1500)){
            back()
            return true
        }
        if(text("点击重播").exists()){
            back()
            sleep(500)
            back()
            return  true
        }
       if(idclick("com.jifen.ponycamera:id/tt_video_ad_close")){
           return  true
       }
        if(text("邀请好友").findOne(500)){
            return  true
        }
        if(clickonetexts(["金币已到账","奖励已发放"])){
            back()
            return true
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

      if(isadviceactivity()<0){
        return true
      }
      sleep(1000)
    },60000)
}


startapp(appname,apppkg,0,device.height-200,false,false,true,true)