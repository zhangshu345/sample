try { auto(); } catch (err) { toast("请开启Autojs无障碍"); exit() };
threads.start(function() {
    events.observeKey();
    events.on("key_down", function(keyCode, events) {
        if (keyCode == keys.volume_up) {
            toast("音量上键被按下，脚本已停止");
            exit();
        };
    });

});;

var h = confirm("确定要进入息屏挂机模式吗？可按下音量上键停止辅助。并不能锁定屏幕！！！通知栏会正常显示（oled屏可用)");
if(h){
var w = floaty.rawWindow(
    <frame gravity="center" bg="#000000"/>
);

w.setSize(-1, -1);
w.setTouchable(true);
//保持脚本运行
setInterval(()=>{}, 1000);
}