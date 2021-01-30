"ui";

ui.layout(
   <vertical >
       <com.hongshu.theme.widget.ThemeColorToolbar id="toolbar" ></com.hongshu.theme.widget.ThemeColorToolbar>"
       <text  text="本工具仅用于更新指定文件夹中媒体文件到系统媒体库，用于解决 文件中明明存在媒体文件但是 媒体查看软件不显示该文件。\n直接写根目录之后的文件夹名称即可 举例 video/video  即为 根目录下的 video文件夹 下的video的字文件夹"/>
       <input id="input" hint="输入媒体扫描文件夹"></input>
       <button id="ok" text="扫描更新"></button>
    </vertical>
)
ui.toolbar.setTitle("媒体更新")
activity.setSupportActionBar(ui.toolbar);
activity.getSupportActionBar().setDisplayHomeAsUpEnabled(true);
ui.toolbar.setNavigationOnClickListener(function(v){
    activity.finish();
})
ui.ok.on("click",function(){
    var dir="/sdcard/"+ui.input.text();
    log("扫描文件夹："+dir)
    media.scanFile(dir)
})