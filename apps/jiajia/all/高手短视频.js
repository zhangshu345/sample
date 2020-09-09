const appname = '高手短视频';
const package = 'com.video.gs';

var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.func = null;
classModule.autoR = 0;	//默认自动提现
var updating = false;
var keys = '关闭广告|点击重播|点击下载|下载|点击打开|恭喜获得.*';

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
            return; //退出函数
        }
    } 

    func.openWaiting(['.FrameLayout','.SplashActivity'])
    if (this.autoUpdate == 1){  //启用了自动更新
        var o = id(package + ':id/btn_right').text('下载').visibleToUser().findOnce();  //需要更新
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

    var x = device.width / 2;
    var y = device.height / 2;
    var pickDate = Date.now();
    var wechatCfg = func.wechatCfg ? func.wechatCfg() : {};
    try{
        var idx = 1;
        var bol = true;
        var trs = 0;
        while(bol){
            closeDialog();
            func.checkSpace();  //检测一次存储空间
            if (!idMatches(package + ':id/(iv_like|layout_like)').visibleToUser().exists()){
                if (text('我的收益').visibleToUser().exists() || desc('我的收益').visibleToUser().exists()){
                    this.func.back();
                    this.func.sleep(2000);
                }
                o = packageName(package).visibleToUser().text('首页').findOnce()
                if (o){
                    trs = 0;
                    func.clickObject(o)
                    this.func.sleep(4000);
                    o = idMatches(package + ':id/(iv_head_icon|tv_desc)').visibleToUser().find();
                    if (o.length > 1){
                        func.clickObject(o[1].parent());
                        func.sleep(3000);
                    }
                }
                else{
                    if (trs >= 5 || currentPackage().toLowerCase() != package.toLowerCase()){
                        func.restart(appname,package)
                    }
                    else{
                        trs++;
                        this.func.sleep(2000);
                    }
                }
            }
            else{
                trs = 0;
            }   
            idx++;

            var sec = random(me.minVideoSec,me.maxVideoSec);
            // if (app.versionCode == 2)
            //     this.func.sleep(sec * 1000,"视频播放中");
            // else
            //     this.func.sleep(sec * 1000,"请升级自阅版本至2.0.7或以上，视频播放中");
            this.func.sleep(sec * 1000,"视频播放中");
            //func.videoSleep(sec);
            this.func.swipeUp(0,0,random(301,330));

            o = packageName(package).textMatches('看视频奖励最高翻[0-9]+倍').visibleToUser().findOnce();
            if (o){
                func.clickObject(o)
                func.sleep(4000); 
                func.sleep(60000,'奖励翻倍中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').visibleToUser().exists()")
                closeDialog();
            }

            pickDate = pickCoin(pickDate);

            //在这里判断要不要分享
            if (id(package + ':id/iv_share').visibleToUser().exists()){
                if (this.func.isSendTimeline && this.func.isSendTimeline(wechatCfg.isFeed,wechatCfg.lastTimelineDate )){
                    var o = id(package + ':id/iv_share').visibleToUser().findOnce()
                    func.clickObject(o)
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
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束时间',"**********************************************************");
    func.quit(package);
}

function sign(){
    var o = text('立即签到').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(4000);
        func.sleep(60000,'签到中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || text('" + keys + "').visibleToUser().exists()")
        closeDialog();
    }

    func.sleep(3000);
}

function closeDialog(){
    var o = text('关闭广告').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);
    }

    if (textMatches(keys).visibleToUser().exists() || descMatches(keys).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }
    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);
    }
    o = className('ImageView').filter(function(w){return w.id() == '' && (w.desc() == null || w.desc() == '') && (w.text() == null || w.text() == '');}).visibleToUser().find()
    if (o.length == 1){
        func.clickObject(o[0]);
        func.sleep(2000);
    }
}

