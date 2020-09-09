const package = 'com.kugou.android.elder';
var appname = app.getAppName(package) || '酷狗音乐大字版';

var classModule = {};
classModule.minMinutes = 5;
classModule.maxMinutes = 7;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
classModule.func = null;
keys = '点击重播|点击下载|点击打开'
classModule.start = function(){
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    // var minutes =1
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package){
        var o = func.execApp(appname,package,15000,"textMatches('视频|搜索').visibleToUser().exists() || descMatches('视频|搜索').visibleToUser().exists()")
        if (!o){
            appname = '酷狗大字版'
            var o = func.execApp(appname,package,15000,"textMatches('视频|搜索').visibleToUser().exists() || descMatches('视频|搜索').visibleToUser().exists()")
            if (!o){
                toast("没有找到" + appname);
                thread.interrupt();
                minutes = 0;
                return; //退出函数
            }
        }
    }

    func.openWaiting()
    sign();    //签到，并返回结果

    try{
        var idx = 1;
        var bol = true;
        var ii = 5
        while (ii-- > 0) {
        
            if (ii < 4) {
                back()
            }
            o = packageName(package).textMatches('看点|视频').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                sleep(2000)
            }
        
            o = packageName(package).textMatches('推荐').visibleToUser().findOnce();
            if (o) {
                // sleep(2000)
                break
            }
        }
        
        while(true){
            sleep(3000)
            o = textMatches(/\d+:\d+/).visibleToUser().findOnce();
            if (o){
                // func.clickObject(o);
                click(device.width*0.5,o.bounds().centerY())
            }
            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2) 
                break
            }
        }
        if (this.autoR == 0) autoRedraw();

    }
    catch(e){
        log(e.message + '\n\r' + e.stack);
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    // log(111)
    func.log(appname,'结束运行' ,"**********************************************************");
    func.quit(package);
}

function sign(){

    try{
        sleep(3000)
        closeDialog()
        var o = packageName(package).textMatches('点击赚钱|赚钱').visibleToUser().findOnce() || packageName(package).descMatches('点击赚钱|赚钱').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }

        o = text('赚钱').visibleToUser().findOne(3000) || desc('赚钱').visibleToUser().findOnce();
        if (textMatches('去赚钱|我的金币|每日签到|分享视频').visibleToUser().exists()){
            var ii = 20;
            while(ii-- > 0){
                o = text('签到').visibleToUser().filter(function(w){return w.bounds().bottom < device.height * 0.85;}).findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(3000);
                    if (textMatches('看完1个创意.*|邀好友赚金币').visibleToUser().exists()){
                        func.back();
                        func.sleep(3000);
                    }
                }
                o = text('去赚钱').visibleToUser().filter(function(w){return w.bounds().bottom < device.height * 0.85;}).findOnce();
                if (!o){
                    func.swipeUp();
                    w = device.width;
                    h = device.height;
                    // swipe(w * 0.6 - random(10, 30), h * 0.2 + random(10, 20), w * 0.6 + random(50, 80), h * 0.8 + random(10, 30), random(220, 235))

                    func.sleep(2000);
                    o = text('去赚钱').visibleToUser().filter(function(w){return w.bounds().bottom < device.height * 0.85;}).findOnce();
                }
                if (o){
                    func.toast('看创意视频',1);
                    func.clickObject(o);
                    func.sleep(2000);
                    // func.sleep(60000,'创意视频中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || text('邀好友赚金币').visibleToUser().exists()");
                    func.sleep(60000,'创意视频中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|点击打开|邀好友赚金币').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog()
                    func.sleep(2000);
                    closeDialog()
                }
                else{
                    break;
                }
            }
            var ii = 3;
            while(ii-- > 0 ){
                o = text('去分享').visibleToUser().filter(function(w){return w.bounds().bottom < device.height;}).findOnce();
                if (!o){
                    func.swipeUp(0,0,random(301,330));
                    func.sleep(2000);
                }else{
                    break
                }
            }
            func.swipeUp(0,0,random(301,330));

            var jj = 3;
            while(jj-- > 0){
                o = text('去分享').visibleToUser().filter(function(w){return w.bounds().bottom < device.height;}).findOnce();
                if (o) {
                    func.clickObject(o);
                    sleep(3000)
                    o = descMatches('返回').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.3; }).findOnce()
                    // o = id('ewh').visibleToUser().findOnce();
                    if(o){
                        y_info = o.bounds().centerY()
                        click(device.width*0.9,y_info)
                        func.sleep(3000);
                        o = text('微信').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                            func.sleep(10000, '等待中', "textMatches('选择|多选').visibleToUser().exists() ");
                            sleep(1000)
                            back()
                            // func.sleep(5000);
                            // back()
                            // sleep(2000)
                            func.sleep(10000, '等待中', "textMatches('赚更多金币|邀好友一起听歌赚钱|参与集卡活动').visibleToUser().exists() || descMatches('赚更多金币|邀好友一起听歌赚钱').visibleToUser().exists()");
                            if (textMatches('赚更多金币|邀好友一起听歌赚钱|参与集卡活动').visibleToUser().exists() || descMatches('赚更多金币|邀好友一起听歌赚钱').visibleToUser().exists()) {
                                func.back();
                            }
                            o = id('ezy').visibleToUser().findOnce();
                            if (o) {
                                func.clickObject(o);
                            }
                            back()
                            sleep(2000)
                        } else {
                            back()
                        }
                    }
                
                    // o = id('gk1').visibleToUser().findOnce();
                    o = descMatches('更多').visibleToUser().filter(function (w) { return w.bounds().bottom > device.height * 0.3; }).findOnce()
                    if(o){
                        y_info = o.bounds().centerY()
                        click(device.width*0.9,y_info)
                        func.sleep(3000);
                        o = text('微信').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                            func.sleep(10000, '等待中', "textMatches('选择|多选').visibleToUser().exists() ");
                            sleep(1000)
                            back()
                            // func.sleep(5000);
                            // back()
                            // sleep(5000)
                            func.sleep(10000, '等待中', "textMatches('赚更多金币|邀好友一起听歌赚钱|参与集卡活动').visibleToUser().exists() || descMatches('赚更多金币|邀好友一起听歌赚钱').visibleToUser().exists()");
                            if (textMatches('赚更多金币|邀好友一起听歌赚钱|参与集卡活动').visibleToUser().exists() || descMatches('赚更多金币|邀好友一起听歌赚钱').visibleToUser().exists()) {
                                func.back();
                            }
                
                            o = id('ezy').visibleToUser().findOnce();
                            if (o) {
                                func.clickObject(o);
                            }
                        }
                    }
            
                }
                sleep(1000)
                var ii = 5;
                while(ii-- > 0){
            
                    var o = packageName(package).textMatches('赚钱').visibleToUser().findOnce() || packageName(package).descMatches('点击赚钱|赚钱').visibleToUser().findOnce();
                    if (o){
                        o = text('赚钱').visibleToUser().findOne() || desc('赚钱').visibleToUser().findOnce();
                        if(o){
                            func.clickObject(o);
                            sleep(1000)
                            break
                        }
                    }
                    closeDialog()
                    back()
                    sleep(3000)
                }
            }
        

        }

        o = packageName(package).text('返回').visibleToUser().findOnce() || packageName(package).desc('返回').visibleToUser().findOnce();
        if (o){
            func.back();
            func.sleep(2000);
        }
    }
    catch(e){
        func.log(appname,'签到',e.message + '\n\r' + e.stack);
    }
}

