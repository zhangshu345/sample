auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
const package = 'com.love.walk.qsport';
var appname = app.getAppName(package) || '爱走路';
var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.func = null;
classModule.autoR = 0;	//默认自动提现
var keys = '下载|点击重播|点击下载|点击打开|关闭';
classModule.start = function () {
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes, this.maxMinutes);   //生成运行时间
    func.log(appname, '启动，预计运行：' + minutes, "**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分', 2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package) {
        var o = func.execApp(appname, package);
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }

    func.openWaiting();


    var x = device.width / 2;
    var y = device.height / 2;
    try {
        sign()
        var idx = 1;
        var bol = true;
        var trs = 0;
        num = 0
        while (bol) {

            if (num == 0) {
                o = textMatches('爱视频').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                }
                sleep(1000)
            }
            num += 1
            if (num >= 10) {
                num = 0
            }

            func.checkSpace();  //检测一次存储空间
            if (!id(package + ':id/imv_head_community_new').visibleToUser().exists()) { //没有关注，重启刷宝
                o = packageName(package).text('爱视频').visibleToUser().findOnce();
                if (o) {
                    trs = 0;
                    func.clickObject(o);
                    this.func.sleep(2000);
                }
                else {
                    if (trs >= 5 || currentPackage().toLowerCase() != package.toLowerCase()) {
                        func.restart(appname, package)
                    }
                    else {
                        refresh()
                        o = textMatches('爱视频').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                        }
                    }
                }
            }
            else {
                trs = 0;
            }

            idx++;
            var sec = random(me.minVideoSec, me.maxVideoSec);
            func.sleep(sec * 1000, '视频播放中', "textMatches(' *看视频再领.*').visibleToUser().findOnce()");

            o = textMatches('看视频再.*金币').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o);
                func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                sleep(3000)
                closeDialog();
            }

            swipe(random(x - 100, x - 50), random(y + 300, y + 400), random(x - 100, x - 50), random(y - 300, y - 400), 10);
            this.func.sleep(1000);

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000) {
                bol = false;
                func.toast('' + appname + '运行完成', 2)
            }
            else {
                if (idx % 10 == 0)
                    func.toast('' + appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟', 2)
            }
        }
        if (this.autoR == 0) autoRedraw();
    }
    catch (e) {
        func.log(appname, '循环执行', e.message + '\n\r' + e.stack);
    }
    finally {
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname, '结束时间', "**********************************************************");
    func.quit(package);
}

function closeDialog() {

    var o = text('关闭广告|我知道了|关闭').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
    }

    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(1000);
    }


    if (packageName(package).textMatches(keys).filter(function (w) { if (w.text() == '点击下载' && w.bounds().bottom > device.height * 0.8) { return false } else { return true } }).visibleToUser().exists()) {
        func.back();
        func.sleep(3000);
    }





}

function autoRedraw() {
    toast("开始提现")
    refresh()
    var o = packageName(package).textMatches('我的').visibleToUser().findOne(3000);
    if (o) {
        func.clickObject(o)
        func.sleep(10000, '等待中', "textMatches('我的勋章|提现').visibleToUser().exists() || descMatches('我的勋章|提现').visibleToUser().exists()");
        sleep(3000)
        have_moey_bs = id('tv_person_money').findOnce()
        if (have_moey_bs) {
            have_moey = have_moey_bs.text()
            log(have_moey)
            if (have_moey < 0.3) {
                toast("余额不足")
            } else {
                var o = textMatches('提现').visibleToUser().findOnce() || descMatches('提现').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o)
                    func.sleep(10000, '等待中', "textMatches('立即提现').visibleToUser().exists() || descMatches('立即提现').visibleToUser().exists()");
                    sleep(3000)
    
    
                    if (have_moey >= 5) {
                        have_moey = "5元"
                    } else if (have_moey >= 1) {
                        have_moey = "5元"
                    } else if (have_moey >= 0.3) {
                        have_moey = "0.3元"
                    }
                    
                    if (money_num) {
                    
                        var o = textMatches(have_moey).visibleToUser().findOnce() || descMatches(have_moey).visibleToUser().findOnce()
                        if (o) {
                            func.clickObject(o)
                            sleep(2000)
                            var o = textMatches('立即提现').visibleToUser().findOnce() || descMatches('立即提现').visibleToUser().findOnce()
                            if (o) {
                                func.clickObject(o)
                                func.sleep(10000, '等待中', "textMatches('立即提取').visibleToUser().exists() || descMatches('立即提取').visibleToUser().exists()");
                                sleep(2000)
                                x = textMatches('立即提取').visibleToUser().findOnce() || descMatches('立即提取').visibleToUser().findOnce();
                                if (x) {
                                    func.clickObject(x);
                                    func.sleep(60000, "提现视频观看中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                                    closeDialog()
                                    sleep(5000)
                                }
                            }
                        }
                    }
    
    
                }
            }
        }
    } else {
        toast("查询余额失败")
    }
}

