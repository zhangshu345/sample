/**
 * 适配3.9.49.000.1030.1607002
 * 2019.11.25适配3.9.52.000.119.1713002
 * 2019.11.30适配3.9.53.000.1127.1533002
 * 2019.12.06适配3.9.54.000.12****
 * 2019.12.23适配3.9.57.000.12****
 * 2020.01.06适配3.9.59.000.1231.1401
 * 2020.01.17适配3.9.59.000.1231.1401
 */

const appname = '趣头条';
const package = 'com.jifen.qukan';




var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 10;
classModule.maxSwipe = 10;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
classModule.noAd = 0; //默认看广告
classModule.func = null;
// var keys = '点击重播|点击下载|点击下载|点击打开|下载观看|体验一下|查看更多|我要领金币|收下小猪|更多评论|去阅读|下载阅读|继续阅读|下载观看|一键匹配|一键清理';
var keys = '点击重播|点击下载|点击下载|点击打开';



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
    var nowdate = new Date() .toLocaleDateString();
    var readeds = cfg.readeds || [];    //已经读了的文章
    
    if (lastdate != nowdate){    //是新的一天
        readeds = [];   //已读的为空;
        lastdate = nowdate;
        cfg.lastdate = lastdate
    }
    func.openWaiting(); 
    //如果有签到，要在这里完成
    sign();

    o = packageName(package).text('我的').visibleToUser().findOnce();
    if (o){
        this.func.clickObject(o);
        this.func.sleep(5000);
        this.func.back();
    }
 
    var x = device.width / 2;
    var y = device.height / 2;
    var needRefresh = false;
    var needRestart = false;
 
    try{
        var idx = 1;
        var bol = true;
        var mod = this;
        // pickCoin(true); //收集金币
        var tmp = 0;
        dd = 0
        while(bol){
            func.checkSpace();  //检测一次存储空间
            //var d = new Date();
            //if (d.getHours() >= 7 && d.getHours <= 12){ //7-22时看新闻资讯
                refresh()

                if (!packageName(package).text('刷新').visibleToUser().exists()){
                    o = packageName(package).text('头条').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000)
                        var b = packageName(package).text('推荐').visibleToUser().findOnce();
                        if (b){
                            func.clickObject(b);
                            func.sleep(4000);
                        }
                    }
                    else{
                        if (currentPackage().toLowerCase() != package.toLowerCase()) 
                            func.restart(appname,package);
                        else{
                            func.back();
                            tmp++;
                            if (tmp >= 4){
                                func.restart(appname,package);
                            }
                            func.sleep(3000);
                        }
                    }
                    func.sleep(200);
                    
                }    
                else
                    tmp = 0;

                o = textMatches('领取').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    closeDialog()
                    sleep(3000)
                }
                o = textMatches('再取.*').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog()
                    sleep(3000)
                }


                var o = textMatches('[0-9]+金币奖励').visibleToUser().findOnce();   //领列表奖励
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);

                    if (className.noAd != 1){
                        o = text('看视频有额外金币').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o)
                            this.func.sleep(2000);
                            videoSleep();
                        }
                    }
                }
                
                o = textMatches('看视频再领[0-9]+金币').visibleToUser().findOnce();
                if (o){
                    if (className.noAd != 1){
                        func.clickObject(o);
                        this.func.sleep(2000);
                        videoSleep();
                    }
                    else
                        this.func.back();
                }

                var finds = packageName(package).className('TextView').visibleToUser().filter(function(w){
                    var b = w.bounds();
                    var r = (b.left == 0 && b.bottom < device.height - 150 && b.top > 100);
                    if (w.parent()){
                        r = r && w.parent().find(textContains('广告')).length == 0 && w.parent().find(textContains('置顶')).length == 0;
                    }
                    return r;
                }).find();
                for(var kk = 0; kk < finds.length; kk++){
                    let child = finds[kk];
                    let txt = child.text();
                    //func.toast('找到文章' + txt);
                    if (readeds.join().indexOf(txt) < 0){   //不在本次历史，不在总历史
                        readeds.push(txt);  //保存到今天已阅读
                        cfg.readeds = readeds;
                        func.saveConfig(appname,JSON.stringify(cfg));  
                        
                        func.toast('开始阅读第' + String(idx) + '遍文章：' + txt);
                        func.sleep(5000);
                        dd += 1
                        var isopen = 5,gn = false;
                        while(isopen > 0){
                            func.clickObject(child);
                            func.sleep(3000);    //等待2秒，趣头条的打开很慢
                            if (packageName(package).textMatches('我来说两句...|[0-9]+金币|赏[0-9]+金').visibleToUser().exists()){    // || act.indexOf('DetailsNewActivity') > 0 || act.indexOf('DetailNewActivity') > 0 || act.indexOf('FrameLayout') > 0 || act.indexOf('LinearLayout') > 0 || act.indexOf('MainActivity') > 0){
                                func.toast('第' + idx + '遍文章：打开成功');
                                idx++;
                                gn = true;
                                break;
                            }
                            else
                                isopen -= 1;
                        }
        
                        if (gn){
                            var type = 0,act = currentActivity();
                            if (act.indexOf('VideoDetailsActivity') > 0){ //视频
                                type = 1;
                            }
                            else if (act.indexOf('NewsDetailNewActivity') > 0){ //文章
                                type = 2
                            }   
                            else if (act.indexOf('ImageNewsDetailNewActivity') > 0){    //图集
                                type = 3
                            }
                            else{
                                func.sleep(3000);
                                var o1 = text('关注').findOnce();
                                var o2 = text('+关注').findOnce();
                                if (!o1 && o2){
                                    type = 1; // 视频
                                }
                                else if (o1 && !o2){
                                    if (packageName(package).text('不喜欢').visibleToUser().filter(function(w){return w.bounds().bottom < device.height * 0.7;}).exists())
                                        type = 1; // 视频
                                    else
                                        type = 2; // 文章 
                                }
                                else if (!o1 && !o2){
                                    type = 3; // 图集
                                }
                            }
                            
                            if (type == 1){ //视频 
                                var sec = random(10,30);
                                click(x,y  / 3);
                                func.sleep(1000);
                                try{
                                    o = packageName(package).textMatches(/\d+:\d+\/\d+:\d+/).findOnce();
                                    if (o){
                                        var times = o.text();
                                        if (times.indexOf(':') > 0){
                                            try{
                                                times = times.split('/')[1];
                                                var min = Number(times.split(':')[0]) || 0;
                                                var sec = Number(times.split(':')[1]) || 0;
                                                var sectmp = min * 60 + sec;
                                                if (sectmp < sec) sec = sectmp;
                                            }
                                            catch(e){}
                                        }
                                    }
                                }
                                catch(e){
                                    func.log(appname,'获取视频时长',e.message + '\n\r' + e.stack);
                                }
        
                                func.videoSleep(sec);
                                func.toast('本次视频完成',2)
                            }
                            else if (type == 2){ 


                                if(dd>5){
                                    dd = 0
                                    var finds = packageName(package).className('android.widget.FrameLayout').depth(1).visibleToUser().find();
                                    if(finds.length ==1){
                                        p = packageName(package).className('android.widget.FrameLayout').depth(1).visibleToUser().findOnce();
                                        q =  packageName(package).className('android.widget.ImageView').depth(6).visibleToUser().find();
                                    
                                        if(p && q.length !=3){
                                            func.clickObject(p);
                                            sleep(2000)
                                            closeDialog()
                                        }
                                    }


                                }


                                var max = random(mod.minSwipe,mod.maxSwipe);
                                //log('max=' + max)
                                for (var i = 0; i < max; i++){
                                    var s = random(me.minTextSec,me.maxTextSec)
                                    o = textMatches('全部评论|.*阅读时政类资讯.*').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
                                    if (o){
                                        break
                                    }
                                    func.toast('阅读' + String(s) + '秒',2);
                                    func.sleep(s * 1000);   //随机阅读3到6秒 
                                    func.swipeUp();//func.swipe(random(x - 100,x - 50),random(device.height-450,device.height-400), random(x - 100,x - 50), random(150,200),500);
                                
                                    threads.start(function(){
                                        var o = text('不喜欢').visibleToUser().findOnce()
                                        if (o){
                                            var b = o.bounds();
                                            if (b.height() > 3 && b.bottom < device.height - 200){
                                                max = 0;    //复位循环次数，不再继续上拉
                                            }
                                        }
                                    });
                                    func.sleep(150);
                                }
                                func.toast('本篇已经阅读完成！',2)


                            }
                            else if (type == 3){    //图集 
                                func.sleep(random(me.minTextSec * 1000,me.maxTextSec * 1000));   //随机阅读3到6秒
                                var max = 6;   //最多左拉6次
                                var o = textContains('/').findOnce();
                                if (o){
                                    var txt = o.text();
                                    try{
                                        var d = txt.substr(txt.indexOf('/') + 1,1);
                                        if (d){
                                            d = Number(d) || 0;
                                            if (d > 0)  max = d;
                                        }
                                    }
                                    catch(e){
                                        func.log(appname,'获取图集数量',e.message + '\n\r' + e.stack)
                                    }
                                }
                                for (var i = 0; i < max - 1; i++){
                                    func.swipe(random(x + 200,x + 250),random(y - 50,y + 50), random(0,50), random(y - 50,y + 50),200);
                                    func.sleep(random(me.minTextSec * 1000,me.maxTextSec * 1000));   //随机阅读3到6秒
                                
                                    var o = text('滑动浏览更多图集').findOnce()
                                    if (o){
                                        if (o.bounds().width() > 0){
                                            max = 0;    //复位循环次数，不再继续左拉
                                        }
                                    }
                                }
                                func.toast('本篇已经阅读完成！',2)
                            }

                            if (app.versionCode == 1){
                                o = className('ImageView').visibleToUser().depth(5).findOnce();
                            }
                            else{
                                o = className('FrameLayout').visibleToUser().depth(1).filter(function(w){return w.bounds().width() > 5;}).find();
                                if (o.length > 0)
                                     o = o[o.length - 1];
                                else 
                                    o = null;
                            }
                            if (o){
                                func.clickObject(o);
                                func.sleep(3000);

                                o = textMatches('看视频再领[0-9]+金币').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o);
                                    this.func.sleep(2000);
                                    videoSleep();
                                }
                                else if (text('阅读收益').visibleToUser().exists()){
                                    this.func.back();
                                    this.func.sleep(1000);
                                }
                            }
            
                            if (idx % 5 == 0)
                                func.toast(appname + '已运行' + String(parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60)) + '分钟',2)
                            if (idx % 11 == 0)
                                needRefresh = true;
                            else if (idx % 4 == 0 && func.release <= 7 && func.is2GMemory){
                                func.toast('退出循环，准备重启')
                                needRestart = true;
                                break;
                            }
                        }  
                        sleep(1000)
                        refresh()
                        // func.back(); //阅读完成，返回上级
                        func.sleep(2000);                    
                    }
                }
                
                pickCoin(); //收集金币

                var datediff = new Date().getTime() - startDate.getTime();
                if (datediff > minutes/2 * 60 * 1000){
                    bol = false;
                    func.toast(appname + '运行完成',2)
                }
                else{
                    if (needRefresh){ //每看十条刷新一次首页
                        refresh();
                        needRefresh = false;
                    }
                    else{
                        if (needRestart){
                            func.restart(appname,package);
                            needRestart = false;
                        }
                        else{ //上拉一屏，继续获取要阅读的文章
                            func.swipeUp();
                            func.sleep(2000);
                        } 
                    }
                } 
            //}
            // else{   //刷小视频或直播
            //     if (!packageName(package).textMatches('广场|分享').visibleToUser().exists()){
            //         o = packageName(package).text('小视频').visibleToUser().findOnce();
            //         if (o){
            //             func.clickObject(o);
            //             func.sleep(2000)
            //         }
            //         else{
            //             if (currentPackage().toLowerCase() != package.toLowerCase()) 
            //                 func.restart(appname,package);
            //             else{
            //                 func.back();
            //                 func.sleep(3000);
            //             }
            //         }
            //     }    
            //     while(bol){
                    // if (!textMatches('说点什么.*|我的关注.*').visibleToUser().exists()){
                    //     o = idMatches('.*close.*|.*Close.*').visibleToUser().findOnce();
                    //     if (o){
                    //         this.func.clickObject(o);
                    //         this.func.sleep(2000);
                    //     }
                    //     var ii = 5;
                    //     while(!packageName(package).text('我的').visibleToUser().exists() && ii-- > 0){
                    //         func.back();
                    //         func.sleep(2200);
                    //     }
                    //     var o = packageName(package).text('任务').visibleToUser().findOne(5000);
                    //     if (o){
                    //         this.func.clickObject(o);
                    //         this.func.sleep(2000);
                    //     }
                    // }
                    
                    // ii = 5;
                    // o = packageName(package).text('看直播，签到领金币').filter(function(w){return w.bounds().bottom < device.height * 0.85;}).visibleToUser().findOnce();
                    // while(ii-- > 0 && !o){
                    //     this.func.swipeUp();
                    //     this.func.sleep(2000);
                    //     o = packageName(package).text('看直播，签到领金币').filter(function(w){return w.bounds().bottom < device.height * 0.85;}).visibleToUser().findOnce();
                    // }
    
                    // if (o){
                    //     this.func.clickObject(o);
                    //     this.func.sleep(3000);
                    // }
                    
                        
                    // o = id(package + ':id/iv_energy_in').visibleToUser().findOnce();
                    // if (o){
                    //     this.func.clickObject(o);
                    //     func.sleep(3000);
                    //     click(device.widht / 2,device.height / 2);
                    // }

                    // var sec = random(300,600);
                    // while(sec-- > 0){
                    //     this.func.toast('本场直播观看剩余：' + String(sec) + '秒',1);
                    //     this.func.sleep(1000);

                    //     var datediff = new Date().getTime() - startDate.getTime();
                    //     if (datediff > minutes * 60 * 1000){
                    //         break;
                    //     }
                    // }
                    
                    // var datediff = new Date().getTime() - startDate.getTime();
                    // if (datediff > minutes * 60 * 1000){
                    //     func.toast(appname + '运行完成',2)
                    //     bol = false;
                    //     o = idMatches('.*close.*|.*Close.*').visibleToUser().findOnce();
                    //     if (o){
                    //         this.func.clickObject(o);
                    //         this.func.sleep(2000);
                    //     }
                    //     break;
                    // }
                    // else{
                    //     this.func.toast('换场',1);
                    //     this.func.swipeUp();
                    //     this.func.sleep(2000);
                    // }
            //     }
            // }
        }

        o = packageName(package).text('我的').visibleToUser().findOnce();
        if (o) {
            this.func.clickObject(o);
            this.func.sleep(5000);
            this.func.back();
        }
        var bol = true;
        ii = 0
        while (bol) {
        
            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000) {
                bol = false;
                func.toast(appname + '运行完成', 2)
            }
            o = packageName(package).text('小视频').boundsInside(0, device.height / 5, device.width, device.height).visibleToUser().findOnce();
            if (o) {
                log(o.selected())
                if (!o.selected()) {
                    this.func.clickObject(o);
                }
            } else {
                closeDialog()
                sleep(5000)
                back()
            }
            var sec = random(classModule.minVideoSec, classModule.maxVideoSec);
            func.toast('视频随机播放时间' + sec + '秒', 2)
            func.videoSleep(sec);
            func.swipeUp(0, 0, random(200, 230));
            func.sleep(500);
            ii += 1
            if (ii > 10) {
                ii = 0
                var finds = packageName(package).className('FrameLayout').visibleToUser().find()
                if (finds) {
                    func.clickObject(finds[finds.length - 1]);
                    sleep(2000)
                    o = textMatches('阅读收益').visibleToUser().findOnce();
                    if (o) {
                        back()
                    }
                    o = textMatches('恭喜获得').visibleToUser().findOnce();
                    if (o) {
                        func.sleep(5000, '等待中', "textMatches('看视频再领.*金币').visibleToUser().exists()");
                        o = textMatches('看视频再领.*金币').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                            func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                            closeDialog()
                        }
                    }
                }
            }
        }


        // o = packageName(package).textMatches('任务|赚钱').visibleToUser().findOnce();
        // if (o){
        //     ii = 5
        //     while(ii-- > 0){
        //         o = text('看视频领金币').visibleToUser().findOnce();
        //         if (o){
        //             func.clickObject(o);
        //             this.func.sleep(2000);
        //             //func.sleep(32000,'看视频领金币中');
        //             videoSleep();
        //         }
        //         else{
        //             if (!text('任务中心').visibleToUser().exists()) break;
        //         }
        //     }
        // }
        if (this.autoR == 0) autoRedraw()
    }
    catch(e){
        //log(e.message + e.stack)
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束时间' ,"**********************************************************");
    func.quit(package);
    o = text('残忍离开').visibleToUser().findOne(2000);
    if (o){
        if (className.noAd != 1) {
            o = textMatches('看视频再领[0-9]+金币').visibleToUser().findOnce();
            func.clickObject(o);
            this.func.sleep(2000);
            videoSleep();
            func.quit();
        }
        else
            this.func.clickObject(o);
    }


}



