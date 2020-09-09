const appname = '趣来电';
const package = 'com.maiya.qulaidian';


var classModule = {};
classModule.minMinutes = 15;
classModule.maxMinutes = 25;
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
    // autoRedraw();


    var x = device.width / 2;
    var y = device.height / 2;
    try {
        var idx = 1;
        var bol = true;
        sign()
        return
        while (bol) {

            o = textMatches('.*金币翻倍.*').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o);
                func.sleep(60000,'看视频领金币中',"idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()"); 
                sleep(3000)
                closeDialog();
                sleep(2000)
    
            }


            func.checkSpace();  //检测一次存储空间
            var ii = 5;
            while (ii-- > 0) {
                o = packageName(package).text('铃声').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                    break
                } else {
                    refresh()
                }
            }

            if (!packageName(package).text('铃声').visibleToUser().exists()) {
                o = packageName(package).text('铃声').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                }
                else {
                    refresh()
                    o = packageName(package).text('铃声').visibleToUser().findOnce()
                    if (o) {
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                }
            }
            idx++;

            var sec = random(me.minVideoSec, me.maxVideoSec);
            func.sleep(sec * 1000, "视频播放中", "textMatches('看视频再领.*金币|看视频.*金币再翻.*').visibleToUser().exists()");



            var o = packageName(package).textMatches('看视频再领.*金币|看视频.*金币再翻.*').visibleToUser().findOnce();
            if (o) {
                this.func.sleep(1000);
                this.func.clickObject(o);
                this.func.sleep(2000);
                func.sleep(60000, "看视频再领金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog();
            }
            o = textMatches('开心收下|稍后领取').visibleToUser().findOnce()
            if(o){
                func.clickObject(o);
            }
            if (packageName(package).textMatches('勋章殿堂').visibleToUser().exists()) {
                o = idMatches(package + ':id/btn_back').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(4000);
                }
            }
            swipe(random(x - 100, x - 50), random(y + 300, y + 400), random(x - 100, x - 50), random(y - 300, y - 400), 10)




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
        sign()
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
    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }

    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }

    o = packageName(package).textMatches('我知道了|稍后领取').visibleToUser().findOnce();
    if(o){
        func.clickObject(o);
        func.sleep(1000);
    }

}

function refresh(){
    var ii = 7;
    while(ii-- > 0 && !text('我的').visibleToUser().exists()){
        closeDialog()
        if (currentPackage().toLowerCase() != package.toLowerCase()) {
            func.restart(appname, package)
        }
        if(ii<4){
            func.sleep(3200);
            func.back();
        }
    }
}

