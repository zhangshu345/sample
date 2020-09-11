auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
const appname = '米读极速版';
const package = 'com.lechuan.mdwz';

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
keys = '点击重播|点击下载|点击打开'

// classModule.start = function(){
//     var me = this;
//     //先判断当前是不是运行的app，不是的话就要打开
//     var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
//     func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
//     func.toast(appname + '预计运行时间：' + minutes + '分',2)
//     var startDate = new Date(); //启动时间
//     var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

//     if (currentPackage() != package){
//         var o = func.execApp(appname,package,15000,"textMatches('福利|书城').visibleToUser().exists()")
//         if (!o){
//             toast("没有找到" + appname);
//             thread.interrupt();
//             return; //退出函数
//         }
//     }

//     func.openWaiting();
//     sign();
//     try{
//         var bol = true;
//         while(bol){
//             // if (!packageName(package).className('FrameLayout').exists()){
//             //     this.func.restart(appname,package);
//             // }
//             // else{
//             //     var o = packageName(package).text('书城').visibleToUser().findOnce();
//             //     if (o){
//             //         func.clickObject(o);
//             //         func.sleep(2000);
//             //     }
//             // }

//             if (!packageName(package).className('FrameLayout').exists()){
//                 this.func.restart(appname,package);
//             }

//             var o = packageName(package).text('福利').visibleToUser().findOnce();
//             if (o){
//                 log("点击福利按钮")
//                 func.clickObject(o);
//                 func.sleep(2000);
   
//             }
//             o = textMatches('[0-9.]+分|赚[0-9.]+元').visibleToUser().filter(function(w){return w.bounds().left > device.width * 0.8;}).findOnce();
//             if (o){
//                 click(device.width / 2, o.bounds().centerY());
//                 this.func.sleep(3e3);
//             }
//             else if (textMatches('分类|精选').visibleToUser().exists()){    //没有书名，但是有分类
//                 this.func.swipeUp();
//                 this.func.sleep(2000);
//                 o = textMatches('[0-9.]+分|赚[0-9.]+元').visibleToUser().filter(function(w){return w.bounds().left > device.width * 0.8;}).findOnce();
//                 if (o){
//                     click(device.width / 2, o.bounds().centerY());
//                     this.func.sleep(3e3);
//                 }
//             }
//             // o = textContains('滑动查看下一章').visibleToUser().findOnce();
//             // if (o){
//             //     func.clickObject(o);
//             //     this.func.sleep(2000);
//             // }
//             o = textMatches('免费阅读|阅读赚金币|阅读赚[0-9]+元').visibleToUser().findOnce();
//             if (o){
//                 this.func.clickObject(o);
//                 this.func.sleep(3e3);
//             }
//             //if (classModule.noAd != 1){
//                 o = textContains('翻倍领取红包').visibleToUser().findOnce();
//                 if(o){
//                     this.func.clickObject(o.parent().child(o.indexInParent() - 1))
//                     this.func.sleep(3e3);
//                     func.sleep(60000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    
//                     closeDialog();
//                 }
//             //}

//             if (text('目录').visibleToUser().exists()){
//                 click(device.width / 2,device.height / 2)
//             }

//             var s = random(me.minTextSec * 1000,me.maxTextSec * 1000)
//             func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
//             func.sleep(s);   //随机阅读3到6秒 
            
//             var datediff = new Date().getTime() - startDate.getTime();
//             if (datediff > minutes * 60 * 1000){
//                 bol = false;
//                 func.toast(appname + '运行完成',2)

//                 this.func.back();
//                 o = text('退出阅读').visibleToUser().findOne(2000)
//                 if (o){
//                     this.func.clickObject(o);
//                     this.func.sleep(3e3);
//                     this.func.back();
//                     this.func.sleep(1e3);
//                 }
//             }
//             else{
//                 swipe(device.width-1,device.height * 0.5,device.width * 0.5,device.height * 0.5,200);
//                 this.func.sleep(500);
//             }
//         }
//         if (this.autoR == 0) autoRedraw();
//     }
//     catch(e){
//         log(e.message + '\n\r' + e.stack)
//         func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
//     }
//     finally{
//         thread.interrupt(); //结束弹出窗口的线程检测
//     }
//     func.log(appname,'结束运行' ,"**********************************************************");
//     func.quit(package);
// }




