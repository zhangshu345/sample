const appname = '微视';
const package = 'com.tencent.weishi';
var classModule = {};
classModule.func = null;
classModule.minMinutes = 10;
classModule.maxMinutes = 15;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12; 
classModule.autoR = 0;	//默认自动提现
classModule.redrawToAlipay = 0;	//默认提现到支付宝


classModule.start = function(){
    s_tt = new Date()
    log(appname,'---开始---'  + s_tt.getHours() + ':' + s_tt.getMinutes() + ':' + s_tt.getSeconds());
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口
    
    if (currentPackage() != package){
        var o = func.execApp(appname,package,15000,"textMatches('首页|任务中心').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt(); //结束弹出窗口的线程检测
            minutes = 0;
            return; //退出函数
        }
    }

    func.openWaiting(['.LauncherActivity','.SplashActivity']);

    var x = device.width / 2;
    var y = device.height / 2;
    try{
        var idx = 0;
        var bol = true;
        bol = sign();
        while(bol){  
            func.checkSpace();  //检测一次存储空间
            if (!packageName(package).text('推荐').visibleToUser().findOnce()){
                o = packageName(package).text('首页').visibleToUser().findOnce();
                if (o){
                    this.func.clickObject(o);
                    this.func.sleep(2000);
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase()){
                        func.restart(appname,package)
                    }
                    else{
                        this.func.back();
                        this.func.sleep(2300);
                    }
                }
            }

            idx++;
            var sec = random(me.minVideoSec,me.maxVideoSec);
            func.videoSleep(sec);
            swipe(random(x - 100,x - 50),random(y + 300,y + 400), random(x - 100,x - 50), random(y - 300,y - 400),10)
            func.sleep(500);

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
        
        //if (this.autoR == 0) autoRedraw(); 

        o = packageName(package).className('android.widget.FrameLayout').filter(function (w) { return w.bounds().bottom<device.height*0.3 && w.bounds().left>device.width*0.7}).visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
            this.func.sleep(5000);
            o = text('我知道了').visibleToUser().findOnce() || desc('我知道了').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                this.func.sleep(2000);
            }
        }
        

    }
    catch(e){
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack)
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束时间' ,"**********************************************************");
    func.quit(package);
}


function autoRedraw(){
    var ii = 5;
    while(!packageName(package).text('我的').visibleToUser().exists() && ii-- > 0){
        func.back();
        func.sleep(2200);
    }

    var o = packageName(package).text('我的').visibleToUser().findOne(5000)
    if (o){
        func.clickObject(o);
        func.sleep(4000);

        o = id(package + ':id/tv_cash_count').visibleToUser().findOne(10000);
        if (o){
            var money = Number(o.text().replace('¥','')) || 0;
            if (money >= 0.38){
                var o = id(package + ':id/ll_my_cash').visibleToUser().findOnce();  //立即提现
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);

                    var btn = id(package + ':id/tvWithdraw').visibleToUser().findOne(5000);    //提现按钮
                    if (btn){
                        var redrawTo = Number(classModule.redrawToAlipay) || 0;
                        if (redrawTo == 1)
                            o = id(package + ':id/ivAlipay').visibleToUser().findOnce();
                        else
                            o = id(package + ':id/ivWechat').visibleToUser().findOnce();
                        func.clickObject(o);
                        func.sleep(2000);

                        var btns = textMatches('[0-9.]+元').visibleToUser().filter(function(w){return (Number(w.text().replace('元','').trim()) || 0) <= money;}).find();
                        if (btns.length == 0)
                            btns = descMatches('[0-9.]+元').visibleToUser().filter(function(w){return (Number(w.desc().replace('元','').trim()) || 0) <= money;}).find();
                        for(var i = btns.length - 1; i >= 0; i--){
                            func.clickObject(btns[i]);
                            func.sleep(1000);
                            
                            func.clickObject(btn);
                            func.sleep(2000);
                            o = text('是').visibleToUser().findOnce()
                            if (o){
                                func.clickObject(o);
                                func.sleep(2000);
                            }
                            if (id(package + ':id/tv_fail_message').visibleToUser().exists()){  //失败
                                func.back();    
                                func.sleep(1000);
                            }
                            else{
                                break;
                            }
                        }
                    }
                }
            }
            else{
                func.toast('余额不足，不能提现！',1)
            }
        }
    }
}

function sign(){
    var o = packageName(package).text('推荐').visibleToUser().findOne(5000)
    if (o){
        click(o.bounds().right + (device.width - o.bounds().right) / 2,o.bounds().centerY())
        func.sleep(3000);
        func.sleep(20000, '等待中', "textMatches('签到领红包|领取红包.*|明日再来|看视频领.*').visibleToUser().exists() ");

        // o = packageName(package).text('任务中心').visibleToUser().findOne(10000);
        o = packageName(package).textMatches('明日再来.*').visibleToUser().findOnce();
        if(o){
            return false
        }
        o = packageName(package).textMatches('签到领红包|领取红包.*').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(4000);

            o = packageName(package).text('我知道了').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
            }
        }

        func.back();
        return true
        // o = packageName(package).text('看视频领红包 ').visibleToUser().findOne(5000);
        // if (o){
        //     func.clickObject(o);
        //     func.sleep(2000);
        // }
    }
}


function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();

        var o = textMatches('我知道了|知道了').visibleToUser().findOnce() || descMatches('我知道了|知道了').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
        }

        var o = text('立即更新').visibleToUser().findOnce()
        if (o){
            func.clickObject(o[0])
        }
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
