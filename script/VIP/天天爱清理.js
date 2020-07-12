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

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}

// /*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */
var apppkg="com.xiaoqiao.qclean"
var apphomeactivity="com.jifen.open.framework.biz.main.MainActivity"
var appcleanactivity="com.xiaoqiao.qclean.base.view.guide.GuidePageViewActivity"
var applaunchactivity="com.jifen.open.framework.biz.splash.LaunchActivity"
var appname="天天爱清理"
var tomoney=false  
var invite=false // 邀请
var logintype="weixin"  //登录使用微信
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3000  //最小今天的赚的金币
var islogin=false
var onlyscript=true  //仅允许当前一个脚本运行 
var 天天爱清理清理数据完成页面="com.xiaoqiao.qclean.base.view.guide.GuidePageViewActivity"
var 天天爱清理红包奖励id="com.xiaoqiao.qclean:id/image_red_bg_icon"
var 天天爱清理红包奖励状态id="com.xiaoqiao.qclean:id/tv_task_status"
var 天天爱清理视频页喜欢id="com.xiaoqiao.qclean:id/tv_like"
var 天天爱清理视频页评论id="com.xiaoqiao.qclean:id/tv_comment"
var 天天爱清理视频页内容摘要id="com.xiaoqiao.qclean:id/tv_munity_content"
var 天天爱清理弹窗广告id="com.xiaoqiao.qclean:id/tv_ad_button"  //看视频再领88金币
var 视频页标记id集合=[天天爱清理红包奖励id,天天爱清理视频页喜欢id,天天爱清理视频页评论id]
var 天天爱清理底部导航id="com.xiaoqiao.qclean:id/ll_bottom_bar"
var 天天爱清理底部导航视频id="com.xiaoqiao.qclean:id/ll_video"
var 天天爱清理底部导航任务id="com.xiaoqiao.qclean:id/ll_task"
var 天天爱清理底部导航我id="com.xiaoqiao.qclean:id/ll_mine"
var 天天爱清理看视频翻倍id="com.xiaoqiao.qclean:id/tv_gold_double"
var 广告标志集合=["点击重播","奖励已到账","查看详情","关闭","下载","点击下载","优化完成"]
// //关闭最新的app
var loopn=0
var lasttitle=""
var app_run=function(){
        app.launch(apppkg)
        sleep(3000)
        app_checklogin()
        app_tomoney2()
        app_clean()
        app_sign()
        app_see_video()
        app_tomoney2()
        app_reward()
        app_reward_xunzhang()
        app_tomoney2()
}

//荣耀殿堂那个
var app_reward_xunzhang=function(){
    let adn=0
    doactionmaxtime(function(){
        show(appname+"勋章殿堂")
    n_gold=textEndsWith("0金币").visibleToUser().findOne(1000)
    if(n_gold){
        show("找到:"+n_gold.text())
        clicknode(n_gold)
        sleep(4000)
        seead()
        adn=adn+1
    }else{
        滑动(20,10,17,10,5,500,200)
        sleep(1000)
        adn=adn+1
    }
    if(idclick("com.xiaoqiao.qclean:id/rl_close")){
        
    }
    if(adn>20){
        return true
    }
    if(isadviceactivity()){
        seead()
    }
    
},600000)
    
}


