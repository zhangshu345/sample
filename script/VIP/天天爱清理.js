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

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
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

var lasttitle=""
var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_login()
    app_clean()
    滑动次数=0
    n_i=0
    while(true){
        device.wakeUpIfNeeded()
        closeappundostate()
        log("循环次数:"+n_i)
        if(n_i%100==0){
            app_sign()
        }

        app_home_activity(2)
                  //应该做可以回到首页的操作
            if(close_ad_qq(apppkg)){
            
            }
             if( close_ad_toutiao(apppkg)){
             }
      
            if(idclick("com.xiaoqiao.qclean:id/iv_end_close",50)){
             }
            if(idclick("com.xiaoqiao.qclean:id/tv_gold_double",50)){
                seead()
            }
            if(textoneexist(广告标志集合)){
                show("找到广告标识")
                seead()
            }
            if(idclick(天天爱清理弹窗广告id,100)){
                 show("点击广告id")
                 seead()
            }
            if(maytextclick("看视频",100)){
                 seead()
            }
            if(textclick("看视频最高翻5倍",100)){
                 seead()
            }
            if(idclick("com.xiaoqiao.qclean:id/rl_close")){
                return true
            }
            if(idoneexist(视频页标记id集合)){
                show("在视频页")
             }else{
                 show("不在视频页,执行回到视频页操作")
                 app_home_activity(2)
                    //回到视频页的操作  var  天天爱清理底部导航id="com.xiaoqiao.qclean:id/ll_bottom_bar"
         
                 sleep(1000)
            }
                if(ii%200==0){
                    app_clean()
                }
   
            sleep(1000)
            app_home_video_sweep()
            n_i=n_i+1
       }
}

//荣耀殿堂那个
var app_getreward=function(){

    
}

var app_home_activity=function(index){
    index=index||2
    show("回到主页："+index)
    if(doactionmaxtime(function(){
        ca=currentActivity()
        if(ca==apphomeactivity){
            sleep(1000)
            if(index==1){
                if(id("com.xiaoqiao.qclean:id/tv_how_to_make_money").exists()){
                    return true
                }else{
                    selectnavi(1)
                }
            }else if(index==2){
                if(idoneexist(["com.xiaoqiao.qclean:id/image_red_bg_icon","com.xiaoqiao.qclean:id/tv_like","com.xiaoqiao.qclean:id/image_red_bg_icon","com.xiaoqiao.qclean:id/tv_task_status"])){
                    return true
                }else{
                    selectnavi(2)
                }
            }else if(index==3){
                if(textoneexist(["我的金币","连续3天未登录，账户金币会被瓜分哦！"])){
                    return true
                }else{
                    selectnavi(3)
                    sleep(1000)
                }
         
            }else if(index==4){
                if(textoneexist(["我的钱包","金币余额"])){
                    return true
                }else{
                    selectnavi(4)
                }
            }else{
                return true
            }
           
        }else if(ca==appcleanactivity){
            back()
            sleep(1000)
        }else if(ca==applaunchactivity){
            sleep(3000)
        }else{
            idclick("com.xiaoqiao.qclean:id/iv_close")
            back()
        }
        if(currentPackage()!=apppkg){
            app.launch(apppkg)
            sleep(3000)
        }
        if(maytextclick("看视频再领")){
            seead()
        }
        if(idclick("com.xiaoqiao.qclean:id/rl_close")){
            return true
        }

        if(currentPackage()!=apppkg){
            app.launch(apppkg)
            sleep(3000)
        }
        sleep(1000)
    },30000)){
        return true
    }else{
        forcestop(appname)
        return app_home_activity(index)
    }

}

