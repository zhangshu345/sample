var appname = '赚钱小视频';
var package = 'com.sljh.zqxsp'; 

var classModule = {};
classModule.minMinutes = 25;
classModule.maxMinutes = 35;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 0;
classModule.maxTextSec = 0;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
classModule.func = null;
var updating = false;

keys = '点击重播|点击下载|点击打开|global_d_btn'



classModule.start = function(){
    s_tt = new Date()
log(appname,'---开始---'  + s_tt.getHours() + ':' + s_tt.getMinutes() + ':' + s_tt.getSeconds());
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
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口
    var startDate = new Date(); //启动时间

    if (currentPackage() != package){
        var o = func.execApp(appname,package)
        if (!o){
            toast("没有找到" + appname);
            if(thread) thread.interrupt(); 
            return; //退出函数
        }
    }

    func.openWaiting(); 

    if (this.autoUpdate == 1){  //启用了自动更新
        var o = id(package + ':id/updata_dialog_bt').visibleToUser().findOnce();  //需要更新
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
    try{
        var idx = 1;
        var bol = true;
        var maxSlide = 5;
        sign()
        refresh()
        // exit()
        while(bol){ //只拉一次视频会卡住，所以下拉后上拉再下拉
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
                                        o = o.parent().child(0);
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
            
            if(!id(package + ':id/activity_short_video_back').visibleToUser().exists()){
                o = id(package + ':id/menu_small_video').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    this.func.sleep(4000);
                    o = text('继续').visibleToUser().findOnce();
                    if (o){
                        this.func.clickObject(o);
                        this.func.sleep(2000);
                    }
                }
                else{
                    if (currentPackage() != package){
                        this.func.restart(appname,package);
                    }
                    else{
                        func.back();
                        this.func.sleep(2000);
                    }
                }
            }

            o = id(package + ':id/start').visibleToUser().findOnce()
            if (o){
                func.clickObject(o)
                this.func.sleep(1000);
            }

            var sec = random(me.minVideoSec,me.maxVideoSec);
            func.toast('视频随机播放时间' + sec + '秒',2)
            func.sleep(sec * 1000,"视频播放");
            func.swipeUp(0,0,random(301,330));

            if (textMatches('立即下载|点击下载').visibleToUser().exists()){
                func.swipeUp(0,0,random(301,330));
            }

            o = idMatches(package + ':id/newsgold_coin_tx.*').visibleToUser().findOnce();
            if (o){
                func.sleep(2000);
                this.func.clickObject(o);
                this.func.sleep(3000);
            }
            o = textMatches('看视频再得.*金币').visibleToUser().findOnce();
            if (o){
                this.func.clickObject(o);
                this.func.sleep(2000);
                func.sleep(60000, "看视频再领金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()")
                            
                closeDialog()
            }

            idx++;
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
        func.log(appname,'LOP',e.message + '\n\r' + e.stack);    
    }
    finally{
        if(thread) thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束时间' ,"**********************************************************");
    func.quit(package);
}

function autoRedraw(){
    var ii = 5;
    while(!id(package + ':id/tv_bottom_menu_me').visibleToUser().exists() && ii-- > 0){
        func.back();
        func.sleep(2000);
    }

    o = id(package + ':id/tv_bottom_menu_me').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(3000);
        o = packageName(package).text('提现').visibleToUser().findOne(10000);
        if (!o)
            o = packageName(package).desc('提现').visibleToUser().findOnce()
        if (o){
            func.clickObject(o)
            func.sleep(3000);
            var btn = packageName(package).text('立即申请提现').visibleToUser().findOne(10000);
            if (btn){
                func.clickObject(btn);
                func.sleep(5000);
            }
            func.back();
        }
    }
}

function closeDialog(){

    if (packageName(package).textMatches(keys).filter(function (w) { if (w.text() == '点击下载' && w.bounds().bottom > device.height * 0.8) { return false } else { return true } }).visibleToUser().exists()) {
        func.back();
        func.sleep(3000);
    }


    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
    }
}
function hasDialog(){
    setInterval(hasDialog2,3000);
}
function hasDialog2(){
    func.hasDialog(updating);
    if (packageName(package).textMatches('点击下载|点击打开').visibleToUser().exists()){
        func.back();
    }

    var o = idMatches(package + ':id/(.*close.*|tv_updata_dialog_n_up)').visibleToUser().findOnce();
    if (o){
        if (!textMatches('看视频再得.*金币|点击看视频即可领取金币').visibleToUser().exists()){
            func.clickObject(o);
        }


    }
    o = packageName(package).textMatches('回头再说|继续|确认').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
    }
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

function refresh(){
    var ii = 6;
    while(ii-- > 0 && !text('我的').visibleToUser().exists()){
        closeDialog()
        if(ii<4){
            func.sleep(3200);
            func.back();
        }
    }
}


