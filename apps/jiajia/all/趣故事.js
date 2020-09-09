
/**
 * 适配5.7.0
 * 2019.11.25适配6.0.0
 */

const appname = '趣故事';
const package = 'com.ziqun.story'; 

var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.addStable = 0;
classModule.func = null;
var caperview = false
classModule.start = function(){
    try{
        var img = captureScreen();
        img.recycle();
        caperview = true;
    }
    catch(e){
        threads.start(function(){
            threads.start(function(){
                var o = text('立即开始').visibleToUser().findOne(10000);
                if (o){ 
                    func.sleep(50);
                    click(o.bounds().centerX(),o.bounds().centerY());
                    caperview = true;
                }
            })
            requestScreenCapture()
            caperview = true;
            try{
                var img = captureScreen()
            }
            catch(e){}
        })
    }
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间
    var thread;
    if (this.addStable == 0) thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package){
        var o = func.execApp(appname,package)
        if (!o){
            toast("没有找到" + appname);
            if (thread) thread.interrupt();
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
    func.openWaiting(); 

    sign();    //签到，并返回结果
    try{
        var idx = 1;
        var bol = true;
        var mod = this;
        var needrefresh = false;
        while(bol){
            if (this.addStable == 1) hasDialog2();
            func.checkSpace();  //检测一次存储空间
            var trys = 10;
            while(!packageName(package).text('推荐').visibleToUser().exists() && !packageName(package).text('精选').visibleToUser().exists() && trys-- > 0){
                var o = packageName(package).text('首页').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase())   //当前运行的app变了，重启
                        func.restart(appname,package);
                    else{
                        o = packageName(package).text('返回').findOnce();
                        if (o)
                            func.clickObject(o);
                        else
                            func.back();
                        func.sleep(2000);
                    }
                }
                func.sleep(200);
            }
            
            if (trys <= 0) func.restart(appname,package);

            id(package + ':id/title').visibleToUser().filter(function(w){
                var b = w.bounds();
                var r = b.width() > 0 && b.bottom < device.height - 150;
                if (w.parent() && w.parent().parent())
                    r = r && w.parent().parent().find(text('广告')).length == 0;
                return  r;
            }).find().forEach(function(child){
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
                        act = currentActivity();
                        if (id(package + ':id/iv_back').exists()){  //有效activity的判断
                            func.toast('第' + idx + '遍文章：打开成功');
                            idx++;
                            isopen = 0;
                            gn = true;
                        }
                        else if (id(package + ':id/tt_titlebar_close').exists() || act.indexOf('mobads.AppActivity') > 0 || act.indexOf('TTLandingPageActivity') > 0 || act.indexOf('ziqun.story') > 0){ //无效activity的判断
                            if (act.indexOf('AppActivity') > 0){
                                o = className('android.view.View').findOnce();
                                func.clickObject(o);
                            }
                            o = id(package + ':id/tt_titlebar_close').findOnce();
                            if (o)
                                func.clickObject(o)
                            isopen = -1;    //广告
                        }
                        else
                            isopen -= 1;
                    }
    
                    //************ */
                    if (gn){
                        var max = random(mod.minSwipe,mod.maxSwipe);
                        for (var i = 0; i < max; i++){
                            verifyCode();
                            o = idMatches(package + ":id/.*_close.*").visibleToUser().findOnce()
                            if (o){
                                this.func.clickObject(o);
                                this.func.sleep(2000);
                            }
                            
                            var s = random(me.minTextSec * 1000,me.maxTextSec * 1000)
                            func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
                            func.sleep(s);   //随机阅读3到6秒 
                            if (this.addStable == 1) hasDialog2();
                            func.swipeUp();
                            
                            threads.start(function(){
                                var more = text('展开全文').visibleToUser().findOnce();
                                if(more){
                                    if (more.bounds().top < device.height - 200 ){    //.height() > 0){
                                        func.clickObject(more);
                                        func.sleep(1000);
                                    }
                                }
                                else if (text('相关推荐').visibleToUser().filter(function(w){return w.bounds().bottom < device.height;}).exists()){
                                    max = 0;    //复位循环次数，不再继续上拉
                                }
                            });
                            func.sleep(150);
                        }
                        func.toast('本篇已经阅读完成！',2)

                        if (idx % 5 == 0)
                            func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)
                        if (idx % 20 == 0) //每看20刷新一次首页
                            needrefresh = true;
                    }
                    
                    var o = packageName(package).text('返回').findOnce();
                    if (o)
                        func.clickObject(o);
                    else
                        func.back();
                    func.sleep(2000);
                }
                if (this.addStable == 1) hasDialog2();
            });

            o = packageName(package).textMatches('再赚.*金币').visibleToUser().findOnce();
            if (o){
                this.func.clickObject(o)
                func.sleep(60000,'额外奖励领取中',"idMatches('" + package + ":id/.*_close.*').visibleToUser().exists()");
                o = idMatches(package + ":id/.*_close.*").visibleToUser().findOnce()
                if (o){
                    this.func.clickObject(o);
                    this.func.sleep(2000);
                }
            }
        
            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
            }
            else{
                if (needrefresh){ //每看十条刷新一次首页
                    //refresh();
                    func.restart(appname,package);  //趣故事的刷新，用重新启动来完成
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
        var x = device.width / 2;
        var y = device.height / 2;
        func.swipe(random(x - 100,x - 50), random(y-250,y-200), random(x - 100,x - 50),random(y+150,y+200),500);
        func.sleep(4000);
    }
    catch(e){
        func.log(appname,'刷新',e.message + '\n\r' + e.stack);
    }
}

