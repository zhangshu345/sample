const appname = '糖豆';
const package = 'com.bokecc.dance';


var classModule = {};
classModule.minMinutes = 25;
classModule.maxMinutes = 35;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 10;
classModule.maxVideoSec = 15;
classModule.autoR = 0;	//默认自动提现
classModule.func = null;

var keys = '点击重播|点击下载|点击打开|关闭广告';


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
        var o = func.execApp(appname, package, 15000, "textMatches('铃声|我的').visibleToUser().exists()")
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt();
            return; //退出函数
        }
    }

    func.openWaiting(['.FrameLayout', '.SplashActivity'])

    var x = device.width / 2;
    var y = device.height / 2;
    try {
        sign()
        var idx = 1;
        var bol = true;

        to_target()
        var ii = 5;
        while (ii-- > 0){
            o = textMatches('刷有趣短视频').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
            if(o){
                sleep(3000)
                break
            }
            func.swipeUp()
            sleep(3000)
        }
        o = textMatches('刷有趣短视频').visibleToUser().findOnce();
        if (o) {
            var list = o.parent();
            for(var i = 0; i < list.childCount(); i++){
                var child = list.child(i);
                let txt = child.text();
                if(txt == "去完成"){
                    func.clickObject(o)
                    sleep(1500)
                    func.sleep(10000, '等待中', "textMatches('分享').visibleToUser().exists() || idMatches('.*iv_red_packet').visibleToUser().exists()");
                    break
                }
            }
        }

        while (bol) {
            o = textMatches('今日已完成').visibleToUser().exists()
            if(o){
                toast("今日已完成")
                break
            }

            o = textMatches('分享').visibleToUser().exists() || idMatches('.*iv_red_packet').visibleToUser().exists()
            if(!o){
                to_target()
                var ii = 5;
                // while (ii-- > 0 && !textMatches('刷有趣短视频').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.8 }.exists()).exists()){
                while (ii-- > 0){
                    o = textMatches('刷有趣短视频').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
                    if(o){
                        sleep(3000)
                        break
                    }
                    func.swipeUp()
                    sleep(3000)
                }
                o = textMatches('刷有趣短视频').visibleToUser().findOnce();
                if (o) {
                    var list = o.parent();
                    for(var i = 0; i < list.childCount(); i++){
                        var child = list.child(i);
                        let txt = child.text();
                        if(txt == "去完成"){
                            func.clickObject(o)
                            sleep(1500)
                            func.sleep(10000, '等待中', "textMatches('分享').visibleToUser().exists() || descMatches('分享').visibleToUser().exists()");
                            break
                        }
                    }
                }
            }

            func.sleep(10000, '等待中', "!textMatches('.*加载中，请稍候.*').visibleToUser().exists() ");
            idx++;

            var sec = random(me.minVideoSec, me.maxVideoSec);
            func.videoSleep(sec);
            swipe_Up()


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

        if (this.autoR == 0) autoRedraw();

        this.func.sleep(1000);

    }
    catch (e) {
        func.log(appname, '循环执行', e.message + '\n\r' + e.stack)
    }
    finally {
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname, '结束时间', "**********************************************************");

    func.quit(package);
}

function swipe_Up(){
    var w = device.width;
    var h = device.height;
    swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
}


function closeDialog() {
    o = packageName(package).textMatches('关闭广告').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }


    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }

    var o = className('ImageView').visibleToUser().filter(function (w) { return w.id() == '' }).find();
    if (o.length == 1) {
        func.clickObject(o[0]);
        func.sleep(4000);
    }
    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        if (!packageName(package).textMatches('任务中心').visibleToUser().exists() && !packageName(package).descMatches('看视频再领.*金币|看视频.*金币再翻.*|完善信息，个性化你的内容').visibleToUser().exists())
            {
                func.clickObject(o);
            }
    }
    o = packageName(package).textMatches('知道了').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }

    o = idMatches(package + ':id/.*tv_time.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
    }
    o = packageName(package).textMatches('我不感兴趣').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }
    
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