function sign() {
    refresh()
    sleep(2000)
    var o = packageName(package).text('任务').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o)
        func.sleep(10000, '等待中', "textMatches('新手任务|日常任务').visibleToUser().exists() || descMatches('新手任务|日常任务').visibleToUser().exists()");
        func.sleep(2000);
        oo = 5
        while (oo-- > 0) {
    
            // 晒收入
            o = textMatches('晒收入').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
            if (o) {
                var list = o.parent();
                for (var i = 0; i < list.childCount(); i++) {
                    var child = list.child(i);
                    // log(child.className());
                    let txt = child.text();
                    let idd = child.id();
                    if (txt == "晒收入" && idd == package + ':id/item_money_go') {
                        func.clickObject(child)
                        sleep(2000)
                        o = textMatches('微信分享').visibleToUser().findOnce() || descMatches('微信分享').visibleToUser().findOnce()
                        if (o) {
                            func.clickObject(o);
                            func.sleep(10000, '等待中', "textMatches('选择|多选').visibleToUser().exists() ");
                            sleep(1000)
                            back()
                            sleep(3000)
                            watch_video()
                            closeDialog()
                        }
                        break
    
                    }
                }
            }
            // 每日首次分享
            o = textMatches('每天首次分享').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
            if (o) {
                var list = o.parent();
                for (var i = 0; i < list.childCount(); i++) {
                    var child = list.child(i);
                    // log(child.className());
                    let txt = child.text();
                    let idd = child.id();
                    if (txt == "去分享") {
                        func.clickObject(child)
                        sleep(2000)
                        o = textMatches('微信分享').visibleToUser().findOnce() || descMatches('微信分享').visibleToUser().findOnce()
                        if (o) {
                            func.clickObject(o);
                            func.sleep(10000, '等待中', "textMatches('选择|多选').visibleToUser().exists() ");
                            sleep(1000)
                            back()
                            sleep(4000)
                            watch_video()
                            closeDialog()
                        }
                        break
                    }
                }
            }
            // 高奖励视频
            ii = 2
            while (ii-- > 0) {
                sleep(3000)
                o = textMatches('看高价奖励视频').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
                if (o) {
                    var list = o.parent();
                    for (var i = 0; i < list.childCount(); i++) {
                        var child = list.child(i);
                        let txt = child.text();
                        let idd = child.id();
                        if (txt == "去观看") {
                            func.clickObject(child)
                            sleep(2000)
                            func.sleep(60000, "看视频再领金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()")
                            
                            closeDialog()
                            sleep(4000)
                            closeDialog()
                            sleep(2000)
                            break
                        }
                    }
                }
            }
            //分享视频
            o = textMatches('分享视频').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
            if (o) {
                var list = o.parent();
                for (var i = 0; i < list.childCount(); i++) {
                    var child = list.child(i);
                    // log(child.className());
                    let txt = child.text();
                    let idd = child.id();
                    if (txt == "去分享") {
                        func.clickObject(child)
                        sleep(2000)
    
    
                        var yy = 5;
                        while (yy-- > 0 && !textMatches('已发放.*').visibleToUser().exists()) {
                            var jj = 5;
                            while (jj-- > 0 && !textMatches('我的').visibleToUser().exists()) {
                                back()
                                sleep(2300)
                            }
                            var o = packageName(package).text('任务').visibleToUser().findOnce();
                            if (o) {
                                func.clickObject(o)
                                func.sleep(10000, '等待中', "textMatches('新手任务|日常任务').visibleToUser().exists() || descMatches('新手任务|日常任务').visibleToUser().exists()");
                                func.sleep(2000);
                            }
                            xx = 5
                            while (xx-- > 0) {
                                o = textMatches('分享视频').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
                                if (o) {
                                    break
                                }
                                func.swipeUp()
                                sleep(1200)
                            }
                            o = textMatches('分享视频').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
                            if (o) {
                                var list = o.parent();
                                for (var i = 0; i < list.childCount(); i++) {
                                    var child = list.child(i);
                                    // log(child.className());
                                    let txt = child.text();
                                    let idd = child.id();
                                    if (txt == "去分享") {
                                        func.clickObject(child)
                                        sleep(2000)
                                        break
                                    }
                                }
                            }
                        }
    
    
    
                        var ii = 5;
                        while (ii-- > 0) {
                            sleep(500)
                            var o = packageName(package).textMatches('已发放.*').visibleToUser().findOnce();
                            if (o) {
                                func.clickObject(o)
                                sleep(3000)
                            }
                            var o = packageName(package).idMatches(package + ':id/activity_video_play_menu_share_news').visibleToUser().findOnce();
                            if (o) {
                                func.clickObject(o)
                                sleep(3000)
                                o = textMatches('微信分享').visibleToUser().findOnce() || descMatches('微信分享').visibleToUser().findOnce()
                                if (o) {
                                    func.clickObject(o);
                                    func.sleep(10000, '等待中', "textMatches('选择|多选').visibleToUser().exists() ");
                                    sleep(1000)
                                    back()
                                    sleep(5000)
                                }
                            }
                            var o = textMatches('拒绝|取消').visibleToUser().findOnce();
                            if(o){
                                func.clickObject(o)
                                sleep(3000)
                            }
                            var o = packageName(package).textMatches('看视频再得.*').visibleToUser().findOnce();
                            if (o) {
                                func.clickObject(o)
                                sleep(3000)
                                func.sleep(60000, "看视频再领金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()")
                                closeDialog()
                                sleep(5000)
                                closeDialog()
                                sleep(2000)
                            }
                            watch_video()
    
                        }
                        back()
                        sleep(3000)
                        back()
                        break
                    }
                }
            }
            func.swipeUp()
            sleep(1200)
        }
    }


}

function watch_video(){
    var ii = 5;
    while (ii-- > 0) {
        var o = packageName(package).idMatches(package +':id/task_share_getgold_tx.*').enabled(true).visibleToUser().findOnce();
        if(o){
            func.clickObject(o)
            sleep(5000)
            func.sleep(60000, "看视频再领金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()")
            closeDialog()
            sleep(3000)
        }else{
            closeDialog()
        }
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

