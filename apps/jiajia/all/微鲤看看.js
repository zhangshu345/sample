/**
 * 适应1.6.3
 * 2019.11.24适应1.6.6
 * 2019.12.07适应1.6.7
 */
const package = 'cn.weli.story';
var appname = app.getAppName(package) || '微鲤看看';

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
keys = '点击重播|点击下载|点击打开'

var inSearch = false;
classModule.start = function(){
    var me = this;
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间    
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口
    
    //先判断当前是不是运行的app，不是的话就要打开
    if (currentPackage() != package){
        var s = Number(classModule.sec) || 15;
        if (s < 10)  s = 10
        var o = func.execApp(appname,package,s * 1e3)
        if (!o){
            appname = (appname == '微鲤看看' ? '微鲤看看-领现金' : '微鲤看看');
            o = func.execApp(appname,package,s * 1e3)
            if (!o){
                toast("没有找到" + appname);
                thread.interrupt();
                minutes = 0;
                return; //退出函数
            }
        }
    }
    checkPage();


    //在这里读取微鲤的配置文件
    var cfg = func.loadConfig(appname);
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date().toLocaleDateString();
    var readeds = cfg.readeds || [];    //已经读了的文章
    
    if (lastdate != nowdate){    //是新的一天
        readeds = [];   //已读的为空;
        lastdate = nowdate;
        cfg.lastdate = lastdate
    }
    func.openWaiting(['.LoadingActivity']);  

    var x = device.width / 2;
    var y = device.height / 2;
    //try{
        var idx = 1;
        var bol = true;
        var mod = this;
        var searchOver = false    //搜索任务完成
        var needrefresh = false;
        var pulUp = 0;  //上拉次数
 
        while(bol){ 
            func.checkSpace();  //检测一次存储空间
            var trys = 10;
            while (!id(package + ':id/tv_treasure_box').exists() && !packageName(package).text('推荐').exists() && !packageName(package).text('签到').exists() && !id(package + ':id/tv_video_title').exists() && trys-- > 0){ //不在首页了
                o = id(package + ':id/iv_tab_0').findOnce();    //是不是文本版的首页
                if (o){ //是文本版
                    func.clickObject(o);
                    func.sleep(2000);

                    var b = packageName(package).text('推荐').visibleToUser().findOnce();
                    if (b){
                        func.clickObject(b);
                        func.sleep(4000);
                    }
                }
                else{
                    o = id(package + ':id/tv_video_title').exists();    //是不是视频版首页
                    if (!o){ //不是视频版首页，要返回或重启
                        if (currentPackage().toLowerCase() != package.toLowerCase())   //app不是微鲤了
                            func.restart(appname,package);
                        else{
                            func.back();
                            func.sleep(2000);
                        }
                    }
                }
                func.sleep(200);
            }  
            if (trys <= 0)  func.restart(appname,package); 
            
            sign(); 
            pickCoin();
            if (!packageName(package).text('聊一聊').visibleToUser().exists() && (id(package + ':id/tv_video_title').exists() || id(package +':id/tt_video_ad_covers').exists())){
                if (!id(package +':id/tt_video_ad_covers').exists()){
                    var sec = random(me.minVideoSec,me.maxVideoSec);
                    func.videoSleep(sec);
                    if (func.doConcern) func.doConcern(id(package + ':id/tv_follow_user').visibleToUser());
                }

                var datediff = new Date().getTime() - startDate.getTime();
                if (datediff > minutes * 60 * 1000){
                    bol = false;
                    func.toast(appname + '运行完成',2)
                }
                else{
                    if (packageName(package).text('聊一聊').visibleToUser().exists())   //当前并不是小视频
                        this.func.back()
                    else
                        swipe(random(x - 100,x - 50),random(y + 300,y + 400), random(x - 100,x - 50), random(y - 300,y - 400),10)
                }                
            }
            else{
                if (!searchOver && id(package +':id/et_search').visibleToUser().exists()){  //要以搜索为先
                    inSearch = true;
                    id(package +':id/et_search').visibleToUser().click();
                    func.sleep(1500);

                    var fin = id(package + ':id/tv_receive_coin').visibleToUser().filter(function(w){return w.text() == '已领取'}).find().length == 3
                    while(!fin){
                        if (idMatches(package + ':id/rl_bottom_[0-9]*').visibleToUser().exists())
                            break;

                        if (id(package +':id/et_search').visibleToUser().exists()){
                            id(package +':id/et_search').visibleToUser().click();
                            func.sleep(1500);
                        }

                        var o = id(package + ':id/edt_tool_search').visibleToUser().findOnce();
                        if (o){
                            try{
                                eval( "var word=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"'); 
                                setText(word);
                                func.sleep(500)
                                //}
        
                                id(package +':id/view_search').visibleToUser().click();
                                func.sleep(4000)
                        
                                var o = idMatches('c-header--.*|c-pic--.*|c-paragraph--.*').visibleToUser().findOnce() || textMatches('.*百度汉语|.*百度百科|.*的读音释义').visibleToUser().findOnce() || descMatches('.*百度汉语|.*百度百科|.*的读音释义').visibleToUser().findOnce();
                                if(o){
                                    func.clickObject(o);
                                    func.sleep(2000);
                                    var max = random(mod.minSwipe,mod.maxSwipe); 
                                    var ttl = 0;
                                    for (var i = 0; i < max; i++){
                                        var s = random(me.minTextSec * 1000,me.maxTextSec * 1000)
                                        func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
                                        func.sleep(s);   //随机阅读3到6秒 
        
                                        ttl += s;
                                        if (ttl > random(12000,16000)){
                                            max = 0;
                                        }
                                        else{
                                            func.swipeUp();
                                        }
                                    }
                                    func.toast('本篇已经阅读完成！',2)
            
                                    if (id(package +':id/view_close').visibleToUser().exists()){
                                        while(id(package +':id/view_close').visibleToUser().exists()){
                                            var o = id(package +':id/view_close').visibleToUser().findOnce();
                                            this.func.clickObject(o)
                                            func.sleep(2000);
                                        }
                                    }
                                    else{
                                        func.back()
                                        func.sleep(2000);
                                    }
                                }
                                else{
                                    func.back();
                                    func.sleep(2000);
                                }
                            }
                            catch(e){
                                log(e.message)
                                fin = true;
                            }
                        }
                        else{
                            if (id(package +':id/view_close').visibleToUser().exists()){
                                while(id(package +':id/view_close').visibleToUser().exists()){
                                    var o = id(package +':id/view_close').visibleToUser().findOnce();
                                    this.func.clickObject(o)
                                    func.sleep(2000);
                                }
                            }
                            else{
                                func.back()
                                func.sleep(2000);
                            }
                        }

                        var o = id(package + ':id/tv_receive_coin').visibleToUser().filter(function(w){return w.text().indexOf('领取') == 0}).findOnce();
                        if (o){
                            func.clickObject(o);
                        }
                        func.sleep(2000);
                        fin = id(package + ':id/tv_receive_coin').visibleToUser().filter(function(w){return w.text() == '已领取'}).find().length == 3;
                    }

                    if (fin){
                        searchOver = true;
                    }  

                    if (id(package + ':id/img_tool_back').visibleToUser().exists()){
                        id(package + ':id/img_tool_back').visibleToUser().findOnce().click();
                    }
                    else{
                        this.func.back();
                        this.func.sleep(500)
                        this.func.back()
                    }
                    this.func.sleep(2000);
                }
                inSearch = false;
            
                
                var o = id(package + ':id/iv_clear_new_comer').visibleToUser().findOnce()
                if (o){
                    this.func.clickObject(o);
                    func.sleep(2000);
                }

                o = textMatches('小鲤宝藏越读越多.*').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o)
                    func.sleep(2000);
                }

                var smallVideo = 0;
                //开始获取内容来阅读，做阅读存盘、判断是否已阅，自动上滑、刷新等
                var child = id(package + ":id/tv_title").visibleToUser().filter(function(w){
                    var b = w.bounds();
                    var r = b.top < device.height - 200 && b.centerX() <= device.width / 2 && w.text().length > 5;
                    if (w.parent() && w.parent().parent())
                        r = r && (w.parent().parent().find(textContains('广告')).length == 0)
                        //r = r && w.parent().find(textEndsWith('播放')).length == 0 && w.parent().find(textEndsWith('查看更多')).length == 0;
                    return r;
                }).findOnce()
                if(child){
                    let txt = child.text();
                    if (readeds.join().indexOf(txt) < 0){   //不在本次历史，不在总历史
                        readeds.push(txt);  //保存到今天已阅读
                        cfg.readeds = readeds;
                        func.saveConfig(appname,JSON.stringify(cfg));    

                        if (child.parent()){
                            if(child.parent().find(text('广告')).length > 0)
                                continue;
                        }

                        func.toast('开始阅读第' + idx + '篇文章：' + txt);
                        var isopen = 5,gn = false;
                        while(isopen-- > 0){
                            func.clickObject(child);
                            func.sleep(2000);    //等待两秒
                            var act = currentActivity();
                            if (packageName(package).text('聊一聊').visibleToUser().exists() || packageName(package).text('聊天').visibleToUser().exists() || id(package + ':id/tv_video_title').exists()){  //currentActivity().indexOf('LifeDetailsActivity') > 0){
                                func.toast('第' + idx + '篇文章：打开成功');
                                idx++;
                                gn = true
                                break;
                            }
                            else if (act.indexOf('WeStoryActivity') > 0 || act.indexOf('TTRewardVideoActivity') > 0 || act.toLowerCase().indexOf('installer') > 0){
                                var o = className('android.view.View').depth(5).findOnce();
                                if (o)
                                    func.clickObject(o)
                                break;
                            }
                        }

                        //************ */
                        if (gn){
                            pulUp = 0;  //有进入文章，重置上拉次数
                            if (id(package + ":id/tv_video_chat").exists()){ //当前打开的是视频
                                func.toast('短视频');
                                var waitsec = random(mod.minVideoSec,mod.maxVideoSec); 
                                func.sleep(3000);    //等待两秒
                                o = id(package + ":id/ll_video_area").findOnce();
                                func.clickObject(o);
                                func.sleep(500);
                                o = id(package + ":id/tv_total_time").findOnce();
                                if (o){
                                    var times = o.text();
                                    if (times.indexOf(':') > 0){
                                        var min = Number(times.split(':')[0]) || 0;
                                        var sec = Number(times.split(':')[1]) || 0;
                                        waitsec = min * 60 + sec;
                                        if (waitsec > 25) waitsec = 25;   //金币上限是120秒
                                        func.toast('本次视频播放时长' + waitsec + '秒',2);
                                    }
                                }
                                func.videoSleep(waitsec);
                            }  
                            else if (id(package + ':id/tv_video_title').exists() || id(package +':id/tt_video_ad_covers').exists()){ //打开了小视频
                                func.toast('小视频');
                                while(smallVideo++ < random(20,30)){
                                    var waitsec = random(me.minVideoSec,me.maxVideoSec);
                                    func.videoSleep(waitsec);
                                    func.swipeUp(0,0,random(301,330));
                                    if (func.doConcern) func.doConcern(id(package + ':id/tv_follow_user').visibleToUser())
                                    func.sleep(2000);
                                    
                                    if (smallVideo % 5 ==0 && id('iv_coin').visibleToUser().exists()){
                                        o = id('iv_coin').visibleToUser().findOnce();
                                        func.clickObject(o);
                                        func.sleep(2000);
                                        
                                        if (id(package +':id/tv_ok').exists()){
                                            id(package +':id/tv_ok').click();
                                            func.sleep(1000);
                                        }
                                        else{
                                            if (packageName(package).text('领取时段奖励').exists()){
                                                var o = packageName(package).text('领取时段奖励').findOnce();    //适配1.6.6版本
                                                func.clickObject(o);
                                                func.sleep(2500);
                                        
                                                o = packageName(package).textMatches(' *看视频立领.*').findOnce() || packageName(package).descMatches(' *看视频立领.*').findOnce();    //适配1.6.6版本
                                                if (o){
                                                    func.clickObject(o);
                                                    func.sleep(2500);
                                                    this.func.sleep(60000,"看视频领金币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                                                    closeDialog()
                                                }  
                                            }
                                            func.back();
                                            func.sleep(1000);
                                        }
                                    }
                                    
                                    if (!id(package + ':id/tv_video_title').exists() && !id(package +':id/tt_video_ad_covers').exists())
                                        break;
                                }
                            }  
                            else { //当前打开的是文章
                                func.toast('文章');
                                var max = random(mod.minSwipe,mod.maxSwipe); 
                                for (var i = 0; i < max; i++){
                                    var s = random(me.minTextSec * 1000,me.maxTextSec * 1000)
                                    func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
                                    func.sleep(s);   //随机阅读3到6秒 
                                    func.swipeUp();
                                    
                                    threads.start(function(){
                                        if(packageName(package).text('展开查看全文').visibleToUser().exists()){
                                            var mm = packageName(package).text('展开查看全文').visibleToUser().findOnce();
                                            if (mm.bounds().top < device.height - 200 ){    //.height() > 0){
                                                func.clickObject(mm);
                                                func.sleep(1000);
                                            }
                                        }
                                        else if (packageName(package).text('不喜欢').visibleToUser().exists()){
                                            max = 0;    //复位循环次数，不再继续上拉
                                        }
                                        else if (packageName(package).text('本篇奖励已达上限').visibleToUser().exists()){
                                            max = 0;
                                        }
                                    })
                                    func.sleep(150);
                                }
                                func.toast('本篇已经阅读完成！',2)
                            }  

                            if (idx % 5 == 0){
                                func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)   
                                needrefresh = true
                            }
                            else if (idx % 4 == 0 && func.release < 7 && func.is2GMemory){
                                func.toast('退出循环，准备重启')
                                break; 
                            }
                        }
                        
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
                    if (needrefresh || pulUp >= 3){ //每看十条刷新一次首页或上次达到三次，则刷新（表示拉了三次也没找到新闻）
                        refresh();
                        needrefresh = false;
                    }
                    else{
                        if (idx % 4 == 0 && func.release <= 7 && func.is2GMemory)
                            func.restart(appname,package);
                        else{
                            pulUp++;    //上次一次，
                            func.swipeUp();
                            func.sleep(3000);
                        }
                    }
                }
            }
        }
 
        if (this.autoR == 0) autoRedraw(); //即没有关闭提现，也开通了提现到微信
    //}
    //catch(e){
    //    func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
    //}
    //finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    //}

    func.log(appname,'结束时间' ,"**********************************************************");
    func.quit(package);
}

