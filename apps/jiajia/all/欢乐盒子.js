/**
 * 适配5.5.1.3
 */

const appname = '欢乐盒子';
const package = 'c.l.d'; 

var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
classModule.func = null;
var bol = true, startDate, minutes,cfg = {},readeds = [];

classModule.start = function(){
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    startDate = new Date(); //启动时间
    var prevRedPacketDate = null;
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package){
        var o = func.execApp(appname,package,15e3,"textMatches('头条资讯|小视频|查看更多可.*').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }
    
    cfg = func.loadConfig(appname);
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date() .toLocaleDateString();
    readeds = cfg.readeds || [];    //已经读了的文章
    
    if (lastdate != nowdate){    //是新的一天
        readeds = [];   //已读的为空;
        lastdate = nowdate;
        cfg.lastdate = lastdate
    }    
    func.openWaiting(['.SplashActivity']); 

    sign()
    try{
        var idx = 1; 
        var mod = this;
        var needrefresh = false;
        var intext = 0;
        while(bol){
            func.checkSpace();  //检测一次存储空间
            
            if (text('查看更多可领取红包》').visibleToUser().exists()){
                func.back();
                func.sleep(1000);
            }

            o = idMatches(package + 'id:/.*countdown').visibleToUser().findOnce();
            if (o){
                var n = Number(o.text().replace('秒','')) || 0;
                if (n > 0)
                    func.sleep(n * 1000,"等待广告结束");
                func.sleep(2000);
                closeDialog();
            }
            else if (idMatches('.*:id/View_free_flow_agreement').visibleToUser().exists()){
                var ij = 50;
                while(ij-- > 0){
                    this.func.toast('等广告完成',1)
                    if (!idMatches('.*:id/View_free_flow_agreement').visibleToUser().exists())
                        break;
                } 
                closeDialog();
            }
            
            if(!packageName(package).textMatches('头条资讯|关注|逛一逛即得欢乐币奖励|我的喜欢').visibleToUser().exists() && !idMatches(package + ':id/(logo|top_text|icon_finish_layout)').visibleToUser().exists()){
                //log(id(package + ':id/logo').visibleToUser().exists());
                //log(id(package + ':id/view_pager').visibleToUser().exists());
                //log(id(package + ':id/top_text').visibleToUser().exists());
                o = packageName(package).text('首页').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(3000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase()) 
                        func.restart(appname,package);
                    else{
                        func.back();
                        func.sleep(2000);
                    }
                }
            }
            else if (id(package + ':id/apk_icon').visibleToUser().exists()){
                o = packageName(package).text('首页').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(3000);
                }
            }

            if (intext == 2 && !idMatches(package + ':id/(iv_head_icon|iv_like|layout_like)').visibleToUser().exists()){  //当前是小视频，但没有进入小视频，要重新进入
                var ii = 5;
                while(!packageName(package).text('首页').visibleToUser().exists() && ii-- > 0){
                    func.back();
                    func.sleep(2500);
                }
            }
            else if (intext == 3 && !packageName(package).text('逛一逛即得欢乐币奖励').visibleToUser().exists()){ 
                var ii = 5;
                while(!packageName(package).text('首页').visibleToUser().exists() && ii-- > 0){
                    func.back();
                    func.sleep(2500);
                }
            }

            if (prevRedPacketDate == null){
                prevRedPacketDate = new Date();
                pickRedPacket();    //收首页的红包
            }
            else if (new Date().getTime() - prevRedPacketDate.getTime() > 10 * 60 * 1000){  //10分钟后再收一次红包
                prevRedPacketDate = new Date();
                pickRedPacket();    //收首页的红包
            }

            if (packageName(package).text('首页').visibleToUser().exists()){
                //没有 资讯红包
                if (packageName(package).text('超级红包X0个').visibleToUser().exists()){
                    //没有 小视频
                    if (packageName(package).text('大红包X0个').visibleToUser().exists()){
                        if (packageName(package).text('逛一逛').visibleToUser().exists()){
                            intext = 3;
                            var o = packageName(package).text('逛一逛').visibleToUser().findOnce();
                            if (o.bounds().right < device.width / 2)    //屏幕左侧
                                click(random(o.bounds().centerX(),o.bounds().right),o.bounds().centerY());
                            else //屏幕右侧
                                click(random(o.bounds().left,o.bounds().centerX()),o.bounds().centerY());
                            func.sleep(3000);
                        }
                    }
                    else{
                        if (packageName(package).text('小视频').visibleToUser().exists()){
                            intext = 2;
                            var o = packageName(package).text('小视频').visibleToUser().findOnce();
                            if (o.bounds().right < device.width / 2)    //屏幕左侧
                                click(random(o.bounds().centerX(),o.bounds().right),o.bounds().centerY());
                            else //屏幕右侧
                                click(random(o.bounds().left,o.bounds().centerX()),o.bounds().centerY());
                            func.sleep(3000);
                        }
                    }
                }
                else{
                    if (packageName(package).text('头条资讯').visibleToUser().exists()){
                        intext = 1;
                        var o = packageName(package).text('头条资讯').visibleToUser().findOnce();
                        if (o.bounds().right < device.width / 2)    //屏幕左侧
                            click(random(o.bounds().centerX(),o.bounds().right),o.bounds().centerY());
                        else //屏幕右侧
                            click(random(o.bounds().left,o.bounds().centerX()),o.bounds().centerY());
                        func.sleep(3000);
                    }
                }
            }

            if (intext == 2){
                if (packageName(package).text('提现').visibleToUser().exists()){
                    refresh();
                    if (!packageName(package).text('小视频').visibleToUser().exists()){
                        this.func.swipeUp()
                        this.func.sleep(1000)
                    }
                    if (packageName(package).text('小视频').visibleToUser().exists()){
                        var o = packageName(package).text('小视频').visibleToUser().findOnce();
                        if (o.bounds().right < device.width / 2)    //屏幕左侧
                            click(random(o.bounds().centerX(),o.bounds().right),o.bounds().centerY());
                        else //屏幕右侧
                            click(random(o.bounds().left,o.bounds().centerX()),o.bounds().centerY());
                        func.sleep(3000);
                    }
                }

                var sec = random(me.minVideoSec,me.maxVideoSec);
                this.func.videoSleep(sec)
                func.swipeUp(0,0,random(301,330));
                this.func.sleep(500);
                if (idMatches('.*video_ad.*').visibleToUser().exists())
                    func.swipeUp(0,0,random(301,330));
            }
            else if (intext == 3){  //逛一逛
                this.func.sleep(2000)
                if (packageName(package).text('逛一逛').visibleToUser().exists()){
                    var o = packageName(package).text('逛一逛').visibleToUser().findOnce();
                    if (o.bounds().right < device.width / 2)    //屏幕左侧
                        click(random(o.bounds().centerX(),o.bounds().right),o.bounds().centerY());
                    else //屏幕右侧
                        click(random(o.bounds().left,o.bounds().centerX()),o.bounds().centerY());
                    func.sleep(3000);
                }

                var child = id(package + ':id/title').visibleToUser().filter(
                    function(w){
                        var b = w.bounds();
                        var r = b.width() > 0 && b.bottom > b.top && b.bottom < device.height - 180 && w.text().length > 8;
                        return r;
                }).findOnce()
                this.func.sleep(3000);
                if(child){
                    let txt = child.text();
                    if (readeds.join().indexOf(txt) < 0){   //不在本次历史，不在总历史
                        readeds.push(txt);  //保存到今天已阅读
                        cfg.readeds = readeds;
                        func.saveConfig(appname,JSON.stringify(cfg)); 
    
                        var isopen = 5,gn = false;
                        while(isopen > 0){
                            func.clickObject(child);
                            func.sleep(2000);    //等待两秒
        
                            var act = currentActivity(); 
                            if (idMatches(package + ':id/(main_fl_container|bannerViewPager)').visibleToUser().exists()){
                                idx++;
                                isopen = 0;    //直接退出循环，但同时还要继续阅读
                                gn = true;
                            }
                            else
                                isopen -= 1;
                        }
        
                        if (gn){
                            var s = random(6000,12000)
                            func.toast('停留' + Math.floor(s / 1000) + '秒',1);
                            func.sleep(s)
                            
                            o = text('喜欢').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o)
                                func.sleep(2000);
                            }
                            func.toast('本篇已经阅读完成！',1)
    
                            if (idx % 5 == 0)
                                func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)
                            if (idx % 11 == 0)
                                needrefresh = true;  
                        }
                        
                        func.back();
                        func.sleep(2000)
                    }        
                }
            }
            else {
                var child = id(package + ':id/title').visibleToUser().filter(
                    function (w) {
                        var b = w.bounds();
                        var r = b.width() > 0 && b.bottom > b.top && b.bottom < device.height - 180 && w.text().length > 8;
                        r = r && w.text().indexOf('下载') == -1 && w.text().indexOf('提现') == -1;
                        if (w.parent()){
                            r = r && w.parent().find(textContains('广告')).length == 0;
                            r = r && w.parent().find(id(package + ':id/action')).length == 0;
                        }
                        return r;
                    }).findOnce()
                if (child) {                    
                    let txt = child.text();
                    if (readeds.join().indexOf(txt) < 0){   //不在本次历史，不在总历史
                        readeds.push(txt);  //保存到今天已阅读
                        cfg.readeds = readeds;
                        func.saveConfig(appname,JSON.stringify(cfg)); 
    
                        func.toast('开始阅读第' + idx + '遍文章：' + txt)
                        var isopen = 5,gn = false;
                        while(isopen > 0){
                            func.clickObject(child);
                            func.sleep(2000);    //等待两秒
        
                            var act = currentActivity(); 
                            if (packageName(package).text('收藏').visibleToUser().exists() || act.indexOf('FeedArticleDetailActivity') > 0 || idMatches(package + ':id/(viedoContainer|vp_v_bg|titleS)')){
                                func.toast('第' + idx + '遍文章：打开成功');
                                idx++;
                                isopen = 0;    //直接退出循环，但同时还要继续阅读
                                gn = true;
                            }
                            else if (act.indexOf('X5WebViewActivity') > 0 || act.indexOf('PortraitADActivity') > 0 || act.indexOf('AppActivity') > 0){   //广告
                                isopen = -1;  //退出循环，但不阅读了
                            }
                            else if (act.indexOf('ConfirmStartActivity') > 0){   //弹出询问
                                isopen = -1;  //退出循环，但不阅读了
                            }
                            else
                                isopen -= 1;
                        }
        
                        if (gn){
                            var o = idMatches(package + ':id/(viedoContainer|vp_v_bg|video_title)').findOnce();
                            if (o){ //是视频
                                var tms = textMatches(/\d+:\d+/).findOnce();
                                func.clickObject(o)
                                func.sleep(750);
                                if (!tms) tms = textMatches(/\d+:\d+/).findOnce(1);
                                var sec = random(40,60);   //默认视频播放60秒
                                if (tms){
                                    var txt = tms.text();
                                    var tmpsec = parseInt(txt.split(':')[0]) * 60 + parseInt(txt.split(':')[1]);
                                    if (tmpsec < sec) sec = tmpsec
                                }
                                func.videoSleep(sec);
                                func.toast('本次视频完成',2)
                            }
                            else{   //是文章
                                var max = random(mod.minSwipe,mod.maxSwipe);
                                for (var i = 0; i < max; i++){
                                    var s = random(me.minTextSec * 1000,me.maxTextSec * 1000)
                                    func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
                                    func.sleep(s);   //随机阅读3到6秒 
                                    func.swipeUp(); 
                                    threads.start(function(){
                                        var o = packageName(package).text('相关资讯').visibleToUser().findOnce()
                                        if (o)
                                            max = 0;    //复位循环次数，不再继续上拉
                                    })
                                    func.sleep(150)
                                }
                                func.toast('本篇已经阅读完成！',2)
                            }
    
                            if (idx % 5 == 0)
                                func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)
                            if (idx % 11 == 0)
                                needrefresh = true;  
                        }
                        
                        func.back();
                        func.sleep(2000)
                    }        
                }
            }

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
            }
            else{
                if (intext == 1){
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
                else if (intext == 3){
                    func.swipeUp();
                    func.sleep(2000);
                }
            }
        } 
 
        if (this.autoR == 0) autoRedraw();
    }
    catch(e){
        log(e.message + '\n\r' + e.stack)
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack)
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束运行' ,"**********************************************************");
    func.quit(package);
}

