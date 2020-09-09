/**
 * 适应6.3.0
 * 2019.11.30适应6.4.0
 */
const appname = '火山极速版';
const package = 'com.ss.android.ugc.livelite';

var classModule = {};
classModule.func = null;
classModule.minMinutes = 25;
classModule.maxMinutes = 35;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
// var func = require("./V4_开发版/function.js");
// classModule.func = func;
classModule.start = function(){
    s_tt = new Date()
log(appname,'---开始---'  + s_tt.getHours() + ':' + s_tt.getMinutes() + ':' + s_tt.getSeconds());
    var me = this
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分钟',2)
    var startDate = new Date(); //启动时间    
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    //先判断当前是不是运行的app，不是的话就要打开
    if (currentPackage() != package){
        var o = func.execApp(appname,package,15000,"textMatches('视频|红包').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }

    func.openWaiting(); 

    // sign();

    var x = device.width / 2;
    var y = device.height / 2;
    try{
        var idx = 1;
        var bol = true;
        while(bol){ 
            func.checkSpace();  //检测一次存储空间
            
            if (text('提现').visibleToUser().exists() || desc('提现').visibleToUser().exists()){
                func.back();
                func.sleep(2000);
            }

            if(!packageName(package).text('关注').visibleToUser().exists()){
                o = packageName(package).text('首页').visibleToUser().findOnce();
                if (o){ //进入首页
                    this.func.clickObject(o);
                    this.func.sleep(2000);
                }
            
                if(!packageName(package).text('关注').visibleToUser().exists()){ //进入首页还没有关注，进视频
                    o = packageName(package).textMatches('推荐|视频').visibleToUser().findOnce();
                    if (o){
                        this.func.clickObject(o);
                        this.func.sleep(3000);
                    }
                }
            
                if(!packageName(package).text('关注').visibleToUser().exists()){    //两边都没有关注
                    if(packageName(package).text('红包').visibleToUser().exists()){
                        click(x / 2, y / 2);
                        func.sleep(3000);
                    }
                    else{
                        if (currentPackage().toLowerCase() != package.toLowerCase()){
                            func.restart(appname,package);
                        }
                        else{
                            func.back();
                            func.sleep(2000);
                        }
                    }
                }
            }
            else{
                o = packageName(package).textMatches('看.*视频.*金币 *').visibleToUser().findOnce()
                if (o){
                    func.clickObject(o);
                    func.sleep(1000);
                    func.sleep(60000,"金币领取中","packageName('" +package + "').textMatches('关闭广告|红包|继续退出|邀请好友').visibleToUser().exists()");
                    o = packageName(package).textMatches('关闭广告|继续退出').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000);

                        o = packageName(package).textMatches('继续退出|继续退出').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o);
                            func.sleep(2000);
                        }
                    }
                }
            }

            if (currentActivity().indexOf('LandingPageAdDetailActivity') > 0 || currentActivity().indexOf('LiveBrowserActivity') > 0)
                func.swipe(random(x - 100,x - 50),random(y + 100,y + 200), random(x - 100,x - 50), random(0,20),50);

            var sec = random(me.minVideoSec,me.maxVideoSec);
            func.toast('视频随机播放时间' + sec + '秒',2)
            func.videoSleep(sec);

            idx++;
            func.swipe(random(x - 100,x - 50),random(y + 100,y + 200), random(x - 100,x - 50), random(0,20),50)
            func.sleep(500);

            if (packageName(package).text('查看详情').exists()) //上拉后是广告，继续上拉
                func.swipe(random(x - 100,x - 50),random(y + 100,y + 200), random(x - 100,x - 50), random(0,20),50);
            else if (packageName(package).text('宝箱').visibleToUser().exists()){
                o = packageName(package).text('宝箱').visibleToUser().findOnce();
                this.func.clickObject(o);
                this.func.sleep(2000);
                openBox();
            }

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
            }
            else{
                if (idx % 15 == 0 && func.release <= 7 && func.is2GMemory)
                    func.restart(appname,package);
                else if (idx % 5 == 0)
                    func.toast(appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟',2)
            }
        }
        if (this.autoR == 0) autoRedraw();
        // sign();
    }
    catch(e){
           func.log(appname,'循环执行',e.message + '\n\r' + e.stack)
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }

    func.log(appname,'结束时间' ,"**********************************************************");
    func.quit(package)
}

