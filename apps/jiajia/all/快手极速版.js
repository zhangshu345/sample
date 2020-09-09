
/**
 * 适配1.10.1.100
 * 2019.11.25适配1.10.2.105
 * 2019.11.27适配1.10.3.115
 * 2019.12.3适配1.11.0.121
 * 2020.01.xx适配2.0.1.167
 */
 
var appname = '快手极速版';
var pkg = 'com.kuaishou.nebula';
var classModule = {};
classModule.func = null;
classModule.minMinutes = 100;
classModule.maxMinutes = 140;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
// classModule.minVideoSec = 8;
// classModule.maxVideoSec = 12;

classModule.minVideoSec = 6;
classModule.maxVideoSec = 9;

classModule.longVideoLink = '';
classModule.noAutoLogin = 0;    //为1则不掉线重登（适用于多开）
var lk;
var keys = '点击重播|点击下载|点击打开|领取福利|下载.*得.*|关闭广告'
classModule.start = function(){
    s_tt = new Date()
log(appname,'---开始---'  + s_tt.getHours() + ':' + s_tt.getMinutes() + ':' + s_tt.getSeconds());
    if (classModule.longVideoLink){
        lk = classModule.longVideoLink
        setClip(lk);
    }
    appname = this.appname || appname;
    var package = this.package || pkg;
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
                    func.sleep(1500);
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
        var o = func.execApp(appname,package,15000,"textMatches('分享|现金收益').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt(); //结束弹出窗口的线程检测
            minutes = 0;
            return; //退出函数
        }else{
            var  check_num = 0 
            while(true){
                check_num +=1
                if(check_num>5){
                    break
                }
                var o = textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').exists() || descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').exists() || packageName(package).textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').exists() || packageName(package).descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').exists();
                if(o){ //出来滑块
                    if (!caperview){
                        //log(112)
                        func.toast('检测到滑块验证，但没有获取到截屏权限，不能完成自动验证！',2)
                        //break;
                    }
                    else{
                        this.func.sleep(3000);
                        //log(113)
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
                                    //var cutPic = textStartsWith('cutPic?').findOnce() || packageName(package).textStartsWith('cutPic?').visibleToUser().findOnce();
                                    //if (cutPic){
                                    //    offset = cutPic.bounds().left - sliderX;    //滑块位置，距离底图左侧的空间，要扣除
                                    //}
                                
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
        
                                            //var o = className('android.view.View').depth(14).findOnce() || className('android.view.View').clickable(true).depth(13).findOne();   //拖动框
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
                                            func.toast('没有成功识别：' + d.msg,1);
                                            this.func.sleep(2000);
                                        }
                                    }
                                    catch(e){
                                        log(e.message + e.stack)
                                    }
                                }
                                else{
                                    func.toast('出来滑块，但未捕捉到位置，请手动完成',2);
                                    //func.back();
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
                                func.toast('没有验证成功',2);
                                var o = textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').findOnce() || descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').findOnce() || packageName(package).textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').findOnce() || packageName(package).descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').findOnce();
                                if(o){
                                    click(o.bounds().left+5,o.bounds().right-5)
                                }
                                sleep(2000);
                            }
                        }
                    }
                }else{
                    break
                }
            }
        }
    }




    //签到，点击红包即可
    //在这里读取配置文件
    var cfg = func.loadConfig(appname);
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date().toLocaleDateString();
    if (lastdate != nowdate){    //是新的一天
        lastdate = nowdate;
        cfg.lastdate = lastdate
    }
    func.openWaiting(['.LauncherActivity','.SplashActivity']);

    try{
        if (!classModule.longVideoLink) sign(); //非长视频，直接签到
        vide()
        var x = device.width / 2;
        var idx = 0;
        var bol = true;
        var maxSlide = 5;
        while(bol){  
            //log(111)
                //var o = textMatches('拖动滑块| *向右拖动滑块填充拼图 *').exists() || descMatches('拖动滑块| *向右拖动滑块填充拼图 *').exists() || textStartsWith('cutPic?').exists() || descStartsWith('cutPic?').exists();// || packageName(package).textMatches('.*拖动滑块.*').visibleToUser().exists();
                var  check_num = 0 
                while(true){
                    check_num +=1
                    if(check_num>5){
                        break
                    }
                    var o = textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').exists() || descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').exists() || packageName(package).textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').exists() || packageName(package).descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').exists();
                    if(o){ //出来滑块
                        if (!caperview){
                            //log(112)
                            func.toast('检测到滑块验证，但没有获取到截屏权限，不能完成自动验证！',2)
                            //break;
                        }
                        else{
                            this.func.sleep(3000);
                            //log(113)
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
                                        //var cutPic = textStartsWith('cutPic?').findOnce() || packageName(package).textStartsWith('cutPic?').visibleToUser().findOnce();
                                        //if (cutPic){
                                        //    offset = cutPic.bounds().left - sliderX;    //滑块位置，距离底图左侧的空间，要扣除
                                        //}
                                    
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
            
                                                //var o = className('android.view.View').depth(14).findOnce() || className('android.view.View').clickable(true).depth(13).findOne();   //拖动框
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
                                                func.toast('没有成功识别：' + d.msg,1);
                                                this.func.sleep(2000);
                                            }
                                        }
                                        catch(e){
                                            log(e.message + e.stack)
                                        }
                                    }
                                    else{
                                        func.toast('出来滑块，但未捕捉到位置，请手动完成',2);
                                        //func.back();
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
                                    var o = textMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce() || descMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce();
                                    if (o) {
                                        this.func.sleep(200);
                                        //swipe(o.bounds().centerX(), o.bounds().centerY(), o.bounds().centerX() + diff + device.width * 0.02,o.bounds().centerY(),random(600,1200)); //1400,2800
                                        var x = o.bounds().left + o.bounds().width() * 0.1;
                                        swipe(x, o.bounds().centerY(), x + diff,o.bounds().centerY(),random(600,1200));
                                        func.sleep(3000);
                                        func.back();
                                    }
                                }
                                else{
                                    func.toast('没有验证成功',2);
                                    var o = textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').findOnce() || descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').findOnce() || packageName(package).textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').findOnce() || packageName(package).descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').findOnce();
                                    if(o){
                                        click(o.bounds().left+5,o.bounds().right-5)
                                    }
                                    sleep(2000);
                                }
                            }
                        }
                    }else{
                        break
                    }
                }




            if (classModule.noAutoLogin == 0){  //要重登
                o = idMatches('.*:id/login_text').visibleToUser().findOnce();
                if (o){
                    func.toast('检测到掉线，准备微信一键登录', 2);
                    var ii = 3;
                    do {
                        func.toast('准备唤醒微信授权登录', 2);
                        if (o){
                            o = idMatches('.*:id/login_text').visibleToUser().findOnce();
                            func.clickObject(o);
                            func.sleep(3000);
                        }

                        o = idMatches('.*:id/protocol_checkbox').visibleToUser().findOne(3000); //首次登录有这个
                        if (o){
                            this.func.clickObject(o);
                            this.func.sleep(200);
                        }

                        //首次登录为微信登录，二次为一键登录
                        o = textMatches('微信登录|一键登录').visibleToUser().findOnce() || descMatches('微信登录|一键登录').visibleToUser().findOnce();
                        if (o){
                            this.func.clickObject(o);
                            this.func.sleep(2000);
                        }
                        o = text('确认登录').visibleToUser().findOne(15000) || desc('确认登录').visibleToUser().findOnce(); //首次登录有确认
                        if (o){
                            this.func.clickObject(o);
                            this.func.sleep(3000);
                        }
                        if (!textMatches('微信登录|一键登录').visibleToUser().exists() && !descMatches('微信登录|一键登录').visibleToUser().exists()) {
                            func.sleep(60000, '微信授权中', "idMatches('.*:id/left_btn').visibleToUser().exists() || textMatches('跳过|拖动滑块').visibleToUser().exists() || descMatches('跳过|拖动滑块').visibleToUser().exists()")
                            break;
                        }
                    }
                    while (ii-- > 0)

                    var o = textMatches('去签到|任务').findOnce();
                    if (o) {
                        func.toast('微信授权登录成功', 2);
                        func.clickObject(o);
                        func.clickObject(o);
                        func.sleep(3000);
                    }
                }
            }

            /*if(textMatches(' *向右拖动滑块填充拼图 *').visibleToUser().exists()){
                func.sleep(2000);
                continue;
            }*/
            //log(115)

            func.checkSpace();  //检测一次存储空间
            if (!idMatches('.*home_search_entrance').visibleToUser().exists()){
                if (currentPackage().toLowerCase() != package.toLowerCase()){
                    //log(117)
                    func.restart(appname,package)
                }
                else{
                    //if (textMatches('现金收益|动态').visibleToUser().exists()){
                        //log(118)
                        this.func.back();
                        this.func.sleep(2300);
                    //}
                }
            }

            idx++;
            var sec = random(me.minVideoSec,me.maxVideoSec);
            
            if (textEndsWith('免费下载').visibleToUser().exists() || textEndsWith('免费安装').visibleToUser().exists()){ //当前是广告
                sec = 0;    //直接上滑，不等待
                func.swipeUp(0,0,random(200,230));
            }else if (textMatches('点击打开.*图.*').visibleToUser().exists() || textMatches('点击打开.*图.*').visibleToUser().exists()){ //当前是广告
                sec = 0;    //直接上滑，不等待
                func.swipeUp(0,0,random(200,230));
            }
            else{
                if (textStartsWith('点击重播').visibleToUser().exists()){
                    o = textStartsWith('点击重播').visibleToUser().findOnce();
                    this.func.clickObject(o);
                }
                func.videoSleep(sec);
                if (!classModule.longVideoLink){
                    func.swipeUp(0,0,random(200,230));
                    func.sleep(500);
                }
            }

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
            }
            else{
                //if (idx % 15 == 0 && func.release <= 7 && func.is2GMemory)
                //    func.restart(appname,package);
                //else 
                if (idx % 5 == 0)
                    func.toast(appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟',2)
            }
        }
        if (classModule.longVideoLink) sign();  //长视频，看完再签到
    }
    catch(e){
        //log(124)
        log(e.message + e.stack)
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack)
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束时间' ,"**********************************************************");
    func.quit(classModule.longVideoLink ? '' : package);    //长视频模式不清缓存
}