function autoRedraw(){
    var redrawTo = Number(classModule.redrawToAlipay) || 0;
    var o = packageName(package).text('提现').visibleToUser().findOnce() || id(package + ':id/to_get_money').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);

        o = packageName(package).text('兑换现金').visibleToUser().findOne(2000) || id(package + ':id/action_btn_2').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);

            o = packageName(package).text('确定').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(4000);
            }
        }

        o = packageName(package).textMatches('¥[0-9.]*').visibleToUser().findOnce();
        if (o){
            var money = Number(o.text().replace('¥','').trim()) || 0;
            if (money >= 1){
                o = packageName(package).text('提现').visibleToUser().findOnce();
                func.clickObject(o)
                func.sleep(2000);

                if (money < 50){    //不足50，不能提现大额
                    o = text('立即提现').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o)
                        func.sleep(2000);

                        o = packageName(package).text(redrawTo == 0 ? '提现到微信' : '提现到支付宝').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o)
                            func.sleep(2000);

                            o = packageName(package).text('确认提现').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                                func.sleep(2000);
                            }
                        }
                    }
                    else{   //没有立即提现按钮
                        o = text('0.5—5元').visibleToUser().findOnce()
                        if (o){
                            func.clickObject(o);
                            func.sleep(1000);
                            func.swipeUp();
                            func.sleep(100);
                            func.swipeUp();
                            func.sleep(3000)

                            o = id(package + ':id/can_withdraw').visibleToUser().find()
                            if (o.length > 0){  //有可提现的
                                func.clickObject(o[o.length - 1],0,o[o.length - 1].bounds().height() * 2);
                                func.sleep(2000);

                                o = packageName(package).text(redrawTo == 0 ? '提现到微信' : '提现到支付宝').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o)
                                    func.sleep(2000);
        
                                    o = packageName(package).text('确认提现').visibleToUser().findOnce();
                                    if (o){
                                        func.clickObject(o);
                                        func.sleep(2000);
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    var btns = packageName(package).textMatches('[0-9]*元 *').visibleToUser().filter(function(w){
                        var r = Number(w.text().replace('元','').trim()) || 0;
                        return r <= money && r >= 50;
                    }).find();
                    for(var i = btns.length - 1; i >= 0; i--){
                        func.clickObject(btns[i]);
                        func.sleep(1000);
                    
                        o = text('立即提现').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o)
                            func.sleep(2000);
                            
                            o = packageName(package).text(redrawTo == 0 ? '提现到微信' : '提现到支付宝').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o)
                                func.sleep(2000);
                            }
                        }
                    }
                }

            }
            else{
                func.toast('余额不足，不能提现',1)
            }
        }
    }
}

