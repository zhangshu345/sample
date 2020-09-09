const appname = '波波视频';
const package = 'tv.yixia.bobo';

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
var keys = '继续下载|点击下载|点击打开|立即下载|关闭|点击领取'

classModule.start = function(){
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package){
        var s = Number(classModule.sec) || 15;
        if (s < 10)  s = 10
        var o = func.execApp(appname,package,s * 1e3)
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }

    //在这里读取配置文件
    var cfg = func.loadConfig(appname);
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date().toLocaleDateString();
    var readeds = cfg.readeds || [];

    if (lastdate != nowdate){    //是新的一天
        lastdate = nowdate;
        cfg.lastdate = lastdate
        readeds = [];
    }    
    
    func.openWaiting(['.FrameLayout','.SplashActivity','.WelcomeActivity'])
    sign();    //签到，并返回结果
    try{
        var idx = 1;
        var bol = true;
        var needrefresh = false;
        while(bol){
            func.checkSpace();  //检测一次存储空间
            if(text('评论').visibleToUser().exists()){
                func.back();
                this.func.sleep(2000);
            }

            if(!packageName(package).text('关注').visibleToUser().exists() || !packageName(package).text('我的').visibleToUser().exists()){
                if (packageName(package).text('首页').visibleToUser().exists()){
                    var o = packageName(package).text('首页').visibleToUser().findOnce();
                    func.clickObject(o)
                    func.sleep(2000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase()){
                        func.restart(appname,package)
                    }
                    else{ 
                        //if (currentActivity().indexOf('AdActivity') == -1){
                            func.back();     
                            func.sleep(2000);
                        //}
                        //else
                        //    this.func.sleep(3000);
                    }
                }
            }

            pickCoin(); //领奖

            o = textMatches('关注|推荐|搞笑|音乐').visibleToUser().findOnce();
            var top = 150;
            if (o)  top = o.bounds().bottom;

            var child = packageName(package).textMatches(/\d+:\d+/).filter(function(w){
                return w.bounds().centerY() < device.height - 150 && w.bounds().top > top && w.bounds().width() > 0;
            }).findOnce();
            if (child) {//for(var ii = 0; ii < finds.length; ii++){
                var sectxt = child.text();
                var pos = child.indexInParent() - 1;
                if (pos >= 0) child = child.parent().child(pos);
                let txt = child.text();
                if (readeds.join().indexOf(txt) < 0){   //不在本次历史，不在总历史
                    readeds.push(txt);  //保存到今天已阅读
                    cfg.readeds = readeds;
                    func.saveConfig(appname,JSON.stringify(cfg));   
                    idx++;
                    func.toast('开始阅读第' + idx + '遍文章：' + txt);
                    var sec = random(me.minVideoSec,me.maxVideoSec);

                    try{
                        func.clickObject(child.parent())
                        func.sleep(1500);
                        o = text('点此继续播放').visibleToUser().findOnce() || desc('点此继续播放').visibleToUser().findOnce();
                        if(o){
                            this.func.clickObject(o);
                            this.func.sleep(1500);
                        }
                        var l = Number(sectxt.split(':')[0]) || 0;
                        var r = Number(sectxt.split(':')[1]) || 0;
                        var sec = l * 60 + r;
                        if (sec > 90) sec = 90;
                        
                        if (me.maxVideoSec < sec)
                            sec = random(me.maxVideoSec,sec);
                        else if (me.maxVideoSec < sec)
                            sec = random(me.minVideoSec,sec);
                        else
                            sec = random(me.minVideoSec,me.maxVideoSec);
                        func.videoSleep(sec)

                        if (textMatches('相关推荐|评论\(.*\)').visibleToUser().exists()){
                            this.func.back();
                            this.func.sleep(2000);
                        }
                    }
                    catch(e){
                    }

                    if (packageName(package).textStartsWith('今日待领取奖励').visibleToUser().exists()){
                        var o = packageName(package).text('点击领取').findOnce();
                        if (o){
                            func.clickObject(o);
                            func.sleep(3000);
                            func.back();
                        }
                    }   
                    o =  packageName(package).textMatches('领取[0-9]+金币').findOnce();
                    if (o){
                        if(o.parent().find(textMatches('浏览资讯赚金币|浏览最热资讯.*')).length == 0){
                            func.clickObject(o);
                            func.sleep(2000);
                            func.sleep(60000,"领币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').visibleToUser().exists()")
                            closeDialog();
                        }
                    }

                    if (idx % 5 == 0)
                        func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)
                    if (idx % 11 == 0) //每看十条刷新一次首页
                        needrefresh = true;
                }
            }
        
            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
                collect();
            }
            else{
                if (needrefresh){ //每看十条刷新一次首页
                    refresh(); 
                    needrefresh = false;
                }
                else{
                    //上拉一屏，继续获取要阅读的文章
                    func.swipeUp();
                    func.sleep(2000);
                }
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
    func.log(appname,'结束运行' ,"**********************************************************");
    func.quit(package);
}


