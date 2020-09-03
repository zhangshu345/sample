function showConfigdialog(){
    var form = {
        isLongRead: false,
        isLongWatch: false
    }
    var window = floaty.rawWindow(
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="强国助手 V1.0.1"/>
            </appbar>
            <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
            <ScrollView>
            <vertical>
            <frame height="40" gravity="center">
                <text text="*注意*" gravity="center" textSize="18sp" textColor="red" textStyle="bold"/>
            </frame>
            <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" gravity="center_vertical">
                <ScrollView>
                <vertical padding="18 8" h="auto">
                    <text text="项目说明文档: (请留意新版本的发布)" textColor="#222222" textSize="14sp"/>
                    <text autoLink="web" text="https://github.com/zhangshu345/LearnChinaHelper "/>
                </vertical>
                </ScrollView>
                <View bg="#f44336" h="*" w="10"/>
            </card>
            <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" gravity="center_vertical">
                <ScrollView>
                <vertical padding="18 8" h="auto">
                    <text text="1.首次安装请先开启无障碍服务和截图与允许通知权限" textColor="#222222" textSize="14sp"/>
                    <text text="2.若未开启通知权限,首次使用建议打开↗的悬浮窗权限" textColor="#222222" textSize="14sp"/>
                    <text text="3.开始运行前请先关闭学习强国,由脚本运行后自动启动" textColor="#222222" textSize="14sp"/>
                    <text text="4.脚本执行过程中请勿操作手机" textColor="#222222" textSize="14sp"/>
                </vertical>
                </ScrollView>
                <View bg="#f44336" h="*" w="10"/>
            </card>
            <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" gravity="center_vertical">
                <ScrollView>
                <vertical padding="18 8" h="auto">
                    <text text="当前版本强国助手支持的功能包括：(以下任务预计花费7分钟)" textColor="#222222" textSize="14sp"/>
                    <text text="阅读文章、视听学习、收藏、分享、订阅、评论、本地频道" textColor="#999999" textSize="14sp"/>
                </vertical>
                </ScrollView>
                <View bg="#4caf50" h="*" w="10"/>
            </card>
            <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" gravity="center_vertical">
                <ScrollView>
                <vertical padding="18 8" h="auto">
                    <text text="坚持把学习贯彻习近平总书记系列重要讲话精神作为重大政治任务，认真学习党的先进理论与指导思想，请勿利用本软件投机取巧." textColor="#222222"/>
                </vertical>
                </ScrollView>
                <View bg="#4caf50" h="*" w="10"/>
            </card>
            <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" gravity="center_vertical">
                <ScrollView>
                <vertical padding="18 8" h="auto">
                    <text text="是否执行文章学习时长任务：(预计最多花费12分钟)" textColor="#222222"/>
                    <radiogroup id="long_read">
                            <radio id="yes_read"  text="是"></radio>
                            <radio  id="no_read" text="否" checked = "true"></radio>
                    </radiogroup>
                </vertical>
                </ScrollView>
                <View bg="#2196f3" h="*" w="10"/>
            </card>
            <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" gravity="center_vertical">
                <ScrollView>
                <vertical padding="18 8" h="auto">
                    <text text="是否执行视听学习时长任务：(建议在wifi环境下执行，预计最多花费18分钟)" textColor="#222222"/>
                    <radiogroup id="long_watch">
                            <radio id="yes_watch"  text="是"></radio>
                            <radio id="no_watch" text="否" checked = "true"></radio>
                    </radiogroup>
                </vertical>
                </ScrollView>
                <View bg="#2196f3" h="*" w="10"/>
            </card>
            <linear gravity="center">
                <button id="start" text="开始运行" style="Widget.AppCompat.Button.Colored" w="auto"/>
                <button id="stop" text="停止运行"  w="auto"/>
            </linear>
            <frame height="20" gravity="center">
                <text text="---------------------------------------------------------------------------------------------------------------------------------" gravity="center"/>
            </frame>
            <frame height="50" gravity="center">
                <text text="Copyright©2020 by Txy 一岸流年1998" gravity="center"/>
            </frame>
            </vertical>
            </ScrollView>
        </vertical>
    );
    

    // //监听选项菜单点击
    // ui.emitter.on("options_item_selected", (e, item)=>{
    //     switch(item.getTitle()){
    //         case "启动悬浮窗":
    //             var intent = new Intent();
    //             intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION");
    //             app.startActivity(intent);
    //             break;
    //         case "运行日志":
    //             app.startActivity('console');
    //             break;
    //         case "关于":
    //             alert("关于", "强国助手 v1.0.5\n1.新增悬浮窗日志显示功能\n2.解决阅读时长任务的bug\n3.新增选项菜单");
    //             break;
    //     }
    //     e.consumed = true;
    // });
  
    window.yes_read.on("check",function(check){
        if(check){
            form.isLongRead= true;
        }
    });
    window.no_read.on("check",function(check){
        if(check){
            form.isLongRead= false;
        }
    });
    window.yes_watch.on("check",function(check){
        if(check){
            form.isLongWatch= true;
        }
    });
    window.no_watch.on("check",function(check){
        if(check){
            form.isLongWatch= false;
        }
    });
    window.autoService.on("check", function(checked) {
        // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
        if(checked && auto.service == null) {
            app.startActivity({
                action: "android.settings.ACCESSIBILITY_SETTINGS"
            });
        }
        if(!checked && auto.service != null){
            auto.service.disableSelf();
        }
    });
    
    // 当用户回到本界面时，resume事件会被触发
    window.emitter.on("resume", function() {
        // 此时根据无障碍服务的开启情况，同步开关的状态
        ui.autoService.checked = auto.service != null;
    });
    
    window.start.on("click", function(){
        //程序开始运行之前判断无障碍服务
        if(auto.service == null) {
            toastLog("请先开启无障碍服务！");
            return;
        }
        main();
    });
    
    window.stop.on("click",function(){
        threads.shutDownAll();
        engines.stopAll();
        exit();
        toast("已终止执行脚本");
    });

  }

  showConfigdialog()