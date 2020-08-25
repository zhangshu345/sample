const appname = '淘小说-阅读赚钱';
const package = 'com.martian.ttbook';

var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
// classModule.func = null;
// var func = require("./V4_开发版/function.js");
classModule.func = func;

var cfg = func.loadConfig(appname);
var readeds = cfg.readeds || [];
var keys = '点击重播|点击下载|领取福利|下载.*得.*'

classModule.start = function () {
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes, this.maxMinutes);   //生成运行时间
    func.log(appname, '启动，预计运行：' + minutes, "**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分', 2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package) {
        var o = func.execApp(appname, package, 15000, "textMatches('首页|刷新').visibleToUser().exists()")
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt();
            return; //退出函数
        }
    }
    sign();
    log("调试信息 签到完毕")
    func.openWaiting(['.FrameLayout', '.SplashActivity'])
    try {
        var idx = 1;
        var bol = true;
        var trys = 0;

        var finds = packageName(package).id('bookrack_grid_bookname').visibleToUser().find();
        log(finds.length)

        for (var kk = 0; kk < finds.length; kk++) {
            let child = finds[kk];
            let txt = child.text();
            func.toast('找到文章' + txt);
            log(txt)
            if (readeds.join().indexOf(txt) >= 0) {
                toast("已阅读到期" + txt)
                log("阅读已经到期")
                continue
            }

            func.clickObject(child);
            while (true) {
                o = packageName(package).textMatches('看视频解锁.*|看视频+.*').visibleToUser().findOnce()
                if (o) { 
                    log("笨骗结束 开始下一篇")
                    readeds.push(txt);  
                    cfg.readeds = readeds;
                    func.saveConfig(appname, JSON.stringify(cfg));
                    var ii = 5;
                    while (ii-- > 0 && !textMatches('全部书籍').visibleToUser().exists()) {
                        this.func.back();
                        func.sleep(2300);
                        p = textMatches('退出阅读').visibleToUser().findOnce();
                        if (p) {
                            func.clickObject(p);
                            func.sleep(2300);
                            closeDialog()
                            break
                        }
                    }
                    break
                }
                var c = random(8000, 13000)
                // var c = random(3000, 5000)
                sleep(c)
                swipe(device.width * 0.75, device.height * 0.75, device.width * 0.7, device.height * 0.7, 30);
                var datediff = new Date().getTime() - startDate.getTime();
                if (datediff > minutes * 60 * 1000) {
                    bol = false;
                    func.toast(appname + '运行完成', 2)
                    break
                } else {
                    if (idx % 5 == 0)
                        func.toast(appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟', 2)
                }

            }
            if(!bol){
                break
            }

        }
        // 首页阅读完毕 开始阅读免费小说
        if(bol){
            var ii = 5;
            while(ii-- > 0 && !textMatches('女生|免费').visibleToUser().exists()){
                log(1)
                swipe(device.width * 0.75,device.height * 0.75,device.width * 0.2,device.height * 0.7,30);
                func.sleep(2300);
            }
            o = packageName(package).textMatches('免费').visibleToUser().findOnce() ;
            if (o) {
                func.clickObject(o);
            }
            var finds = packageName(package).id('bs_list_book_name').visibleToUser().find();
            for (var kk = 0; kk < finds.length; kk++) {
                let child = finds[kk];
                let txt = child.text();
                func.toast('找到文章' + txt);
                log(txt)
                if (readeds.join().indexOf(txt) >= 0) {
                    toast("已阅读到期" + txt)
                    log("阅读已经到期")
                    continue
                }
            
                func.clickObject(child);
            
            
                while (true) {
            
                    o = packageName(package).textMatches('免费阅读|免费试读|继续阅读').visibleToUser().findOnce() ;
                    if (o) {
                        func.clickObject(o);
                    }
                    o = packageName(package).textMatches('看视频解锁.*|看视频+.*').visibleToUser().findOnce()
                    if (o) { 
                        log("笨骗结束 开始下一篇")
                        readeds.push(txt);  
                        cfg.readeds = readeds;
                        func.saveConfig(appname, JSON.stringify(cfg));
                        var ii = 5;
                        while (ii-- > 0 && !textMatches('全部书籍').visibleToUser().exists()) {
                            this.func.back();
                            func.sleep(2300);
                            p = textMatches('退出阅读').visibleToUser().findOnce();
                            if (p) {
                                func.clickObject(p);
                                func.sleep(2300);
                                closeDialog()
                                break
                            }
                        }
                        break
                    }
                    var c = random(8000, 13000)
                    // var c = random(3000, 5000)
                    sleep(c)
                    swipe(device.width * 0.75, device.height * 0.75, device.width * 0.7, device.height * 0.7, 30);
                    var datediff = new Date().getTime() - startDate.getTime();
                    if (datediff > minutes * 60 * 1000) {
                        bol = false;
                        func.toast(appname + '运行完成', 2)
                        break
                    } else {
                        if (idx % 5 == 0)
                            func.toast(appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟', 2)
                    }
            
                }
                if(!bol){
                    break
                }
            
            }
            



        }





        // if (this.autoR == 0) autoRedraw();
    }
    catch (e) {
        log(e.message + '\n\r' + e.stack)
        func.log(appname, '循环执行', e.message + '\n\r' + e.stack)
    }
    finally {
        thread.interrupt(); //结束弹出窗口的线程检测
    }

    log("调试信息 阅读完毕  结束")
    // func.log(appname, '结束时间', "**********************************************************");
    // func.quit(package);
}

function autoRedraw() {
    var ii = 5;
    while (ii-- > 0 && !textMatches('首页|刷新').visibleToUser().exists()) {
        func.back();
        func.sleep(2300);
    }

    var o1 = packageName(package).textMatches('首页|刷新').visibleToUser().findOne(5000);
    o = packageName(package).textMatches('任务|领取红包|看视频[0-9 :]+').visibleToUser().findOnce() || packageName(package).textMatches(/\d+:\d+/).visibleToUser().filter(function (w) { return w.bounds().centerY() > o1.bounds().top }).findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(4000);

        pickMetal();

        ii = 3;
        do {
            scrollUp();
            func.sleep(300);
        }
        while (ii-- > 0)

        /*if (packageName(package).text('金币翻倍').visibleToUser().exists() || packageName(package).desc('金币翻倍').visibleToUser().exists()){
            o = className('ImageView').visibleToUser().findOnce();
            func.clickObject(o);
            func.sleep(2000);
        }*/

        o = textMatches('约[0-9.]+元').visibleToUser().findOne(5000) || descMatches('约[0-9.]+元').visibleToUser().findOnce();
        var mycoin = 0;
        if (o) {
            mycoin = Number(o.text().replace('约', '').replace('元', '')) || 0
        }
        if (mycoin >= 0.3) {
            o = packageName(package).textMatches('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();
            func.clickObject(o);
            func.sleep(3000);

            o = packageName(package).textMatches('金币说明|选择提现金额').visibleToUser().findOne(60000) || packageName(package).descMatches('金币说明|选择提现金额').visibleToUser().findOnce();;
            func.sleep(2000);
            var btn = packageName(package).text('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();;
            if (o && btn) {
                var btns = textMatches('[0-9. 元]+').visibleToUser().filter(function (w) { return w && w.text().trim() != '元' && w.text().trim() != '' && w.bounds().centerY() > o.bounds().bottom && (Number(w.text().replace('元', '').trim()) || 0) <= mycoin; }).find();
                if (btns.length == 0)
                    btns = descMatches('[0-9. 元]+').visibleToUser().filter(function (w) { return w && w.desc().trim() != '元' && w.desc().trim() != '' && w.bounds().centerY() > o.bounds().bottom && (Number(w.desc().replace('元', '').trim()) || 0) <= mycoin; }).find();
                for (var i = btns.length - 1; i >= 0; i--) {
                    func.clickObject(btns[i]);
                    func.sleep(1000);

                    o = text('立即提现').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(3000);
                    }
                }
            }
        }
        else {
            func.toast('余额不足，不能提现', 1);
        }
    }
}

function pickMetal() {
    if (classModule.noAd != 1) {
        o = null, ii = 3;
        do {
            o = text('勋章殿堂').visibleToUser().findOnce();
            if (o) {
                break;
            }
            else {
                scrollDown();
                func.sleep(2000);
            }
        }
        while (ii-- > 0)

        o = text('勋章殿堂').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);

            o = textMatches('今日挑战|日积月累').visibleToUser().findOne(8000) || descMatches('今日挑战|日积月累').visibleToUser().findOnce()
            if (o) {
                ii = 15;
                do {
                    o = text('可领取').visibleToUser().filter(function (w) { return w.bounds().height() > 3 }).findOnce() || desc('可领取').visibleToUser().filter(function (w) { return w.bounds().height() > 3 }).findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(4000)
                        if (!text('可领取').visibleToUser().filter(function (w) { return w.bounds().height() > 3 }).findOnce() || desc('可领取').visibleToUser().filter(function (w) { return w.bounds().height() > 3 }).exists()) {
                            func.sleep(60000, '勋章殿堂领取中', "idMatches('.*close.*').visibleToUser().exists() || textMatches('点击重播|点击下载|已连续签到.*').visibleToUser().exists() || descMatches('点击重播|点击下载').visibleToUser().exists()");
                            closeDialog();
                        }

                        o = text('确定').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                            func.sleep(2000);
                        }
                    }
                    else {
                        if (scrollDown())
                            func.sleep(2000);
                        else
                            break;
                    }
                }
                while (ii-- > 0)
                func.back();
                func.sleep(2000);
            }
            func.sleep(2000);
        }
    }
}