var app_checklogin=function(){
    if(获取今日记录(appname,"checklogin")){
        return true
    }
    doactionmaxtime(function(){
        show(appname+"检测登录状态")
        clicktexts(["允许","允许","允许","始终允许","始终允许","始终允许"],150,1500)
        clickids(["com.xiaoqiao.qclean:id/btn_redpack_open","com.xiaoqiao.qclean:id/btn_withdraw"],200,1500)
        idclick("com.xiaoqiao.qclean:id/iv_close")
        
           if(text("立即登录").exists()){
                if(textclick("立即登录")){
                    sleep(1000)
                    app_login_weixin()
                    return  true
                 }
           }
        
           if(textContains("邀请码").exists()){
               show(appname+"已经登录")
               今日记录(appname,"checklogin",true)
               return true
           }


           closeappundostate()
           if(isadviceactivity()>-1){
               seead()
           }
           ca=currentActivity()
           show("回到主页："+index+"--"+ca)
           if(ca==apphomeactivity||ca=="android.widget.RelativeLayout"){
               sleep(500)
               selectnavi(4)
           }else if(ca==appcleanactivity){
               back()
               sleep(1000)
           }else if(ca==applaunchactivity){
               sleep(3000)
           }else if(ca=="com.iclicash.advlib.ui.front.InciteADActivity"||ca=="com.iclicash.advlib.ui.front.ADBrowser"){
               seead()
           }else if(ca=="com.jifen.open.biz.login.ui.activity.JFBindTelActivity"){
               back()
               sleep(1000)
           }else{
               if(isadviceactivity()>-1){
                   seead()
               }
               back()
               if(currentPackage()!=apppkg){
                   app.launch(apppkg)
                   sleep(3000)
               }
           }   
           if(textStartsWith("看视频再").exists()){
               if(maytextclick("看视频再")){
                   show("点击了看视频")
                   seead()
               }
           }

    },30000)
}
var app_go_home=function(index){
    index=index||2
    if(doactionmaxtime(function(){
        closeappundostate()
        if(isadviceactivity()>-1){
            seead()
        }
        ca=currentActivity()
        show("回到主页："+index+"--"+ca)
        if(ca==apphomeactivity||ca=="android.widget.RelativeLayout"){
            sleep(500)
            if(index==1){
                selectnavi(1)
                return true
            }else if(index==2){
           
                    selectnavi(2)
                    return true
               
            }else if(index==3){
                    selectnavi(3)
                    return true
            }else if(index==4){
                   selectnavi(4)
                    return true
        
            }else{
                return true
            }
           
        }else if(ca==appcleanactivity){
            back()
            sleep(1000)
        }else if(ca==applaunchactivity){
            sleep(3000)
        }else if(ca=="com.iclicash.advlib.ui.front.InciteADActivity"||ca=="com.iclicash.advlib.ui.front.ADBrowser"){
            seead()
        }else if(ca=="com.jifen.open.biz.login.ui.activity.JFBindTelActivity"){
            back()
            sleep(1000)
        }else{
            if(isadviceactivity()>-1){
                seead()
            }
            back()
            if(currentPackage()!=apppkg){
                app.launch(apppkg)
                sleep(3000)
            }
        }   
        if(textStartsWith("看视频再").exists()){
            if(maytextclick("看视频再")){
                show("点击了看视频")
                seead()
            }
        }
  
        if(idclick("com.xiaoqiao.qclean:id/btn_get_coin")){
            //勋章殿堂
            app_reward_xunzhang()
        }
        idclick("com.xiaoqiao.qclean:id/iv_close")
        idclick("com.xiaoqiao.qclean:id/result_close")
        sleep(1000)
    },30000)){
        return true
    }else{
        app.launch(apppkg)
        sleep(3000)
        app_go_home(index)
    }

}

var selectnavi=function(index){
    show(appname+"选择导航:"+index)
    if(index==1){
        idclick("com.xiaoqiao.qclean:id/ll_home")
    }else if(index==2){
        idclick("com.xiaoqiao.qclean:id/ll_video")
    }else if(index==3){
        idclick("com.xiaoqiao.qclean:id/ll_task")
    }else if(index==4){
        idclick("com.xiaoqiao.qclean:id/ll_mine")
    }
}



