"ui";
importClass(android.graphics.Bitmap);
importClass(java.io.ByteArrayOutputStream);
importClass(android.util.Base64);
importClass(java.io.File);
importClass(android.icu.text.SimpleDateFormat);
importClass(java.util.HashSet);
try {
    

var color = "#009688";
var apps=[]
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="手机清理"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical  bg="#ffffff">
                          <list id="applist" layout_weight="1">
                            <relative bg="?selectableItemBackground" w="*" h="48dp" gravity="center_vertical" >
                                <img src="@drawable/ic_music_note_black_48dp" tint="white" id="appicon" bg="#ff5722" w="36dp" h="36dp" margin="6dp" layout_alignParentLeft="true" />
                                <text id="appname" layout_toRightOf="appicon" textSize="14sp" textColor="#000000" text="{{this.name}}" marginTop="16" maxLines="1" ellipsize="end"/>
                               <checkbox id="check" textSize="13sp" textColor="#929292"  layout_alignParentRight="true" checked="{{this.isselect}}"  />
              
                            </relative>
                   </list>
                  
                    </vertical>
                </frame>
                <frame>
                    <text text="第二页内容" textColor="red" textSize="16sp"/>
                </frame>
                <frame>
                    <text text="第三页内容" textColor="green" textSize="16sp"/>
                </frame>

            </viewpager>
            <progressbar id="progressbar" indeterminate="true" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);


//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("设置");
    menu.add("关于");
});

//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "设置":
            toast("还没有设置");
            break;
        case "关于":
            alert("关于", "Auto.js界面模板 v1.0.0");
            break;
    }
    e.consumed = true;
});

activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["应用卸载", "垃圾清理", "标签三"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([
  {
      title: "应用卸载",
      icon: "@drawable/ic_android_black_48dp"
  },
  {
      title: "垃圾清理",
      icon: "@drawable/ic_settings_black_48dp"
  },
  {
      title: "选项三",
      icon: "@drawable/ic_favorite_black_48dp"
  },
  {
      title: "退出",
      icon: "@drawable/ic_exit_to_app_black_48dp"
  }
]);

ui.menu.on("item_click", item => {
    switch(item.title){
        case "退出":
            ui.finish();
            break;
    }
})
ui.applist.setDataSource(apps)

ui.applist.on("item_click",function(item,pos){
    toastLog("点击位置"+pos)
})


ui.applist.on("item_bind",function(itemView,itemHolder){
    itemView.check.on("check",function(checked){
        toastLog("选中："+itemView.check.isChecked())
    })
})


threads.start(function(){
    listapp()
    ui.run(()=> {
           ui.applist.getAdapter().notifyDataSetChanged()
    });
})


function listapp(){
    var packageManager=context.getPackageManager()
    var packageInfos = packageManager.getInstalledPackages(1);
    for (var i = 0; i < packageInfos.size(); i++) {
        var packageInfo = packageInfos.get(i);
        if (packageInfo.applicationInfo.loadIcon(packageManager) == null) {
            continue;
        }
        var bitmap = com.blankj.utilcode.util.ConvertUtils.drawable2Bitmap(packageInfo.applicationInfo.loadIcon(packageManager));
        var baos = new ByteArrayOutputStream();
        //todo 压缩只对保存有效果bitmap还是原来的大小
        bitmap.compress(Bitmap.CompressFormat.JPEG, 30, baos);
        baos.flush();
        baos.close();
        // 转换为字节数组
        var byteArray = baos.toByteArray();
        // 转换为字符串
        var reslut = Base64.encodeToString(byteArray, Base64.NO_WRAP);

        //第一次安装时间
        dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        appDate = packageInfo.firstInstallTime;
        apps.push({
            icon: reslut,
            name: packageInfo.applicationInfo.loadLabel(packageManager),
            version: "版本号: " + packageInfo.versionName,
            packageName: packageInfo.packageName,
            firstInstall: "安装时间: " + dateFormat.format(appDate),
            isselect:false
            
        });
    }
    toastLog("当前apps的数量:"+apps.length)
}

} catch (error) {
    
}