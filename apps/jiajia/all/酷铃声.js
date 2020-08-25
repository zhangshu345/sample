const appname = '酷铃声';
const package = 'com.zheyun.bumblebee.kls';


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

var keys = '点击重播|点击下载|点击打开';

classModule.start = function () {
    s_tt = new Date()
log(appname,'---开始---'  + s_tt.getHours() + ':' + s_tt.getMinutes() + ':' + s_tt.getSeconds());
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes, this.maxMinutes);   //生成运行时间
    func.log(appname, '启动，预计运行：' + minutes, "**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分', 2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package) {
        var o = func.execApp(appname, package, 15000, "textMatches('铃声|我的').visibleToUser().exists()")
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt();
            return; //退出函数
        }
    }

    func.openWaiting(['.FrameLayout', '.SplashActivity'])
    // autoRedraw();
    sign()
    var x = device.width / 2;
    var y = device.height / 2;
    try {
        var idx = 1;
        var bol = true;

        while (bol) {
            func.checkSpace();  //检测一次存储空间
            var ii = 5;
            while (ii-- > 0) {
                o = packageName(package).text('铃声').visibleToUser().findOnce();
                if (o) {
                    if (o.selected()) {
                        break
                    }
                    func.clickObject(o);
                    func.sleep(2000);
                } else {
                    closeDialog()
                    if (ii < 3) {
                        back()
                        sleep(2200)
                    }
                }
            }

            if (!packageName(package).text('探索').visibleToUser().exists()) {
                o = packageName(package).text('铃声').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                }
                else {
                    if (currentPackage().toLowerCase() != package.toLowerCase()) {
                        func.restart(appname, package)
                    }
                    else {
                        func.back();
                        func.sleep(2200);
                    }
                }
            }
            idx++;

            var sec = random(me.minVideoSec, me.maxVideoSec);
            func.sleep(sec * 1000, "视频播放中", "textMatches('看视频再领.*金币|看视频.*金币再翻.*').visibleToUser().exists()");



            var o = packageName(package).textMatches('看视频再领.*金币|看视频.*金币再翻.*').visibleToUser().findOnce();
            if (o) {
                this.func.sleep(1000);
                this.func.clickObject(o);
                this.func.sleep(2000);
                func.sleep(60000, "看视频再领金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog();
            }
            if (packageName(package).textMatches('勋章殿堂').visibleToUser().exists()) {
                o = idMatches(package + ':id/btn_back').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(4000);
                }
            }

            swipe(random(x - 100, x - 50), random(y + 300, y + 400), random(x - 100, x - 50), random(y - 300, y - 400), 10)
            // swipe(random(x - 100, x - 50), random(y + 300, y + 400), random(x - 100, x - 50), random(y - 300, y - 400), 50)
            // func.swipeUp()
            o = textMatches('赚300金币').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                sleep(3000)
                p = textMatches('立即查看').visibleToUser().findOnce();
                if (p) {
                    func.clickObject(p);
                    sleep(3000)
                    // func.sleep(60000, "铃声设置中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').visibleToUser().exists()")
                    func.sleep(60000, "铃声设置中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog()
                    sleep(30000)
                }
            }


            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000) {
                bol = false;
                func.toast(appname + '运行完成', 2)
            }
            else {
                if (idx % 5 == 0)
                    func.toast(appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟', 2)
            }
        }

        if (this.autoR == 0) autoRedraw();

        this.func.sleep(1000);
        // sign();
    }
    catch (e) {
        func.log(appname, '循环执行', e.message + '\n\r' + e.stack)
    }
    finally {
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname, '结束时间', "**********************************************************");

    func.quit(package);
}