var app_clean=function(){
    doactionmaxtime(function(){
        show(appname+":清理 签到")
        clicktexts(["首页","暂不领取","暂不领取"])
        if(maytextclick("一键清理")){
            sleep(5000)
        }else{
            app_go_home(1)
        }
        text_clean_result=getTextfromid("com.xiaoqiao.qclean:id/tv_finish")
        if(text_clean_result){
            if(text_clean_result.search("成功清理")>-1){
                if(textclick("优化完成")){
                    var node_coins=idContains("com.xiaoqiao.qclean:id/tv_bubble_").filter(function(w){
                        log("判断是否文本内容为空："+w.text())
                        return w.text()!=""
                    }).untilFind()
                    if(node_coins){
                        node_coins.forEach(n_c => {
                            if(clicknode(n_c)){
                                sleep(2000)
                                if(textclick("看视频兑换")){
                                    seead()
                                }
                            }
                        });
                    }
                    return true
                }
            }
        }
        if(idclick("com.xiaoqiao.qclean:id/rl_close")){
            sleep(300)
            return true
        }
        if(maytextclick("看视频再领")){
            sleep(3000)
            seead()
            back()
            return true
        }
        if(idclick(天天爱清理看视频翻倍id)){
            sleep(3000)
            seead()
            back()
            return true
        }
        if(text("一键扫描").exists()){
            return true
        }
        if(text("继续扫描").exists()){
            maytextclick("继续扫描")
            sleep(3000)
        }
    },60000)
}


// //app 登录
var app_login=function(){
    toastLog(appname+"登录")
    doactionmaxtime(function(){
        clicktexts(["允许","允许","允许","始终允许","始终允许","始终允许"],150,1500)
        clickids(["com.xiaoqiao.qclean:id/btn_redpack_open","com.xiaoqiao.qclean:id/btn_withdraw"],150,1500)
        ca=currentActivity();
        if(ca==apphomeactivity){
           if( idclick("com.xiaoqiao.qclean:id/ll_mine")){
               sleep(2000)
           }
           if(text("立即登录").exists()){
                if(textclick("立即登录")){
                    sleep(1000)
                    app_login_weixin()
                    return  true
                 }
           }
        
           if(textContains("邀请码").exists()){
               toastLog(appname+"已经登录")


               return true
           }
        }
        idclick("com.xiaoqiao.qclean:id/iv_close")
        clicktexts(["暂不领取","确定","微信"],150,2000)
       if(currentPackage()!=apppkg){
            app.launch(apppkg)
            sleep(3000)
       }
    },60000)
}


// //app 微信登录
var app_login_weixin=function(){
doactionmaxtime(function(){
    textclick("取消")
    clicktexts(["确定","微信","同意"],300,2000)
    if(text("恭喜你，解锁荣誉勋章").exists()){
        if(maytextclick("立即领取")){
            show("点击了立即领取")
            sleep(2000)
            seead()
        }
        return true
    }
},60000)

}
// //app_手机号登录
// var app_login_phone=function(){
//     reg = /\d{4}/ig
//    //输入手机号
//         if(idclick("com.xiaoqiao.qclean:id/edt_login_phone")){
//             node_phone=id("com.xiaoqiao.qclean:id/edt_login_phone").findOne(300)
//             if(node_phone){
//                 node_phone.setText(phonenumber())
//                 sleep(500)
//                 if(idclick("com.xiaoqiao.qclean:id/tv_get_captcha")){
//                   code=  get_phone_code("天天爱清理",reg,"验证码：",)
//                   if(code){
//                       setidnodetext("com.xiaoqiao.qclean:id/edt_login_captcha",code)
//                   }
//                 }
//             }
//         }
// }
// //app 签到
var app_sign=function(){
    app_go_home(3)
    doactionmaxtime(function(){
        show(appname+"：签到")
        if(textContains("看视频再送").exists()){
            sleep(1000)
            if(maytextclick("看视频再送")){
                log("点击 看视频再送")
                if(seead()){
                    return true
                }
            }
        }else{
            show("没有找到 看视频再送")
        }
        if(clickonemaytexts(["翻倍","看视频领金币","看视频"])){
            show("视频广告启动")
            sleep(2000)
            seead()
        }
     
    },15000)
    show(appname+"签到结束")
}


