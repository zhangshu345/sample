const appname = '天天短视频';
const package = 'com.tiantian.video';
var classModule = {};
classModule.func = null;
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12; 
classModule.autoR = 0;	//默认自动提现

classModule.start = function(){
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口
    
    if (currentPackage() != package){
        var s = Number(classModule.sec) || 15;
        if (s < 10)  s = 10
        var o = func.execApp(appname,package,s * 1e3,"textMatches('首页|新手任务|推荐').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt(); //结束弹出窗口的线程检测
            minutes = 0;
            return; //退出函数
        }
    }

    //签到，点击红包即可
    //在这里读取配置文件
    func.openWaiting();

    sign();
    var x = device.width / 2;
    var y = device.height / 2;
    try{
        var idx = 0;
        var bol = true;
        while(bol){  
            func.checkSpace();  //检测一次存储空间
            if (!idMatches(package + ':id/(good_count_layout|home_more_btn)').visibleToUser().exists()){
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
            var sec = 60;//random(me.minVideoSec,me.maxVideoSec);
            func.sleep(sec * 1e3,'视频播放中',"!id('" + package + ":id/home_nickname_tv').visibleToUser().exists()");
            func.sleep(1000);
            //swipe(random(x - 100,x - 50),random(y + 300,y + 400), random(x - 100,x - 50), random(y - 300,y - 400),10)
            this.func.swipeUp(0,0,random(301,330));
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
        if (this.autoR == 0) autoRedraw(); 
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

        o = id(package + ':id/tv_mine_money').visibleToUser().findOne(10000);   //余额
        if (o){
            var money = Number(o.text()) || 0;
            if (money >= 1){
                func.clickObject(o);
                func.sleep(2000);

                var o = id(package + ':id/tv_balance_withdraw').visibleToUser().findOne(5000);
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);

                    func.swipeUp();
                    func.sleep(2000);

                    var btn = id(package + ':id/tv_withdraw_confirm').visibleToUser().findOne(5000);
                    if (btn){
                        var btns = textMatches('[0-9.]+元').visibleToUser().filter(function(w){return (Number(w.text().replace('元','').trim()) || 0) <= money;}).find();
                        if (btns.length == 0)
                            btns = descMatches('[0-9.]+元').visibleToUser().filter(function(w){return (Number(w.desc().replace('元','').trim()) || 0) <= money;}).find();
                        for(var i = btns.length - 1; i >= 0; i--){
                            func.clickObject(btns[i]);
                            func.sleep(1000);
        
                            func.clickObject(btn);
                            func.sleep(3000);
                            if (!id(package + ':id/tv_withdraw_confirm').visibleToUser().exists()){
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
    var o = packageName(package).text('赚钱').visibleToUser().findOne(5000)
    if (o){
        func.clickObject(o);
        func.sleep(2000);

        o = textMatches('立即签到').visibleToUser().findOne(5000)
        if (o){
            func.clickObject(o);
            func.sleep(5000);
            func.back();
            func.sleep(4000);
            closeDialog()

        }
        
        o = packageName(package).text('首页').visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
            func.sleep(2000);
        }
    }
}

function closeDialog(){
    if (packageName(package).textMatches('点击重播').visibleToUser().exists()){
        func.back();
        func.sleep(4000);
    }
    var o = className('ImageView').visibleToUser().filter(function(w){return w.id() == null || w.id() == ''}).find();
    if (o.length == 1){
        func.clickObject(o[0]);
        func.sleep(4000);
    }
    o = idMatches(package + ':id/.*close').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(4000);
    } 
}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();

        var o = idMatches('.*:id/.*close.*').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
        }
        o = className('ImageView').visibleToUser().filter(function(w){return w.id() == null || w.id() == ''}).find();
        if (o.length == 1){
            func.clickObject(o[0]);
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