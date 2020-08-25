const appname = '蚂蚁看点';
const package = 'com.ldzs.zhangxin';

var classModule = {};
classModule.minMinutes = 35;
classModule.maxMinutes = 45;
classModule.minSwipe = 7;
classModule.maxSwipe = 9;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
classModule.func = null;

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

    sign()
    ii = 3
    while (ii-- > 0 && !id('tv_user_tab').visibleToUser().findOnce()) {
        func.back();
        func.sleep(3200);
    }
    try {



        index_refresh()
        var bol = true;
        var idx = 1;
        while (bol) {
            func.sleep(10000, '等待中', "textMatches('精选|刷新').visibleToUser().exists() || descMatches('精选|刷新').visibleToUser().exists()");
            if (!text('精选').visibleToUser().exists()){ //不在首页了
                var o = packageName(package).text('看点').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o)
                    func.sleep(3000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase()) 
                        func.restart(appname,package);
                    else{
                        index_refresh()
                    }
                }
            }  

            o = textMatches('领金币').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
            if (o) {
                func.clickObject(o);
                sleep(3000)
                o = packageName(package).textMatches('看视频.*金币').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(60000, "看视频再领金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");          
                    closeDialog();
                    sleep(3000)
                    closeDialog();
                }
            }
            

            var finds = id(package + ":id/tv_account_name").visibleToUser().find()
            for(var kk = 0; kk < finds.length; kk++){
                let child = finds[kk];
                txt = child.text()
                if(txt == "系统通知"){
                    continue
                }
                sleep(1000)
                var w = text(txt).boundsInside(child.bounds().left, child.bounds().top ,child.bounds().right ,child.bounds().bottom ).findOnce();
                if(!w){
                    break
                }
                sleep(500)
                func.clickObject(child);
                var max = random(me.minSwipe,me.maxSwipe);
                // log(max)
                for (var i = 0; i < max; i++){
                    func.toast('开始阅读第' + idx + '遍文章：' + txt);
                    idx += 1
                    o = packageName(package).textMatches('我知道了').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        sleep(500)
                        break
                    }
        
                    var s = random(me.minTextSec * 1000,me.maxTextSec * 1000)
                    func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
                    func.sleep(s);   //随机阅读3到6秒 
                    o = packageName(package).textMatches('点击查看全文.*').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce();
                    if (o){
                        func.clickObject(o);
                        sleep(2000)
                    }


                    // func.swipeUp();
                    var x = device.width / 2;
                    var y = device.height / 1.5;
                    swipe(random(x - 100, x - 50), random(y + 300, y + 400), random(x - 100, x - 50), random(y - 300, y - 400), 300);
                    o = packageName(package).textMatches('这篇文章你已经看了很久了，建议换一篇试试').visibleToUser().findOnce();
                    if (o){
                        break
                    }

                    o = packageName(package).textMatches('评论').visibleToUser().findOnce();
                    if (o){
                        back()
                        sleep(2000)
                    }
                    var o = packageName(package).text('相关推荐').visibleToUser().exists();
                    if (o){
                        max = 0;    //复位循环次数，不再继续上拉
                    }

                    var o = id(package + ':id/news_income_container').findOnce();
                    if (o){
                        xx = id(package + ':id/coin_front_text_image').findOnce();
                        yy = id(package + ':id/coin_bg_front_image').findOnce();
                        zz = id(package + ':id/custom_progress5').findOnce();
                        if(!xx && !yy && !zz){
                        func.clickObject(o);
                        func.sleep(2000);
                        o = packageName(package).textMatches('看视频.*金币').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o);
                            func.sleep(60000, "看视频再领金币中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");          
                            closeDialog();
                            sleep(5000)
                            closeDialog();
                            }
                        }
                    }

                }
        

                
                func.toast('本篇已经阅读完成！',2)
        
                if (idx % 5 == 0)
                    func.toast(appname + '已运行' + parseInt((new Date().getTime() - startDate.getTime()) / 1000 / 60) + '分钟',2)
                if (idx % 11 == 0) //每看十条刷新一次首页
                    needrefresh = true;
        
        
                func.back();    
                sleep(3000)
                // break
            }
            func.swipeUp();
            sleep(1000)
            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000 / 2) {
                bol = false;
                func.toast(appname + '运行完成', 2)
            }
        }


        o = packageName(package).id('tv_user_tab').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            sleep(3000)
        }

        var idx = 1;
        var bol = true;
        while (bol) {
            
            o = id('tv_find_tab').visibleToUser().findOnce()
            if (o) {
                if (!o.selected()) {
                    func.clickObject(o);
                    func.sleep(1000);
                }
            }else{
                func.restart(appname,package);
                index_refresh()
                o = id('tv_find_tab').visibleToUser().findOnce()
                if (!o.selected()) {
                    func.clickObject(o);
                    func.sleep(1000);
                }
            }



            // o = packageName(package).textMatches('小视频').visibleToUser().findOnce()
            o = textMatches('小视频').visibleToUser().findOnce() || descMatches('小视频').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o);
                func.sleep(1000);
            }
            // func.checkSpace();  //检测一次存储空间
            var sec = random(me.minVideoSec, me.maxVideoSec);
            func.sleep(sec * 1000, "视频播放中", "idMatches('.*gold_layout.*').visibleToUser().exists()");

            o = idMatches('.*gold_layout.*').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                func.sleep(3000);
                o = textMatches('看视频再.*').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(70000, '金币翻倍观看中', "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    func.sleep(2000);
                    closeDialog()
                    func.sleep(4000);
                    closeDialog()
                }
            }

            o = id('tv_find_tab').visibleToUser().findOnce()
            if (o) {
                if (!o.selected()) {
                    func.clickObject(o);
                    func.sleep(1000);
                }
            }

            func.swipeUp(0, 0, random(301, 330));

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
    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o);
        func.sleep(4000);
    }

    if (packageName(package).textMatches(keys).visibleToUser().exists()) {
        func.back();
        func.sleep(4000);
    }
    o = packageName(package).textMatches('我知道了').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
        func.sleep(1000);
    }

}

