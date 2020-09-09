const appname = '红包盒子';
const package = 'com.bang.redbox'; 

var classModule = {};
classModule.minMinutes = 30;
classModule.maxMinutes = 40;
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

    func.openWaiting(['.SplashActivity']); 

    login();

    sign();    //签到，并返回结果
    var wechatCfg = func.wechatCfg ? func.wechatCfg() : {};
    try{
        var idx = 1;


        var bol = true;
        var needrefresh = false;
        while(bol){
            func.checkSpace();  //检测一次存储空间
            login();
            //在这里判断是否首页
            if (!id(package +':id/zj_home_title_img').visibleToUser().exists()){ //不在首页了
                var o = packageName(package).text('首页').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o)
                    func.sleep(3000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase()) 
                        func.restart(appname,package);
                    else{
                        o = packageName(package).text('头条').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o)
                        }
                        else
                            func.back();
                        func.sleep(3000);
                    }
                }
            }  

            pickCoin(); //领奖
            var finds = id(package + ":id/three_title").visibleToUser().filter(function(w){
                var b = w.bounds();
                var r = b.width() > 100 && b.top < device.height - 200;
                if (w.parent())
                    r = r && w.parent().find(text('广告')).length == 0;
                return r;
            }).find()
            for (var ii = 0; ii <finds.length; ii++){
                let child = finds[ii];
                let txt = child.text();
                if (readeds.join().indexOf(txt) < 0){   //不在本次历史，不在总历史
                    readeds.push(txt);  //保存到今天已阅读
                    cfg.readeds = readeds;
                    func.saveConfig(appname,JSON.stringify(cfg));   
                    
                    func.toast('开始阅读第' + idx + '遍文章：' + txt);
                    var isopen = 5, gn = false;
                    while(isopen > 0){
                        func.clickObject(child);
                        func.sleep(2000);    //等待两秒
                        if (packageName(package).text('朋友圈分享').visibleToUser().exists()){  //有效activity的判断
                            func.toast('第' + idx + '遍文章：打开成功');
                            idx++;
                            isopen = 0;
                            gn = true;
                        }
                        else
                            isopen -= 1;
                    }
    
                    //************ */
                    if (gn){
                        var max = random(me.minSwipe,me.maxSwipe);
                        for (var i = 0; i < max; i++){
                            var s = random(me.minTextSec * 1000,me.maxTextSec * 1000)
                            func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
                            func.sleep(s);   //随机阅读3到6秒 
                            func.swipeUp();
        
                            try{
                                var o = packageName(package).text('相关推荐').visibleToUser().exists();
                                if (o){
                                    max = 0;    //复位循环次数，不再继续上拉
                                }
                            }
                            catch(e){
                                func.log(appname,'搜索阅读完成',e.message + '\n\r' + e.stack);
                            }
                        }

                        var o = id(package + ':id/newsdetaile_bottom_wxfriendshare').findOnce();
                        if (o){
                            var b = o.bounds();
                            click(b.right,b.top - b.height() / 2);
                            func.sleep(2000);
            
                            o = packageName(package).textMatches('看小视频，得[0-9]+金币|看小视频再领[0-9]+金币').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                                func.sleep(60000,o.text(),"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || idMatches('" + package + ":id/cancel.*').visibleToUser().exists()");
                                closeDialog();
                            }
                            
                            func.back();
                        }
                        func.toast('本篇已经阅读完成！',2)

                        if (idx % 5 == 0)
                            func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)
                        if (idx % 11 == 0) //每看十条刷新一次首页
                            needrefresh = true;
                    }

                    func.back(); //阅读完成，返回上级
                    func.sleep(2000);  
                }
            }

                        
            o = packageName(package).textMatches('[0-9]+金币奖励').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2500);
                o = packageName(package).textMatches('看小视频，得[0-9]+金币|看小视频再领[0-9]+金币').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    this.func.sleep(2000);
                    func.sleep(60000,o.text(),"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || idMatches('" + package + ":id/cancel.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog();
                }
            }

            //在这里判断要不要分享
            if (id(package + ':id/newsdetaile_bottom_wxfriendshare').visibleToUser().exists()){
                if (this.func.isSendTimeline && this.func.isSendTimeline(wechatCfg.isFeed,wechatCfg.lastTimelineDate )){
                    id(package + ':id/newsdetaile_bottom_wxfriendshare').visibleToUser().findOnce().click();
                    this.func.sleep(5000);

                    var sec = random(2 * 60 * 60, 4 * 60 * 60);
                    wechatCfg.lastTimelineDate = Date.now() + sec * 1000;    //下次发圈时间
                    this.func.saveConfig('微信',JSON.stringify(wechatCfg));  
                    if (packageName('com.tencent.mm').text('发表').visibleToUser().exists()){
                        packageName('com.tencent.mm').text('发表').visibleToUser().findOnce().click();
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

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000 / 2){
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

        var bol = true;
        xx = 0
        while(bol){
            xx += 1
            func.checkSpace();  //检测一次存储空间
            login();

                        
            o = packageName(package).textMatches('有奖小视频').visibleToUser().findOnce();
            if (o){
                p = textMatches('.*得.*金币').visibleToUser().findOnce();
                if (p){
                    func.clickObject(p);
                    sleep(5000)
                    func.sleep(60000, "看视频签到中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    // func.sleep(60000,o.text(),"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || idMatches('" + package + ":id/cancel.*').visibleToUser().exists()");
                    closeDialog();
                }
            }

            //在这里判断是否首页
            o = id(package +':id/main_tv_video').visibleToUser().findOnce()
            if(!o){

                var o = packageName(package).text('视频').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o)
                    func.sleep(3000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase()) 
                        func.restart(appname,package);
                    else{
                        o = packageName(package).text('视频').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o)
                        }
                        else
                            func.back();
                        func.sleep(3000);
                    }
                }
            
            }else{
                if(!o.selected()){
                    var o = packageName(package).text('视频').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o)
                        func.sleep(3000);
                    }
                    else{
                        if (currentPackage().toLowerCase() != package.toLowerCase()) 
                            func.restart(appname,package);
                        else{
                            o = packageName(package).text('视频').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o)
                            }
                            else
                                func.back();
                            func.sleep(3000);
                        }
                    }
                }
            }
            if(xx >5){
                xx = 0
                var o = packageName(package).text('分享').visibleToUser().findOnce();
                if (o){
                    click(o.bounds().centerX()-20, o.bounds().centerY()+50);
                    func.clickObject(o)
                    func.sleep(5000, '等待中', "textMatches('邀请收徒').visibleToUser().exists() ");
                    o = textMatches('邀请收徒').visibleToUser().findOnce();
                    if(o){
                        back()
                        var ii = 5;
                        while(ii-- > 0 && textMatches('邀请收徒').visibleToUser().exists()){
                            func.sleep(2300);
                            back()
                        }

                    }else{
                        p = textMatches('.*得.*金币').visibleToUser().findOnce();
                        if (p){
                            func.clickObject(p);
                            sleep(5000)
                            func.sleep(60000, "看视频签到中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                            // func.sleep(60000,o.text(),"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || idMatches('" + package + ":id/cancel.*').visibleToUser().exists()");
                            closeDialog();
                        }
                    }
                }
            }

            var x = device.width / 2;
            var y = device.height / 2;
            var sec = random(8, 12);
            func.videoSleep(sec);
            swipe(random(x - 100, x - 50), random(y + 300, y + 400), random(x - 100, x - 50), random(y - 300, y - 400), 10);
            sleep(500)


        
        
        
            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000 ){
                bol = false;
                func.toast(appname + '运行完成',2)
            }
        }






        if (this.autoR == 0) autoRedraw();
    }
    catch(e){
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束运行' ,"**********************************************************");
    func.quit();
}

