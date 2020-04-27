var w = device.width;
var h = device.height;

function 弹窗() {
    if (id("lw").exists()) {
        sleep(1000)
        log("检测到lw")
        id("lw").findOne(1000).click()
        sleep(1000)
    }
    // if (id("mw").exists()) {
    //     sleep(1000)
    //     log("检测到mw")
    //     id("mw").findOne(1000).click()
    //     sleep(1000)
    // }
    if (id("button2").exists()) {
        sleep(1000)
        log("检测到button2")
        id("button2").findOne(1000).click()
        sleep(1000)
    }

    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()){
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }  
    }
}
function 上滑() {
    var w = device.width;
    var h = device.height;
    swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.5 + random(10, 30), random(220, 235))
    // swipe(w/2,h/3*1,w/2,h/3*2,random(220, 235));
}
function 检测广告视频() {
    sleep(3000)
    if (id("b").exists()) {
        sleep(30000)
        back()
        sleep(2000)
        弹窗()
    }
}
function 广告视频() {
    log("检测到广告视频观看")
    while (true) {
        // var c=className("android.view.View").textMatches(/(.*看视频领青豆.*)/).findOne(1000)
        var c = textContains("看视频领青豆").findOne(1000)
        if (c) {
            log("检测到待看广告")
            log(c.text())
            var num = c.text().replace(/[^0-9]/ig, "")
            log(num)
            var b = c.bounds()
            sleep(2000)
            弹窗()
            click(b.centerX(), b.centerY())
            //跳转存在失败的情况，在调用back的时候，为保证安全，可对当前页面进行判断是否在跳转页
            检测广告视频()

        }
        else {
            break
        }
    }
}
function 签到() {
    log("进入签到")
    //有可能找不到签到按钮，即找不到a5a，此种情况在不同手机都可能遇到
    //同一个APP的id可能发生变化
    // var c =text("领现金").findOne(1000)
    var c = id("a7d").findOne(1000)
    if (c) {
        log("找到签到页")
        var b = c.bounds()
        sleep(1000)
        弹窗()
        click(b.centerX(), b.centerY())
        sleep(5000)
        // c=className("android.view.View").text("签到").findOne(1000)
        c = text("签到领现金").findOne(1000)
        if (c) {
            log("开始签到")
            b = c.bounds()
            sleep(1000)
            弹窗()
            click((b.left + b.right) / 2, b.top + (b.bottom - b.top) / 2)
            sleep(1000)
            back()
        }
        sleep(5000)
        // 广告视频()
        log("签到返回")
        back()
    }
    log("没有找到签到进入按钮")




    // swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.5 + random(10, 30), random(220, 235))
    // swipe(w/2,h/3*1,w/2,h/3*2,random(220, 235));
}
//----------------------------------中青看点视频子线程--------------------------------------------//
function 视频() {

    id("a9f").findOne(1000).click()
    while (true) {
        log('检测')
        sleep(1000)
        var uc = className("android.widget.FrameLayout").find();
        for (var i = 0; i < uc.length; i++) {
            var b = uc[i].bounds()
            if ((b.bottom - b.top) > 0.26 * h && (b.bottom - b.top) < 0.3 * h && (b.right - b.left) == w) {
                log('找到视频框')
                if (id("bv").boundsInside(b.left, b.top, b.right, b.bottom).exists()) {
                    continue
                }
                var bf = id("lo").boundsInside(b.left, b.top, b.right, b.bottom).findOne(1000)
                if (bf) {
                    click((b.left + b.right) / 2, b.top + (b.bottom - b.top) / 2)
                    sleep(60000)
                    back()
                    sleep(300)
                }
            }
        }

        上滑()
        sleep(3000)
    }
}
//----------------------------------中青看点文章详情--------------------------------------------//
function 文章详情() {
    var w = device.width;
    var h = device.height;
    var i = 0
    while (true) {
        if (i > 35) {
            back()
            break
        }
        //部分手机无法检测到该文本框：锤子
        if (text("查看全文，奖励更多").exists()) {
            // log("查看全文，奖励更多")
            var b = text("查看全文，奖励更多").findOne(1000).bounds()
            log(b)
            if (b.top < 0) {
                sleep(800)
                back()
                break
            }
            if (b.bottom > 0.9 * h) {
                sleep(800)
                back()
                break
            }
            sleep(800)
            log(b)
            弹窗()
            click((b.left + b.right) / 2, b.top + (b.bottom - b.top) / 2)
            弹窗()
            swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
            sleep(4000)
            i = i + 5
            continue
        }
        // log(w,h)
        if (id("om").boundsInside(0, device.height / 2, device.width + 15, device.height).exists()) {
            log(w, h)
            log("找到结束标志")
            log(id("om").findOne(1000).bounds())
            弹窗()
            swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
            sleep(3000)
            i = i + 3
            if (id("om").findOne(1000).bounds().top > h) {
                continue
            }
            back()
            break
        }
        // log("浏览文章")
        sleep(5000)
        i = i + 5
        弹窗()
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
    }
    log("文章详情查看完毕")
}
//----------------------------------中青看点文章--------------------------------------------//
function 文章() {
    sleep(800)
    var w = device.width;
    var h = device.height;
    //有可能找不到该id控件，引发错误：无法调用null的方法"click"
    // id("a5h").findOne(1000).click()
    while (true) {
        log('检测文章列表')
        sleep(1000)
        //id名称会发生变化
        var uc = id("t_").find();
        for (var i = 0; i < uc.length; i++) {
            log("进入文章列表")
            var b = uc[i].bounds()
            if (id("cn").boundsInside(b.left, b.top, b.right, b.bottom).exists()) {
                log("找到广告")
                continue
            }
            // log(b.left,b.top,b.right,b.bottom)
            if (uc[i].clickable && (b.right - b.left) == w && (b.bottom - b.top) > 0.1 * h && (b.bottom - b.top) < 0.4 * h) {
                sleep(1000)
                // uc[i].click()
                弹窗()
                click(b.centerX(), b.centerY())
                文章详情()
            }

            sleep(800)
        }
        弹窗()
        上滑()
        sleep(3000)
    }
}
//初始化APP首页页面，保障APP位于首页
function appinit() {
    waitForActivity("com.weishang.wxrd.activity.HomeActivity")   
    sleep(1000)
    back()
    sleep(1000)
    弹窗()
    sleep(1000)
}
//我的金币
function 我的金币() {
    sleep(1000)
    //通过任务按钮找到我的按钮
    var c = id("a68").findOne(1000)
    if (c) {
        var b = c.bounds()
        sleep(500)
        //进入我的界面
        click(b.centerX()+0.2*w, b.centerY())
        var coin = id("a9w").findOne(1000)
        if (coin) {
            var num = coin.text()
            log("检测到今日金币")
            log(num)
            sleep(500)
        }
        sleep(500)
        back()
        sleep(1000)
    }
}
//----------------------------------中青看点子线程--------------------------------------------//
function 启动线程(type, sign) {
    // exports.启动线程=function (type,sign){
    var istype = type || 1;
    var issign = sign || 0;
    log("进入到中青看点")
    appinit()
    if (issign == 1) {
        log("进行签到操作")
        签到()
    }
    sleep(500)
    if (istype == 1) {
        log("开始进行文章阅读")
        文章()
    }
    if (istype == 2) {
        视频()
    }
}