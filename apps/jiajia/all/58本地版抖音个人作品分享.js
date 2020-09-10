var appname = '58本地版';
const package = 'com.wuba.town.client';
var dyappname = '抖音短视频';
const dypackage = 'com.ss.android.ugc.aweme';

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
classModule.key_word_58="平川"
var keys = '下载|点击重播|点击下载|点击打开|关闭';


classModule.start = function () {
    // 线上 释放    
    key_word_58 = classModule.key_word_58 
    log(key_word_58)

    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes, this.maxMinutes);   //生成运行时间
    func.log(appname, '启动，预计运行：' + minutes, "**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分', 2)
    var startDate = new Date(); //启动时间
    
    // 首先判断是否有关键字
    if(key_word_58 == 0 || !key_word_58){
        log("58没有设置关键字，设置关键字以后再跑")
        return
    }

    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口
    var cfg = func.loadConfig(appname);
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date().toLocaleDateString();
    var have_cope = cfg.have_cope || [];    // 已经保存的
    var have_share = cfg.have_share || [];    // 已经分享到
    var all_cope = cfg.all_cope || [];  
    var watch_num = cfg.watch_num || [];  
    if (lastdate != nowdate) {    //是新的一天
        log("新的一天清空数据")
        have_cope = [];   //已读的为空;
        have_share = []
        watch_num = 0
        lastdate = nowdate;
        cfg.lastdate = lastdate
        cfg.have_cope = have_cope
        cfg.have_share = have_share
        cfg.watch_num = watch_num
        func.saveConfig(appname, JSON.stringify(cfg));
    }
    // 大于500 就删300
    if(all_cope.length>500){
        log("存储太多了开始删除")
        var ii = 300;
        while (ii-- > 0) {
            have_cope.shift()
        }
        cfg.all_cope = all_cope
        func.saveConfig(appname, JSON.stringify(cfg));
    }

    if(have_share.length>130){
        log("今日发布已到上限")
        return
    }else{
        log("本日已发表",have_share.length)
    }




    // if (currentPackage() != package) {
    //     var o = func.execApp(appname, package, 15000, "text('首页').visibleToUser().exists()")
    //     if (!o) {
    //         toast("没有找到" + appname);
    //         thread.interrupt();
    //         minutes = 0;
    //         return; //退出函数
    //     }
    // }




    // return

    func.openWaiting();

    var idx = 1;
    var x = device.width / 2;
    var y = device.height / 2;
    try {
        bol = true
        while (bol) {
            // 抖音
            if(have_cope.length - have_share.length <25){
                log("内存剩余条数",have_cope.length - have_share.length )
                toast("待分享的条数小于25，去粘贴")

                var address_all_key = ["美食","天气","自由行","旅游","网红","城市看点","去哪儿吃","风俗","网红景点","时政","新闻","直播间现场","新鲜事"];
                var address_once_key = address_all_key[Math.round(Math.random()*(address_all_key.length-1))];
                key_word_58 = key_word_58+address_once_key
                log("设置的58关键字是:",key_word_58)
                toast("设置的58关键字是:",key_word_58)
            

                if (currentPackage() != dypackage) {
                    func.clear();
                    sleep(2000)
                    var o = func.execApp(dyappname, dypackage, 15000, "text('我').visibleToUser().exists()")
                    if (!o) {
                        toast("没有找到" + dyappname);
                        log("没有装抖音 58不能跑")
                        thread.interrupt();
                        minutes = 0;
                        return; //退出函数
                    }
                }
                dy_work(key_word_58)
            }else{
                log("粘贴板剩余条数",have_cope.length - have_share.length,"直接执行58" )
                toast("粘贴板剩余条数",have_cope.length - have_share.length,"直接执行58" )
            }


            // 58
            if (currentPackage() != package) {
                func.clear();
                sleep(2000)
                var o = func.execApp(appname, package, 15000, "text('首页').visibleToUser().exists()")
                if (!o) {
                    toast("没有找到" + appname);
                    thread.interrupt();
                    minutes = 0;
                    return; //退出函数
                }
            }

            refresh()
            sign()
            bol = tc_share()
            var idx = 1;
            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000) {
                bol = false;
                func.toast('' + appname + '运行完成', 2)
            }
            else {
                    var idx = 1;
                if (idx % 10 == 0)
                    func.toast('' + appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟', 2)
            }
        }
        if (this.autoR == 0) autoRedraw();
    }
    catch (e) {
        func.log(appname, '循环执行', e.message + '\n\r' + e.stack);
        log(e)
    }
    finally {
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname, '结束时间', "**********************************************************");
    func.quit(package);
}


