const appname = '追看视频';
const package = 'com.yy.yylite';

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
        var o = func.execApp(appname,package)
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
        var idx = 1;
        var bol = true;
        var needrefresh = false;
        while(bol){
            func.checkSpace();  //检测一次存储空间
            if(!packageName(package).text('推荐').visibleToUser().exists()){
                if (packageName(package).text('直播').visibleToUser().exists()){
                    var o = packageName(package).text('直播').visibleToUser().findOnce();
                    func.clickObject(o)
                    func.sleep(2000);
                }
                else{
                    if (text('继续抽奖').visibleToUser().exists() || currentPackage().toLowerCase() != package.toLowerCase()){
                        func.restart(appname,package)
                    }
                    else{
                        this.func.back();
                        this.func.sleep(2200);
                    }
                }
            }


            if (!packageName(package).text('刷新').visibleToUser().exists() && packageName(package).text('说点什么...').visibleToUser().exists()){
                func.back();
                func.sleep(2000);
            }

            pickCoin(); //领奖

            var ii = 3;
            this.func.toast('预计看15分钟直播',1)
            while(ii-- > 0){
                var o = textMatches('[0-9.万]+').visibleToUser().findOnce();
                if (o){
                    this.func.clickObject(o.parent())
                    o = textMatches('聊天|主播|关注').visibleToUser().findOne(5000);
                    if (o){
                        this.func.sleep(5 * 60 * 1000,'本场视频观看')
                        this.func.back();
                    }
                    else{
                        ii++;
                        this.func.toast('没有进入直播，重试！');
                        this.func.back();
                    }

                    var datediff = new Date().getTime() - startDate.getTime();
                    if (datediff > minutes * 60 * 1000){
                        break;
                    }
                    this.func.sleep(2000);
                    o = textMatches('直播|刷新').visibleToUser().findOnce();
                    if (o){
                        this.func.clickObject(o);
                        this.func.sleep(5000);
                    }
                }
                else{
                    break;
                }
            }

        
            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
            }
            else{
                if (packageName(package).text('视频').visibleToUser().exists()){
                    var o = packageName(package).text('视频').visibleToUser().findOnce();
                    func.clickObject(o)
                    func.sleep(2000);
                }

                var finds = id(package + ':id/video_play_button').visibleToUser().filter(function(w){return w.bounds().top > 150 && w.bounds().centerY() < device.height - 100 ;}).find();
                if (finds.length > 0) {//for(var ii = 0; ii < finds.length; ii++){
                    let child = finds[0];
                    let txt = child.text();
                    idx++;
                    func.toast('开始阅读第' + idx + '遍文章：' + txt);
                    var sec = random(me.minVideoSec,me.maxVideoSec);

                    if (child){
                        try{
                            func.clickObject(child)
                            func.sleep(1500);
                            
                            o = text('继续播放').visibleToUser().findOnce() || desc('继续播放').visibleToUser().findOnce();
                            if (o){
                                this.func.clickObject(o);
                                this.func.sleep(2000);
                            }

                            func.clickObject(child)
                            func.sleep(1500);
                            var o = packageName(package).textMatches(/\d+:\d+/).filter(function(w){return w.bounds().top > child.bounds().bottom;}).findOnce(1);
                            if (o){
                                var tmp = o.text();
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
                            func.videoSleep(sec)
                        }
                        catch(e){
                            log(e.message + e.stack)
                        }
                    }

                    if (idx % 5 == 0)
                        func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)
                    if (idx % 11 == 0) //每看十条刷新一次首页
                        needrefresh = true;
                }
                
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
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束运行' ,"**********************************************************");
    func.quit(package);
}

function closeDialog(){
    if (textMatches(keys).visibleToUser().exists() || descMatches(keys).visibleToUser().exists()){
        o = className('ImageView').visibleToUser().filter(function(w){return w.bounds().centerY() < 200;}).findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(3000);
        }
    }
    o = idMatches('.*:id/.*close.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o)
        func.sleep(2000);
    }
    
    if (text('恭喜获得').visibleToUser().exists()){
        func.back();
        func.sleep(1000);
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
            func.sleep(60000,"领币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('我的').visibleToUser().exists()")
            closeDialog();
        }
    }
    catch(e){
        func.log(appname,'领币',e.message + '\n\r' + e.stack);
    }
}


