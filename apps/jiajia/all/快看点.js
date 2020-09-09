/**
 * 适配2.0.3.203
 * 2019.12.06适配2.0.4.206
 */

 const appname = '快看点';
const package = 'com.yuncheapp.android.pearl'; 

var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.func = null;

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
        var o = func.execApp(appname,package)
        if (!o){
            toast("没有找到" + appname);
            if (thread) thread.interrupt();
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

    var kkdImg1 = images.load('http://' + func.DOMAIN + '/images/kkd.jpg');

    //func.openWaiting();
    //要判断是否要签到，或者领取时段奖励
    signAndPickcoin(1);    //签到，并返回结果
    try{
        var idx = 0
        var bol = true;
        var x = device.width / 2;
        var y = device.height / 2;
        var secs = 0;
        var maxSlide = 5;
        while(bol){
            var o = textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').exists() || descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').exists() || packageName(package).textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').exists() || packageName(package).descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').exists();
            if(o){ //出来滑块
                if (!caperview){
                    func.toast('检测到滑块验证，但没有获取到截屏权限，不能完成自动验证！',2)
                    //break;
                }
                else{
                    func.toast('检测到滑块验证',2)
                    var usr =  func.loadConfigText("jsdati_user") || '';
                    var psd =  func.loadConfigText("jsdati_pass") || '';
                    if (usr != '' && psd != ''){
                        if (maxSlide > 0){
                            var bgPic = textStartsWith('bgPic?').findOnce() || descStartsWith('bgPic?').findOnce() || packageName(package).textStartsWith('bgPic?').findOnce() || packageName(package).descStartsWith('bgPic?').findOnce();// || packageName(package).textStartsWith('bgPic?').visibleToUser().findOnce();
                            if (bgPic){
                                func.toast('正在提交联众识别',1);
                                var sliderX = bgPic.bounds().left;   //底图的x坐标
                                var sliderY = bgPic.bounds().top;    //底图的y坐标
                                var offset = 0;
                                try{
                                    //log('aaaa')
                                    var img = captureScreen();  //获取背景图
                                    //log(img)
                                    func.sleep(500);
                                    var sliderImg = images.clip(img, sliderX, sliderY, bgPic.bounds().width(), bgPic.bounds().height()) //这个是滑块，上下高度各减10，左宽减1/3，右宽不减
                                    //log(sliderImg);
                                    var d = getCode(usr,psd,sliderImg);
                                    if (d.code == 0){
                                        func.toast('联众识别到滑块',1);
                                        var s = d.data.res;
                                        var diff = parseInt(s.split(',')[0]) - offset;
    
                                        //var o = className('android.view.View').depth(17).findOnce() || className('android.view.View').clickable(true).depth(16).findOne();   //拖动框
                                        var o = textMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce() || descMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce();
                                        if (o) {
                                            func.toast('开始滑动',1)
                                            maxSlide--; //减少一次
                                            //swipe(o.bounds().centerX(), o.bounds().centerY(), o.bounds().centerX() + diff,o.bounds().centerY(),random(600,1200));
                                            var x = o.bounds().left + o.bounds().width() * 0.1;
                                            swipe(x, o.bounds().centerY(), x + diff,o.bounds().centerY(),random(600,1200));
                                            this.func.sleep(3000);
                                        }
                                    }
                                    else{
                                        func.toast('没有成功识别' + d.msg,1)
                                    }
                                }
                                catch(e){
                                    log(e.message + e.stack)
                                }
                            }
                        }
                        else{
                            func.toast('本次运行打码次数超过上限',1);
                        }
                    }
                    else{
                        var bgPic = textStartsWith('bgPic?').findOnce() || descStartsWith('bgPic?').findOnce() || packageName(package).textStartsWith('bgPic?').findOnce() || packageName(package).descStartsWith('bgPic?').findOnce();
                        var slider = textStartsWith('cutPic?').findOnce() || descStartsWith('cutPic?').findOnce() || packageName(package).textStartsWith('cutPic?').findOnce() || packageName(package).descStartsWith('cutPic?').findOnce();
                        var sliderX = slider.bounds().left;   //滑块的x坐标
                        var sliderY = slider.bounds().top;    //滑块的y坐标
                        var w = device.width - sliderX;   //屏宽扣除滑块宽度
                        var sliderHeight = slider.bounds().height();   //滑块的高度
                        var sliderWidth = slider.bounds().width();  //滑块的宽度
                        var holeWidth = sliderWidth / 4;    //凹洞的宽度
                        sliderWidth = sliderWidth - holeWidth;
                        sliderY = sliderY + holeWidth;
                        var offset = 0;
                        if (bgPic && slider) offset = slider.bounds().left - bgPic.bounds().left;
                
                        var p 
                        try{
                            var img = captureScreen();  //获取背景图
                            func.sleep(500);
                            //滑块，上减凸出，左减凹洞,右减突出
                            //var sliderImg = images.clip(img, sliderX + holeWidth, sliderY + 10, sliderWidth - holeWidth * 2, sliderHeight - holeWidth - 20) //这个是滑块，上下高度各减10，左宽减1/3，右宽不减
                            var sliderImg = images.clip(img, sliderX + holeWidth, sliderY + 20, sliderWidth / 2, sliderHeight - holeWidth - 40) //这个是滑块，上下高度各减10，左宽减1/3，右宽不减
                        
                            img = images.grayscale(img);    //背景灰化
                            sliderImg = images.grayscale(sliderImg);    //滑块灰化
                        
                            //查找范围为滑块右侧空间，上下抛出30像素
                            p = images.findImageInRegion(img, sliderImg, sliderX + sliderWidth, sliderY - 30,w - sliderWidth,sliderHeight - holeWidth + 60);
                        }
                        catch(e){
                            log(e.message + e.stack)
                            this.func.log('','',e.message + e.stack)
                        }
                        if (p){ //找到了
                            func.toast('开始滑动',2)
                            var diff = p.x - (sliderX + holeWidth) + offset; //目标x坐标，减去滑块扣除凹洞的x坐标
                            //var o = className('android.view.View').depth(17).findOnce() || className('android.view.View').clickable(true).depth(16).findOne();   //拖动框
                            var o = textMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce() || descMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce();
                            if (o) {
                                this.func.sleep(200);
                                //swipe(o.bounds().centerX(), o.bounds().centerY(), o.bounds().centerX() + diff + device.width * 0.02,o.bounds().centerY(),random(600,1200)); //1400,2800
                                var x = o.bounds().left + o.bounds().width() * 0.1;
                                swipe(x, o.bounds().centerY(), x + diff,o.bounds().centerY(),random(600,1200));
                                func.sleep(3000);
                            }
                        }
                        else{
                            func.toast('没有验证成功，刷新再试',2)
                            func.back();
                        }
                    }
                }
            }

            
            var verifyTrys = 0;
            //func.toast(id('com.yuncheapp.android.pearl:id/timer_anchor').visibleToUser().exists())
            //func.toast(id('com.yuncheapp.android.pearl:id/title_tv').visibleToUser().exists())
            //func.toast(id('com.yuncheapp.android.pearl:id/share_icon').visibleToUser().exists())
            //func.toast(id('com.yuncheapp.android.pearl:id/series_avatar').visibleToUser().exists())
            //log(text('说你想说的...').exists())
            while(!id(package + ':id/series_avatar').visibleToUser().exists() && !packageName(package).text('关注').visibleToUser().exists()){
                //log('verifyTrys=' +　verifyTrys)
                var o = packageName(package).text('小视频').visibleToUser().filter(function(w){
                    return w.bounds().centerY() > y;
                }).findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase()){
                        if (verifyTrys++ > 2){
                            func.restart(appname,package)
                            break;
                        }
                        else{
                            func.sleep(2000);
                        }
                    }
                    else{ 
                        func.back();     
                        func.sleep(2000);
                    }
                }
            }

            if (id(package +':id/feed_cover').visibleToUser().exists()){
                var o = id(package +':id/feed_cover').visibleToUser().findOnce();
                func.clickObject(o)
            }

            idx++;
            var sec = random(me.minVideoSec,me.maxVideoSec);
            secs += sec;
            func.videoSleep(sec);
            
            if (secs >= 90){
                var avatar = id(package + ':id/series_avatar').visibleToUser().findOnce();
                if(caperview && avatar && kkdImg1){
                    var b = avatar.bounds();
                    var img = captureScreen();
                    p = images.findImageInRegion(img,kkdImg1,b.left,0,b.width(),b.top);
                    if (p){
                        click(p.x,p.y)
                        func.sleep(3000);
                        o = text('翻倍领取').visibleToUser().findOnce() || desc('翻倍领取').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o);
                            this.func.sleep(2000)
                            this.func.sleep(60000,'翻倍领取中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists()")
                        }
                        closeDialog();
                    }
                }
                secs = 0;
            }
            /*if (secs > 300){
                var o = id('timer_anchor').visibleToUser().findOnce();
                if (o){
                    click(o.bounds().centerX(),o.bounds().top,100);
                    func.sleep(3000);

                    var o = text('翻倍领取').visibleToUser().findOnce() || desc('翻倍领取').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        this.func.sleep(2000)
                        this.func.sleep(60000,'翻倍领取中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" +package + "').textMatches('点击下载|幸运大赚盘|点击打开').visibleToUser().exists() || packageName('" +package + "').descMatches('点击下载|幸运大赚盘|点击打开').visibleToUser().exists()")
                        closeDialog();
                    }
                    func.back();
                    secs = 0;
                }
            }*/
            func.swipeUp(0,0,random(301,330));
                    
            signAndPickcoin(); //是否可领币

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
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
    func.quit();
}

