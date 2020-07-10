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
//检测到提醒 在oppo应用商店上架的 没有邀请  10分钟一次的广告奖励1000金币 10分钟看视频奖励2980 金币

/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */
//应用名
var appname="妙看赚钱"
var apppkg="com.taige.mygold"

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
var apphomeactivity="cn.lingyongqian.bronn.business.main.MainActivity"
var keepappnewer=true
var loopn=今日滑动次数(appname)
var coinaltercloseid="com.zheyun.bumblebee.lsx:id/iv_close"
var coinalterconfirmid="com.zheyun.bumblebee.lsx:id/tv_confirm" //看视频，签到奖励翻倍！
var rewardbgid="cn.lingyongqian.bronn:id/vgRewardTimer"
var rewardstatusid="cn.lingyongqian.bronn:id/vgRewardTimer"
var videolikeid="cn.lingyongqian.bronn:id/tvLike"
var videocommentid="cn.lingyongqian.bronn:id/tvComment"
var isinvite=getbooleanvalue(appname+"_invite",false)
//关闭最新的app
var lastlike=""
//app 运行
var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_login_check()
    // if(!isinvite){
    //     app_invite()
    // }
    app_sign()
    app_see_video()
    app_tomoney()
}


var app_login_check=function(){
    try {
        doactionmaxtime(function(){
            show("检测"+appname+"登录状况")

            if(textclick("开始赚钱")){
                app_login_weixin()
            }

            if(textoneexist(["小视频","铃声","任务"])){
                return true
            }
            clicktexts(["同意并继续","去授权","允许","允许","允许","始终允许","始终允许","始终允许"],150,1500)
     
            if(idoneexist([rewardbgid,videolikeid])){
                return true
            }
             app_go_home(3)
             sleep(2000)
             if(textclick("签到")){
                 sleep(1500)
                 if(maytextclick("金币翻倍")){
                     seead()
                     sleep(2000)
                     textclick("收入囊中")
                     return true
                 }
             }
             mycoin=getTextfromid("com.taige.mygold:id/my_gold")
             if(mycoin){
                 coin=parseInt(mycoin.text())
                 if(coin>3000){
                     textclick("去提现")   
                     app_tomoney()
                 }
             }
        },60000)
    } catch (error) {
        
    }

}



//app 登录
var app_login=function(){
    try {
        show(appname+"登录")
    } catch (error) {
        
    }
   
}

//app 微信登录
var app_login_weixin=function(){
    try {
        show(appname+"微信登录")
        if( doactionmaxtime(function(){
             clicktexts(["微信登录"],200,2000)
             if(textclick("同意")){
                 sleep(5000)
             }

             if(idoneexist(["com.zheyun.bumblebee.lsx:id/tv_confirm"])){
                 return true
             }
             if(idclick(coinaltercloseid)){
                 return true
             }
             if(textoneexist(["继续赚钱"])){
                 return true
             }
         },60000)){
             return true
         }
             return false
    } catch (error) {
        
    }

    
}

//app_手机号登录
var app_login_phone=function(){
    try {
        show(appname+"手机登录登录")
    } catch (error) {
 
    }
}

//app 签到
var app_sign=function(){
    try {
        show(appname+"签到")
        app_go_home(3)
        doactionmaxnumber(function(n){
            
        },5)
    } catch (error) {
        
    }
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

        doactionmaxnumber(function(n){
            if(text("余额不足").exists()){
                return true
            }
            if(text("提现").exists()){
                clicktexts(["0.3元","天天提现","立即提现"])
            }else{
                app_go_home(3)
                doactionmaxtime(function(){
                    if(textclick("去提现")){
                        return true
                    }
                },10000)
            }
        },5)

    } catch (error) {
        
    }
}

//app 回到操作的主页



//app邀请
var app_invite=function(){
    try {
        doactionmaxtime(function(){
            show(appname+"邀请")
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
        },60000)
    } catch (error) {
        
    }


}

var app_go_home=function(index){
    try {

        doactionmaxtime(function(){
            show(appname+"回到主页:"+index)
            ca=currentActivity()
            if(ca==apphomeactivity){
                selectnavi(index)
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
            if(isadviceactivity()>-1){
                seead()
            }
        },20000)
    } catch (error) {
        
    }
   
}


var selectnavi=function(index){
    try {
        show(appname+"选择导航:"+index)
        node_bottom=id("cn.lingyongqian.bronn:id/rgTabController").visibleToUser().findOne(300)
        if(node_bottom){
            show("找到底部")
            if(node_bottom.childCount()>=index){
    
               node_target= node_bottom.child(index-1)
               log(node_target+"---selected:"+node_target.checked())
               if(!node_target.checked()){
                   bd=node_target.bounds()
                   click(bd.centerX(),bd.centerY())
               }
            }
        }
    } catch (error) {
        
    }

}

var seead=function(){
    try {
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
    } catch (error) {
        
    }

}

startapp(appname,apppkg,0,device.height-200,false,false,true,true,"http://zhangshuhong888.iask.in:8989/com.taige.mygold.apk")