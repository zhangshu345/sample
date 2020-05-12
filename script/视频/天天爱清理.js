auto.waitFor()
auto.setMode("normal")
//10000金币  三圈 点击  看视频  
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

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}


/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */
var apppkg="com.xiaoqiao.qclean"
var apphomeactivity=""
var appname="天天爱清理"
var tomoney=false  
var invite=false // 邀请
var logintype="weixin"  //登录使用微信
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3000  //最小今天的赚的金币
var onlyscript=true  //仅允许当前一个脚本运行 
var 天天爱清理红包奖励id="com.xiaoqiao.qclean:id/image_red_bg_icon"
var 天天爱清理红包奖励状态id="com.xiaoqiao.qclean:id/tv_task_status"
var 天天爱清理视频页喜欢id="com.xiaoqiao.qclean:id/tv_like"
var 天天爱清理视频页评论id="com.xiaoqiao.qclean:id/tv_comment"
var 天天爱清理视频页内容摘要id="com.xiaoqiao.qclean:id/tv_munity_content"
var 天天爱清理弹窗广告id="com.xiaoqiao.qclean:id/tv_ad_button"  //看视频再领88金币
var 视频页标记id集合=[天天爱清理红包奖励id,天天爱清理视频页喜欢id,天天爱清理视频页评论id]
var 天天爱清理底部导航id="com.xiaoqiao.qclean:id/ll_bottom_bar"
alltest()
checkfloaty()
checksystemsettings()
floaty.closeAll()
creatgfloatywindow()

creatsetfloatywindow()  //创建设置悬浮窗
gfw.setPosition(0,220)
device.setMusicVolume(0)
device.wakeUpIfNeeded()
toastLog("自动设置音量为0")

//关闭其他脚本
if(onlyscript){
    engines.stopOther()
}

//关闭最新的app
closelastscriptapp()

show("指定："+appname+"即将启动")
// home()
// show("开始："+appname+"辅助滑动")
// home()
// sleep(1000)
// recents()
// sleep(2000)
// textclick("全部关闭")
// sleep(1000)

if(!app.getPackageName(appname)){
    show("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}else{
    show(appname+"已经安装")
}

//首次进入  同意  我的  com.xiaoqiao.qclean:id/iv_open_btn 
//app 运行
// com.xiaoqiao.qclean:id/tv_bubble_1  清理界面悬浮的按个  
var lasttitle=""
var run=function(){
    i=0
    while(true){
        if(!idContains(apppkg).findOne(1000)){
            show(appname+"不在前台") 
            app.launch(apppkg)
            sleep(3000)
     }else{
         show(appname+"在前台") 
         //回到视频页
     }
        if(idallexist(视频页标记id集合)){
            nowtitle=getTextfromid(天天爱清理视频页内容摘要id)
            if(nowtitle==lasttitle){
                滑动(20,10,17,5,500,500)
            }else{
                lasttitle=nowtitle
                sleep(6000*ratio)
            }

        }else{
            //回到视频页的操作  var  天天爱清理底部导航id="com.xiaoqiao.qclean:id/ll_bottom_bar"
            ll_bar=id(天天爱清理底部导航id).findOne(300)
            if(ll_bar){
                clicknode(ll_bar.child(1))
            }else{
                textclick("视频")
            }
            
        }
        if(i<10){
            if(textclick("同意")){
                app_login()
            }
            if(idclick("com.xiaoqiao.qclean:id/iv_open_btn")){
                app_login()
            }
        }
       if(idclick("com.xiaoqiao.qclean:id/iv_end_close")){

       }
        if(idclick("com.xiaoqiao.qclean:id/tv_gold_double")){
            seead()
        }
        if(idclick(天天爱清理弹窗广告id)){
            seead()
        }
        if(maytextclick("看视频")){
            seead()
        }
        if(textclick("看视频最高翻5倍")){
            seead()
        }
        i=i+1
    }

}

//app 登录
var app_login=function(){
    n_login=0
    changetype=0
    while(n_login<10){
        n_login=n_login+1
        if(logintype=="weixin"){
            if(changetype>1){
                show("请先手动登录账号")
                return 
            }
            app_login_weixin()
        }else{
           pn=phonenumber()
           if(pn){
               if(changetype>1){
                   show("请先手动登录账号,暂停3分钟")
                   sleep(180000)
                   return 
               }
               app_login_phone()
           }else{
               changetype=changetype+1
            
               logintype="weixin"
           }

        }
      
       
    }
   
}

//app 微信登录
var app_login_weixin=function(){

}

//app_手机号登录
var app_login_phone=function(){
    reg = /\d{4}/ig
   //输入手机号
        if(idclick("com.xiaoqiao.qclean:id/edt_login_phone")){
            node_phone=id("com.xiaoqiao.qclean:id/edt_login_phone").findOne(300)
            if(node_phone){
                node_phone.setText(phonenumber())
                sleep(500)
                if(idclick("com.xiaoqiao.qclean:id/tv_get_captcha")){
                  code=  get_phone_code("天天爱清理",reg,"验证码：",)
                  if(code){
                      setidnodetext("com.xiaoqiao.qclean:id/edt_login_captcha",code)
                  }
                }
            }
        }
}
//app 签到
var app_sign=function(){

}

//app提现
var app_tomoney=function(){

}
var seead=function(timeout){
    n_see=0
    starttime=nowdate().getTime()
    while(n_see<20){
        if(text("点击重播").exists()){
            back()
            sleep(1000)
        }
       if( close_ad_qq(apppkg)){
           return true
       }
       if(close_ad_toutiao(apppkg)){
            return true
       }
        if(nowdate().getTime()-starttime>timeout*1000){
            back()
            forcestop(appname)
            return
        }
        if(text("奖励已到账").exists()){
            back()
            sleep(1000)
        }
        n_see=n_see+1
    }
}
run()