function sign(){
    var pkg = 'com.kuaishou.nebula';
    package = pkg
    try{
        var  check_num = 0 
        while(true){
            sleep(200)
            check_num +=1
            if(check_num>5){
                break
            }
            var o = textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').exists() || descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').exists() || packageName(package).textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').exists() || packageName(package).descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').exists();
            if(o){ //出来滑块
                if (!caperview){
                    //log(112)
                    func.toast('检测到滑块验证，但没有获取到截屏权限，不能完成自动验证！',2)
                    //break;
                }
                else{
                    this.func.sleep(3000);
                    //log(113)
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
                                //var cutPic = textStartsWith('cutPic?').findOnce() || packageName(package).textStartsWith('cutPic?').visibleToUser().findOnce();
                                //if (cutPic){
                                //    offset = cutPic.bounds().left - sliderX;    //滑块位置，距离底图左侧的空间，要扣除
                                //}
                            
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
    
                                        //var o = className('android.view.View').depth(14).findOnce() || className('android.view.View').clickable(true).depth(13).findOne();   //拖动框
                                        var o = textMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce() || descMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce();
                                        if (o) {
                                            func.toast('开始滑动',1)
                                            maxSlide--; //减少一次
                                            //swipe(o.bounds().centerX(), o.bounds().centerY(), o.bounds().centerX() + diff,o.bounds().centerY(),random(600,1200));
                                            var x = o.bounds().left + o.bounds().width() * 0.1;
                                            swipe(x, o.bounds().centerY(), x + diff,o.bounds().centerY(),random(600,1200));
                                            this.func.sleep(3000);
                                            func.back();
                                        }
                                    }
                                    else{
                                        func.toast('没有成功识别：' + d.msg,1);
                                        this.func.sleep(2000);
                                    }
                                }
                                catch(e){
                                    log(e.message + e.stack)
                                }
                            }
                            else{
                                func.toast('出来滑块，但未捕捉到位置，请手动完成',2);
                                //func.back();
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
                            var o = textMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce() || descMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce();
                            if (o) {
                                this.func.sleep(200);
                                //swipe(o.bounds().centerX(), o.bounds().centerY(), o.bounds().centerX() + diff + device.width * 0.02,o.bounds().centerY(),random(600,1200)); //1400,2800
                                var x = o.bounds().left + o.bounds().width() * 0.1;
                                swipe(x, o.bounds().centerY(), x + diff,o.bounds().centerY(),random(600,1200));
                                func.sleep(3000);
                                func.back();
                                

                            }
                        }
                        else{
                            func.toast('没有验证成功',2);
                            var o = textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').findOnce() || descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').findOnce() || packageName(package).textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').findOnce() || packageName(package).descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').findOnce();
                            if(o){
                                click(o.bounds().left+5,o.bounds().right-5)
                            }
                            sleep(2000);
                        }
                    }
                }
            }else{
                break
            }
        }


        var ii = 5;
        while(ii-- > 0 && !idMatches('.*:id/(redFloat|red_packet|gold_egg_packet|like_button)').visibleToUser().exists()){
            func.back();
            func.sleep(2300);
        }
        var o = idMatches('.*:id/(redFloat|red_packet|gold_egg_packet)').visibleToUser().findOne(5000)
        if (o){
            func.clickObject(o);
            func.sleep(4000);
            closeDialog()
            o = textMatches('去签到|立即签到|日常任务|新手任务|现金收益').visibleToUser().findOne(5000) || descMatches('去签到|立即签到|日常任务|新手任务|现金收益').visibleToUser().findOnce();;
            var o = textMatches('去签到|立即签到').visibleToUser().findOnce(1) || descMatches('去签到|立即签到').visibleToUser().findOnce(1) || textMatches('去签到|立即签到').visibleToUser().findOnce() || descMatches('去签到|立即签到').visibleToUser().findOnce();
            if (o){
                func.clickObject(o)
                sleep(3000)
                closeDialog()
            }else{
                closeDialog()
                var ii = 5;
                while(ii-- > 0 && !textMatches('去查看|去签到|立即签到|打开签到提醒.*').filter(function (w) { return w.bounds().bottom < device.height * 0.8; }).visibleToUser().exists()){
                    func.swipeUp();
                    sleep(1000)
                    var o = textMatches('去签到|立即签到').visibleToUser().findOnce() || descMatches('去签到|立即签到').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o)
                        sleep(3000)
                    }
                    var o = text('去查看|打开签到提醒.*').visibleToUser().exists() || desc('去查看|打开签到提醒.*').visibleToUser().exists()
                    if (o){
                        func.toast('今日已签到',1);
                    }
                }
            }

            closeDialog()
            func.back(); //返回视频页面
            func.sleep(2200);


            var ii = 5;
            while(ii-- > 0 && !idMatches('.*:id/(readFloat|red_packet|gold_egg_packet|like_button)').visibleToUser().exists()){
                func.back(); //返回视频页面
                func.sleep(2200);
            }
        }
    }
    catch(e){
        func.log(appname,'签到',e.message + '\n\r' + e.stack)
    }
}

