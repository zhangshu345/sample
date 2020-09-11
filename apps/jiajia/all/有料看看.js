auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
const appname = '有料看看';
const package = 'com.youliao.topic';

var classModule = {};
classModule.func = null;
classModule.minMinutes = 15;
classModule.maxMinutes = 25;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.redrawToAlipay = 0;
classModule.autoR = 0;	//默认自动提现
keys = '点击重播|点击下载|点击打开'
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
        var o = func.execApp(appname,package)
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }
    checkPage();

    
    //在这里读取微鲤的配置文件
    var cfg = func.loadConfig(appname);
    
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date() .toLocaleDateString();
    var readeds = cfg.readeds || [];    //已经读了的文章
    
    if (lastdate != nowdate){    //是新的一天
        readeds = [];   //已读的为空;
        lastdate = nowdate;
        cfg.lastdate = lastdate
    }
    
    func.openWaiting([]);  

    this.func.sleep(2000);
    pickCoin();
    try{
        sign()
        var idx = 1;
        var bol = true;
        var needrefresh = false;
        while(bol){
            func.checkSpace();  //检测一次存储空间

            if(!packageName(package).text('推荐').visibleToUser().exists() ){
                    var o = packageName(package).text('有料').visibleToUser().findOnce() || packageName(package).desc('有料').visibleToUser().findOnce();
                    if(o){
                        func.clickObject(o);
                        func.sleep(2000);
                    }else{
                        refresh()
                    }

            }

            //开始获取内容来阅读，做阅读存盘、判断是否已阅，自动上滑、刷新等
            var child = className("TextView").visibleToUser().filter(function(w){
                var r = w.bounds().bottom < device.height - 200 && w.text().indexOf(' ') == -1;
                if (w.parent())
                    r = r && w.parent().childCount() >= 3 && w.parent().find(text('广告')).length == 0;
                return r;
            }).filter(function (w) { return w.bounds().bottom > device.height * 0.25; }).findOnce();
            if(child){
                let txt = child.text();
                if (readeds.join().indexOf(txt) < 0){   //不在本次历史，不在总历史
                    readeds.push(txt);  //保存到今天已阅读
                    cfg.readeds = readeds;
                    func.saveConfig(appname,JSON.stringify(cfg));     

                    var isopen = 5,gn = false;
                    while(isopen > 0){
                        func.clickObject(child);
                        func.sleep(4000); 
                        try{
                            if (textMatches('本篇奖励已达上限.*').visibleToUser().exists())
                                isopen = -1
                            else if (idEndsWith('article').exists() || (currentActivity().indexOf('RNActivity') > 0 && !packageName(package).text('有料').visibleToUser().exists())){
                                func.toast('第' + idx + '篇文章：打开成功');
                                isopen = 0;
                                gn = true
                            }
                            else
                                isopen -= 1;
                        }
                        catch(e){
                            log(e.message)
                        }
                    }

                    x = textMatches(txt).visibleToUser().findOnce();
                    if (x) {
                        var list = x.parent();
                        w = list.bounds()
                        var p = textMatches(/\d+:\d+/).boundsInside(w.left , w.top , w.right , w.bottom ).findOnce();
                        if(p){
                            toast("视频 跳过")
                            gn = false
                        }
                    }
                    if (gn){
                        func.toast('开始阅读第' + idx + '篇文章或视频',2)
                        func.toast('第' + idx + '篇文章或视频：' + txt);
                        idx++;

                        if (textMatches('推荐视频|.*相关推荐|Video Player').visibleToUser().exists()){//打开的是视频
                            // var waitsec = random(me.minVideoSec,35);  //默认视频35秒，因为金币上限为35秒
                            waitsec = 1
                            func.toast('本次视频播放时长' + waitsec + '秒',2);
                            func.videoSleep(waitsec);
                        }
                        else{
                            var max = random(me.minSwipe,me.maxSwipe);
                            for (var i = 0; i < max; i++){
                                var s = random(me.minTextSec * 1000,me.maxTextSec * 1000);
                                func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
                                func.sleep(s);   //随机阅读3到8秒
                                func.swipeUp();
                                
                                var more = packageName(package).textMatches('点击阅读全文|点击阅读更多|查看全文').filter(function(w){return w.bounds().height() > 20;}).visibleToUser().findOnce();
                                if (more){
                                    func.clickObject(more);
                                    func.sleep(1000);
                                }
                                else{
                                    var o = packageName(package).textMatches('相关推荐|相关新闻|推荐阅读|热门评论').visibleToUser().exists();
                                    if (o)
                                        break;    //复位循环次数，不再继续上拉
                                    else if (packageName(package).textStartsWith('本篇奖励已达上限').visibleToUser().exists())
                                        break;
                                }
                            }
                            func.toast('本篇已经阅读完成！',2)
                        }
                        if (idx % 5 == 0)
                            func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)   
                        if (idx % 11 == 1) //每看十条刷新一次首页
                            needrefresh = true;
                        else if (idx % 4 == 0 && func.release <= 7 && func.is2GMemory){
                            func.toast('退出循环，准备重启');
                            break;
                        }
                    }                     
                                        
                    if (textStartsWith('恭喜获得客服指导一次').exists()){
                        //要直接点返回
                        var o = className('android.view.ViewGroup').visibleToUser().findOnce(3);
                        if (o)
                            func.clickObject(o)
                    }
                    else                    
                        func.back();
                    func.sleep(2000);     
                }              
            }

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
            }
            else{
                if (needrefresh){ //每看十条刷新一次首页
                    refresh();
                    needrefresh = false;
                }   
                else{
                    if (idx % 4 == 0 && func.release <= 7 && func.is2GMemory)
                        func.restart(appname,package);
                    else{ //上拉一屏，继续获取要阅读的文章
                        func.swipeUp();
                        func.sleep(2000);
                    }                    
                }             
            } 
        }
        sign();    //签到，并返回结果
        if (this.autoR == 0) autoRedraw();
    }
    catch(ee){
        func.log(appname,'循环执行',ee.message + '\n\r' + ee.stack);
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束运行' ,"**********************************************************");
    func.quit(package);
}

