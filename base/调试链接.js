importClass(com.hongshu.androidjs.core.debug.DevPluginService)
// DevPluginService.getInstance().connectToServer("192.168.3.2");
var  todevelopersetting=function(){
    let i = app.intent({ action: "android.settings.APPLICATION_DEVELOPMENT_SETTINGS", 
    flags:["activity_new_task"] // data: "file:///sdcard/1.png"  
});}
todevelopersetting()