var app_reward=function(){
    show(appname+"获取奖励")
    app_reward_fuli()
        //金币派对
      //瓜分金币
      app_reward_coinpick()
      //天天乐
      app_reward_dayluck()
      //幸运转盘
      app_reward_luckpan()

      app_reward_coinparty()
      
    //   //勋章殿堂
    //   app_reward_xunzhang()


}


var app_reward_dayluck=function(){
        if(获取今日记录(appname,"dayluck")=="true"){
            show(appname+"天天乐已经完成")
            return true
        }
     doactionmaxnumber(function(n){
        show(appname+"天天乐:"+n)
            maytextclick("收下")
         if(text("免费抽千万金币").exists()){
            if(text("本期剩余次数0").exists()){
                今日记录(appname,"dayluck","true")
                return true
            }
            node_yyy= className("android.widget.Button").text("摇一摇").clickable(true).findOne(1000)
            if(node_yyy){
             node_yyy.click()
            }
            node_yyy= className("android.widget.Button").text("免费抽华为5G手机").findOne(1000)
            if(node_yyy){
             node_yyy.click()
            }
             if(clickonetexts(["继续抽数字","看视频领金币"])){
                 seead()
             }
             if(textclick("领取专属勋章和金币")){
                今日记录(appname,"dayluck","true")
                 return true
             }
             if(isadviceactivity()){
                 seead()
             }

         }else{
             app_go_home(3)
             doactionmaxtime(function(){
                if(textclick("天天乐")){
                    sleep(2000)
                    if(currentActivity()=="com.jifen.open.biz.login.ui.activity.JFBindTelActivity"){
                        back()
                        sleep(1000)
                    }else {
                        return true
                    }
                    
                }
                if(text("免费抽千万金币").exists()){
                    return true
                }
             },20000)
         }
         if(isadviceactivity()>-1){
             seead()
         }
         sleep(2000)
     },20)
       

}

var app_reward_coinpick=function(){
    show("瓜分金币")
    if(获取今日记录(appname,"coinpick")){
        show("瓜分金币 已经完成了")
        return true
    }
    show("瓜分金币开始")
    app_go_home(3)
        doactionmaxnumber(function(n){
            show("瓜分金币")
            ca=currentActivity()
            if(ca==apphomeactivity){
               node_guafen= className("android.widget.Image").clickable(true).depth(15).visibleToUser().text("format,webp").findOne(300)
               if(node_guafen){
                 clicknode(node_guafen)
               }
            }else if(ca=="com.jifen.qu.open.QX5WebViewActivity"){
                //
                show("在奖励页")
            }else if(ca=="com.jifen.open.biz.login.ui.activity.JFBindTelActivity"){
                back()
                sleep(1000)
            }
            
            if(textclick("领取专属勋章和金币")){
                今日记录(appname,"coinpick",true)
                return true
            }
            if(textclick("瓜分ta")){
                seead()
            }
            
            node_cishu=textMatches("还有 \\d+ 次机会").findOne(1000)
            if(node_cishu){
                if(node_cishu.text()=="还有 0 次机会"){
                    back()
                    return true
                }
            }else{
                show("找不到 还有 次机会")
            }
            if(text("今日瓜分机会已用完").exists()){
                今日记录(appname,"coinpick",7)
                return true
            }
            if(isadviceactivity()>-1){
                seead()
            }
        },50)
        show("瓜分金币结束")
 
}

