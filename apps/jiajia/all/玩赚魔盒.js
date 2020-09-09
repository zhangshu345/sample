const appname = '玩赚魔盒';
const package = 'com.lucky.magicbox'

var classModule = {};
classModule.minMinutes = 15;
classModule.maxMinutes = 20;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
classModule.func = func;
var keys = '点击重播|点击下载|点击打开|领取福利|下载.*得.*'

keys = '点击重播|点击下载|点击打开'
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
        var o = func.execApp(appname, package)
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt();
            return; //退出函数
        }
    }

    func.openWaiting(['.FrameLayout', '.SplashActivity'])

    var x = device.width / 2;
    var y = device.height / 2;
    try {
        sign()
        var idx = 1;
        var bol = true;

        while (bol) {
            func.checkSpace();  //检测一次存储空间
            var ii = 5;
            while (ii-- > 0) {
                o = packageName(package).text('小视频').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    break
                } else {
                    refresh()
                }
            }

            if (currentPackage().toLowerCase() != package.toLowerCase()) {
                func.restart(appname, package)
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


        autoRedraw()
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

function sign() {
    // //回归任务
    q = packageName(package).textMatches('马上赚钱').visibleToUser().findOnce();
    if (q) {
        func.clickObject(q);
        func.sleep(2000);
        func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
        closeDialog();
        closeDialog();
    }
    

    // //---------------------*主页领金币*---------------------  搞完1300 金币
    toast("任务一:喝水")

    var o = packageName(package).textMatches('主页').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }


    o = packageName(package).textMatches('.*/8').visibleToUser().findOnce();
    if (o) {
        b = o.bounds();
        click(b.centerX()+40, b.centerY());
        func.sleep(15000, "等待中...", "idMatches('" + package + ":id/.*tt_insert_express_dislike_icon_img.*').visibleToUser().exists() ");
        func.sleep(1000);
        closeDialog()
        func.sleep(2000);


        var ii = 5;
        while (ii-- > 0 && !textMatches('喝第.*水|等.*再喝').filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).visibleToUser().exists()) {
            func.swipeUp()
            func.sleep(2300);
        }

        o = packageName(package).textMatches('喝第.*水').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(60000, '喝水领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('广告|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
            closeDialog();
            sleep(3000)
            back()
            sleep(3000)
            q = packageName(package).textMatches('金币翻倍|金币加速').visibleToUser().findOnce();
            if (q) {

                func.clickObject(q);
    func.sleep(2000);
    func.sleep(10000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
                func.sleep(2000);
                func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
                closeDialog();
                closeDialog();
            }
        }
        back()
    }

    // //---------------------*主页拆红包*---------------------  搞完1300 金币
    toast("任务二:拆主页红包")
    closeDialog();
    refresh()
    var o = packageName(package).textMatches('主页').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }

    var finds = packageName(package).className('android.widget.RelativeLayout').depth(5).visibleToUser().find();
    if (finds.length > 5) {
        var ii = 6;
        while (ii-- > 0) {
            list = finds[finds.length - ii - 1]
            if (!list.childCount()) {
                func.clickObject(list);
                func.sleep(10000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
                func.sleep(2000);
                o = packageName(package).textMatches('金币翻倍|金币加速').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(5000);
                }
                func.sleep(2000);
                func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('今日数据|点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
                closeDialog();
                closeDialog();
            }
        }
    }else{
        var finds = packageName(package).className('android.widget.RelativeLayout').depth(28).visibleToUser().find();
        for (var ii = 0; ii < finds.length; ii++) {
            let child = finds[ii];
            let txt = child.text();
            xy = child.bounds()
            o = textMatches(/\d+:\d+:\d+/).boundsInside(xy.left, xy.top, xy.right, xy.bottom).visibleToUser().findOnce();
            if (!o) {

                func.clickObject(child);
                func.sleep(10000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
                func.sleep(2000);
                o = packageName(package).textMatches('金币翻倍|金币加速').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(5000);
                }
                func.sleep(2000);
                func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('今日数据|点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
                closeDialog();
                closeDialog();

            }
        }


    }

    // //---------------------*签到*---------------------  搞完1300 金币
    toast("任务三:签到")
    refresh()

    var o = packageName(package).textMatches('我的').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        sleep(2000)
        func.sleep(10000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
        
        func.sleep(3000);
    }
    o = id('iv_get_signIn').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
        func.sleep(10000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
        
        func.sleep(60000, '签到领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
        closeDialog();
        closeDialog();
        p = idMatches('.*:id/tv_btn_again').visibleToUser().findOnce();
        if (p) {
            func.clickObject(p);
            func.sleep(2000);
            func.sleep(10000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
        
            func.sleep(2000);
            func.sleep(60000, '签到领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
            closeDialog();
            q = packageName(package).textMatches('金币翻倍|金币加速').visibleToUser().findOnce();
            if (q) {
                func.clickObject(q);
                func.sleep(2000);
                func.sleep(10000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
            
                func.sleep(2000);
                func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
                closeDialog();
                closeDialog();
            }

        }
    }



    toast("任务四:大转盘")
    refresh()
    
    var o = packageName(package).textMatches('我的').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        sleep(2000)
        func.sleep(10000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
        func.sleep(2000);
        var o = packageName(package).textMatches('幸运转盘').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            sleep(2000)
            func.sleep(20000, '等待中', "!textMatches('剩余次数.*').visibleToUser().exists() && !descMatches('剩余次数.*').visibleToUser().exists()");
            func.sleep(2000);
            var ii = 10;
            while(ii-- > 0){
                finds = packageName(package).textMatches('4_gift').visibleToUser().find()
                yy_num = 0
                for(var kk = 0; kk < finds.length; kk++){
                    let child = finds[kk];
                    yy_num += child.bounds().centerY();
                }
                yy = yy_num/3
                x1 = device.width/2
                click(x1,yy)
                sleep(5000)
                q = packageName(package).textMatches('分享到微信群').visibleToUser().findOnce();
                if(q){
                    break
                }
                q = packageName(package).textMatches('金币翻倍|金币加速').visibleToUser().findOnce();
                if (q) {
                    func.clickObject(q);
                    func.sleep(2000);
                }
                func.sleep(30000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
                func.sleep(2000);
                func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
                closeDialog();
                sleep(3000)
                closeDialog();  
            }
            back()
            refresh()
        
        }
    }
    







    // //---------------------*主页跑步*---------------------  搞完1300 金币
    
    toast("任务4:领取跑步金币")

    refresh()
    var o = packageName(package).textMatches('主页').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }

    var ii = 10;
    while (ii-- > 0) {
        toast("任务二:领取跑步金币,检测剩余次数"+ii)
        closeDialog();
        var o = id('walk_coin_btn').visibleToUser().findOne(5000)
        if (o) {
            func.clickObject(o);
            sleep(2000)
            func.sleep(10000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
            sleep(2000)
            if(textMatches('正在加载').visibleToUser().exists()){
                back()
            }
        }else{
            var o = packageName(package).textMatches('主页').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o);
                func.sleep(3000);
            }
        }
        // o = packageName(package).textMatches('金币加速').visibleToUser().findOnce();
        // 
        o = packageName(package).textMatches('金币翻倍|金币加速').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(2000)
            func.sleep(10000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
            sleep(2000)
            if(!textMatches('正在加载').visibleToUser().exists()){
                func.sleep(60000, '任务一:看视频领金币中', "idMatches('.*:id/.*close.*|.*:id/.*walk_coin_btn.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
                closeDialog();
                func.sleep(2000);
                closeDialog();
            }else{
                back()
            }

        }
        o = packageName(package).textMatches('.*请耐心等待|提示').visibleToUser().findOnce();
        if (o) {
            o = packageName(package).textMatches('我知道了').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
            }
            break
        }
        o = packageName(package).textMatches('继续赚钱').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
        }
    }
    sleep(1000)


    //---------------------*主页领金币*---------------------

    //---------------------*签到*---------------------  搞完1300 金币

    // /// 又

    toast("任务一:喝水")

    var o = packageName(package).textMatches('主页').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }


    o = packageName(package).textMatches('.*/8').visibleToUser().findOnce();
    if (o) {
        b = o.bounds();
        click(b.centerX()+40, b.centerY());
        func.sleep(15000, "等待中...", "idMatches('" + package + ":id/.*tt_insert_express_dislike_icon_img.*').visibleToUser().exists() ");
        func.sleep(1000);
        closeDialog()
        func.sleep(2000);


        var ii = 5;
        while (ii-- > 0 && !textMatches('喝第.*水|等.*再喝').filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).visibleToUser().exists()) {
            func.swipeUp()
            func.sleep(2300);
        }

        o = packageName(package).textMatches('喝第.*水').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(60000, '喝水领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
            closeDialog();
            sleep(3000)
            back()
            sleep(3000)
            q = packageName(package).textMatches('金币翻倍|金币加速').visibleToUser().findOnce();
            if (q) {

                func.clickObject(q);
    func.sleep(2000);
    func.sleep(10000, '等待中', "!textMatches('正在加载').visibleToUser().exists() && !descMatches('正在加载').visibleToUser().exists()");
                func.sleep(2000);
                func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
                closeDialog();
                closeDialog();
            }
        }
        back()
    }


}

function autoRedraw() {
    closeDialog();
    refresh()
    func.sleep(2000);

    func.toast('准备开始提现', 1);
    var o = packageName(package).textMatches('我的').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(3000);
    }
    o = id('iv_get_signIn').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(2000);
        func.sleep(60000, '签到领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
        closeDialog();
        closeDialog();
        p = idMatches('.*:id/tv_btn_again').visibleToUser().findOnce();
        if (p) {
            func.clickObject(p);
            func.sleep(2000);
            func.sleep(60000, '签到领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
            closeDialog();
            q = packageName(package).textMatches('金币翻倍|金币加速').visibleToUser().findOnce();
            if (q) {
                func.clickObject(q);
                func.sleep(2000);
                func.sleep(60000, '看视频领金币中', "idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|已连续签到.*|OnewaySdkCache.*').visibleToUser().exists()");
                closeDialog();
                closeDialog();
            }

        }
    }
    sleep(1000)

    o = id('mine_money').visibleToUser().findOnce();
    if (o) {
        if (o.text() < 1) {
            toast("余额不足")
        } else {
            var o = packageName(package).textMatches('去提现').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o);
                func.sleep(10000, '等待中', "textMatches('立即提现').visibleToUser().exists() ");
                func.sleep(2000);
                var o = packageName(package).textMatches('1.0元').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                    var o = packageName(package).textMatches('立即提现').visibleToUser().findOnce()
                    if (o) {
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                }
            }
        }
    }


}

