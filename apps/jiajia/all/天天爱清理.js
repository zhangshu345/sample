const package = 'com.xiaoqiao.qclean'; 
var appname = app.getAppName(package) || '天天爱清理';
var classModule = {};
classModule.minMinutes = 15;
classModule.maxMinutes = 25;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.func = null;
classModule.autoR = 0;	//默认自动提现
var keys = '下载|点击重播|点击下载|点击打开|恭喜获得.*';

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
        var o = func.execApp(appname, package);
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }

    func.openWaiting();

    if (this.autoUpdate == 1) {  //启用了自动更新
        var o = id(package + ':id/btn_upgrade').visibleToUser().findOnce();  //需要更新
        if (o) {
            thread.interrupt();
            this.func.clickObject(o);
            this.func.sleep(2000);
            var r = this.func.setup();
            if (r == 2) {    //更新完成，需要自己重启
                this.func.restart(appname, package);
            }
            else if (r == 1) {
                o = textMatches('推荐|任务').visibleToUser().findOne(20000);    //如果点了打开，等待加载完成
            }
            else {
                this.func.sleep(60000, '更新没有成功，倒计时完成退出本次任务')
                return;
            }
            thread = threads.start(hasDialog);
        }
    }
    // autoRedraw();
    sign();
    // redbox()
    var x = device.width / 2;
    var y = device.height / 2;
    try {
        var idx = 1;
        var bol = true;
        var trs = 0;
        num = 0
        while (bol) {

            if (num == 0) {
                o = textMatches('首页').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                }
                sleep(1000)
                o = textMatches('视频').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                }
            }
            num += 1
            if (num >= 10) {
                num = 0
            }

            func.checkSpace();  //检测一次存储空间
            if (!id(package + ':id/imv_head_community_new').visibleToUser().exists()) { //没有关注，重启刷宝
                o = packageName(package).text('视频').visibleToUser().findOnce();
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
                        trs++;
                        func.back();    //尝试一次返回
                        func.sleep(2000);
                    }
                }
            }
            else {
                trs = 0;
            }

            idx++;
            var sec = random(me.minVideoSec, me.maxVideoSec);
            func.sleep(sec * 1000, '视频播放中', "textMatches(' *看视频再领.*').visibleToUser().findOnce()");

            if (text('广告').visibleToUser().exists() || desc('广告').visibleToUser().exists()) {
                swipe(random(x - 100, x - 50), random(y + 300, y + 400), random(x - 100, x - 50), random(y - 300, y - 400), 10);
                this.func.sleep(2000)
            }
            if (classModule.noAd != 1) {
                o = packageName(package).textMatches(' *看视频再领.*').visibleToUser().findOnce() || packageName(package).descMatches(' *看视频再领.*').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    this.func.sleep(5000);
                    // func.sleep(60000, "看视频翻倍中", "textMatches('天天爱清理|首页|" + keys + "').visibleToUser().exists() || idMatches('.*close.*').visibleToUser().exists()");
                    func.sleep(60000, "看视频翻倍中", "idMatches('.*close.*').visibleToUser().exists()  || packageName('" + package + "').textMatches('天天爱清理|首页|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    
                    closeDialog();
                }
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

    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(1000);
    }
    if (packageName(package).idMatches('unsdk_play_global').visibleToUser().exists()) {
        func.back();
        func.sleep(2000);
    }

    // if (packageName(package).textMatches(keys).visibleToUser().exists() || packageName(package).descMatches(keys).visibleToUser().exists()) {
    //     o = textMatches('点击下载').visibleToUser().filter(function (w) { return w.bounds().bottom > device.height * 0.7; }).findOnce();
    //     if (!o) {
    //         func.back();
    //         func.sleep(2000);
    //     }
    // }

    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }

    
    var o = text('以后更新').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
    }

    var o = text('关闭广告').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
    }

    if (textMatches(keys).visibleToUser().exists() || descMatches(keys).visibleToUser().exists()) {
        func.back();
        func.sleep(1000);
    }

}

