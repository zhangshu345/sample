"ui";

var color = "#009688";

ui.layout(
 
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="示例"/>
                <tabs id="tabs"/>
            </appbar>
            <scroll >
            <text  w="*" h="auto" text="上传须知" />
            <text />
            <text />
            <text />
            <text />
            </scroll>
            
        </vertical>
   
);


//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setTitleTextColor(android.graphics.Color.WHITE)
ui.toolbar.setTitle("共享市场上传须知")
activity.setSupportActionBar(ui.toolbar);
ui.toolbar.setNavigationOnClickListener(function(v){
    activity.finish();
})
activity.getSupportActionBar().setDisplayHomeAsUpEnabled(true);
