
// let d=getInviteCode("com.ss.android.ugc.aweme.lite")
// log(d)
// let invitemanager=com.hongshu.config.InviteActionManager.getInstance()
// invitemanager.updateAppInvite
// log(invitemanager.pkgset)
// sleep(3000)
// log(invitemanager.pkgset)
// sleep(3000)
// log(invitemanager.pkgset)
// sleep(3000)
// log(invitemanager.pkgset)

let appconfig=com.hongshu.config.AppConfigManager.Companion.getAppconfigmanager()
log(appconfig.getAppConfig().getInviteactions())