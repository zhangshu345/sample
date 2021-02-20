"ui";
ui.layout(
    <vertical>
    <button id="bt1" text="第一个按钮"/>
    <button id="bt2" text="第二个按钮"/>
</vertical>
)
ui.emitter.on("viewcreated",()=>{
    fui.bt1.on("click",v => toastLog("你好"))
    fui.bt2.on("click",v => toastLog("你好"))
})
