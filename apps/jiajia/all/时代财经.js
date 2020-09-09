const appname = '时代财经';
const package = 'com.timeweekly.timefinance';

var classModule = {};
classModule.minMinutes = 15;
classModule.maxMinutes = 20;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
classModule.func = null;

var keys = '点击重播|点击下载|点击打开';

classModule.start = function () {
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes, this.maxMinutes);   //生成运行时间
    func.log(appname, '启动，预计运行：' + minutes, "**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分', 2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    var cfg = func.loadConfig(appname);
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date().toLocaleDateString();
    var readeds = cfg.readeds || [];    //已经读了的文章
    
    if (lastdate != nowdate){    //是新的一天
        readeds = [];   //已读的为空;
        lastdate = nowdate;
        cfg.lastdate = lastdate
    }    

    if (currentPackage() != package) {
        var o = func.execApp(appname, package, 15000, "textMatches('首页|个人').visibleToUser().exists()")
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
        var idx = 0;
        var bol = true;
        look_num = get_num()
        while (idx < look_num &&  bol) {

            o = idMatches(".*:id/fragment_home_logoIv").visibleToUser().findOnce()
            if(!o){
                refresh()
                o = packageName(package).textMatches('首页').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o);
                    func.sleep(3000);
                }
            }
            var finds = idMatches(".*:id/item_home_article_s_image_titleTv|.*:id/item_home_article_s_image_titleTv").visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85 && w.bounds().top > device.height * 0.3; }).find()
            for (var ii = 0; ii < finds.length; ii++) {
                let child = finds[ii];
                let txt = child.text();
                // log(txt)
                if (readeds.join().indexOf(txt) < 0) {   //不在本次历史，不在总历史
                    readeds.push(txt);  //保存到今天已阅读
                    cfg.readeds = readeds;

                    func.toast('开始阅读第' + idx + '遍文章：' + txt);
                    var isopen = 5, gn = false;
                    while (isopen > 0) {
                        func.clickObject(child);
                        func.sleep(3000);    //等待两秒
                        if (packageName(package).textMatches('有想法，抛出来').visibleToUser().exists()) {  //有效activity的判断
                            func.toast('第' + idx + '遍文章：打开成功');

                            isopen = 0;
                            gn = true;
                        }
                        else
                            isopen -= 1;
                    }

                    //************ */
                    if (gn) {
                        have_order = false
                        o = idMatches(package + ':id/fragment_article_detail_actBtnIv').visibleToUser().findOnce();
                        if (o) {
                            xy = o.bounds()
                            p = textMatches('.*s').boundsInside(xy.left, xy.top, xy.right, xy.bottom).visibleToUser().findOnce();
                            if (!p) {
                                have_order = true
                            }
                        }
                        if (!have_order) {
                            var ii = 5;
                            while (ii-- > 0 && !textMatches('内容评审计划|去提现|分享文章|去看新闻').visibleToUser().exists()) {
                                o = idMatches(package + ':id/fragment_article_detail_actBtnIv').visibleToUser().findOnce();
                                if (o) {
                                    xy = o.bounds()
                                    p = textMatches('.*s').boundsInside(xy.left, xy.top, xy.right, xy.bottom).visibleToUser().findOnce();
                                    if (!p) {
                                        func.clickObject(o);
                                    }
                                }
                                func.swipeUp();
                                sleep(3000)
                            }

                            o = textMatches('去提现|分享文章|去看新闻').visibleToUser().exists()
                            if (o) {
                                back()
                                sleep(2000)

                            }
                            o = textMatches('内容评审计划').visibleToUser().exists()
                            if (o) {
                                o = textMatches('符合').visibleToUser().findOnce();
                                if (o) {
                                    func.clickObject(o);
                                    sleep(1000)
                                }

                                o = textMatches('学到了').visibleToUser().findOnce();
                                if (o) {
                                    func.clickObject(o);
                                    idx++;
                                    sleep(5000)
                                }
                            }
                        }
                        back()
                        sleep(2000)
                        func.toast('本篇已经阅读完成！', 2)
                        if (idx % 5 == 0)
                            func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟', 2)
                        if (idx % 11 == 0) //每看十条刷新一次首页
                            needrefresh = true;
                    }
                }
            }
            func.swipeUp();
            sleep(2000)
            func.swipeUp();
            sleep(2000)
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
        // sign();
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

