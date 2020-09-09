const appname = '趣看视频';
const package = 'com.baomihua.qukan';

var classModule = {};
classModule.minMinutes = 25;
classModule.maxMinutes = 35;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
classModule.func = null;
var keys = '点击重播|点击下载|点击下载|点击打开';

classModule.start = function(){
    s_tt = new Date()
log(appname,'---开始---'  + s_tt.getHours() + ':' + s_tt.getMinutes() + ':' + s_tt.getSeconds());
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package){
        var o = func.execApp(appname,package,15000,"text('推荐').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }

    func.openWaiting(['.FrameLayout','.SplashActivity','.WelcomeActivity'])
    
    //要判断是否要签到，或者领取时段奖励
    sign();    //签到，并返回结果
    try{
        var idx = 0;
        var bol = true;
        var needrefresh = false;
        while(bol){
            func.checkSpace();  //检测一次存储空间
            // if(!packageName(package).id(package + ':id/main_bottom_ling_view_fl').visibleToUser().exists()){
            o = id(package + ':id/toutiaoTab').visibleToUser().findOnce()
            if(o){
                func.clickObject(o);
                func.sleep(2000);
            }
            else{
                if (currentPackage().toLowerCase() != package.toLowerCase()){
                    func.restart(appname,package)
                }
                else{
                    this.func.back();
                    this.func.sleep(2000);
                }
            }
            // }
            o = idMatches(package + ':id/main_bottom_ling_view_fl').visibleToUser().findOnce();
            if (o) {
                xy = o.bounds()
                button1 = textMatches('.*/5').boundsInside(xy.left, xy.top, xy.right, xy.bottom).visibleToUser().findOnce();
                button2 = textMatches('金蛋大奖').boundsInside(xy.left, xy.top, xy.right, xy.bottom).visibleToUser().findOnce();
                if(!button1 && !button2){
                    func.clickObject(o);
                    sleep(2000)
                }
            }
            p= packageName(package).textMatches('看视频再领.*金币').visibleToUser().findOnce()
            if(p){
                func.clickObject(p);
                sleep(5000)
                p= packageName(package).textMatches('看视频再领.*金币').visibleToUser().findOnce()
                if(p){
                    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(3000);
                    }
                }else{
                    func.sleep(60000,'小视频金币',"idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog();
                    func.sleep(2000);
                }
            }

            if (idx % 5 == 0)
                func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)
            if (idx % 11 == 0) //每看十条刷新一次首页
                needrefresh = true;

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
            }
            else{
                func.swipeUp();
                func.sleep(2000);
            }
        }
 
        if (this.autoR == 0) {autoRedraw();}
    }
    catch(e){
        //log(e.message + e.stack)
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束运行' ,"**********************************************************");
    func.quit(package);
}

function closeDialog() {
    if (textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }

    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }


    o = packageName(package).textMatches('我知道了').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(1000);
    }
}

function pickCoin(){
    try{
        var o = packageName(package).text('领金币').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(1000);
            func.sleep(60000,"领币中","idMatches('" + package + ":id/(.*close.*|homeTab)').visibleToUser().exists()")
            closeDialog();
        }
    }
    catch(e){
        func.log(appname,'领币',e.message + '\n\r' + e.stack);
    }
}

function refresh(){
    var ii = 7;
    while(ii-- > 0 && !id(package + ':id/mineTab').visibleToUser().exists()){
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

function autoRedraw(){
    refresh()
    var ii = 5;
    while(ii-- > 0){
        o = id(package + ':id/mineTab').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(10000, '等待中', "textMatches('约.*元').visibleToUser().exists() || descMatches('约.*元').visibleToUser().exists()");
            o = textMatches('约.*元').visibleToUser().findOnce() || descMatches('约.*元').visibleToUser().findOnce()
            if(o){
                have_money = o.text()
                have_money = have_money.replace('元', '');
                have_money = have_money.replace('约', '');
                log(have_money)
                if(have_money>1){
                    o = textMatches('提现').visibleToUser().findOnce() || descMatches('提现').visibleToUser().findOnce()
                    if (o){
                        func.clickObject(o);
                        func.sleep(20000, '等待中', "textMatches('立即提现').visibleToUser().exists() || descMatches('立即提现').visibleToUser().exists()");
                        break
                    }
                }else{
                    toast("余额不足")
                    break
                }
            }

        }
        closeDialog()
        refresh()
    }

    o = textMatches('立即提现').visibleToUser().findOnce() || descMatches('立即提现').visibleToUser().findOnce()
    if (o){
        p =  textMatches('10000金币').visibleToUser().findOnce() || descMatches('10000金币').visibleToUser().findOnce()
        if(p){
            func.clickObject(p);
            sleep(3000)
        }
        func.clickObject(o);
        sleep(3000)
        o = textMatches('看广告提现').visibleToUser().findOnce() || descMatches('看广告提现').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            sleep(3000)
            func.sleep(10000, '等待中', "textMatches('继续赚钱').visibleToUser().exists() || descMatches('继续赚钱').visibleToUser().exists()");
            o = textMatches('继续赚钱').visibleToUser().findOnce() || descMatches('继续赚钱').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o);
            }else{
                func.sleep(60000, "提现看金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
            }
        }
        o = textMatches('我知道了').visibleToUser().findOnce() || descMatches('我知道了').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }


    }

}


function sign(){
    try{
        var o = id(package + ':id/makeCoinTab').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(10000, '等待中', "textMatches('看视频再领.*金币|我的金币').visibleToUser().exists() || descMatches('看视频再领.*金币|我的金币').visibleToUser().exists()");
            func.sleep(2000);
            o = packageName(package).textMatches('看视频再领.*金币').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(5000);
                p= packageName(package).textMatches('看视频再领.*金币').visibleToUser().findOnce()
                if(p){
                    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(3000);
                    }
                }else{
                    func.sleep(60000,'签到领金币中',"idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog();
                    func.sleep(2000);
                }
            }

            var ii = 5;
            while(ii-- > 0){
                o = id(package + ':id/tv_coinnum').visibleToUser().findOnce();
                if(o){
                    func.clickObject(o);
                    func.sleep(5000);
                    o = id(package + ':id/tv_coinnum').visibleToUser().findOnce();
                    if(o){
                        break
                    }
                    func.sleep(60000,'领50金币中',"idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog();
                    func.sleep(2000);
                }
                else{
                    o = text('领金币').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o)
                        func.sleep(5000);
                        o = text('领金币').visibleToUser().findOnce();
                        if(o){
                            break
                        }
                        func.sleep(60000,'领50金币中',"idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                        closeDialog();
                        func.sleep(2000);
                    }
                }
            }
            
            o = id(package + ':id/homeTab').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(3000);
            }
        }
    }
    catch(e){
        func.log(appname,'签到',e.message + '\n\r' + e.stack);
    }
}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        o = idMatches(package +':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            if (o.id().indexOf('tt_bu_close') == -1 && !textMatches('看视频再领.*').visibleToUser().exists())
                func.clickObject(o);
        }
    },3000);
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