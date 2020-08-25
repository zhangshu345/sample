const appname = '小糖糕';
const package = 'com.jifen.ponycamera';

var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
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
        var o = func.execApp(appname,package,s * 1e3,"textMatches('推荐|任务').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt(); 
            return; //退出函数
        }
    } 

    func.openWaiting(['.FrameLayout','.SplashActivity'])
    sign()
    try{
        var idx = 1;
        var bol = true;

        while(bol){
            func.checkSpace();  //检测一次存储空间
            if (!idMatches(package + ':id/(imv_head_community_new|feed_head_image_view)').visibleToUser().exists()){
                o = packageName(package).text('视频').visibleToUser().findOnce()
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                }
                else{
                    o = packageName(package).text('发现').visibleToUser().findOnce()
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                    else{
                        if (currentPackage().toLowerCase() != package.toLowerCase()){
                            func.restart(appname,package)
                        }
                        else{
                            func.back();
                            func.sleep(2200);
                        }
                    }
                }
            }
            idx++;
            o = packageName(package).textMatches('小视频').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
            }

            var sec = random(me.minVideoSec,me.maxVideoSec);
            func.sleep(sec * 1000,"视频播放中","textMatches('看视频再领.*金币|看视频.*金币再翻.*').visibleToUser().exists()");

            var o = packageName(package).textMatches('看视频再领.*金币|看视频.*金币再翻.*').visibleToUser().findOnce();
            if (o){
                this.func.sleep(1000);
                this.func.clickObject(o);
                this.func.sleep(2000);
                func.sleep(60000,"看视频再领金币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播').visibleToUser().exists()")
                closeDialog();
            }
            func.swipeUp(0,0,random(301,330));

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
        
        this.func.sleep(1000);
        sign();
    }
    catch(e){ 
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack) 
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'结束时间',"**********************************************************");
   
    func.quit(package);
}

function closeDialog(){
    if (packageName(package).textMatches('点击重播').visibleToUser().exists()){
        func.back();
        func.sleep(4000);
    }
    
    var o = className('ImageView').visibleToUser().filter(function(w){return w.id() == ''}).find();
    if (o.length == 1){
        func.clickObject(o[0]);
        func.sleep(4000);
    }
    o = idMatches(package + ':id/.*close').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(4000);
    } 
    o = textMatches('炫耀一下').visibleToUser().findOnce() || descMatches('炫耀一下').visibleToUser().findOnce();
    if (o){
        func.clickObject(o.parent().child(o.parent().childCount() - 1));
        func.sleep(3000);
    }

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

        var money = 0;
        o = text('可提现').visibleToUser().findOne(5000) || desc('可提现').visibleToUser().findOnce()
        if (o) o = o.parent().child(0);
        if (o){
            if (o.text() != '')
                money = Number(o.text()) || 0;
            else
                money = Number(o.desc()) || 0;
        }
        func.toast('金额:' + money,1)
        if (money >= 0.3){
            o = packageName(package).textMatches('提现').visibleToUser().findOne(6000) || packageName(package).descMatches('提现').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(3000);

                var btn = packageName(package).text('立即提现').visibleToUser().findOne(5000) || packageName(package).desc('立即提现').visibleToUser().findOnce();
                if (btn){
                    var btns = packageName(package).textMatches('[0-9.]+元').visibleToUser().filter(function(w){
                        var r = Number(w.text().replace('元','')) || 0;
                        return r > 0 && r <= money;
                    }).find();
                    if (btns.length == 0)
                        btns = packageName(package).descMatches('[0-9.]+元').visibleToUser().filter(function(w){
                            var r = Number(w.desc().replace('元','')) || 0;
                            return r > 0 && r <= money;
                        }).find();
                    for(var i = btns.length - 1; i >= 0; i--){
                        func.clickObject(btns[i]);
                        func.sleep(2000);
    
                        func.clickObject(btn)
                        func.sleep(3000);
                        if (text('继续赚钱').visibleToUser().exists() || desc('继续赚钱').visibleToUser().exists()){
                            break;
                        }
                    }
                }
            }
            else{
                func.toast('未进入到提现界面',1);
            }
        }
        else{
            func.toast('余额不足，不能提现',1);
        }
    }
}

function sign(){
    try{
        o  = packageName(package).text('任务').visibleToUser().findOnce();
        if (o){
            func.clickObject(o)
            func.sleep(10000,'等待中',"textMatches('勋章殿堂|看视频.*奖励翻倍.*|看视频再送.*').visibleToUser().exists() || descMatches('勋章殿堂').visibleToUser().exists()");

            o = textMatches('看视频.*奖励翻倍.*|看视频再送.*').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                func.sleep(60000,"看视频领币中","textMatches('点击重播|我的').visibleToUser().exists()")
                closeDialog()
            }
            
            ii = 6;
            while(ii-- > 0){
                o = textMatches('领取时段奖励|幸运金币|立即领取|领取|翻倍|领金币|看视频领金币').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                    o = textMatches('看视频最高翻.*|看视频再领.*|看视频.*金币再翻.*').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                    func.sleep(60000,"领币中","textMatches('点击重播|我的').visibleToUser().exists()")
                    closeDialog()
                }
            }
            
            o =  textMatches('勋章殿堂').visibleToUser().findOne(3000) || descMatches('勋章殿堂').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(4000);
                if (textMatches('待领取|已获得.*').visibleToUser().exists() || descMatches('待领取|已获得.*').visibleToUser().exists()){
                    var n = 7;
                    while (n-- > 0){
                        o = packageName(package).text('领取').visibleToUser().findOnce() || packageName(package).desc('领取').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o);
                            func.sleep(2000);
                            func.sleep(60000,"勋章殿堂领取中","textMatches('点击重播|勋章殿堂').visibleToUser().exists()");
                            closeDialog();
                            func.sleep(2000);
                        }
                        else{
                            break;
                        }           
                    }
                    func.back();
                    func.sleep(2000);
                }
            }
        }

        o  = packageName(package).text('视频').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }
        else{
            o = packageName(package).text('发现').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                func.sleep(2000);
            }
        }
    }
    catch(e){
        func.log(appname,'领币',e.message + '\n\r' + e.stack)
    }
}
 
function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o){
            if (!packageName(package).textMatches('看视频最高翻.*|看视频再领.*金币|看视频.*金币再翻.*').visibleToUser().exists() && !packageName(package).descMatches('看视频再领.*金币|看视频.*金币再翻.*').visibleToUser().exists())
                func.clickObject(o);
        }

        o = packageName(package).textMatches('放弃奖励|继续播放|放弃金币|以后更新|关闭|暂不领取').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
        }
        
        if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()){
            func.back();
        }
        
        if (packageName(package).textMatches('点击重播').visibleToUser().exists()){
            func.back();
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