function closeDialog() {
    o = packageName(package).textMatches('我知道了|继续赚钱|暂时忽略').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(1000);
    }

    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }

    if (packageName(package).textMatches(keys).filter(function (w) { if (w.text() == '点击下载' && w.bounds().bottom > device.height * 0.8) { return false } else { return true } }).visibleToUser().exists()) {
        func.back();
        func.sleep(3000);
    }
}

function refresh() {
    var ii = 7;
    while (ii-- > 0 && !text('个人').visibleToUser().exists()) {
        closeDialog()
        if (currentPackage().toLowerCase() != package.toLowerCase()) {
            func.restart(appname, package)
        }
        if (ii < 5) {
            func.sleep(3200);
            func.back();
        }
        if (ii < 2) {
            func.sleep(3200);
            func.restart(appname, package)
        }

    }
}

function autoRedraw() {
    refresh()
    var ii = 5;
    while (ii-- > 0 && !textMatches('活动|商城').visibleToUser().visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).exists()) {
        o = packageName(package).textMatches('个人').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('活动|商城').visibleToUser().exists() || descMatches('活动|商城').visibleToUser().exists()");
        }
        o = textMatches('活动|商城').visibleToUser().visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).exists()
        if (o) {
            break
        }
        closeDialog()
    }


    var ii = 5;
    while (ii-- > 0 && !textMatches('活动').visibleToUser().visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.7; }).exists()) {
        func.swipeUp()  
        sleep(2000)
    }

    o = textMatches('活动').visibleToUser().visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce()
    if (o) {
        // click(o.bounds().centerX(), o.bounds().centerY() + 150);
        func.clickObject(o)
        func.sleep(10000, '等待中', "idMatches('.*item_activity_detail_contentIv').visibleToUser().exists() ");
    }

    // o = idMatches('.*item_activity_detail_contentIv').visibleToUser().findOnce()
    // if (o) {
    //     func.clickObject(o)
    //     func.sleep(10000, '等待中', "textMatches('去提现').visibleToUser().exists() || descMatches('去提现').visibleToUser().exists()");
    // }
    finds = idMatches('.*item_activity_detail_contentIv').visibleToUser().find()
    if (finds) {
        let child = finds[2];
        if(child){
            func.clickObject(child)
            func.sleep(10000, '等待2', "textMatches('去提现').visibleToUser().exists() || descMatches('去提现').visibleToUser().exists()");
        }else{
            click(device.width*0.5,device.height*0.7)
            func.sleep(10000, '等待2', "textMatches('去提现').visibleToUser().exists() || descMatches('去提现').visibleToUser().exists()");
        }
    }

    sleep(2000)
    o = textMatches(/￥.*\d+/).visibleToUser().visibleToUser().findOnce()
    if(o){
        have_money = o.text().replace('￥', '')
        if(have_money>2){
            o = packageName(package).textMatches('去提现').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                func.sleep(10000, '等待中', "textMatches('提现方式').visibleToUser().exists() || descMatches('提现方式').visibleToUser().exists()");
                sleep(2000)
                o = textMatches('').visibleToUser().visibleToUser().findOnce()
                if(o){
                    x_info = o.bounds().centerX()
                    y_info = o.bounds().centerY()
                    swipe(x_info,y_info,device.width-50,y_info,random(450, 750))
                    sleep(5000)
                }
            }

        }else{
            toast("余额不足")
        }
    }
    back()
    sleep(2000)
    back()
    

}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();


        o = packageName(package).textMatches('继续播放|放弃金币|以后更新|暂不领取|放弃奖励|刷新看看').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }


        // if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        //     func.back();
        //     func.sleep(3000);
        // }

        // o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        // if (o) {
        //     func.clickObject(o);
        //     func.sleep(3000);
        // }

        o = packageName(package).textMatches('我知道了|继续赚钱').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(1000);
        }

        o = packageName(package).textMatches('立即体验').visibleToUser().findOnce();
        if (o) {
            back()
            func.sleep(1000);
        }
        // if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()) {
        //     log("调试信息 趣铃声返回1")
        //     func.back();
        // }

    }, 3000);
}