function closeDialog() {
    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }

    var o = className('ImageView').visibleToUser().filter(function (w) { return w.id() == '' }).find();
    if (o.length == 1) {
        func.clickObject(o[0]);
        func.sleep(4000);
    }
    o = idMatches(package + ':id/.*close').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(4000);
    }
    o = packageName(package).textMatches('BSBDZ.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }
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

        o = packageName(package).textMatches('提现|去提现').visibleToUser().findOne(6000) || packageName(package).descMatches('提现|去提现').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(3000);

            var money = 0;
            o = packageName(package).textMatches('约[0-9.]*元').visibleToUser().findOne(10000)
            if (o)
                money = Number(o.text().replace('约','').replace('元','')) || 0;
            else{
                o = packageName(package).descMatches('约[0-9.]*元').visibleToUser().findOnce();
                if(o) money = Number(o.desc().replace('约','').replace('元','')) || 0;
            }
            func.toast('金额:' + money,1)
            if (money >= 0.3){
                var btn = packageName(package).text('立即提现').visibleToUser().findOne(8000) || packageName(package).desc('立即提现').visibleToUser().findOnce();
                var btns = packageName(package).textEndsWith('元').visibleToUser().filter(function(w){
                    var r = Number(w.text().replace('元','').trim()) || 0;
                    return r > 0 && r <= money;
                }).find();
                if (btns.length == 0)
                    btns = packageName(package).descEndsWith('元').visibleToUser().filter(function(w){
                        var r = Number(w.desc().replace('元','').trim()) || 0;
                        return r > 0 && r <= money;
                    }).find();
                for(var i = btns.length - 1; i >= 0; i--){
                    func.clickObject(btns[i]);
                    func.sleep(2000);

                    var btn = packageName(package).text('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();
                    if (btn){
                        func.clickObject(btn)
                        func.sleep(3000);

                        if (!text('立即提现').visibleToUser().exists() && !desc('立即提现').visibleToUser().exists()){
                            if (textMatches('.*更懂你').visibleToUser().exists() || descMatches('.*更懂你').visibleToUser().exists()){
                                o = text('男').visibleToUser().findOnce() || desc('男').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o);
                                    func.sleep(1000);
                                }
                                o = text('上班族').visibleToUser().findOnce() || desc('上班族').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o);
                                    func.sleep(1000);
                                }
                                o = textMatches('领取.*金币').visibleToUser().findOnce() || descMatches('领取.*金币').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o);
                                    func.sleep(3000);
                                    break;
                                }
                            }else if(text('提现记录').visibleToUser().exists()){
                                toast("提现完成")
                                break
                            }
                            else{
                                func.sleep(60000,'提现视频观看中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播').visibleToUser().exists()");
                                closeDialog();
                                sleep(3000)
                            }
                            var ii = 5;
                            while(ii-- > 0 && !textMatches('提现记录').visibleToUser().exists()){
                                sleep(3000)
                                o = textMatches('去绑定').visibleToUser().findOnce()
                                if(o){
                                    func.clickObject(o);
                                    func.sleep(3000);
                                    o = textMatches('同意').visibleToUser().findOne(6000)
                                    if(o){
                                        func.clickObject(o);
                                        func.sleep(3000);
                                    }
                                    var btn = packageName(package).text('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();
                                    if (btn) {
                                        func.clickObject(btn)
                                    }  
                                    if (!text('立即提现').visibleToUser().exists() && !desc('立即提现').visibleToUser().exists()){
                                        func.sleep(60000,'提现视频观看中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播').visibleToUser().exists()");
                                        closeDialog();
                                        sleep(3000)
                                    } 
                                }else{
                                    break
                                }  
                            }

                        }
                    }
                }
            }
            else{
                func.toast('余额不足，不能提现',1);
            }
        }
        else{
            func.toast('未进入到提现界面',1);
        }
    }
}

