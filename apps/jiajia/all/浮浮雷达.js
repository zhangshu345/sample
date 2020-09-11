auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
const appname = '浮浮雷达';
const package = 'com.kugou.shiqutouch';


var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 25;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.noDouyin = 0; //默认做抖音，为1不做
classModule.nokuaishou = 0; //默认做快手，为1不做
classModule.autoR = 0;	//默认自动提现
classModule.func = null;



var keys = '点击重播|点击下载|点击打开';



classModule.start = function () {
    var cfg = func.loadConfig(appname);
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date().toLocaleDateString();
    var watch_num = cfg.watch_num || 0;  
    if (lastdate != nowdate) {    //是新的一天
        have_cope = [];   //已读的为空;
        have_share = []
        watch_num = 0
        lastdate = nowdate;
        cfg.lastdate = lastdate
        cfg.watch_num = watch_num
        func.saveConfig(appname, JSON.stringify(cfg));
    }
    if( watch_num == 20){
        toast("浮浮雷达今日已到上限 跳过")
        log("浮浮雷达今日已到上限 跳过")
        return
    }



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
    // return

    func.openWaiting(['.FrameLayout', '.SplashActivity'])

    var x = device.width / 2;
    var y = device.height / 2;
    try {
        sign2()
        
        // if (this.autoR == 0) autoRedraw();

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

    // 关闭签到
    o = idMatches(package + ':id/.*cancel').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
    }



    o = textMatches('关闭').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }

    if (packageName(package).textMatches(keys).filter(function (w) { if (w.text() == '点击下载' && w.bounds().bottom > device.height * 0.8) { return false } else { return true } }).visibleToUser().exists()) {
        func.back();
        func.sleep(3000);
    }


    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(4000);
    }
    o = textMatches('放弃奖励').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }

    o = textMatches('邀好友赚识曲金').visibleToUser().findOnce();
    if (o) {
        back()
        func.sleep(3000);
    }


}

function refresh(){
    var ii = 7;
    while(ii-- > 0 && !textMatches('任务').visibleToUser().exists()){
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
    o = textMatches('我的识曲金|每日签到|每日任务').visibleToUser().findOnce() || descMatches('我的识曲金|每日签到|每日任务').visibleToUser().findOnce()
    if(!o){
        o = textMatches('任务').visibleToUser().findOnce() || descMatches('任务').visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
            sleep(3000)
        }
    }



}

function sign() {
    closeDialog()
    refresh()
    closeDialog()
    var o = text('赚钱').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(10000, '等待中', "textMatches('当前金币').visibleToUser().exists() ");
        sleep(1000)
    }

    var ii = 3;
    while (ii-- > 0) {
        o = textMatches('首次分享儿歌|分享儿歌').visibleToUser().findOnce();
        if (o) {
            var list = o.parent();
            for (var i = 0; i < list.childCount(); i++) {
                var child = list.child(i);
                let txt = child.text();
                let idd = child.id();
                if (txt == "+100金币" || txt == "+450金币") {
                    toast("开始首次分享儿歌")
                    func.clickObject(child);
                    sleep(3000)
                    o = packageName(package).className('android.widget.ImageButton').filter(function (w) { return w.bounds().bottom < device.height * 0.3 && w.bounds().left > device.width * 0.8 }).visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(10000, '等待中', "textMatches('微信|微信好友').visibleToUser().exists() || descMatches('微信|微信好友').visibleToUser().exists() ");
                        sleep(2000)
                        // o = textMatches('微信').visibleToUser().findOnce();

                        o = textMatches('微信|微信好友').visibleToUser().findOnce() || descMatches('微信|微信好友').visibleToUser().findOnce()

                        if (o) {
                            func.clickObject(o);
                            func.sleep(10000, '等待中', "textMatches('选择|多选').visibleToUser().exists() ");
                            sleep(1000)
                            back()
                            sleep(1000)
                            closeDialog()
                        }
                    }
                    refresh()
                    var o = text('赚钱').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(10000, '等待中', "textMatches('当前金币').visibleToUser().exists() ");
                        sleep(1000)
                    }
                }


            }
        }
        o = textMatches('首次分享动画|分享动画').visibleToUser().findOnce();
        if (o) {
            var list = o.parent();
            for (var i = 0; i < list.childCount(); i++) {
                var child = list.child(i);
                // log(child.className());
                let txt = child.text();
                let idd = child.id();
                if (txt == "+100金币" || txt == "+450金币") {

                    toast("开始首次分享动画")
                    func.clickObject(child);
                    sleep(6000)
                    // o = className('android.widget.ListView').visibleToUser().findOnce();
                    o = className('android.widget.ListView').visibleToUser().filter(function (w) { return w.bounds().top < device.height * 0.3; }).findOnce();
                    if (o) {
                        // var list = o.parent();
                        var list = o
                        for (var i = 0; i < list.childCount(); i++) {
                            var child = list.child(i);
                            func.clickObject(child);
                            sleep(5000)

                            var ii = 5;
                            while (ii-- > 0 && !packageName(package).className('android.widget.ImageButton').filter(function (w) { return w.bounds().top < device.height * 0.3 && w.bounds().left > device.width * 0.8 }).exists()) {
                                click(300, 300);
                                func.sleep(1000);
                            }
                            var o = packageName(package).className('android.widget.ImageButton').filter(function (w) { return w.bounds().top < device.height * 0.3 && w.bounds().left > device.width * 0.8 }).findOnce();
                            if (o) {
                                func.clickObject(o);
                                func.sleep(10000, '等待中', "textMatches('微信|微信好友').visibleToUser().exists() || descMatches('微信|微信好友').visibleToUser().exists() ");

                                o = textMatches('微信|微信好友').visibleToUser().findOnce() || descMatches('微信|微信好友').visibleToUser().findOnce()
                                if (o) {
                                    func.clickObject(o);
                                    func.sleep(10000, '等待中', "textMatches('选择|多选').visibleToUser().exists() ");
                                    sleep(1000)
                                    back()
                                    sleep(1000)
                                    closeDialog()
                                }
                            }
                            break
                        }
                    }
                    refresh()
                    var o = text('赚钱').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(10000, '等待中', "textMatches('当前金币').visibleToUser().exists() ");
                        sleep(1000)
                    }
                    break
                }

            }
        }
        func.swipeUp()
    }
}