function pickRedPacket(){
    try{
        var ii = 5;
        while(!packageName(package).text('首页').visibleToUser().exists() && ii-- > 0){
            func.back();
            func.sleep(2000);
        }

        ii = 10;
        while(ii-- > 0){
            if (!id(package + ':id/other_red_pack').visibleToUser().exists()){
                var o = text('可拆开').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(3000);
                }
                else
                    break;
            }
        
            if (packageName(package).text('查看更多可领取红包》').visibleToUser().exists()){
                if (app.versionCode == 1)
                    packs = id(package +':id/red_pack_img').visibleToUser().filter(function(w){
                        return w.parent().childCount() == 1
                    }).find()
                else
                    packs = id(package +':id/item_content').visibleToUser().filter(function(w){
                        return w.childCount() == 0;
                    }).find()
                if (packs.length > 1){
                    var child = packs[packs.length - 2];
                    var jj = 10;
                    while(jj-- > 0){
                        func.clickObject(child);
                        func.sleep(1000)
                        if (!packageName(package).text('查看更多可领取红包》').visibleToUser().exists()){
                            break;
                        }
                    }
        
                    o = textMatches('看视频最高可得[0-9 ]*欢乐币').visibleToUser().findOnce() || text('观看视频奖励翻倍').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000);
                        func.sleep(60000,"看视频最得欢乐币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击下载|点击打开|头条资讯|查看更多可领取红包》').visibleToUser().exists()")
                        closeDialog();
                    }
                    else{
                        func.back();
                    }
                }
                else
                    ii = 0;
                func.sleep(2000); 
            }
        }
    }
    catch(e){
        func.log(appname,'领币',e.message + '\n\r' + e.stack)
    }
    finally{
        var ii = 5;
        while(!packageName(package).textMatches('首页|头条资讯|关注|我的喜欢').visibleToUser().exists() && ii-- > 0){
            func.back();
            func.sleep(2000);
        }
        if (!packageName(package).textMatches('首页|头条资讯|关注|我的喜欢').visibleToUser().exists()){
            func.restart(appname,package);
        }
    }
}

