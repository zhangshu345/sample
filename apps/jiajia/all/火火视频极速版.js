const appname = '火火视频极速版';
const package = 'com.jt.hanhan.video';

var classModule = {};
classModule.minMinutes = 10;
classModule.maxMinutes = 20;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
classModule.func = null;


var keys = '点击重播|点击下载|领取福利|下载.*得.*|已连续签到.*'



classModule.start = function () {
    s_tt = new Date()
log(appname,'---开始---'  + s_tt.getHours() + ':' + s_tt.getMinutes() + ':' + s_tt.getSeconds());
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes, this.maxMinutes);   //生成运行时间
    // var minutes = 2
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
    sign();
    // log("调试信息 签到完毕")
    func.openWaiting(['.FrameLayout', '.SplashActivity'])
    try {
        var idx = 1;
        var bol = true;
        var trys = 0;
        while (bol) {
            // log("调试信息 开始")
            // o = packageName(package).textMatches('小视频').visibleToUser().findOnce() 
            // if (o){
            //     func.clickObject(o);
            // }
            var ii = 5;
            while (ii-- > 0) {

                x = packageName(package).textMatches('首页').visibleToUser().findOnce()
                y = packageName(package).textMatches('刷新').visibleToUser().findOnce()
                if (x && y) {
                    break
                }
                closeDialog()
                o = packageName(package).textMatches('小视频').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o);
                }
                if (ii < 3) {
                    back()
                }
            }


            func.checkSpace();  //检测一次存储空间
            if (text('观看历史').visibleToUser().exists()) {
                this.func.back();
                this.func.sleep(2000);
            }
            if (text('勋章殿堂').visibleToUser().exists()) {
                back();
                this.func.sleep(3000);
            }

            // if (packageName(package).textMatches('勋章殿堂|邀请好友|累计看.*视频|观看.*分钟视频|' + keys).visibleToUser().exists() || packageName(package).descMatches('累计看.*视频|观看.*分钟视频|' + keys).visibleToUser().exists()) {
            //     func.back();
            //     this.func.sleep(2000);
            // }


            o = packageName(package).textMatches(' *金蛋大奖 *').visibleToUser().findOnce() || packageName(package).descMatches(' *金蛋大奖 *').visibleToUser().findOnce();
            if (o) {
                this.func.clickObject(o);
                this.func.sleep(3000);

                // if (classModule.noAd != 1){
                // log("调试信息 砸金蛋")
                o = packageName(package).textMatches('看视频再送[0-9]*金币').visibleToUser().findOnce() || packageName(package).descMatches('看视频再送[0-9]*金币').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);

                    // func.sleep(60000,'看视频领金币中',"idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "|已连续签到.*').visibleToUser().exists() || packageName('" + package + "').descMatches('" + keys + "|已连续签到.*').visibleToUser().exists()");
                    func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('已连续签到.*|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    sleep(3000)
                    closeDialog();
                }
            }
            o = packageName(package).textMatches('赚钱小技巧').visibleToUser().findOnce()
            if (o) {
                back()
                sleep(1000)
            }
            // pickCoin()

            // this.func.swipeUp();
            // this.func.sleep(1000);
            var c = random(8000, 13000)
            // var c = random(3000, 5000)
            // sleep(c)
            func.sleep(c, '视频观看中....')
            w = device.width;
            h = device.height;
            swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
            
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
    }
    catch (e) {
        log(e.message + '\n\r' + e.stack)
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
    while (ii-- > 0 && !textMatches('首页|刷新').visibleToUser().exists()) {
        func.back();
        func.sleep(2300);
    }

    var o1 = packageName(package).textMatches('首页|刷新').visibleToUser().findOne(5000);
    o = packageName(package).textMatches('任务|领取红包|看视频[0-9 :]+').visibleToUser().findOnce() || packageName(package).textMatches(/\d+:\d+/).visibleToUser().filter(function (w) { return w.bounds().centerY() > o1.bounds().top }).findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(4000);

        // pickMetal();

        ii = 3;
        do {
            scrollUp();
            func.sleep(300);
        }
        while (ii-- > 0)

        /*if (packageName(package).text('金币翻倍').visibleToUser().exists() || packageName(package).desc('金币翻倍').visibleToUser().exists()){
            o = className('ImageView').visibleToUser().findOnce();
            func.clickObject(o);
            func.sleep(2000);
        }*/

        o = textMatches('约[0-9.]+元').visibleToUser().findOne(5000) || descMatches('约[0-9.]+元').visibleToUser().findOnce();
        var mycoin = 0;
        if (o) {
            mycoin = Number(o.text().replace('约', '').replace('元', '')) || 0
        }
        if (mycoin >= 0.3) {
            o = packageName(package).textMatches('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();
            func.clickObject(o);
            func.sleep(3000);

            o = packageName(package).textMatches('金币说明|选择提现金额').visibleToUser().findOne(60000) || packageName(package).descMatches('金币说明|选择提现金额').visibleToUser().findOnce();;
            func.sleep(2000);
            var btn = packageName(package).text('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();;
            if (o && btn) {
                var btns = textMatches('[0-9. 元]+').visibleToUser().filter(function (w) { return w && w.text().trim() != '元' && w.text().trim() != '' && w.bounds().centerY() > o.bounds().bottom && (Number(w.text().replace('元', '').trim()) || 0) <= mycoin; }).find();
                if (btns.length == 0)
                    btns = descMatches('[0-9. 元]+').visibleToUser().filter(function (w) { return w && w.desc().trim() != '元' && w.desc().trim() != '' && w.bounds().centerY() > o.bounds().bottom && (Number(w.desc().replace('元', '').trim()) || 0) <= mycoin; }).find();
                for (var i = btns.length - 1; i >= 0; i--) {
                    func.clickObject(btns[i]);
                    func.sleep(1000);

                    o = text('立即提现').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(3000);
                    }
                }
            }
        }
        else {
            func.toast('余额不足，不能提现', 1);
        }
    }
}
function pickMetal() {
    if (classModule.noAd != 1) {
        o = null, ii = 3;
        do {
            o = text('勋章殿堂').visibleToUser().findOnce();
            if (o) {
                break;
            }
            else {
                scrollDown();
                func.sleep(2000);
            }
        }
        while (ii-- > 0)

        o = text('勋章殿堂').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);

            o = textMatches('今日挑战|日积月累').visibleToUser().findOne(8000) || descMatches('今日挑战|日积月累').visibleToUser().findOnce()
            if (o) {
                ii = 15;
                do {
                    o = text('可领取').visibleToUser().filter(function (w) { return w.bounds().height() > 3 }).findOnce() || desc('可领取').visibleToUser().filter(function (w) { return w.bounds().height() > 3 }).findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(4000)
                        if (!text('可领取').visibleToUser().filter(function (w) { return w.bounds().height() > 3 }).findOnce() || desc('可领取').visibleToUser().filter(function (w) { return w.bounds().height() > 3 }).exists()) {
                            func.sleep(60000, '勋章殿堂领取中', "idMatches('.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                            sleep(3000)
                            closeDialog();
                        }

                        o = text('确定').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                            func.sleep(2000);
                        }
                    }
                    else {
                        if (scrollDown())
                            func.sleep(2000);
                        else
                            break;
                    }
                }
                while (ii-- > 0)
                func.back();
                func.sleep(2000);
            }
            func.sleep(2000);
        }
    }
}

