importClass(com.hongshu.autojs.core.shell.ShizukuShell)
importPackage(moe)
runtime.requestPermissions(["moe.shizuku.manager.permission.API_V23"])
let shizuku=ShizukuShell.getInstance(false)
log("可用")

importClass(moe.shizuku.api.ShizukuService)
log("服务:"+ShizukuService.pingBinder())
