const appname = '新晴天气';
const package = 'com.nineton.weatherforecast'

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
classModule.func = func;
var keys = '点击重播|点击下载|点击打开|领取福利|下载.*得.*'

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
    func.openWaiting(['.FrameLayout', '.SplashActivity'])
    try {
        var idx = 1;
        var bol = true;
        var trys = 0;


        this.func.sleep(3000);
        turntable()
        watch_video()
        // var datediff = new Date().getTime() - startDate.getTime();
        // if (datediff > minutes * 60 * 1000) {
        //     bol = false;
        //     func.toast(appname + '运行完成', 2)
        // }
        // else {
        //     if (idx % 5 == 0)
        //         func.toast(appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟', 2)
        // }

        if (this.autoR == 0) autoRedraw();
    }
    catch (e) {
        log(e.message + '\n\r' + e.stack)
        func.log(appname, '循环执行', e.message + '\n\r' + e.stack)
        log(appname, '调试信息循环执行', e.message + '\n\r' + e.stack)
    }
    finally {
        thread.interrupt(); //结束弹出窗口的线程检测
    }

    func.log(appname, '结束时间', "**********************************************************");
    func.quit(package);
}

function code() {

    sleep(3000)
    for (var iii = 1; iii < 99; iii++) {
        var o = textMatches('安全验证').findOnce()
        if (o) {
            p = idMatches('slideBlock').visibleToUser().findOnce()
            if (p) {

                var sliderX = p.bounds().centerX();   //滑块的x坐标
                var sliderY = p.bounds().centerY();    //滑块的y坐标
                // log("按钮" + sliderX, "...,....", sliderY);
            } else {
                finds = className('Image').visibleToUser().find()
                // var bgPic = finds[finds.length-3]
                // log("背景",bgPic.bounds())
                var slider = finds[finds.length - 2]
                var sliderX = slider.bounds().centerX();   //滑块的x坐标
                var sliderY = slider.bounds().centerY();    //滑块的y坐标
            }




            // log(sliderX, "...,....", sliderY);

            // swipe(sliderX, sliderY, 817, 1038, 1500)//滑块点自己取
            // log(device.width*0.756,",",device.height* 0.44)
            swipe(sliderX, sliderY, device.width * 0.756, sliderY, 1500)
            var p = textMatches('安全验证').findOnce()
            if (!p) {
                break
            }

            o = idMatches('reload').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o);
            } else {
                var finds2 = packageName(package).className("android.view.View").depth(18).find();
                log(finds2.length);
                child = finds2[finds2.length - 2]
                func.clickObject(child);
            }



            sleep(2500)

        } else {
            // log("正常已退出验证码");

            break
        }
    }

}

function autoRedraw() {

    var ii = 5
    while (ii-- > 0 && !textMatches('任务赚金').visibleToUser().exists()) {
        var finds = packageName(package).className('android.widget.LinearLayout').depth(8).filter(function(w){return w.bounds().bottom > device.height * 0.7;}).visibleToUser().find()
        if(finds){
            child = finds[finds.length-1];
            func.clickObject(child);
            sleep(3000)
        }
        if(ii<3){
            back()
        }
    }

    var ii = 5
    while (ii-- > 0) {
        o = packageName(package).textMatches('金币提现|- 我的金币 -').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(2000)
        }
        p = packageName(package).text('提现').visibleToUser().findOnce();
        if(p){
            break
        }
    }



        o = packageName(package).textMatches('天天提').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(2000)
        }

        

        o = packageName(package).text('立即提现').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(2000)
        }

        code()



        sleep(3000)
        o = packageName(package).textMatches('.*确认提现.*').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);

            func.sleep(60000, '提现视频观看中', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog();
        }

}