function closeDialog(){
    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }

    var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);
    }
}

function autoRedraw(){
    var ii = 5;
    while(!id(package +':id/rl_bottom_4').visibleToUser().exists() && ii-- > 0){
        func.back();
        func.sleep(2200);
    }

    var o = id(package +':id/rl_bottom_4').visibleToUser().findOne(5000)
    if (o){
        func.clickObject(o);
        func.sleep(3000);

        o = packageName(package).text('提现兑换').visibleToUser().findOne(5000);
        if (o){
            func.clickObject(o);
            func.sleep(3000);

            o = packageName(package).text('立即提现').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
            }
        }
    }

}

function refresh(){
    var tt = id(package + ":id/rl_bottom_0").visibleToUser().findOnce();
    if (tt){
        func.clickObject(tt);
        func.sleep(50)
        func.clickObject(tt);
        func.sleep(4000);
    }
    else {
        tt = packageName(package).text('推荐').visibleToUser().findOnce();
        if (tt){
            func.clickObject(tt);
            func.sleep(4000);
        }
    }
}


function checkPage(){
    //console.log('查找是否头条页' + id(package + ':id/iv_search').find().length);
    if (id(package + ':id/iv_search').find().length == 0){    //没有右侧的搜索按钮，说明当前不是头条
        var tt = id(package + ":id/rl_bottom_1").findOnce();
        if (tt){    //有底部菜单，直接点击切换回来
            func.clickObject(tt);    //点击回到头条界面
            func.sleep(2000);
        }
        else{   //没有菜单，退出微鲤，重新运行
            func.quit(package);
            func.sleep(2000);
            func.execApp(appname,package);
        }
    }
    else   
        return true;    //当前是头条页
}

