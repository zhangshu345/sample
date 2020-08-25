/**
 * 适配6.7.4 
 * 2019.12.3适配6.7.8
 */
const appname = '聚看点';
const package = 'com.xiangzi.jukandian'; 

var classModule = {};
classModule.minMinutes = 10;
classModule.maxMinutes = 20;
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
        var o = func.execApp(appname,package)
        if (!o){
            toast("没有找到" + appname);
            if (thread) thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }

    if (textMatches('您的账号状态异常.*').visibleToUser().exists()){
        this.func.toast('账号封禁，跳过此任务！',1)
        func.log(appname,'结束运行' ,"**********************************************************");
        if (thread) thread.interrupt();
        return;
    }

    //在这里读取配置文件
    var cfg = func.loadConfig(appname);
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date().toLocaleDateString();
    var readeds = cfg.readeds || [];    //已经读了的文章 
    
    if (lastdate != nowdate){    //是新的一天
        readeds = [];   //已读的为空;
        lastdate = nowdate;
        cfg.lastdate = lastdate;
    }    

    func.openWaiting();  

    try{
        var idx = 1;
        var bol = true;
        var needrefresh = false;
        while(bol){
            func.checkSpace();  //检测一次存储空间
            var o = text('关闭APP').findOnce();
            if (o){ //断网了，直接跳下一个
                func.clickObject(o);
                bol = false;
                break;
            }

            if (!text('刷新').exists()){
                var o = packageName(package).text('返回').findOnce();
                if (o){
                    func.clickObject(o);  
                    func.sleep(2000);
                }
                else{
                    if (packageName(package).text('看点').exists()){
                        o = packageName(package).text('看点').findOnce();
                        func.clickObject(o);
                        func.sleep(2000);
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
            }
            pickCoin(); //领奖
            var finds = idMatches(package + ':id/item_artical.*_title_tv').visibleToUser().filter(function(w){
                var r = w.bounds().bottom < device.height - 200;
                if (w.parent()){
                    r = r && w.parent().find(id(package + ':id/item_artical_ad_three_no_app_layout')).length == 0 && w.parent().find(text('精选推荐')).length == 0 && w.parent().find(text('广告')).length == 0;
                }
                return r;
            }).find();
            for(var kk = 0; kk < finds.length; kk++){
                let child = finds[kk];
                let txt = child.text();
                if (readeds.join().indexOf(txt) < 0){   //不在本次历史，不在总历史
                    readeds.push(txt);  //保存到今天已阅读
                    cfg.readeds = readeds;
                    func.saveConfig(appname,JSON.stringify(cfg));   

                    func.toast('开始阅读第' + idx + '篇文章：' + txt);
                    var isopen = 5, gn = false;
                    while(isopen > 0){
                        func.clickObject(child);
                        func.sleep(3000);    //等待两秒
                        var act = currentActivity();
                        if (packageName(package).text('返回').visibleToUser().exists() || packageName(package).text('评论得金币').exists() || act.indexOf('WebViewActivity') > 0 || act.indexOf('VideoActivity') > 0){  //有效activity的判断
                            func.toast('第' + idx + '篇文章：打开成功');
                            idx++;
                            isopen = 0;
                            gn = true;
                        }
                        else if (act.indexOf('LpNewsActivity') > 0){ //无效activity的判断
                            isopen = -1;    //广告
                        }
                        else{
                            if (packageName(package).text('关闭').exists()){
                                var o = packageName(package).text('关闭').exists();
                                func.clickObject(o)
                                isopen = 0
                            }
                            isopen -= 1;
                        }
                    }

                    //************ */
                    if (gn){
                        //log(4)
                        if (currentActivity().indexOf('VideoActivity') > 0){ //当前打开的是视频
                            //log('4a')
                            var sec = random(me.minVideoSec,me.maxVideoSec);
                            o = id(package + ":id/v2_native_video_player").findOnce();  ///点击视频
                            if (o){
                                func.clickObject(o);
                                func.sleep(500);
                                var b =  packageName(package).textMatches(/\d+:\d+/).findOnce(1);
                                if (b){
                                    var tmp = b.text();
                                    var l = Number(tmp.split(':')[0]) || 0;
                                    var r = Number(tmp.split(':')[1]) || 0;
                                    var sec = l * 60 + r;
                                    if (sec > 90) sec = 90;
                                    
                                    if (me.maxVideoSec < sec)
                                        sec = random(me.maxVideoSec,sec);
                                    else if (me.maxVideoSec < sec)
                                        sec = random(me.minVideoSec,sec);
                                    else
                                        sec = random(me.minVideoSec,me.maxVideoSec);
                                }
                                func.clickObject(o);    //开始播放
                            }
        
                            func.videoSleep(sec);
                            func.toast('本次视频完成',2)
                        }
                        else{
                            var max = random(me.minSwipe,me.maxSwipe);
                            for (var i = 0; i < max; i++){
                                var s = random(me.minTextSec * 1000,me.maxTextSec * 1000);
                                func.toast('阅读' + String(Math.floor(s / 1000)) + '秒',2)
                                func.sleep(s);   //随机阅读3到6秒 
                                func.swipeUp();
                                try{
                                //threads.start(function(){
                                    var more = null;
                                    more = packageName(package).text('查看全文，奖励更多').visibleToUser().findOnce();
                                    if(more){
                                        if (more.bounds().height() > 20 && more.bounds().bottom < device.height - 200 ){   
                                            func.clickObject(more);
                                            func.sleep(1000);
                                        }
                                    }
                                    else{
                                        more = packageName(package).text('猜你喜欢').visibleToUser().findOnce();
                                        if (more){
                                            if (more.bounds().height() > 20 && more.bounds().bottom < device.height - 200 ){    
                                                max = 0;    //复位循环次数，不再继续上拉
                                            }
                                        }
                                    }
                                }
                                catch(e){
                                    log(e.message)
                                }
                                //})
                                func.sleep(150);    //等待线程里的max生效，如果有更新的
                            }
                            func.toast('本篇已经阅读完成！',2)
                        }

                        if (idx % 5 == 0)
                            func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)
                        else if (idx % 11 == 0) //每看十条刷新一次首页
                            needrefresh = true;
                    }
                    
                    
                    var o = packageName(package).text('返回').findOnce();
                    if (o)
                        func.clickObject(o);  
                    else
                        func.back(); //阅读完成，返回上级

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
        var more = text('刷新').findOnce();
        if(more){
            func.clickObject(more)
            func.sleep(3000);
        }
    }
    catch(e){
        func.log(appname,'刷新',e.message + '\n\r' + e.stack);
    }
}

function pickCoin(){
    try{
        var o = id(package + ':id/icon_home_left_timer_lq').findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            o = packageName(package).textMatches('额外领取.*金币').visibleToUser().findOnce();
            if (o){
                func.clickObject(60000,'额外领取金币中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists()");
                closeDialog();
            }
            else if (currentActivity().indexOf('BoxGJShareDialog') > 0)
                func.back();
        }
        
    }
    catch(e){
        func.log(appname,'领币',e.message + '\n\r' + e.stack);
    }
}

function closeDialog(){
    var o = idMatches(package + ":id/.*close.*").visibleToUser().findOnce();
    if (o){
        func.clickObject(o)
        func.sleep(4000);
    }
    else if (textMatches('点击下载|点击打开|立即下载|关闭').visibleToUser().exists()){
        func.back();
        func.sleep(4000);
    }
    func.sleep(500)
}


function hasDialog(){
    setInterval(hasDialog2,3000);
}
function hasDialog2(){
    func.hasDialog();
    try{
        var o;
        if (currentActivity().indexOf('SignDialog') > 0){
            o = id(package + ':id/v2_sign_sign_button').findOnce();  
            if (o){
                func.clickObject(o)
                func.sleep(3000);
                o = packageName(package).textMatches('额外领取.*金币').visibleToUser().findOnce();
                if (o){
                    func.clickObject(60000,'额外领取金币中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists()");
                    closeDialog();
                }
            }
        }  
        else if (currentActivity().indexOf('Dialog') > 0){
            func.back();
        } 
        
        o = id(package + ':id/v2_sign_close_button').findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(1500);
        }
        o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o){
            if (packageName(package).text('领取奖励成功').visibleToUser().exists)
                func.clickObject(o);
        }

        o = id(package + ':id/iv_cancel').findOnce();
        if (o)
            func.clickObject(o);

        o = packageName(package).textMatches('不要奖励|忽略').findOnce();
        if (o)
            func.clickObject(o);

        o = id(package + ':id/dialog_close').findOnce();
        if (o)
            func.clickObject(o);

        o = id(package + ':id/image_update_cancle').findOnce()
        if(o)
            func.clickObject(o)
    }
    catch(e){
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