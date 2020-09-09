
/**
 * 适配1.07.0.1104.2148
 * 2019.11.25适配1.08.2.1114.2141
 * 2019.11.27适配1.09.0.1125.1710
 * 2019.11.30适配1.10.0.1128.2318
 * 2019.12.06适配1.10.1.1203.1555
 * 
 */

const appname = '彩蛋视频';
const package = 'com.jifen.dandan'; 

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
        var s = Number(classModule.sec) || 15;
        if (s < 10)  s = 10
        var o = func.execApp(appname,package,s * 1e3,"text('关注').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            thread.interrupt(); 
            minutes = 0;
            return; //退出函数
        }
    }

    //在这里读取微鲤的配置文件
    var cfg = func.loadConfig(appname);
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date() .toLocaleDateString();
    
    if (lastdate != nowdate){    //是新的一天
        lastdate = nowdate;
        cfg.lastdate = lastdate
    }
    func.openWaiting(['.WelcomeActivity']);
    var o = packageName(package).textMatches('分享|发现').visibleToUser().findOne(15000);
    sign();
    doTask();
    try{
        var idx = 0;
        var bol = true;
        while(bol){
            closeDialog()
            func.checkSpace();  //检测一次存储空间
            if (!packageName(package).text('关注').visibleToUser().exists() && !id(package + ':id/iv_ugc_enter').visibleToUser().exists()){
                o = id(package + ':id/tv_tab_home_page').visibleToUser().findOnce();
                if (o){
                    log(11)
                    this.func.clickObject(o);
                    this.func.sleep(2000)
                }
                else{
                    if (currentPackage().toLowerCase() != package.toLowerCase()){
                        func.restart(appname,package);
                    }
                    else{
                        func.back();
                        this.func.sleep(2000)
                    }
                }
            }

            idx++;
            var o;

            o= id(package + ':id/fl_ad_container').findOnce();
            if (o || textMatches(' *(打开应用|立即下载|查看详情) *').exists()){ //当前是广告
                o = id(package + ':id/tv_ad_red_pack_status').text('立即领取').visibleToUser().findOnce();
                if (o){
                    this.func.clickObject(o);
                    this.func.sleep(200);
                }
                func.swipeUp(0,0,random(301,330));
                this.func.sleep(1000);
            }
            var sec = random(me.minVideoSec,me.maxVideoSec);
            func.toast('视频随机播放时间' + sec + '秒',2)
            //func.sleep(sec * 1000);  
            func.videoSleep(sec);

            o = text('立刻翻倍').visibleToUser().findOnce() || desc('立刻翻倍').visibleToUser().findOnce();
            if (o){
                this.func.clickObject(o);
                this.func.sleep(2000);
                func.sleep(60000,"翻倍中","packageName('" + package + "').textMatches('领取福利" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                closeDialog()
                closeDialog()
                // o = packageName(package).textMatches('点击重播|领取福利').visibleToUser().findOnce();
                // if (o){
                //     func.back();
                //     func.sleep(2000);
                // }
            }
            if (func.doConcern) func.doConcern(id(package + ':id/btn_follow_text').visibleToUser())

            if (textStartsWith('领金币宝箱').visibleToUser().exists() || descStartsWith('领金币宝箱').visibleToUser().exists()){
                o = textStartsWith('领金币宝箱').visibleToUser().findOnce() || descStartsWith('领金币宝箱').visibleToUser().findOnce();
                this.func.clickObject(o);
                func.sleep(2500);
            }
            func.swipeUp(0,0,random(301,330));

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
            }
            else{
                //if (idx % 15 == 0 && func.release <= 7 && func.is2GMemory)
                //    func.restart(appname,package);
                //else 
                if (idx % 5 == 0)
                    func.toast(appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟',2)
            }
        }

        if (this.autoR == 0) autoRedraw();
        doTask();
    }
    catch(e){
        log(e.message + e.stack)
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack)
    }
    finally{
        thread.interrupt(); //结束弹出窗口的线程检测
    }
    func.log(appname,'完成时间',"**********************************************************");
    func.quit(package)
}

