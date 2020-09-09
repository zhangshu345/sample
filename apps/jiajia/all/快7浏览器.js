const appname = '快7浏览器';
const package = 'com.jifen.browserq';
 
var classModule = {};
classModule.minMinutes = 25;
classModule.maxMinutes = 35;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
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
        var s = Number(classModule.sec) || 15;
        if (s < 10)  s = 10
        var o = func.execApp(appname,package,s * 1e3,"textMatches('小视频|我的').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt(); 
            return; //退出函数
        }
    } 

    func.openWaiting(['.FrameLayout','.SplashActivity'])
    sign()
    try{
        var idx = 1;
        var bol = true;

        while(bol){
            func.checkSpace();  //检测一次存储空间
            if (!idMatches(package + ':id/(tv_like|tv_comment)').visibleToUser().exists()){
                // o = packageName(package).text('小视频').visibleToUser().findOnce()
                // if (o){
                //     func.clickObject(o);
                //     func.sleep(2000);
                // }
                o  = packageName(package).id('main_bottom_tab_short_video').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase()){
                        func.restart(appname,package)
                    }
                    else{
                        func.back();
                        func.sleep(2200);
                    }
                }
            }
            idx++;

            var sec = random(me.minVideoSec,me.maxVideoSec);
            func.sleep(sec * 1000,"视频播放中","textMatches('砸金蛋，赢大奖|立即领取.*金币').visibleToUser().exists()");
            func.swipeUp(0,0,random(301,330));


            o = textMatches('立即领取.*金币').visibleToUser().findOnce();
            if (o){
                if (classModule.noAd != 1){
                    func.clickObject(o);
                    func.sleep(4000);
                    o = textMatches('暂不领取').visibleToUser().findOnce();
                    if (o){
                        this.func.clickObject(o);
                        this.func.sleep(1e3);
                    }else{
                        // func.sleep(60000,"看视频领币中","textMatches('点击重播|我的').visibleToUser().exists()")
                        func.sleep(60000,"看视频领币中","packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()")

                        closeDialog();
                        func.back();
                        func.sleep(2e3);
                    }

                }
                // else{
                //     o = textMatches('暂不领取').visibleToUser().findOnce();
                //     if (o){
                //         this.func.clickObject(o);
                //         this.func.sleep(1e3);
                //     }
                // }
            }

            //tv_timer_tips 砸金蛋，赢大奖
            if (text('砸金蛋，赢大奖').visibleToUser().exists()){
                o = textMatches('金蛋大奖').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o.parent());
                    func.sleep(3000);
                    if (classModule.noAd != 1){
                        o = textMatches('点击最高翻.*').visibleToUser().findOnce();
                        if (o){
                            this.func.clickObject(o);
                            this.func.sleep(3e3);
                            // func.sleep(60000,"看视频领币中","textMatches('点击重播|我的').visibleToUser().exists()")
                            func.sleep(60000,"看视频领币中","packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()")

                            closeDialog();
                            this.func.back();
                            this.func.sleep(1e3);
                        }
                    }
                    else{
                        o = textMatches('放弃翻倍.*').visibleToUser().findOnce();
                        if (o){
                            this.func.clickObject(o);
                            this.func.sleep(1e3);
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
                if (idx % 5 == 0)
                    func.toast(appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟',2)
            }
        } 
 
        if (this.autoR == 0) autoRedraw();
    }
    catch(e){ 
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack) 
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束时间',"**********************************************************");
   
    func.quit(package);
}

function closeDialog(){
    if (packageName(package).textMatches('点击重播').visibleToUser().exists()){
        func.back();
        func.sleep(4000);
    }
    
    var o = className('ImageView').visibleToUser().filter(function(w){return w.id() == ''}).find();
    if (o.length == 1){
        func.clickObject(o[0]);
        func.sleep(4000);
    }
    o = idMatches(package + ':id/.*close').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(4000);
    } 
    o = textMatches('领取奖励|继续领取.*').visibleToUser().findOnce() || descMatches('领取奖励|继续领取.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2e3);
    }
}

