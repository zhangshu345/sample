auto.waitFor()
auto.setMode("normal")
importClass(android.icu.text.SimpleDateFormat);
importClass(java.util.HashSet);
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
滑动次数=0
engines.stopOther()
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}
alltest()
floaty.closeAll()
creatgfloatywindow()
show("开始刷宝短视频辅助滑动")
gfw.setPosition(0,220)
device.setMusicVolume(0)
device.wakeUpIfNeeded()
var appconfig=httpget(rewardapplisturl)
appnames=[]
apps=JSON.parse(appconfig)
apps.forEach(app =>{
    appnames.push(app.name)
})
toastLog("白名单列表:"+appnames.length)
var allapps=[]
function listapp(){
    var packageManager=context.getPackageManager()
    var packageInfos = packageManager.getInstalledPackages(0);
    for (var i = 0; i < packageInfos.size(); i++) {
        var packageInfo = packageInfos.get(i);
            //todo 压缩只对保存有效果bitmap还是原来的大小
        //第一次安装时间
        dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        appDate = packageInfo.firstInstallTime;
       
        app_name=packageInfo.applicationInfo.loadLabel(packageManager),
        app_version= packageInfo.versionName,
        app_packageName= packageInfo.packageName,
        app_firstInstall=  dateFormat.format(appDate),
        app_issystem= packageInfo.flags==0
        app_isselect=false
        allapps.push({
            name: app_name,
            version: "版本号: " + app_version,
            packageName: app_packageName,
            firstInstall: "安装时间: " + dateFormat.format(app_firstInstall),
            isselect:app_isselect,
            issystem:app_issystem
        });
    }
    toastLog("当前apps的数量:"+allapps.length)
    return allapps
}

function issystem(){

}
listapp()