function vide(){

    var  check_num = 0 

    var ii = 3;
    while(ii-- > 0 && !idMatches('.*:id/(redFloat|red_packet|gold_egg_packet|like_button)').visibleToUser().exists()){
        func.back();
        func.sleep(2300);
    }
    closeDialog()
    var ii = 5;
    while(ii-- > 0 && !textMatches('金币收益').visibleToUser().exists()){
        sleep(15000)
        var o = textMatches('去签到|立即签到').visibleToUser().findOnce() || descMatches('去签到|立即签到').visibleToUser().findOnce();
        if (o){
            func.clickObject(o)
            sleep(3000)
            closeDialog()
        }

        closeDialog()
        var o = idMatches('.*:id/(redFloat|red_packet|gold_egg_packet)').visibleToUser().findOne(5000)
        if (o){
            func.clickObject(o);
            func.sleep(4000);
        }
        o = packageName(pkg).textMatches('明日再来').visibleToUser().findOnce();
        if(o){
            break
        }
        func.swipeUp();
        o = textMatches('福利|福利.*').visibleToUser().findOnce();
        if(o){
            break
        }
    }



    
    var jj = 30;
    while(jj-- > 0){
        toast("剩余检测次数"+jj)
        o = packageName(pkg).textMatches('明日再来').visibleToUser().findOnce();
        if(o){
            break
        }
        
        var ii = 5;
        while(ii-- > 0 ){
            o = textMatches('福利|福利.*').visibleToUser().filter(function(w){return w.bounds().bottom < device.height * 0.85;}).findOnce();
            if (!o){
                func.swipeUp(0,0,random(301,330));
                func.sleep(2000);
            }else{
                break
            }
        }

        o = packageName(pkg).textMatches('福利|福利.*').visibleToUser().filter(function(w){return w.bounds().bottom < device.height * 0.85;}).findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            p = packageName(pkg).textMatches('网络异常，请点击重试').visibleToUser().findOnce();
            if(p){
                back()
                func.sleep(1000);
                o = packageName(pkg).textMatches('放弃奖励').visibleToUser().findOnce();
                func.clickObject(o);
                func.sleep(1000);
                continue
            }
            func.sleep(60000, '10次视频视频观看中', "idMatches('.*close.*').visibleToUser().filter(function(w){return w.id() != 'com.nineton.weatherforecast:id/web_close'}).exists() || packageName('" + pkg + "').textMatches('继续邀好友赚钱|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog();
            func.sleep(3000);
        }
    }

    var ii = 5;
    while(ii-- > 0 && !idMatches('.*:id/(redFloat|red_packet|gold_egg_packet|like_button)').visibleToUser().exists()){
        func.back();
        func.sleep(2300);
    }

}