function autoRedraw() {
    ii = 3
    while (ii-- > 0 && !id('tv_user_tab').visibleToUser().findOnce()) {
        log("返回")
        func.back();
        func.sleep(3200);
    }

    o = packageName(package).id('tv_user_tab').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o)
        sleep(3000)
        o = packageName(package).textMatches('提现兑换').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            sleep(3000)

            o = packageName(package).textMatches('约.*元').visibleToUser().findOne(6000)
            if (o) {
                money = o.text().replace('约', '').replace('元', '')
                log(money)
                if (money > 1) {
                    o = text('1元').visibleToUser().findOnce() || desc('1元').visibleToUser().findOnce()
                    if (o) {
                        func.clickObject(o);
                        sleep(2000)
                    }
                    o = text('立即提现').visibleToUser().findOnce() || desc('立即提现').visibleToUser().findOnce()
                    if (o) {
                        func.clickObject(o);
                        sleep(2000)

                    }
                }else{
                    toast("余额不足")
                }
                if (0.5 < money) {
                    o = text('新手福利').visibleToUser().findOnce() || desc('新手福利').visibleToUser().findOnce()
                    if (o) {
                        func.clickObject(o);
                        sleep(2000)
                        o = text('立即提现').visibleToUser().findOnce() || desc('立即提现').visibleToUser().findOnce()
                        if (o) {
                            func.clickObject(o);
                            sleep(2000)
                            o = text('确定').visibleToUser().findOnce() || desc('确定').visibleToUser().findOnce()
                        }
                    }

                }


            }



        }
    }
}
 
function index_refresh(){
    var ii = 6;
    while(ii-- > 0 && !text('精选').visibleToUser().exists()){
        closeDialog()
        o = packageName(package).textMatches('看点').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }
        if(ii<4){
            func.sleep(3200);
            func.back();
        }
    }
}

function sign() {
    ii = 3
    while (ii-- > 0 && !id('tv_user_tab').visibleToUser().findOnce()) {
        func.back();
        func.sleep(3200);
    }

    o = packageName(package).id('tv_user_tab').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o)
        sleep(3000)
        o = textMatches('签到+.*金币').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
            sleep(3000)
            o = textMatches('立即签到').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                sleep(3000)
            }
            o = textMatches('免费领取').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o);
                sleep(3000)
            }
        }
    }
}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o);
        }

        o = packageName(package).textMatches('继续播放|放弃金币|以后更新|关闭|稍后领取|放弃奖励').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }

        if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()) {
            func.back();
        }

        // if (packageName(package).textMatches('点击重播|点击下载|点击打开').visibleToUser().exists()) {
        //     func.back();
        // }

        if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()) {
            func.back();
        }


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



/////  保留代码。。 搜索 
/*
ii = 3
while (ii-- > 0 && !id('tv_user_tab').visibleToUser().findOnce()) {
    func.back();
    func.sleep(3200);
}

o = packageName(package).id('tv_task_tab').visibleToUser().findOnce();
if (o) {
    func.clickObject(o)
    func.sleep(10000, '等待中', "textMatches('已连续签到.*').visibleToUser().exists()");
    sleep(3000)
    o = packageName(package).textMatches('搜索赚').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o)
        func.sleep(10000, '等待中', "textMatches('最热搜索').visibleToUser().exists()");

        o = textMatches('最热搜索').visibleToUser().findOnce();
        if (o) {
            var list = o.parent();
            if (list) {
                if (list.child(list.childCount() - 1)) {
                    txt = list.child(list.childCount() - 1).text()
                    if (o != "已完成") {
                        o = textMatches('最热搜索').visibleToUser().findOnce();
                        if (o) {
                            func.clickObject(o)
                            // func.sleep(10000, '等待中', "textMatches('今日热词').visibleToUser().exists()");
                            // func.sleep(10000, '等待中', "id('ic_aggregate_back').visibleToUser().exists()");
                            func.sleep(10000, '等待中', "textMatches('/\d+/').visibleToUser().exists()");
                            var ii = 30;
                            while (ii-- > 0) {
                                // o = textMatches('最热搜索').visibleToUser().findOnce();

                                o = id('ic_aggregate_back').visibleToUser().findOnce();
                                if(!o){
                                    log("异常")
                                    break
                                }
                                finds = textMatches(/\d+/).visibleToUser().find();
                                child0 = finds[0]
                                txt0 = child0.text();
                            
                                child1 = finds[1]
                                txt1 = child1.text();
                                log("000---",txt0,"111---",txt1)
                                if(txt0 == 10 || txt0 == txt1){
                                    break
                                }
                                word = className('android.view.View').visibleToUser().filter(function (w) { return w.bounds().top > device.height * 0.8; }).findOnce();
                                if(word){
                                    func.clickObject(word)
                                }
                                sleep(3000)
                                var x = device.width
                                var y = device.height
                                swipe(device.width*0.5, device.height*0.6,device.width*0.5, device.height*0.4, 500)
                                sleep(1000)
                                back()
                                sleep(1000)
                            
                            }
                        }
                    } else {
                        log("txt-----",txt)
                        toast("搜索已完成")
                    }
                }
            }
        
        }
        
    }

}else{
    log(888)
}


ii = 3
while (ii-- > 0 && !id('tv_user_tab').visibleToUser().findOnce()) {
    func.back();
    func.sleep(3200);
}

*/