function sign() {
    var o = textMatches('马上升级').findOnce(); //关注的坐标
    if(o){
        back()
    }
    var o = textMatches('签到+.*').findOnce(); //关注的坐标
    if (o) {
        var o = id(package + ':id/iv_not_sign').findOne(4000)
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            back()
        } else {
            var o = id('iv_tab_4').findOnce(); //关注的坐标
            if (o) {
                func.clickObject(o);
                func.sleep(2000);
                var o = textMatches('今日签到+.*').findOnce(); //关注的坐标
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                    pickCoinAfterView();
                }
            }
        }
    }else{
        toast("已签到")
    }

}

// function sign(){
//     var o = text('签到').findOnce(); //关注的坐标
//     if (o){
//         func.clickObject(o)
//         func.sleep(3000);
//         func.back();
//     } 
//     else{      
//         if (id(package + ':id/tv_chat').exists() || idMatches(package + ':id/rl_bottom_[0-9]*').visibleToUser().find().length == 4){
//             var o = idMatches(package +':id/rl_bottom_4').findOnce()
//             func.clickObject(o)
//             func.sleep(3000);
        
//             var o = id(package +':id/ll_not_sign').findOne(4000) ||  textMatches('今日签到.*').findOnce();
//             if (o){
//                 func.clickObject(o);
//                 func.sleep(2000);
//                 pickCoinAfterView();
        
