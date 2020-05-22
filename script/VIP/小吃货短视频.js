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
var apppkg="com.video.xch"
var apphomeactivity="com.liquid.box.home.HomeActivity"
var appname="小吃货短视频"
var todaysign=今日签到(appname)
alltest()
// checkfloaty()
// checksystemsettings()
floaty.closeAll()
creatgfloatywindow()
creatsetfloatywindow()  //创建设置悬浮窗
gfw.setPosition(0,220)

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
if(onlyscript){
    engines.stopOther()
}

//关闭最新的app
closelastscriptapp()
spt.put("lastscriptapp",appname)

run(apppkg)