function get_num() {
    num = -1
    var ii = 5;
    while (ii-- > 0 && num == -1) {
        refresh()
        var ii = 5;
        while (ii-- > 0 && !textMatches('活动|商城').visibleToUser().visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).exists()) {
            o = packageName(package).textMatches('个人').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                func.sleep(10000, '等待中', "textMatches('活动|商城').visibleToUser().exists() || descMatches('活动|商城').visibleToUser().exists()");
            }
            o = textMatches('活动|商城').visibleToUser().visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).exists()
            if (o) {
                break
            }
            closeDialog()
        }


        var ii = 5;
        while (ii-- > 0 && !textMatches('活动').visibleToUser().visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.7; }).exists()) {
            func.swipeUp()
            sleep(2000)
        }

        o = textMatches('活动').visibleToUser().visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce()
        if (o) {
            // click(o.bounds().centerX(), o.bounds().centerY() + 150);
            func.clickObject(o)
            func.sleep(10000, '列表等待中', "idMatches('.*item_activity_detail_contentIv').visibleToUser().exists() ");
        }

        // o = idMatches('.*item_activity_detail_contentIv').visibleToUser().findOnce()
        // if (o) {
        //     func.clickObject(o)
        //     func.sleep(10000, '等待中', "textMatches('去提现').visibleToUser().exists() || descMatches('去提现').visibleToUser().exists()");
        // }
        finds = idMatches('.*item_activity_detail_contentIv').visibleToUser().find()
        if (finds) {
            let child = finds[2];
            if (child) {
                func.clickObject(child)
                func.sleep(10000, '等待2', "textMatches('去提现').visibleToUser().exists() || descMatches('去提现').visibleToUser().exists()");
            } else {
                click(device.width * 0.5, device.height * 0.7)
                func.sleep(10000, '等待2', "textMatches('去提现').visibleToUser().exists() || descMatches('去提现').visibleToUser().exists()");
            }
        }
        sleep(1000)
        o = textMatches('今日评审币').visibleToUser().findOnce();
        if (o) {
            var list = o.parent();
            xy_info = list.bounds()
            bottom_info = xy_info.bottom
            var o = packageName(package).className('android.view.View').visibleToUser().filter(function (w) { return w.bounds().bottom > bottom_info && w.bounds().left > 5; }).findOnce();
            if (o) {
                func.clickObject(o)
                sleep(3000)
                o = packageName(package).className('android.widget.Image').filter(function (w) { return w.bounds().bottom > device.height * 0.5 && w.bounds().left > device.width * 0.3; }).visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o)
                }

            }
        }


        var ii = 5;
        while (ii-- > 0 && !textMatches('邀请好友').visibleToUser().visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).exists()) {
            sleep(500)
            var w = device.width;
            var h = device.height;
            swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
        }
        o = packageName(package).textMatches('.*/10.*').visibleToUser().findOnce();
        if (o) {
            reult_str = o.text()
            var numArr = reult_str.match(/\d+/g)
            num = numArr[numArr.length - 1] - numArr[numArr.length - 2]
        }

        back()
        sleep(3200)
        back()

    }
    return num
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
classModule.start()    


