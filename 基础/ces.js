"ui";

ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="卡片布局"/>
        </appbar>
        <button id="devicemanger" w="auto" h="auto" text="设备管理" />
        <button id="floaty" w="auto" h="auto" text="悬浮" />
        <button id="accessibility" w="auto" h="auto" text="无障碍" />
        <button id="usagestate" w="auto" h="auto" text="使用情况" />
        <button id="input" w="auto" h="auto" text="输入法" />
        <button id="wifi" w="auto" h="auto" text="WIFI" />
        <button id="cl" w="auto" h="auto" text="DeviceAdmin" />
        <smartrefreshlayout >
       
   <list>
   <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
       cardElevation="1dp" gravity="center_vertical">
       <vertical padding="18 8" h="auto">
           <text text="修复ui模式的Bug" textColor="#222222" textSize="16sp"/>
           <text text="无限期" textColor="#999999" textSize="14sp"/>
       </vertical>
       <View bg="#ff5722" h="*" w="10"/>
   </card>
   </list>
        </smartrefreshlayout>
   </vertical>
);


// var  todeviceadmin=function(){
//     toandroidsetting("com.android.settings.DeviceAdminSettings")
//     // let i = app.intent({
//     //      packageName: "com.android.settings",
//     //      className:"com.android.settings.DeviceAdminSettings"
//     //      // data: "file:///sdcard/1.png"
//     //  });
//     //  context.startActivity(i);
//  }
 function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
var  公共函数文本
// const myEE = events.emitter();
// myEE.once('foo', () => eval(公共函数文本));

// threads.start(function(){
//     var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/%E5%9F%BA%E7%A1%80/allfunction.js"
//     公共函数文本=httpget(公共函数url)
//     if (公共函数文本 != "") {
//      myEE.emit("foo")
//     log("公共函数实例化成功")
//     }
//     else {
//     log("公共函数实例化失败,程序返回")
//     }
// }, )



var todeviceadmin=function(){
    toandroidsetting("com.android.settings.DeviceAdminSettings")
}

 //到android设置页面
 var  toandroidsetting=function(classname){
    toPkgandClass("com.android.settings",classname)
}

var toPkgandClass=function(pkg,classname){
    let i = app.intent({
         packageName: pkg,
         className:classname
         // data: "file:///sdcard/1.png"
     });
     context.startActivity(i);
}


ui.devicemanger.on("click",function(){
// importClass(com.hongshu.utils.PermissionUtils)
// importClass(com.hongshu.receiver.DeviceManger)
// toast("申请设备管理")
// log("nihao ")
// PermissionUtils.requestDeviceAdmin()
// var dm=new DeviceManger(context)
todeviceadmin()
//dm.enableDeviceManager()
})
ui.floaty.on("click",function(){
    tofloatysetting()

})
ui.wifi.on("click",function(){
    towifisetting()

})

ui.accessibility.on("click",function(){
    
})
ui.usagestate.on("click",function(){
    tousagestate()
})
ui.input.on("click",function(){
    toinputsettings()
})