function closeDialog() {
    o = textMatches('广告').visibleToUser().findOnce();
    if (o) {
        back()
    }
    o = packageName(package).textMatches('退出应用').visibleToUser().findOnce()
    if (o) {
        o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
        }
    }


    //  只有一个 关闭按钮的广告
    o = packageName(package).className('android.widget.ImageButton').visibleToUser().findOnce()
    if (o) {
        var list = o.parent();
        if (list.childCount() == 2) {
            var child = list.child(1);
            func.clickObject(child);

        }
    }

    o = idMatches(package + ':id/.*tt_insert_express_dislike_icon_img.*').visibleToUser().findOnce();
    if (o) {

        func.clickObject(o);
        func.sleep(4000);
    }

    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        p = idMatches('.*:id/iv_get_signIn|.*:id/tv_btn_again|.*:id/tv_btn').visibleToUser().findOnce()
        if (!p) {
            if (o.id() != "com.lucky.magicbox:id/close_layout") {
                func.clickObject(o);
                func.sleep(3000);
            }
        }
    }

    if (packageName(package).textMatches(keys).visibleToUser().exists()) {
        func.back();
        func.sleep(4000);
    }
    o = packageName(package).textMatches('我知道了|继续赚钱').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(1000);
    }

    p = packageName(package).textMatches('').visibleToUser().findOnce()
    if (p) {
        func.clickObject(p);
    }

    // o = packageName(package).textMatches('OnewaySdkCache.*').visibleToUser().findOnce()
    // if (o) {
    //     o = packageName(package).textMatches('查看更多').visibleToUser().findOnce()
    //     if(o){
    //         func.clickObject(o);
    //         sleep(3000)
    //         back()
    //         var ii = 5;
    //         while(ii-- > 0){
    //             p = packageName(package).textMatches('取消').visibleToUser().findOnce()
    //             if(p){
    //                 func.clickObject(p);
    //                 sleep(2000)
    //             }else{
    //                 break
    //             }
    //         }
    //     }
    // }
}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();

        o = packageName(package).textMatches('退出应用').visibleToUser().findOnce()
        if (o) {
            o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
            }
        }




        o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            p = idMatches('.*:id/iv_get_signIn|.*:id/tv_btn_again|.*:id/tv_btn|.*:id/close_layout').visibleToUser().findOnce()
            if (!p) {
                // if (o.id() != "com.lucky.magicbox:id/close_layout") {
                    func.clickObject(o);
                    func.sleep(3000);
                // }
            }
        }

        o = packageName(package).textMatches('以后更新').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }

        if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()) {
            func.back();
        }

        if (packageName(package).textMatches(keys).visibleToUser().exists()) {
            func.back();
        }
    }, 3000);
}

function refresh() {
    var ii = 10;
    while (ii-- > 0 && !text('主页').visibleToUser().exists()) {
        closeDialog()
        if (ii < 6) {
            func.back();
            func.sleep(3200);
        }
        if (ii < 4) {
            if (currentPackage().toLowerCase() != package.toLowerCase()) {
                func.restart(appname, package)
            }
        }
    }
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