function videoSleep(){
    func.sleep(60000,'看视频领金币中',"idMatches('.*:id/.*close.*').visibleToUser().exists() || || packageName('" + package + "').textMatches('任务中心|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");


    o = idMatches(package + ":id/.*close.*").visibleToUser().findOnce()
    if (o){
        func.clickObject(o)
        func.sleep(2000);
    }
    if (packageName(package).textMatches(keys).visibleToUser().exists() || packageName(package).descMatches(keys).visibleToUser().exists()){
        this.func.back();
        func.sleep(2000);
    }
    if (className('ImageView').visibleToUser().find().length == 1){
        o = className('ImageView').visibleToUser().findOnce();
        func.clickObject(o)
        func.sleep(2000);
    }
}

function autoRedraw(){
    //log('开始提现')
    var ii = 5;
    while(!packageName(package).text('我的').visibleToUser().exists() && ii-- > 0){
        func.back();
        func.sleep(2200);
    }
    var o = packageName(package).text('我的').visibleToUser().findOne(5000);
    if (o){
        func.clickObject(o);
        func.sleep(2000);

        o = packageName(package).textMatches('提现兑换|提现').visibleToUser().findOne(5000);
        if (o){
            func.clickObject(o);
            func.sleep(2000);

            var btn = packageName(package).text('立即提现').visibleToUser().findOne(15000) || packageName(package).desc('立即提现').visibleToUser().findOnce();
            if (btn){
                if (classModule.redrawToAlipay == 1){
                    o = packageName(package).text('支付宝').visibleToUser().findOnce() || packageName(package).desc('支付宝').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(1500);
                    }
                }

                var btns = textMatches('[.0-9]+元.*').find();
                if (btns.length == 0)
                    btns = descMatches('[.0-9]+元.*').find();
                for(var i = btns.length - 1; i >= 0; i--){
                    func.clickObject(btns[i]);
                    func.sleep(2000);

                    func.clickObject(btn);
                    func.sleep(1500);
                    //log('点立即提现:' + btns[i].text())

                    if (text('您的金币余额不足').visibleToUser().exists() || desc('您的金币余额不足').visibleToUser().exists()){
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                    else{
                        o = text('我知道了').visibleToUser().findOnce() || desc('我知道了').visibleToUser().findOnce()
                        if (o){
                            func.clickObject(o);
                            func.sleep(2000);
                        }
                        else{
                            func.sleep(3000);
                            break;
                        }
                    }
                }
            }

        }

    }
}