function login(){
    var o = text('微信登录').visibleToUser().findOnce()
    if (o){
        this.func.clickObject(o);
        this.func.sleep(20000,'唤醒微信登录',"text('同意').visibleToUser().exists()");
        o = text('同意').visibleToUser().findOnce();
        func.clickObject(o)
        this.func.sleep(20000,'微信授权登录中');
    }
}

function autoRedraw(){
    var ii = 5;
    while(ii-- > 0 && !id(package + ':id/main_tv_me').visibleToUser().exists()){
        func.back();
        func.sleep(2300);
    }
    var o = id(package + ':id/main_tv_me').visibleToUser().findOnce();  //我的
    if (o){
        func.clickObject(o);
        func.sleep(3000);

        o = id(package + ':id/fm_tv_mygold').visibleToUser().findOne(3000); //当前金币
        if (o){
            var mycoin = Number(o.text()) || 0;
            log(mycoin)
            if (mycoin >= 3000){
                o = id(package + ':id/fm_rl_exchange').visibleToUser().findOne(3000);  //兑换
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                    o = textMatches('提现方式|专属金额').visibleToUser().findOne(5000) || descMatches('提现方式|专属金额').visibleToUser().exists()
                    var btn = text('立即提现').visibleToUser().findOnce() || desc('立即提现').visibleToUser().findOnce();
                    if (btn){
                        // func.swipeUp();
                        func.sleep(2000);
                        if(mycoin>150000){
                            toast("提现15块")
                            var o = text('15元').visibleToUser().findOnce() || desc('15元').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                            }
                        }else if(mycoin>50000){
                            toast("提现5块")
                            var o = text('5元').visibleToUser().findOnce() || desc('5元').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                            }
                        }else if(mycoin>30000){
                            toast("提现3块")
                            var o = text('3元').visibleToUser().findOnce() || desc('3元').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                            }
                        }else if(mycoin>10000){
                            toast("提现1块")
                            var o = text('1元').visibleToUser().findOnce() || desc('1元').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                            }
                        }else if(mycoin>3000){
                            toast("提现3毛")
                            var o = text('0.3元').visibleToUser().findOnce() || desc('0.3元').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                            }
                        }
                        sleep(1500)
                        var p = text('立即提现').visibleToUser().findOnce() || desc('立即提现').visibleToUser().findOnce();
                        if (p){
                            func.clickObject(p);
                            sleep(3000)
                            o = textMatches('先不填.*').visibleToUser().findOne(15000) || descMatches('先不填.*').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                                sleep(3000)
                                var o = text('0.3元').visibleToUser().findOnce() || desc('0.3元').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o);
                                    sleep(500)
                                }
                                var p = text('立即提现').visibleToUser().findOnce() || desc('立即提现').visibleToUser().findOnce();
                                if (p){
                                    func.clickObject(p);
                                    sleep(500)
                                }

                            }
                        }
                        sleep(2000)
                        o = text('知道了').visibleToUser().findOnce() || desc('知道了').visibleToUser().findOnce();
                        if (o){
                            return
                        }

                        o = id(package + ':id/awdc_tv_confim').visibleToUser().findOnce(); //text('确认提现').visibleToUser().findOnce() || desc('确认提现').visibleToUser().findOnce();

                        if (o){
                            func.clickObject(o);
                            func.sleep(5000);
                            o = textMatches('提现详情|.*可加快到账').visibleToUser().findOne(15000) || descMatches('提现详情|.*可加快到账').visibleToUser().findOnce();
                        }
                        
                    }
                    
                } 
            }
            else{
                func.toast('余额不足，不能提现',2)
            }
        }
    }
}


