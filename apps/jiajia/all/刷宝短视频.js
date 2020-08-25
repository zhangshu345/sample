const appname = '刷宝短视频';
const package = 'com.jm.video';

var classModule = {};
classModule.minMinutes = 30;
classModule.maxMinutes = 40;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.func = null;
classModule.autoR = 0;	//默认自动提现
keys = '点击重播|点击下载|点击打开'
classModule.start = function () {
    s_tt = new Date()
log(appname,'---开始---'  + s_tt.getHours() + ':' + s_tt.getMinutes() + ':' + s_tt.getSeconds());
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes, this.maxMinutes);   //生成运行时间
    func.log(appname, '启动，预计运行：' + minutes, "**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分', 2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package) {
        var o = func.execApp(appname, package, 15000, "text('首页').visibleToUser().exists()")
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }

    func.openWaiting(['.FrameLayout', '.AdsActivity']);
    //如果有签到，要在这里完成  刷宝的签到需要先看广告
    // autoRedraw()


    var x = device.width / 2;
    var y = device.height / 2;
    try {
        sign();
        var idx = 1;
        var bol = true;
        can_end = 30
        while (bol) {
            func.checkSpace();  //检测一次存储空间
            if (!id(package + ':id/share').visibleToUser().exists()) { //没有分享，重启刷宝
                o = packageName(package).text('首页').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                }
                else {
                    if (currentPackage().toLowerCase() != package.toLowerCase()) {
                        func.restart(appname, package)
                    }
                    else {
                        func.back();    //尝试一次返回
                        func.sleep(2000);
                    }
                }
            }
            if (can_end == 30) {
                toast("开始检测...")
                var ii = 5;
                while (!packageName(package).text('我').visibleToUser().exists() && ii-- > 0) {
                    func.back();
                    func.sleep(2300);
                }
                var o = packageName(package).text('我').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o)
                    func.sleep(10000, '等待中', "textMatches('我的视频').visibleToUser().exists() || descMatches('我的视频').visibleToUser().exists()");
                    var goldnum = id(package + ':id/tv_gold_num').visibleToUser().findOne(15000);
                    var money = id(package + ':id/tv_mine_money').visibleToUser().findOnce();
                    func.sleep(2000);
                    if (goldnum && money) {
                        if (goldnum.text() > 7300) {
                            toast("今日金币已到上限")
                            log("今日金币已到上限")
                            bol == false
                            break
                        }
                    }
                    o = packageName(package).text('首页').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                }
            }

            can_end -= 1
            if(can_end == 0){
                can_end = 30
            }
            idx++;
            var sec = random(me.minVideoSec, me.maxVideoSec);
            func.videoSleep(sec);
            swipe(random(x - 100, x - 50), random(y + 300, y + 400), random(x - 100, x - 50), random(y - 300, y - 400), 10);

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000) {
                bol = false;
                func.toast(appname + '运行完成', 2)
            }
            else {
                if (idx % 10 == 0)
                    func.toast(appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟', 2)
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

function autoRedraw() {
    var ii = 5;
    while (!packageName(package).text('我').visibleToUser().exists() && ii-- > 0) {
        func.back();
        func.sleep(2300);
    }

    var o = packageName(package).text('我').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o)
        func.sleep(10000, '等待中', "textMatches('我的视频').visibleToUser().exists() || descMatches('我的视频').visibleToUser().exists()");
        var goldnum = id(package + ':id/tv_gold_num').visibleToUser().findOne(15000);
        var money = id(package + ':id/tv_mine_money').visibleToUser().findOnce();
        func.sleep(2000);
        if (goldnum && money) {
            var mygoldnum = Number(goldnum.text()) || 0;
            var mymoney = Number(money.text()) || 0;
            // log("金币数", mygoldnum, '-----', '拥有的钱', mymoney)
            if (mygoldnum >= 6666 || mymoney >= 1) {
                func.clickObject(money);
                sleep(3000)
                func.sleep(10000, '等待中', "textMatches('立即提现').visibleToUser().exists() || descMatches('立即提现').visibleToUser().exists()");
                sleep(2000)
                o = packageName(package).text('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() < device.height / 2; }).findOnce() || packageName(package).desc('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() < device.height / 2; }).findOnce();
                // o = packageName(package).text('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() < device.height / 2; }).findOne(15000) || packageName(package).desc('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() < device.height / 2; }).findOne(15000);
                
                if (o) {
                    func.clickObject(o);
                    sleep(3000)
                    // toastLog("第一个提现  点击完成")
                    func.sleep(10000, '等待中', "textMatches('活动提现').visibleToUser().exists() || descMatches('活动提现').visibleToUser().exists()");
                    
                    // toastLog("等待第二个提现完成  点击完成")
                    // 开始操作提现
                    //  开始1元提现
                    sleep(2000)
                    var finds = packageName(package).className('android.view.View').depth(15).visibleToUser().find();
                    if(finds){
                        func.clickObject(finds[1])
                    }
                    if (mymoney >= 1) {
                        var o = packageName(package).text('¥1.00元').visibleToUser().findOne(10000) || packageName(package).desc('¥1.00元').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                            func.sleep(1000);
                            var btn = packageName(package).text('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() > device.height / 2; }).findOne(15000) || packageName(package).desc('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() > device.height / 2; }).findOnce();
                            func.clickObject(btn);
                            func.sleep(4000);
                            var agree = text('同意').visibleToUser().findOne(10000);
                            if (agree) {
                                func.clickObject(agree);
                                func.sleep(2000);
                            }
                            func.sleep(10000, '等待中', "textMatches('提现详情').visibleToUser().exists() || descMatches('提现详情').visibleToUser().exists()");
                            var zz = text('提现详情').visibleToUser().findOnce();
                            if (zz) {
                                func.back();
                                func.sleep(2000);
                            }
                        }
                    }
                    if (mygoldnum >= 6666) {
                        var finds = packageName(package).textMatches('¥0.*元').visibleToUser().find();
                        for(var kk = 0; kk < finds.length; kk++){
                            let child = finds[kk];
                            func.clickObject(child);
                            func.sleep(1000);
                            var btn = packageName(package).text('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() > device.height / 2; }).findOne(15000) || packageName(package).desc('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() > device.height / 2; }).findOnce();
                            func.clickObject(btn);
                            func.sleep(4000);
                            var agree = text('同意').visibleToUser().findOnce(10000);
                            if (agree) {
                                func.clickObject(agree);
                                func.sleep(2000);
                            }
                            func.sleep(10000, '等待中', "textMatches('提现详情').visibleToUser().exists() || descMatches('提现详情').visibleToUser().exists()");
                            var zz = text('提现详情').visibleToUser().findOnce();
                            if (zz) {
                                func.back();
                                func.sleep(2000);
                            }
                        }
                    }
                } else {
                    toast("提现条件不满足")
                }

            }
        }
    }
}