function to_target(){
    var ii = 7;
    while(ii-- > 0 && !textMatches('任务中心-领现金').visibleToUser().exists()){
        o = textMatches('首页').visibleToUser().findOnce() || descMatches('首页').visibleToUser().findOnce()
        if(!o){
            back()
        }

        o = packageName(package).textMatches('我的').visibleToUser().filter(function (w) { return w.bounds().bottom > device.height * 0.7; }).findOnce()
        if(o){
            func.clickObject(o)
            sleep(3000)
        }
        if (currentPackage().toLowerCase() != package.toLowerCase()) {
            func.restart(appname, package)
        }

        if(ii<5){
            func.back();
            func.sleep(3200);
        }
        if(ii<2){
            func.sleep(3200);
            func.restart(appname, package)
        }
        closeDialog()
    }

    // 进入任务页面
    var ii = 5;
    while (ii-- > 0 && !textMatches('日常任务|去完成').visibleToUser().exists()) {
        if(ii<3){
            back()
            o = packageName(package).textMatches('首页').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                sleep(3000)
            }
            o = packageName(package).textMatches('我的').filter(function (w) { return w.bounds().bottom > device.height * 0.7; }).visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                sleep(3000)
            }
        }
        o = packageName(package).textMatches('任务中心-领现金').visibleToUser().findOnce() 
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('日常任务|去完成').visibleToUser().exists() ");
        }
        closeDialog() 
    }
    sleep(5000)
}

