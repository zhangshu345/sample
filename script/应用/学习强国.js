const xuexiqiangguohome = "android.widget.FrameLayout"
const xuexijifenhome = "com.alibaba.lightapp.runtime.activity.CommonWebViewActivity"
var packageName = currentPackage()
var packageName = currentPackage()
if (packageName != 'cn.xuexi.android') {
    launchApp("学习强国");
    toast("打开学习强国中");
    waitForPackage('cn.xuexi.android', 2000)
}

function run() {
    className('android.widget.TextView').fullId('cn.xuexi.android:id/comm_head_xuexi_score').depth(14).findOne().click()
    sleep(2000)
    className("android.widget.ListView").findOne().children().forEach(child => { var target = child.findOne(className("android.view.View").text("去看看")); target.click(); });
}


if (currentactivity == "android.widget.FrameLayout") {
    toast("回到学习强国主页");
    waitForActivity(xuexiqiangguohome, 3000)
}
else exit()
className('android.widget.ImageView').id("home_bottom_tab_icon_large").depth(15).enabled(true).findOne().click()
sleep(3000)
className('android.widget.LinearLayout').clickable(true).depth(16).drawingOrder(2).indexInParent(1).row(-1).rowSpan(-1).findOne().click()
className('android.widget.FrameLayout').clickable(true).depth(22).drawingOrder(2).indexInParent(1).row(1).rowSpan(1).findOne().click()


function slip() {
    let x1 = device.width / 2, y1 = device.height / 5;
    let x2 = device.width / 2, y2 = device.height * 3 / 5;
    swipe(x2, y2, x1, y1, 15000)
    back()
    sleep(2000)
}