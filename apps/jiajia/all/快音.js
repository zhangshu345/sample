auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
const appname = '快音';
const package = 'com.kuaiyin.player';
var classModule = {};
classModule.func = null;
classModule.minMinutes = 18;
classModule.maxMinutes = 25;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
var keys = '点击重播|点击下载|点击打开';


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
        var o = func.execApp(appname, package, 15000, "textMatches('推荐|福利').visibleToUser().exists()")
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt(); //结束弹出窗口的线程检测
            minutes = 0;
            return; //退出函数
        }
    }

    //签到，点击红包即可
    //在这里读取配置文件
    func.openWaiting(['.LauncherActivity', '.SplashActivity']);

    var x = device.width / 2;
    var y = device.height / 2;
    try {
        sign2()
        var idx = 0;
        var bol = true;
        while (bol) {
            func.checkSpace();  //检测一次存储空间
            if (!textMatches('打赏|分享').visibleToUser().exists()) {
                o = packageName(package).text('视频').visibleToUser().findOnce();
                if (o) {
                    this.func.clickObject(o);
                    this.func.sleep(2000);
                }
                else {
                    o = packageName(package).text('主页').visibleToUser().findOnce()
                    if (o) {
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                    else {
                        if (currentPackage().toLowerCase() != package.toLowerCase()) {
                            func.restart(appname, package)
                        }
                        else {
                            this.func.back();
                            this.func.sleep(2300);
                        }
                    }
                }
            }

            idx++;
            var sec = random(me.minVideoSec, me.maxVideoSec);
            func.videoSleep(sec);
            //swipe(random(x - 100,x - 50),random(y + 300,y + 400), random(x - 100,x - 50), random(y - 300,y - 400),10)
            this.func.swipeUp(0, 0, random(301, 330));
            func.sleep(500);

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000) {
                bol = false;
                func.toast(appname + '运行完成', 2)
            }
            else {
                if (idx % 5 == 0)
                    func.toast(appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟', 2)
            }
        }
        sign2()
        if (this.autoR == 0) autoRedraw();
    }
    catch (e) {
        log(e.message + e.stack)
        func.log(appname, '循环执行', e.message + '\n\r' + e.stack)
    }
    finally {
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname, '结束时间', "**********************************************************");
    func.quit(package);
}

function autoRedraw() {
    var ii = 5;
    while (!packageName(package).text('福利').visibleToUser().exists() && ii-- > 0) {
        func.back();
        func.sleep(2200);
    }

    var o = packageName(package).text('福利').visibleToUser().findOne(5000)
    if (o) {
        func.clickObject(o);
        func.sleep(4000);
        closeDialog();
        closeDialog();
        closeDialog();

        // func.swipe(device.width / 2,100,device.width / 2,device.height / 2,10);
        // func.sleep(2000);

        o = packageName(package).textMatches('.*元.*提现').visibleToUser().findOnce();
        if (!o)
            o = packageName(package).descMatches('.*元.*提现').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);

            var btn = packageName(package).text('去提现').visibleToUser().findOne(10000);
            if (!btn)
                btn = packageName(package).desc('去提现').visibleToUser().findOnce()

            o = packageName(package).textMatches('[0-9.]+').visibleToUser().findOnce()
            if (!o)
                o = packageName(package).descMatches('[0-9.]+').visibleToUser().findOnce()
            if (o) {
                var money = Number(o.text()) || 0;
                func.toast('金额：' + String(money));
                if (money >= 0.3) {
                    func.swipeUp();
                    func.sleep(2000);

                    var btns = textMatches('¥[0-9.]+元').visibleToUser().filter(function (w) { return (Number(w.text().replace('¥', '').replace('元', '').trim()) || 0) <= money; }).find();
                    if (btns.length == 0)
                        btns = descMatches('¥[0-9.]+元').visibleToUser().filter(function (w) { return (Number(w.desc().replace('¥', '').replace('元', '').trim()) || 0) <= money; }).find();
                    for (var i = btns.length - 1; i >= 0; i--) {
                        func.clickObject(btns[i]);
                        func.sleep(1000);

                        func.clickObject(btn);
                        func.sleep(2000);
                        o = text('立即提现').visibleToUser().findOnce() || desc('立即提现').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o)
                            func.sleep(4000);
                            break;
                        }
                        else {
                            o = text('立即邀请好友').visibleToUser().findOnce() || desc('立即邀请好友').visibleToUser().findOnce();
                            if (o) {
                                func.clickObject(o.parent().child(0));
                                func.sleep(1000);
                            }
                            else {
                                func.sleep(2000);
                            }
                        }
                    }
                }
                else {
                    func.toast('余额不足，不能提现！', 1)
                }
                func.back();
            }
        } else {
            log("没有提现")
        }
    }
}