function closeDialog(){
    if (textMatches('点击下载|点击打开|立即下载').visibleToUser().exists() || descMatches('点击下载|点击打开|立即下载').visibleToUser().exists()){
        func.back();
        func.sleep(4000);
    }
    var o = idMatches(package + ":id/.*close.*").visibleToUser().findOnce();
    if (o){
        func.clickObject(o)
        func.sleep(4000);
    }
    
    func.sleep(500)
}

function refresh(){
    try{
        var o = packageName(package).text('小视频').visibleToUser().findOnce() || packageName(package).desc('小视频').visibleToUser().findOnce();;
        if (o){
            func.clickObject(o);
            func.sleep(4000);
        } 
    }
    catch(e){
        func.log(appname,'刷新',e.message + '\n\r' + e.stack);
    }
}

function signAndPickcoin(){
    try{
        var o = packageName(package).text('任务').visibleToUser().findOnce() || packageName(package).desc('任务').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(4000);
            
            o = packageName(package).text('领取').visibleToUser().findOnce() || packageName(package).desc('领取').visibleToUser().findOnce();
            if (!o){
                swipe(device.width / 2,device.height * 0.3,device.width / 2,device.height * 0.9,10)
                func.sleep(2000);
                o = packageName(package).text('领取').visibleToUser().findOnce() || packageName(package).desc('领取').visibleToUser().findOnce();
            }
            if (o){
                func.clickObject(o);
                func.sleep(1500);
            }         

            var ii = 3;
            while(ii-- > 0){
                if (packageName(package).text('大转盘领金币').visibleToUser().exists() || packageName(package).desc('大转盘领金币').visibleToUser().exists()){
                    break;
                }
                else{
                    func.swipeUp();
                    func.sleep(1000);
                }
            }

            o = packageName(package).text('大转盘领金币').visibleToUser().findOnce() || packageName(package).desc('大转盘领金币').visibleToUser().findOnce()
            if (o){
                var b = packageName(package).textMatches('轻松领金币，今日剩余[0-9]*次').visibleToUser().findOnce() || packageName(package).descMatches('轻松领金币，今日剩余[0-9]*次').visibleToUser().findOnce()
                var n = 0;
                if (b){
                    if (b.text() != null)
                        n = Number(b.text().replace('轻松领金币，今日剩余','').replace('次','')) || 0;
                    else if (b.desc() != null)
                        n = Number(b.desc().replace('轻松领金币，今日剩余','').replace('次','')) || 0;
                }

                if (n > 5){
                    func.clickObject(o);
                    func.sleep(2000);

                    while(n-- > 5){
                        o = className('ListView').visibleToUser().findOnce();
                        func.clickObject(o);
                        func.sleep(3000);
                        
                        o = packageName(package).text('收入囊中').visibleToUser().findOnce() || packageName(package).desc('收入囊中').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o);
                        }
                        else if (!packageName(package).text('幸运大赚盘').visibleToUser().exists() && !packageName(package).desc('幸运大赚盘').visibleToUser().exists()){
                            func.sleep(60000,"看视频再领金币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" +package + "').textMatches('点击下载|幸运大赚盘|点击打开').visibleToUser().exists() || packageName('" +package + "').descMatches('点击下载|幸运大赚盘|点击打开').visibleToUser().exists()")
                            if (packageName(package).textMatches('点击下载|点击打开').visibleToUser().exists()){
                                func.back()
                            }
                            else{
                                if (idMatches(package + ':id/.*close.*').visibleToUser().exists()){
                                    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
                                    func.clickObject(o);
                                }
                            }
                        }
                        func.sleep(2000)
                    }

                    func.back();
                }
            }
            
            refresh();  //回首页    
        }
    }
    catch(e){
        func.log(appname,'签到',e.message + '\n\r' + e.stack);
    }
}

function getCode(username,password,img) {
    http.__okhttp__.setTimeout(3e4);
    var r = images.toBase64(img, format = "png"), i = device.release, c = device.model, s = device.buildId;
    try {
        //log('aaaaa')
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
        //log('bbbbb')
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

function hasDialog(){
    setInterval(hasDialog2,3000);
}
function hasDialog2(){
    func.hasDialog();
    //在这里判断对话框
    if (currentActivity().indexOf('SafeDialog') > 0)
        func.back();

    var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
    }
                
    var o = textMatches('同意并继续|我知道了|先去逛逛|忽略此版本|以后再说|放弃奖励').visibleToUser().findOnce() || descMatches('同意并继续|我知道了|先去逛逛|忽略此版本|以后再说').visibleToUser().findOnce();
    if (o)
        func.clickObject(o);
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