function dy_work(key_word_58) {
    refresh_dy()

    if (currentPackage() != dypackage) {
        var o = func.execApp(dyappname, dypackage);
    }
    o = packageName(dypackage).textMatches('我').visibleToUser().findOnce()
    if (o) {
        log('已经到达 抖音主页')
    }

    var ii = 5;
    while (ii-- > 0) {
        o = packageName(dypackage).textMatches('推荐').visibleToUser().findOnce()
        if (o) {
            click(device.width * 0.9, o.bounds().centerY())
            func.sleep(10000, '等待中', "textMatches('取消').visibleToUser().exists() || descMatches('取消').visibleToUser().exists()");
        }
        o = textMatches('取消').visibleToUser().findOnce() || descMatches('取消').visibleToUser().findOnce()
        if(o){
            break
        }
    }

    o = className('android.widget.EditText').visibleToUser().visibleToUser().findOnce()
    if(o){
        func.clickObject(o);
        sleep(1000)
        func.clickObject(o);
        sleep(1000)
        o.setText(key_word_58)
        sleep(1000)
        click(device.width * 0.9, device.height * 0.92)
    }

    func.sleep(10000, '等待中', "textMatches('综合|视频').visibleToUser().exists() || descMatches('综合|视频').visibleToUser().exists()");

    o = textMatches('视频').visibleToUser().findOnce() || descMatches('视频').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        sleep(3000)
    }

    var ii = 5;
    while(ii-- > 0){
        o = textMatches('综合排序').visibleToUser().findOnce() || descMatches('综合排序').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            sleep(3000)
        }
        
        
        o = textMatches('综合排序').visibleToUser().findOnce() || descMatches('综合排序').visibleToUser().findOnce()
        if (o) {
            list = o.parent();
            if(list.bounds().bottom == o.bounds().bottom){
                list = o.parent().parent();
            }
            kuandu = list.bounds().bottom - list.bounds().top
            click(o.bounds().centerX(), list.bounds().bottom + kuandu * 2)
            sleep(5000)
        }
        
        o = textMatches('最新发布').visibleToUser().findOnce() || descMatches('最新发布').visibleToUser().findOnce()
        if (o) {
            break
        }
    
        o = textMatches('综合排序|最新发布|取消').visibleToUser().findOnce() || descMatches('综合排序|最新发布|取消').visibleToUser().findOnce()
        if(!o){
            back()
            sleep(3000)
        }
    }
    var ii = 5;
    while(ii-- > 0){
        o = textMatches('发布时间|一天内|半年内').visibleToUser().findOnce() || descMatches('发布时间|一天内|半年内').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            sleep(3000)
        }
        
        
        o = textMatches('发布时间').visibleToUser().findOnce() || descMatches('发布时间').visibleToUser().findOnce()
        if (o) {
            list = o.parent();
            if(list.bounds().bottom == o.bounds().bottom){
                list = o.parent().parent();
            }
            kuandu = list.bounds().bottom - list.bounds().top
            click(o.bounds().centerX(), list.bounds().bottom + kuandu * 3)
            sleep(5000)
        }
        
        o = textMatches('一周内').visibleToUser().findOnce() || descMatches('一周内').visibleToUser().findOnce()
        if (o) {
            break
        }
    
        o = textMatches('综合排序|一周内|取消').visibleToUser().findOnce() || descMatches('综合排序|一周内|取消').visibleToUser().findOnce()
        if(!o){
            back()
            sleep(3000)
        }
    }

    var ii = 5;
    while(ii-- > 0){
        click(device.width * 0.3, device.height * 0.7)
        sleep(3000)
        o = textMatches('视频').visibleToUser().findOnce() || descMatches('视频').visibleToUser().findOnce()
        if(!o){
            break
        }
    }


    sleep(3000)
    dy_copy()



}