function autoRedraw(){
    var ii = 5;
    while(ii-- > 0 && !textMatches('有料').visibleToUser().exists()){
        back()
        func.sleep(2300);
    }
    var o = packageName(package).text('资产').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);

        o = packageName(package).text('提现兑换').visibleToUser().findOne(5000);
        if (o){
            func.clickObject(o);
            func.sleep(3000);

            o = packageName(package).textMatches('约[0-9.]+元').visibleToUser().findOnce();
            if (o){
                var money = Number(o.text().replace('约','').replace('元','').trim()) || 0;
                if (money >= 1){
                    var redrawTo = Number(classModule.redrawToAlipay) || 0;
                    // o = packageName(package).text(redrawTo == 0 ? '微信' : '支付宝').visibleToUser().findOnce();
                    // if (o){
                    //     func.clickObject(o);
                    //     func.sleep(2000);
                    // }

                    o = packageName(package).text('微信').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                    var btns = packageName(package).textMatches('[0-9]*元 *').visibleToUser().filter(function(w){
                        var r = Number(w.text().replace('元','').trim()) || 0;
                        return r <= money && r > 0;
                    }).find();
                    for(var i = btns.length - 1; i >= 0; i--){
                        func.clickObject(btns[i]);
                        func.sleep(1000);
        
                        o = text('立即提现').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o)
                            func.sleep(1000);
                                
                            if (packageName(package).textMatches('马上去赚金币|知道啦').visibleToUser().exists()){
                                func.back();
                                func.sleep(1000);
                            }
                            else
                                func.toast('提现：' + btns[i].text())
                        }
                    }
                }
                else{
                    func.toast('余额不足，不能提现',1)
                }
            }
        }
    }
}

function checkPage(){
    if (currentPackage() != package){
        func.quit(package);
        func.sleep(2000);
        func.execApp(appname,package);
    }
    else   
        return true;    //当前是头条页
}

function pickCoin(){
    var o = packageName(package).textMatches('.*再领[0-9]*').findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(60000,'看视频领金币中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }
    }
}