function autoRedraw() {
    var ii = 5;
    while (ii-- > 0 && !text('我的').visibleToUser().exists()) {
        func.back();
        func.sleep(2200);
    }
    var o = text('我的').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(3000);

        o = packageName(package).textMatches('提现|去提现').visibleToUser().findOne(6000) || packageName(package).descMatches('提现|去提现').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(3000);

            var money = 0;
            o = packageName(package).textMatches('[约|≈][0-9.]*元').visibleToUser().findOne(10000)
            if (o)
                money = Number(o.text().replace('约', '').replace('≈', '').replace('元', '')) || 0;
            else {
                o = packageName(package).descMatches('[约|≈][0-9.]*元').visibleToUser().findOnce();
                if (o) money = Number(o.desc().replace('约', '').replace('≈', '').replace('元', '')) || 0;
            }
            func.toast('金额:' + money, 1)
            if (money >= 0.3) {
                if (o) {
                    var btn = packageName(package).text('立即提现').visibleToUser().findOne(10000) || packageName(package).desc('立即提现').visibleToUser().findOnce();
                    var btns = packageName(package).textMatches('[0-9.]*元').visibleToUser().filter(function (w) {
                        var r = Number(w.text().replace('元', '')) || 0;
                        return r > 0 && r <= money;
                    }).find();
                    if (btns.length == 0)
                        btns = packageName(package).descMatches('[0-9.]*元').visibleToUser().filter(function (w) {
                            var r = Number(w.desc().replace('元', '')) || 0;
                            return r > 0 && r <= money;
                        }).find();
                    for (var i = btns.length - 1; i >= 0; i--) {
                        func.clickObject(btns[i]);
                        func.sleep(2000);

                        var btn = packageName(package).text('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();
                        if (btn) {
                            func.clickObject(btn)
                            func.sleep(3000);

                            o = text('我是上班族').visibleToUser().findOnce() || desc('我是上班族').visibleToUser().findOnce();
                            if (o) {
                                func.clickObject(o)
                                func.sleep(500);
                                o = textMatches('领取.*金币并提现').visibleToUser().findOnce() || descMatches('领取.*金币并提现').visibleToUser().findOnce();
                                if (o) {
                                    func.clickObject(o)
                                    func.sleep(4000);
                                }
                            }
                            else {
                                if (!text('立即提现').visibleToUser().exists() && !desc('立即提现').visibleToUser().exists()) {
                                    func.sleep(60000, '提现视频观看中', "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                                    closeDialog();
                                }
                            }
                        }
                    }
                }
            }
            else {
                func.toast('余额不足，不能提现', 1);
            }
        }
        else {
            func.toast('未进入到提现界面', 1);
        }
    }
}

