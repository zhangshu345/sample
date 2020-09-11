
var appname = '抖音极速版';
var pkg = 'com.ss.android.ugc.aweme.lite'; 
var classModule = {};
classModule.appname = '';
classModule.minMinutes = 25;
classModule.maxMinutes = 35;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.func = null;
classModule.start = function(){
    s_tt = new Date()
    log(appname,'---开始---'  + s_tt.getHours() + ':' + s_tt.getMinutes() + ':' + s_tt.getSeconds());
    appname = this.appname || appname;
    var package = this.package || pkg;
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package){
        var o = func.execApp(appname,package)
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt(); 
            minutes = 0;
            return; //退出函数
        }
    }
    func.openWaiting(['.LauncherActivity']);
    sign();
    var x = device.width / 2;
    var y = device.height / 2;
    try{
        var idx = 1;
        var bol = true,trys = 0;
        jjj = 1
        while(bol){
            jjj += 1
            if(jjj>20){
                jjj = 1
                sign()
            }
            func.checkSpace();  //检测一次存储空间
            if (textMatches('金币收益|赚钱任务|.*签到.*').visibleToUser().exists() || descMatches('金币收益|赚钱任务|.*签到.*').visibleToUser().exists() ){
                this.func.back();
                this.func.sleep(2000);
            }
            
            if (!text('推荐').visibleToUser().exists()){
                o = text('首页').visibleToUser().findOnce()
                if (o){
                    this.func.clickObject(o);
                    this.func.sleep(2000);
                    trys = 0;
                }
                else{
                    o = textMatches('.*看广告视频再赚.*').visibleToUser().findOnce() || descMatches('.*看广告视频再赚.*').visibleToUser().findOnce()
                    if (o){
                        func.clickObject(o);
                        func.sleep(1000);
                        func.sleep(60000,"金币领取中","textMatches('关闭广告').visibleToUser().exists()");
                        o = textMatches('关闭广告').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o);
                            func.sleep(2000);
                        }
                    }
                    else{
                        if (trys >= 5 && currentPackage().toLowerCase() != package.toLowerCase()){
                            func.restart(appname,package);
                            trys = 0;
                        }
                        else{
                            trys++;
                            this.func.back();
                            this.func.sleep(2000);
                            
                            o = text('继续观看').visibleToUser().findOnce();
                            if (o){
                                this.func.clickObject(o);
                                this.func.sleep(10000);
                            }
                        }
                    }

                }
            }
            else
                trys = 0;
            //func.checkapp(appname,package);
            idx++;
            var sec = random(me.minVideoSec,me.maxVideoSec);
            func.videoSleep(sec);
            
            if (func.doConcern) func.doConcern();
            swipe(random(x - 100,x - 50),random(y + 300,y + 400), random(x - 100,x - 50), random(y - 300,y - 400),10)

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
            }
            else{
                if (idx % 5 == 0)
                    func.toast(appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟',2)
            }
        }
        if (this.autoR == 0) autoRedraw();
    }
    catch(e){ 
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack) 
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    //withdraw();
    func.log(appname,'结束时间',"**********************************************************");
    func.quit(package);
}

function withdraw(){
    var package = classModule.package || pkg;
    var o = text('关注').findOnce();    //id(package + ':id/a97').findOnce(); //关注的坐标
    if (o){
        click(device.width / 2,o.bounds().centerY());
        func.sleep(4000);
        var o  = text('元').findOnce();
        if (o){
            func.clickObject(o)
            func.sleep(5000);
    
            o = textMatches('[0123456789.]+元').findOnce();
            var myamt = 0;
            if (o){
                myamt = Number(o.text().replace('元','')) || 0;
            }
            if (myamt >= 0.3){
                o = text('去提现').findOnce();
                if (o){
                    func.clickObject(o) 
                    func.sleep(5000);

                    var finds = textMatches('提现[0123456789.]+元').find();
                    for (var ii = finds.length - 1; ii >= 0; ii--){
                        var tmpamt = Number(finds[ii].text().replace('提现','').replace('元','')) || 0;
                        if (tmpamt <= myamt){
                            func.clickObject(finds[ii])
                            func.sleep(2000);
        
                            o = text('立即提现').findOnce();
                            if (o){
                                func.clickObject(o);
                                func.sleep(4000);

                                o = text('立即提现').findOnce(1);
                                if (o){
                                    func.clickObject(o);
                                    func.sleep(3000);
                                }
                            }
                            func.back();
                            func.sleep(500);
                            break;
                        }
                    }

                    func.back();
                }
            }
    
            func.back();
        }
        func.back();
    }
}


