
 let d=getInviteCode("com.ss.android.ugc.aweme.lite")
 log(d)
let invitemanager=com.hongshu.config.InviteActionManager.getInstance()
log(invitemanager.defualtinviteactionHashMap.get("com.ss.android.ugc.aweme.lite"))
log(invitemanager.getAppInviteAction("com.ss.android.ugc.aweme.lite"))

let appconfig=com.hongshu.config.AppConfigManager.Companion.getAppconfigmanager()
let s=appconfig.getAppConfig().getInviteactions()
log(s)
// invitemanager.setDefualtInviteActions(s)

// sleep(3000)
log(invitemanager.pkgset)
log(invitemanager.pkgset.contains("com.ss.android.ugc.aweme.lite"))