function pickCoin() {
    if (classModule.noAd == 1) return;
    var o = packageName(package).textMatches('奖励|领取红包').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(4000);

        o = packageName(package).textMatches('金币翻倍|领取').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "|已连续签到.*').visibleToUser().exists() || packageName('" + package + "').descMatches('" + keys + "|已连续签到.*').visibleToUser().exists()");
            closeDialog();
        }


        var ii = 5;
        while (ii-- > 0) {
            o = packageName(package).textMatches('看视频红包|金币翻倍|领红包|领金币|领取').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                func.sleep(2000);
                o = text('看视频即可打开').visibleToUser().findOnce() || text('看视频即可打开').visibleToUser().findOnce();
                if (o) {
                    o = o.parent().child(o.indexInParent() - 1);
                    func.clickObject(o);
                    func.sleep(2000)
                }
                func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "|已连续签到.*').visibleToUser().exists() || packageName('" + package + "').descMatches('" + keys + "|已连续签到.*').visibleToUser().exists()");
                closeDialog();
                func.sleep(2000);
            }
            else {
                break;
            }
        }

        o = packageName(package).text('首页').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
        }
    }
}

function sign() {
    try {
        closeDialog()
        o = packageName(package).textMatches('任务|领取红包|看视频[ 0-9:]+').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('勋章殿堂|我的金币|金币翻倍|即可开启').visibleToUser().exists() || descMatches('勋章殿堂|我的金币|金币翻倍').visibleToUser().exists()");
            closeDialog()
            sleep(3000)
            // toast("任务四:刮分金币")
            // o =  textMatches('连续7天未登录您的金币会被瓜分').visibleToUser().findOnce();
            // if (o){
            //     func.clickObject(o);
            //     func.sleep(4000);
            //     if (text('限时瓜分金币').visibleToUser().exists()){
            //         var n = 5;
            //         while (n-- > 0) {
            //             var o = packageName(package).className('android.view.View').visibleToUser().filter(
            //                 function (w) {
            //                     return w.clickable() == true;
            //                 }
            //             ).findOnce()
            //             if (o) {
            //                 func.clickObject(o);
            //                 func.sleep(3000);
            //                 func.sleep(60000, "瓜分金币领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            //                 sleep(3000)
            //                 closeDialog()
            //                 sleep(3000)
            //                 closeDialog()
            //                 sleep(3000)
            //             }
            //         }
            //         func.back();
            //         func.sleep(2000);
            //     }
            // }



            toast("任务一:签到翻倍")
            o = textMatches('金币翻倍').visibleToUser().findOne(1000);
            if (o) {
                func.clickObject(o);
                func.sleep(3000);
                func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                func.sleep(3000);
                closeDialog()
                sleep(3000)
                closeDialog()
            }
            closeDialog()
            sleep(3000)
            // log("调试信息 火火视频 签到完毕")
            // toast("任务二:阶段领取翻倍")
            // o = textMatches('领取').visibleToUser().findOnce();
            // if (o) {
            //     func.clickObject(o);
            //     func.sleep(2000);
            //     func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            //     func.sleep(3000);
            //     closeDialog()
            //     sleep(5000)
            //     closeDialog()
            // } else {
            //     toast("没可领取的视屏红包")
            // }
            // log("调试信息 火火视频 领取完毕")
            // sleep(3000)
            // ii = 3;
            // toast("任务三:领红包视频")
            // while (ii-- > 0) {
            //     o = textMatches('领红包').visibleToUser().findOnce();
            //     if (o) {
            //         func.clickObject(o);
            //         func.sleep(2000);
            //         o = packageName(package).textMatches('看视频即可打开').visibleToUser().findOnce()
            //         if (o) {
            //             finds = packageName(package).className('ImageView').visibleToUser().find()
            //             if (finds) {
            //                 child = finds[finds.length - 1]
            //                 func.clickObject(child)
            //             }
            //         }
            //         func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            //         func.sleep(3000);
            //         closeDialog()
            //         sleep(3000)
            //         closeDialog()
            //     }
            // }
            // sleep(3000)

            // log("调试信息 火火视频 瓜分完毕")
            // var ii = 5;
            // while(ii-- > 0 ){
            //     o = text('勋章殿堂').visibleToUser().filter(function(w){return w.bounds().bottom < device.height * 0.85;}).findOnce();
            //     if (!o){
            //         func.swipeUp(0,0,random(301,330));
            //         func.sleep(2000);
            //     }else{
            //         break
            //     }
            // }
            // o =  textMatches('勋章殿堂').visibleToUser().findOne(3000) || descMatches('勋章殿堂').visibleToUser().findOnce();
            // if (o){
            //     func.clickObject(o);
            //     func.sleep(4000);
            //     if (textMatches('待领取勋章|今日挑战').visibleToUser().exists() || descMatches('待领取勋章|今日挑战').visibleToUser().exists()){
            //         o = packageName(package).textMatches('可领取').visibleToUser().findOnce() || packageName(package).descMatches('可领取').visibleToUser().findOnce();
            //         if (o){
            //             func.clickObject(o);
            //             func.sleep(2000);
            //             func.sleep(60000,"勋章殿堂领取中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').visibleToUser().exists()")     
            //             closeDialog();
            //             func.sleep(4000);
            //             closeDialog();
            //             func.sleep(2000);
            //         }
            //     }
            //     func.back();
            //     func.sleep(2000);
            // }
            // log("调试信息 火火视频 勋章殿堂完毕")

        }
        o  = packageName(package).text('小视频').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }

    }
    catch (e) {
        func.log(appname, '领币', e.message + '\n\r' + e.stack)
    }
}

