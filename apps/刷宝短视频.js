//刷宝的自动签到 看视频 视频页面点击 时段奖励
auto.waitFor()
auto.setMode("normal")

function 刷宝上滑() {
    var w = device.width;
    var h = device.height;
    if(root){
        Swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
   
    }else{
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
    }
}
   
function 弹窗(){
    sleep(50)
    var 刷宝红包关闭 = id("imgClose").exists();
    if (刷宝红包关闭) {
        log("红包按钮存在")
        var 坐标 = id("imgClose").findOne();
        log(坐标.bounds())
        var 坐标 = 坐标.bounds()
        if(root){
            Tap(坐标.left + 5, 坐标.bottom - 2)
        }else{
            click(坐标.left + 5, 坐标.bottom - 2)
        }
       
    }

}

app.launchApp("刷宝短视频")
log("进入刷宝子视频的函数")
var root=false
var ra 
if(device.sdkInt>=27){
    root=false
}else{
    root=true
    var sh = new Shell();
    sh.exec("am force-stop com.tencent.mm");
    sh.exit();
  //  ra = new RootAutomator();
}
log("进入刷宝子视频的函数1111")
while (true) {
    var c = random(10000, 15000)
    sleep(c)
    弹窗()
    log("刷宝开始上滑------------")
    刷宝上滑();
}