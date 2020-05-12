auto.waitFor()
auto.setMode("normal")
importClass(android.icu.text.SimpleDateFormat);
importClass(java.util.HashSet);
importClass(com.hongshu.utils.GsonUtils)
importClass(com.hongshu.utils.AppUtils)
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
alltest()
floaty.closeAll()
creatgfloatywindow()
show("开始刷宝短视频辅助滑动")
gfw.setPosition(0,220)
device.setMusicVolume(0)
device.wakeUpIfNeeded()
allrewardappurl="https://gitee.com/zhangshu345012/sample/raw/v1/config/viprewardapplist.json"
var appconfig=httpget(rewardapplisturl)
appnames=[]
apps=JSON.parse(appconfig)
apps.forEach(app =>{
    appnames.push(app.name)
})
toastLog("白名单列表:"+appnames.length)
var allapps=[]
var appnames=["微信","随便粘","快手极速版","刷宝短视频","火火极速版","天天爱清理","彩蛋视频","趣多多","火山极速版","东东随便","抖音短视频"]
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
        app_issystem= (packageInfo.flags&1)!=0
        app_isselect=false
  
        allapps.push({
            name: app_name,
            version: "版本号: " + app_version,
            packageName: app_packageName,
            firstInstall: "安装时间: " + app_firstInstall,
            isselect:app_isselect,
            issystem:app_issystem
        });
    };
//    var  allappsstr=GsonUtils.toJson(allapps);
//     n=  allappsstr.length/300
//     for(let i=0;i<n;i++){
//         log(allappsstr.substring(i*300,i*300+300))
//     }
//     toastLog("当前apps的数量:"+allapps.length+"--"+GsonUtils.toJson(appnames))
m=0
allapps.forEach(app =>{
      if(!AppUtils.isAppSystem(app.packageName)){
          if(appnames.indexOf(app.name)==-1){
                toastLog(app.name+"不是白名单app")

                uninstallapp(app.name)
                log("第三方应用"+GsonUtils.toJson(app))
          }else{
            toastLog(app.name+"是白名单app")
          }
  
          m=m+1
      }
      
  })
  log("一共第三方应用："+m)
    return allapps
}

listapp()
// xiadelect.forEach(app=>{
//     uninstallapp(app)
// })