function autoRedraw() {

    var ii = 5;
    while (ii-- > 0) {
        if (text('红包').visibleToUser().exists())
            break;
        else {
            func.back();
            func.sleep(2000);
        }
    }
    // 只签到
    var o = text('红包').visibleToUser().findOnce()
    if (o) {
        func.clickObject(o);
    }
    hasDialog()
    sleep(5000)
    var o = text('现金余额（元）').visibleToUser().findOnce()

    if (o) {
        func.clickObject(o);
        sleep(5000)
        var o = text('去提现').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            sleep(5000)
            var o = text('微信提现').visibleToUser().findOnce()
            if (o) {
                button_x = o.bounds().centerX()
                button_y = o.bounds().centerY()
                p = textMatches("0..*").boundsInside(0, button_y, device.width, device.height).findOnce()
                if (p) {
                    func.clickObject(p);
                }else{
                    p = textMatches("提现").boundsInside(0, button_y, device.width, device.height).findOnce()
                    if (p) {
                        func.clickObject(p);
                    }
                }
                

            }
        }
    }else{
        log("点击现金失败")
    }

}

function openBox(){
    if (className('android.app.Dialog').visibleToUser().exists()){
        o = className('android.view.View').visibleToUser().filter(function(w){return w.bounds().centerX() > device.width * 0.8 && w.bounds().centerY() < device.height / 2}).find();
        if (o.length > 0){
            func.clickObject(o[o.length - 1]);
            func.sleep(2000);
        }
    }
    o = packageName(package).text('javascript:;').visibleToUser().findOnce() || packageName(package).desc('javascript:;').visibleToUser().findOnce();   //|javascript:;
    if (o){
        func.clickObject(o);
        func.sleep(1500);
    }
    if (app.versionCode == 2)
        o = className('ImageView').depth(1).clickable(true).find();
    else
        o = className('ImageView').depth(5).clickable(true).find();
    if (o.length == 2){
        func.clickObject(o[1]);
        func.sleep(1500);
    }

    var o = packageName(package).text('开宝箱得金币').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(2000);

        o = packageName(package).text('javascript:;').visibleToUser().findOnce() || packageName(package).desc('javascript:;').visibleToUser().findOnce();   //|javascript:;
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }
        o = packageName(package).textMatches('.*双倍金币.*').visibleToUser().findOnce()
        if (!o) o = packageName(package).textMatches('.*海量金币.*').visibleToUser().filter(function(w){return w.bounds().height() > 10}).findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(3000);
            if (packageName(package).textMatches('.*双倍金币.*').visibleToUser().exists()){ //点击后还有
                for(var i = device.height * 0.8; i >= device.height / 2; i-=100)
                    click(device.width / 2,i);
            }

            func.sleep(60000,"双倍金币中","packageName('" +package + "').textMatches('关闭广告|红包|邀请好友').visibleToUser().exists()");
            closeDialog();
        }
        
        if (!packageName(package).textMatches('红包|邀请好友').visibleToUser().exists()){
            func.sleep(60000,"金币领取中","packageName('" +package + "').textMatches('关闭广告|红包|邀请好友').visibleToUser().exists()");
            closeDialog();
        }
    }
}
function closeDialog(){
    var o = packageName(package).textMatches('关闭广告').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);
    }
    o = packageName(package).textMatches('继续退出').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);
    }
    o = packageName(package).text('javascript:;').visibleToUser().findOnce();   //|javascript:;
    if (o){
        func.clickObject(o);
        func.sleep(1500);
    }
}
function sign(){
    var ii = 5;
    while(ii-- > 0){
        if (text('红包').visibleToUser().exists())
            break;
        else{
            func.back();
            func.sleep(2000);
        }
    }
    // 只签到
    var o = text('红包').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
    }

    // 只签到

//     var o = text('红包').visibleToUser().findOnce()
//     if (o){
//         func.clickObject(o);
//         o = text('现金余额').visibleToUser().findOne(8000);

//         openBox();
//         func.sleep(2000);
//         func.swipeUp();
//         func.sleep(1000);
//         var ii = 3;
//         while(ii-- > 0){
//             o = packageName(package).text('javascript:;').visibleToUser().findOnce();   //|javascript:;
//             if (o){
//                 func.clickObject(o);
//                 func.sleep(1500);
//             }

//             o = packageName(package).text('每日抽奖').visibleToUser().filter(function(w){return w.bounds().height() > 10}).findOnce()
//             if (o){
//                 func.clickObject(o)
//                 func.sleep(2000);
        
//                 o = text('点击金蛋砸开').visibleToUser().findOnce();
//                 if (o){
//                     click(device.width / 2,o.bounds().centerY() - 100);
//                     func.sleep(4000);
//                 }
        