function autoRedraw(){
    refresh()
    var o = text('我的').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(10000, '等待中', "textMatches('提现|去提现').visibleToUser().exists() || descMatches('提现|去提现').visibleToUser().exists()");
        func.sleep(2000);
        o = packageName(package).textMatches('提现|去提现').visibleToUser().findOne(6000) || packageName(package).descMatches('提现|去提现').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(10000, '等待中', "textMatches('立即提现').visibleToUser().exists() || descMatches('立即提现').visibleToUser().exists()");

            var money = 0;
            o = packageName(package).textMatches('约[0-9.]*元').visibleToUser().findOne(10000)
            if (o)
                money = Number(o.text().replace('约','').replace('元','')) || 0;
            else{
                o = packageName(package).descMatches('约[0-9.]*元').visibleToUser().findOnce();
                if(o) money = Number(o.desc().replace('约','').replace('元','')) || 0;
            }
            func.toast('金额:' + money,1)
            if (money >= 1){
                var o = text('1.0元').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                }
                var btn = packageName(package).text('立即提现').visibleToUser().findOne(8000) || packageName(package).desc('立即提现').visibleToUser().findOnce();
                if (btn){
                    func.clickObject(btn);
                    sleep(4000)
                    var btn = packageName(package).textMatches('确定').visibleToUser().findOnce() || packageName(package).descMatches('确定').visibleToUser().findOnce();
                    if (btn){
                        func.clickObject(btn);
                        sleep(4000)
                    }
                }
            }
            else{
                func.toast('余额不足，不能提现',1);
            }
        }
        else{
            func.toast('未进入到提现界面',1);
        }
        back()
    }
}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        // var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        // if (o) {
        //     func.clickObject(o);
        //     // if (!packageName(package).textMatches('看视频再领.*金币|看视频.*金币再翻.*|完善信息，个性化你的内容').visibleToUser().exists() && !packageName(package).descMatches('看视频再领.*金币|看视频.*金币再翻.*|完善信息，个性化你的内容').visibleToUser().exists())
        //     //     {
        //     //         func.clickObject(o);
        //     //     }
        // }

        o = packageName(package).textMatches('继续播放|放弃金币|以后更新|暂不领取|放弃奖励').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }


        if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
            func.sleep(2000);
            func.back();
            func.sleep(3000);
        }
    
        o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            func.sleep(2000);
            func.clickObject(o);
            func.sleep(2000);
        }
    
        o = packageName(package).textMatches('我知道了').visibleToUser().findOnce();
        if(o){
            func.sleep(1000);
            func.clickObject(o);
            func.sleep(1000);
        }


        // if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()) {
        //     log("调试信息 趣铃声返回1")
        //     func.back();
        // }

    }, 3000);
}

function sign() {
        sleep(3000)
        func.sleep(15000, '等待中11', "textMatches('金币翻倍.*|我的金币|日常任务').visibleToUser().exists() || descMatches('金币翻倍.*|我的金币|日常任务').visibleToUser().exists()");
        o = textMatches('.*金币翻倍.*').visibleToUser().findOnce() || descMatches('.*金币翻倍.*').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            func.sleep(60000,'看视频领金币中',"idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()"); 
            sleep(3000)
            closeDialog();
            sleep(2000)

        }

        var ii = 5;
        while (ii-- > 0 && !textMatches('金币翻倍.*|我的金币|日常任务').visibleToUser().exists()) {
            if(ii<3){
            
                o = packageName(package).textMatches('首页').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o)
                    sleep(3000)
                }
            }
            o = packageName(package).textMatches('任务').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                func.sleep(10000, '等待中', "textMatches('金币翻倍.*|我的金币|日常任务').visibleToUser().exists() || descMatches('金币翻倍.*|我的金币|日常任务').visibleToUser().exists()");
            }
            closeDialog() 
        }



        // // 点击任务以后 自动回弹出的界面
        toast("任务一:签到领金币")

            o = packageName(package).textMatches('金币翻倍.*').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                func.sleep(2000);
                func.sleep(60000, "签到领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
                sleep(3000)
                closeDialog()
            }


        refresh()
        toast("任务二:幸运金币")
        o = packageName(package).textMatches('幸运金币').visibleToUser().findOnce();
        if (o) {
            var list = o.parent();
            xy = list.bounds()
            p = textMatches(/\d+:\d+/).boundsInside(xy.left, xy.top, xy.right, xy.bottom).visibleToUser().findOnce();
            if (!p) {
                func.clickObject(o)
                func.sleep(2000);
                func.sleep(60000, "幸运金币领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
                sleep(3000)
                closeDialog()
            }
        
        }

        refresh()
        toast("任务三:数字幸运金币")
        o = packageName(package).textMatches(/.*\d+幸运金币/).visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(2000);
            func.sleep(60000, "签到领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog()
            sleep(3000)
            closeDialog()
        }

        refresh()
        toast("任务三:观看福利")
        o = packageName(package).textMatches(/.*\d+观看福利/).visibleToUser().findOnce();
        if(o){
            func.clickObject(o)
            func.sleep(2000);
            func.sleep(60000, "签到领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog()
            sleep(3000)
            closeDialog()
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
classModule.start()    


