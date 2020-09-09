const appname = '全民赛车场';
const package = 'quanminsaichechang';

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
classModule.autoR = 0;	//默认自动提现
keys = '点击重播|点击下载|点击打开'

url_root = 'http://y.xiequbo.cn/uploads/quanminsaichechang/'


//  确定
url_queding = url_root+'queding.png'
//  进入任务的元
url_fenhong = url_root+'fenhong.png'
//  助力
url_zhuli = url_root+'huoyuezhuli.png'
//  看广告
url_guanggao = url_root+'kanguanggao.png'
//  翻倍
url_fanbei = url_root+'fanbei.png'
//  成功返回
url_cheng_fan = url_root+'chengong_fanhui.png'
//  普通
url_putong = url_root+'putong.png'




classModule.start = function () {
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes, this.maxMinutes);   //生成运行时间
    func.log(appname, '启动，预计运行：' + minutes, "**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分', 2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口
    try { 
        // sleep(3000)
        // threads.start(function(){
        //     star_ing = text("立即开始").findOne(1000)
        //     if(star_ing){
        //         star_ing.click()
        //         return
        //     }
        // })
        // if (!requestScreenCapture()) {
        //     alert("请求截图权限失败！");
        // }
        // sleep(1000)
    
    
        if (currentPackage() != package) {
            var o = func.execApp(appname, package, 15000, "text('更多').visibleToUser().exists() && text('关闭').visibleToUser().exists() ")
            if (!o) {
                toast("没有找到" + appname);
                thread.interrupt();
                minutes = 0;
                return; //退出函数
            }
        }
    
        var ii = 50;
        while(ii-- > 0){
            closeDialog()
            small_img  = images.load(url_queding)
            var p= images.findImage(captureScreen(), small_img, {threshold: 0.8})
            if(p){
                click(p.x,p.y)
                sleep(3000)
            }

            small_img  = images.load(url_putong)
            var p= images.findImage(captureScreen(), small_img, {threshold: 0.8})
            if(p){
                click(p.x,p.y)
                sleep(3000)
            }



            small_img  = images.load(url_fenhong)
            var p= images.findImage(captureScreen(), small_img, {threshold: 0.8})
            if(p){
                click(p.x,p.y)
            }
            small_img  = images.load(url_zhuli)
            var p= images.findImage(captureScreen(), small_img, {threshold: 0.8})
            if(p){
                click(p.x,p.y)
            }
            small_img  = images.load(url_guanggao)
            var p= images.findImage(captureScreen(), small_img, {threshold: 0.8})
            if(p){
                break
            }
            
            // small_img  = images.load(url_fanbei)
            // var p= images.findImage(captureScreen(), small_img, {threshold: 0.8})
            // if(p){
            //     click(p.x,p.y)
            //     sleep(3000)
            //     func.sleep(60000, '等待中', "!textMatches('.*秒').visibleToUser().exists() || !descMatches('.*秒').visibleToUser().exists()");
            //     closeDialog()
            // }
            // small_img  = images.load(url_cheng_fan)
            // var p= images.findImage(captureScreen(), small_img, {threshold: 0.8})
            // if(p){
            //     click(p.x,p.y)
            // }
            var o = className('android.widget.FrameLayout').visibleToUser().filter(function (w) { return w.bounds().top > device.height * 0.1 && w.bounds().left > device.width * 0.5; }).findOnce();
            if (o){
                func.clickObject(o)
                sleep(3000)
            }
        }
        small_img  = images.load(url_guanggao)
        var p= images.findImage(captureScreen(), small_img, {threshold: 0.8})
        if(p){
            var ii = 50;
            while(ii-- > 0){
                small_img  = images.load(url_guanggao)
                var p= images.findImage(captureScreen(), small_img, {threshold: 0.8})
                if(p){
                    click(p.x,p.y)
                    sleep(5000)
                    var j= images.findImage(captureScreen(), small_img, {threshold: 0.8})
                    if(j){
                    break
                    }
                    func.sleep(60000, '等待中', "!textMatches('.*秒').visibleToUser().exists()");
                    closeDialog()
                    sleep(3000)
                }
                closeDialog()
            }
        }

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
//  关闭广告[30秒视频广告]
    o = textMatches('广告').visibleToUser().findOnce() || descMatches('广告').visibleToUser().findOnce()
    p = textMatches('关闭').visibleToUser().findOnce() || descMatches('关闭').visibleToUser().findOnce()
    if(o && p){
        if(o.className() != 'android.widget.FrameLayout'){
            // func.sleep(10000, '等待中', "!textMatches('.*秒').visibleToUser().exists() || !descMatches('.*秒').visibleToUser().exists()");
            if (p){
                func.clickObject(p)
                sleep(3000)
            }
        }
    }
    p = textMatches('已完成浏览').visibleToUser().findOnce() 
    if(p){
        back()
        sleep(3000)
    }


}


function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        // var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        // if (o) {
        //     func.clickObject(o);
        // }

        o = textMatches('允许').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }
        o = textMatches('关闭广告').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
        }
        // if (packageName(package).textMatches(keys).visibleToUser().exists()) {
        //     func.back();
        // }

        // 中间的弹窗广告
        // var o = className('android.widget.FrameLayout').visibleToUser().filter(function (w) { return w.bounds().top > device.height * 0.1 && w.bounds().left > device.width * 0.5; }).findOnce();
        // if (o){
        //     log(1111)
        //     func.clickObject(o)
        // }

    }, 3000);
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