function sign2() {
    refresh()
    var ii = 5;

    while (ii-- > 0 && !textMatches('金币收益|.*看视频再领.*|看完视频再领.*').visibleToUser().exists()) {
        if(ii<3){
            o = packageName(package).textMatches('主页').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                sleep(3000)
            }
        }
        o = packageName(package).textMatches('福利').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('金币收益|看视频再领.*|看完视频再领.*').visibleToUser().exists() || descMatches('金币收益|.*看视频领取.*|看完视频再领.*').visibleToUser().exists()");
        
        }
        closeDialog() 
    }




    func.sleep(5000);
    // closeDialog()
    toast("任务一:签到")

    o = packageName(package).textMatches('.*看视频再领.*|.*视频再领.*').visibleToUser().findOnce() || packageName(package).descMatches('.*看视频领取.*|看完视频再领.*').visibleToUser().findOnce()
    if (o) {
        // log(o)
        func.clickObject(o);
        this.func.sleep(2000);
        func.sleep(60000, "签到领金币", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        closeDialog();
    }
    closeDialog();
    refresh()
    o = textMatches('福利任务').visibleToUser().findOnce() || descMatches('福利任务').visibleToUser().findOnce()
    if (o) {
        // log(o)
        func.clickObject(o);
        this.func.sleep(2000);
    }

    toast("任务二:看视频领2000币")
    //看视频
    var ii = 5;
    while(ii-- > 0 ){

        o = packageName(package).textMatches('.*看视频领取.*|.*视频再领.*').visibleToUser().findOnce() || packageName(package).descMatches('.*看视频领取.*|看完视频再领.*').visibleToUser().findOnce()
        if (o) {
            // log(o)
            func.clickObject(o);
            this.func.sleep(2000);
            func.sleep(60000, "签到领金币", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog();
            this.func.sleep(2000);
            closeDialog();
        }

        o = packageName(package).textMatches('看视频赚钱').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            var o = packageName(package).textMatches('.*全部领取').visibleToUser().findOne(5000)
            if(o){
                closeDialog()
                break
            }else{
                func.sleep(60000, "2000币领取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
                sleep(3000)
                closeDialog()
            }
        }
    }
    closeDialog();
    refresh()

    // 宝箱
    toast("任务三:拆宝箱")
    o = packageName(package).textMatches('开宝箱得金币|.*时.*分.*秒').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        sleep(3000)
        o = packageName(package).textMatches('.*看视频领取.*|.*视频再领.*').visibleToUser().findOnce() || packageName(package).descMatches('.*看视频领取.*|看完视频再领.*').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            this.func.sleep(2000);
            func.sleep(60000, "宝箱红包领取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            this.func.sleep(2000);
            closeDialog();
            // closeDialog();
        }
        o = packageName(package).textMatches('刷短视频赚999金币').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o.parent().parent().parent().child(0))
        }
    }
    closeDialog();
    refresh()

    toast("任务四:拆红包")
    o = packageName(package).textMatches('可领取').visibleToUser().findOnce() || packageName(package).descMatches('.*看视频领取.*|看完视频再领.*').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        this.func.sleep(2000);
        //  拆红包
        var finds = packageName(package).text('拆开').visibleToUser().find();
        for (var kk = 0; kk < finds.length; kk++) {
            // log(kk)
            let child = finds[kk];
            // let txt = child.text();
            // let idd = child.bounds();
            // log(txt, '----', idd)
            ff = child.parent()
            if (ff) {
                xy_info = ff.bounds();
                sleep(1000)
                var w = textMatches(".*:.*:.*").boundsInside(xy_info.left, xy_info.top, xy_info.right, xy_info.bottom).findOnce();
                if (w) {
                    continue
                }
                func.clickObject(child)
                sleep(3000)
                o = packageName(package).textMatches('.*看视频领取.*|看完视频再领.*').visibleToUser().findOne(5000) || packageName(package).descMatches('.*看视频领取.*|看完视频再领.*').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o)
                    func.sleep(60000, "拆红包视频领取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    sleep(3000)
                    closeDialog()
                }
                sleep(3000)
                closeDialog()
            }
            sleep(1000)
        }
    }
    refresh()
    click(device.width * 0.9, device.height * 0.05)
    click(device.width * 0.9, device.height * 0.05)
    o = packageName(package).text('视频').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
    }
    else {
        o = packageName(package).text('主页').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
        }
    }
        // log("结束")

}