function autoRedraw(){

    refresh()
    var o = text('赚钱').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(10000, '等待中', "textMatches('当前金币').visibleToUser().exists() ");
        sleep(1000)
    }
    var ii = 5;
    while(ii-- > 0 && !textMatches('提现').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.5 && w.bounds().top > device.height * 0.1; }).exists()){
        var w = device.width;
        var h = device.height;
        swipe(w * 0.6 - random(10, 30), h * 0.3 + random(10, 20), w * 0.6 + random(50, 80), h * 0.8 + random(10, 30), random(220, 235))
        sleep(2300)
    }
    
    
    o = textMatches('10000金币=1元').visibleToUser().findOnce();
    if(o){
        var list = o.parent();
        if(list.childCount()>2){
            var child = list.child(1);
            money_num = child.text()
            if(money_num >= 10000){
                var o = text('提现').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(10000, '等待中', "textMatches('需要.*金币').visibleToUser().exists() ");
                    sleep(1000)
                    if(money_num>=30000){
                        money = "3元"
                    }else if (money_num>=20000){
                        money = "2元"
                    }else if (money_num>=10000){
                        money = "1元"
                    }else if (money_num>=3000){
                        money = "0.3元"
                    }
                    if(money){
                        var o = text(money).visibleToUser().findOnce() || desc(money).visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                            var ii = 5;
                            while (ii-- > 0 && !textMatches('申请提现').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.9; }).exists()) {
                                func.swipeUp()
                                func.sleep(2300);
                            }    
                            var o = text('去设置').visibleToUser().findOnce();
                            if (o) {
                                func.clickObject(o);
                                sleep(5000)
                            }
                    
                            var o = text('申请提现').visibleToUser().findOnce();
                            if (o) {
                                func.clickObject(o);
                            }
                        
                            
                        }
                    }
                }
            }else{
                toast("余额不足")
            }
        } 
    }

}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();




        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            if (!packageName(package).textMatches('看视频再领.*金币|看视频.*金币再翻.*|完善信息，个性化你的内容').visibleToUser().exists() && !packageName(package).descMatches('看视频再领.*金币|看视频.*金币再翻.*|完善信息，个性化你的内容').visibleToUser().exists()) {
                func.clickObject(o);
            }
        }

        o = packageName(package).textMatches('放弃金币|以后更新|暂不领取|放弃奖励|取消').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }

        // if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()) {
        //     log("调试信息 趣铃声返回1")
        //     func.back();
        // }

    }, 3000);
}
// //添加可以独立运行
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





function sign2(){

    // 邀请相关
    refresh()
    closeDialog()
    closeDialog()
    func.swipeUp()  
    o = textMatches('去填写').visibleToUser().findOnce() || descMatches('去填写').visibleToUser().findOnce()
    if(o){
        func.clickObject(o);
        sleep(2000)
        // var o = idMatches(package + ':id/.*edt_fill_code.*').visibleToUser().findOnce();
        var o = idMatches('.*edt_fill_code.*').visibleToUser().findOnce();
        if (o) {
            o.setText('BBAPZ1')
            sleep(1200)
            o = textMatches('确定').visibleToUser().findOnce() || descMatches('确定').visibleToUser().findOnce()
            if(o){
                func.clickObject(o);
                sleep(2000)
                closeDialog()
            }
        }
    }
    // 邀请相关


    
    var jj = 30;
    while (jj-- > 0){
        closeDialog()
        var ii = 5;
        while (ii-- > 0 && !textMatches('看创意视频.*').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.8; }).findOnce()) {
            o = textMatches('看创意视频.*').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.8; }).findOnce() || descMatches('看创意视频.*').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce()
            if(o){
                break
            }
            func.swipeUp()
            sleep(1000)
            refresh()
        }


        have_order = false
        o = text('看创意视频(20/20)').visibleToUser().findOnce() || desc('看创意视频(20/20)').visibleToUser().findOnce()

        if (o) {
            have_order = true
            var cfg = func.loadConfig(appname);
            watch_num = 20
            cfg.watch_num = watch_num
            func.saveConfig(appname, JSON.stringify(cfg));
        }
        
        if(have_order){

            break
        }
        
        o = textMatches('看视频').visibleToUser().findOnce() || descMatches('看视频').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            func.sleep(60000,'创意视频中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|点击打开|邀好友赚金币').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog()
            func.sleep(2000);
            closeDialog()
            func.sleep(2000);
        }
    }
    console.log(2255);
    
}



// classModule.start();Scripts.INSTANCE.runnextScript()



// o = textMatches('我的识曲金|每日签到|每日任务').visibleToUser().findOnce() || descMatches('我的识曲金|每日签到|每日任务').visibleToUser().findOnce()
// console.log(o);

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