function autoRedraw() {
    refresh()
    var o = text('我').visibleToUser().findOne(5000);    //id(package + ':id/a97').findOnce(); //关注的坐标
    if (o) {
        click(device.width / 2, o.bounds().centerY());
        func.sleep(10000, '等待中', "textMatches('金币收益|.*看广告视频再赚.*|立即签到.*金币').visibleToUser().exists() || descMatches('金币收益|.*看广告视频再赚.*|立即签到.*金币').visibleToUser().exists()");
        sleep(3000)
        o = textMatches('元').visibleToUser().findOnce();
        if (o) {
            var list = o.parent();
            if (list) {
                have_money_bs = list.child(0);
                have_money = have_money_bs.text()
                if (have_money > 0.3) {
                    func.clickObject(have_money_bs);
                    func.sleep(10000, '等待中', "textMatches('去提现').visibleToUser().exists() || descMatches('去提现').visibleToUser().exists()");
                    sleep(1000)
                    o = textMatches('去提现').visibleToUser().findOnce() || descMatches('去提现').visibleToUser().findOnce()
                    if (o) {
                        func.clickObject(o);
                        func.sleep(10000, '等待中', "textMatches('支付宝提现').visibleToUser().exists() || descMatches('支付宝提现').visibleToUser().exists()");
                        sleep(1000)
                        o = textMatches('天天提').visibleToUser().findOnce() || descMatches('天天提').visibleToUser().findOnce()
                        if (o) {
                            func.clickObject(o);
                            sleep(3000)
                            o = textMatches('立即提现').visibleToUser().findOnce() || descMatches('立即提现').visibleToUser().findOnce()
                            if (o) {
                                func.clickObject(o);
                                sleep(3000)
                                o = textMatches('立即提现').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce()
                                if (o) {
                                    func.clickObject(o);
                                    sleep(3000)
                                }
                            }
                        }
                    }
                } else {
                    toast("余额不足")
                }
            }
    
        }
    }
    
}

function refresh(){
    var ii = 7;
    while(ii-- > 0 && !textMatches('我|首页').visibleToUser().exists()){
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

function openBox(){
    var package = classModule.package || pkg;
    var o = text('开宝箱得金币').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        sleep(5000)
        o = textMatches('.*看广告视频再赚.*').visibleToUser().findOnce() || descMatches('.*看广告视频再赚.*').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(5000);
            o = textMatches('金币收益|现金收益|活动规则').visibleToUser().findOnce() || descMatches('金币收益|现金收益|活动规则').visibleToUser().findOnce()
            if(!o){
                func.sleep(60000,"宝箱金币领取中","textMatches('关闭广告').visibleToUser().exists()");
                o = textMatches('关闭广告').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(3000);
                }
            }
        }
    }
}

function sign(){
    var package = classModule.package || pkg;
    try{
        var o = text('我').visibleToUser().findOne(5000);    //id(package + ':id/a97').findOnce(); //关注的坐标
        if (o){
            log(2)
            click(device.width / 2,o.bounds().centerY());
            func.sleep(10000, '等待中', "textMatches('金币收益|.*看广告视频再赚.*|立即签到.*金币').visibleToUser().exists() || descMatches('金币收益|.*看广告视频再赚.*|立即签到.*金币').visibleToUser().exists()");
            sleep(3000)
            o = text('好的').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                func.sleep(2000);
            }
            o = textMatches('立即签到.*金币').visibleToUser().findOnce() || descMatches('立即签到.*金币').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                sleep(5000)
                o = textMatches('.*看广告视频再赚.*|.*双倍.*').visibleToUser().findOne(3000) || descMatches('.*看广告视频再赚.*|.*双倍.*').visibleToUser().findOnce()
                if (o){
                    func.clickObject(o);
                    func.sleep(1000);
                    func.sleep(60000,"金币领取中","textMatches('关闭广告').visibleToUser().exists()");
                    o = textMatches('关闭广告').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                }

            }
            o = textMatches('签到').visibleToUser().findOnce() || descMatches('签到').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                sleep(5000)
                o = textMatches('.*看广告视频再赚.*|.*双倍.*').visibleToUser().findOnce() || descMatches('.*看广告视频再赚.*|.*双倍.*').visibleToUser().findOnce()
                if (o){
                    func.clickObject(o);
                    func.sleep(1000);
                    func.sleep(60000,"金币领取中","textMatches('关闭广告').visibleToUser().exists()");
                    o = textMatches('关闭广告').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                }

            }
            o = textMatches('.*看广告视频再赚.*|.*双倍.*').visibleToUser().findOnce() || descMatches('.*看广告视频再赚.*|.*双倍.*').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                func.sleep(1000);
                func.sleep(60000,"金币领取中","textMatches('关闭广告').visibleToUser().exists()");
                o = textMatches('关闭广告').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                }
            }


            o = text('限时任务赚金币').visibleToUser().findOnce();    //id(package + ':id/a97').findOnce(); //关注的坐标
            if (o){
                func.clickObject(o);
                func.sleep(3000);
                if (!text('限时任务赚金币').visibleToUser().exists()){
                    func.sleep(60000,"20分钟金币领取中","textMatches('关闭广告').visibleToUser().exists()");
                    o = textMatches('关闭广告').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                    }
                    func.sleep(2000);
                }
            }
            openBox();
            back()
        }

    }
    catch(e){
        func.log(appname,'签到',e.message + '\n\r' + e.stack)
    }
}

function hasDialog2(){
    func.hasDialog();
    var o = textMatches(' *(我知道了|以后再说|查看收益|好的) *').visibleToUser().findOnce() || descMatches(' *(我知道了|以后再说|查看收益|好的) *').visibleToUser().findOnce(); 
    if (o){
        func.clickObject(o);
    }

    o = textMatches('关闭视频|稍后').visibleToUser().findOnce() || descMatches('关闭视频|稍后').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        sleep(3000)
    }

    // o = textMatches('邀请好友.*').visibleToUser().findOnce();
    // if (o) {
    //     var list = o.parent();
    //     if(list && list.childCount()>1){
    //         var child = list.child(list.childCount()-1);
    //         func.clickObject(child);
    //     }
    // }

}
function hasDialog(){
    setInterval(hasDialog2,3000);
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