function sign() {
    var dt = Date.now();
    closeDialog()
    closeDialog()
    try {
        var o = packageName(package).textMatches('赚钱|任务').visibleToUser().findOne(3000);
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('.*看视频.*|我的金币').visibleToUser().exists() || descMatches('.*看视频.*|我的金币').visibleToUser().exists()");
            sleep(3000)
            toast("任务一:签到")
            x = textMatches('看视频再送.*金币').visibleToUser().findOnce() || descMatches('看视频再送.*金币').visibleToUser().findOnce();
            if (x) {
                func.clickObject(x);
                sleep(5000)
                func.sleep(60000, "看视频翻倍中", "packageName('" + package + "').textMatches('我的金币|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists() || idMatches('" + package + ":id/.*close.*').visibleToUser().exists()");
                closeDialog();
                sleep(3000)
            }
            closeDialog()
            o = text('翻倍').visibleToUser().findOnce() || desc('翻倍').visibleToUser().findOnce() || id(package + ':id/tv_gold_double').visibleToUser().findOnce();  //金币翻倍按钮
            if (o) {
                func.clickObject(o);
                // press(o.bounds().centerX(), o.bounds().centerY(), 200)
                sleep(5000)
                func.sleep(60000, "金币翻倍中", "packageName('" + package + "').textMatches('我的金币|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists() || idMatches('" + package + ":id/.*close.*').visibleToUser().exists()");
                closeDialog();
                sleep(3000)
            }
            closeDialog()
            o = textMatches('再领.*金币').visibleToUser().findOnce() || descMatches('.*看视频.*').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                func.sleep(60000, "看视频翻倍中", "packageName('" + package + "').textMatches('我的金币|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists() || idMatches('" + package + ":id/.*close.*').visibleToUser().exists()");
                closeDialog();
                sleep(3000)
            }
            closeDialog()
            sleep(3000)
            toast("任务二:三次20金币")
            ii = 3;
            while (ii-- > 0) {
                o = textMatches('看视频领金币').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                    // func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').visibleToUser().exists()")
                    func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() ||  packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog()
                    sleep(5000)
                }
            }
            closeDialog()
            sleep(3000)


        }
        sleep(3000)
        toast("任务三:瓜分奖励")
        o = textMatches('连续3天未登录，账户金币会被瓜分哦！').visibleToUser().findOnce();
        if (o) {
            sleep(1000)
            click(device.width * 0.8, o.bounds().centerY() - 50)
            sleep(3000)
            p = textMatches('还有.*次机会').visibleToUser().findOnce();
            if (p) {
                var n = 7;
                while (n-- > 0) {
                    sleep(2000)
                    p = packageName(package).text('还有 0 次机会').visibleToUser().findOnce();
                    if (p) {
                        break
                    }
                    o = packageName(package).text('瓜分ta').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(60000, "瓜分金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || idMatches('" + package + ":id/unsdk_play_global').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                        closeDialog();
                        func.sleep(2000);
                    }
                    else {
                        break;
                    }
                    p = packageName(package).text('今日瓜分机会已用完').visibleToUser().findOnce();
                    if (p) {
                        break
                    }

                }
                func.back();
                func.sleep(2000);

            } else {
                back()
            }

        }
        var ii = 5;
        while (ii-- > 0 && !textMatches('我的').visibleToUser().exists()) {
            back()
            closeDialog()
            sleep(2500)
        }
        toast("任务四:大转盘")
        sleep(3000)
        o = textMatches('大转盘').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(3000)
            p = textMatches('幸运大转盘').visibleToUser().findOnce();
            if (p) {
                var n = 7;
                while (n-- > 0) {
                    sleep(2000)
                    p = packageName(package).text('还有 0 次机会').visibleToUser().findOnce();
                    if (p) {
                        break
                    }

                    o = packageName(package).textMatches('看视频再试一次').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(60000, "大转盘中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || idMatches('" + package + ":id/unsdk_play_global').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                        
                        closeDialog();
                        func.sleep(6000);
                    }

                    o = packageName(package).textMatches('看视频抽大奖').visibleToUser().findOnce();
                    if (o) {
                        p = packageName(package).textMatches('看视频再试一次').visibleToUser().findOnce();
                        if (!p) {
                            func.clickObject(o);
                            func.sleep(60000, "大转盘中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() ||idMatches('" + package + ":id/unsdk_play_global').visibleToUser().exists() || || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                            closeDialog();
                            func.sleep(6000);
                        }
                    }

                    p = packageName(package).text('免费抽千万金币大奖').visibleToUser().findOnce();
                    if (p) {
                        sleep(3000)
                        back()
                    }

                }
                func.back();
                func.sleep(2000);

            } else {
                back()
            }

        }

        toast("任务五:功勋奖堂")
        var ii = 5;
        while (ii-- > 0 && !textMatches('我的').visibleToUser().exists()) {
            closeDialog()
            sleep(2500)
            if (ii < 3) {
                back()
            }
        }
        var ii = 7;
        sleep(3000)
        while (ii-- > 0) {
            var o = packageName(package).textMatches('我的').visibleToUser().findOne(3000);
            if (o) {
                func.clickObject(o)
                func.sleep(10000, '等待中', "textMatches('我的钱包').visibleToUser().exists()");
                var o = packageName(package).textMatches('成就勋章').visibleToUser().findOne(3000);
                if (o) {
                    sleep(3000)
                    func.clickObject(o)
                    func.sleep(5000, '等待中', "textMatches('待领取|今日挑战').visibleToUser().exists() || descMatches('待领取').visibleToUser().exists()");
                    var o = packageName(package).textMatches('待领取').visibleToUser().findOnce();
                    if (o) {
                        var o = packageName(package).textMatches('.*金币').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o)
                            sleep(3000)
                            var p = packageName(package).textMatches('未获得奖励|分享赢奖励|我的钱包').visibleToUser().findOnce();
                            if (p) {
                                back()
                                back
                            } else {
                                func.sleep(60000, "勋章领取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists()|| packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                                closeDialog();
                                sleep(5000)
                                closeDialog();
                                sleep(3000)
                                back()
                            }
                        }
                    }
                } else {
                    break
                }
            }
        }
        sleep(2000)
        var ii = 5;
        while (ii-- > 0 && !textMatches('我的').visibleToUser().exists()) {
            closeDialog()
            sleep(2500)
            if (ii < 3) {
                back()
            }
        }

    }
    catch (e) {
        func.log(appname, '签到', e.message + '\n\r' + e.stack)
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
        if (packageName(package).textMatches('点击重播|点击下载|恭喜获得.*').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()) {
            func.back();
        }
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            if (classModule.noAd == 1 || !packageName(package).textMatches(' *看视频.*').visibleToUser().exists())
                func.clickObject(o);
        }

        o = textMatches('关闭|放弃兑换|以后更新|放弃奖励').visibleToUser().findOnce();
        if (o) {
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