function sign() {
    o = packageName(package).desc('取消').visibleToUser().findOnce() || packageName(package).text('取消').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o)
        sleep(2000)
    }
    o = textMatches('任务').visibleToUser().findOnce() || descMatches('任务').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o)
        func.sleep(15000, '等待中', "textMatches('.*立即签到.*|继续赚元宝|我的元宝').visibleToUser().exists() || descMatches('.*立即签到.*|继续赚元宝|我的元宝').visibleToUser().exists()");
        func.sleep(2000);
        o = textMatches('.*继续赚元宝.*').visibleToUser().findOnce() || descMatches('.*继续赚元宝.*').visibleToUser().findOnce()
        if(!o){
            o = textMatches('.*立即签到.*').visibleToUser().findOnce() || descMatches('.*立即签到.*').visibleToUser().findOnce()
            if (o) {
                func.toast('点击签到', 1);
                ii = 3;
                while (ii-- > 0) {
                    o = textMatches('立即签到').visibleToUser().findOnce() || descMatches('立即签到').visibleToUser().findOnce()
                    if (o) {
                        func.clickObject(o)
                    } else {
                        break
                    }
                    func.sleep(3000);
                    o = textMatches('.*看视频签到.*').visibleToUser().findOnce() || descMatches('.*看视频签到.*').visibleToUser().findOnce()
                    if (o) {
                        func.clickObject(o);
                        func.sleep(2000);
                        func.sleep(60000, "看视频签到中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
    
                        hasDialog()
                        var o = id('iv_close').visibleToUser().findOnce()
                        if (o) {
                            func.clickObject(o);
                        }
                    }
                    sleep(3000)
                    o = textMatches('邀请好友最高可得.*').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(1000);
                        func.back();
                        func.sleep(1000);
                        break
                    }
                }
            }
            else {
                func.toast('未定位到签到按钮', 1);
            }
        }

    }

    //在这里返回首页
    o = packageName(package).text('首页').visibleToUser().findOne(10000);
    if (o){
        func.clickObject(o)
    }


}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        o = packageName(package).textMatches('我知道了|放弃奖励|继续看视频领取').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(1000);
        }
        
        

        var o = idMatches(package + ':id/(.*Close.*|.*close.*)').visibleToUser().findOnce() || textMatches('继续看视频领取').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
        }

        if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()) {
            // log(11111)
            func.back();
            func.sleep(1000);
        }

        o = textMatches('邀请好友可立即提现').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o.parent().child(0))
        }

        if (text('去邀请').visibleToUser().exists()) {
            sleep(1000)
            p = textMatches('我的钱包').visibleToUser().findOnce();
            if (!p) {
                func.back();
            }

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