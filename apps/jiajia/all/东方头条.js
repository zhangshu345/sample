const appname = '东方头条';
const package = 'com.songheng.eastnews'; 

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

classModule.start = function(){
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package){
        var o = func.execApp(appname,package,15000,"textMatches('头条|任务').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            if (thread) thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }

    //在这里读取配置文件
    var cfg = func.loadConfig(appname);
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date().toLocaleDateString();
    var readeds = cfg.readeds || [];    //已经读了的文章
    
    if (lastdate != nowdate){    //是新的一天
        readeds = [];   //已读的为空;
        lastdate = nowdate;
        cfg.lastdate = lastdate
    }   
    
    func.openWaiting(['.WelcomeActivity']); 

    //要判断是否要签到，或者领取时段奖励
    sign();    //签到，并返回结果
 
    var wechatCfg = func.wechatCfg ? func.wechatCfg() : {};
    try{
        var idx = 1;
        var bol = true;
        var mod = this;
        var needrefresh = false;
        while(bol){
            func.checkSpace();  //检测一次存储空间
            if(!packageName(package).textMatches('推荐|发布').visibleToUser().exists()){
                if (packageName(package).textMatches('新闻|刷新').exists()){
                    var o = packageName(package).textMatches('新闻|刷新').findOnce();
                    func.clickObject(o)
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase()){
                        func.restart(appname,package)
                    }
                    else{
                        func.back();
                        func.sleep(2000);
                    }
                }
            }

            pickCoin();

            var child = className('TextView').visibleToUser().filter(function(w){
                var b = w.bounds();
                var r = b.bottom < device.height * 0.85 && b.top > device.height / 6;
                r = r && w.depth() == (app.versionCode == 1 ? 18 : 5)
                if (w.parent())
                    r = r && w.parent().childCount() > 3;
                return r;
            }).findOnce();
            if(child){
                let txt = child.text();
                if (readeds.join().indexOf(txt) < 0){   //不在本次历史，不在总历史
                    readeds.push(txt);  //保存到今天已阅读
                    cfg.readeds = readeds;
                    func.saveConfig(appname,JSON.stringify(cfg));   

                    func.toast('开始阅读第' + idx + '篇文章：' + txt);
                    var isopen = 5, gn = false;
                    while(isopen > 0){
                        func.clickObject(child);
                        func.sleep(4000);    //等待两秒
                        if (textMatches('评论拿金币|快去发表伟大言论.*').exists()){  //有效activity的判断
                            func.toast('第' + idx + '篇文章：打开成功');
                            idx++;
                            isopen = 0;
                            gn = true;
                        }
                        //else if (act.indexOf('mobads.AppActivity') > 0 || act.indexOf('TTLandingPageActivity') > 0){ //无效activity的判断
                        //    isopen = -1;    //广告
                        //}
                        else
                            isopen -= 1;
                    }
    
                    //************ */
                    if (gn){
                        if (text('喜欢').exists()){
                            var o = className('ProgressBar').visibleToUser().findOnce();
                            if (o){
                                click(device.width/2,o.bounds().top / 2);
                                func.sleep(500);
                                var sec = random(20,40);
                                o = packageName(package).textMatches(/\d+:\d+/).findOnce(1);
                                this.func.show(o)
                                if (o){
                                    var tmp = o.text();
                                    var l = Number(tmp.split(':')[0]) || 0;
                                    var r = Number(tmp.split(':')[1]) || 0;
                                    var sec = l * 60 + r;
                                    if (sec > 60) sec = 60; //60
                                    if (me.maxVideoSec < sec)
                                        sec = random(me.maxVideoSec,sec);
                                    else if (me.minVideoSec < sec)
                                        sec = random(me.minVideoSec,sec);
                                    else
                                        sec = random(me.minVideoSec,me.maxVideoSec);
                                }
                            }

                            if (sec > 60) sec = 60;
                            func.videoSleep(sec);
                            func.toast('本次视频完成',2)
                        }
                        else{
                            var max = random(mod.minSwipe,mod.maxSwipe);
                            for (var i = 0; i < max; i++){
                                var s = random(me.minTextSec * 1000,me.maxTextSec * 1000);
                                func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
                                func.sleep(s);   //随机阅读3到6秒 
                                func.swipeUp();
            
                                var more = text('点击阅读全文').visibleToUser().findOnce();
                                if(more){
                                    if (more.bounds().top < device.height - 200 ){    //.height() > 0){
                                        func.clickObject(more);
                                        func.sleep(1000);
                                    }
                                }  
                                else if (text('热门新闻').visibleToUser().exists()){
                                    break;
                                }
                                else{
                                    if (i > 0 && className('TextView').visibleToUser().filter(function(w){
                                        var b = w.bounds();
                                        return w.text().length > 15 && w.depth() == 12;
                                    }).find().length >0){
                                        max = 0;
                                    }
                                } 
                                func.sleep(150);    //等待线程里的max生效，如果有更新的
                            }
                            func.toast('本篇已经阅读完成！',2)
                        }

                        //在这里判断要不要分享
                        if (packageName(package).text('评论拿金币').exists()){
                            if (this.func.isSendTimeline && this.func.isSendTimeline(wechatCfg.isFeed,wechatCfg.lastTimelineDate )){
                                o = packageName(package).text('评论拿金币').findOnce();
                                click(device.width * 0.9,o.bounds().centerY())
                                this.func.sleep(2000);
                                if (packageName(package).text('朋友圈').visibleToUser().exists()){
                                    var o = packageName(package).text('朋友圈').visibleToUser().findOnce();
                                    this.func.clickObject(o);
                                    this.func.sleep(8000);
                                    
                                    var sec = random(2 * 60 * 60, 4 * 60 * 60);
                                    wechatCfg.lastTimelineDate = Date.now() + sec * 1000;    //下次发圈时间
                                    this.func.saveConfig('微信',JSON.stringify(wechatCfg));  
                                    if (packageName('com.tencent.mm').text('发表').visibleToUser().exists()){
                                        packageName('com.tencent.mm').text('发表').visibleToUser().findOnce().click();
                                        this.func.sleep(2000);
                                        this.func.back()
                                        this.func.sleep(2000);
                                        this.func.back();
                                        this.func.sleep(2000);
                                    }
                                    else{
                                        this.func.back();
                                        this.func.sleep(1000);
                                        if (packageName('com.tencent.mm').textMatches('退出|不保留').visibleToUser().exists())
                                            packageName('com.tencent.mm').textMatches('退出|不保留').visibleToUser().findOnce().click();
                                        this.func.sleep(5000);
                                    }
                                }
                            }
                        }

                        if (idx % 5 == 0)
                            func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)
                        if (idx % 11 == 0) //每看十条刷新一次首页
                            needrefresh = true;
                    }
                    
                    var o1 = className('android.webkit.WebView').visibleToUser().filter(function(w){return w.text() != ''}).findOnce();
                    func.back(); //阅读完成，返回上级
                    func.sleep(2000);  
                    var o2 = className('android.webkit.WebView').visibleToUser().filter(function(w){return w.text() != ''}).findOnce();
                    if (o1 && o2){
                        if (o1.bounds().top == o2.bounds().top && o1.bounds().bottom == o2.bounds().bottom && o1.text() == o2.text()){
                            click(device.width * 0.15,device.height * 0.07);
                            func.sleep(1000);  
                        }
                    }
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
                    //上拉一屏，继续获取要阅读的文章
                    func.swipeUp();
                    func.sleep(2000);
                }
            }
        }
    }
    catch(e){
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
    }
    finally{
        if (thread) thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束运行' ,"**********************************************************");
    func.quit(package);
}