function dy_copy() {
    var cfg = func.loadConfig(appname);
    var have_cope = cfg.have_cope || [];    // 已经保存的
    var all_cope = cfg.all_cope || [];   // 所有保存的
    var ii = 200;
    copy_success = 0
    nn = 1
    tt = ""
    while (ii-- > 0) {
        o = textMatches('分享到').visibleToUser().findOnce() || descMatches('分享到').visibleToUser().findOnce()
        if (!o) {
            var o = packageName(dypackage).className('android.widget.FrameLayout').visibleToUser().findOnce();
            if (o) {
                // log(o.bounds().top)
                click(device.width * 0.9, o.bounds().top * 0.78)
                sleep(1000)
            }
        }

        o = textMatches('举报').visibleToUser().findOnce() || descMatches('举报').visibleToUser().findOnce()
        if (o) {
            yy = o.bounds().centerY() - 50
            swipe(device.width - 200, yy, device.width * 0.1, yy, 200);
            sleep(1000)
            o = textMatches('复制链接').visibleToUser().findOnce() || descMatches('复制链接').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o);
                sleep(3000)
                //     log("剪贴板内容为:" + getClip());
                txt = getClip()
                var have_cope = cfg.have_cope || [];    // 已经保存的

                have_title = false
                for(j = 0,len=all_cope.length; j < len; j++) {
                    item = all_cope[j]
                    if (item.indexOf(txt.substr(0,20)) > -1) { 
                        // log(txt.substr(0,20),'跳过+----------------')
                        have_title = true
                        break
                    }
                }
                if (tt == ""){
                    tt = txt
                }
                if(tt == txt){
                    nn += 1
                }
                if(tt !=txt){
                    tt =txt
                    nn = 0
                }
                if(nn>4){
                    log("当前可发布视频极少，请更换相近地点关键词")
                    toast("当前可发布视频极少，请更换相近地点关键词")
                    break
                }


                if(!have_title){
                    have_cope.push(txt);  //保存到今天已阅读
                    all_cope.push(txt); //保存到所有
                    cfg.have_cope = have_cope;
                    cfg.all_cope = all_cope
                    func.saveConfig(appname, JSON.stringify(cfg));
                    copy_success +=1
                    log("成功粘贴的条数是:"+copy_success)
                    toast("成功粘贴的条数是:"+copy_success)
                }else{
                    toast("发表过，该篇复制失败，目前已经复制数量:"+copy_success)
                    // log('阅读过 不保存')
                }
            }
        }
        if(copy_success>25){
            break
        }

        // func.swipeUp()
        var w = device.width;
        var h = device.height;
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
        sleep(2000)
    }

}


function tc_share() {

    var cfg = func.loadConfig(appname);
    var have_cope = cfg.have_cope || [];    // 已经保存的
    var all_cope = cfg.all_cope || [];   // 所有保存的
    var have_share = cfg.have_share || [];    // 已经分享到


    var ii = 50;
    while (ii-- > 0) {
        if (have_cope.length - have_share.length < 3) {

            log(have_cope.length - have_share.length)
            log("可复制不足")
            break
        }

        o = textMatches('去转载').visibleToUser().findOnce() || descMatches('去转载').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            func.sleep(10000, '等待进入转载界面', "textMatches('转载|清除链接').visibleToUser().exists() || descMatches('转载|清除链接').visibleToUser().exists()");
        }
        o = textMatches('清除链接').visibleToUser().findOnce() || descMatches('清除链接').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            sleep(1000)
        }
        o = className('android.widget.EditText').visibleToUser().visibleToUser().findOnce()
        if (o) {
            for (j = 0, len = have_cope.length; j < len; j++) {
                txt = have_cope[j]
                if (have_share.join().indexOf(txt) < 0) {
                    break
                }
            }
            if (txt) {
                o.setText(txt)
                sleep(1000)
                p = textMatches('转载').visibleToUser().findOnce() || descMatches('转载').visibleToUser().findOnce()
                if (p) {
                    func.clickObject(p);
                    have_share.push(txt);  //保存到今天已阅读
                    cfg.have_share = have_share;
                    func.saveConfig(appname, JSON.stringify(cfg));
                    func.sleep(15000, '等待中', "textMatches('我的内容').visibleToUser().exists() || descMatches('我的内容').visibleToUser().exists()");
                }
            }
        }

        o = textMatches('我的内容').visibleToUser().findOnce() || descMatches('我的内容').visibleToUser().findOnce()
        if (o) {
            back()
            func.sleep(15000, '等待下一次转发');

        }
        if(have_share.length>130){
            log("今日发布已到上限")
            return false
        }

    }
    return true

}


