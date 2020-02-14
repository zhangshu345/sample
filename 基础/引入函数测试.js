importClass(com.hongshu.utils.AppUtils);
function getAppUtils(){
    return new AppUtils()
   
}
//var apputils=new AppUtils()
log("设备是否root:"+AppUtils.isAppRoot())

AppUtils.launchAppDetailsSettings(app.getPackageName("快手极速版"))
// var appinfos=AppUtils.getAppsInfo()
log("是否在前台："+AppUtils.isAppForeground(app.getPackageName("快手极速版")))

log("是否在前台："+AppUtils.isAppForeground(app.getPackageName("东东随便")))
