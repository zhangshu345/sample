auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
const appname = '集好视频';
const package = 'com.ztzj.jhsp';

var classModule = {};
classModule.minMinutes = 25;
classModule.maxMinutes = 35;
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
        wetch_num = 0 
        while(bol){


            o = idMatches('.*web_completedView').visibleToUser().exists()
            if (!o) {
                refresh()
                var ii = 5;
                key_button = '视频'
                key_result = '推荐'
                key_other = '任务'
                while (ii-- > 0 && !textMatches(key_result).visibleToUser().exists() && !descMatches(key_result).visibleToUser().exists()) {
                    if (ii < 3) {
                        o = packageName(package).textMatches(key_other).visibleToUser().findOnce() || descMatches(key_other).visibleToUser().exists();
                        if (o) {
                            func.clickObject(o)
                            sleep(3000)
                        }
                    }
                    o = packageName(package).textMatches(key_button).visibleToUser().findOnce() || packageName(package).descMatches(key_button).visibleToUser().findOnce();;
                    if (o) {
                        func.clickObject(o)
                        func.sleep(10000, '等待中', "textMatches('" + key_result + "').visibleToUser().exists() || descMatches('" + key_result + "').visibleToUser().exists()");
                    }
                    closeDialog()
                }

                var ii = 5;
                while (ii-- > 0 && !idMatches(package + ':id/(item_IMG_2H_TEXT_right|item_IMG_2H_TEXT_lift)').visibleToUser().filter(function (w) { return w.bounds().bottom < device.height * 0.85; }).exists()) {
                    swipe(device.width * 0.2, device.height * 0.7, device.width * 0.75, device.height * 0.75, 30);
                    func.swipeUp()
                    func.sleep(2300);
                }

                o = idMatches(package + ':id/(item_IMG_2H_TEXT_right|item_IMG_2H_TEXT_lift)').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o)
                    func.sleep(10000, '等待中', "idMatches('.*web_completedView').visibleToUser().exists() || textMatches('报错').visibleToUser().exists() ");
                }
            }
            wetch_num += 1
            if(wetch_num>10){
                wetch_num = 0
                o = idMatches('.*web_completedView').visibleToUser().findOnce()
                if(o){
                    func.clickObject(o)
                    sleep(2000)
                }
            }
            func.sleep(10000, '观看中.....');
            o = idMatches('.*iv_baoxiang').visibleToUser().exists()
            if(o){
                wetch_num = 0
                o = idMatches(package + ':id/(iv_baoxiang)').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o)
                    func.sleep(10000, '等待中', "descMatches('领取奖励').visibleToUser().exists() || textMatches('领取奖励').visibleToUser().exists() ");
                }
            }
            o = textMatches('领取奖励').visibleToUser().findOnce() || descMatches('领取奖励').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                func.sleep(60000,o.text(),"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || idMatches('" + package + ":id/cancel.*').visibleToUser().exists()");
                closeDialog();
            }

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
    if (packageName(package).textMatches(keys).visibleToUser().exists()){
        func.back();
        func.sleep(4000);
    }
    o = packageName(package).textMatches('我知道了').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(1000);
    }

    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
        func.sleep(4000);
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
    refresh()
    var ii = 5;
    key_button = '任务'
    key_result = '已签|.*天|再领.*金币'
    key_other  = '首页'
    while (ii-- > 0 && !textMatches(key_result).visibleToUser().exists() && !descMatches(key_result).visibleToUser().exists()) {
        if(ii<3){
            o = packageName(package).textMatches(key_other).visibleToUser().findOnce();
            if (o) {
                func.clickObject(o)
                sleep(3000)
            }
        }
        o = packageName(package).textMatches(key_button).visibleToUser().findOnce() || packageName(package).descMatches(key_button).visibleToUser().findOnce();;
        if (o) {
            func.clickObject(o)
            func.sleep(10000, '等待中', "textMatches('"+ key_result +"').visibleToUser().exists() || descMatches('"+ key_result +"').visibleToUser().exists()");
        }
        closeDialog() 
    }

    o = textMatches('再领.*金币').visibleToUser().findOnce() || descMatches('再领.*金币').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(2000);
        func.sleep(60000,'签到金币翻倍中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
        closeDialog()
        sleep(1000)
        closeDialog()
        sleep(3000)
    }
    o = textMatches('拆红包x.*').visibleToUser().findOnce() || descMatches('拆红包x.*').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(2000);
    }
}



function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
        if (o){
                func.clickObject(o);
        
        }
        o = textMatches('好的').visibleToUser().findOnce() || descMatches('好的').visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
        }

        if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
            func.back();
            sleep(3000)
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
