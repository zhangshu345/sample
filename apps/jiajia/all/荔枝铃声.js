const appname = '荔枝铃声';
const package = 'com.preface.megatron';

var classModule = {};
classModule.minMinutes = 15;
classModule.maxMinutes = 25;
classModule.minSwipe = 0;
classModule.maxSwipe = 0;
classModule.minTextSec = 3; 
classModule.maxTextSec = 8;
classModule.minVideoSec = 8;
classModule.maxVideoSec = 12;
classModule.autoR = 0;	//默认自动提现
classModule.func = null;
keys = '点击重播|点击下载|点击打开'

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
        var o = func.execApp(appname,package)
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt(); 
            return; //退出函数
        }
    } 

    func.openWaiting(['.FrameLayout','.SplashActivity'])

    try{
        var idx = 1;
        var bol = true;
        o = packageName(package).textMatches('我知道了').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(1000);
        }
        sign()
        while(bol){
            // func.checkSpace();  //检测一次存储空间
            o = textMatches('.*金币翻倍.*').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                func.sleep(70000,'金币翻倍观看中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
                closeDialog()
                sleep(3000)
            }
            o = textMatches("视频").visibleToUser().findOnce()
            if(o){
                func.clickObject(o);
            }else{
                refresh()
                o = textMatches("视频").visibleToUser().findOnce()
                if(o){
                    func.clickObject(o);
                }
            }

            var sec = random(me.minVideoSec,me.maxVideoSec);
            func.sleep(sec * 1000,"视频播放中","textMatches('.*金币翻倍.*').visibleToUser().exists()");
            
            o = textMatches('.*金币翻倍.*').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                func.sleep(70000,'金币翻倍观看中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");

                closeDialog()
                closeDialog()
                sleep(3000)
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
        sign()
        this.func.sleep(1000);
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
    if (packageName(package).textMatches('点击重播|点击打开').visibleToUser().exists()){
        func.back();
        func.sleep(4000);
    }
    o = packageName(package).textMatches('我知道了').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(1000);
    }

    
    var o = className('ImageView').visibleToUser().filter(function(w){return w.id() == ''}).find();
    if (o.length == 1){
        func.clickObject(o[0]);
        func.sleep(4000);
    }
    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(4000);
    } 
    o = textMatches('炫耀一下').visibleToUser().findOnce() || descMatches('炫耀一下').visibleToUser().findOnce();
    if (o){
        func.clickObject(o.parent().child(o.parent().childCount() - 1));
        func.sleep(3000);
    }
    var finds = className('ListView').visibleToUser().find()
    if(finds.length>1){
        red_box = finds[finds.length-1].childCount()
        log(red_box)
        if(red_box == 8){
            log("删除")
            o = className("android.view.View").clickable(true).depth(13).findOnce()
            if(o){
                func.clickObject(o);
            }
        }
    }

}

function autoRedraw(){
    o = textMatches('.*金币翻倍.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(2000);
        func.sleep(70000,'金币翻倍观看中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");

        closeDialog()
        closeDialog()
        sleep(3000)
    }

    var ii = 5;
    while(ii-- > 0 && !text('我的').visibleToUser().exists()){
        func.back();
        func.sleep(2200);
    }
    var o = text('我的').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(3000);
        o = packageName(package).textMatches('现金提现').visibleToUser().findOne(6000) || packageName(package).descMatches('现金提现').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            sleep(3000)
            o = packageName(package).textMatches('约.*元').visibleToUser().findOne(6000) 
            if(o){
                money = o.text().replace('约','').replace('元','')
                if(money>1){
                    o = text('1.0元').visibleToUser().findOnce() || desc('1.0元').visibleToUser().findOnce()
                    if(o){
                        func.clickObject(o);
                        sleep(2000)
                    }
                    o = text('立即提现').visibleToUser().findOnce() || desc('立即提现').visibleToUser().findOnce()
                    if(o){
                        func.clickObject(o);
                        sleep(2000)
                        o = text('确定').visibleToUser().findOnce() || desc('确定').visibleToUser().findOnce()
                        if(o){
                            func.clickObject(o);
                        }    
                    }
                }
                if(0.3<money){
                    o = text('新人专享').visibleToUser().findOnce() || desc('新人专享').visibleToUser().findOnce()
                    if(o){
                        func.clickObject(o);
                        sleep(2000)
                        o = text('立即提现').visibleToUser().findOnce() || desc('立即提现').visibleToUser().findOnce()
                        if(o){
                            func.clickObject(o);
                            sleep(2000)
                            o = text('确定').visibleToUser().findOnce() || desc('确定').visibleToUser().findOnce()
                            if(o){
                                func.clickObject(o);
                                sleep(2000)
                            }    
                        }
                    }
            
                }

            
            }
            

        }



    }
}

function refresh(){
    var ii = 7;
    while(ii-- > 0 && !textMatches('我的').visibleToUser().exists()){
        closeDialog()
        if (currentPackage().toLowerCase() != package.toLowerCase()) {
            func.restart(appname, package)
        }
        if(ii<5){
            func.sleep(3200);
            func.back();
        }
        if(ii<2){
            func.sleep(3200);
            func.restart(appname, package)
        }

    }
}

function sign(){
    //  有问题 暂时先不上 签到
    try{
        o = textMatches('.*金币翻倍.*').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(60000,'金币翻倍观看中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog()
            closeDialog()
            sleep(3000)
        }
        refresh()

        var ii = 5;
        while (ii-- > 0 && !textMatches('.*金币翻倍.*|.*已连续签到.*').visibleToUser().exists()) {
            if(ii<3){
            
                o = packageName(package).textMatches('铃声').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o)
                    sleep(3000)
                }
            }
            o = packageName(package).textMatches('任务').visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                func.sleep(10000, '等待中', "textMatches('.*金币翻倍.*|.*已连续签到.*').visibleToUser().exists() || descMatches(.*金币翻倍.*|.*已连续签到.*').visibleToUser().exists()");
            }
            closeDialog() 
        }


        sleep(3000)
        o = textMatches('.*金币翻倍.*').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            func.sleep(60000,'签到翻倍观看中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            closeDialog()
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
            if(o.id()!="com.preface.megatron:id/iv_reward_top_close"){
                func.clickObject(o);
            }
        }

        o = packageName(package).textMatches('继续播放|放弃金币|以后更新|关闭|稍后领取|放弃奖励').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
        }
        
        if (id(package + ':id/tt_reward_ad_download').visibleToUser().exists()){
            func.back();
        }
        
        if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
            func.back();
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
classModule.start();Scripts.INSTANCE.runnextScript() 

