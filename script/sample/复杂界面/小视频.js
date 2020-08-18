"ui";

importClass(com.baidu.mobads.CpuAdView);
importClass(android.widget.RelativeLayout)
ui.layout(
    <frame>
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="Todo" />
            </appbar>
            <relative id="svp" w="*" h="*">
             </relative>
        </vertical>
        <fab id="add" w="auto" h="auto" src="@drawable/ic_add_black_48dp"
            margin="16" layout_gravity="bottom|right" tint="#ffffff" />
    </frame>
);


ui.emitter.on("create",(save) =>{
    log("create")
    toastLog("create")
    // var cpuadview=new com.baidu.mobads.CpuAdView(context,"d70695f9",1085)
    // ui.svp.addView(cpuadview)
    // toastLog("添加小视频v"+cpuadview)
})

ui.emitter.on("resume",()=>{
    toastLog("resume")
})
//当离开本界面时保存todoList
ui.emitter.on("pause", () => {
  toastLog("pause")
});

ui.add.on("click", () => {
    log("钱")
    var cpuadview=new com.baidu.mobads.CpuAdView(context,"d70695f9",1085)
     var reLayoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.MATCH_PARENT);
     reLayoutParams.addRule(RelativeLayout.CENTER_IN_PARENT);
     ui.svp.addView(cpuadview,reLayoutParams)
     log("hou")
});
ui.run(()=>{
     var cpuadview=new com.baidu.mobads.CpuAdView(context,"d70695f9",1085)
     var reLayoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.MATCH_PARENT);
     reLayoutParams.addRule(RelativeLayout.CENTER_IN_PARENT);
     ui.svp.addView(cpuadview,reLayoutParams)
})