function pickCoin(first){
    try{
        var o = textMatches('领取|领金币').findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(4000);
        }    
        
        o = textMatches('.*再领[0-9]+金币').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            this.func.sleep(2000);
            videoSleep();
        }

        if (classModule.noAd != 1){
            var lb = false;
            if (first == true){
                o = textMatches('任务|赚钱').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o)
                    func.sleep(100);
                    func.clickObject(o)
                    func.sleep(3000);
                }
            }
            else{
                var r = device.width - 50;;
                if (o){
                    r = o.parent().bounds().right;
                }
                o = className('Button').textMatches('[0-9]+').filter(function(w){return w.bounds().centerX() < r}).visibleToUser().findOnce()
                if (o){
                    if ((Number(o.text()) || 0) > 10){
                        func.clickObject(o)
                        func.sleep(2000);
                        lb = true;
                    }
                }
            }
    
            if (first || lb){
                var ii = 3;
                while(ii-- > 0){
                    o = packageName(package).text('看视频领金币').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        this.func.sleep(2000);
                        videoSleep();
                    }
                    else{
                        func.sleep(2000);
                    }
                }
    
                if (first == true){
                    ii = 3;
                    while(ii-- > 0){
                        func.swipeUp();
                        o = textMatches('立即领取X1|领取奖励|立即领取').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o)
                            func.sleep(3000);
                            videoSleep();
                        }
                    }
                }
        
                o = text('头条').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                }
            }
        }
    }
    catch(e){
        func.log(appname,'领币',e.message + '\n\r' + e.stack);
    }
    finally{
        var ii = 5;
        while(!packageName(package).textMatches('头条|刷新').visibleToUser().exists() && ii-- > 0){
            func.back();
            func.sleep(2000);
        }
        /*var ii = 5;
        while(!packageName(package).textMatches('头条|刷新').visibleToUser().exists() && ii-- > 0){
            func.back();
            func.sleep(2000);
        }
        if (!packageName(package).textMatches('头条|刷新').visibleToUser().exists()){
            func.restart(appname,package);
        }*/
    }
    
}