function closeDialog() {
    o = textMatches('继续观看').visibleToUser().findOnce();
    if (o) {
        var list = o.parent();
        child = list.child(0);
        func.clickObject(child);
        sleep(2000)
    }

    o = textMatches('打开看看|好友推荐').visibleToUser().findOnce();
    if (o) {
        back()
        sleep(2000)
    }

    o = textMatches('以后再说|我知道了|暂不切换').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        sleep(2000)
    }


    var o = textMatches('关闭广告|我知道了|关闭').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
    }
    var o = textMatches('继续赚钱').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
        var o = textMatches('分享热文|分享赚钱|本地影响力').visibleToUser().findOnce();
        if (o) {
            back()
            func.sleep(2000);
        }
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
// closeDialog()


function autoRedraw() {
    toast("开始提现")
    refresh()
    var o = packageName(package).textMatches('我的').visibleToUser().findOne(3000);
    if (o) {
        func.clickObject(o)
        func.sleep(15000, '等待中', "textMatches('零钱余额.*|金币余额').visibleToUser().exists() || descMatches('零钱余额.*|金币余额').visibleToUser().exists()");
        money = 0
        o = textMatches('零钱余额.*').visibleToUser().findOnce();
        if (o) {
            var list = o.parent();
            child = list.child(0)
            money = child.text()
        }
        goldnum = 0
        o = textMatches('金币余额.*').visibleToUser().findOnce();
        if (o) {
            var list = o.parent();
            child = list.child(0)
            goldnum = child.text()
        }
        log("拥有的金额是:", money)
        log("今日跑的币数:", goldnum)
        if(money<1){
            toast("余额不足")
            return
        }
        o = textMatches('零钱余额.*|金币余额').visibleToUser().findOnce() || descMatches('零钱余额.*|金币余额').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o)
            func.sleep(15000, '等待中', "textMatches('立即提现').visibleToUser().exists() || descMatches('立即提现').visibleToUser().exists()");
    
            o = textMatches('立即提现').visibleToUser().findOnce() || descMatches('立即提现').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o)
                func.sleep(15000, '等待中', "textMatches('确认提现').visibleToUser().exists() || descMatches('确认提现').visibleToUser().exists()");
    
                // o = textMatches('去绑定收款微信账号').visibleToUser().findOnce() || descMatches('去绑定收款微信账号').visibleToUser().findOnce()
                // if (o) {
                //     func.clickObject(o)
                //     console.log("清先绑定微信号");
                //     func.sleep(15000, '授权中1...', "textMatches('同意').visibleToUser().exists() || descMatches('同意').visibleToUser().exists()");
                //     o = textMatches('同意').visibleToUser().findOnce() || descMatches('同意').visibleToUser().findOnce()
                //     if (o) {
                //         func.clickObject(o)
                //         func.sleep(10000, '授权中2....')
                //     }
                // }
                o = textMatches('1').visibleToUser().findOnce() || descMatches('1').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o)
                    sleep(3000)
                }
                o = textMatches('确认提现').visibleToUser().findOnce() || descMatches('确认提现').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o)
                    sleep(3000)
                }
    
                o = textMatches('提现申请成功').visibleToUser().findOnce() || descMatches('提现申请成功').visibleToUser().findOnce()
                if (o) {
                    console.log("提现成功");
                    
                }
    
            }
        }
    }
    
}