var selectnavi=function(index){
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

// 
var app_getreward=function(){


}


var app_clean=function(){
    show(appname+":清理 签到")
    doactionmaxtime(function(){
     
        clicktexts(["首页","暂不领取","暂不领取"])
        if(maytextclick("一键清理")){
            sleep(5000)
        }else{
            app_home_activity(1)
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
                                sleep(1000)
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
            seead()
            back()
            return true
        }
        if(idclick(天天爱清理看视频翻倍id)){
            seead()
            back()
            return true
        }
        if(text("一键扫描").exists()){
            return true
        }
    },10000)
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
               sleep(1000)
           }
           if(textclick("立即登录")){
               sleep(1000)
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
    show(appname+"：签到")
    app_home_activity(3)
    doactionmaxtime(function(){
        if(maytextclick("看视频再送")){
            seead()
        }

    },20000)

}


var app_reward_coin=function(){
    app_home_activity(3)
    doactionmaxtime(function(){
        node_img=className("android.widget.Image").clickable().depth(15).drawingOrder(0).findOne(200)
        if(node_img){
            node_img.click()
            sleep(1000)
        }
        node_coin=className("android.view.View").clickable().depth(12).dismissable(false).indexInParent(5).findOne(200)
        if(node_coin){
            node_coin.click()
            sleep(1000)
            seead()
        }
        
     
    },300000)
}

var  app_home_video_sweep=function(){
    doactionmaxtime(function(){
        if(maytextclick("看视频再领")){
            seead()
        }
        if(!id("com.xiaoqiao.qclean:id/tv_like").exists()){
            app_home_activity(2)
        }
        滑动(20,10,17,10,5,500,300)
        sleep(2000)
        nowtitle=getTextfromid(天天爱清理视频页内容摘要id)
        if(nowtitle!=lasttitle){
            lasttitle=nowtitle
            text_like=getTextfromid("com.xiaoqiao.qclean:id/tv_like")
            if(text_like){
                n=parseInt(text_like)
                show(appname+":喜欢人数"+text_like)
                if(n>1000){
                    sleepr(8000*ratio,12000*ratio)
                }else if(n>500){
                    sleepr(7000*ratio,9000*ratio)
                }else if(n>100){
                    sleepr(6000*ratio,8000*ratio)
                }else{
                    sleepr(5000*ratio,7000*ratio)
                }
            }else{
                sleepr(2000*ratio,5000*ratio)
            }
                return  true
         }

    },60000)
}


// //app提现
var app_tomoney=function(){
     show("开始提现")
     if(今日提现(appname)){
         show(appname+":今日已经提现了")
         return true
     }
    doactionmaxtime(function(){
        app_home_activity(4)
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
        if (textclick("我的")){
            滑动(20,10,4,10,10,300,100)
            text("去提现").waitFor()
            sleep(2000)
            node_ktomoney=text("可提现(元)").findOne(300)
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
        }else{
            show("点击我的 失败了")
        }
        if(textContains("提现申请提交成功").exists()){
            今日已提现(appname)
            return true
        }
    },20000)
}

var seeadnum=0
var seead=function(timeout){
    seeadnum=seeadnum+1
    show(appname+":看广告："+seeadnum)
    doactionmaxtime(function(){
        if(text("点击重播").exists()){
            back()
            sleep(1000)
            return true
        }
       if( close_ad_qq(apppkg)){
           return true
       }
       if(close_ad_toutiao(apppkg)){
            return true
       }
        if(text("奖励已到账").exists()){
            back()
            sleep(1000)
            return true
        }
        if(currentActivity()==apphomeactivity){
            return  true
        }
        if(idoneexist(视频页标记id集合)){
            return true
        }
        if(!idContains(apppkg).exists()){
            return true
        }
        if(idclick("com.xiaoqiao.qclean:id/tv_ad_button")){
            sleep(3000)
        }
        if(idclick("com.xiaoqiao.qclean:id/rl_close")){
            return true
        }
    },60000)
}


// app_tomoney()
let runscriptapp= spt.getString("hongshuyuedu_run_app",null)
log("正在集合运行的APP"+runscriptapp)
let isreaderunning=spt.getBoolean("hongshuyuedu_running",false)
log("是否是集合运行："+isreaderunning)
// 集合运行
if(runscriptapp==appname && isreaderunning){

}else{
    engines.stopOther()
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
    show(appname+"辅助滑动")
    gfw.setPosition(0,220)
    if(!app.getPackageName(appname)){
        toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
        downloadandinstallapp(appname,apppkg)
    }else{
        keepappisnewer(appname,apppkg)
    }
    closelastscriptapp()
    toastLog(appname+"开始运行")
    spt.put("lastscriptapp",appname)
    spt.put("hongshuyuedu_running",false)
    try {
        app_run()
    } catch (error) {
        
    }
}