function closeDialog(){
    var o;
    if (packageName(package).textMatches('点击下载|点击打开').visibleToUser().exists()){
        o = className('android.widget.ImageView').findOnce();
        if (o){
            func.clickObject(o)
        }
        func.sleep(1000);
    }
    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce() || packageName(package).textMatches('关闭广告').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(1000);
    }
}

function sign(){
    var o = packageName(package).text('任务').visibleToUser().findOne(5000);
    if (!o){
        if (text('查看更多可领取红包》').visibleToUser().exists()){
            func.back();
            func.sleep(1000);
        }
        o = packageName(package).text('任务').visibleToUser().findOnce();
    }
    if (o){
        func.clickObject(o);
        func.sleep(2000);

        o = packageName(package).text('立即签到').visibleToUser().findOne(2000);
        if (o){
            func.clickObject(o);
            func.sleep(1000);
            o = textMatches('再得.*倍奖励').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(1000);
                func.sleep(60000,"奖励翻倍中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('关闭广告|点击下载|点击打开|头条资讯|查看更多可领取红包》').visibleToUser().exists()")
                closeDialog();
            }
        }
    }

    o = packageName(package).text('首页').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);
    }
}

function refresh(){
    try{
        var tt = id(package +':id/tab_text').findOnce(1);
        if (tt){
            func.clickObject(tt);
            func.sleep(50)
            func.clickObject(tt);
            func.sleep(4000);
        }
    }
    catch(e){
        func.log(appname,'刷新',e.message + '\n\r' + e.stack)
    }
}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        if(textMatches('我的余额|收支明细').visibleToUser().exists()){
            o = text('首页').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
            }
        }

        var o = idMatches(package +':id/.*close.*').visibleToUser().findOnce() || packageName(package).textMatches('关闭广告').visibleToUser().findOnce(); //弹出有关闭窗口
        if (o){
            func.clickObject(o);
            func.sleep(50);
        }

        if (packageName(package).textMatches('点击下载|点击打开').visibleToUser().exists()){
            func.back();
        }
        o = idMatches(package +':id/red_packet_timer').findOnce() //弹出有关闭窗口
        if (o){
            func.clickObject(o);
            func.sleep(50);
        }

        o = packageName(package).textMatches('看视频.*|确定|继续观看|我知道了|继续播放').findOnce();
        if (o){
            if (o.id().indexOf('reward_ad') == -1){
                func.clickObject(o);
                func.sleep(50);
            }
        }   
        if (packageName(package).textMatches('点击下载|点击打开').visibleToUser().exists()){
            o = className('android.widget.ImageView').visibleToUser().findOnce();
            if (o){
                func.clickObject(o)
            }
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
classModule.start()