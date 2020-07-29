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
//微信链接邀请绑定 之后登陆  快音存在金币不到账的浪费时间

/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */
//应用名
var appname="快音"
var apppkg="com.kuaiyin.player"
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
var apphomeactivity="com.kuaiyin.player.v2.ui.main.MainActivity"
var keepappnewer=true

var 快音视频喜欢id="com.kuaiyin.player:id/video_like_value"

//关闭最新的app

//app 运行
var app_run=function(){
    app.launch(apppkg)
    sleep(3000)
    app_login_check()
    n_i=0
    while(true){
        sleep(2000)
        log("循环次数："+n_i)
        app_go_home(2)
        滑动(20,10,17,10,3,500,200)
        sleep(15000)
        close_ad_qq(apppkg)
        close_ad_toutiao(apppkg)
        close_ad_iclicash(apppkg)
        n_i=n_i+1
    }
}

var app_login_check=function(){
    show("检测"+appname+"登录状况")
    doactionmaxtime(function(){
        clicktexts(["我知道了","始终允许","始终允许","允许","允许"],200,1500)
        if(textclick("立即提现到微信")){
            app_login_weixin()
        }
        if(clicknode(text("立即提现至微信").findOne(1000),0,-100)){

        }
        if(textclick("微信登录")){
            sleep(2000)
        }
        if(textclick("同意")){
            sleep(2000)
        }
        if(textclick("立即提现")){
            sleep(2000)
        }
     if(textclick("去填写")){
         app_invite()
     }
     app_go_home(4)
    },60000)
}


var selectnavi=function(index){
show(appname+"选中导航:"+index)
  node_navi=  className("android.widget.RelativeLayout").drawingOrder(index).clickable().packageName(apppkg).depth(10).findOne(200)
    if(node_navi){
        if(!node_navi.selected()){
            node_navi.click()
        }else{

        }
        
    }else{

    }

}
//app 登录
var app_login=function(){

}

//app 微信登录
var app_login_weixin=function(){
 doactionmaxtime(function(){
    clicktexts(["微信登录","同意"])
    if(text("我的钱包").exist()){
        return true
    }
 },60000)
}

//app_手机号登录
var app_login_phone=function(){

}

//app 签到
var app_sign=function(){
    app_go_home(4)
    doactionmaxtime(function(){
        if(maytextclick("看完视频再领")){
            seead()
        }
    },60000)
}


var seead=function(){
    doactionmaxtime(function(){
        if(close_ad_qq(apppkg,-1)){
            return true
        }
        if(close_ad_toutiao(apppkg,-1)){
            return true
        }
        if(currentPackage()!=apppkg){
            return true
        }
        if(currentActivity()==apphomeactivity){
            return true
        }
    },60000)
}


//app提现
var app_tomoney=function(){

}

//app 回到操作的主页

var app_go_home=function(index){

   doactionmaxtime(function(){
       show(appname+"回到首页:"+index)
       if(currentPackage()!=apppkg){
            app.launch(apppkg)
            sleep(3000)
       }
         ca=currentActivity()
         if(ca==apphomeactivity){
            if(index==1){
                // if(id("com.kuaiyin.player:id/searchIcon").exists()){
                   
                // }else{
                    selectnavi(1)
                    return true
                // }
            }else if(index==2){
                // if(idoneexist(["com.kuaiyin.player:id/video_like_value","com.kuaiyin.player:id/tv_title"])){
                //     return true
                // }else{
                    selectnavi(2)
                    return true
                // }
            }else if(index==3){
                // if(id("com.kuaiyin.player:id/searchIcon").exists()){
                //     return true
                // }else{
                    selectnavi(3)
                    return true
                // }
            }else if(index==4){
                    selectnavi(4)
                return true
          
            }else if(index==5){
                // if(idoneexist(["com.kuaiyin.player:id/userName","com.kuaiyin.player:id/tv_title"])){
                //     return true
                // }else{
                    selectnavi(5)
                    return true
                // }
            }
         }else if(ca=="com.kuaiyin.player.web.WebActivity"){
            back()
         }else{
             back()
         }
         if(isadviceactivity()>-1){
             seead()
         }
 
     },30000)
 }


//app邀请
var app_invite=function(){
    
    

}


while(true){
    app_go_home(1)
    sleep(3000)
    app_go_home(2)
    sleep(3000)   
    app_go_home(3)
    sleep(3000)
    app_go_home(4)
    sleep(3000)
    app_go_home(5)
    sleep(3000)
}
startapp(appname,apppkg,0,device.height-200,false,false,true,true)