// function refresh(){
//     try{
//         var o = text('刷新').findOnce();
//         if (o){
//             func.clickObject(o);
//             func.sleep(4000);
//         }
//     }
//     catch(e){
//         func.log(appname,'刷新',e.message + '\n\r' + e.stack);
//     }
// }


function sign() {
    try {
        refresh()
        o = packageName(package).text('任务').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            sleep(2000)
            func.sleep(10000, '等待中', "textMatches('看视频再领.*金币|看视频领金币|日常任务').visibleToUser().exists()");
            toast("任务一:签到")
            sleep(2000)
            o = textMatches('看视频再领.*金币').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                
                closeDialog()
            }
            refresh()
            o = textMatches('领取奖励').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                sleep(3000)
                o = textMatches('看视频再领.*金币').visibleToUser().findOnce();
                if (o) {
                    sleep(3000)
                    func.clickObject(o);
                    func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog()
                }
            }
            refresh()
            toast("任务二:阶段奖励")
            // sleep(1000)
            // ii = 3;
            // while (ii-- > 0) {
            //     o = textMatches('看视频领金币').visibleToUser().findOnce();
            //     if (o) {
            //         func.clickObject(o);
            //         func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            //         closeDialog()
            //         sleep(3000)
            //     }
            // }
            toast("任务三:摇金币")
            o = textMatches('点击展开更多').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                sleep(3000)
                o = textMatches('摇钱树领金币').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(10000, '等待中', "textMatches('领90金币').visibleToUser().exists() ");
                    sleep(2000)
                    ii = 6;
                    while (ii-- > 0) {
                        o = textMatches('机会用完，明日再来！').visibleToUser().findOnce();
                        if(o){
                            break
                        }
                        o = textMatches('领90金币').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                            func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                            closeDialog()
                            sleep(3000)
                        }
                    }
                    back()
                }
            }
        }
        refresh()
        o = packageName(package).text('头条').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
        }
    }
    catch (e) {
        func.log(appname, '领币', e.message + '\n\r' + e.stack)
    }
}

