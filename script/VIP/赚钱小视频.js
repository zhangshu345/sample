
//----------------------------------赚钱小视频子程序--------------------------------------------//

function 点击赚钱小视频首页视频() {
    while (true) {

        log("确定进入主页----->")

        sleep(100)
        // 红包按钮
        var 按钮 = id("imagview_red_packet_close_first").exists();
        if (按钮) {
            var 坐标 = id("imagview_red_packet_close_first").findOne();
            var 坐标 = 坐标.bounds()
            log(坐标)
            log("坐标" + 坐标.centerX() + "," + 坐标.centerY())
            click(坐标.centerX(), 坐标.centerY());
        }

        while (true) {
            视频标题 = id("title_video_tx").exists();
            if (视频标题) {
                log("发现视频-------------->" + 视频标题)
                视频标题 = id("title_video_tx").findOne();
                坐标 = 视频标题.bounds()
                click(坐标.centerX(), 坐标.centerY())
                sleep(2000)
                视频标题 = id("menu_goback_img1").exists();
                if (视频标题) {
                    break
                }

            }
        }
        log("确认已经进来了")
        sleep(2000)


        播放按钮 = desc("Play Video Play Video").
            desc("Play Video Play Video").findOne().click();
        var num = 1
        while (true) {

            num += 1
            log("检测是否看完")
            sleep(10000)
            // 赚钱小视频子线程()
            重播 = desc("Play Video Play Video").exists();
            log("重播----->", 重播)
            if (重播) {
                log("全部看完")
                break
            }
            if (num > 50) {
                back();
                赚钱小视频上滑()
                sleep(5000)
                break
            }
        }
        log("开始推出")
        while (true) {
            back();
            sleep(2000)
            var 按钮 = id("title_video_tx").exists();
            if (按钮) {
                break
            }
            sleep(10000)
        }
        log("确定退到主页")

        var w = device.width;
        var h = device.height;
        swipe(w * 0.6, h * 0.3, w * 0.6, h * 0.6, random(220, 235))
        sleep(2000)
        log("刷新完成")

    }




}
exports.赚钱小视频子线程 = function () {

    点击赚钱小视频首页视频()

}


//----------------------------------赚钱小视频子程序--------------------------------------------//