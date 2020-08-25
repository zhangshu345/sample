const appname = '长豆短视频';
const package = 'com.zf.shuashua';

var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
classModule.func = null;
var updating = false;

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
            if(thread) thread.interrupt(); 
            return; //退出函数
        }
    }
    
    func.openWaiting(['.FrameLayout','.SplashActivity'])
    if (this.autoUpdate == 1){  //启用了自动更新
        var o = id(package + ':id/start_upgrade').visibleToUser().findOnce();  //需要更新
        if (o){
            updating = true;
            this.func.clickObject(o);
            this.func.sleep(2000);
            var r = this.func.setup();
            if (r == 2){    //更新完成，需要自己重启
                this.func.restart(appname,package);
            }
            else if (r == 1){
                o = textMatches('推荐|任务').visibleToUser().findOne(20000);    //如果点了打开，等待加载完成
            }
            else{
                this.func.sleep(60000,'更新没有成功，倒计时完成退出本次任务')
                return;
            }
            updating = false;
        }
    }

    sign();
 
    var x = device.width / 2;
    var y = device.height / 2;
    var wechatCfg = func.wechatCfg ? func.wechatCfg() : {};
    try{
        var idx = 1;
        var bol = true;

        while(bol){
            func.checkSpace();  //检测一次存储空间
            if(!idMatches(':id/(share|love)').visibleToUser().exists()){
                o = text('首页').visibleToUser().findOnce();
                if (o){
                    this.func.clickObject(o);
                    this.func.sleep(2000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase())
                        func.restart(appname,package);
                    else{
                        func.back()
                        func.sleep(2000);
                    }
                }
            }

            //func.checkapp(appname,package);
            idx++;

            var sec = random(me.minVideoSec,me.maxVideoSec);
            this.func.sleep(sec * 1000,"视频播放时间剩余","textMatches('看视频领取.*').visibleToUser().exists()")
            //func.videoSleep(sec);
            
            o = packageName(package).textMatches('看视频领取.*').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(3000);
                func.sleep(60000,"看视频领取金币中","idMatches('.*:id/.*close.*').visibleToUser().exists()")
                closeDialog();
            }    

            do{
                o = textMatches(/\+[0-9]+/).visibleToUser().findOnce();
                if (o){
                    this.func.clickObject(o);
                    func.sleep(2500);    
                    o = packageName(package).textMatches('看视频领取.*').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(5000);
                        func.sleep(60000,"看视频领取金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || text('首页').visibleToUser().exists()")
                    }    
                    closeDialog();
                    this.func.sleep(1000);
                }
                else
                    break;
            }
            while(true)
            func.swipeUp(0,0,random(301,330))
            
            //在这里判断要不要分享
            if (id(package + ':id/share').visibleToUser().exists()){
                if (this.func.isSendTimeline && this.func.isSendTimeline(wechatCfg.isFeed,wechatCfg.lastTimelineDate )){
                    id(package + ':id/share').visibleToUser().findOnce().click();
                    this.func.sleep(5000);
                   
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
        if(thread) thread.interrupt(); //结束弹出窗口的线程检测
    }

    func.log(appname,'结束时间',"**********************************************************");
    func.quit(package);
}

function autoRedraw(){
    var ii = 5;
    while(ii-- > 0 && !text('我的').visibleToUser().exists()){
        func.back();
        func.sleep(2300);
    }
    
    var o = id(package + ':id/tab_make_money').visibleToUser().findOne(5000);
    if (o){
        func.clickObject(o);
        func.sleep(3000);

        o = textMatches('[0-9.]+').visibleToUser().findOne(5000);
        var mycoin = 0;
        if (o){
            mycoin = Number(o.text()) || 0
        }

        if (mycoin >= 0.3){
            o = text('提现').visibleToUser().findOnce();
            func.clickObject(o);
            func.sleep(3000);

            o = packageName(package).textMatches('常规提现.*').visibleToUser().findOne(5000);
            if (o){
                func.swipeUp();
                func.sleep(3000);

                var btns =  textMatches('￥[ .0-9元]*').visibleToUser().filter(function(w){return (Number(w.text().replace('￥','').replace('元','')) || 0) <= mycoin;}).find();
                for(var i = btns.length - 1; i >= 0; i--){
                    func.clickObject(btns[i]);
                    func.sleep(1000);

                    o = text('立即提现').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(3000);
                    }
                }
            }
        }
        else{
            func.toast('余额不足，不能提现',1);
        }
    }
}

function sign(){
    try{
        var o = idMatches(package + ':id/(gift|tab_make_money)').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(10000,'等待中',"textMatches('签到|立即签到得金豆|提现|翻倍奖励|领取翻倍奖励').visibleToUser().exists() || descMatches('签到|立即签到得金豆|提现').visibleToUser().exists()");
        
            o = packageName(package).textMatches('签到|立即签到得金豆').visibleToUser().findOne(3000) || packageName(package).descMatches('签到|立即签到得金豆').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(10000,'签到中',"textMatches('翻倍奖励|领取翻倍奖励').visibleToUser().exists()");

                o = packageName(package).textMatches('翻倍奖励|领取翻倍奖励').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(3000);
                    func.sleep(60000,'奖励翻倍中',"idMatches('.*close.*').visibleToUser().exists()");
                    closeDialog();
                }
            }
        
            o = text('首页').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                func.sleep(2000)
            }
        }
    }
    catch(e){
        func.log(appname,'签到',e.message + '\n\r' + e.stack)
    }
} 

function closeDialog(){
    var o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(3000);
    }
    o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(3000);
    }
    o = packageName(package).textMatches('我知道了|放弃奖励').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(1000);
    }
}

function hasDialog(){
    setInterval(hasDialog2,3000);
}
function hasDialog2(){
    func.hasDialog(updating);
    var o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
    if (o){
        if (!textMatches('看视频领取.*|.*翻倍奖励').visibleToUser().exists())
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