function closeDialog() {
    if (packageName(pkg).textMatches(keys).visibleToUser().exists() || packageName(pkg).descMatches(keys).visibleToUser().exists()) {
        func.back();
        func.sleep(3000);
    }

    o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(5000);
    }
    o = textMatches('已连续签到.*天').visibleToUser().findOnce();
    if (o) {
        var list = o.parent().parent();
        child = list.child(0)
        func.clickObject(child)
    }
    o = textMatches('恭喜获得好友.*').visibleToUser().findOnce() || descMatches('恭喜获得好友.*').visibleToUser().findOnce();
    if (o) {
        p =  o.parent()
        if(p){
            q = o.parent().parent()
            if(q){
                var list = o.parent().parent();
                child = list.child(0)
            }else{
                var list = o.parent();
                child = list.child(0)
            }
        }
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
    var func = classModule.func;
    setInterval(() => {
        try{
            func.hasDialog();

            if (lk){
                o = text('去看看').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    lk = '';
                }
            }
            var o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
            if (o){
                if(o.id().indexOf('envolope_icon_close') == -1)
                    func.clickObject(o);
            }
            
            o = textMatches('以后再说|我知道了|同意并继续|跳过|放弃奖励').findOnce() || descMatches('以后再说|我知道了|同意并继续|跳过').findOnce();
            if (o){
                func.clickObject(o);
            }
            o = text('领取红包').visibleToUser().exists();
            if (o){
                func.back();
            }
        }
        catch(e){
            func.log(appname,'DG',e.message + e.stack)
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