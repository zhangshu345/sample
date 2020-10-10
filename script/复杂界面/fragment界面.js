"fragment";
fragment.layout(
    <vertical>
    <button id="bt1" text="第一个按钮"/>
    <button id="bt2" text="第二个按钮"/>
</vertical>
)
fragment.emitter.on("resume",()=>{
    fragment.bt1.on("click",v => toastLog("你好"))
    fragment.bt2.on("click",v => toastLog("你好"))
})
