"ui";
ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="系统快速设置"/>
        </appbar>
        <button id="devicemanger" w="auto" h="auto" text="设备管理" />
        <button id="floaty" w="auto" h="auto" text="悬浮" />
        <button id="accessibility" w="auto" h="auto" text="无障碍" />
        <button id="usagestate" w="auto" h="auto" text="使用情况" />
        <button id="input" w="auto" h="auto" text="输入法" />
        <button id="wifi" w="auto" h="auto" text="WIFI" />
        <button id="vpn" w="auto" h="auto" text="VPN" />
        <button id="developer" w="auto" h="auto" text="开发者选项" />
        <button id="lang" w="auto" h="auto" text="显示语音" />
        <button id="appmanager" w="auto" h="auto" text="应用管理" />
   </vertical>
);
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}

// var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v2/base/allfunction2.js"
// var mainfunction
// const mainemitter=events.emitter()
// threads.start(function(){
//     var  mainfunction=httpget(公共函数url)
//     if (mainfunction != "") {
//         mainemitter.emit("evelmainfun",mainfunction)
//      log("公共函数实例化成功")
//         }else {
//          log("公共函数实例化失败,程序返回")
//         }
// } )
// mainemitter.once("evelmainfun",function(str){
//     toastLog("开始初始化主函数")
//     //log(str)
//     eval(str)
// })

ui.lang.on("click",function(){
    tolanguagesetting()
})
 ui.appmanager.on("click",function(){
        toappmanagesetting()
}) 

ui.devicemanger.on("click",function(){
todeviceadmin()
})

ui.floaty.on("click",function(){
    tofloatysetting()

})
ui.vpn.on("click",function(){
    tovpnsetting()

})
ui.developer.on("click",function(){
    todevelopersetting()

})
ui.wifi.on("click",function(){
    towifisetting()

})

ui.accessibility.on("click",function(){
    toaccessibilitysetting()
})

ui.usagestate.on("click",function(){
    tousagestate()
})

ui.input.on("click",function(){
    toinputsettings()
})

var  tofloatysetting=function(){
    let i = app.intent({
         action: "android.settings.action.MANAGE_OVERLAY_PERMISSION",
         flags:["activity_new_task"]
         // data: "file:///sdcard/1.png"
     });
     context.startActivity(i);
 }
 
 var  todevelopersetting=function(){
     let i = app.intent({
          action: "android.settings.APPLICATION_DEVELOPMENT_SETTINGS",
          flags:["activity_new_task"]
          // data: "file:///sdcard/1.png"
      });
      context.startActivity(i);
  }
 
  
 var toPkgandClass=function(pkg,classname){
         let i = app.intent({
              packageName: pkg,
              className:classname
              // data: "file:///sdcard/1.png"
          });
          context.startActivity(i);
 }
 
 var todeviceadmin=function(){
        toandroidsetting("com.android.settings.DeviceAdminSettings")
 }
 
 var toinputsettings=function(){
     let i = app.intent({
         action: "android.settings.INPUT_METHOD_SETTINGS",
         flags:["activity_new_task"]
         // data: "file:///sdcard/1.png"
     });
     context.startActivity(i);
 }
 
 
 var toinputmethodsubtypesetting=function(){
     tosettingsbyaction("android.settings.INPUT_METHOD_SUBTYPE_SETTINGS")
 }
 
 
 var tolanguagesetting=function(){
     let i = app.intent({
         action: "android.settings.LOCALE_SETTINGS",
         flags:["activity_new_task"]
         // data: "file:///sdcard/1.png"
     });
     context.startActivity(i);
 }
 
 
 var tosettingsbyaction=function(actionname){
     let i = app.intent({
         action: actionname,
         flags:["activity_new_task"]
         // data: "file:///sdcard/1.png"
     });
     context.startActivity(i);
 }
  
 var toairpalnemodesetting=function(){
     tosettingsbyaction("android.settings.AIRPLANE_MODE_SETTINGS")
 }
 
 var tosearchsetting=function(){
     tosettingsbyaction("android.search.action.SEARCH_SETTINGS")
 }
 
  //到android设置页面
  var  toandroidsetting=function(classname){
      toPkgandClass("com.android.settings",classname)
  }
 
 
  //到用户使用情况页面
 var tousagestate=function(){
     tosettingsbyaction("android.settings.USAGE_ACCESS_SETTINGS")
 }
 
 var toaccessibilitysetting=function(){
     tosettingsbyaction("android.settings.ACCESSIBILITY_SETTINGS")
 }
 
 var tosystemsetting=function(){
     tosettingsbyaction("android.settings.SETTINGS")
 }
 var towifisetting=function(){
     tosettingsbyaction("android.settings.WIFI_SETTINGS")
 }
 
 var toapnsetting=function(){
     tosettingsbyaction("android.settings.APN_SETTINGS")
 }
 var todatesetting=function(){
     tosettingsbyaction("android.settings.DATE_SETTINGS")
 }
 
 var towifiipsetting=function(){
     tosettingsbyaction("android.settings.WIFI_IP_SETTINGS")
 }
 
 var tovpnsetting=function(){
     tosettingsbyaction("android.settings.VPN_SETTINGS")
 }
 
 var tophonenetsetting=function(){
     tosettingsbyaction("android.settings.DATA_ROAMING_SETTINGS")
 }
 
 var tosecuritysetting=function(){
     tosettingsbyaction("android.settings.SECURITY_SETTINGS")
 }
 
 var todisplaysetting=function(){
     tosettingsbyaction("android.settings.DISPLAY_SETTINGS")
 }
 var toappmanagesetting=function(){
     tosettingsbyaction("android.settings.MANAGE_APPLICATIONS_SETTINGS")
 }
 var toallappmanagesetting=function(){
     tosettingsbyaction("android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS")
 }
 
 
 var tomangerwritesetting=function(){
     tosettingsbyaction("android.settings.action.MANAGE_WRITE_SETTINGS")
 }
 
 
 var toignorebatteryoptintizationsetting=function(){
    tosettingsbyaction("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS")
 }
