//----------------------------------都呱呱极速版子程序--------------------------------------------//

function 抖呱呱极速版上滑() {
    var w = device.width;
    var h = device.height;
    swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
    // swipe(w/2,h/3*1,w/2,h/3*2,random(220, 235));
}



// exports.启动线程 = function () {
function 启动线程(type,sign) {
    log("进入抖呱呱子函数")
    // launchApp("抖呱呱极速版");
    // sleep(5000);
    while (true) {

        var c = random(8000, 12000)
        sleep(c)
        sleep(100)
        var 抖呱呱协议我知道了 = id("positive").exists();
        if (抖呱呱协议我知道了) {
            var 坐标 = id("positive").findOne();
            log(坐标.bounds())
            var 坐标 = 坐标.bounds()
            click(坐标.left + 5, 坐标.bottom - 2)
        }
        sleep(100)
        var 抖呱呱首页红包界面 = id("tv_submit").exists();
        if (抖呱呱首页红包界面) {
            back();
        }
        log("都呱呱开始上滑------------")
        抖呱呱极速版上滑();

    }

}

//----------------------------------都呱呱极速版子程序--------------------------------------------//
