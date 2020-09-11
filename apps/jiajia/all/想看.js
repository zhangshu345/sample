auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()

const package = 'com.xiangkan.android'; 
var appname = app.getAppName(package) || '想看';

var classModule = {};
classModule.minMinutes = 25;
classModule.maxMinutes = 35;
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
        var o = func.execApp(appname,package,15000,"textMatches('推荐|我的').visibleToUser().exists()");
        if (!o){
            appname = '想看资讯'
            o = func.execApp(appname,package,15000,"textMatches('推荐|我的').visibleToUser().exists()");
            if (!o){
                toast("没有找到" + appname);
                thread.interrupt();
                minutes = 0;
                return; //退出函数
            }
        }
    }

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
    
    func.openWaiting();  
    //要判断是否要签到，或者领取时段奖励
    sign();    //签到，并返回结果

// autoRedraw()
    try{
        var idx = 1;
        var bol = true;
        var needrefresh = false;
        while(bol){
            func.checkSpace();  //检测一次存储空间
            var iii = 10;
            //iv_news_logo是4.8.21特征，tv_home_search_hint是4.8.31特征
            while (!idMatches(package + ':id/(iv_news_logo|tv_home_search_hint|custom_integer_coin_box)').visibleToUser().exists() && iii-- > 0){
                if (packageName(package).text('首页').visibleToUser().exists()){
                    var o = packageName(package).text('首页').visibleToUser().findOnce();
                    func.clickObject(o);
                    func.sleep(2000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase())
                        func.restart(appname,package);
                    else{
                        func.back()
                        func.sleep(2000);
                    }
                }
                func.sleep(200);
            }
            if (iii <= 0) func.restart(appname,package);

            pickCoin(); //领奖
            id(package + ":id/tvTitle").visibleToUser().filter(function(w){
                var b = w.bounds();
                var r = b.width() > 0 && b.top < device.height - 200
                if (w.parent())
                    r = r && w.parent().find(id(package + ':id/appDownloadWrapper')).length == 0 && w.parent().find(textEndsWith('广告')).length == 0
                return r;
            }).find().forEach(function(child){
                o = idMatches('.*:id/tt_reward_ad_countdown').visibleToUser().findOnce();
                if (o){
                    var n = Number(o.text()) || 0;
                    if (n > 0)
                        func.sleep(n * 1000,"等待广告结束");
                    func.sleep(2000);
                }

                let txt = child.text();
                if (readeds.join().indexOf(txt) < 0){   //不在本次历史，不在总历史
                    func.toast('开始阅读第' + idx + '遍文章：' + txt);
                    var isopen = 5, gn = false;
                    while(isopen > 0){
                        func.clickObject(child);
                        func.sleep(2000);    //等待两秒
                        if (currentActivity().indexOf('NewsDetailActivity') > 0 || currentActivity().indexOf('VideoNewsDetailActivity') > 0){
                            func.toast('第' + idx + '遍文章：打开成功');
                            idx++;
                            isopen = 0;
                            gn = true;
                        }
                        else if (currentActivity().indexOf('reading.activity.CommonWebViewActivity') > 0){
                            isopen = -1;    //广告
                        }
                        else
                            isopen -= 1;
                    }
    
                    //************ */
                    if (gn){
                        var b = idMatches(package + ':id/(layout_video_container|video_item_poster)').findOnce();
                        if (b){ //当前打开的是视频
                            var sec = random(20,40);
                            o = idMatches(package + ':id/(video_item_duration|player_duration)').findOnce();  //获取时长
                            if (o){
                                var sectxt = o.text();
                                if (sectxt.indexOf(':') > 0){
                                    var sectmp = (Number(sectxt.split(':')[0]) || 0) * 60 + (Number(sectxt.split(':')[1]) || 0);
                                    if (sectmp < sec) sec = sectmp;
                                }
                            }
        
                            func.videoSleep(sec);
                            func.toast('本次视频完成',2)
                        }
                        else{
                            var max = random(me.minSwipe,me.maxSwipe);
                            for (var i = 0; i < max; i++){
                                var s = random(me.minTextSec * 1000,me.maxTextSec * 1000);
                                func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
                                func.sleep(s);   //随机阅读3到8秒
                                func.swipeUp();
                                
                                threads.start(function(){
                                    var more = packageName(package).textStartsWith('点击阅读全文').filter(function(w){return w.bounds().height() > 15;}).visibleToUser().findOnce();
                                    if (more){
                                        func.clickObject(more);
                                        func.sleep(1000);
                                    }
                                    else{
                                        if (id(package + ':id/tvTitle').visibleToUser().exists()){
                                            max = 0;    //复位循环次数，不再继续上拉
                                        }
                                    }
                                });
                                func.sleep(150);    //等待线程里的max生效，如果有更新的

                                goinVideo();
                            }
                            func.toast('本篇已经阅读完成！',2)
                        }

                        if (idx % 5 == 0)
                            func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)
                        if (idx % 11 == 0) //每看十条刷新一次首页
                            needrefresh = true;
                    }
                    readeds.push(txt);  //保存到今天已阅读
                    cfg.readeds = readeds;
                    func.saveConfig(appname,JSON.stringify(cfg));   

                    var o = id(package + ':id/fudai_icon').visibleToUser().findOnce()
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000);
                    }

                    goinVideo();

                    func.back(); //阅读完成，返回上级
                    func.sleep(2000);  
                }
            });
        
            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
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

