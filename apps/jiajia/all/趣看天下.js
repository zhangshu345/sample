auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
const appname = '趣看天下'; 
const package = 'com.yanhui.qktx';

keys = '点击重播|点击下载|点击打开'

var classModule = {};
classModule.func = null;
// var func = require("./V4_开发版/function.js");
// classModule.func = func;
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.redrawToAlipay = 0;
classModule.autoR = 0;	//默认自动提现

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
        var o = func.execApp(appname, package)
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }
    checkPage();


    //在这里读取微鲤的配置文件
    var cfg = func.loadConfig(appname);

    var lastdate = cfg.lastdate || '';
    var nowdate = new Date().toLocaleDateString();
    var readeds = cfg.readeds || [];    //已经读了的文章

    if (lastdate != nowdate) {    //是新的一天
        readeds = [];   //已读的为空;
        lastdate = nowdate;
        cfg.lastdate = lastdate
    }

    func.openWaiting([]);



    // this.func.sleep(2000);
    // autoRedraw()

    try {
        sign();    //签到，并返回结果
        var idx = 1;
        var bol = true;
        var needrefresh = false;
        refresh()
        nn = 0
        while (bol) {
            nn += 1



            var o = packageName(package).text('首页').selected(true).visibleToUser().findOnce() || descMatches('首页').visibleToUser().selected(true).findOnce();

            if (!o) {
                closeDialog()
                var o = packageName(package).text('首页').visibleToUser().findOnce() || descMatches('首页').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                } else {
                    refresh()
                    var o = packageName(package).text('首页').visibleToUser().findOnce() || descMatches('首页').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                    }
                }
            }




            // if(nn>10){
            //     refresh()
            //     nn=0
            // }
            //开始获取内容来阅读，做阅读存盘、判断是否已阅，自动上滑、刷新等
            // var child = className("TextView").visibleToUser().filter(function(w){
            var child = id("title").visibleToUser().filter(function (w) {
                var r = w.bounds().bottom < device.height - 200 && w.text().indexOf(' ') == -1;
                if (w.parent())
                    r = r && w.parent().childCount() >= 3 && w.parent().find(text('广告')).length == 0;
                return r;
            }).findOnce();
            if (child) {
                nn = 0
                let txt = child.text();
                if (readeds.join().indexOf(txt) < 0) {   //不在本次历史，不在总历史
                    readeds.push(txt);  //保存到今天已阅读
                    cfg.readeds = readeds;
                    func.saveConfig(appname, JSON.stringify(cfg));

                    var isopen = 5, gn = false;
                    while (isopen > 0) {
                        func.clickObject(child);
                        func.sleep(4000);
                        try {
                            if (textMatches('本篇奖励已达上限.*').visibleToUser().exists())
                                isopen = -1
                            else if (idEndsWith('img_back').exists() || (currentActivity().indexOf('NewsArticleCustomActivity') > 0 && !packageName(package).text('趣看天下').visibleToUser().exists())) {
                                func.toast('第' + idx + '篇文章：打开成功');
                                isopen = 0;
                                gn = true
                            }
                            else
                                isopen -= 1;
                        }
                        catch (e) {
                            log(e.message)
                        }
                    }

                    if (gn) {
                        func.toast('开始阅读第' + idx + '篇文章或视频', 2)
                        func.toast('第' + idx + '篇文章或视频：' + txt);
                        idx++;

                        // if (textMatches('推荐视频|.*相关推荐|Video Player').visibleToUser().exists()){//打开的是视频
                        if (id(package + ":id/surface_container").visibleToUser().findOne(3000)) {
                            var waitsec = random(me.minVideoSec, 60);  //默认视频35秒，因为金币上限为35秒
                            func.toast('本次视频播放时长' + waitsec + '秒', 2);
                            func.videoSleep(waitsec);
                            pickCoin()

                        }
                        else {
                            var max = random(me.minSwipe, me.maxSwipe);
                            for (var i = 0; i < max; i++) {
                                var s = random(me.minTextSec * 1000, me.maxTextSec * 1000);
                                func.toast('阅读' + Math.floor(s / 1000) + '秒', 2);
                                func.sleep(s);   //随机阅读3到8秒
                                func.swipeUp();
                                var more = packageName(package).text('确定').filter(function (w) { return w.bounds().height() > 20; }).visibleToUser().findOnce();
                                if (more) {
                                    func.clickObject(more);
                                    func.sleep(1000);
                                }

                                var more = packageName(package).id('iv_unfold_reading').filter(function (w) { return w.bounds().height() > 20; }).visibleToUser().findOnce();
                                if (more) {
                                    func.clickObject(more);
                                    func.sleep(1000);
                                }
                                else {
                                    var o = packageName(package).textMatches('相关资讯|相关新闻|推荐阅读|热门评论').visibleToUser().exists();
                                    if (o)
                                        break;    //复位循环次数，不再继续上拉
                                    else if (packageName(package).textStartsWith('本篇奖励已达上限').visibleToUser().exists())
                                        break;
                                }
                                pickCoin()
                            }
                            func.toast('本篇已经阅读完成！', 2)
                        }
                        if (idx % 5 == 0)
                            func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟', 2)
                        if (idx % 11 == 1) //每看十条刷新一次首页
                            needrefresh = true;
                        else if (idx % 4 == 0 && func.release <= 7 && func.is2GMemory) {
                            func.toast('退出循环，准备重启');
                            break;
                        }
                    }

                    if (textStartsWith('恭喜获得客服指导一次').exists()) {
                        //要直接点返回
                        var o = className('android.view.ViewGroup').visibleToUser().findOnce(3);
                        if (o)
                            func.clickObject(o)
                    }
                    else
                        func.back();
                    func.sleep(2000);
                }
            }

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000) {
                bol = false;
                func.toast(appname + '运行完成', 2)
            }
            else {
                if (needrefresh) { //每看十条刷新一次首页
                    refresh();
                    needrefresh = false;
                }
                else {
                    if (idx % 4 == 0 && func.release <= 7 && func.is2GMemory)
                        func.restart(appname, package);
                    else { //上拉一屏，继续获取要阅读的文章
                        func.swipeUp();
                        func.sleep(2000);
                    }
                }
            }
        }

        if (this.autoR == 0) autoRedraw();
    }
    catch (ee) {
        func.log(appname, '循环执行', ee.message + '\n\r' + ee.stack);
    }
    finally {
        thread.interrupt(); //结束弹出窗口的线程检测
    }

    func.log(appname, '结束运行', "**********************************************************");
    func.quit(package);



}

