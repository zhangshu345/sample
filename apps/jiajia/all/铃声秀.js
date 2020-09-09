const appname = '铃声秀';
const package = 'com.zheyun.bumblebee.lsx';

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
    func.toast('' + appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package){
        var s = Number(classModule.sec) || 15;
        if (s < 10)  s = 10
        var o = func.execApp(appname,package,s * 1e3)
        if (!o){
            toast('' + "没有找到" + appname);
            thread.interrupt(); 
            return; //退出函数
        }
    } 

    func.openWaiting(['.FrameLayout','.SplashActivity'])
    sign()
    var x = device.width / 2;
    var y = device.height / 2;
    try{
        var idx = 1;
        var bol = true;

        while(bol){
            func.checkSpace();  //检测一次存储空间
            if (!packageName(package).text('探索').visibleToUser().exists()){
                o = packageName(package).text('铃声').visibleToUser().findOnce()
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
                        func.sleep(2000);
                    }
                }
            }
            idx++;

            var sec = random(me.minVideoSec,me.maxVideoSec);
            func.sleep(sec * 1000,"视频播放中","textMatches('看视频再领.*金币|看视频.*金币再翻.*').visibleToUser().exists()");

            var o = packageName(package).textMatches('看视频再领.*金币|看视频.*金币再翻.*').visibleToUser().findOnce();
            if (o){
                this.func.sleep(1000);
                this.func.clickObject(o);
                this.func.sleep(2000);
                func.sleep(60000,"看视频再领金币中","idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播').visibleToUser().exists()")
                closeDialog()
            }
            swipe(random(x - 100,x - 50),random(y + 300,y + 400), random(x - 100,x - 50), random(y - 300,y - 400),10)

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
    o = packageName(package).textMatches('BSBDZ.*').visibleToUser().findOnce();
    if (o){
        func.clickObject(o);
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

        o = packageName(package).textMatches('提现|去提现').visibleToUser().findOne(6000) || packageName(package).descMatches('提现|去提现').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(3000);

            var money = 0;
            o = packageName(package).textMatches('约[0-9.]*元').visibleToUser().findOne(10000)
            if (o)
                money = Number(o.text().replace('约','').replace('元','')) || 0;
            else{
                o = packageName(package).descMatches('约[0-9.]*元').visibleToUser().findOnce();
                if(o) money = Number(o.desc().replace('约','').replace('元','')) || 0;
            }
            func.toast('金额:' + money,1)
            if (money >= 0.3){
                var btn = packageName(package).text('立即提现').visibleToUser().findOne(8000) || packageName(package).desc('立即提现').visibleToUser().findOnce();
                var btns = packageName(package).textEndsWith('元').visibleToUser().filter(function(w){
                    var r = Number(w.text().replace('元','').trim()) || 0;
                    return r > 0 && r <= money;
                }).find();
                if (btns.length == 0)
                    btns = packageName(package).descEndsWith('元').visibleToUser().filter(function(w){
                        var r = Number(w.desc().replace('元','').trim()) || 0;
                        return r > 0 && r <= money;
                    }).find();
                for(var i = btns.length - 1; i >= 0; i--){
                    func.clickObject(btns[i]);
                    func.sleep(2000);

                    var btn = packageName(package).text('立即提现').visibleToUser().findOnce() || packageName(package).desc('立即提现').visibleToUser().findOnce();
                    if (btn){
                        func.clickObject(btn)
                        func.sleep(3000);
                        
                        if (!text('立即提现').visibleToUser().exists() && !desc('立即提现').visibleToUser().exists()){
                            if (textMatches('.*更懂你').visibleToUser().exists() || descMatches('.*更懂你').visibleToUser().exists()){
                                o = text('男').visibleToUser().findOnce() || desc('男').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o);
                                    func.sleep(1000);
                                }
                                o = text('上班族').visibleToUser().findOnce() || desc('上班族').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o);
                                    func.sleep(1000);
                                }
                                o = textMatches('领取.*金币').visibleToUser().findOnce() || descMatches('领取.*金币').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o);
                                    func.sleep(3000);
                                    break;
                                }
                            }
                            else{
                                func.sleep(60000,'提现视频观看中',"idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('点击重播').visibleToUser().exists()");
                                closeDialog();
                            }
                        }
                    }
                }
            }
            else{
                func.toast('余额不足，不能提现',1);
            }
        }
        else{
            func.toast('未进入到提现界面',1);
        }
    }
}

function sign(){
    try{
        o  = packageName(package).text('任务').visibleToUser().findOnce();
        if (o){
            func.clickObject(o)
            func.sleep(10000,'等待中',"textMatches('勋章殿堂|我的金币|看视频.*奖励翻倍.*').visibleToUser().exists() || descMatches('勋章殿堂|我的金币').visibleToUser().exists()");

            o = textMatches('看视频.*奖励翻倍.*').visibleToUser().findOne(1000);
            if (o){
                func.clickObject(o);
                func.sleep(2000);
                func.sleep(60000,"领币中","packageName('" + package + "').textMatches('点击重播|我的').visibleToUser().exists()")
                closeDialog()
            }

            ii = 3;
            while(ii-- > 0){
                o = textMatches('领取时段奖励|幸运金币|立即领取|领取').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                    o = textMatches('看视频最高翻.*|看视频再领.*|看视频.*金币再翻.*').visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o);
                        func.sleep(2000);
                    }
                    func.sleep(60000,"领币中","packageName('" + package + "').textMatches('点击重播|我的').visibleToUser().exists()")
                    closeDialog()
                }
            }

            o =  textMatches('立即瓜分金币').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(4000);
                if (text('瓜分金币').visibleToUser().exists()){
                    var n = 7;
                    while (n-- > 0){
                        o = packageName(package).text('瓜分Ta').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o);
                            func.sleep(2000);
                            func.sleep(60000,"瓜分金币中","packageName('" + package + "').textMatches('点击重播|瓜分金币').visibleToUser().exists()");
                            closeDialog();

                            ii = 30
                            while(textMatches('瓜分倒计时.*').visibleToUser().exists() && ii-- > 0){
                                func.toast('等待中',1);
                                func.sleep(2000);
                            }
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
            
            o =  textMatches('勋章殿堂').visibleToUser().findOne(3000) || descMatches('勋章殿堂').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(4000);
                if (textMatches('待领取勋章|今日挑战').visibleToUser().exists() || descMatches('待领取勋章|今日挑战').visibleToUser().exists()){
                    var n = 7;
                    while (n-- > 0){
                        o = packageName(package).text('可领取').visibleToUser().findOnce() || packageName(package).desc('可领取').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o);
                            func.sleep(2000);
                            func.sleep(60000,"勋章殿堂领取中","textMatches('点击重播|勋章殿堂').visibleToUser().exists() || descMatches('点击重播|勋章殿堂').visibleToUser().exists()");
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

        o  = packageName(package).text('铃声').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
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
            if (!packageName(package).textMatches('看视频再领.*金币|看视频.*金币再翻.*|看视频.*奖励翻倍.*').visibleToUser().exists() && !packageName(package).descMatches('看视频再领.*金币|看视频.*金币再翻.*').visibleToUser().exists())
                func.clickObject(o);
        }

        o = packageName(package).textMatches('继续播放|放弃金币|以后更新|放弃奖励').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
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