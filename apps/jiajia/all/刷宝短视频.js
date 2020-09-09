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
    // minutes = 1
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
// 

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
                        if (goldnum.text() > 27300) {
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
        log(e)
    }
    finally {
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname, '结束时间', "**********************************************************");
    func.quit(package);
}



function refresh(){
    var ii = 7;
    while(ii-- > 0 && !textMatches('我').visibleToUser().exists()){
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
            if (mygoldnum >= 6666 || mymoney >= 0.3) {
                func.clickObject(money);
                sleep(3000)
                func.sleep(10000, '等待中', "textMatches('立即提现').visibleToUser().exists() || descMatches('立即提现').visibleToUser().exists()");
                sleep(2000)
                o = packageName(package).text('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() < device.height / 2; }).findOnce() || packageName(package).desc('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() < device.height / 2; }).findOnce();
                if (o) {
                    func.clickObject(o);
                    sleep(3000)
                    // toastLog("第一个提现  点击完成")
                    func.sleep(10000, '等待中', "textMatches('活动提现').visibleToUser().exists() || descMatches('活动提现').visibleToUser().exists()");
                    sleep(2000)
                    // var finds = packageName(package).className('android.view.View').depth(15).visibleToUser().find();
                    // if (finds) {
                    //     func.clickObject(finds[1])
                    // }
                    closeDialog()


                    // 显示金额用
                    o = textMatches('可提现金额.*').visibleToUser().findOnce();
                    if (o) {
                        var list = o.parent();
                        if(list.childCount()>1){
                            mymoney = list.child(1).text()
                        }
                    }
                    // 显示金额用
                    // toast("开校验趣步....")
                    // o = textMatches('限时抢').visibleToUser().findOnce() || descMatches('限时抢').visibleToUser().findOnce()
                    // if (o) {
                    //     func.clickObject(o)
                    //     func.sleep(10000, '等待中', "textMatches('打开赚步App|立即下载提现|已完成|已提现').visibleToUser().exists() || descMatches('打开赚步App|立即下载提现|已完成|已提现').visibleToUser().exists()");
                    //     o = textMatches('立即下载提现').visibleToUser().findOnce() || descMatches('立即下载提现').visibleToUser().findOnce()
                    //     if(!o){
                    //         o = textMatches('已提现').visibleToUser().findOnce() || descMatches('已提现').visibleToUser().findOnce()
                    //         if(!o){
                    //             sign_day = 0
                    //             o = textMatches('成功打开并连续.*').visibleToUser().findOnce() || descMatches('成功打开并连续.*').visibleToUser().findOnce()
                    //             if(o){
                    //                 reult_str = o.text()
                    //                 if(reult_str.match(/\d+/g).length>2){
                    //                     var numArr = reult_str.match(/\d+/g)
                    //                     sign_day = numArr[1]
                    //                 }
                    //             }
                        
                    //             log("趣步3天提现:已打开"+ sign_day + "/3天 " + " 金额: " +  mymoney)
                    //             o = textMatches('打开赚步App').visibleToUser().findOnce() || descMatches('打开赚步App').visibleToUser().findOnce()
                    //             if (o) {
                    //                 func.clickObject(o)
                    //                 sleep(5000)
                    //                 o = textMatches('.*允许.*').visibleToUser().clickable(true).filter(function (w) { return w.packageName() != package }).findOnce() 
                    //                 if (o) {
                    //                     func.clickObject(o)
                    //                 }
                    //                 func.sleep(15000, '等待中', "textMatches('返回').visibleToUser().exists() || descMatches('返回').visibleToUser().exists()");
                    //                 sleep(3000)
                    //                 o = textMatches('返回').visibleToUser().findOnce() || descMatches('返回').visibleToUser().findOnce()
                    //                 if (o) {
                    //                     func.clickObject(o)
                    //                     func.sleep(15000, '等待中', "textMatches('活动提现').visibleToUser().exists() || descMatches('活动提现').visibleToUser().exists()");
                    //                 } else {
                    //                     refresh()
                    //                     var o = packageName(package).text('我').visibleToUser().findOnce();
                    //                     if (o) {
                    //                         func.clickObject(o)
                    //                         func.sleep(10000, '等待中', "textMatches('我的视频').visibleToUser().exists() || descMatches('我的视频').visibleToUser().exists()")
                    //                         sleep(2500)
                    //                         var money = id(package + ':id/tv_mine_money').visibleToUser().findOnce();
                    //                         if (money) {
                    //                             func.clickObject(money)
                    //                             sleep(3000)
                    //                             func.sleep(10000, '等待中', "textMatches('立即提现').visibleToUser().exists() || descMatches('立即提现').visibleToUser().exists()");
                    //                             sleep(2000)
                    //                             o = packageName(package).text('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() < device.height / 2; }).findOnce() || packageName(package).desc('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() < device.height / 2; }).findOnce();
                    //                             if (o) {
                    //                                 func.clickObject(o);
                    //                                 sleep(3000)
                    //                                 func.sleep(10000, '等待中', "textMatches('活动提现').visibleToUser().exists() || descMatches('活动提现').visibleToUser().exists()");
                    //                             }
                    //                         }
                    //                     }
                    //                 }
        
                    //             }
                    //             func.sleep(1000);
                                
                    //             var btn = packageName(package).text('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() > device.height / 2; }).findOne(15000) || packageName(package).desc('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() > device.height / 2; }).findOnce();
                    //             if(btn){
                    //                 o = textMatches('.*1/3.*|.*2/3.*').visibleToUser().findOnce() || descMatches('.*1/3.*|.*2/3.*').visibleToUser().findOnce()
                    //                 if(!o){
                    //                     func.clickObject(btn);
                    //                     // func.sleep(4000);
                    //                     func.sleep(10000, '等待微信授权中', "textMatches('同意').visibleToUser().exists() || descMatches('同意').visibleToUser().exists()");
                    //                     var agree = text('同意').visibleToUser().findOnce();
                    //                     if (agree) {
                    //                         func.clickObject(agree);
                    //                         func.sleep(2000);
                    //                     }
                    //                     func.sleep(10000, '等待中', "textMatches('提现详情').visibleToUser().exists() || descMatches('提现详情').visibleToUser().exists()");
                    //                     var zz = text('提现详情').visibleToUser().findOnce();
                    //                     if (zz) {
                    //                         func.back();
                    //                         func.sleep(2000);
                    //                     }
                    //                 }else{
                    //                     toast("连续登陆天数不够")
                    //                 }
                    //             }
                    //         }else{
                    //             log("趣步3天提现:今日已经提现")
                    //         }

                    //     }else{
                    //         log("趣步3天提现:缺少趣步APP")
                    //     }
                    // }
                    // toastLog("等待第二个提现完成  点击完成")
                    // 开始操作提现
                    //  开始1元提现
                    // exit()
                    if (mymoney >= 1) {
                        var o = packageName(package).text('¥1.00元').visibleToUser().findOne(10000) || packageName(package).desc('¥1.00元').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                            func.sleep(1000);
                            o = textMatches('.*还需要连续.*').visibleToUser().findOnce() || descMatches('.*还需要连续.*').visibleToUser().findOnce()
                            if (o) {
                                // log(o.text())
                                sign_day1 = o.text().indexOf('还需要连续签到0天') !== -1
                                sign_day2 = o.text().indexOf('还需要连续登录0天') !== -1
                                sign_day = 0 
                                o = textMatches('.*还需要连续.*').visibleToUser().findOnce() || descMatches('.*还需要连续.*').visibleToUser().findOnce()
                                if(o){
                                    reult_str = o.text()
                                    if(reult_str.match(/\d+/g).length>2){
                                        var numArr = reult_str.match(/\d+/g)
                                        sign_day = numArr[reult_str.match(/\d+/g).length-1]
                                        sign_day = 5 - sign_day
                                    }
                                }
                                log("1元提现:已经签到"+ sign_day + "/5天 " + " 金额: " +  mymoney)

                                // log(sign_day)
                                if (sign_day1 || sign_day2) {
                                    toast("开始1元提现操作")
                                    var btn = packageName(package).text('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() > device.height / 2; }).findOne(15000) || packageName(package).desc('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() > device.height / 2; }).findOnce();
                                    func.clickObject(btn);
                                    func.sleep(10000, '等待微信授权中', "textMatches('同意').visibleToUser().exists() || descMatches('同意').visibleToUser().exists()");
                                    var agree = text('同意').visibleToUser().findOne();
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
                                }else{
                                    toast("签到不够")
                                }
                            }

                        }
                    }else{
                        log('不足1元提现,' + "金额: " +  mymoney )
                    }
                    if (mygoldnum >= 6666) {
                        log("每日6666金币已跑:"+ mygoldnum  + " 金额: " +  mymoney)
                        var o = packageName(package).textMatches('每日可提|仅当日有效').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                            func.sleep(1000);
                            o = textMatches('.*今日已使用.*').visibleToUser().findOnce() || descMatches('.*今日已使用.*').visibleToUser().findOnce()
                            if(!o){
                                var btn = packageName(package).text('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() > device.height / 2; }).findOne(15000) || packageName(package).desc('立即提现').visibleToUser().filter(function (w) { return w.bounds().centerY() > device.height / 2; }).findOnce();
                                func.clickObject(btn);
                                func.sleep(10000, '等待微信授权中', "textMatches('同意').visibleToUser().exists() || descMatches('同意').visibleToUser().exists()");
                                var agree = text('同意').visibleToUser().findOnce();
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
                            }else{
                                toast("今日已提现")
                            }
                        }
                    }else{
                        log("每日6666金币已跑:"+ mygoldnum  + " 金额: " +  mymoney)
                    }




                } else {
                    toast("提现条件不满足")
                }

            }else{
                log("金币:" + mygoldnum+" 余额:" + mymoney +" 不满足提现")
            }
        }
    }
}
function closeDialog(){

    o = textMatches('登录支付宝可提现.*').visibleToUser().findOnce() || descMatches('登录支付宝可提现.*').visibleToUser().findOnce()
    if (o) {
        var list = o.parent();
        log(device.width*0.5,list.bounds().bottom)
        click(device.width*0.5,list.bounds().bottom+100)
        sleep(3000)
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


// closeDialog()



function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        o = packageName(package).textMatches('我知道了|放弃奖励|继续看视频领取').visibleToUser().findOnce()
        if (o){
            p = textMatches('.*允许.*').visibleToUser().clickable(true).filter(function (w) { return w.packageName() != package }).findOnce()
            if(!p){
                func.clickObject(o);
                func.sleep(1000);
            } 
            // log(1)
            // log(o)

        }
        
        

        var o = idMatches(package + ':id/(.*Close.*|.*close.*)').visibleToUser().findOnce() || textMatches('继续看视频领取').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            // log(2)
            // log(o)
        }

        if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()) {
            // log(3)
            // log(o)
            // log(11111)
            func.back();
            func.sleep(1000);
        }

        o = textMatches('邀请好友可立即提现').visibleToUser().findOnce();
        if (o) {
            log(4)
            // log(o)
            func.clickObject(o.parent().child(0))
            sleep(5000)
            var o = idMatches('.*btn_back').visibleToUser().findOnce()
            if(o){
                back()
            }
        }

        if (text('去邀请').visibleToUser().exists()) {
            // log(5)
            // log(o)
            sleep(1000)
            p = textMatches('我的钱包').visibleToUser().findOnce();
            if (!p) {
                func.back();
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