function autoRedraw(){
    var ii = 5;
    while(!packageName(package).text('关注').visibleToUser().exists() && ii-- > 0){
        func.back();
        func.sleep(2000);
    }
    func.sleep(2000);

    //var o = idMatches(package + ':id/(iv_user_avatar|img_user_avator)').visibleToUser().filter(function(w){return w.bounds().bottom < 300}).findOne(5000);
    func.toast('准备开始提现',1);
    var o = idMatches(package + ':id/(tv_task_status|image_red_bg_icon)').visibleToUser().findOne(10000);
    if (o){
        func.clickObject(o)
        func.sleep(3000);
    
        var mymoneyobj = textMatches('约[0-9.]+元').visibleToUser().findOne(15000);
        if (!mymoneyobj)
            mymoneyobj = descMatches('约[0-9.]+元').visibleToUser().findOnce();
        if (mymoneyobj){
            var mymoney = 0;
            if (mymoneyobj.text() != '')
                mymoney = Number(mymoneyobj.text().replace('约','').replace('元','').trim()) || 0;
            else if (mymoneyobj.desc() != null) 
                mymoney = Number(mymoneyobj.desc().replace('约','').replace('元','').trim()) || 0;
            if (mymoney >= 0.3){
                func.clickObject(mymoneyobj);
                func.sleep(3000);
                click(device.width - 1,device.height - 1)
                func.sleep(1000); 
                o = packageName(package).text('立即提现').visibleToUser().findOne(10000) ||  packageName(package).desc('立即提现').visibleToUser().findOnce();
    
                var finds = packageName(package).textMatches(/[.0-9]* 元|0.3/).filter(function(w){return (Number(w.text().replace('元','').trim()) || 0) <= mymoney}).visibleToUser().find();
                if (finds.length == 0)
                    finds = packageName(package).descMatches(/[.0-9]* 元|0.3/).filter(function(w){return (Number(w.desc().replace('元','').trim()) || 0) <= mymoney}).visibleToUser().find();
                if (finds.length > 0){
                    for(var ii = finds.length -1; ii >= 0; ii--){
                        var o = finds[ii];
                        func.clickObject(o);
                        func.sleep(2000);   //点击，看是否能提现（签到天数够)

                        if (textMatches('.*(未满足).*').visibleToUser().exists() || descMatches('.*(未满足).*').visibleToUser().exists()){
                            func.toast('未满足条件',1);
                        }
                        else{
                            btn = packageName(package).textMatches(' *立即提现 *').visibleToUser().findOnce() || packageName(package).descMatches(' *立即提现 *').visibleToUser().findOnce();
                            if (btn){
                                func.clickObject(btn)
                                func.sleep(3000);

                                o = textMatches('知道了|立即赚钱').visibleToUser().findOnce() || descMatches('知道了|立即赚钱').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o);
                                    func.sleep(2000);
                                }
                                else if (!text('我的钱包').visibleToUser().exists() && !desc('我的钱包').visibleToUser().exists()){
                                    func.sleep(100000,"提现中","idMatches('.*close.*').visibleToUser().exists() || textMatches('我的钱包|点击重播').visibleToUser().exists() || descMatches('我的钱包|点击重播').visibleToUser().exists()");
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            else
                func.toast('金额不足，不能提现！',1);
            func.back();
        }
    }
}

function doTask(){
    var dt = Date.now();
    var ii = 5;
    while(!packageName(package).text('关注').visibleToUser().exists() && ii-- > 0){
        var o = id(package + ':id/tv_tab_home_page').visibleToUser().findOnce();
        if (o){
            this.func.clickObject(o);
        }
        else
            func.back();
        func.sleep(2000);
    }

    o = idMatches(package + ':id/(tv_task_status|image_red_bg_icon)').visibleToUser().findOne(10000);
    if (o){
        func.clickObject(o);
        func.sleep(8000);
            
        o = packageName(package).textStartsWith('canncel').visibleToUser().findOnce()
        if (o){
            func.clickObject(o);
            func.sleep(2000);
        }

        o = packageName(package).textMatches('看视频再送[0-9]*金币').visibleToUser().findOnce() ||  packageName(package).descMatches('看视频再送[0-9]*金币').visibleToUser().findOnce()
        if (o){
            func.clickObject(o)
            func.sleep(60000,"观看视频领金币中","textMatches('邀请好友再赚38元|我的金币').visibleToUser().exists() || descMatches('邀请好友再赚38元|我的金币').visibleToUser().exists()");
            o = packageName(package).text('邀请好友再赚38元').visibleToUser().findOnce() ||  packageName(package).desc('邀请好友再赚38元').visibleToUser().findOnce();
            if (o){
                func.back();
                func.sleep(2000);
            }

            o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce()
            if (o){
                if (!text('立刻翻倍').visibleToUser().exists() && !desc('立刻翻倍').visibleToUser().exists())
                    func.clickObject(o)
            }
        }
        
        // func.sleep(1000);   //packageName(package).text('cpc').visibleToUser().findOnce() || 
        // o = packageName(package).className('android.widget.Image').visibleToUser().filter(function(w){return w.indexInParent() == 5;}).findOne(50000);
        // if (o){
        //     func.clickObject(o);
        //     func.sleep(4000);
        //     click(device.width - 1,device.height - 1)
        //     func.sleep(1000);

        //     var n = 0;
        //     o = packageName(package).textMatches('还有[ 0-9]+次机会').visibleToUser().findOne(8000) || packageName(package).descMatches('还有[ 0-9]+次机会').visibleToUser().findOne(10000);
        //     if (o){
        //         if (o.text() != '')
        //             n = Number(o.text().replace('还有','').replace('次机会','').trim()) || 0;
        //         else
        //             n = Number(o.desc().replace('还有','').replace('次机会','').trim()) || 0;
        //     }
        //     while (n-- > 0){
        //         if (Date.now() - dt > 7 * 60 * 1000)    return;
        //         o = packageName(package).textMatches(' *瓜分ta *').visibleToUser().findOnce() || packageName(package).descMatches(' *瓜分ta *').visibleToUser().findOnce();
        //         if (o){
        //             func.clickObject(o);
        //             func.sleep(3000);
        //             func.sleep(60000,"瓜分金币中","packageName('" + package + "').textMatches('点击重播|瓜分金币|领取福利').visibleToUser().exists()");
        //             closeDialog();
        //         }
        //         func.sleep(3000);
        //         o = packageName(package).textMatches('还有[ 0-9]*次机会').visibleToUser().findOnce() || packageName(package).descMatches('还有[ 0-9]*次机会').visibleToUser().findOnce();
        //         if (o){
        //             if (o.text() != '')
        //                 n = Number(o.text().replace('还有', '').replace('次机会', '').trim()) || 0;
        //             else
        //                 n = Number(o.desc().replace('还有', '').replace('次机会', '').trim()) || 0;
        //         }                    
        //     }

        //     func.back();
        //     func.sleep(3000);
        // }

        var n = 10;
        while(n-- > 0){
            if (Date.now() - dt > 7 * 60 * 1000)    return;
            o = packageName(package).textMatches('收金币|补签|翻倍').visibleToUser().findOnce() || packageName(package).descMatches('收金币|补签|翻倍').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
                func.sleep(2000)
                o = text('观看小视频').visibleToUser().findOnce() || desc('观看小视频').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(2000);
                }
                // func.sleep(60000,"观看视频收金币中","packageName('" + package + "').textMatches('点击重播|我的金币|领取福利').visibleToUser().exists()");
                func.sleep(60000,"观看视频收金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('我的金币|领取福利|" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            
            }
            closeDialog();
        }

        o = text('勋章殿堂').visibleToUser().findOne(3000) || desc('勋章殿堂').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(4000);
            ii = 15;
            do{
                o = text('待领取').visibleToUser().findOnce() || desc('待领取').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                    func.sleep(4000)
                    if (!text('待领取').visibleToUser().exists() || desc('待领取').visibleToUser().exists()){
                        // func.sleep(60000,'勋章殿堂领取中',"textMatches('点击重播|我的金币|领取福利').visibleToUser().exists()");
                        func.sleep(60000,"勋章殿堂领取中","idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('我的金币|领取福利|" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
            
                    }
                    closeDialog();
                }
                else{
                    break;
                }
            }
            while(ii-- > 0)
            func.back();
            func.sleep(2000);
        }
    }
    
    var ii = 5;
    while(!packageName(package).text('关注').visibleToUser().exists() && ii-- > 0){
        func.back();
        func.sleep(2000);
    }

    if (!packageName(package).text('关注').visibleToUser().exists()){
        func.restart(appname,package);
    }
}

function closeDialog(){

    
    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }



    if (packageName(package).textMatches(keys).filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()){
        func.back();
        func.sleep(3000);
    }

    o = packageName(package).textStartsWith('canncel').visibleToUser().findOnce()
    if (o){
        func.clickObject(o);
        func.sleep(2000)
    }
    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        func.clickObject(o)
        func.sleep(2000)
    }
    o = className('ImageView').filter(function(w){return (w.id() == null || w.id() == '') && (w.desc() == null || w.desc() == '') && (w.text() == null || w.text() == '');}).visibleToUser().find()
    if (o.length == 1){
        func.clickObject(o[0])
        func.sleep(2000);
    }
}