// 任务一 抽奖
function turntable() {
    var ii = 5
    while (ii-- > 0 && !textMatches('任务赚金').visibleToUser().exists()) {
        var finds = packageName(package).className('android.widget.LinearLayout').depth(8).filter(function(w){return w.bounds().bottom > device.height * 0.7;}).visibleToUser().find()
        if(finds){
            child = finds[finds.length-1];
            func.clickObject(child);
            sleep(3000)
        }
        if(ii<3){
            back()
        }
    }
    var ii = 5
    while (ii-- > 0) {
        o = packageName(package).textMatches('任务赚金').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(2000)
        }

        sleep(3000)
        o = packageName(package).textMatches('双倍领取').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            // func.sleep(60000, '签到金币领取中', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists()");
            func.sleep(60000, '签到金币领取中', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists()|| packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        
            closeDialog();
            func.sleep(2000);
            // q = packageName(package).textMatches('.*放弃.*').visibleToUser().findOnce();
            q = packageName(package).textMatches('.*去抽奖100%中奖.*').visibleToUser().findOnce();
            if (q) {
                func.clickObject(o);
                sleep(3000)
            }
            continue
        }


        o = packageName(package).textMatches('任务大厅').visibleToUser().findOnce();
        if (o) {
            // sleep(2000)
            break
        }
    }


    o = packageName(package).text('福利抽奖').visibleToUser().findOnce();
    if(!o){
        var ii = 5
        while (ii-- > 0) {
            o = packageName(package).textMatches('抽奖大转盘').visibleToUser().findOnce();
            if (o && o.bounds().centerY() < device.height * 0.8) {
                break
            }
            this.func.swipeUp();
            this.func.sleep(1000);
            o = packageName(package).textMatches('双倍领取').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                func.sleep(2000);
                // func.sleep(60000, '签到金币领取中', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists()");
                func.sleep(60000, '签到金币领取中', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            
                closeDialog();
                func.sleep(2000);
                q = packageName(package).textMatches('.*放弃.*').visibleToUser().findOnce();
                if (q) {
                    func.clickObject(o);
                }
                o = packageName(package).textMatches('任务赚金').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    sleep(2000)
                }
            }
    
    
        }
    
        o = packageName(package).textMatches('抽奖大转盘').visibleToUser().findOnce();
        if (o) {
            list = o.parent()
            for (var i = 0; i < list.childCount(); i++) {
                var child = list.child(i);
                // log(child.text());
                if (child.text() == "最轻松，100%中大量金币") {
                    j = i
                    break
                }
            }
            if (list.child(j + 1).text() == "已完成") {
                var ii = 5
                while (ii-- > 0) {
    
                    o = packageName(package).text('关闭').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
    
                    } else {
                        return
                    }
                }
            }
    
        }
    
        o = packageName(package).text('抽奖').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(3000)
            code()
            o = packageName(package).text('知道了').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
            }
        }
    
    }

    var ii = 20
    while (ii-- > 0) {
        code()
        o = packageName(package).textMatches('知道了').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
        }
        sleep(2000)
        q = packageName(package).textMatches('剩余0次').visibleToUser().findOnce();
        if (q) {
            toast("抽奖已完成")
            break
        }
        o = packageName(package).textMatches('.*倍领取').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            // func.sleep(60000, '翻倍金币领取中...', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists()");
            func.sleep(60000, '抽奖机会抽奖机会获取中....', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        
            
            closeDialog();
            o = packageName(package).textMatches('剩余0次').visibleToUser().findOnce();
            if (o) {
                toast("抽奖已完成")
                break
            }

            func.sleep(18000, "技能冷却中");
        }

        o = packageName(package).textMatches('立即抽奖').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(5000)
            o = packageName(package).textMatches('.*倍领取').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                func.sleep(2000);
                func.sleep(60000, '翻倍金币领取中...', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog();
                o = packageName(package).textMatches('剩余0次').visibleToUser().findOnce();
                if (o) {
                    toast("抽奖已完成")
                    break
                }

                func.sleep(18000, "技能冷却中");
            }

        }


        o = packageName(package).textMatches('看视频再抽.*').visibleToUser().findOnce();
        if (o) {



            q = packageName(package).textMatches('剩余0次').visibleToUser().findOnce();
            if (q) {
                toast("抽奖已完成")
                break
            }
            func.clickObject(o);

            func.sleep(2000);

            code()
            // func.sleep(60000, '抽奖机会抽奖机会获取中....', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists()");
            func.sleep(60000, '抽奖机会抽奖机会获取中....', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        
            closeDialog();
            sleep(6000)

            // func.sleep(18000,"技能冷却中");        
        }




        o = packageName(package).textMatches('.*倍领取').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(60000, '翻倍金币领取中...', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()")
            closeDialog();
            o = packageName(package).textMatches('剩余0次').visibleToUser().findOnce();
            if (o) {
                toast("抽奖已完成")
                break
            }

            func.sleep(18000, "技能冷却中");
        }

    }
    var ii = 5
    while (ii-- > 0) {

        o = packageName(package).text('关闭').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);

        } else {
            break
        }
    }
}

