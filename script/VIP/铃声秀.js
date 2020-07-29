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

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}
//微信链接邀请绑定 之后登陆

/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */
//应用名
var appname="铃声秀"
var apppkg="com.zheyun.bumblebee.lsx"
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
var apphomeactivity="com.zheyun.bumblebee.ui.MainActivity"
var keepappnewer=true
var loopn=今日滑动次数(appname)
var coinaltercloseid="com.zheyun.bumblebee.lsx:id/iv_close"
var coinalterconfirmid="com.zheyun.bumblebee.lsx:id/tv_confirm" //看视频，签到奖励翻倍！
var rewardbgid="com.zheyun.bumblebee.lsx:id/image_red_bg_icon"
var rewardstatusid="com.zheyun.bumblebee.lsx:id/tv_task_status"
var videolikeid="com.zheyun.bumblebee.lsx:id/tv_like"
var videocommentid="com.zheyun.bumblebee.lsx:id/tv_comment"
//关闭最新的app
var lastlike=""
//app 运行
var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_login_check()
    app_see_video()
    app_see_music()
    app_reward()
    app_tomoney()

}


var app_login_check=function(){
    doactionmaxtime(function(){
        show("检测"+appname+"登录状况")
        if(idoneexist([rewardbgid,videolikeid])){
            return true
        }
        if(textoneexist(["小视频","铃声","任务"])){
            return true
        }
        if(textclick("点这里，就可以把当前视频设为来电铃声哦！首次设置赚2000金币")){
            return true
        }
        if(maytextclick("看视频")){
            sleep(3000)
            seead()
        }
        clicktexts(["同意","允许","允许","允许","允许","始终允许","始终允许","始终允许","始终允许"],150,1500)
        if(idclick("com.zheyun.bumblebee.lsx:id/iv_open_red_packet")){
            text("立即提现").waitFor()
            textclick("立即提现")
        }

        clicktexts(["立即提现","确定","微信","同意"],200,2000)
        if(textclick("同意")){
            sleep(5000)
        }
         app_go_home(2)
    },30000)
}

var app_see_video=function(){
    doactionmaxnumber(function(n){
        show(appname+"看视频："+n)
        if(clickoneids([coinalterconfirmid])){
            sleep(3000)
            seead()
        }
        if(maytextclick("看视频")){
            sleep(3000)
            seead()
            sleep(2000)
        }
        if(maytextclick("开心收下")){

        }
        if(idoneexist([videolikeid,rewardbgid])){

        }else{
            app_go_home(2)
        }
        滑动(20,10,17,11,4,500,300)
        sleep(2000)
        text_like=getTextfromid(videolikeid)
        if(text_like){
            log(appname+"视频喜欢:"+text_like)
            if(text_like!=lastlike){
                lastlike=text_like
                if(text_like.search("w")>-1){
                    sleep(5000)
                    idclick(videolikeid)
                    sleep(4000)
                  
                }else{
                   sleep(6000)
                }
            }
        }
    },300)
}

var app_see_music=function(){
    doactionmaxnumber(function(n){
        show(appname+"铃声："+n)
        if(clickoneids([coinalterconfirmid])){
            sleep(3000)
            seead()
        }
        if(maytextclick("看视频")){
            sleep(3000)
            seead()
            sleep(2000)
        }
        if(maytextclick("开心收下")){

        }
        if(idoneexist([videolikeid,rewardbgid])){

        }else{
            app_go_home(1)
        }
        滑动(20,10,17,11,4,500,300)
        sleep(2000)
        text_like=getTextfromid(videolikeid)
        if(text_like){
            log(appname+"视频喜欢:"+text_like)
            if(text_like!=lastlike){
                lastlike=text_like
                if(text_like.search("w")>-1){
                    sleep(5000)
                    idclick(videolikeid)
                    sleep(4000)
                  
                }else{
                   sleep(6000)
                }
            }
        }
    },300)
}