classModule.start = function(){
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package){
        var o = func.execApp(appname,package,15000,"textMatches('福利|书城').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt();
            return; //退出函数
        }
    }

    func.openWaiting();

    try{
        refresh()
        sign2();
        refresh()
        var bol = true;
        while(bol){
            if (!packageName(package).className('FrameLayout').exists()){
                this.func.restart(appname,package);
            }

            var o = id('tt_titlebar_close*').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
            }

            var o = packageName(package).text('福利').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                var ii = 5;
                while(ii-- > 0 && !textMatches('立即阅读').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).exists()){
                    this.func.swipeUp();
                    func.sleep(2300);
                }
                var o = packageName(package).text('立即阅读').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    sleep(3000)
                }
            }


            o = textContains('翻倍领取红包').visibleToUser().findOnce();
            if(o){
                this.func.clickObject(o.parent().child(o.indexInParent() - 1))
                this.func.sleep(3e3);
                func.sleep(60000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                
                closeDialog();
            }


            if (text('目录').visibleToUser().exists()){
                click(device.width / 2,device.height / 2)
            }

            var s = random(me.minTextSec * 1000,me.maxTextSec * 1000)
            func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
            func.sleep(s);   //随机阅读3到6秒 
            
            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)

                this.func.back();
                o = text('退出阅读').visibleToUser().findOne(2000)
                if (o){
                    this.func.clickObject(o);
                    this.func.sleep(3e3);
                    this.func.back();
                    this.func.sleep(1e3);
                }
            }
            else{
                swipe(device.width-1,device.height * 0.5,device.width * 0.5,device.height * 0.5,200);
                this.func.sleep(500);
            }
        }
        if (this.autoR == 0) autoRedraw();
    }
    catch(e){
        log(e.message + '\n\r' + e.stack)
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束运行' ,"**********************************************************");
    func.quit(package);
}

function sign2(){

    var o = packageName(package).text('福利').visibleToUser().findOne(5000);
    if (o){
        func.clickObject(o);
        func.sleep(2000);
        closeDialog()
        o = packageName(package).text('立即签到').visibleToUser().findOne(5000) || packageName(package).desc('立即签到').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            o = packageName(package).textMatches('看视频再领取.*').visibleToUser().findOnce() || packageName(package).descMatches('看视频再领取.*').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(3000);
                func.sleep(60000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog();
            }
        }
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

function sign(){
    var o = packageName(package).text('福利').visibleToUser().findOne(5000);
    if (o){
        func.clickObject(o);
        func.sleep(2000);
        closeDialog()
        o = packageName(package).text('立即签到').visibleToUser().findOne(5000) || packageName(package).desc('立即签到').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            if (classModule.noAd != 1){
                o = packageName(package).textMatches('看视频再领取.*').visibleToUser().findOnce() || packageName(package).descMatches('看视频再领取.*').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(3000);
                    // func.sleep(60000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists()");
                    func.sleep(60000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    
                    closeDialog();
                }
            }
            else{
                o = packageName(package).text('白给钱也不要').visibleToUser().findOnce() || packageName(package).desc('白给钱也不要').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(3000);
                }
            }
        }

        func.sleep(2e3);
        if (classModule.noAd != 1){
            var ii = 3;
            while(ii-- > 0){
                o = text('看视频领金币').visibleToUser().findOnce() || desc('看视频领金币').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(4000);
                    // func.sleep(90000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists()");
                    func.sleep(60000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    
                    closeDialog();
                }
                else
                    break;
            }

            o = textMatches(' *去抽奖 *').visibleToUser().findOnce() || descMatches(' *去抽奖 *').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(4e3);
                if (text('幸运大转盘').visibleToUser().exists() || desc('幸运大转盘').visibleToUser().exists()){
                    var ii = 8
                    while(ii-- > 0){
                        if (textMatches('好的|明日再来|今日还剩 0次机会').visibleToUser().exists() || descMatches('好的|明日再来|今日还剩 0次机会').visibleToUser().exists())
                            break;

                        if (textMatches('恭喜您中了.*').visibleToUser().exists() || descMatches('恭喜您中了.*').visibleToUser().exists())
                            o = text('看视频抽大奖').visibleToUser().findOnce(1) || text('看视频抽大奖').visibleToUser().findOnce(1);
                        else
                            o = text('看视频抽大奖').visibleToUser().findOne(10000) || text('看视频抽大奖').visibleToUser().findOnce();

                        if (o){
                            func.clickObject(o);
                            func.sleep(4e3)
                            // func.sleep(90000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('幸运大转盘').visibleToUser().exists()");
                            func.sleep(90000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播|点击下载|点击打开|幸运大转盘').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                    
                            closeDialog();
                            func.toast('5秒后继教抽奖',1);
                            func.sleep(5e3)
                        }
                    }
                    func.back();
                    func.sleep(2000);
                }
            }
        }
        
        var o = packageName(package).text('书城').visibleToUser().findOne(5000);
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }
    }
}