function autoRedraw(){
    var ii = 3
    while(ii-- > 0 && !id(package + ':id/tv_coin_num').visibleToUser().exists()){
        func.back();
        func.sleep(2200);
    }

    var o = id(package + ':id/tv_coin_num').visibleToUser().findOne(8000);//id(package + ':id/tv_cash_money').visibleToUser().findOne(8000);
    if (o){
        func.clickObject(o);
        func.sleep(3000);
        
        //兑换
        var b = idMatches(package + ':id/(tv_coin_exchange_money_btn|tv_coin_exchange_money_btn_2)').visibleToUser().findOne(5000);//金币兑换现金
        if (b){
            func.clickObject(b);
            func.sleep(2000);
            b = packageName(package).text('确定').visibleToUser().findOnce();
            if (b){
                func.clickObject(b);
                func.sleep(2000);
            }
        }

        o = idMatches(package + ':id/(tv_money_total|tv_money_total_2)').visibleToUser().findOne(3000);
        var mycoin = 0;
        if (o){
            mycoin = Number(o.text()) || 0;
        }
        if (mycoin >= 1){
            o = idMatches(package + ':id/(tv_go_withdraw|tv_go_withdraw_2)').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(3000);

                o = textMatches('提现说明.*').visibleToUser().findOne(10000);

                var btns = textMatches('[.0-9]*元').filter(function(w){return (Number(w.text().replace('元','').trim()) || 0) <= mycoin}).find();
                for(var i = btns.length - 1; i >= 0; i--){
                    func.clickObject(btns[i]);
                    func.sleep(1000);
    
                    o = text('立即提现').visibleToUser().findOnce();
                    if (o){
                        func.toast('提现：' + btns[i].text())
                        func.clickObject(o)
                        func.sleep(3000);

                        var redrawTo = Number(classModule.redrawToAlipay) || 0;
                        o = text(redrawTo == 1 ? '提现到支付宝' : '提现到微信').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o);
                            func.sleep(2000);
                            
                            if(text('姓名：').visibleToUser().exists() && !text('立即提现').visibleToUser().exists()){
                                func.back();
                                func.sleep(2000);
                            }

                            o = text('立即提现').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o);
                                func.sleep(2000);
                            }
                        }
                    }
                }
            }
        }
        else{
            func.toast('余额不足，不能提现',2)
        }
    }
}

function pickCoin(pickDate){
    try{
        if (pickDate <= Date.now()){
            func.sleep(1000);
            o = textMatches('我|我的').visibleToUser().findOnce();
            if (o){
                click(device.width * 0.6,o.bounds().centerY())
                func.sleep(2000);
            
                var packs = id(package + ':id/item_content').visibleToUser().filter(function(w){
                    return w.parent().find(id(package + ':id/progress')).length == 0;
                }).find()
                if (packs.length == 0){
                    o = id(package + ':id/red_view').visibleToUser().findOnce();
                    func.sleep(2000);
                    var packs = id(package + ':id/item_content').visibleToUser().filter(function(w){
                        return w.parent().find(id(package + ':id/progress')).length == 0;
                    }).find()
                }
                //log(packs.length)
                for(var i = packs.length - 2; i >= 0 ; i--){
                    func.clickObject(packs[i]);
                    func.sleep(5000);

                    o = packageName(package).textMatches('看视频奖励最高翻[0-9]+倍').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o)
                        func.sleep(2000);
                        func.sleep(60000,'奖励翻倍中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || textMatches('" + keys + "').visibleToUser().exists()")
                        closeDialog();
                    }
                    if (!id(package + ':id/item_content').visibleToUser().exists()){
                        o = id(package + ':id/red_view_content').visibleToUser().findOnce()
                        if (o){
                            func.clickObject(o);
                            func.sleep(2000);
                        }
                        else{
                            break;
                        }
                    }
                }  
                func.back();
            
                func.sleep(2000);
                sign()
                o = packageName(package).text('首页').visibleToUser().findOnce();
                if(o){
                    func.clickObject(o);
                    func.sleep(2000);
                }
            }
            pickDate = Date.now + 5 * 60 * 1000;
        }
    }
    catch(e){
        log(e.message + '\n\r' + e.stack)
        func.log(appname,'领币',e.message + '\n\r' + e.stack)
    }
    return pickDate;
}
 
function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog(updating);
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o){
            if (!packageName(package).textMatches('看视频奖励最高翻[0-9]+倍|请选择提现方式').visibleToUser().exists()){
                func.clickObject(o);
            }
        }

        var o = packageName(package).textMatches('继续播放|取消|关闭广告').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
        }
        o = className('ImageView').filter(function(w){return w.id() == '' && (w.desc() == null || w.desc() == '') && (w.text() == null || w.text() == '');}).visibleToUser().find()
        if (o.length == 1){
            func.clickObject(o[0])
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