function closeDialog() {
    // o = packageName(package).textMatches('.*恭喜获得.*|.*您又赚了.*').visibleToUser().findOnce()
    // if (o) {
    //     sleep(5000)
    //     var ii = 5;
    //     while(ii-- > 0 && textMatches('.*恭喜获得.*|.*您又赚了.*').visibleToUser().exists()){
    //         finds = packageName(package).className('FrameLayout').visibleToUser().find()
    //         if (finds) {
    //             if (finds.length < 5) {
    //                 child = finds[finds.length - 1]
    //                 func.clickObject(child)
    //             } else {
    //                 child = finds[2]
    //                 func.clickObject(child)
    //             }
    //         }
    //         sleep(2000)
    //     }
    // }
    o = packageName(package).textMatches('.*恭喜获得.*|.*您又赚了.*').visibleToUser().findOnce()
    if (o) {
        sleep(3000)
        o = packageName(package).textMatches('.*恭喜获得.*|.*您又赚了.*').visibleToUser().findOnce()
        if(o){
            var list = o.parent().bounds();
            // p = packageName(package).boundsInside(list.left,list.top,list.right,list.bottom).className('FrameLayout').visibleToUser().findOnce()
            p = packageName(package).boundsInside(list.left,list.top,list.right,device.height/2).className('FrameLayout').visibleToUser().findOnce()
            if(p){
                func.clickObject(p);
            }
        }

    }


    


    // if (packageName(package).textMatches(keys).visibleToUser().exists() || packageName(package).descMatches(keys).visibleToUser().exists()) {
    //     func.back();
    //     func.sleep(5000);
    // }


    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }


    o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(5000);
    }

    o = packageName(package).textMatches('看视频即可打开').visibleToUser().findOnce()
    if (o) {
        finds = packageName(package).className('ImageView').visibleToUser().find()
        if (finds.length > 1) {
            child = finds[finds.length - 2]
            func.clickObject(child)
        } else {
            child = finds[finds.length - 1]
            func.clickObject(child)
        }
    }


    o = packageName(package).textMatches('即可开启').visibleToUser().findOnce()
    if (o) {
        finds = packageName(package).className('ImageView').visibleToUser().find()
        if (finds.length > 1) {
            child = finds[finds.length - 2]
            func.clickObject(child)
        } else {
            child = finds[finds.length - 1]
            func.clickObject(child)
        }
    }

    o = packageName(package).textMatches('我的零钱').visibleToUser().findOnce()
    if (o) {
        finds = packageName(package).className('ImageView').visibleToUser().find()
        if (finds) {
            child = finds[finds.length - 1]
            func.clickObject(child)
        }
    }
    

    // o = textMatches('立即查看|立即去提现').visibleToUser().findOnce();
    // if (o){
    //     o = className('ImageView').visibleToUser().findOnce();
    //     if (o){
    //         func.clickObject(o);
    //     }
    // }
    
    o = packageName(package).textMatches('间隔时间太短').visibleToUser().findOnce()
    if (o) {
        p = packageName(package).textMatches('确定').visibleToUser().find()
        if (p) {
            func.clickObject(p)
        }
    }


}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();

        o = packageName(package).textMatches('.*恭喜获得.*|.*您又赚了.*').visibleToUser().findOnce()
        if (o) {
            toast("关闭11")
            sleep(3000)
            o = packageName(package).textMatches('.*恭喜获得.*|.*您又赚了.*').visibleToUser().findOnce()
            if(o){
                var list = o.parent().bounds();
                // p = packageName(package).boundsInside(list.left,list.top,list.right,list.bottom).className('FrameLayout').visibleToUser().findOnce()
                p = packageName(package).boundsInside(list.left,list.top,list.right,device.height/2).className('FrameLayout').visibleToUser().findOnce()
                if(p){
                    func.clickObject(p);
                }
            }
        }

        o = packageName(package).textMatches('不再提醒 *|取消|关闭|放弃奖励').visibleToUser().findOnce() || packageName(package).descMatches('不再提醒 *|取消|关闭').visibleToUser().findOnce() || idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            sleep(3000)
        }

        if (packageName(package).textMatches(keys).visibleToUser().exists() || packageName(package).descMatches(keys).visibleToUser().exists()){
            func.back();
            sleep(3000)
        }

        o = packageName(package).textMatches('立即领取|立即查看').visibleToUser().findOnce()
        if (o) {
            finds = packageName(package).className('ImageView').visibleToUser().find()
            if (finds) {
                child = finds[finds.length - 1]
                func.clickObject(child)
            }
        }

        o = packageName(package).textMatches('我的零钱').visibleToUser().findOnce()
        if (o) {
            finds = packageName(package).className('ImageView').visibleToUser().find()
            if (finds) {
                child = finds[finds.length - 1]
                func.clickObject(child)
            }
        }
        

        // o = packageName(package).textMatches('.*恭喜获得.*|.*您又赚了.*').visibleToUser().findOnce()
        // if (o) {
        //     sleep(5000)
        //     var ii = 5;
        //     while(ii-- > 0 && textMatches('.*恭喜获得.*|.*您又赚了.*').visibleToUser().exists()){
        //         finds = packageName(package).className('FrameLayout').visibleToUser().find()
        //         if (finds) {
        //             if (finds.length < 5) {
        //                 child = finds[finds.length - 1]
        //                 func.clickObject(child)
        //             } else {
        //                 child = finds[2]
        //                 func.clickObject(child)
        //             }
        //         }
        //         sleep(2000)
        //     }
        // }

        // o = text('看视频即可打开').visibleToUser().findOnce() || desc('看视频即可打开').visibleToUser().findOnce();
        // if (o){
        //     o = o.parent().child(o.indexInParent() - 1);
        //     func.clickObject(o);
        // }

        // o = text('马上开启').visibleToUser().findOnce();
        // if (o){
        //     var b = o.parent().bounds();
        //     o = className('ImageView').visibleToUser().boundsInside(b.left,b.top,b.right,b.bottom).find()
        //     if (o.length > 0){
        //         func.clickObject(o[o.length - 1]);
        //     }
        // }
        if (textMatches('勋章殿堂').visibleToUser().exists()){
            func.back();
            sleep(3000)
        }

        if (textMatches('88元红包扭出来.*|88元红包等你拿|邀请好友').visibleToUser().exists()){
            func.back();
        }
    },3000);
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


