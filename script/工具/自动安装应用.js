"ui"
auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}

滑动次数=0
floaty.closeAll()
engines.stopOther()

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/yuedulib2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
log("公共函数实例化成功")
}else {
log("公共函数实例化失败,程序返回")
}
var appname=dialogs.rawInput("请输入指定操作应用名称","",null);
show("开始自动安装应用");
creatsetfloatywindow()  //创建设置悬浮窗;
toastLog("指定："+appname+"即将启动");
home();
if(appname){
       if(!getPackageName(appname)){
        toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装");
        downloadandinstallapp(appname);
    }else{
        dialogs.alert("安装提醒","已经存在"+appname,null);
    }
}
