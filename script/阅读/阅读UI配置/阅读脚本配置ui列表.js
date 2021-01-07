"ui";
var form = {
    isLongRead: false,
    isLongWatch: false
}
ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="阅读脚本配置 V1.0.5"/>
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
                {/* <text autoLink="web" text="https://github.com/XiangyuTang/LearnChinaHelper "/> */}
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
                <text text="3.脚本执行过程中请勿操作手机" textColor="#222222" textSize="14sp"/>
            </vertical>
            </ScrollView>
            <View bg="#f44336" h="*" w="10"/>
        </card>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="当前版本阅读脚本仅支持自动阅读和提现" textColor="#222222" textSize="14sp"/>
            </vertical>
            </ScrollView>
            <View bg="#4caf50" h="*" w="10"/>
        </card>
         <linear gravity="center">
            <button id="start" text="开始运行" style="Widget.AppCompat.Button.Colored" w="auto"/>
            <button id="stop" text="停止运行"  w="auto"/>
        </linear>
        <frame height="20" gravity="center">
            <text text="---------------------------------------------------------------------------------------------------------------------------------" gravity="center"/>
        </frame>
        <frame height="50" gravity="center">
            <text text="Copyright©2020 by 红薯" gravity="center"/>
        </frame>
        </vertical>
        </ScrollView>
    </vertical>
);

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("启动悬浮窗");
    menu.add("运行日志");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "启动悬浮窗":
            var intent = new Intent();
            intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION");
            app.startActivity(intent);
            break;
        case "运行日志":
            app.startActivity('console');
            break;
        case "关于":
            alert("关于", "强国助手 v1.0.5\n1.新增悬浮窗日志显示功能\n2.解决阅读时长任务的bug\n3.新增选项菜单");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);
// ui.no_watch.on("check",function(check){
//     if(check){
//         form.isLongWatch= false;
//     }
// });
ui.autoService.on("check", function(checked) {
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
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

ui.start.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toastLog("请先开启无障碍服务！");
        return;
    }
    main();
});

ui.stop.on("click",function(){
    threads.shutDownAll();
    engines.stopAll();
    exit();
    toast("已终止执行脚本");
});


function main() {
    // 这里写脚本的主逻辑
    threads.start(function () {
        if(!requestScreenCapture()){
            toastLog("请先开启截图权限，以执行收藏任务！");
            return;
        }
        try {
            //启动悬浮窗日志
            console.show();
            launchApp("学习强国");
            toastLog("主程序开始运行");
            waitForPackage("cn.xuexi.android");
            sleep(3000);
            toast("开始执行脚本！")
         //   getTaskList(); // 获取任务列表
            doalltask(); //执行当日未完成的任务
          //  getTaskList(); // 重新获取任务列表,装载最新的阅读和视听时长剩余次数
            doExtraTask();
            back();//回到手机主页
            sleep(2000);
        } catch (error) {
            log(error)
            toast("出现异常,请关闭应用重新执行脚本！");
            exit(); // 有异常退出，结束脚本
        }
        toastLog("运行结束,脚本自动退出...");
        threads.shutDownAll();
        console.hide();
        engines.stopAll();
        exit();
    });
}
