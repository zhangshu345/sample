importClass(com.hongshu.network.AppConfigManager)
importClass(com.hongshu.constant.Pref)
log("本地配置:"+Pref.getAppAllConfig())
var appconfigmanager=AppConfigManager.getAppConfigManager()
appconfigmanager.updataAppConfigFromWeb();
sleep(2000)
log("本地配置:"+Pref.getAppAllConfig())