//                 o = text('明天再来').findOnce();
//                 if (o){
//                     func.clickObject(o);
//                     func.sleep(500)
//                 }
//                 func.back();
//                 func.sleep(200);
//             }

//             if (packageName(package).text('领取时段奖励').exists()){
//                 var o = packageName(package).text('领取时段奖励').findOnce();    //适配1.6.6版本
//                 func.clickObject(o);
//                 func.sleep(2500);
        
//                 pickCoinAfterView();
//                 o = packageName(package).textMatches(/领\d*金币/).findOnce();    //适配1.6.6版本
//                 if (o){
//                     func.clickObject(o);
//                     func.sleep(2500);
//                 }  
//                 func.back();
//                 func.sleep(1000);
//             }

//             func.sleep(2000);
//             func.back();
//         }
//     }

//     pickCoinAfterView();
// }

function pickCoinAfterView(){
    o = textMatches('看视频立领[0-9]+金币|看视频领更多金币').visibleToUser().findOne(3000);
    if (o){
        func.clickObject(o);
        func.sleep(3000);
        func.sleep(60000,'看视频领金币中',"idMatches('.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        closeDialog();
    }
    else{
        o = textMatches('.*领[0-9]+金币').visibleToUser().findOnce();
        if (o){
            func.clickObject(o)
            func.sleep(1000);
        }
    }
}

function pickCoin(){
    if (packageName(package).textMatches('领金币|时段奖励').visibleToUser().exists()){
        var o = packageName(package).textMatches('领金币|时段奖励').visibleToUser().findOnce();
        func.clickObject(o)
        func.sleep(1000);

    
        pickCoinAfterView();

        o = id(package +':id/tv_ok').visibleToUser().findOnce() || idMatches(package +':id/.*_close').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(500)
            func.back()
        }
    }

    var o = text('+50').findOnce(); //关注的坐标
    if (o){
        func.clickObject(o)
        func.sleep(3000);

        var o = packageName(package).textMatches(/领\d*金币/).findOnce();    //适配1.6.6版本
        if (o){
            func.clickObject(o);
            func.sleep(3000);
            func.back();
        }  
        
        o = packageName(package).textMatches('继续观看|立即领取|没有邀请码').findOnce();
        if (o)
            func.clickObject(o)
    }
}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        var act = currentActivity().toLowerCase();
        if (act.indexOf('etouch.ecalendar.dialog') >= 0){
            if (!inSearch && !idMatches(package + ':id/(iv_coin|tv_follow_user|tv_video)').visibleToUser().exists() && !textMatches('看视频立领[0-9]+金币|看视频领更多金币').visibleToUser().exists()){
                try {
                    var ok = id(package + ':id/bt_ok').findOnce();
                    if (ok) {
                        func.clickObject(ok);
                        func.sleep(1000);
                    }
                }
                catch (e) {
                    //console.log(e.message)
                }
                finally {
                    func.back();
                }
        }
        } 

        var take = id(package + ":id/iv_take").findOnce();    //弹出微鲤福利
        if (take){
            func.clickObject(take);
        }

        var close = idMatches(package + ":id/.*close.*").findOnce();
        if (close){
            if (!inSearch && !idMatches(package + ':id/(iv_coin|tv_follow_user|tv_video)').visibleToUser().exists() && !textMatches('看视频立领[0-9]+金币|看视频领更多金币').visibleToUser().exists())
                func.clickObject(close);

        } 
        var goon = packageName(package).textMatches('继续阅读|继续观看|立即领取|我知道了|留下来|与邻里合作积攒红包中.*').findOnce();
        if (goon){
            if (goon.id().indexOf('ad_download') == -1){
                if (goon.text() == '我知道了'){
                    o = packageName(package).textMatches('不再提醒').findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(500);
                    }
                }
                func.clickObject(goon);
            }
        }

        o = packageName(package).textMatches('我知道了|放弃奖励').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(1000);
        }
    }, 3000)


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