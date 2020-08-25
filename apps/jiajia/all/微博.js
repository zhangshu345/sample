const appname = '微博';
const package = 'com.sina.weibo'; 

var classModule = {};
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
        var o = func.execApp(appname,package)
        if (!o){
            o = func.execApp(appname,package)
            toast("没有找到" + appname);
            thread.interrupt();
            minutes = 0;
            return; //退出函数
        }
    }

    //在这里读取微鲤的配置文件 
    func.openWaiting(['.FrameLayout','.SplashActivity'])
    try{
        var ii = 5;
        while (ii-- > 0 && !textMatches('连续签到').visibleToUser().exists() && !textMatches('任务红包|微博积分').visibleToUser().exists()) {
            if(ii<3){
                o = packageName(package).textMatches('我').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o)
                    sleep(3000)
                }
            }
            o = packageName(package).id(package + ':id/redpacketSave').visibleToUser().findOnce() 
            if (o) {
                func.clickObject(o)
                func.sleep(10000, '等待中', "textMatches('连续签到|任务红包|微博积分').visibleToUser().exists() ");
            }
            closeDialog() 
            back()
            sleep(3000)
        }
        haha2()
    }
    catch(e){ 
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack) 
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.toast(appname + '运行完成',2)
    func.log(appname,'结束时间',"**********************************************************");
    func.quit(package);
}



function closeDialog(){
    
    var o = idMatches('.*:id/.*close.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o)
    }
    var o = textMatches('以后再说').visibleToUser().findOnce();
    if (o){
        func.clickObject(o)
    }
}

function to_target(){
    var ii = 7;
    while(ii-- > 0 && !packageName(package).id(package + ':id/redpacketSave').visibleToUser().exists() ){
        o = textMatches('用户任务中心').visibleToUser().findOnce() || descMatches('用户任务中心').visibleToUser().findOnce()
        if(o){
            back()
            sleep(2000)
            continue
        }

        closeDialog()
        o = textMatches('首页').visibleToUser().findOnce() || descMatches('首页').visibleToUser().findOnce()
        if (currentPackage().toLowerCase() != package.toLowerCase()) {
            func.restart(appname, package)
        }
        if(ii<5){
            func.back();
            func.sleep(3200);
        }
        if(ii<2){
            func.sleep(3200);
            func.restart(appname, package)
        }
    }
    // 进入任务页面
    var ii = 5;
    while (ii-- > 0 && !textMatches('连续签到|任务红包|微博积分').visibleToUser().exists()) {
        if(ii<3){
            back()
            o = packageName(package).textMatches('我').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                sleep(3000)
            }
        }
        o = packageName(package).id(package + ':id/redpacketSave').visibleToUser().findOnce() 
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('连续签到|任务红包|微博积分').visibleToUser().exists() ");
        }
        closeDialog() 
    }

}
function cilik_money(){
    iii = textMatches('领.*元').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce() || descMatches('领.*元').filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).visibleToUser().findOnce()
    if(iii){
        func.clickObject(iii)
        sleep(5000)
    }
    iii = textMatches('领.*积分').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).findOnce() || descMatches('领.*积分').filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).visibleToUser().findOnce()
    if(iii){
        func.clickObject(iii)
        sleep(5000)
    }

} 

