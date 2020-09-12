"ui";
/**
 *Bilibili:MiBStudio
 **/

ui.layout(
    <vertical>
        <button id="l" w="*"> 强制横屏 </button>
        <button id="p" w="*"> 强制竖屏 </button>
        <button id="a" w="*"> 跟随手机方向 </button>
    </vertical>);

function orientation(integer) {
    if (ui == null) {
        return;
    }
    activity.setRequestedOrientation(integer);
}

ui.l.click(() => {
    orientation(0);
    toast("切换为横屏");
});

ui.p.click(() => {
    orientation(1);
    toast("切换为竖屏");
});

ui.a.click(() => {
    orientation(2);
    toast("对方向锁定无效");
});