function refresh(){
    var ii = 6;
    while(ii-- > 0 && !text('我的').visibleToUser().exists()){
        closeDialog()
        if(ii<4){
            func.back();
            func.sleep(3200);
            closeDialog()
        }
    }
}




function closeDialog() {
    if (packageName(package).textMatches(keys).visibleToUser().exists()) {
        func.back();
        func.sleep(4000);
    }
    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(4000);
    }
    o = packageName(package).textMatches('我知道了').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
    }
    o = packageName(package).textMatches('阅读收益').visibleToUser().findOnce()
    if (o) {
        func.back();
    }


}


function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        
        try{     
            o = packageName(package).textMatches('我知道了|放弃奖励').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                func.sleep(1000);
            }


            
            if (!textMatches('我的|我要提现|微信登录').visibleToUser().exists()){
                if (textMatches('送礼感谢主播|' + keys).visibleToUser().exists() || descMatches(keys).visibleToUser().exists()){
                    func.back();
                }
                if (className('ImageView').visibleToUser().find().length == 1){
                    o = className('ImageView').visibleToUser().findOnce();
                    func.clickObject(o);
                }
                if (packageName(package).text('邀请好友').visibleToUser().exists()){
                    o = packageName(package).className('ImageView').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                    }
                }
            }
    


            o = packageName(package).textMatches('放弃金币|以后更新|关闭').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                //if (o.text() == '继续观看')
                //    func.sleep(10000);
            }

            if (packageName(package).textMatches('让你喜欢的评论优先展示！').visibleToUser().exists()){
                o = className('ImageView').find();
                if (o.length > 0){
                    func.clickObject(o[o.length - 1]);
                }
            }

            var act = currentActivity();
            if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists() || act.indexOf('LockScreenOpenDialog') > 0 || act.indexOf('dialog.EnhancedInviteDialog') > 0 || act.indexOf('TTRewardVideoActivity') > 0){
                func.back();
                func.sleep(1000);
            }

            var o = packageName(package).text('先去逛逛').visibleToUser().findOnce() || idMatches(package + ':id/(.*close.*|.*Close.*)').visibleToUser().findOnce();
            if (o){
                if (!textMatches('说点什么.*|我的关注.*').visibleToUser().exists() && (classModule.noAd == 1 || !textMatches('看视频再领[0-9]+金币').visibleToUser().exists())){
                    log("5+465465")
                    func.clickObject(o);
                }
            }

        }
        catch(e){
            log(e.message + e.stack)
        }
    },3000);
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