function autoRedraw(){
    var ii = 5;
    while(ii-- > 0 && !text('赚金币').visibleToUser().exists()){
        func.back();
        func.sleep(2300);
    }

    var o = text('赚金币').visibleToUser().findOne(3000);
    if (o){
        func.clickObject(o);
        func.sleep(3000);

        o = id(package + ':id/user_center_cash_text').visibleToUser().findOnce();   //金额
        var mycoin = 0;
        if (o){
            mycoin = Number(o.text().replace('约','').replace('元','')) || 0
        }
        if (mycoin >= 0.3){
            o = id(package + ':id/user_center_logined_btn').visibleToUser().findOnce();     //去提现
            func.clickObject(o);
            o = packageName(package).textMatches('提现进度').visibleToUser().findOnce() 
            func.sleep(3000);
            yy = false
            o = packageName(package).textMatches('提现进度').visibleToUser().findOnce() 
            if(o){
                func.clickObject(o);
                sleep(3000)
                func.sleep(10000, '等待中', "textMatches('提现进度').visibleToUser().exists() || descMatches('提现进度').visibleToUser().exists()");
                o = packageName(package).textMatches('申请时间.*').visibleToUser().findOnce() 
                if(o){
                    order_date = o.text()
                    date_str = formatDate(new Date())
                    yy = order_date.indexOf(date_str) != -1 
                    if(yy){
                        toast("今日已经提现")
                    }else{
                        back()
                        toast("进行提现操作")
                    }
                }
            }
            // exit()

            if(!yy){
                ii = 5;
                do{
                    o = packageName(package).textMatches('提现到微信').visibleToUser().findOne(3000) || packageName(package).desc('提现到微信').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(3000);
                        code()
                        sleep(5000)
                        o = packageName(package).textMatches('您今天已经.*|我知道了|.*再提现').visibleToUser().findOne(3000) 
                        if(o){
                            break
                        }
                        // if (textStartsWith('您今天已经成功兑换').visibleToUser().exists() || descStartsWith('您今天已经成功兑换').visibleToUser().exists())
                        //     break;
                    }
                    else{
                        break;
                    }
                }
                while(ii-- > 0)
            }

        }
        else{
            func.toast('余额不足，不能提现',1);
        }
    }
}

//时间戳转换方法    date:时间戳数字
function formatDate(date) {
    var date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    // return YY + MM + DD +" "+hh + mm + ss;
    return YY + MM + DD;
}


function discernSlidingblock(img, ratio) {
    //创建识别变量
    var temp, temp2, x, y, num, color, p, temp3, arr1;
    //分析设备分辨率
    if (ratio == 720) {
        var tb = [348, 253, 691, 638, 81]
        log("您的设备分辨率为：720p");
    } else if (ratio == 1080) {
        var tb = [463, 387, 912, 831, 125]
        log("您的设备分辨率为：1080p");
    } else {
        log("当前设备分辨率不符合规范")
        return -2
    }
    num = Math.ceil(tb[4] / 3.3 - 4);
 
    //计算滑块位置
    for (var k = 29; k <= 40; k++) {
        temp2 = "";
        color = "#" + k + "" + k + "" + k + "";
        for (var i = 1; i <= num; i++) {
            temp2 = temp2 + "0|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|0|" + color + ",";
            temp2 = temp2 + "1|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|1|" + color + ",";
            temp2 = temp2 + "2|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|2|" + color + ",";
        }
        x = 0;
        while (x > -2) {
            y = 0;
            while (y > -2) {
                temp = "";
                for (var i = 1; i <= num; i += 2) {
                    temp = temp + "0|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + y) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|0|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + "1|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|1|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + y- i - 1) + "|" + (tb[4] + y - 1) + "|" + color + ",";
                }
                temp = temp + temp2 + "0|0|" + color;
                arr1 = temp.split(",");
                var arr2 = new Array();
                for (var i = 0; i < arr1.length - 1; i++) {
                    arr2[i] = new Array();
                    temp3 = arr1[i].split("|");
                    arr2[i] = [Number(temp3[0]), Number(temp3[1]), temp3[2]];
                }
                try {
                    p = images.findMultiColors(img, color, arr2, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        return p.x
                    }
                } catch (error) {
                    //出错
                    console.log("识别失败，错误原因：" + error);
                    return -1;
                }
                y = --y;
            }
            x = --x;
        }
    }
    try {
        img.recycle();
    } catch (error) {
        console.log("识别失败，错误原因：" + error);
    }
    return -1;
}

