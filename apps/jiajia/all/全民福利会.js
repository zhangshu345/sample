const appname = '全民福利会';
const package = 'com.qx.qmflh';

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
classModule.func = null;
var keys = '点击重播|点击下载|点击打开|看视频，赚金币|去分享';



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
    nn = 0
    try {
        sign()
        var idx = 1;
        var bol = true;

        while (bol) {
            func.checkSpace();  //检测一次存储空间

            o = packageName(package).textMatches('精选|视频').visibleToUser().exists()
            if(!o){
                refresh()
                var ii = 5;
                while (ii-- > 0) {
                    o = textMatches('开心赚钱').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(10000, '等待中', "textMatches('视频|头条').visibleToUser().exists() || descMatches('视频|头条').visibleToUser().exists()");
                    }
                    o = textMatches('视频|头条').visibleToUser().findOnce() || descMatches('视频|头条').visibleToUser().findOnce()
                    if(o){
                        break
                    }
                }
            
                var ii = 5;
                while (ii-- > 0) {
                    o = textMatches('视频').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        // func.sleep(10000,"等待中","idMatches('" + package + ":id/.*iv_media_play.*').visibleToUser().exists() ");
                        func.sleep(5000,"等待看视频");


                    }
                    // var o = idMatches(package + ':id/.*iv_media_play.*').visibleToUser().findOnce();
                    o = textMatches(/\d+:\d+/).visibleToUser().findOnce();
                    if(o){
                        break
                    }
                }
                
                // var o = idMatches(package + ':id/.*iv_media_play.*').visibleToUser().findOnce();
                o = textMatches(/\d+:\d+/).visibleToUser().findOnce();
                if(o){
                    // func.clickObject(o);
                    click(device.width*0.5,o.bounds().centerY())
                }
            }


            sleep(3000)
            o = textMatches('重播').visibleToUser().findOnce();
            nn +=1
            if (o || nn > 5) {
                nn = 0
                func.swipeUp()
                sleep(2000)
                // o = idMatches(package + ':id/.*iv_media_play.*').filter(function (w) { return w.bounds().bottom < device.height * 0.9 && w.bounds().bottom < device.height * 0.2 }).visibleToUser().findOnce();
                var ii = 5;
                while (ii-- > 0) {
                    func.swipeUp()
                    sleep(2000)
                    // o = idMatches(package + ':id/.*iv_media_play.*').filter(function (w) { return w.bounds().bottom < device.height * 0.9 && w.bounds().bottom > device.height * 0.2 }).visibleToUser().findOnce();
                    o = textMatches(/\d+:\d+/).filter(function (w) { return w.bounds().bottom < device.height * 0.9 && w.bounds().bottom > device.height * 0.2 }).visibleToUser().findOnce();
                    
                    if (o) {
                        break
                    }
                }
                // var o = idMatches(package + ':id/.*iv_media_play.*').visibleToUser().findOnce();
                o = textMatches(/\d+:\d+/).visibleToUser().findOnce();
                if(o){
                    // func.clickObject(o);
                    click(device.width*0.5,o.bounds().centerY())
                }
            
            }
            func.sleep(10000, '观看中...剩余检测时间:');



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
    // log(888888888888888888888888888)
    // var finds =  className('android.view.ViewGroup').focusable(true).filter(function (w) {
    //     return w.bounds().top>device.height*0.2 && w.bounds().bottom<device.height * 0.4 &&  w.bounds().left <device.width  && w.bounds().left > device.width * 0.8 
    //         }).find();
    //     log(finds.length)
    //     for (var ii = 0; ii < finds.length; ii++) {
    //         let child = finds[ii];
    //         log(child)
    //     }
    
    // var o =  className('android.view.ViewGroup').focusable(true).filter(function (w) {
    //         return w.bounds().top>device.height*0.2 && w.bounds().bottom<device.height * 0.4 &&  w.bounds().left <device.width  && w.bounds().left > device.width * 0.8 
    //             }).findOnce()
    // if(o){
    //     func.clickObject(o);
    // }

    var o =  className('android.view.ViewGroup').focusable(true).filter(function (w) {
        return w.boundsInParent().bottom<100 && w.bounds().top>device.height*0.2 && w.bounds().bottom<device.height * 0.4 &&  w.bounds().left <device.width  && w.bounds().left > device.width * 0.8 
            }).findOnce()
    if(o){
        func.clickObject(o);
        sleep(3000)
    }


    o = packageName(package).text('新人二重礼').visibleToUser().findOnce();
    if (o) {
        back()
        sleep(4000)
    }

    // var o =  indexInParent(1).depth(8).className('android.view.ViewGroup').findOnce();
    // if(o){
    //     log(1)
    //     func.clickObject(o);
    // }else{
    //     log(2)
    // }

    o = idMatches(package + ':id/.*close').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(4000);
    }
    o = packageName(package).text('确定').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o)
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
        if(ii<3){
            func.sleep(3200);
            func.restart(appname, package)
        }

    }
}

