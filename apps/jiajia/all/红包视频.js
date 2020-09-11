auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
const appname = '红包视频';
const package = 'com.sanmiao.sound';
var classModule = {};
classModule.func = null;
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12; 
classModule.autoR = 0;	//默认自动提现

classModule.start = function(){
    var caperview = false
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
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口
    
    if (currentPackage() != package){
        var s = Number(classModule.sec) || 15;
        if (s < 10)  s = 10
        var o = func.execApp(appname,package,s * 1e3,"textMatches('推荐|任务').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt(); //结束弹出窗口的线程检测
            minutes = 0;
            return; //退出函数
        }
    }

    //签到，点击红包即可
    //在这里读取配置文件
    func.openWaiting(['.LauncherActivity','.SplashActivity']);

    sign();
    var x = device.width / 2;
    var y = device.height / 2;
    try{
        var idx = 0;
        var bol = true;
        var maxSlide = 5;
        while(bol){  
            func.checkSpace();  //检测一次存储空间
            
            var o = textMatches(' *向右拖动滑块填充拼图 *|请完成安全验证').exists() || descMatches(' *向右拖动滑块填充拼图 *|请完成安全验证').exists();
            if(o){ //出来滑块
                if (!caperview){
                    func.toast('检测到滑块验证，但没有获取到截屏权限，不能完成自动验证！',2)
                    //break;
                }
                else{
                    func.toast('检测到滑块验证',2)
                    var usr =  func.loadConfigText("jsdati_user") || '';
                    var psd =  func.loadConfigText("jsdati_pass") || ',';
                    if (usr != '' && psd != ''){
                        if (maxSlide > 0){
                            var bgPic = className('Image').visibleToUser().filter(function(w){return (w.text() != null && w.text() != '') || (w.desc() != null && w.desc() != '')}).findOnce()
                            if (bgPic){
                                func.toast('正在提交联众识别',1);
                                var sliderX = bgPic.bounds().left;   //底图的x坐标
                                var sliderY = bgPic.bounds().top;    //底图的y坐标
                                var img = captureScreen();  //获取背景图
                                func.sleep(500);
                                var sliderImg = images.clip(img, sliderX, sliderY, bgPic.bounds().width(), bgPic.bounds().height())
                                var d = getCode(usr,psd,sliderImg);
                                if (d.code == 0){
                                    func.toast('联众识别到滑块',1);
                                    var s = d.data.res;
                                    var diff = parseInt(s.split(',')[0]);

                                    var o = textMatches(' *向右拖动滑块填充拼图 *').findOnce() || descMatches(' *向右拖动滑块填充拼图 *').findOnce();
                                    if (o) {
                                        o = o.parent().child(1);
                                        func.toast('开始滑动',1)
                                        maxSlide--; //减少一次
                                        swipe(o.bounds().centerX(), o.bounds().centerY(), o.bounds().centerX() + diff,o.bounds().centerY(),random(600,1200));
                                        this.func.sleep(3000);
                                    }
                                }
                                else{
                                    func.toast('没有成功识别:' + d.msg,2)
                                }
                            }
                        }
                        else{
                            func.toast('本次运行打码次数超过上限',1);
                        }
                    }
                    else{
                        func.toast('设有设置联众账号密码，不能自动打码！',2)
                    }
                }
            }
            
            if (!idMatches(package + ':/(good_count_icon|home_more_btn)').visibleToUser().exists()){
                o = packageName(package).text('首页').visibleToUser().findOnce();
                if (o){
                    this.func.clickObject(o);
                    this.func.sleep(2000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase()){
                        func.restart(appname,package)
                    }
                    else{
                        this.func.back();
                        this.func.sleep(2300);
                    }
                }
            }

            idx++;
            var sec = random(me.minVideoSec,me.maxVideoSec);
            func.videoSleep(sec);
            swipe(random(x - 100,x - 50),random(y + 300,y + 400), random(x - 100,x - 50), random(y - 300,y - 400),10)
            func.sleep(500);

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
    func.log(appname,'结束时间' ,"**********************************************************");
    func.quit(package);
}

function autoRedraw(){
    var ii = 5;
    while(!packageName(package).text('我').visibleToUser().exists() && ii-- > 0){
        func.back();
        func.sleep(2200);
    }

    var o = packageName(package).text('我').visibleToUser().findOne(5000)
    if (o){
        func.clickObject(o);
        func.sleep(4000);

        o = id(package + ':id/tv_mine_balance').visibleToUser().findOne(10000);
        if (o){
            var money = Number(o.text()) || 0;
            if (money >= 1){
                var o = id(package + ':id/llayout_withdraw').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);

                    func.swipeUp();
                    func.sleep(2000);

                    var btn = id(package + ':id/tv_withdraw_confirm').visibleToUser().findOne(5000);
                    if (btn){
                        var btns = textMatches('[0-9.]+元').visibleToUser().filter(function(w){return (Number(w.text().replace('元','').trim()) || 0) <= money;}).find();
                        if (btns.length == 0)
                            btns = descMatches('[0-9.]+元').visibleToUser().filter(function(w){return (Number(w.desc().replace('元','').trim()) || 0) <= money;}).find();
                        for(var i = btns.length - 1; i >= 0; i--){
                            func.clickObject(btns[i]);
                            func.sleep(1000);
        
                            func.clickObject(btn);
                            func.sleep(2000);
                            if (!id(package + ':id/tv_withdraw_confirm').visibleToUser().exists()){
                                break;
                            }
                        }
                    }
                }
            }
            else{
                func.toast('余额不足，不能提现！',1)
            }
        }
    }
}

function sign(){
    var o = packageName(package).text('任务').visibleToUser().findOne(5000)
    if (o){
        func.clickObject(o);
        func.sleep(2000);

        o = textMatches('立即签到').visibleToUser().findOne(5000)
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            o = idMatches(package + ':id/.*close.*').visibleToUser().findOne(5000);
            if (o)  func.back();
            func.sleep(2000);
        }
        
        o = packageName(package).text('首页').visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
            func.sleep(2000);
        }
    }
}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();

        var o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
        }

        o = text('不下载了').visibleToUser().findOnce() || desc('不下载了').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
        }
    },3000);
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
            captchaType: 1318,
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
classModule.start();Scripts.INSTANCE.runnextScript()