function refresh(){
    try{
        var o = text('刷新').findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(4000);
        }
    }
    catch(e){
        func.log(appname,'刷新',e.message + '\n\r' + e.stack);
    }
}

function sign(){
    try{
        var tsk = text('任务').visibleToUser().findOne(5000);
        if (tsk){
            func.clickObject(tsk)
            func.sleep(3000);

            if (currentActivity().indexOf('taskcenter.view.b.a.c') > 0){
                o = className('ImageView').findOnce(1);
                if (o)
                    func.clickObject(o);
            }

            o = text('可领取').visibleToUser().findOnce() || desc('可领取').visibleToUser().findOnce();
            if (o){
                var b1 = o.bounds().bottom;
                o = text('活动中心').visibleToUser().findOnce() || desc('活动中心').visibleToUser().findOnce();
                if (o){
                    var b2 = o.parent().parent().bounds().top;
                    var y = b1 + (b2 - b1) / 2;
                    click(device.width / 2,y)
                    func.sleep(2000);

                }
            }

            o = textMatches('新闻|刷新').visibleToUser().findOnce() ||  descMatches('新闻|刷新').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                func.sleep(2000);
            }
            else{
                click(device.width * 0.1,tsk.bounds().centerY());
                func.sleep(2000);
            }
        }
    }
    catch(e){
        func.log(appname,'签到',e.message + '\n\r' + e.stack);
    }
}


function pickCoin(){
    var o = packageName(package).text('立即领取').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(3000);
        func.back();
    }

    o = packageName(package).text('领取').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(3000);
        func.back();
    }

    o = packageName(package).text('拆红包').visibleToUser().findOnce()
    if (o){
        func.clickObject(o)
        func.sleep(3000);
        func.back();
    }    
}

function hasDialog(){
    //var func = classModule.func;
    setInterval(hasDialog2,3000);
}
function hasDialog2(){
    func.hasDialog();
    //在这里判断对话框

    var o = packageName(package).textMatches('立即领取 >|继续赚钱').findOnce()
    if (o){
        func.clickObject(o);
    }
    
    // o = packageName(package).text('立即领取').findOnce()
    // if (o){
    //     func.clickObject(o);
    //     func.sleep(1000);
    //     func.back();
    // }

    if (text('立即查看').visibleToUser().exists()){
        func.back();
    }
    
    if (currentActivity().indexOf('ad.common') > 0)
        back();
    else if (currentActivity().indexOf('taskcenter.view.b.a.c') > 0){
        o = className('ImageView').findOnce(1);
        if (o)
            func.clickObject(o);
    }

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