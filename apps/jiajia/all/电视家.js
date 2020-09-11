auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
const appname = '电视家';
const package = 'com.dianshijia.tvlive';

var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 8;
classModule.maxSwipe = 12;
classModule.minTextSec = 3;
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
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
        var s = Number(classModule.sec) || 15;
        if (s < 10)  s = 10
        var o = func.execApp(appname,package,s * 1e3,"textMatches('推荐|电视').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt();
            return; //退出函数
        }
    }

    func.openWaiting();
    try{
        var o = text('领现金').visibleToUser().findOne(10000);
        if(o){
            func.clickObject(o)
            func.sleep(4000);
        
            o = idMatches('.*:id/dialog_coin_reward_btn').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(5000);
                func.sleep(60000,'金币翻倍中',"idMatches('.*:id/.*close.*').visibleToUser().exists()")
                closeDialog();
            }

            o = idMatches('.*:id/.*close.*').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                this.func.sleep(2000);
            }
        
            o = packageName(package).text('立即签到').visibleToUser().findOnce() || packageName(package).desc('立即签到').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(3000);
            }
        
            o = text('看视频领更多金币').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                func.sleep(60000,'看视频领金币中',"idMatches('.*:id/.*close.*').visibleToUser().exists()");
            }
            closeDialog();

            var ii = 5;
            do{
                func.swipeUp();
                this.func.sleep(2000);
                if (text('激励视频').visibleToUser().exists())
                    break;
            }
            while(ii-- > 0)

            ii = 9;
            while(ii > 0){
                var b = text('激励视频').visibleToUser().findOnce()
                if (!b)
                    break;
                    
                o = id(package + ':id/tv_task_state').filter(function(w){return w.bounds().centerY() > b.bounds().top;}).visibleToUser().findOnce();
                if (o){
                    if (o.text() == '去完成'){
                        this.func.clickObject(o);
                        this.func.sleep(5000);
                        func.sleep(75000,'看视频领金币中',"idMatches('.*:id/.*close.*').visibleToUser().exists() || text('激励视频').visibleToUser().exists()")
                        closeDialog();
                        ii--;
                    }
                    else if (o.text().indexOf(':') > 0){
                        var m = Number(o.text().split(':')[0]) || 0;
                        var s = Number(o.text().split(':')[1]) || 0;
                        var s = m * 60 + s + 2;
                        func.sleep(s * 1000,"等待中")
                    }
                    else if (o.text() == '已完成'){
                        break;
                    }
                }
            }
        
            scrollUp();
            this.func.sleep(500);
            scrollUp();
            this.func.sleep(500);
            scrollUp();
            this.func.sleep(2000);
            
            var o = id(package + ':id/tv_coin_label').visibleToUser().findOnce();
            while(o){
                this.func.clickObject(o);
                this.func.sleep(1000);
                o = idMatches('.*:id/dialog_coin_reward_btn').visibleToUser().findOne(4e3);
                if (o){
                    func.clickObject(o);
                    func.sleep(5000);
                    func.sleep(60000,'看视频领金币中',"idMatches('.*:id/.*close.*').visibleToUser().exists() || text('领现金').visibleToUser().exists()");
                }
                closeDialog();
                o = id(package + ':id/tv_coin_label').visibleToUser().findOne(5000);
                o = id(package + ':id/tv_coin_label').visibleToUser().findOnce();
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

        o = text('我的收益').visibleToUser().findOne(6000) || id(package + ':id/user_cash_label').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(3000);

            o = id(package + ':id/tv_mine_withdraw_cash_num').visibleToUser().findOnce();
            if (o){
                var money = 0;
                if (o.text() != null)
                    money = Number(o.text()) || 0;
                func.toast('金币:' + money)
                if (money >= 0.3){
                    var btn = id(package + ':id/tv_mine_income_cash_get').visibleToUser().findOnce();
                    if (btn){
                        func.clickObject(btn);
                        func.sleep(5000);
                        func.sleep(60000,'去提现广告中',"idMatches('.*:id/.*close.*').visibleToUser().exists()")
                        closeDialog();

                        var btns = id(package + ':id/tv_withdraw_deposit_product_name').visibleToUser().filter(function(w){
                            var r = Number(w.text().replace('元','')) || 0;
                            return r > 0 && r <= money;
                        }).find();
                        for(var i = btns.length - 1; i >= 0; i--){
                            func.clickObject(btns[i]);
                            func.sleep(2000);
        
                            btn = text('立即提现').visibleToUser().findOnce();
                            if (btn){
                                func.clickObject(btn)
                                func.sleep(4000);
                                
                                break;
                            }
                        }
                    }
                }
                else{
                    func.toast('余额不足，不能提现',1);
                }
            }
        }
        else{
            func.toast('未进入到提现界面',1);
        }
    }
}

function closeDialog(){
    var o = idMatches('.*:id/.*close.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(4000);
    } 
    o = className('ImageView').visibleToUser().filter(function(w){return w.id()=='';}).find();
    if (o.length == 1){
        func.clickObject(o[0]);
        func.sleep(4000);
    }
    
    o = idMatches('.*:id/(.*close.*|dialog_coin_reward_count)').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(3000);
    }
}

function hasDialog(){
    setInterval(hasDialog2,3000);
}
function hasDialog2(){
    func.hasDialog();
    o = idMatches('.*:id/.*close.*').visibleToUser().findOnce();
    if (o){
        if (!text('看视频领更多金币').visibleToUser().exists())
            func.clickObject(o);
    }

    o = className('ImageView').visibleToUser().filter(function(w){return w.id()=='';}).find();
    if (o.length == 1){
        func.clickObject(o[0]);
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
classModule.start();Scripts.INSTANCE.runnextScript()