function start_code(){

    // threads.start(function(){
    //     star_ing = text("立即开始").findOne(1000)
    //     if(star_ing){
    //         star_ing.click()
    //         return
    //     }
    // })
    // if (!requestScreenCapture()) {
    //     alert("请求截图权限失败！");
    //     exit();
    // }

    img = images.captureScreen();
    if(img){
        width__ = device.width
        var x = discernSlidingblock(img,width__)
        return x
    }else{
        return -1 
    }
}



function code() {

    sleep(3000)
    for (var iii = 1; iii < 99; iii++) {
        var o = textMatches('拖动滑块完成拼图').findOnce()
        if (o) {
            // p = idMatches('slideBlock').visibleToUser().findOnce()
            p = textMatches('拖动滑块完成拼图').visibleToUser().findOnce()
            
            if (p) {
                
                var sliderX = p.bounds().left-20  //滑块的x坐标
                var sliderY = p.bounds().top+20    //滑块的y坐标
                toast("开始滑动")
                x = start_code()
                if(x != -1){
                    swipe(sliderX, sliderY, sliderX+x, sliderY, 1500)
                }
                // swipe(sliderX, sliderY, device.width * 0.55, sliderY, 1500)
                sleep(3000)
                re = text('javascript:;').visibleToUser().findOnce()
                if(re){
                    var reX = re.bounds().centerX()  //滑块的x坐标
                    var reY = re.bounds().centerY()    //滑块的y坐标
                    log("刷新按钮按钮" + reX, "...,....", reY);
                    click(reX,reY)
                }
                sleep(2000)
                re = textMatches('.*请点击此处重试.*').visibleToUser().findOnce()
                if(re){
                    var reX = re.bounds().centerX()  //滑块的x坐标
                    var reY = re.bounds().centerY()    //滑块的y坐标
                    log("刷新按钮按钮" + reX, "...,....", reY);
                    click(reX,reY)
                }

            }
            sleep(1500)
        } else {
            log("正常已退出验证码");

            break
        }
    }

}


function goinVideo(){
    var o = packageName(package).textMatches('看视频再领[0-9]*金币').visibleToUser().findOnce()
    if (o){
        func.clickObject(o)
        func.sleep(2000);
        func.sleep(60000,'看视频领金币中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || || packageName('" + package + "').textMatches('我的金币|" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        o = idMatches(package + ":id/.*close.*").visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }
    }
}

function refresh(){
    try{
        var o = text('首页').findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(50);
            func.clickObject(o);
            func.sleep(4000);
        }
    }
    catch(e){
        func.log(appname,'刷新',e.message + '\n\r' + e.stack);
    }
}

function pickCoin(){
    try{
        var o = text('领金币').findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            goinVideo()
        }
    }
    catch(e){
        func.log(appname,'领币',e.message + '\n\r' + e.stack);
    }
}

function sign(){
    try{
        var o = textMatches('签到|赚金币').findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);

            o = text('领取奖励').findOnce();
            if (o){
                func.clickObject(o)
            }
        }

        goinVideo()
        func.sleep(2000);

        var o = id(package + ':id/tv_coin').visibleToUser().findOnce();
        var ii = 5;
        while(o && ii-- > 0){
            func.clickObject(o);
            func.sleep(60000,'看视频领金币中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            func.sleep(1000);
            o = idMatches(package + ":id/.*close.*").visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                func.sleep(2000);
            }
            o = id(package + ':id/tv_coin').visibleToUser().findOnce();
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
        o = packageName(package).textMatches('我知道了|放弃奖励').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(1000);
        }

        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o){
            if (!textMatches('看视频再领.*').visibleToUser().exists()){
                func.clickObject(o);
                func.sleep(100)
            }
        }
        
        /*o = id(package + ':id/iv_close').findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(100)
        }*/
        //

        o = id(package + ':id/tt_video_ad_close').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
        }

        o = id(package + ':id/load_label').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
        }

        o = packageName(package).textMatches('继续播放|我知道了|领取奖励|点击重试|继续阅读').visibleToUser().findOnce(); //继续阅读|
        if (o){
            if (o.id() == null || o.id() == '' || o.id().indexOf('ad_') == -1){
                func.clickObject(o);
                func.sleep(100);
            }
        }
        if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
            func.back();
            func.sleep(3000);
        }

        if (currentActivity().indexOf('app.Dialog') > 0){
            func.back();
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