function autoRedraw(){
    var ii = 10;
    while(!packageName(package).text('我的').visibleToUser().exists() && ii-- > 0){
        func.back();
        func.sleep(3000);
    }
    var o = text('任务').visibleToUser().findOne(5000);
    if (o){
        func.clickObject(o);
        func.sleep(3000);

        o = packageName(package).text('我的金币').visibleToUser().findOne(5000);
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            o = packageName(package).text('去兑换').visibleToUser().findOne(5000);
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                o = packageName(package).text('全部').visibleToUser().findOne(5000);
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                    
                    o = packageName(package).text('确定兑换').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                    func.back();
                    func.sleep(500);
                }
                func.back();
                func.sleep(500);
            }
        }
        
        o = packageName(package).textMatches('提现兑换|提现/兑换').visibleToUser().findOne(5000);
        if(o){
            func.clickObject(o);
            func.sleep(5000);

            o = idMatches('.*counterNumber').visibleToUser().findOnce() || packageName(package).textStartsWith('零钱余额：').visibleToUser().findOnce();
            if (o){
                var mny = Number(o.text().replace('零钱余额：','').replace('元','')) || 0;
                func.toast(mny,1);
                if(classModule.redrawToAlipay == 1){
                    o = text('支付宝').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(1000);
                    }
                }
                if (mny > 0){
                    var btns = textMatches('[.0-9]*元').visibleToUser().filter(function(w){return (Number(w.text().replace('元','')) || 0) <= mny;}).find();
                    if (btns.length > 0){
                        for(var i = btns.length - 1; i >= 0; i--){
                            func.clickObject(btns[i]);
                            func.sleep(2000);
                    
                            btn = packageName(package).text('立即提现').visibleToUser().findOnce();
                            if (btn){
                                func.toast('提现：' + btns[i].text())
                                func.clickObject(btn)
                                func.sleep(2000);
        
                                o = packageName(package).textMatches('知道了|取消').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o);
                                    func.sleep(2000);
                                }
                                else{
                                    break;
                                }
                            }
                        }
                    }
                    else{
                        func.toast('余额不足，不能提现！',1);
                    }
                }
                else{
                    func.toast('余额不足，不能提现！',1);
                }
            }
        }
         
    }
}

function sign(){
    try{
        var o = packageName(package).textMatches('任务|赚钱').findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(4000);
            o = textMatches('提现/兑换|每日任务').visibleToUser().findOne(6000);

            o = packageName(package).textMatches('看视频再赚.*金币').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                func.sleep(60000,"赚金币中","idMatches('.*:id/.*close.*').visibleToUser().exists()")
                closeDialog();
                func.sleep(2000);
            }

            o = packageName(package).textMatches('去抽奖').visibleToUser().findOne(5000);
            if (o){
                func.clickObject(o);
                func.sleep(3000);
                var ii = 5;
                while(ii-- > 0 && packageName(package).textMatches('去抽奖').visibleToUser().exists()){
                    func.clickObject(o);
                    func.sleep(2000);
                }
            
                if (packageName(package).textMatches('去抽奖').visibleToUser().exists()){
                    func.toast('多次尝试也未进入抽奖界面，本次抽奖放弃',1);
                }
                else{
                    ii = 100;
                    while(ii > 0){
                        if (text('天天抽豪礼').visibleToUser().exists()){
                            ii--;
                            func.toast('百次抽奖余' + String(ii) + '次',1);
                            func.sleep(5000);
                            
                            if (idMatches('.*:id/iv_ad_get').visibleToUser().exists()){
                                //log('a')
                                o = idMatches('.*:id/.*close.*').visibleToUser().findOne(6000);
                                if (o)
                                    func.clickObject(o);
                                func.sleep(3000);
                            }
                            else{
                                o = packageName(package).textMatches(' *领额外奖励.*').visibleToUser().findOnce() || packageName(package).descMatches(' *领额外奖励.*').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o);
                                    func.sleep(2000);
                                    func.sleep(60000,"领额外奖励中","idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('天天抽豪礼|继续抽奖|" + keys + "').visibleToUser().exists()")
                                    closeDialog();
                                }
                                else{
                                    o = packageName(package).textMatches(' *继续抽奖 *').visibleToUser().findOne(3000) || packageName(package).descMatches(' *继续抽奖 *').visibleToUser().findOnce();
                                    if (o){
                                        func.clickObject(o);
                                    }
                                    else{
                                        func.toast('抽奖完成！',1);
                                        break;
                                    }
                                }
                            }
                        }
                        else{
                            //log('c')
                            o = packageName(package).textMatches(' *继续抽奖 *|去抽奖').visibleToUser().findOnce() || packageName(package).descMatches(' *继续抽奖 *|去抽奖').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                            }
                            func.sleep(3000);
                        }
                    }
                }
                func.back();
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
        var o = packageName(package).textMatches('知道了|继续播放|否|放弃奖励').findOnce();
        if (o)
            func.clickObject(o)
        func.hasDialog();
        
        o = idMatches('.*:id/.*close.*').visibleToUser().findOnce();
        if (o) {
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

        if (currentActivity().indexOf('BbWebViewActivityV3') > 0)
            func.back();

        if (currentActivity().indexOf('AdActivity') > 0){
            var o = className('ImageView').visibleToUser().filter(function(w){return w.bounds().top < 200;}).findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(200);
            }
        }            

        if (packageName(package).textMatches('恭喜获得|获得邀请好友奖励|发现新版本|立即答题').exists() && !packageName(package).textMatches('.*宝箱.*').exists()){
            func.back();
        }
        
        if (packageName(package).textMatches('立即体验').visibleToUser().exists()){
            o = className('ImageView').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
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
classModule.start();Scripts.INSTANCE.runnextScript()