var app_reward_luckpan=function(){
    if(获取今日记录(appname,"luckpan")){
        show(appname+"幸运转盘完毕")
        return true
    }
        doactionmaxnumber(function(n){
            show("幸运转盘")
            if(text("幸运大转盘").exists()){
                if(textclick("看视频抽大奖")){
                    show("点击了看视频抽大奖")
                    sleep(3000)
                    seead()
                }
                if(textclick("看视频再试一次")){
                    show("点击了看视频抽大奖")
                    sleep(3000)
                    seead()
                }
            }else{
                app_go_home(3)
                doactionmaxtime(function(){
                    if(textclick("幸运转盘",300)){
                        sleep(2000)
                        if(currentActivity()=="com.jifen.open.biz.login.ui.activity.JFBindTelActivity"){
                            back()
                            sleep(1000)
                        }else {
                            return true
                        }
                        
                    }
                },20000)
            }
            node_cishu=textStartsWith("今日还剩").findOne(1000)
            if(node_cishu.text()=="今日还剩 0 次机会"){
                show("找到今日还剩")
                今日记录(appname,"luckpan",true)
                back()
                return true
            }
            if(textclick("领取专属勋章和金币")){
                今日记录(appname,"luckpan",true)
                return true
            }
            if(isadviceactivity()>-1){
                seead()
            }
        },30)
        show(appname+"幸运转盘结束")
}


var app_reward_coinparty=function(){
        doactionmaxnumber(function(n){
            show(appname+"金币派对")
            if(maytextclick("看视频再")){
                show("点击了  看视频再")
                sleep(2000)
                seead()
            }
            if(textclick("免费再玩一次")){
                show("点击了  免费再玩一次")
                sleep(2000)
                seead()
            }
            if(textclick("领取专属勋章和金币")){
                app_reward_xunzhang()
                return true
            }

            if(isadviceactivity()){
                seead()
            }
        },30)
  
}

var app_reward_fuli=function(){
    if(获取今日记录(appname,"fuli"))
    doactionmaxnumber(function(){
        show(appname+"幸运领红包")
        if(text("幸运领红包").exists()){
            if(text("今日免费:0次").exists()){
                今日记录(appname,"福利",true)
                back()
                return true
            }
            press(device.width/2,device.height-300)
            sleep(3000)
            clicknode(className("android.view.View").clickable().depth(13).drawingOrder(0).findOne(300))
        }else{
            app_go_home(3)
            doactionmaxtime(function(){
                if(textclick("拿福利")){
                    return true
                }
            },10000)
        }
        if(isadviceactivity()>-1){
            seead()
        }
    },10)
}



var  app_see_video=function(){
    try {
        doactionmaxnumber(function(n){
            show(appname+"视频页滑动"+n)
            // if(n%5==0){
            //     selectnavi(3)
            //     sleep(1000)
            //     selectnavi(2)
            // }
            closeappundostate()
            if(!idoneexist(视频页标记id集合)){
                app_go_home(2)
            }
        
              滑动(20,15,17,7,3,500,300)
              sleep(2000)
                text_like=getTextfromid("com.xiaoqiao.qclean:id/tv_like")
                show("视频喜欢人数:"+text_like)
                if(text_like){
                    if(text_like!=lasttitle){
                        n=parseInt(text_like)
                       show(appname+":喜欢人数"+text_like)
                       lasttitle=text_like
                     let  sleeptime=10
                       if(n>1000){
                           sleeptime=10
                       }else if(n>500){
                            sleeptime=9
                       }else if(n>100){
                            sleeptime=8
                       }else{
                            sleeptime=8
                       }
                       doactionmaxtime(function(){
                           show(appname+"看视频等待")
                        if(id("com.xiaoqiao.qclean:id/tv_ad_button").visibleToUser().clickable().exists()){
                            bt_ad=id("com.xiaoqiao.qclean:id/tv_ad_button").visibleToUser().clickable().findOne(300)
                            if(bt_ad){
                                if(bt_ad.text().search("看视频再")>-1){
                                    clicknode(bt_ad)
                                    sleep(3000)
                                    seead()
                                 return true
                                }
                            }
                        }
                        if(isadviceactivity()>-1){
                            seead()
                        }
                        sleep(1000)
                       },sleeptime*1000)
                   }
                }
         },100)
    } catch (error) {
        log(appname+"出错:看视频")
    }
   
}