function sign() {
    refresh()
    var ii = 5;
    while (ii-- > 0) {
        o = textMatches('去签到|赚钱').visibleToUser().findOnce() || descMatches('去签到|赚钱').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            func.sleep(15000, '等待中', "textMatches('分享到朋友圈|兑换提现').visibleToUser().exists() || descMatches('分享到朋友圈|兑换提现').visibleToUser().exists()");
        }
        o = textMatches('分享到朋友圈|兑换提现').visibleToUser().findOnce() || descMatches('分享到朋友圈|兑换提现').visibleToUser().findOnce()
        if(o){
            break
        }
    }
    o = textMatches('分享到朋友圈').visibleToUser().findOnce() || descMatches('分享到朋友圈').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(15000, '等待中', "textMatches('发表').visibleToUser().exists() ");
        sleep(1000)
        back()
        func.sleep(10000, '等待中', "textMatches('观看视频再.*金币').visibleToUser().exists() ");
        sleep(1000)
        o = textMatches('观看视频再.*金币').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            func.sleep(60000, '签到视频翻倍中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            sleep(3000)
            closeDialog();
            sleep(3000)
            closeDialog()
        }
    
    }

    var ii = 10;
    while(ii-- > 0){
        var cfg = func.loadConfig(appname);
        var watch_num = cfg.watch_num || 0;  
        log("观看广告次数是:",watch_num)
        if(watch_num>7){
            log("今日广告已经看超过8次")
            closeDialog()
            break
        }
        o = textMatches('看视频').visibleToUser().findOnce() || descMatches('继续赚钱|看视频').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog()
            watch_num = watch_num+1
            cfg.watch_num = watch_num
            func.saveConfig(appname, JSON.stringify(cfg));
            sleep(3000)
        }
        func.sleep(10000, '判断是否还看', "textMatches('继续赚钱').visibleToUser().exists() || descMatches('继续赚钱').visibleToUser().exists()");

        o = textMatches('继续观看').visibleToUser().findOnce() || descMatches('继续观看').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog()
            watch_num = watch_num+1
            cfg.watch_num = watch_num
            func.saveConfig(appname, JSON.stringify(cfg));
            sleep(3000)
        }else{
            closeDialog()
            cfg.watch_num = 8
            func.saveConfig(appname, JSON.stringify(cfg));
            sleep(3000)
            break
        }

        o = textMatches('继续观看').visibleToUser().findOnce() || descMatches('继续观看').visibleToUser().findOnce()
        if (o) {
            closeDialog()
            cfg.watch_num = 8
            func.saveConfig(appname, JSON.stringify(cfg));
            sleep(3000)
            break
        }
    }



    var ii = 5;
    while (ii-- > 0) {
        o = textMatches('去发布').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.9; }).findOnce();
        if(!o){
            func.swipeUp()  
            sleep(3000)
        }
        o = textMatches('去发布').visibleToUser().findOnce() || descMatches('去发布').visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
            func.sleep(10000, '等待进入发布页面中', "textMatches('去转载').visibleToUser().exists() || descMatches('去转载').visibleToUser().exists()");
        }
        o = textMatches('去转载').visibleToUser().findOnce() || descMatches('去转载').visibleToUser().findOnce()
        if(o){
            break
        }
    }

}

// sign()

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

function refresh(){
    var ii = 7;
    while(ii-- > 0 && !textMatches('我的').visibleToUser().exists()){
        closeDialog()
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

    }
}

function refresh_dy(){
    var ii = 7;
    while(ii-- > 0 && !textMatches('我').visibleToUser().exists()){
        closeDialog()
        if (currentPackage().toLowerCase() != dypackage.toLowerCase()) {
            func.restart(dyappname, dypackage)
        }
        if(ii<5){
            func.back();
            func.sleep(3200);

        }
        if(ii<2){
            func.sleep(3200);
            func.restart(appname, package)
        }

    }
}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();

        // if (packageName(package).idMatches('unsdk_play_global').visibleToUser().exists()) {
        //     func.back();
        //     func.sleep(2000);
        // }
        // if (packageName(package).textMatches('点击重播|点击下载|恭喜获得.*').filter(function (w) { if (w.text() == '点击下载' && w.bounds().bottom > device.height * 0.8) { return false } else { return true } }).visibleToUser().exists()) {
        //     func.back();
        // }
        // var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        // if (o) {
        //     if (!packageName(package).textMatches('*看视频.*').visibleToUser().exists()) {
        //         func.clickObject(o);
        //     }

        // }
        // 更新
        var o = idMatches(package + ':id/.*close_btn.*').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
        }

        o = textMatches('打开看看|好友推荐').visibleToUser().findOnce();
        if (o) {
            back()
            sleep(2000)
        }
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            if(!o.id() == 'com.wuba.town.client:id/feed_back_close'){
                func.clickObject(o);
            }
        }
        o = textMatches('以后再说|我知道了|暂不切换').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(2000)
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