function autoRedraw(){
    var ii = 5;
    while(ii-- > 0 && !text('我的').visibleToUser().exists()){
        func.back();
        func.sleep(2200);
    }
    var money = 0;

    var o = text('我的').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(3000);
    }

    o = packageName(package).textMatches('[0-9]+').visibleToUser().findOne(10000)
    if (o)
        money = Number(o.text()) || 0;
    else{
        o = packageName(package).descMatches('[0-9]+').visibleToUser().findOnce();
        if(o) money = Number(o.desc()) || 0;
    }
    func.toast('金币:' + money,1)    
    if (money > 0){
        var o = text('提现').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(3000);

            var btn = packageName(package).textMatches('立即提现').visibleToUser().findOne(10000) || packageName(package).descMatches('立即提现').visibleToUser().findOnce();
            if (o){
                if (this.redrawToAlipay == 1){
                    o = packageName(package).textMatches('支付宝').visibleToUser().findOnce() || packageName(package).descMatches('支付宝').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                }

                var btns = packageName(package).textMatches('[0-9]+(特权|普通)金币').visibleToUser().filter(function(w){
                    var r = Number(w.text().replace('特权金币','').replace('普通金币','').trim()) || 0;
                    return r > 0 && r <= money;
                }).find();
                if (btns.length == 0)
                    btns = packageName(package).descMatches('[0-9]+(特权|普通)金币').visibleToUser().filter(function(w){
                        var r = Number(w.desc().replace('特权金币','').replace('普通金币','').trim()) || 0;
                        return r > 0 && r <= money;
                    }).find();
                for(var i = btns.length - 1; i >= 0; i--){
                    func.clickObject(btns[i]);
                    func.sleep(2000);

                    btn = packageName(package).text('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();
                    if (btn){
                        func.clickObject(btn)
                        func.sleep(3000);
                        
                        o = textMatches('提现|确认提现').visibleToUser().findOnce() || descMatches('提现|确认提现').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o);
                            func.sleep(6000);
                            o = textMatches('去授权').visibleToUser().findOne(10000) ||  descMatches('去授权').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                                func.sleep(6000);
                                var agree = text('同意').visibleToUser().findOne(10000);
                                if (agree) {
                                    func.clickObject(o);
                                    func.sleep(2000);
                                }
                            }
                            o = textMatches('提现|知道了').visibleToUser().findOne(10000) ||  descMatches('提现|知道了').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                                func.sleep(3000);
                            }
                            break;
                        }
                        else{
                            func.sleep(2000);
                        }
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
    }
}

function closeDialog(){
    var o;
    if (textMatches(keys).visibleToUser().exists() || descMatches(keys).visibleToUser().exists()){
        o = className('ImageView').visibleToUser().filter(function(w){return w.bounds().centerY() < 200;}).findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(3000);
        }
    }
    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o)
        func.sleep(3000);
    }
    o = text('继续领').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);
        // func.sleep(60000,"领币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('可领取|点击下载|点击打开|立即下载|推荐').visibleToUser().exists()")
        func.sleep(60000,"领币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('可领取|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        
        closeDialog();
    }
    
    if (text('恭喜获得').visibleToUser().exists()){
        func.back();
        func.sleep(1000);
    }
}

function collect(){
    var o = packageName(package).text('我的').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);

        o = packageName(package).text('金币').visibleToUser().findOnce();
        if (o){
            func.clickObject(o)
            func.sleep(4000);
            o = packageName(package).text('一键领取').visibleToUser().findOnce();
            if (o){
                func.clickObject(o)
                func.sleep(4000);

                func.back();
            }
            func.back();
        }
    }
}
function refresh(){
    try{
        var o = packageName(package).text('刷新').visibleToUser().findOnce();
        func.clickObject(o)
        func.sleep(2000);
    }
    catch(e){
        func.log(appname,'刷新',e.message + '\n\r' + e.stack);
    }
}

function pickCoin(){
    try{
        var o = packageName(package).text('免费领').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(1000);
            // func.sleep(60000,"领币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('可领取|点击下载|点击打开|立即下载|推荐').visibleToUser().exists()")
            func.sleep(60000,"领币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('可领取|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        
            closeDialog();
            func.sleep(2000);
        }
    }
    catch(e){
        func.log(appname,'领币',e.message + '\n\r' + e.stack);
    }
}

function sign(){
    try{
        var o = packageName(package).text('赚钱').findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            o = packageName(package).text('签到').findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                o = packageName(package).text('金币翻倍').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                    func.sleep(60000,"金币翻倍中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists()")
                    closeDialog();
                    func.sleep(2000);
                }
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
        o = idMatches(package +':id/(.*close.*|wm_image_clear)').visibleToUser().findOnce();
        if (o){
            if (!text('继续领').visibleToUser().exists())
                func.clickObject(o);
        }

        if (packageName(package).textStartsWith('今日待领取奖励').visibleToUser().exists()){
            var o = packageName(package).text('点击领取').findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(3000);
                func.back();
            }
        }   

        if(packageName(package).textMatches('发现新版本|恭喜获得').visibleToUser().exists())
            func.back();          
        
        if (currentActivity().indexOf('BbWebViewActivityV3') > 0)
            func.back();

        if (currentActivity().indexOf('AdActivity') > 0 || textMatches(keys).visibleToUser().exists() || descMatches(keys).visibleToUser().exists()){
            o = className('ImageView').visibleToUser().filter(function(w){return w.bounds().centerY() < 200;}).findOnce();
            if (o){
                func.clickObject(o)
                func.sleep(2000);   //等恭喜获得出来
            }
        }

        o = className("android.view.View").text("").clickable(true).findOnce();
        if (o){
            func.clickObject(o)
        }
        var o = packageName(package).textMatches('知道了|继续退出|放弃奖励').findOnce() || packageName(package).descMatches('知道了|继续退出').findOnce();
        if (o)
            func.clickObject(o)
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
classModule.start()