function sign() {
    try {
        refresh()
        closeDialog()
        o = packageName(package).text('任务').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('勋章殿堂|我的金币|看视频.*奖励翻倍.*').visibleToUser().exists() || descMatches('勋章殿堂|我的金币').visibleToUser().exists()");
            toast("任务一：签到翻倍")
            o = textMatches('看视频.*奖励翻倍.*').visibleToUser().findOne(1000);
            if (o) {
                func.clickObject(o);
                func.sleep(2000);
                func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
                sleep(3000)
                closeDialog()
            }

            ii = 3;
            while (ii-- > 0) {
                toast("任务二：阶段奖励")
                o = textMatches('领取时段奖励|幸运金币|立即领取|领取').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                    o = textMatches('看视频最高翻.*|看视频再领.*|看视频.*金币再翻.*').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                    func.sleep(60000, "领币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    closeDialog()
                    sleep(3000)
                    closeDialog()
                }
            }

            closeDialog()
            sleep(3000)
            toast("任务四：勋章殿堂")
            o = textMatches('勋章殿堂').visibleToUser().findOne(3000) || descMatches('勋章殿堂').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                func.sleep(4000);
                if (textMatches('待领取勋章|今日挑战').visibleToUser().exists() || descMatches('待领取勋章|今日挑战').visibleToUser().exists()) {
                    o = packageName(package).textMatches('可领取').visibleToUser().findOnce() || packageName(package).descMatches('可领取').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o);
                        func.sleep(2000);
                        // func.sleep(60000, "勋章殿堂领取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').visibleToUser().exists()")
                        func.sleep(60000, "勋章殿堂领取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");

                        closeDialog();
                        func.sleep(4000);
                    }


                    var n = 7;
                    while (n-- > 0) {
                        o = packageName(package).textMatches('快速领取下一个勋章奖励').visibleToUser().findOnce() || packageName(package).descMatches('快速领取下一个勋章奖励').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o);
                            // func.sleep(2000);
                            // func.sleep(60000, "勋章殿堂领取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').visibleToUser().exists()")
                            func.sleep(60000, "勋章殿堂领取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");

                            closeDialog();
                            func.sleep(4000);
                        }
                        else {
                            break;
                        }
                    }
                    // func.back();
                    func.sleep(2000);
                }
            }
            refresh()
            closeDialog()
            sleep(3000)
            toast("任务五：猜花色")

            o = textMatches('谁是扑克王').visibleToUser().findOnce();
            if (o) {
                    func.clickObject(o)
                    func.sleep(4000);

                // }
            }else{
                var ii = 3;
                while (ii-- > 0) {
                    o = textMatches('拼手气猜花色').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
                    if (!o) {
                        func.swipeUp(0, 0, random(301, 330));
                        func.sleep(2000);
                    } else {
                        break
                    }

                }
                o = textMatches('拼手气猜花色').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o)
                    func.sleep(4000);
                }
                list = o.parent()
                child = list.child(list.childCount() - 1)
                if (child) {
                    func.clickObject(child);
                }
            }
            o = textMatches('猜中牌面花色最高赢.*').visibleToUser().findOne(3000) || descMatches('猜中牌面花色最高赢.*').visibleToUser().findOnce();
            if(o){
                var ii = 85;
                while (ii-- > 0) {
                    toast("猜扑克还剩下"+ii+"次")
                    var nn = random(1, 4)
                    if (nn == 1) {
                        code_key = '红桃'
                    } else if (nn == 2) {
                        code_key = '黑桃'
                    } else if (nn == 3) {
                        code_key = '方块'
                    } else if (nn == 4) {
                        code_key = '梅花'
                    }
                    o = packageName(package).text(code_key).visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o)
                        sleep(1000)
                    }
                    sleep(1000)
                    o = packageName(package).text('立即开奖').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o)
                        sleep(5000)
                    }
                    o = packageName(package).text('观看视频获得4机会').visibleToUser().findOnce();
                    if (o) {
                        func.clickObject(o)
                        // func.sleep(60000, "机会获取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').visibleToUser().exists()")
                        o = packageName(package).text('观看视频次数达到今日上限').visibleToUser().findOne(8000);
                        if(o){
                            break
                        }

                        func.sleep(60000, "机会获取中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
    
                        closeDialog()
                        sleep(3000)
                    }
                }
                sleep(2000)
                o = idMatches(package + ':id/btn_back').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(4000);
                }else{
                    back()
                }
            }





            closeDialog()
            sleep(3000)
            toast("任务六：福利视频")
            var ii = 2;
            while (ii-- > 0) {
                o = textMatches('看福利视频').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
                if (!o) {
                    func.swipeUp(0, 0, random(301, 330));
                    func.sleep(2000);
                } else {
                    break
                }
            }
            var ii = 5;
            while (ii-- > 0) {
                o = textMatches('看福利视频').visibleToUser().findOnce();
                if (o) {
                    list = o.parent()
                    child = list.child(list.childCount() - 1)
                    if (child) {
                        func.clickObject(child);
                        func.sleep(2000);
                        // func.sleep(60000, "福利视频观看中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').visibleToUser().exists()")
                        func.sleep(60000, "福利视频观看中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");

                        closeDialog()
                        sleep(3000)
                        closeDialog()
                    }
                }
            }



        }

        var ii = 5;
        while (ii-- > 0) {
            o = packageName(package).text('铃声').visibleToUser().findOnce();
            if (o) {
                if (o.selected()) {
                    break
                }
                func.clickObject(o);
                func.sleep(2000);
            } else {
                closeDialog()
                if (ii < 3) {
                    back()
                    sleep(2200)
                }
            }
        }
    }
    catch (e) {
        func.log(appname, '领币', e.message + '\n\r' + e.stack)
    }
}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            if (!packageName(package).textMatches('看视频再领.*金币|看视频.*金币再翻.*|完善信息，个性化你的内容').visibleToUser().exists() && !packageName(package).descMatches('看视频再领.*金币|看视频.*金币再翻.*|完善信息，个性化你的内容').visibleToUser().exists())
                {
                    func.clickObject(o);
                }
        }

        o = packageName(package).textMatches('继续播放|放弃金币|以后更新|暂不领取|放弃奖励').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }

        // if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()) {
        //     log("调试信息 趣铃声返回1")
        //     func.back();
        // }

    }, 3000);
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





