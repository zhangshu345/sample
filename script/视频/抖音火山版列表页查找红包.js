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
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}
//微信链接邀请绑定 之后登陆

/*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */

var tomoney=false   //填现
var invite=false // 邀请
var logintype="weixin"  //登录使用微信  
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3000  //最小今天的赚的金币
var onlyscript=true  //仅允许当前一个脚本运行 
var changesetting=false
var apppkg="com.ss.android.ugc.live"
var apphomeactivity="com.ss.android.ugc.live.main.MainActivity"
var appliveactivity="com.ss.android.ugc.live.live.ui.LiveDetailActivity"
var appname="抖音火山版"
var 直播页红包列表id="com.ss.android.ugc.live:id/cxb"  // com.ss.android.ugc.live:id/cxb
var 直播列表页红包标志id="com.ss.android.ugc.live:id/clj"
var 直播页红包点击背景id="com.ss.android.ugc.live:id/cll"  //可点击
var 直播页红包倒计时id="com.ss.android.ugc.live:id/dq9"    //
var 直播页列表开播按钮id="com.ss.android.ugc.live:id/dla"
var 直播页列表地址id="com.ss.android.ugc.live:id/brv"
var 直播页红包下面数字="com.ss.android.ugc.live:id/a4y"

var 直播页福袋倒计时id="com.ss.android.ugc.live:id/a4s"   //
  //  没有头像的红包同时多个 android.widget.TextView
var 直播页红包背景有头像id="com.ss.android.ugc.live:id/lt"  //不支持点击
var 直播页红包头像id="com.ss.android.ugc.live:id/ew"  //不支持点击

var 直播页已经关注id="com.ss.android.ugc.live:id/aji" //可以点击
var 直播页未关注id="com.ss.android.ugc.live:id/aqk"   //可点击
var 直播页福袋中心抢id="com.ss.android.ugc.live:id/cqm"  //
var 直播页标识集合id=[直播页已经关注id,直播页未关注id]
var 直播列表页标识集合id=[直播页列表开播按钮id,直播页列表地址id]

var 直播红包倒计时集合id=[直播页红包倒计时id,直播页福袋倒计时id]
var 直播页红包弹窗id="com.ss.android.ugc.live:id/agu"
var 提前开始点击时间=1500
var 点击持续时间=4000
var 点击间断时间=5
var 循环次数=1000
var 最长等红包时间=180
var x=500,y=1000
 alltest()
// checkfloaty()
// checksystemsettings()
floaty.closeAll()
creatgfloatywindow()

gfw.setPosition(0,388)


if(changesetting){
    device.setMusicVolume(0)
    toastLog("自动设置音量为0")
}

if(!app.getPackageName(appname)){
    show("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}else{
    show(appname+"已经安装")
}


engines.stopOther()
//关闭最新的app
//closelastscriptapp()
spt.put("lastscriptapp",appname)
//app 运行
var run=function(){
    app.launch(apppkg)
    sleep(3000)
    n_i=0
    while(true){
     
        log("循环次数："+n_i)
        if(循环次数/50==0){
            textclick("直播")
        }
        ca=currentActivity()
        
        if(ca!=apphomeactivity){
            show("No 当前activity:"+ca)
            app_home_video()
            sleep(1000)
            滑动(20,10,18,10,7,500,500)
        }else{
            show("Yes 当前activity:"+ca)
            //这里是视频上滑操作
                //应该做个筛选 就是人数稍的 或者 是人数在一定范围的
                if(idclick(直播列表页红包标志id,1000)){
                    while(!idoneexist(直播页标识集合id)){
                        //这里处理
                        sleep(1000)
                        if(currentActivity()!=appliveactivity){
                            break
                        }
                    } 
                    sleep(1000);
                    node_djs=id(直播页福袋倒计时id).findOne(1000)
                    if(node_djs){
                        t_djs=node_djs.text()
                        tt=t_djs.split(":")
                        time_djs=parseInt(tt[0])*60+parseInt(tt[1])
                        show("福袋倒计时:"+time_djs+"秒")
                        if(time_djs<最长等红包时间){
                            // if(clicknode(node_djs)){
                            //     waiterhongbao()
                            // }
                            waiterhongbao()
                        }
                    } 
                    node_djs=id(直播页红包倒计时id).findOne(1000)
                    if(node_djs){
                        t_djs=node_djs.text()
                        tt=t_djs.split(":")
                        time_djs=parseInt(tt[0])*60+parseInt(tt[1])
                        show("红包倒计时:"+time_djs+"秒")
                        if(time_djs<最长等红包时间){
                            waiterhongbao()
                           
                        }
                    }
                }else{
                    滑动(20,10,18,10,7,500,500)
                }
                if(idoneexist(直播列表页标识集合id)){
                    滑动(20,10,18,10,7,500,500)
                }else{
                    if( textclick("直播")){
                        sleep(2000)
                    }
                }

        }
        if(textallexist(["关闭应用","等待"])){
           if( textclick("关闭应用")){
            app.launch(apppkg)
            sleep(3000)   
            }
        }
        n_i=n_i+1
    }
}

var waiterhongbao=function(){
    while(true){
        node_hbtc=id(直播页红包弹窗id).findOne(1000)
        node_hhhdj=id(直播页红包倒计时id).depth(5).findOne(300)
        if(node_hhhdj){
            show("找到红包倒计时")
            if(node_hhhdj.text().search("分")>-1){
                show("等待10秒")
             sleep(10000)
            }else{
                show("时间小于一分钟")
                time_djs=parseInt(node_hhhdj.text())
                if(time_djs<提前开始点击时间){
                    循环次数=点击持续时间/点击间断时间
                    for(var i = 0; i < 循环次数; i++){
                        //点击位置(500, 1000), 每次用时1毫秒
                        press(x, y, 点击间断时间);
                    }
                    return true
                }
            }
        }
        if(clickoneids(直播红包倒计时集合id)){
                show("点击红包倒计时")
        }
        
        sleep(1000)
    }
}

var app_home_video=function(){
    if(idContains(apppkg).findOne(100)){
        back()
        sleep(1000)
        textclick("退出")
       
    }else{
       app.launch(apppkg)
       sleep(5000)
    }
}

//app 登录
var app_login=function(){

}

//app 微信登录
var app_login_weixin=function(){

}

//app_手机号登录
var app_login_phone=function(){

}
//app 签到
var app_sign=function(){

}

//app提现
var app_tomoney=function(){

}

run()
// if(clickoneids(直播红包倒计时集合id)){
//     show("点击红包倒计时")
    
// }else{
//    show("没有找到任务一个红包倒计时")
// }

// if(id(直播页红包倒计时id).findOne(500)){
//     idclick(直播页红包倒计时id)
//     show("找到了红包倒计时11")
// }else{
//     show("没有找到了红包倒计时")
// }

// if(id(直播页红包倒计时id).findOne(1000)){
//     idclick(直播页红包倒计时id)
//     show("找到了红包倒计时222")
// }else{
//     show("没有找到了红包倒计时")
// }