var app_reward_luck=function(){
    doactionmaxtime(function(){
        if(text("幸运抽奖").exists()){
        
            if(text("本期剩余次数0").exists()){
                return true
            }
            sleep(1000)
            textclick("返回")
            node_jjcsz=text("继续抽数字").visibleToUser().depth(13).clickable().findOne(500)
            if(node_jjcsz){
                show("继续抽数字")
                bd=node_jjcsz.bounds()
                log("继续抽数字:"+bd.centerX()+","+bd.centerY())
                click(bd.centerX(),bd.centerY())
                seead()
            }
           node_yyy= className("android.widget.Button").visibleToUser().depth(13).clickable().findOne(500)
            if(node_yyy){
                show("找到摇一摇")
                bd=node_yyy.bounds()
                log("摇一摇位置:"+bd.centerX()+","+bd.centerY())
                click(bd.centerX(),bd.centerY())
                seead()
              
            }
        }
    sleep(2000)
    },500000)
}

//app 登录
var app_login=function(){
    show(appname+"登录")
}

//app 微信登录
var app_login_weixin=function(){
    show(appname+"微信登录")
   if( doactionmaxtime(function(){
        clicktexts(["确定","微信"],200,2000)
        if(textclick("同意")){
            sleep(5000)
        }
        if(textoneexist(["看视频，金币再翻1倍"])){
            return true
        }
        if(idoneexist(["com.zheyun.bumblebee.lsx:id/tv_confirm"])){
            return true
        }
        if(idclick(coinaltercloseid)){
            return true
        }
        if(textclick("点这里，就可以把当前视频设为来电铃声哦！首次设置赚2000金币")){
            return true
        }
    },30000)){
        return true
    }
        return false
    
}

//app_手机号登录
var app_login_phone=function(){
    show(appname+"手机登录登录")
}

//app 签到
var app_sign=function(){
    show(appname+"签到")
}

//app提现
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
        doactionmaxtime(function(){
            show(appname+"提现")
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
                        doactionmaxtime(function(){
                            idclick("com.jifen.dandan:id/tv_person_total_gold_title")
                            sleep(2000)
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
                        },60000)
                   
                }else{
                    show("今日金币数:"+n_todaycoin)
                    return false
                }
           
        },20000)
    } catch (error) {
        
    }
}

//app 回到操作的主页



//app邀请
var app_invite=function(){
    show(appname+"邀请")
    

}

var app_go_home=function(index){
    show(appname+"回到主页:"+index)
    doactionmaxtime(function(){
         if(maytextclick("看视频")){
             sleep(3000)
             seead()
         }
         if(selectnavi(index)){
             return true
         }
        ca=currentActivity()
        if(ca==apphomeactivity){
            selectnavi(index)
            return true
        }else {
            if(currentPackage()!=apppkg){
                app.launch(apppkg)
                sleep(30000)
            }else{
               
            }
        }
        if(clickoneids([coinalterconfirmid])){
            sleep(3000)
            seead()
        }
        clickids([coinaltercloseid,"com.zheyun.bumblebee.lsx:id/base_card_dialog_close"])
        if(isadviceactivity()<0){
            sleep(3000)
            seead()
        }
    },20000)
}


var selectnavi=function(index){
    show(appname+"选择导航:"+index)
    node_bottom=id("com.zheyun.bumblebee.lsx:id/amain_view_bottom").visibleToUser().findOne(300)
    if(node_bottom){
        if(node_bottom.childCount()>=index){
           node_target= node_bottom.child(index-1)
           log(node_target+"---selected:"+node_target.selected())
           if(!node_target.selected()){
               node_target.click()
           }
           return true
        }else{
            return false
        }
    }
    return false
}

var seead=function(){
    doactionmaxtime(function(){
        show(appname+"查看广告")
        if(text("幸运抽奖").exists()){
            return true
        }
        ca=currentActivity()
        if(ca==apphomeactivity){
            return true
        }else if(ca=="com.jifen.qu.open.QX5WebViewActivity"){
            return true
        }
        if(close_ad_iclicash(apppkg)){
            sleep(1000)
            return true
        }

        if(isadviceactivity()<0){
            return true
        }
        idclick("com.zheyun.bumblebee.lsx:id/iv_close")
    },60000)
    clickids([coinaltercloseid])
}
// app_reward_luck()
startapp(appname,apppkg,0,device.height-200,false,false,true,true)