function sign(){
    refresh()
    var ii = 5;
    while (ii-- > 0 && !textMatches('签到|热料').visibleToUser().exists()) {
        if (ii < 3) {
            o = packageName(package).textMatches('资产').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                sleep(3000)
            }
        }
        o = packageName(package).textMatches('有料').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('签到|热料').visibleToUser().exists() || descMatches('签到|热料').visibleToUser().exists()");
        }
        closeDialog()
    }
    is_sign = true
    var finds = packageName(package).className('android.widget.TextView').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.2; }).find();
    for(var kk = 0; kk < finds.length; kk++){
        let child = finds[kk];
        let txt = child.text();
        let idd = child.id();
        if(txt == "签到"){
            is_sign = false
            break
        }
    }
    if(is_sign){
        return
    }

    var ii = 5;
    while (ii-- > 0 && !textMatches('签到奖励说明').visibleToUser().exists()) {
        o = packageName(package).textMatches('签到').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('签到奖励说明').visibleToUser().exists() || descMatches('签到奖励说明').visibleToUser().exists()");
        }
        closeDialog()
    }
    sleep(3000)
    o1 = packageName(package).textStartsWith('您已连续签到').visibleToUser().findOne(5000);
    if (o1){
        o2 = packageName(package).text('+688').visibleToUser().findOnce();
        if (!o2) o2 = packageName(package).text('已领取').visibleToUser().findOnce();
        if (o1 && o2){
            var ob = o1.bounds().bottom;
            var ot = o2.bounds().top;
            var posy = ob + (ot - ob) / 2;
            click(device.width / 2,posy);  //点击签到
            func.sleep(3000);
        }  
    }
    o = textMatches('.*再领.*金币').visibleToUser().findOne(1000);
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
        func.sleep(60000, "签到金币领取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        closeDialog()
        sleep(3000)
        closeDialog()
    }
    sleep(5000)
    back()


    // var o = packageName(package).textMatches('签到|每天赚10元').visibleToUser().findOnce() || packageName(package).descMatches('签到|每天赚10元').visibleToUser().findOnce() ;
    // if (o){
    //     func.clickObject(o);
    // }


        // var ii = 5;
        // while(ii-- > 0 && !textMatches('有料|资产').visibleToUser().exists() && !descMatches('有料|资产').visibleToUser().exists()){
        //     back()
        //     func.sleep(2300);
        // }
        // var ii = 5;
        // while (ii-- > 0 && !textMatches('签到|每天赚10元').visibleToUser().exists()) {
        //     if(ii<3){
        //         o = packageName(package).textMatches('有料').visibleToUser().findOnce();
        //         if (o) {
        //             func.clickObject(o)
        //             sleep(3000)
        //         }
        //     }
        //     o = packageName(package).textMatches('资产').visibleToUser().findOnce();
        //     if (o) {
        //         func.clickObject(o)
        //         func.sleep(10000, '等待中', "textMatches('签到|每天赚10元').visibleToUser().exists() || descMatches(签到|每天赚10元').visibleToUser().exists()");
        //     }
        //     closeDialog() 
        // }
        

        // var o = packageName(package).textMatches('签到|每天赚10元').visibleToUser().findOnce() || packageName(package).descMatches('签到|每天赚10元').visibleToUser().findOnce() ;
        // if (o){
        //     func.clickObject(o);
        //     func.sleep(3000);
        //     o1 = packageName(package).textStartsWith('您已连续签到').visibleToUser().findOne(5000);
        //     if (o1){
        //         o2 = packageName(package).text('+688').visibleToUser().findOnce();
        //         if (!o2) o2 = packageName(package).text('已领取').visibleToUser().findOnce();
        //         if (o1 && o2){
        //             var ob = o1.bounds().bottom;
        //             var ot = o2.bounds().top;
        //             var posy = ob + (ot - ob) / 2;
        //             click(device.width / 2,posy);  //点击签到
        //             func.sleep(3000);
        //         }  
        //     }
        //     o = textMatches('.*再领.*金币').visibleToUser().findOne(1000);
        //     if (o) {
        //         func.clickObject(o);
        //         func.sleep(2000);
        //         func.sleep(60000, "签到金币领取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        //         closeDialog()
        //         sleep(3000)
        //         closeDialog()
        //     }

        // }
        // func.back();
        // func.sleep(2000);
        
}

function refresh(){
    var ii = 7;
    while(ii-- > 0 && !textMatches('有料|资产').visibleToUser().exists()){
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

function closeDialog() {
    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        log(77)
        func.back();
        func.sleep(3000);

    }

    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(4000);
        log(77)
    }
}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();

        var o = null;
        var act = currentActivity().toLowerCase()
        if (act == 'android.app.dialog'){
            o = className('ImageView').findOnce(1);
            if (o)  func.clickObject(o)            
        } 

        o = null;
        o = textMatches('先去逛逛|我知道了|继续播放|放弃奖励').visibleToUser().findOnce() || idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o)
            func.clickObject(o);

        o = null;
        if (textContains('恭喜你，完成').find().length == 1){
            o = className('ImageView').findOnce(1);
            if (o)  func.clickObject(o)
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