function refresh(){
    var ii = 7;
    while(ii-- > 0 && !textMatches('我的').visibleToUser().exists()){
        closeDialog()
        if (currentPackage().toLowerCase() != package.toLowerCase()) {
            func.restart(appname, package)
        }
        if(ii<5){
            func.sleep(3200);
            func.back();
        }
        if(ii<2){
            func.sleep(3200);
            func.restart(appname, package)
        }

    }
}

function closeDialog() {

    o = packageName(package).textMatches('.*再赚.*元|.*离线收益').visibleToUser().findOnce();
    if (o) {
        sleep(1000)
        p = o.parent()
        if(p){
            q = p.parent()
            if(q){
                func.clickObject(o.parent().parent().child(0))
            }else{
                func.clickObject(o.parent().child(0))
            }
        }
        // func.clickObject(o.parent().parent().child(0))
    }
    o = textMatches('我知道了|知道了').visibleToUser().findOnce()
    if (o) {
        // log(4)
        func.sleep(2000);
        o = textMatches('我知道了|知道了').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }

    }

    o = packageName(package).textMatches(keys).visibleToUser().findOnce();
    if (o) {
        // log(1)
        func.back();
        func.sleep(2000);
    }
    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        // log(2)
        func.clickObject(o);
        func.sleep(2000);
    }

    o = idMatches(package + ':id/ivDismiss').visibleToUser().findOnce();
    if (o) {
        // log("ivDismiss")
        func.clickObject(o);
        func.sleep(2000);
    }

    //  不确定对不对 
    // o = packageName(package).textMatches('恭喜获得|邀请好友听歌.*|看视频领取|今日看视频已得.*|恭喜获得离线.*').visibleToUser().findOnce();
    // if (o) {
    //     log(3)
    //     // func.clickObject(o.parent().child(0))
    //     func.clickObject(o.parent().o.parent().child(0))
    //     func.sleep(2000);
    // }


    // 邀请 红包
    o = packageName(package).className("android.widget.Image").depth(7).findOnce()
    if (o) {
        // log(5)
        func.clickObject(o);
    }
    // // 签到
    // o = packageName(package).className("android.widget.Image").depth(8).findOnce()
    // if(o){
    //     log(6)
    //     func.clickObject(o);
    // }
    // if (app.versionCode == 1){
    //     log(7)
    //     o = className('android.view.View').depth(18).visibleToUser().filter(function(w){return w.bounds().bottom < device.height / 6 && w.text() == ''}).findOnce()
    // }
    // else{
    //     log(8)
    //     o = className('android.view.View').depth(9).visibleToUser().filter(function(w){return w.bounds().bottom < device.height / 6 && w.text() == ''}).findOnce()
    //     if (!o)
    //         o = className('android.view.View').depth(9).visibleToUser().filter(function(w){return w.bounds().width() == w.bounds().height() && w.bounds().bottom < device.height / 6 && w.text() == ''}).findOnce()
    // }
    // if (o){
    //     log(9)
    //     func.clickObject(o);
    //     func.sleep(2000);
    // }
}