function login(){
    var o = idMatches(package + ':id/.*image_svg_home_read_package.*').visibleToUser().findOnce();
    
    if (o){
        func.clickObject(o);
        sleep(3000)
        var o = idMatches(package + ':id/.*login_wechat_login_bt.*').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(3000)
            var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o);
                sleep(1000)
                o = textMatches('赚更多钱').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                }
            }
        }

    }

}

function autoRedraw(){
    var ii = 5;
    while(ii-- > 0 && !textMatches('我的').visibleToUser().exists()){
        closeDialog()
        if(ii<3){
            back()
            sleep(2300)
        }
    }
    var o = packageName(package).text('我的').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(10000,'等待中',"textMatches('我的金币').visibleToUser().exists() ");
        sleep(2000)
        var o = packageName(package).text('我的金币').visibleToUser().findOne(5000);
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(10000,'等待中',"textMatches('立即提现').visibleToUser().exists() ");
            o = packageName(package).text('立即提现').visibleToUser().findOne(5000);
            if (o){
                func.clickObject(o);
                func.sleep(3000);
                o = packageName(package).text('提现0.3元到微信').visibleToUser().findOnce();
                p = packageName(package).text('需: 10000金币').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(3000);
                    x = packageName(package).text('立即提现').visibleToUser().findOnce();
                    func.clickObject(x);
                    func.sleep(3000);
                }else if(p){
                    func.clickObject(p);
                    func.sleep(3000);
                    x = packageName(package).text('立即提现').visibleToUser().findOnce();
                    func.clickObject(x);
                    func.sleep(3000);
                }
                
            }
        }
    }
}

function sign(){
    try{
        closeDialog()
        sleep(3000)
        closeDialog()
        var o = packageName(package).text('赚金币').visibleToUser().findOne(5000);
        if (o){
            func.clickObject(o);
            func.sleep(10000,'等待中',"textMatches('账户余额.*|恭喜您获得.*金币|立即签到').visibleToUser().exists() ");
            func.sleep(2000);
            closeDialog()
            func.sleep(2000);
            o = textMatches('立即签到').visibleToUser().findOne(1000);
            if (o){
                func.clickObject(o);
                func.sleep(5000);
                closeDialog()
            }

            o = textMatches('可翻倍').visibleToUser().findOne(1000);
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                p = textMatches('金币翻倍').visibleToUser().findOne(1000);
                if(p){
                    func.clickObject(p);
                    sleep(5000)
                    // func.sleep(60000,"领币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').visibleToUser().exists()")     
                    func.sleep(60000,"领币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    
                    closeDialog()
                    sleep(5000)
                    closeDialog()
                }
            
            }
            


        }
        o = text('首页').visibleToUser().findOnce() 
        if (o){
            func.clickObject(o);
            sleep(3000)
        }

    }
    catch(e){
        func.log(appname,'签到',e.message + '\n\r' + e.stack);
    } 
}

function closeDialog(){
    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }

    o = idMatches(package + ':id/.*close').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(4000);
    } 
    o = textMatches('取消|以后再说').visibleToUser().findOnce() 
    if (o){
        func.clickObject(o);
    }
}

function checkPage(){
    if (currentPackage() != package){
        func.quit(package);
        func.sleep(2000);
        func.execApp(appname,package);
    }
    else   
        return true;    //当前是头条页
}

function pickCoin(){
    var o = packageName(package).textMatches('金币翻倍').findOnce();
    if (o){
        func.clickObject(o);
        // func.sleep(60000,'看视频领金币中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists()");
        func.sleep(60000,'看视频领金币中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        closeDialog()
        func.sleep(5000);
        closeDialog()
    }
}

function refresh(){  
    var ii = 7;
    while(ii-- > 0 && !text('我的').visibleToUser().exists()){
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

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();

        var o = null;
        var act = currentActivity().toLowerCase()
        if (act == 'android.app.dialog'){
            o = className('ImageView').findOnce(1);
            if (o)  func.clickObject(o)            
        } 

        o = null;
        o = textMatches('先去逛逛|我知道了|继续播放|同意|允许|以后再说|放弃奖励').visibleToUser().findOnce() || idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o)
            func.clickObject(o);

        o = null;
        if (textContains('恭喜你，完成').find().length == 1){
            o = className('ImageView').findOnce(1);
            if (o)  func.clickObject(o)
        }

        var o = id(package + ':id/tv_upgrade_cancel').visibleToUser().findOnce();
        // var o = packageName(package).textMatches('去授权').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }

        var o = id(package + ':id/img_close').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
        }
        
    },3000);
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