function refresh(){
    try{
        var o = packageName(package).text('首页').visibleToUser().findOnce();
        if (o){
            func.clickObject(o)
            func.sleep(3000);
        }
    }
    catch(e){
        func.log(appname,'刷新',e.message + '\n\r' + e.stack);
    }
}

function closeDialog(){
    var o = idMatches(package + ":id/.*close.*").visibleToUser().findOnce() || id(package + ':id/tt_insert_dislike_icon_img').findOnce();
    if (o){
        func.clickObject(o)
        func.sleep(2000);
    }
    o = idMatches(package + ":id/.*cancel.*").visibleToUser().findOnce();
    if (o){
        func.clickObject(o)
        func.sleep(2000);
    }
    func.sleep(500)
}


function pickCoin(){
    try{
        var o = packageName(package).textStartsWith('小时红包').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(2000);

            closeDialog();
        }
    }
    catch(e){
        func.log(appname,'领币',e.message + '\n\r' + e.stack);
    }
}
function sign(){
    try{
        var o = packageName(package).text('任务').visibleToUser().findOnce();
        if (o){
            func.clickObject(o)
            func.sleep(3000);

            o = packageName(package).text('今天').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                sleep(3000)
                closeDialog();
                sleep(3000)
                closeDialog();
                // func.clickObject(o,0,-80);
                // func.sleep(3000);
                // issign = 1;
                // o = idMatches(package + ':id/.*_close').findOnce()
                // if (o)
                //     func.clickObject(o)


            }
            func.sleep(2000);
            o = text('幸运大转盘').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(3000);

                o = text('立即抽奖').visibleToUser().findOne(15000);
                if (o){
                    var b = textMatches('剩余[0-9]*次').findOnce()
                    var n = 0;
                    if (o){
                        n = Number(b.text().replace('剩余','').replace('次','')) || 0;
                    }

                    var startCJ = Date.now();
                    while(n > 0){
                        try{
                            if (o){
                                func.clickObject(o);
                            }
                            func.sleep(6000);
    
                            b = id(package + ':id/task_getgold_button').visibleToUser().findOnce();
                            if (b){
                                func.clickObject(b)
                                sleep(3000)
                                func.sleep(60000, "看视频再领金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                                // if (func.sleepWithTip)
                                //     func.sleepWithTip('观看广告领金币中',35);
                                // else
                                //     func.sleep(35000)
                            }
                            else{
                                if (currentActivity().indexOf('TTFullScreenExpressVideoActivity') > 0)
                                    func.sleep(5000);
    
                                b = packageName(package).text('跳过').visibleToUser().findOnce();
                                if (b){
                                    func.clickObject(b);
                                    func.sleep(2000);
                                }
                            }
                            
                            closeDialog(); 
    
                            b = textMatches('剩余[0-9]*次').findOnce()
                            if (b){
                                n = Number(b.text().replace('剩余','').replace('次','')) || 0;
                            }
                            o = text('立即抽奖').visibleToUser().findOnce();
                        }
                        catch(e){
                        }
                        
                        if (Date.now() - startCJ >= 5 * 60 * 1000){
                            ii = 5;
                            while(ii-- > 0){
                                if (packageName(package).textMatches('头条|首页').visibleToUser().exists())
                                    break;
                                else{
                                    func.back();
                                    func.sleep(1000);
                                }
                            }
                            break;  //退出循环
                        }
                    }
                }
                ii = 3
                while (ii-- > 0 && !textMatches('抽奖.*次').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce()) {   
                    func.swipeUp()
                }
                ii = 3
                while (ii-- > 0){
                    closeDialog() 
                    o = text('可领取').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(3000);
                        closeDialog() 
                    }
                }
                sleep(2000)
                back()
            }

            ii = 6
            while (ii-- > 0){
                finds = textMatches('待领取').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.5; }).find()
                for(var kk = 0; kk < finds.length; kk++){
                    let child = finds[kk];
            
                    func.clickObject(child);
                    b = textMatches('看小视频再领.*').visibleToUser().findOnce();
                    if (b){
                        func.clickObject(b)
                        func.sleep(60000, "看视频再领金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            
                    }
                    closeDialog()     
                    func.sleep(3000);
                    closeDialog() 
                    func.sleep(3000);
                    closeDialog() 
                    }
                func.swipeUp()
                sleep(2000)
            }
            

            ii = 5;
            while(ii-- > 0){
                if (packageName(package).textMatches('头条|首页').visibleToUser().exists()){
                    o = packageName(package).textMatches('头条|首页').visibleToUser().findOnce();
                    func.clickObject(o)
                    func.sleep(3000);
                    break;
                }
                else{
                    func.back();
                    func.sleep(1000);
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
        //在这里判断对话框
        var o = idMatches(package + ':id/(.*_close.*|cancel.*|id_popupDelete)').visibleToUser().findOnce() || id(package + ':id/tt_insert_dislike_icon_img').visibleToUser().findOnce() 
        if (o){
            
            if (!packageName(package).textMatches('有奖小视频|看小视频，得[0-9]+金币|看小视频再领[0-9]+金币|看小视频.*得.*金币').visibleToUser().exists()){
                func.clickObject(o)
            }

        }

        o = packageName(package).textMatches('跳过|继续赚钱|取消').visibleToUser().findOnce();
        if (o){
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