// //app提现
var app_tomoney=function(){
    try {
        show(appname+"开始提现")
        if(!获取记录("all","switch_tomoney",false)){
            show("全局设置不允许提现")
            return false
        }
        if(今日提现(appname)){
            return true
        }

    doactionmaxtime(function(){
        app_go_home(4)
        sleep(1000)
        nca=currentActivity()
        show("当前activity:"+nca)
        idclick("com.xiaoqiao.qclean:id/iv_close")
        if(nca==apphomeactivity){
           node_ktx=text("可提现(元)").depth(16).findOne()
           if(node_ktx){
               node_money=node_ktx.parent().child(0)
               if(node_money){
                   f_money=parseFloat(node_money.text())
                   toastLog(appname+"可提现金额:"+node_money.text())
                   if(f_money<minmoney){
                       toastLog("不够提现余额")
                       return true
                   }else{
                        textclick("去提现")
                        sleep(3000)
                   }
               }
           }
        }else if(nca=="com.jifen.qu.open.QX5WebViewActivity"){
            clicktexts(["去提现","每天可提现","立即提现"],300,2000)
             idclick("com.xiaoqiao.qclean:id/btn_back")
        }else{
            if(!idContains(apppkg).exists()){
                app.launch(apppkg)
                sleep(4000)
            }else{
                back()
            }
        }
        if(textContains("提现申请提交成功").exists()){
            今日已提现(appname)
            return true
        }
    },60000)
    } catch (error) {
        
    }
       
}

var app_tomoney2=function(){
    try {
        show(appname+"签到")
        if(!获取记录("all","switch_tomoney",false)){
            show("全局设置不允许提现")
            return false
        }
        if(今日提现(appname)){
            return true
        }

        app_go_home(4)
        滑动(20,10,4,10,10,300,100)
        sleep(3000)
        node_ktomoney=text("可提现(元)").findOne(3000)
        if(node_ktomoney){
            node_parent=node_ktomoney.parent()
            if(node_parent){
                node_yue=node_parent.child(0)
                if(node_yue&&node_yue.text()){
                    show("余额:"+node_yue.text())
                    f_yue=parseFloat(node_yue.text())
                    if(f_yue>=minmoney){
                        if(textclick("去提现")){
                            text("立即提现").waitFor()
                            clicktexts(["每天可提","立即提现"],300,2000)
                            sleep(2000)
                            今日已提现(appname)
                            seead()
                            return true
                        }
                    }else{
                        textclick("视频")
                         return true
                    }
                }else{
                    show("余额控件没找到")
                }
            }else{
                show("余额上级控件没找到")
            }
        }else{
            show("没找到可提现")
        }


    } catch (error) {
        
    }

       
}

var seeadnum=0

var seead=function(timeout){
    seeadnum=seeadnum+1
if(doactionmaxtime(function(){
    show(appname+":看广告："+seeadnum)
    if(idclick("com.xiaoqiao.qclean:id/tv_ad_button")){
        sleep(3000)
    }
    if(maytextclick("看视频再",300)){
        show("看视频再")
    }
     if(text("点击重播").exists()){
            back()
            sleep(1000)
            return true
     }
     if(textoneexist(["幸运领红包"])){
         clicknode(className("android.view.View").clickable().depth(13).drawingOrder(0).findOne(300))
     }
     if(close_ad_qq(apppkg)){
            return true
      }
       if(close_ad_toutiao(apppkg)){
           return true
       }
       if(close_ad_iclicash(apppkg)){
            return true
       }
        if(text("奖励已到账").exists()){
            back()
            sleep(1000)
            return true
        }
 
      if(isadviceactivity()>-1){
          show("是广告页:")
      }else{
          show("不是广告页 退出看广告")
        return true
      }
        if(idoneexist(视频页标记id集合)){
            return true
        }
        if(!idContains(apppkg).exists()){
            return true
        }
        if(idclick("com.xiaoqiao.qclean:id/rl_close")){
            return true
        }

    },60000)){
        return true
    }else{
        forcestop(appaname)
    }
    return false
}



startapp(appname,apppkg,0,device.height-200,false,false,true,true)
