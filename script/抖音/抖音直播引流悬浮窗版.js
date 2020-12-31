
function showui(){
    "ui";
    var color = "#009688";
    ui.layout(
        <drawer id="drawer">
            <vertical>
                <appbar>
                    <toolbar id="toolbar" title="抖音直播引流"/>
                    <tabs id="tabs"/>
                </appbar>
                <button id="bt_run" text="开始运行"/>
                <viewpager id="viewpager">
                    <vertical>
                        <button id="bt_save1" text="保存本页配置"></button>
                        <text text="输入搜索直播商品名称，输入多个名称时，以 - 分割。 举例 酒-白酒-红酒-葡萄酒" textColor="black" textSize="16sp"/>
                        <input id="in_spm" hint="在此输入商品分类" ></input>
                        <text  text="单一直播间引流时间设置 最长时间(以分钟为单位)。举例 10分钟 输入数字 10"></text>
                        <input id="in_onelivetime" inputType="number" hint="在此输入时间 （分钟）" ></input>
                        <text  text="直播间观看人数最小起,低于该数字直接跳过，切换下一直播间"></text>
                        <input id="in_livepersonmin" inputType="number" hint="在此输入人数"  text="50"></input>
                    </vertical>
                    <vertical>
                         <button id="bt_save2" text="保存本页配置"></button>
                        <text text="输入私信内容名称，输入多条话语。以 | 分割， 举例 引流话语1|引流话语2|引流 " textColor="black" textSize="16sp"/>
                        <input id="in_chatcontent" hint="在此输入引流语" ></input>
                    </vertical>
                    <vertical>
                        <webview id="web" w="*" h="*" margin="10 10 10 10" />
                    </vertical>
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
    ui.viewpager.setTitles(["引流配置", "引流术语", "教程"]);
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

    getSaveConfig()

    ui.in_spm.setText(商品内容)
    ui.in_chatcontent.setText(引流内容)
    ui.in_onelivetime.setText(""+onelivetime)
    ui.in_livepersonmin.setText(""+livepersonmin)
    ui.bt_run.on("click",function(v){
        run()
    })
    ui.web.loadUrl("https://hao.360.com/?src=lm&ls=n7303c05692")
    
    ui.bt_save1.on("click",function(v){
        //
        saveconfig1()
    })
    
    ui.bt_save2.on("click",function(v){
        //保存话术
        savehuashu()
    })

}





function saveconfig1(){
   let sp= ui.in_spm.text()
   storage.put("shangpincontent",sp)
//    let hs=ui.in_chatlanguage.text()
//    storage.put("yinliucontent",hs)
   let onetime=ui.in_onelivetime.text()||10
   storage.put("onelivetime", onetime)
   let personmin=ui.in_livepersonmin.text() || 50
  
   storage.put("livepersonmin",personmin)

}

//
function savehuashu(){
    let hs=ui.in_chatcontent.text()
    storage.put("yinliucontent",hs)
}

//获取保存的脚本
function getSaveConfig(){
    引流内容=storage.get("yinliucontent")
    if(引流内容){
       let 内容数组= 引流内容.split("|")
        if(内容数组){
            引流话语=[]
            内容数组.forEach(s=>{
                if(s.trim()){
                    引流话语.push(s.trim())
                }
            })
        }
    }else{
        引流内容="引流话语1|引流话语2|引流话语3"
        toastLog("引流话语为空")
    }
     商品内容=storage.get("shangpincontent")
    if(商品内容){
            let sps=商品内容.split("-")
            if(sps){
                商品名=[]
                sps.forEach(s=>{
                    if(s.trim()){
                        商品名.push(s.trim())
                    }
                })
            }
    }else{
        商品内容="商品1-商品2-商品3"
        toastLog("搜索商品为空") 
    }
    onetime=storage.get("onelivetime")
    if(onetime){
        onelivetime = parseInt(onetime);
    }else{
        onelivetime=10;
    }
    
    personmin = storage.get("livepersonmin")
    if(livepersonmin){
        livepersonmin = parseInt(personmin);
    }else{
        livepersonmin =50;
    }
        
}

//启动一个悬浮窗开始
function run(){
  

}
// ------------------------------------------------------

var storage = storages.create("hd_dyyl");
var 引流话语=[]
var 引流内容=""
var 商品内容=""
var 商品名=[]  // 
const dypkg="com.ss.android.ugc.aweme"
const dyhome="com.ss.android.ugc.aweme.main.MainActivity"
const dylive="com.ss.android.ugc.aweme.live.LivePlayActivity"
const dychat ="com.ss.android.ugc.aweme.im.sdk.chat.ChatRoomActivity" //  私信对话框页
var onelivetime=10
var livepersonmin= 50;  //直播间最小在线人数 才去引流
var searchword=false; // 代表精确查找输入的文字  false  表示 点击出现的推荐文字
var yinliutype=1;  //
getSaveConfig()


//---------------------------------------------------

 start()
// 直播间获取主播信息()
// 直播间私信()

