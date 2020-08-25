const appname = '映客极速版';
const package = 'com.ingkee.lite'; 

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
var keys = '下载|点击重播|点击下载|点击打开|关闭';


classModule.start = function () {
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes, this.maxMinutes);   //生成运行时间
    func.log(appname, '启动，预计运行：' + minutes, "**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分', 2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package) {
        var o = func.execApp(appname, package);
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }

    func.openWaiting();


    var x = device.width / 2;
    var y = device.height / 2;
    try {

        refresh()
        o = textMatches('我').visibleToUser().findOnce();
        if (o) {
            var list = o.parent();
            if(list){
                var xy = list.bounds();
                xx = xy.centerX()
                yy = xy.top
                click(xx,yy)
                func.sleep(10000, '等待中', "textMatches('日常任务|去提现|.*签到.*').visibleToUser().exists() || descMatches('日常任务|去提现|.*签到.*').visibleToUser().exists()");
                sleep(2000)
            }
        }
        o = textMatches('去签到').visibleToUser().findOnce() || descMatches('去签到').visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
            sleep(3000)
        }
        o = textMatches('立即签到').visibleToUser().findOnce() || descMatches('立即签到').visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
            sleep(5000)
            o = textMatches('来赚钱').visibleToUser().findOnce() || descMatches('来赚钱').visibleToUser().findOnce()
            if(o){
                func.clickObject(o);
                sleep(3000)
            }
        }
        
        o = textMatches('去赚钱').visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
            sleep(3000)
            func.sleep(10000, '等待中', "textMatches('看直播赚金币|任务').visibleToUser().exists() || descMatches('看直播赚金币|任务').visibleToUser().exists()");     
        }
        
        o = textMatches('看直播赚金币|任务').visibleToUser().exists()
        if(!o){
            to_video()
        }
        o = textMatches('看直播赚金币|任务').visibleToUser().exists()
        if(o){
            var bol = true;
        }else{
            var bol = false;
        }



        var idx = 1;

        var trs = 0;
        num = 0
        while (bol) {
            if (num == 10) {

                o = textMatches('看直播赚金币|任务').visibleToUser().findOnce();
                if (o) {
                    xx = o.bounds().centerX()+20
                    yy = o.bounds().centerY()-100
                    press(xx, yy, 10)
                    func.sleep(10000, '等待中', "textMatches('日常任务|去提现|.*签到.*').visibleToUser().exists() || descMatches('日常任务|去提现|.*签到.*').visibleToUser().exists()");
                    o = textMatches('金币收益.*').visibleToUser().findOnce();
                    if (o) {
                        var list = o.parent().parent();
                        if(list){
                            have_gold = list.child(0).text()
                            if(have_gold>5000){
                                bol = false
                                break
                            }
                        }
                    }
                    back()
                    sleep(2000)
                }

            }
            num += 1
            if (num > 10) {
                num = 0
            }

            func.checkSpace();  //检测一次存储空间
            if (!textMatches('看直播赚金币|任务').visibleToUser().exists()) { //没有关注，重启刷宝
                to_video()
            }

            func.sleep(10000, '直播观看中.....');

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000) {
                bol = false;
                func.toast('' + appname + '运行完成', 2)
            }
            else {
                if (idx % 10 == 0)
                    func.toast('' + appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟', 2)
            }
        }
        if (this.autoR == 0) autoRedraw();
    }
    catch (e) {
        func.log(appname, '循环执行', e.message + '\n\r' + e.stack);
    }
    finally {
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname, '结束时间', "**********************************************************");
    func.quit(package);
}

function to_video(){
    refresh()
    var ii = 10;
    while (ii-- > 0 && !textMatches('看直播赚金币|任务').visibleToUser().exists() && !descMatches('看直播赚金币|任务').visibleToUser().exists()) {
        if(ii<3){
            func.restart(appname, package)
        }
        if(ii<5){
            o = packageName(package).textMatches('我').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                sleep(3000)
            }
            o = packageName(package).textMatches('直播').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                sleep(3000)
            }
        }
        o = packageName(package).textMatches('.*人在看').visibleToUser().findOnce() 
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('看直播赚金币|任务').visibleToUser().exists() || descMatches('看直播赚金币|任务').visibleToUser().exists()");
        }
        closeDialog() 
    }
}

function closeDialog() {

    var o = text('关闭广告|我知道了|关闭').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
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

function autoRedraw() {
    toast("开始提现")
    refresh()
    o = textMatches('我').visibleToUser().findOnce();
    if (o) {
        var list = o.parent();
        if(list){
            var xy = list.bounds();
            xx = xy.centerX()
            yy = xy.top
            click(xx,yy)
            func.sleep(10000, '等待中', "textMatches('日常任务|去提现|.*签到.*').visibleToUser().exists() || descMatches('日常任务|去提现|.*签到.*').visibleToUser().exists()");
            sleep(2000)
        }
    }
    
    o = textMatches('现金收益.*元.*').visibleToUser().findOnce();
    if (o) {
        var list = o.parent().parent();
        if(list){
            have_money_bs = list.child(0);
            have_money = have_money_bs.text()
            if(have_money>0.3){
                o = textMatches('去提现').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    sleep(2000)
                    func.sleep(10000, '等待中', "textMatches('0.3').visibleToUser().exists()");
                    o = textMatches('0.3').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        sleep(2000)
                    }
                    o = textMatches('立即提现').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        sleep(2000)
                    }
                    o = textMatches('确定|.*确.*').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        sleep(2000)
                    }
                }
            }else{
                toast("余额不足")
            }
        }
    }
}

function refresh(){
    var ii = 7;
    while(ii-- > 0 && !textMatches('我|交友').visibleToUser().exists()){
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

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        o = textMatches('我知道了|狠心离开').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
        }

        if (packageName(package).textMatches('点击重播|点击下载|恭喜获得.*').filter(function (w) { if (w.text() == '点击下载' && w.bounds().bottom > device.height * 0.8) { return false } else { return true } }).visibleToUser().exists()) {
            func.back();
        }
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            if (!packageName(package).textMatches('*看视频.*').visibleToUser().exists()) {
                func.clickObject(o);
            }

        }

        o = textMatches('关闭|放弃兑换|以后更新|放弃奖励').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
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