function hasDialog() {
    setInterval(hasDialog2, 3000);
}

function hasDialog2() {
    try {
        func.hasDialog();
        o = idMatches(package + ':id/ivDismiss').visibleToUser().findOnce();
        if (o) {
            // log("ivDismiss")
            func.clickObject(o);
            func.sleep(2000);
        }

        var o = idMatches('.*:id/(.*close.*|.*Close.*)').visibleToUser().findOnce()
        if (o) {
            // log("aaaa")
            if (!textMatches('快音|提现').visibleToUser().exists()) {
                func.clickObject(o);
            }
        } o = idMatches('.*:id/w_v_back').visibleToUser().findOnce()
        if (o) {

            func.sleep(2000);
            if (!textMatches('快音|提现').visibleToUser().exists()) {
                // log("bbbb")
                func.clickObject(o);
            }
        }
        o = textMatches('開|我知道了|放弃奖励').visibleToUser().findOnce()
        if (o) {
            // log("ccccc")
            func.clickObject(o);
        }
        o = packageName(package).className('android.widget.Image').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.35 && w.bounds().left > device.width * 0.9 }).findOnce();
        if(o){
            // log("关闭邀请弹窗")
            func.clickObject(o)
        }
        o = packageName(package).className('android.widget.Image').depth(16).visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.35 && w.bounds().left > device.width * 0.8 }).findOnce();
        if(o){
            // log("关闭提现弹窗")
            func.clickObject(o);
        }

        // o = packageName(package).textMatches('恭喜获得|邀请好友听歌.*').visibleToUser().findOnce();
        // if (o && o.parent()) {
        //     log("dddd")
        //     func.clickObject(o.parent().child(0))
        // }

        // o = packageName(package).textMatches('恭喜获得|邀请好友听歌.*|看视频领取|今日看视频已得.*|恭喜获得离线.*').visibleToUser().findOnce();
        // if (o) {
        //     log("eeeee")
        //     func.clickObject(o.parent().child(0))
        //     func.sleep(2000);
        // }

        o = packageName(package).textMatches('.*再赚.*元|.*离线收益').visibleToUser().findOnce();
        if (o) {
            sleep(1000)
            p = o.parent()
            if(p){
                q = p.parent()
                if(q){
                    func.clickObject(o.parent().parent().child(0))
                }else{
                    func.clickObject(o.parent().child(0))
                }
            }
            // func.clickObject(o.parent().parent().child(0))
        }



        // if (app.versionCode == 1) {
        //     o = className('android.view.View').depth(18).visibleToUser().filter(function (w) { return w.bounds().bottom < device.height / 6 && w.text() == '' }).findOnce()
        // }
        // else {
        //     o = className('android.view.View').depth(9).visibleToUser().filter(function (w) { return w.bounds().bottom < device.height / 6 && w.text() == '' }).findOnce()
        //     if (!o)
        //         o = className('android.view.View').depth(9).visibleToUser().filter(function (w) { return w.bounds().width() == w.bounds().height() && w.bounds().bottom < device.height / 6 && w.text() == '' }).findOnce()
        // }
        // if (o) {
        //     log("ffff")
        //     func.clickObject(o);
        // }

        //if(className('Image').textMatches('lza').visibleToUser().exists()){ //天降红包

        //}
    }
    catch (e) {

    }
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