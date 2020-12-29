"ui";

var color = "#009688";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="示例"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <vertical>
                    <text text="输入搜索直播商品名称，输入多个名称时，以 - 分割。 举例 酒-白酒-红酒-葡萄酒" textColor="black" textSize="16sp"/>
                    <input id="in_spm" hint="在此输入商品分类" ></input>
                    <text  text="单一直播间引流时间设置 最长时间(以分钟为单位)。举例 10分钟 输入数字 10"></text>
                    <input id="in_onelivetime" inputType="number" hint="在此输入时间 （分钟）" ></input>
                    <text  text="直播间观看人数最小起,低于该数字直接跳过，切换下一直播间"></text>
                    <input id="in_livepersonmin" inputType="number" hint="在此输入人数"  text="50"></input>
                   
                </vertical>
                <vertical>
                    <text text="输入私信内容名称，输入多条话语。以 | 分割， 举例 引流话语1|引流话语2|引流 " textColor="black" textSize="16sp"/>
                    <input id="in_language" hint="在此输入引流语" ></input>
                </vertical>
                <frame>
                    <text text="第三页内容" textColor="green" textSize="16sp"/>
                </frame>
            </viewpager>
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
    // menu.add("设置");
    // menu.add("主页");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "设置":
            toast("还没有设置");
            break;
         case "主页":
            aroutergourl("\/script\/usermain") 
            break;
        case "关于":
            alert("关于", "抖音引流v1.0.0");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["引流配置", "引流术语", "暂定"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([
  {
      title: "选项一",
      icon: "@drawable/ic_android_black_48dp"
  },
  {
      title: "选项二",
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


