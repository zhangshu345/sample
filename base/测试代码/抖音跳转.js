// com.hongshu.utils.IntentUtils.goKuaiShowHomePage(context)

// com.hongshu.utils.IntentUtils.goDouyinVideoPage(context,"6906053018739920140")
// com.hongshu.utils.IntentUtils.goDouyinUserPage(context,"106731108401")

let content=com.blankj.utilcode.util.CacheDiskUtils.getInstance("data_helpview").getString("data")
log(content)

com.blankj.utilcode.util.CacheDiskUtils.getInstance("data_helpview").remove("data")

 content=com.hongshu.config.AppConfigManager.Companion.getAppconfigmanager().getKeyValue("helpurl")
log(content)