function sign(){
    try{
        var o = idMatches(package + ':id/(img_user_avator|iv_user_avator)').findOnce(1);
        if (o){
            func.clickObject(o)
            func.sleep(2000);
            
            o = id(package + ':id/personal_head_sign').findOnce();  //签到有惊喜
            if (o){
                if (o.text() != null && o.text() != '已签到'){
                    func.clickObject(o);
                    func.sleep(5000)
                    func.back();
                    func.sleep(1000);
                }
            }
            closeDialog()
            // o = packageName(package).textMatches('看视频再送[0-9]*金币').visibleToUser().findOnce()
            // if (o){
            //     func.clickObject(o)
            //     func.sleep(3000)
            //     // func.sleep(60000,"观看视频领金币中","packageName('" + package + "').textMatches('邀请好友再赚38元|我的金币').visibleToUser().exists()");
            //     func.sleep(60000,"观看视频领金币中","idMatches('.*:id/.*close.*').visibleToUser().exists() || packageName('邀请好友再赚38元|我的金币|领取福利|" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                
            //     func.back();
            //     func.sleep(3000);
            // }
            closeDialog()
        }
        func.back();
    }
    catch(e){
        func.log(appname,'签到',e.message + '\n\r' + e.stack)
    }
}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        func.hasDialog();
        if (currentActivity().indexOf('AlertDialog') > 0){
            func.back();
            func.sleep(500)
        }
        else if (currentActivity().indexOf("RedPacketRainWebViewActivity") > 0){
            func.back();
            func.sleep(10);
            func.back();
            func.sleep(500);
        }
        else if (currentActivity().indexOf("upgrade") > 0){
            func.back();
            func.sleep(1000)
        }
        
        var o = idMatches(package + ':id/(.*close.*|close_bottom_button_layout|tv_upgrade_cancel)').visibleToUser().findOnce();
        if (o) {
            if (!text('立刻翻倍').visibleToUser().exists() && !desc('立刻翻倍').visibleToUser().exists())
                func.clickObject(o)
        }

        o = packageName(package).textStartsWith('canncel').visibleToUser().findOnce() || textMatches('放弃金币').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
        }
        
        o = packageName(package).textMatches('点击重播|领取福利').visibleToUser().exists();
        if (o){
            func.back();
        }
        o = className('ImageView').filter(function(w){return (w.id() == null || w.id() == '') && (w.desc() == null || w.desc() == '') && (w.text() == null || w.text() == '');}).visibleToUser().find()
        if (o.length == 1){
            func.clickObject(o[0])
        }
        o = packageName(package).textMatches('我知道了|放弃奖励').visibleToUser().findOnce()
if (o){
    func.clickObject(o);
    func.sleep(1000);
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