// 任务二 看电视
function watch_video() {
    var ii = 5
    while (ii-- > 0 && !textMatches('任务赚金').visibleToUser().exists()) {
        var finds = packageName(package).className('android.widget.LinearLayout').depth(8).filter(function(w){return w.bounds().bottom > device.height * 0.7;}).visibleToUser().find()
        if(finds){
            child = finds[finds.length-1];
            func.clickObject(child);
            sleep(3000)
        }
        if(ii<3){
            back()
        }
    }
    var ii = 5
    while (ii-- > 0) {
        o = packageName(package).textMatches('任务赚金').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(2000)
        }

        sleep(3000)
        o = packageName(package).textMatches('双倍领取').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(60000, '签到金币领取中', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog();
            func.sleep(2000);
            back()
        }
        o = packageName(package).textMatches('任务大厅').visibleToUser().findOnce();
        if (o) {
            // sleep(2000)
            break
        }
    }
    o = packageName(package).textMatches('双倍领取').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
        func.sleep(60000, '签到金币领取中', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        closeDialog();
        func.sleep(2000);
        q = packageName(package).textMatches('.*放弃.*').visibleToUser().findOnce();
        if (q) {
            func.clickObject(o);
        }
    }



    var ii = 5
    while (ii-- > 0) {
        o = packageName(package).textMatches('观看视频').visibleToUser().findOnce();
        if (o && o.bounds().centerY() < device.height * 0.8) {
            break
        }
        this.func.swipeUp();
        this.func.sleep(1000);
    }

    o = packageName(package).textMatches('观看视频').visibleToUser().findOnce();
    if (o) {
        list = o.parent()
        for (var i = 0; i < list.childCount(); i++) {
            var child = list.child(i);
            if (child.text() == "观看视频") {
                j = i
                break
            }
        }
        if (list.child(j + 1).text() == "已完成") {
            var ii = 5
            while (ii-- > 0) {

                o = packageName(package).text('关闭').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);

                } else {
                    return
                }
            }
        }

    }
    var ii = 50
    while (ii-- > 0) {
        o = packageName(package).text('观看').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(60000, '观看视频金币领取中...', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog();
            sleep(3000)
        } else {
            closeDialog();
        }

        o = packageName(package).textMatches('观看视频').visibleToUser().findOnce();
        if (o) {
            list = o.parent()
            for (var i = 0; i < list.childCount(); i++) {
                var child = list.child(i);
                // log(child.text())
                if (child.text() == "观看视频") {
                    j = i
                    break
                }
            }
            if (list.child(j + 4).text() == "已完成") {
                var ii = 5
                while (ii-- > 0) {
                    o = packageName(package).text('关闭').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);

                    } else {
                        return
                    }
                }
            } else {
                sleep(1000)
            }
        }

    }

}