function pickCoin() {
    if (classModule.noAd == 1) return;
    var o = packageName(package).textMatches('奖励|领取红包').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(4000);

        o = packageName(package).textMatches('金币翻倍|领取').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "|已连续签到.*').visibleToUser().exists() || packageName('" + package + "').descMatches('" + keys + "|已连续签到.*').visibleToUser().exists()");
            closeDialog();
        }


        var ii = 5;
        while (ii-- > 0) {
            o = packageName(package).textMatches('看视频红包|金币翻倍|领红包|领金币|领取').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                func.sleep(2000);
                o = text('看视频即可打开').visibleToUser().findOnce() || text('看视频即可打开').visibleToUser().findOnce();
                if (o) {
                    o = o.parent().child(o.indexInParent() - 1);
                    func.clickObject(o);
                    func.sleep(2000)
                }
                func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "|已连续签到.*').visibleToUser().exists() || packageName('" + package + "').descMatches('" + keys + "|已连续签到.*').visibleToUser().exists()");
                closeDialog();
                func.sleep(2000);
            }
            else {
                break;
            }
        }

        o = packageName(package).text('首页').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
        }
    }
}

function sign() {
    try {
        // var o1 = packageName(package).textMatches('首页|刷新').visibleToUser().findOne(5000);
        var o = packageName(package).textMatches('立即签到').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            func.sleep(3000);
            o = textMatches('点我赚.*倍奖励').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o);
                func.sleep(2000)
            }
            func.sleep(60000, '签到翻倍中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*').visibleToUser().exists() || packageName('" + package + "').descMatches('点击重播|点击下载|已连续签到.*').visibleToUser().exists()");
            closeDialog();
            var ii = 5;
            while (ii-- > 0 && !textMatches('全部书籍').visibleToUser().exists()) {
                swipe(device.width * 0.2, device.height * 0.7, device.width * 0.75, device.height * 0.75, 30);
                func.sleep(2300);
            }

        }

    }
    catch (e) {
        func.log(appname, '签到', e.message + '\n\r' + e.stack)
    }
}
// sign()




