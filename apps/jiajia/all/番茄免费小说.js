auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
const appname = '番茄免费小说';
const package = 'com.dragon.read';

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
    sign();
    try{
        var bol = true;
        
        while(bol){
            var o = textMatches('[0-9]{1}').visibleToUser().findOnce()
            if (o){
                func.clickObject(o)
                this.func.sleep(3e3);
            }

            o = textMatches('免费阅读').visibleToUser().findOnce();
            if (o){
                this.func.clickObject(o);
                this.func.sleep(3e3);
            }
            if (text('目录').visibleToUser().exists()){
                click(device.width / 2,device.height / 2)
            }

            if (!className('android.support.v4.widget.DrawerLayout').visibleToUser().exists()){
                var o = packageName(package).text('书城').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                }
                else {
                    if (currentPackage() != package) {
                        this.func.restart(appname, package);
                    }
                    else {
                        func.back();
                        this.func.sleep(2000);
                    }
                }
            }

            var s = random(me.minTextSec * 1000,me.maxTextSec * 1000)
            func.toast('阅读' + Math.floor(s / 1000) + '秒',2);
            func.sleep(s);   //随机阅读3到6秒 
            
            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)

                this.func.back();
                o = text('暂不加入').visibleToUser().findOnce()
                if (o){
                    this.func.clickObject(o);
                    this.func.sleep(3e3);
                    this.func.back();
                    this.func.sleep(1e3);
                }
            }
            else{
                swipe(device.width-1,device.height * 0.5,device.width * 0.5,device.height * 0.5,20);
                this.func.sleep(500);
            }
        }
    }
    catch(e){
        log(e.message)
        log(e.stack)
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束运行' ,"**********************************************************");
    func.quit(package);
    var o = text('暂不加入').visibleToUser().findOnce();
    if (o){
        this.func.clickObject(o);
        func.quit();
    }
}

function sign(){
    var o = packageName(package).text('福利').visibleToUser().findOne(5000);
    if (o){
        func.clickObject(o);
        func.sleep(4000);
        
        o = packageName(package).textMatches('看视频再领.*|看视频领取.*').visibleToUser().findOnce() || packageName(package).descMatches('看视频再领.*|看视频领取.*').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(5000);
            func.sleep(60000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('书城|点击重播|点击下载').visibleToUser().exists()");
            closeDialog();
        }

        o = text('开宝箱得金币').visibleToUser().findOnce() || desc('开宝箱得金币').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(4000);
            o = packageName(package).textMatches('看视频再领.*|看视频领取.*').visibleToUser().findOnce() || packageName(package).descMatches('看视频再领.*|看视频领取.*').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(5000);
                func.sleep(60000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('书城|点击重播|点击下载').visibleToUser().exists()");
                closeDialog();
            }
        }

        func.swipeUp();
        func.sleep(2000)
        if (!text('看视频赚海量金币').visibleToUser().exists() && !desc('看视频赚海量金币').visibleToUser().exists()){
            func.swipeUp();
            func.sleep(2000);
        }
        var ii = 10;
        while(ii-- > 0){
            if (textMatches('.*已完成10/10.*').visibleToUser().exists())
                break;
                
            o = text('看视频赚海量金币').visibleToUser().findOnce() || desc('看视频赚海量金币').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(5e3)
                func.sleep(60000,"看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || textMatches('书城|点击重播|点击下载').visibleToUser().exists()");
                closeDialog();
                func.toast('4秒继续看视频',1)
                func.sleep(4e3)
            }
            else{
                break;
            }
        }
        
        var o = packageName(package).text('书城').visibleToUser().findOne(5000);
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }
    }
}

function closeDialog(){
    if (textMatches(' *点击重播 *').visibleToUser().exists() || className('ImageView').visibleToUser().find().length == 1){
        func.back();
        func.sleep(3e3);
    }

    var o = idMatches('.*:id/.*close.*').visibleToUser().findOnce() || textMatches('关闭广告').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(3e3);
    }
}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce() || idMatches(package + ':id/.*skip.*').visibleToUser().findOnce();
        if (o){
            func.clickObject(o)
            func.sleep(100);
        }

        o = textMatches('关闭|关闭广告|好的').visibleToUser().findOne();
        if (o){
            func.clickObject(o)
        }

        if (textMatches('分享领取| *点击重播 *|关闭广告').visibleToUser().exists())
            func.back();
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