//                 o = packageName(package).text('放弃').visibleToUser().findOnce()
//                 if (o){
//                     func.clickObject(o);
//                     func.sleep(2000);
//                 }
//                 else {
//                     o = packageName(package).text('确定领取').visibleToUser().findOnce()
//                     if (o){
//                         func.clickObject(o);
//                         func.sleep(2000);
//                     }
//                 }
//             }
//             else{
//                 break;
//             }
//         }

//         // o = packageName(package).text('javascript:;').visibleToUser().filter(function(w){return w.bounds().height() > 10;}).findOnce();
//         // if (!o){
//         //     func.swipeUp();
//         //     func.sleep(1000);
//         // }
//         o = packageName(package).textMatches('.*双倍金币.*').visibleToUser().findOnce();
//         if (o){
//             func.clickObject(o);
//             func.sleep(3000);
//             if (packageName(package).textMatches('.*双倍金币.*').visibleToUser().exists()){ //点击后还有
//                 for(var i = device.height * 0.8; i >= device.height / 2; i-=100)
//                     click(device.width / 2,i);
//             }
//             func.sleep(60000,"看视频赚海量金币中","packageName('" +package + "').textMatches('关闭广告|红包|继续退出').visibleToUser().exists()");
//             closeDialog();
//         }


//         if (!packageName(package).textMatches('.*海量金币.*').visibleToUser().filter(function(w){return w.bounds().height() > 10}).exists()){
//             func.swipeUp()
//             func.sleep(1500);
//         }
//         var ii = 25;
//         while(ii-- > 0){
//             o = packageName(package).textMatches('javascript:;|确定领取').visibleToUser().filter(function(w){return w.bounds().height() > 10;}).findOnce();   //|javascript:;
//             if (o){
//                 func.clickObject(o);
//                 func.sleep(1500);
//             }
            
//             o = packageName(package).textMatches('看视频.*金币.*').visibleToUser().filter(function(w){return w.bounds().height() > 10}).findOnce()
//             if (o){
//                 func.clickObject(o);
//                 func.sleep(3000);
//                 func.sleep(60000,"看视频赚海量金币中","packageName('" +package + "').textMatches('关闭广告|红包|继续退出').visibleToUser().exists()");
//                 o = packageName(package).textMatches('关闭广告|继续退出').visibleToUser().findOnce();
//                 if (o){
//                     func.clickObject(o);
//                     func.sleep(2000);

//                     o = packageName(package).textMatches('继续退出').visibleToUser().findOnce();
//                     if (o){
//                         func.clickObject(o);
//                         func.sleep(2000);
//                     }
//                 }
//             }
//             else{
//                 func.sleep(200);
//             }
//         }


//         openBox();
//         func.sleep(1000);

//         //在这里签到
//         o = packageName(package).textMatches('推荐|视频').visibleToUser().findOnce();
//         if (o){
//             func.clickObject(o);
//             sleep(2000);
//         }
        
//         o = text('点击激活').findOnce();
//         if (o){
//             func.clickObject(o)
//             func.sleep(1000);
        
//             o = text('去红包页面').findOnce();
//             if (o){
//                 func.clickObject(o)
//                 func.sleep(4000);
        
//                 back();
//             }
//         }
//     }
}


function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        
        var o = textMatches('以后再说|确定领取|我知道了|以后再说|关闭广告|继续退出|javascript:;').findOnce() || descMatches('以后再说|确定领取|我知道了|以后再说|关闭广告|继续退出|javascript:;').findOnce(); 
        if (o){
            if (!textMatches('.*双倍金币.*').visibleToUser().exists() && !descMatches('.*双倍金币.*').visibleToUser().exists())
                func.clickObject(o);
        }
 
        var hb = text("红包可立即提现").findOnce();
        if (hb)
            func.back();

        o = text('查看详情').visibleToUser().findOnce();
        if(o && textStartsWith('清明假期').visibleToUser().exists()){
            func.clickObject(o.parent().child(o.indexInParent() - 1))
        }            

        if (text('点击激活').exists()){
            var o = className('TextView').find().filter(function(w){return w.text() == '点击激活';})
            if (o.length > 0){
                o = o[0];
                func.clickObject(o);
                func.sleep(1500);
        
                o = text('去红包页面').findOnce();
                if (o){
                    func.clickObject(o)
                    func.sleep(2000);
                }
            }
        }
        
        if (className('android.app.Dialog').visibleToUser().exists()){
            o = className('android.view.View').visibleToUser().filter(function(w){return w.bounds().centerX() > device.width * 0.8 && w.bounds().centerY() < device.height / 2}).find();
            if (o.length > 0){
                func.clickObject(o[o.length - 1]);
                func.sleep(2000);
            }
        }      
        o = packageName(package).textMatches('我知道了|放弃奖励').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(1000);
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
// classModule.start()