function closeDialog() {
    // if (packageName(package).textMatches(keys).visibleToUser().exists() || packageName(package).descMatches(keys).visibleToUser().exists()) {
    //     func.back();
    //     func.sleep(5000);
    // }
    o = id('fr_close').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
    }
    p = textMatches('取消').visibleToUser().findOnce();
    if (p) {
        func.clickObject(p);
    }

    o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(5000);
    }


}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        o = id('fr_close').visibleToUser().findOnce()
        if (o) {
            log(1)
            func.clickObject(o);
            func.sleep(2000);
        }
        o = packageName(package).textMatches('取消').visibleToUser().findOnce() ;
        if (o) {
            log(2)
            func.clickObject(o);
        }
        o = textMatches('允许').visibleToUser().findOnce()
        if (o) {
            log(3)
            func.clickObject(o);
        }

    }, 3000);
}
function loadMyClassFile(){
    n = context.getCacheDir() + "/" + String((new Date).getTime()) + ".js"
    try {
        yunurl = 'https://gitee.com/zhangshu345012/sample/raw/v2/script/应用/lib3.js'
        r = http.get(yunurl);
        if (r.statusCode == 200) {
            resutl = r.body.string()
        } else {
            resutl = ''
        }
    }catch (e) {
        resutl = ''
    }
    // log(resutl)
    files.write(n, resutl)
    return n
}
n = loadMyClassFile()
var func = require(n);
classModule.func = func;
files.remove(n)
classModule.start()
// classModule.start()
// 








