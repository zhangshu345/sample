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
//

/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */
//应用名
var appname="米读极速版"
var apppkg="com.lechuan.mdwz"

var invitecodes=["89797906"]

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
var apphomeactivity="com.lechuan.mdwz.ui.activity.NovelMainActivity"
var keepappnewer=true
var loopn=今日滑动次数(appname)
var coinaltercloseid=""
var coinalterconfirmid="" //看视频，签到奖励翻倍！
var rewardbgid=""
var rewardstatusid=""
var videolikeid=""
var videocommentid=""
var isinvite=getbooleanvalue(appname+"_invite",false)
//关闭最新的app
var lastlike=""
//app 运行
var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_login_check()
    app_sign()
    
        app_invite()

    while(true){
        sleep(2000)
        log("循环次数："+loopn)
        app_novel_read()
        close_ad_iclicash(apppkg)
        loopn=loopn+1
    }
}

var app_novel_read=function(){
    doactionmaxtime(function(){
        if(clickoneids([coinalterconfirmid])){
            seead()
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
            if(text_like==lastlike){
                
            }else{
                lastlike=text_like
                if(text_like.search("万")>-1){
                    sleep(5000)
                    idclick(videolikeid)
                    sleep(2000)
                    return true
                }else{
                   sleep(6000)
                   return true
                }
            }
        }
      

    },30000)
}

var app_login_check=function(){
    doactionmaxtime(function(){
        show("检测"+appname+"登录状况")

        if(idoneexist([rewardbgid,videolikeid])){
            return true
        }
        if(textoneexist(["立即签到"])){
            return true
        }
        clicktexts(["知道了"],150,1500)
     if(text("选择您喜欢的类型").exists()){
        node_man= className("android.widget.ImageView").visibleToUser().clickable().depth(8).findOne(500)
        if(node_man){
            clicknode(node_bottom)
            sleep(4000)
        }
     }
      clicktexts(["允许","允许","始终允许","始终允许"],150,1500)
         sleep(1000)
         if(textclick("登录即可提现")){
             app_login_weixin()
         }
       node_kai=className("android.widget.ImageView").clickable(true).drawingOrder(3).depth(5).findOne(300)
       if(node_kai){
           clicknode(node_kai)
           sleep(3000)
       }
       if(textclick("微信")){
           sleep(3000)
          
       }
       if( textclick("同意")){
           sleep(3000)
       }

    },60000)
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
        clicktexts(["微信","同意"],200,2000)
        if(textclick("同意")){
            sleep(5000)
        }
        if(textContains("邀请码").exists()){
            return true
        }
  

    },60000)){
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
    app_go_home(3)
    sleep(2000)
    textclick("立即签到")
    sleep(2000)
    if(maytextclick("看视频")){
        seead()
    }
}

//app提现
var app_tomoney=function(){
    show(appname+"提现")
}

//app 回到操作的主页



//app邀请
var app_invite=function(){
    try {
        doactionmaxnumber(function(n){
            show(appname+"邀请:"+n)
            app_go_home(5)
            if(textclick("填写邀请码")){
                sleep(1500)
               node_yym= text("输入邀请码").editable().findOne(500)
               node_yym.setText(getrandforstrs(invitecodes))
               sleep(1000)
               if(textclick("确认")){
                   spt.put(appname+"_invite",true)
                   return true
               }
            }
        },3)
    } catch (error) {
        log(appname+"出错:邀请："+error)
    }
}

var app_go_home=function(index){
    show(appname+"回到主页:"+index)
    doactionmaxtime(function(){
        ca=currentActivity()
        if(ca==apphomeactivity){
            selectnavi(index)
            if(index==3){
                sleep(2000)
                if(maytextclick("立即提现0.3")){
                    
                }
            }
            return true
        }else {
            if(currentPackage()!=apppkg){
                app.launch(apppkg)
                sleep(30000)
            }else{
                back()
            }
        }
        if(clickoneids([coinalterconfirmid])){
            seead()
        }
        
    },20000)
}


var selectnavi=function(index){
    show(appname+"选择导航:"+index)
    node_bottom=className("android.widget.RadioButton").visibleToUser().drawingOrder(index-1).clickable().findOne(300)
    if(node_bottom){
        show("找到底部")
        if(!node_bottom.checked()){
            bd=node_bottom.bounds()
            click(bd.centerX(),bd.centerY())
        }
    }
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
    },60000)
    clickids([coinaltercloseid])
}





startapp(appname,apppkg,0,device.height-200,false,false,true,true)