function sign() {
    o = textMatches('看视频再.*金币').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        sleep(3000)
        closeDialog();
    }

    refresh()
    var o = packageName(package).textMatches('爱赚钱').visibleToUser().findOne(3000);
    if (o) {
        func.clickObject(o)
        func.sleep(10000, '等待中', "textMatches('已签到.*|我的金币').visibleToUser().exists() || descMatches('.*看视频.*|我的金币').visibleToUser().exists()");
        sleep(3000)
        toast("任务一:签到")
        x = textMatches('金币翻倍').visibleToUser().findOnce() || descMatches('金币翻倍').visibleToUser().findOnce();
        if (x) {
            func.clickObject(x);
            sleep(5000)
            func.sleep(60000, "签到金币翻倍中", "packageName('" + package + "').textMatches('我的金币|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists() || idMatches('" + package + ":id/.*close.*').visibleToUser().exists()");
            closeDialog();
            sleep(5000)
            closeDialog();
        }
        toast("任务二:阶段金币")
        ii = 5;
        while (ii-- > 0) {
            o = textMatches('可领取').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                func.sleep(2000);
                func.sleep(60000, "任务二领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
                sleep(5000)
            }
        }
    }
    refresh()
    var o = packageName(package).textMatches('爱走路').visibleToUser().findOne(3000);
    if (o) {
        func.clickObject(o)
        func.sleep(10000, '等待中', "textMatches('今日数据|赚钱攻略').visibleToUser().exists() || descMatches('今日数据|赚钱攻略').visibleToUser().exists()");

        sleep(3000)
        toast("任务三:走路金币")
        o = textMatches('领取金币').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            x = textMatches('.*看视频.*金币').visibleToUser().findOnce() || descMatches('.*看视频.*金币').visibleToUser().findOnce();
            if (x) {
                func.clickObject(x);
                func.sleep(60000, "任务三领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
                sleep(5000)
            }
        }
        closeDialog()
        toast("任务四:领取阶段奖励")
        o = textMatches('领取时段奖励').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            x = textMatches('金币翻倍').visibleToUser().findOnce() || descMatches('金币翻倍').visibleToUser().findOnce();
            if (x) {
                func.clickObject(x);
                func.sleep(60000, "任务四翻倍中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
                sleep(5000)
                closeDialog()
                sleep(2000)
            }
        }
    }
    // toast("任务五:勋章奖堂")
    // refresh()
    // var o = packageName(package).textMatches('我的').visibleToUser().findOne(3000);
    // if (o) {
    //     func.clickObject(o)
    //     func.sleep(10000, '等待中', "textMatches('我的勋章').visibleToUser().exists() || descMatches('我的勋章').visibleToUser().exists()");
    //     sleep(3000)
    //     toast("任务五:勋章") 
    // o = textMatches('我的勋章').visibleToUser().findOnce() || descMatches('我的勋章').visibleToUser().findOnce()
    // if (o) {
    //     func.clickObject(o)
    // }
    // }

}

function flvideo() {
    // 福利视频 不要 
    refresh()
    var o = packageName(package).textMatches('爱赚钱').visibleToUser().findOne(3000);
    if (o) {
        func.clickObject(o)
        func.sleep(10000, '等待中', "textMatches('已签到.*|我的金币').visibleToUser().exists() || descMatches('已签到.*|我的金币').visibleToUser().exists()");
        sleep(3000)
        var ii = 5;
        while (ii-- > 0 && !textMatches('看福利视频赚金币').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).exists()) {
            func.swipeUp()
            func.sleep(2300);
        }
        var o = packageName(package).textMatches('看福利视频赚金币').visibleToUser().findOnce();
        if (o) {
            var list = o.parent();
            for (var i = 0; i < list.childCount(); i++) {
                var child = list.child(i);
                // log(child.className());
                let txt = child.text();
                let idd = child.id();
                log(txt, '----', idd)
                if (txt == "去完成") {
                    func.clickObject(child);
                    sleep(5000)
                    func.sleep(60000, "签到金币翻倍中", "packageName('" + package + "').textMatches('我的金币|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists() || idMatches('" + package + ":id/.*close.*').visibleToUser().exists()");
                    closeDialog();
                    sleep(5000)
                    closeDialog();
                    break
                }

            }
        }
    }
    refresh()
    o = textMatches('爱视频').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
    }

}

function refresh() {
    var ii = 6;
    while (ii-- > 0 && !text('我的').visibleToUser().exists()) {
        closeDialog()
        if (ii < 4) {
            func.sleep(3200);
            func.back();
        }
    }
}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();

        if (packageName(package).idMatches('unsdk_play_global').visibleToUser().exists()) {
            func.back();
            func.sleep(2000);
        }
        if (packageName(package).textMatches('点击重播|点击下载|恭喜获得.*').filter(function (w) { if (w.text() == '点击下载' && w.bounds().bottom > device.height * 0.8) { return false } else { return true } }).visibleToUser().exists()) {
            func.back();
        }
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            if (!packageName(package).textMatches('*看视频.*').visibleToUser().exists()) {
                func.clickObject(o);
            }

        }

        o = textMatches('关闭|放弃兑换|以后更新|放弃奖励').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
        }
    }, 3000);
}
//添加可以独立运行
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
classModule.start();Scripts.INSTANCE.runnextScript()
