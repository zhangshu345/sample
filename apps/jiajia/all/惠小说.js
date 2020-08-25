const appname = '惠小说';
const package = 'com.cashnovel';

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

var keys = '点击重播|点击下载|点击打开';


classModule.start = function () {
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes, this.maxMinutes);   //生成运行时间
    func.log(appname, '启动，预计运行：' + minutes, "**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分', 2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package) {
        var o = func.execApp(appname, package, 15000, "textMatches('首页|我的').visibleToUser().exists()")
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt();
            return; //退出函数
        }
    }

    var ii = 5;
    while (ii-- > 0 && !textMatches('分类').visibleToUser().exists()) {
        o = packageName(package).textMatches('任务').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('连载|完结|.*分').visibleToUser().exists() || descMatches('连载|完结|.*分').visibleToUser().exists()");
        }
        closeDialog() 
    }

    func.openWaiting(['.FrameLayout', '.SplashActivity'])
    var x = device.width / 2;
    var y = device.height / 2;
    try {
        var idx = 1;
        var bol = true;

        while (bol) {

            var ii = 5;
            while(ii-- > 0 && !idMatches(package + ':id/timeContainer').visibleToUser().exists()){
            
                o = packageName(package).textMatches(/\d+.\d+分/).visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o)
                }
                sleep(2000)
            
                o = packageName(package).textMatches('阅读赚金币').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o)
                }
                sleep(2000)
            
                o = id('timeContainer').findOnce();
                if(o){
                    break
                }
                closeDialog() 
            }

            var ii = 5;
            while (ii-- > 0) {
                o = idMatches(package + ':id/timeContainer').visibleToUser().findOnce();
                if (o) {
                    break
                } else {
                    refresh()
                    var jj = 5;
                    while (jj-- > 0 && !textMatches('分类').visibleToUser().exists()) {
                        o = packageName(package).textMatches('任务').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o)
                            func.sleep(10000, '等待中', "textMatches('连载|完结|.*分').visibleToUser().exists() || descMatches('连载|完结|.*分').visibleToUser().exists()");
                        }
                        closeDialog() 
                    }
                }
            }
            
            var s = random(this.minTextSec * 1000,this.maxTextSec * 1000)
            func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
            func.sleep(s);   //随机阅读3到6秒 
            // swipe(device.width-1,device.height * 0.5,device.width * 0.5,device.height * 0.5,200);
            swipe(device.width-200,device.height * 0.5,device.width * 0.1,device.height * 0.5,200);
            func.sleep(500);
            closeDialog();
            o = id('timeContainer').findOnce();
            if(o){
                func.clickObject(o);
                sleep(2000)
            
            }
            o = textMatches('金币.*倍').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o);               
                func.sleep(60000,'看视频领金币中',"idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                sleep(3000)
                closeDialog();
                sleep(5000)
                o = textMatches('暂时忽略').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o);
                }
            }



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
    o = packageName(package).textMatches('我知道了|继续赚钱|暂时忽略').visibleToUser().findOnce();
    if(o){
        func.clickObject(o);
        func.sleep(1000);
    }

    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }

    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
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
                if (o){
                    func.clickObject(btn);
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


        o = packageName(package).textMatches('继续播放|放弃金币|以后更新|暂不领取|放弃奖励').visibleToUser().findOnce()
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
        if(o){
            func.clickObject(o);
            func.sleep(1000);
        }


        // if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()) {
        //     log("调试信息 趣铃声返回1")
        //     func.back();
        // }

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