function autoRedraw() {
    closeDialog()
    refresh()
    closeDialog()
    o = packageName(package).text('任务').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o)
    }
    o = packageName(package).text('任务').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o)
    }
    func.sleep(10000, '等待中', "textMatches('约.*元').visibleToUser().exists() ");
    o = textMatches('约.*元').visibleToUser().findOnce();
    if (o) {
        log(o.text())
        have_money = o.text()
        have_money = have_money.replace('约','');
        have_money = have_money.replace('元','');
        log(have_money)
        if(have_money>1){
            func.clickObject(o)
            func.sleep(15000, '等待中', "textMatches('提现').visibleToUser().exists() ");
            var ii = 5;
            while (ii-- > 0) {
                o = textMatches('提现').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o)
                    func.sleep(15000, '等待中', "textMatches('常规提现').visibleToUser().exists() ");
                }
                o = textMatches('常规提现').visibleToUser().findOnce();
                if(o){
                    break
                }
            }

            o = textMatches('价格:10000金币').visibleToUser().findOnce();
            if(o){
                func.clickObject(o)
                sleep(1000)
            }
            func.swipeUp()
            sleep(3000)
            o = textMatches('立即提现').visibleToUser().findOnce();
            if(o){
                func.clickObject(o)
                sleep(3000)
            }
            o = textMatches('立即认证').visibleToUser().findOnce();
            if(o){
                log(appname,'没有实名认证，抓紧认证')
            }
            

            //  加


        }else{
            toast("余额不足1元")
        }
    }
    


}


function sign() {
    try {
        closeDialog()

        var ii = 5;
        while(ii-- >0){
            o = packageName(package).text('任务').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                closeDialog()
                func.sleep(10000, '等待中', "textMatches('明日签到|签到成功|看视频再领.*金币').visibleToUser().exists() || descMatches('明日签到|签到成功|看视频再领.*金币').visibleToUser().exists()");
            }else{
                closeDialog()
                refresh()
            } 
            x = textMatches('明日签到|签到成功|看视频再领.*金币').visibleToUser().exists() || descMatches('明日签到|签到成功|看视频再领.*金币').visibleToUser().exists()   
            if(x){
                break
            }
        }



            func.clickObject(o)
            closeDialog()
            func.sleep(10000, '等待中', "textMatches('明日签到|签到成功|看视频再领.*金币').visibleToUser().exists() || descMatches('明日签到|签到成功|看视频再领.*金币').visibleToUser().exists()");
            sleep(5000)
            toast("任务一：签到翻倍")
            o = textMatches('看视频再领.*金币').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                func.sleep(2000);
                func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
                sleep(3000)
                closeDialog()
                sleep(3000)
            }

            closeDialog()
            o = textMatches('去关注').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                func.sleep(5000);
                o = textMatches('关注公众号领取金币').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                    func.sleep(60000, '等待公众号加载一', "textMatches('.*月.*日').visibleToUser().exists() || descMatches('.*月.*日').visibleToUser().exists()");   
                    sleep(5000) 
                    o = idMatches('.*js_name.*').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(2000);
                        func.sleep(60000, '等待公众号加载二', "textMatches('关注公众号').visibleToUser().exists() || descMatches('关注公众号').visibleToUser().exists()");  
                        sleep(5000) 
                        o = textMatches('关注公众号').visibleToUser().findOnce() || descMatches('关注公众号').visibleToUser().findOnce()
                        if (o) {
                            func.clickObject(o);
                            func.sleep(2000);
                            func.sleep(60000, "等待公众号加载三", "idMatches('.*aly.*').visibleToUser().exists() ");

                        }
                    }
                }
                refresh()
                closeDialog()
                refresh()
                closeDialog()
                o = packageName(package).text('任务').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o)
                    func.sleep(10000, '等待中', "textMatches('明日签到|签到成功|看视频再领.*金币').visibleToUser().exists() || descMatches('明日签到|签到成功|看视频再领.*金币').visibleToUser().exists()");
                    sleep(5000)
                }
            }


            var ii = 5;
            while (ii-- > 0 && !textMatches('看视频，赚金币').filter(function (w) { return w.bounds().bottom < device.height * 0.9 }).visibleToUser().exists()) {
                closeDialog()
                o = textMatches('领取金币').filter(function (w) { return w.bounds().bottom < device.height * 0.9 && w.bounds().bottom > device.height * 0.2 }).visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    closeDialog()
                }
                func.swipeUp()
            }

            var ii = 20;
            while(ii-- > 0){
                o = textMatches('立即赚钱').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                    func.sleep(60000, "10次广告观看中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog()
                    sleep(3000)
                    closeDialog()
                    func.sleep(60000, "10次广告观看中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog()
                    sleep(3000)
                    closeDialog()
                    sleep(5000)
                }
                j = textMatches('看视频，赚金币').visibleToUser().findOnce();
                k = text('分享视频赚钱').visibleToUser().findOnce() ||  textMatches('分享视频赚钱|去分享').visibleToUser().findOnce()
                if(!j && k){
                    break
                }
                if(!j && !k){
                    func.swipeUp()
                    sleep(3000)
                    log("广告检测中")
                }
            }
        

    }
    catch (e) {
        func.log(appname, '领币', e.message + '\n\r' + e.stack)
    }
}
  
function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        var o =  className('android.view.ViewGroup').focusable(true).filter(function (w) {
            return w.boundsInParent().bottom<100 && w.bounds().top>device.height*0.2 && w.bounds().bottom<device.height * 0.4 &&  w.bounds().left <device.width  && w.bounds().left > device.width * 0.8 
                }).findOnce()
        if(o){
            func.clickObject(o);
            sleep(3000)
        }



        // var o =  depth(8).clickable(true).className('android.view.ViewGroup').visibleToUser().findOnce();
        // if(o){
        //     func.clickObject(o);
        // }

        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            if (!packageName(package).textMatches('看视频再领.*金币|看视频.*金币再翻.*|完善信息，个性化你的内容').visibleToUser().exists() && !packageName(package).descMatches('看视频再领.*金币|看视频.*金币再翻.*|完善信息，个性化你的内容').visibleToUser().exists())
                {
                    func.clickObject(o);
                }
        }

        o = packageName(package).textMatches('确认领取|继续播放|放弃金币|以后更新|暂不领取|放弃奖励').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }


        // if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()) {
        //     log("调试信息 趣铃声返回1")
        //     func.back();
        // }

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
classModule.start()