function sign() {
    to_target()  
    o = textMatches('去签到').visibleToUser().findOnce() || descMatches('去签到').visibleToUser().findOnce()
    if (o) {
        // o = textMatches('去签到').visibleToUser().findOnce() || descMatches('去签到').visibleToUser().findOnce()
        func.clickObject(o)
        sleep(3500)
        o = textMatches('看视频再赚.*').visibleToUser().findOnce() || descMatches('看视频再赚.*').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o)
            sleep(1500)
            func.sleep(10000, '等待中', "!textMatches('.*正在努力加载.*').visibleToUser().exists() || descMatches('.*正在努力加载.*').visibleToUser().exists()");
            o = textMatches('日常任务').visibleToUser().findOnce() || descMatches('日常任务').visibleToUser().findOnce()
            if (!o) {
                func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
                sleep(3000)
                closeDialog()
                // to_target()  
            }
        }
    }
    sleep(2000)


        // 抽奖
    o = textMatches('抽奖领金币').visibleToUser().findOnce();
    if (o) {
        var list = o.parent();
        for(var i = 0; i < list.childCount(); i++){
            var child = list.child(i);
            let txt = child.text();
            if(txt == "去完成"){
                func.clickObject(o)
                sleep(1500)
                func.sleep(10000, '等待中', "textMatches('剩余次数.*').visibleToUser().exists() || descMatches('.*剩余次数.*').visibleToUser().exists()");
                sleep(3000)
                o = textMatches('0次').visibleToUser().exists()
                if(o){
                    back()
                    sleep(5000)
                }else{
                    var ii = 30;
                    while (ii-- > 0 && !textMatches('0次').visibleToUser().exists()) {
                        var o = className('android.view.View').visibleToUser().clickable(true).filter(function (w) { return w.bounds().left > device.width * 0.2 && w.bounds().right < device.width * 0.8; }).findOnce();
                        if (o) {
                            func.clickObject(o)
                            sleep(8000)
                        }
                
                        o = textMatches('领取并继续抽奖').visibleToUser().findOnce() || descMatches('领取并继续抽奖').visibleToUser().findOnce()
                        if (o) {
                            func.clickObject(o)
                            sleep(8000)
                        }
                        o = textMatches('立即观看').visibleToUser().findOnce() || descMatches('立即观看').visibleToUser().findOnce()
                        if (o) {
                            func.clickObject(o)
                            sleep(2000)
                            func.sleep(10000, '等待中', "!textMatches('.*正在努力加载.*').visibleToUser().exists() || descMatches('.*正在努力加载.*').visibleToUser().exists()");
                            func.sleep(60000, "抽奖领金币", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                            closeDialog()
                        }
                        o = textMatches('广告').visibleToUser().findOnce() || descMatches('广告').visibleToUser().findOnce()
                        if (o) {
                            func.sleep(10000, '抽奖领金币', "!textMatches('.*秒').visibleToUser().exists()");
                            sleep(1000)
                            closeDialog()
                        }
                    }
                    // to_target()  
                    back()
                    func.sleep(10000, '等待中', "textMatches('日常任务|去完成').visibleToUser().exists() ");
                    sleep(2000)
                }
                break

            }
        }

    }


    //  /// 励志视频 

    o = textMatches('看激励视频广告').visibleToUser().findOnce();
    if (o) {
        var list = o.parent();
        for(var i = 0; i < list.childCount(); i++){
            var child = list.child(i);
            let txt = child.text();
            let idd = child.id();
            if(txt == "去完成"){
                func.clickObject(o)
                sleep(1500)
                func.sleep(10000, '等待中', "textMatches('看趣味视频 赚高额金币').visibleToUser().exists() || descMatches('看趣味视频 赚高额金币').visibleToUser().exists()");
                sleep(3000)
                o = textMatches('已完成').visibleToUser().exists()
                if(o){
                    back()
                    sleep(5000)
                }else{
                    var ii = 30;
                    while(ii-- > 0 && !textMatches('已完成').visibleToUser().exists()){
                        o = textMatches('立即观看').visibleToUser().findOnce() || descMatches('立即观看').visibleToUser().findOnce()
                        if(o){
                            func.clickObject(o)
                            sleep(1500)
                            func.sleep(10000, '等待中', "!textMatches('.*正在努力加载.*').visibleToUser().exists() || descMatches('.*正在努力加载.*').visibleToUser().exists()");
                            func.sleep(60000, "看激励视频广告领币", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                            closeDialog()
                            sleep(3000)
                            closeDialog()
                            sleep(2000)
                        }
                        o = textMatches('继续赚钱').visibleToUser().findOnce() || descMatches('继续赚钱').visibleToUser().findOnce()
                        if(o){
                            func.clickObject(o)
                            sleep(1500)
                            func.sleep(10000, '等待中', "!textMatches('.*正在努力加载.*').visibleToUser().exists() || descMatches('.*正在努力加载.*').visibleToUser().exists()");
                            func.sleep(60000, "看激励视频广告领币", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                            closeDialog()
                            sleep(3000)
                            closeDialog()
                            sleep(2000)
                        }
                        o = textMatches('知道了').visibleToUser().findOnce() || descMatches('知道了').visibleToUser().findOnce()
                        if(o){
                            func.clickObject(o)
                            sleep(1500)
                        }
                        o = textMatches('.*秒后可看').visibleToUser().findOnce() || descMatches('.*秒后可看').visibleToUser().findOnce()
                        if(o){
                            func.sleep(60000, '技能冷却中....', "!textMatches('.*秒后可看.*').visibleToUser().exists() || descMatches('.*秒后可看.*').visibleToUser().exists()");
                            sleep(3000)
                        }
                    }
                    back()  
                    func.sleep(10000, '等待中', "textMatches('日常任务|去完成').visibleToUser().exists() ");
                    sleep(2000)
                }
                break
            }
        }
    }




}

function autoRedraw(){
    to_target()
    o = packageName(package).textMatches('.*元').visibleToUser().findOnce();
    if (o) {
        log(o.text())
        have_money = o.text()
        have_money = have_money.replace('元', '');
        if (have_money > 0.3) {
            o = packageName(package).textMatches('提现').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                func.sleep(10000, '等待中', "textMatches('立即提现').visibleToUser().exists() ");
                if (have_money > 1) {
                    o = packageName(package).textMatches('1元').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o)
                        sleep(3000)
                        o = packageName(package).textMatches('立即提现').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o)
                            sleep(3000)
                        }
                    }
                } else if (have_money > 0.3) {
                    o = packageName(package).textMatches('0.3元').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o)
                        sleep(3000)
                        o = packageName(package).textMatches('立即提现').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o)
                            sleep(3000)
                            o = packageName(package).textMatches('绑定微信').visibleToUser().findOnce();
                            if (o) {
                                func.clickObject(o)
                                func.sleep(30000, '等待中', "textMatches('返回糖豆').visibleToUser().exists() ");
                                sleep(6000)
                                o = textMatches('返回糖豆').visibleToUser().findOnce();
                                if (o) {
                                    func.clickObject(o)
                                    sleep(6000)
                                }
                            }
                        }
                    }
                }
            }
        } else {
            toast("余额不足")
        }
    }
}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            if (!packageName(package).textMatches('任务中心').visibleToUser().exists() && !packageName(package).id('back').visibleToUser().exists())
                {
                    func.clickObject(o);
                }
        }

        o = packageName(package).textMatches('以后再说|继续播放|放弃金币|暂不领取|放弃奖励').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }

        o = packageName(package).textMatches('知道了').visibleToUser().findOnce()
        if (o) {
            p = packageName(package).textMatches('领取并继续.*').visibleToUser().findOnce()
            if(!p){
                func.clickObject(o);
            }

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