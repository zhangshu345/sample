

function tofloatysetting(){
    var i = app.intent({
        action: "android.settings.action.MANAGE_OVERLAY_PERMISSION",
        flags:["activity_new_task"]
        // data: "file:///sdcard/1.png"
    });
    context.startActivity(i);
}

var checkfloaty=function(){
    importClass(android.provider.Settings);
    return Settings.canDrawOverlays(context)
}

console.log("是否"+checkfloaty());


var isNotificationEnabled=function(){
importClass( android.app.AppOpsManager);
importClass( android.app.NotificationManager);
importClass( android.content.pm.ApplicationInfo);
importClass(java.lang.Class);
if(device.sdkInt>=26){
  if(context.getSystemService("notification").getImportance()==0){
      return false;
  }
}
var appops=context.getSystemService("appops")
let appinfo=context.getApplicationContext().getPackageName();
let pkg=context.getPackageName();
var  uid=appinfo.uid;
var appopsclass=null
try {
    appopsclass=Class.forName("android.app.AppOpsManager")
    
    
} catch (error) {
    
}

}