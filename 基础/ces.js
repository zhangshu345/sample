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

var  todeviceadmin=function(){
    let i = app.intent({
         packageName: "com.android.settings",
         className:"com.android.settings.DeviceAdminSettings"
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

ui.accessibility.on("click",function(){
    
})
ui.usagestate.on("click",function(){
    tousagestate()
})
ui.input.on("click",function(){
    toinputsettings()
})