function haha2(){
    target1 = false
    target2 = false
    target3 = false
    target4 = false
    target5 = false
    to_target()
    var for_num = 10;
    while (for_num-- > 0) {


        cilik_money()
        toast("任务一:刷关注微博")
        toast("开始去刷微博")
        o = packageName(package).textMatches('刷微博').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "!textMatches('加载中.*').visibleToUser().exists() && !descMatches('加载中.*').visibleToUser().exists()");
            sleep(3000)
            var ii = 5;
            while (ii-- > 0) {
                func.sleep(10000, '刷微博中...');
                func.swipeUp();
            }
            to_target()
            sleep(3000)
            // continue
        }
        toast("任务二:关注")
        sleep(1000)
        o = packageName(package).textMatches('关注').visibleToUser().findOnce();
        if (o) {
  
            func.clickObject(o)
            func.sleep(10000, '等待中', "!textMatches('加载中.*').visibleToUser().exists() && !descMatches('加载中.*').visibleToUser().exists()");
            sleep(3000)
            var ii = 3;
            while (ii-- > 0) {
                o = textMatches('粉丝数.*').visibleToUser().filter(function (w) { return w.bounds().bottom > device.height * 0.3; }).findOnce();
                if (o) {
                    var list = o.parent().parent();
                    for (var i = 0; i < list.childCount(); i++) {
                        var child = list.child(i);

                        xy = child.bounds();
                        if (xy.centerX() > device.width * 0.8) {

                            let txt = child.text();
                            let idd = child.id();

                            func.clickObject(child)
                            sleep(3000)
                        }
                    }
                }
                func.swipeUp();
                sleep(3000)
            }
            to_target()
            sleep(3000)
            // continue
        }


        toast("任务三:点赞")

        toast("开始去点赞")
        sleep(1000)
        o = packageName(package).textMatches('点赞').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "!textMatches('加载中.*').visibleToUser().exists() && !descMatches('加载中.*').visibleToUser().exists()");
            sleep(3000)
            var ii = 3;
            while (ii-- > 0) {
                o = descMatches('喜欢').visibleToUser().filter(function (w) { return w.bounds().left > device.width * 0.7; }).findOnce();
                if (o) {
                    func.clickObject(o)
                    sleep(3000)
                }
                func.swipeUp();
                sleep(1000)
                func.swipeUp();
                sleep(1000)
            }
            to_target()
            sleep(3000)
            // continue
        }



        toast("开始去转发")
        sleep(1000)
        o = packageName(package).textMatches('转发').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "!textMatches('加载中.*').visibleToUser().exists() && !descMatches('加载中.*').visibleToUser().exists()");
            sleep(3000)
            var ii = 2;
            while (ii-- > 0) {
                o = descMatches('喜欢').visibleToUser().filter(function (w) { return w.bounds().left < device.width * 0.4; }).findOnce();
                if (o) {
                    func.clickObject(o)
                    sleep(3000)
                    p = descMatches('快转').visibleToUser().findOnce() || textMatches('快转').visibleToUser().findOnce();
                    if (p) {
                        func.clickObject(p)
                        sleep(3000)
                    }
                }
                func.swipeUp();
                sleep(1000)
                func.swipeUp();
                sleep(1000)
            }
            to_target()
            sleep(3000)
        }

        // continue



        toast("开始去评论")
        o = packageName(package).textMatches('评论').visibleToUser().findOnce();
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "!textMatches('加载中.*').visibleToUser().exists() && !descMatches('加载中.*').visibleToUser().exists()");
            sleep(3000)
            var ii = 2;
            while (ii-- > 0) {
                o = descMatches('喜欢').visibleToUser().filter(function (w) { return w.bounds().left > device.width * 0.4 && w.bounds().right < device.width * 0.7; }).findOnce();
                if (o) {
                    func.clickObject(o)
                    func.sleep(10000, '等待中', "!textMatches('加载中.*').visibleToUser().exists() && !descMatches('加载中.*').visibleToUser().exists()");
                    sleep(3000)
                    p = descMatches('评论').visibleToUser().findOnce() || textMatches('评论').visibleToUser().findOnce();
                    if (p) {
                        func.clickObject(p)
                        sleep(3000)
                        p = descMatches('话题、电影、书、歌曲、地点、股票').visibleToUser().findOnce() || textMatches('话题、电影、书、歌曲、地点、股票').visibleToUser().findOnce();
                        if (p) {
     
                            func.clickObject(p)
                            sleep(3000)

                            finds = className("android.widget.Image").visibleToUser().filter(function (w) { return w.text() != '' }).find()
                            if(finds){
                                var c = random(0, finds.length-1) 
                                func.clickObject(finds[c])
                                sleep(2000)
                                p = descMatches('发送').visibleToUser().findOnce() || textMatches('发送').visibleToUser().findOnce();
                                if (p) {
      
                                    func.clickObject(p)
                                    sleep(3000)
                                }
                            } 
                        }
                        back()
                    }
                }
                func.swipeUp();
                sleep(1000)
                func.swipeUp();
                sleep(1000)
                func.swipeUp();
                sleep(1000)
            }

            to_target()
        }


        cilik_money()




        jjj = textMatches('现金红包抢先兑').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.75; }).findOnce();
        if (jjj) {

            break
        }
        func.swipeUp();
        sleep(3000)


    }

}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();

        var o = idMatches('.*:id/.*close.*').visibleToUser().findOnce();
        if (o){
            func.clickObject(o)
        }
        var o = textMatches('以后再说|不了，谢谢').visibleToUser().findOnce();
        if (o){
            func.clickObject(o)
        }

        //在这里执行弹出窗口判断
    },3000);
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