function autoRedraw(){
    var ii = 5;
    while(ii-- > 0 && !textMatches('福利').visibleToUser().exists()){
        func.back();
        closeDialog()
        func.sleep(2300);
    }

    var ii = 5;
    while(ii-- > 0){
        var o = packageName(package).text('福利').visibleToUser().findOne(5000);
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            closeDialog()
        }
        o = packageName(package).text('点击提现').visibleToUser().findOne(5000) || packageName(package).desc('点击提现').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(5000);
        }

        // o = packageName(package).text('立即提现').visibleToUser().findOne(5000) || packageName(package).desc('立即提现').visibleToUser().findOnce();
        o = packageName(package).textMatches('金币：.*').visibleToUser().findOnce()
        if (o){
            break
        }
        if(ii<3){
            back()
        }

    }

    // 新人专项
    o = packageName(package).textMatches('新人专享.*').visibleToUser().findOnce() || packageName(package).descMatches('新人专享.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);
        o = packageName(package).text('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            o = packageName(package).text('确认提现').visibleToUser().findOnce() || packageName(package).desc('确认提现').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                back()
                sleep(5000)
            }
        }
    }


    money_str = packageName(package).textMatches('金币：.*').visibleToUser().findOnce()
    money_ll = money_str.text()
    var money_num = money_ll.match(/\d+/g)
    
    if(money_num[0]>100000){
        //1元提现
        o = packageName(package).text('金币提现').visibleToUser().findOne(5000) || packageName(package).desc('金币提现').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }
        o = packageName(package).text('10元').visibleToUser().findOne(5000) || packageName(package).desc('10元').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            o = packageName(package).text('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                o = packageName(package).text('确认提现').visibleToUser().findOnce() || packageName(package).desc('确认提现').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                    back()
                }
            }
        }
    }else{
        toast("金币不足无法提现")
        
    }

    if(money_num[0]>10000){
        //1元提现
        o = packageName(package).text('金币提现').visibleToUser().findOne(5000) || packageName(package).desc('金币提现').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }
        o = packageName(package).textMatches('剩1次').visibleToUser().findOnce() || packageName(package).descMatches('剩1次').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            o = packageName(package).text('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                o = packageName(package).text('确认提现').visibleToUser().findOnce() || packageName(package).desc('确认提现').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                    back()
                }
            }
        }
    }else{
        toast("金币不足无法提现")
    }

}

function closeDialog(){
    if (textMatches(' *点击重播 *').visibleToUser().exists() || className('ImageView').visibleToUser().filter(function(w){return (w.id() || '') == '' && w.bounds().centerY() < device.height * 0.15;}).find().length == 1){
        log(777)
        func.back();
        func.sleep(3e3);
    }

    var o = idMatches('.*:id/.*close.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(3e3);
    }
    // 关闭新人当日提现 100元活动
    // var finds = packageName(package).className('ImageView').visibleToUser().find();
    // if(finds.length==2){
    //     func.clickObject(finds[1]);
    // }
    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        log(88)
        func.back();
        func.sleep(3000);
    }


}

function hasDialog(){
    setInterval(hasDialog2,3000);
}

function hasDialog2(){
    func.hasDialog();
    o = packageName(package).textMatches('我知道了|放弃奖励').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(1000);
    }


    if (textMatches(' *点击重播 *').visibleToUser().exists()){ 
        func.back();
        func.sleep(3e3);
    }
    var o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
    if (o){
        log(1)
        func.clickObject(o)
        func.sleep(100);
    }

    o = text('关闭').visibleToUser().findOnce();
    if (o){
        log(2)
        func.clickObject(o)
    }

    if (textMatches('分享领取| * 点击重播 *|去查看').visibleToUser().exists()){
        log(44)
        func.back();
    }


    if (textMatches('立即升级|去查看').visibleToUser().exists()){
        log(3)
        o = className('ImageView').visibleToUser().findOnce();
        if (o) func.clickObject(o);
    }
    // if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
    //     log(55)
    //     func.back();
    //     func.sleep(3000);
    // }
    o = packageName(package).textMatches('立即升级').visibleToUser().findOnce()
    if (o){
        func.sleep(1000);
        p = packageName(package).className('android.widget.ImageView').visibleToUser().findOnce();
        if(p){
            func.clickObject(p)
        }
    }

    // 关闭新人当日提现 100元活动
    // var finds = packageName(package).className('ImageView').visibleToUser().find();
    // if(finds.length==2){
    //     log(4)
    //     func.clickObject(finds[1]);
    // }

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