function autoRedraw(){
    var ii = 5;
    while(ii-- > 0 && !text('我的').visibleToUser().exists()){
        func.back();
        func.sleep(2200);
    }
    var o = text('我的').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(3000);

        var money = 0;
        o = id(package + ':id/tv_all_gold').visibleToUser().findOne(5000)
        if (o) 
            money = Number(o.text().replace('当前金币数','')) || 0;
        func.toast('金币:' + money,1)
        if (money >= 3000){
            o = packageName(package).textMatches('去提现').visibleToUser().findOne(6000);
            if (o){
                func.clickObject(o);
                func.sleep(3000);

                var btn = packageName(package).text('立即提现').visibleToUser().findOne(5000) || packageName(package).desc('立即提现').visibleToUser().findOnce();
                if (btn){
                    var btns = packageName(package).textMatches('0.3|[0-9.]+元').visibleToUser().filter(function(w){
                        var r = Number(w.text().replace('元','')) || 0;
                        return r > 0 && r <= money / 10000;
                    }).find();
                    if (btns.length == 0)
                        btns = packageName(package).descMatches('0.3|[0-9.]+元').visibleToUser().filter(function(w){
                            var r = Number(w.desc().replace('元','')) || 0;
                            return r > 0 && r <= money / 10000;
                        }).find();
                    for(var i = btns.length - 1; i >= 0; i--){
                        func.clickObject(btns[i]);
                        func.sleep(2000);
    
                        func.clickObject(btn)
                        func.sleep(3000);
                        
                        o = packageName(package).text('立即提现').visibleToUser().findOnce(1) || packageName(package).desc('立即提现').visibleToUser().findOnce(1);
                        if (o){
                            func.clickObject(o)
                            func.sleep(3e3);
                            func.sleep(60000,"看视频提现中","textMatches('点击重播|我的').visibleToUser().exists()")
                            closeDialog();
                            break;
                        }
                    }
                }
            }
            else{
                func.toast('未进入到提现界面',1);
            }
        }
        else{
            func.toast('余额不足，不能提现',1);
        }
    }
}

function sign(){
    try{
        o  = packageName(package).text('我的').visibleToUser().findOnce();
        if (o){
            func.clickObject(o)
            func.sleep(10000,'等待中',"textMatches('大转盘|立即领取.*金币').visibleToUser().exists()");

            o = textMatches('立即领取.*金币').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);

                func.sleep(4000);
                o = textMatches('暂不领取').visibleToUser().findOnce();
                if (o){
                    this.func.clickObject(o);
                    this.func.sleep(1e3);
                }else{
                    // func.sleep(60000,"看视频领币中","textMatches('点击重播|我的').visibleToUser().exists()")
                    func.sleep(60000,"看视频领币中","packageName('" + package + "').textMatches('点击重播|我的').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()")

                    closeDialog();
                    func.back();
                    func.sleep(2e3);
                }
            }

            if (classModule.noAd != 1){
                o = text('大转盘').visibleToUser().findOne(4e3);
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                        
                    ii = 8;
                    while(ii-- > 0){
                        o = textMatches('看视频 抽大奖|看视频再抽一次').visibleToUser().findOnce() || descMatches('看视频 抽大奖|看视频再抽一次').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o);
                            func.sleep(4e3);
                            // func.sleep(60000,"看视频抽奖中","textMatches('点击重播|看视频再抽一次|幸运大转盘|好的|我的').visibleToUser().exists()")
                            func.sleep(60000,"看视频领币中","packageName('" + package + "').textMatches('点击重播|看视频再抽一次|幸运大转盘|好的|我的').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()")

                            closeDialog();
                        }
                        func.sleep(6e3)
                        o = textMatches('今日剩余 0 次机会|明日再来').visibleToUser.exists() || descMatches('今日剩余 0 次机会|明日再来').visibleToUser.exists();
                        if (o)
                            break;
                    }
                    func.back();
                    func.sleep(2e3);
                }
            }
        }

        // o  = packageName(package).text('小视频').visibleToUser().findOnce();
        // if (o){
        //     func.clickObject(o);
        //     func.sleep(2000);
        // }
        o  = packageName(package).id('main_bottom_tab_short_video').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }
    }
    catch(e){
        func.log(appname,'领币',e.message + '\n\r' + e.stack)
    }
}
 
function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o){
            if (!packageName(package).textMatches('立即领取.*金币|看视频再抽一次').visibleToUser().exists() && !packageName(package).descMatches('立即领取.*金币|看视频再抽一次').visibleToUser().exists())
                func.clickObject(o);
        }

        o = packageName(package).textMatches('继续播放|放弃金币|以后更新|以后安装|关闭|开心收下|放弃奖励').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
        }
        
        if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()){
            func.back();
        }
        
        // if (packageName(package).textMatches('点击重播').visibleToUser().exists()){
        //     func.back();
        // }
        if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
            func.back();
            func.sleep(3000);
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