function closeDialog() {
    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }
    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(3000);
    }
    if (textMatches('看完1个创意.*|邀好友赚金币').visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }
}

function autoRedraw(){
    var ii = 5;
    while(ii-- > 0 && !textMatches('赚钱').visibleToUser().exists()){
        func.back();
        func.sleep(2300);
    }


    var ii = 5;
    while(ii-- > 0 ){
        o = textMatches('提现').visibleToUser().exists()
        if(o){
            break
        }
        o = textMatches('赚钱').visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
        }
        swipe(device.width*0.5,device.height*0.35,device.width*0.5,device.height*0.65,450)
        func.sleep(1000);
    }

    o = textMatches('约.*元').visibleToUser().findOnce()
    if(o){
        old_moeey = o.text()
        money =     old_moeey.replace('约', '')
        money =     money.replace('元', '')
        if(money>0.01){
            var ii = 5;
            while(ii-- > 0){
                o = textMatches('提现').visibleToUser().findOnce()
                if(o){
                    func.clickObject(o);
                    sleep(2000)
                }
            
                o = textMatches('2元').visibleToUser().findOnce()
                if(o){
                    func.clickObject(o);
                    sleep(2000)
                }
            
                o = textMatches('确认提现').visibleToUser().findOnce()
                if(o){
                    func.clickObject(o);
                    sleep(2000)
                }
            
                o = textMatches('去设置').visibleToUser().findOnce()
                if(o){
                    func.clickObject(o);
                    sleep(2000)
                }
            
                o = textMatches('.*未达到.*|.*已发起.*').visibleToUser().findOnce()
                if(o){
                    break
                }
            
            }
        }else{
            toast("金额不足,不够体现")
        }
    }
}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        o = idMatches(package +':id/.*close.*').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
        }

        if (textMatches('赚更多金币|邀好友一起听歌赚钱|参与集卡活动').visibleToUser().exists() || descMatches('赚更多金币|邀好友一起听歌赚钱').visibleToUser().exists()){
            func.back();
        }
        o = packageName(package).textMatches('我知道了|放弃奖励').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(1000);
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