function verifyCode(){
    var txt = textStartsWith('请找出下图中的').visibleToUser().findOnce();
    if (txt){
        if (!caperview){
            func.toast('检测到验证码，但没有获取到截屏权限，不能完成自动验证！',2)
        }
        else{
            func.toast('检测到验证码',2)
            var usr =  func.loadConfigText("jsdati_user") || '';
            var psd =  func.loadConfigText("jsdati_pass") || '';
            if (usr != '' && psd != ''){
                var bgPic = txt.parent();
                if (bgPic){
                    func.toast('正在提交联众识别',1);
                    var img = captureScreen();  //获取背景图
                    func.sleep(500);
                    var bd = bgPic.bounds()
                    var sliderImg = images.clip(img, bd.left, bd.top, bd.width(), bd.height()) //这个是滑块，上下高度各减10，左宽减1/3，右宽不减
                    var d = getCode(usr,psd,sliderImg);
                    if (d.code == 0){
                        func.toast('识别到结果',1);
                        var s = d.data.res;
                        var x = Number(s.split(',')[0]) || 0;
                        var y = Number(s.split(',')[1]) || 0;
                        click(bd.left + x,bd.top + y);
                        func.sleep(2000);

                        var o = text('提 交').visibleToUser().findOnce();
                        if (o) {
                            func.toast('提交验证',1)
                            func.clickObject(o);
                            this.func.sleep(1000);
                        }
                    }
                    else{
                        func.toast('没有成功识别',1)
                    }
                }
            }
            else{
                func.toast('没有设定联众账号密码，不能自动识别验证码',1); 
            }
        }
    }
}

function sign(){
    var issign = 0;
    try{
        var o = text('任务').findOnce();
        if (o){
            func.clickObject(o)
            func.sleep(3000);
        }

        
    }
    catch(e){
        func.log(appname,'签到',e.message + '\n\r' + e.stack);
    }
    return issign;
}

function hasDialog(){
    setInterval(hasDialog2,3000);
}
function hasDialog2(){
    func.hasDialog();
}


function getCode(username,password,img) {
    http.__okhttp__.setTimeout(3e4);
    var r = images.toBase64(img, format = "png"), i = device.release, c = device.model, s = device.buildId;
    try {
        var n = http.postJson("https://v2-api.jsdama.com/upload", {
            softwareId: 3797,
            softwareSecret: "cp1dIX7DwHuDXkDKWAT0k7Pxx781U0fi8H777TPP",
            username: username,
            password: password,
            captchaData: r,
            captchaType: 1303,
            captchaMinLength: 0,
            captchaMaxLength: 0,
            workerTipsId: 0
        }, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android " + i + "; " + c + " Build/" + s + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 Mobile Safari/537.36",
            }
        });
    } catch (e) {
        return {
            code: "-1",
            msg: "网络链接超时...",
            data: {}
        };
    }
    var d = n.body.json(), p = d.code, m = d.message;
    if ("10079009" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142006" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142004" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142005" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10079006" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("0" == p) {
        return {
            code: p,
            msg: m,
            data: {
                res: d.data.recognition
            }
        };
    }
    return d;
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