function sign() {
    try {
        var o1 = packageName(package).textMatches('首页|刷新').visibleToUser().findOne(5000);
        var o = packageName(package).textMatches('任务|领取红包|看视频[ 0-9:]+').visibleToUser().findOnce() || packageName(package).textMatches(/\d+:\d+/).visibleToUser().filter(function (w) { return w.bounds().centerY() > o1.bounds().top }).findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(3000);

            if (classModule.noAd == 1 || (packageName(package).textMatches('.*签到.*获得.*').visibleToUser().exists() && !packageName(package).text('金币翻倍').visibleToUser().exists())) {
                o = className('ImageView').visibleToUser().filter(function (w) {
                    var r = w.parent().childCount() == 1 && w.parent().className() == 'android.widget.RelativeLayout';
                    return r
                }).findOne(2000);
                if (o) {
                    func.clickObject(o)
                    func.sleep(2000);
                }
            }
        }

        if (classModule.noAd != 1) {
            var ii = 5;
            while (ii-- > 0) {
                o = packageName(package).textMatches('看视频红包|金币翻倍|领红包|领金币|领取|再领.*').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                    o = text('看视频即可打开').visibleToUser().findOnce() || text('看视频即可打开').visibleToUser().findOnce();
                    if (o) {
                        o = o.parent().child(o.indexInParent() - 1);
                        func.clickObject(o);
                        func.sleep(2000)
                    }
                    func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*').visibleToUser().exists() || packageName('" + package + "').descMatches('点击重播|点击下载|已连续签到.*').visibleToUser().exists()");
                    closeDialog();
                }
                func.sleep(2000);
            }

            //if (className('ImageView').visibleToUser().find().length == 3){
            //    o = className('ImageView').visibleToUser().findOnce();
            //    func.clickObject(o);
            //    func.sleep(1000);
            //}
        }

        o = packageName(package).text('首页').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
        }
    }
    catch (e) {
        func.log(appname, '签到', e.message + '\n\r' + e.stack)
    }
}

function closeDialog() {
    // if (packageName(package).textMatches(keys).visibleToUser().exists() || packageName(package).descMatches(keys).visibleToUser().exists()) {
    //     func.back();
    //     func.sleep(3000);
    // }
    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }



    // o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
    // if (o){

    //     func.clickObject(o);
    //     func.sleep(5000);
    // }

    o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
    if (o) {
        if (o.id() != "com.nineton.weatherforecast:id/web_close") {
            func.clickObject(o);
            func.sleep(5000);
        }
    }


    o = textMatches('广告').visibleToUser().depth(16).findOnce();
    if (o){
        back()
        func.sleep(3000);
    }

    o = textMatches('知道了.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(3000);
    }
    // if (packageName(package).textMatches('.*您又赚了.*|.*恭喜获得.*|' + keys).visibleToUser().exists() || packageName(package).descMatches('.*您又赚了.*|.*恭喜获得.*|' + keys).visibleToUser().exists()) { // || currentActivity().indexOf('CoinAdDialog') > 0   
    //     sleep(5000)
    //     if (app.versionCode == 1) {
    //         o = className('ImageView').visibleToUser().filter(function (w) {
    //             //var r = w.parent().childCount() == 1 && w.parent().className() == 'android.widget.RelativeLayout';
    //             var r = w.bounds().centerY() < 200;
    //             return r
    //         }).findOnce();
    //     }
    //     else {
    //         // o = className('FrameLayout').visibleToUser().filter(function(w){return w.childCount() == 0}).findOnce();
    //         o = id('jw').visibleToUser().filter(function (w) { return w.childCount() == 1 }).findOnce();
    //     }
    //     if (o)
    //         func.clickObject(o)
    // }
}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        // o = id('jw').visibleToUser().filter(function(w){return w.childCount() == 1}).findOnce();
        // if (o){
        //     func.clickObject(o)
        // }
        // o = packageName(package).textMatches('不再提醒 *|取消|关闭').visibleToUser().findOnce() || packageName(package).descMatches('不再提醒 *|取消|关闭').visibleToUser().findOnce() || idMatches(package + ':id/.*close.*').visibleToUser().findOnce() || idMatches(package + ':id/j.*').visibleToUser().findOnce();
        // if (o){
        //     func.clickObject(o);
        // }
        o = idMatches('.*close.*').visibleToUser().filter(function (w) { return w.id() != 'com.nineton.weatherforecast:id/web_close' }).findOnce()
        if (o) {

            if (o.id() != "com.nineton.weatherforecast:id/web_close" && o.id() != "captcha_close") {
                func.clickObject(o);
                func.sleep(5000);
            }
        }

        o = textMatches("放弃奖励|允许|放弃抽奖").visibleToUser().findOnce()
        if (o) {

            func.clickObject(o);
        }

        o = packageName(package).textMatches('同意并进入|开始使用|知道了').visibleToUser().findOnce();
        if (o) {
    
            func.clickObject(o);
        }


        if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
            func.back();
            func.sleep(3000);
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

