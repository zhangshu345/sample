const appname = '94新';
const package = 'com.haozhuan.scriptnew';


var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
// classModule.noDouyin = 0; //默认做抖音，为1不做
classModule.noDouyin = 1; //默认做抖音，为1不做
classModule.nokuaishou = 0; //默认做快手，为1不做
classModule.noComment = 0; //默认做评论，为1不做
classModule.noCheckFavorite = 0; //为1不验证点赞有效性
classModule.noConcern = 0;  //为1就不做关注
classModule.waitingVerifyCode = 0;  //额外等秒时长
classModule.func = null;




var keys = '下载|点击重播|点击下载|点击打开|关闭';
classModule.start = function () {
    var me = this;
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes, this.maxMinutes);   //生成运行时间
    // minutes = 5
    have_dy = false
    have_hs = false
    hs_package = 'com.ss.android.ugc.live'
    dy_package = 'com.ss.android.ugc.aweme'
    have_dy = app.getAppName(dy_package)
    have_hs = app.getAppName(hs_package)
    if(!have_dy && !have_hs){
        toast("没有安装对应软件 退出该任务")
        console.log("没有安装对应软件 退出该任务");
        return
    }
    if (this.noDouyin == 1 && this.nokuaishou == 1){
        this.func.toast('抖音和火山都不做，直接退出66任务',1);
        return;
    }
    s_tt = new Date()
    log(appname,'---开始---'  + s_tt.getHours() + ':' + s_tt.getMinutes() + ':' + s_tt.getSeconds());


    func.log(appname, '启动，预计运行：' + minutes, "**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分', 2)
    var startDate = new Date(); //启动时间
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    if (currentPackage() != package) {
        var o = func.execApp(appname, package, 15000, "textMatches('自动').visibleToUser().exists()")
        if (!o) {
            toast("没有找到" + appname);
            thread.interrupt();
            return; //退出函数
        }
    }

    func.openWaiting();

    var x = device.width / 2;
    var y = device.height / 2;

    try {
        result = sign()
        if(result){
            var idx = 1;
            var bol = true;
            var trs = 0;
            num = 0
            while (bol) {
    
                var datediff = new Date().getTime() - startDate.getTime();
                // log("94执行剩余:"+(minutes-parseInt(datediff/60/1000))+"分")
                if (datediff > minutes * 60 * 1000) {
                    bol = false;
                    func.toast('' + appname + '运行完成', 2)
                }
                else {
                    if (idx % 10 == 0)
                        func.toast('' + appname + '已运行' + parseInt(datediff / 1000 / 60) + '分钟', 2)
                        log("94执行剩余:"+(minutes-parseInt(datediff/60/1000))+"分")

                }
                sleep(30000)
            }
            // if (this.autoR == 0) autoRedraw();
        }
    }
    catch (e) {
        func.log(appname, '循环执行', e.message + '\n\r' + e.stack);
    }
    finally {
        exit_app()
        thread.interrupt(); //结束弹出窗口的线程检测

    }
    func.log(appname, '结束时间', "**********************************************************");
    func.quit(package);
}

function closeDialog() {

    var o = text('关闭广告|我知道了|关闭').visibleToUser().findOnce();
    if (o) {
        // log(0)
        func.clickObject(o);
        func.sleep(2000);
    }

    o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
    if (o) {
        // log(1)
        func.clickObject(o);
        func.sleep(1000);
    }

    if (packageName(package).textMatches(keys).filter(function (w) { if (w.text() == '点击下载' && w.bounds().bottom > device.height * 0.8) { return false } else { return true } }).visibleToUser().exists()) {
        // log(3)
        func.back();
        func.sleep(3000);
    }
}

function autoRedraw() {
    toast("开始提现")
    refresh()
    var o = packageName(package).textMatches('我的').visibleToUser().findOne(3000);
    if (o) {
        func.clickObject(o)
        func.sleep(10000, '等待中', "textMatches('我的勋章|提现').visibleToUser().exists() || descMatches('我的勋章|提现').visibleToUser().exists()");
        sleep(3000)
        have_moey_bs = id('tv_person_money').findOnce()
        if (have_moey_bs) {
            have_moey = have_moey_bs.text()
            log(have_moey)
            if (have_moey < 0.3) {
                toast("余额不足")
            } else {
                var o = textMatches('提现').visibleToUser().findOnce() || descMatches('提现').visibleToUser().findOnce()
                if (o) {
                    func.clickObject(o)
                    func.sleep(10000, '等待中', "textMatches('立即提现').visibleToUser().exists() || descMatches('立即提现').visibleToUser().exists()");
                    sleep(3000)
       
                    if (have_moey >= 5) {
                        have_moey = "5元"
                    } else if (have_moey >= 1) {
                        have_moey = "5元"
                    } else if (have_moey >= 0.3) {
                        have_moey = "0.3元"
                    }
                    
                    if (money_num) {
                    
                        var o = textMatches(have_moey).visibleToUser().findOnce() || descMatches(have_moey).visibleToUser().findOnce()
                        if (o) {
                            func.clickObject(o)
                            sleep(2000)
                            var o = textMatches('立即提现').visibleToUser().findOnce() || descMatches('立即提现').visibleToUser().findOnce()
                            if (o) {
                                func.clickObject(o)
                                func.sleep(10000, '等待中', "textMatches('立即提取').visibleToUser().exists() || descMatches('立即提取').visibleToUser().exists()");
                                sleep(2000)
                                x = textMatches('立即提取').visibleToUser().findOnce() || descMatches('立即提取').visibleToUser().findOnce();
                                if (x) {
                                    func.clickObject(x);
                                    func.sleep(60000, "提现视频观看中", "idMatches('" + package + ":id/.*close.*').visibleToUser().exists() || packageName('" + package + "').textMatches('" + keys + "').filter(function(w){if (w.text()=='点击下载' && w.bounds().bottom > device.height*0.8){return false}else{return true}}).visibleToUser().exists()");
                                    closeDialog()
                                    sleep(5000)
                                }
                            }
                        }
                    }
    
    
                }
            }
        }
    } else {
        toast("查询余额失败")
    }
}

function up_app(){
    o = textMatches('立即下载').visibleToUser().findOnce() || descMatches('立即下载').visibleToUser().findOnce()
    if(o){
        func.clickObject(o);
        func.sleep(3200);
    }

    o = textMatches('打开方式').visibleToUser().findOnce() || descMatches('打开方式').visibleToUser().findOnce()
    if(o){
        // log("选择打开方式")
        o = textMatches('浏览器|小米浏览器|.*浏览器').visibleToUser().findOnce() || descMatches('浏览器|小米浏览器|.*浏览器').visibleToUser().findOnce()
        if(o){
            // log(o)
            func.clickObject(o);
            func.sleep(3200);
        }
        o = textMatches('总是').visibleToUser().findOnce() || descMatches('总是').visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
            func.sleep(3200);
        }
    }

    func.sleep(30000, '等待弹出下载那妞', "textMatches('直接下载|立即下载|普通下载').visibleToUser().exists() || descMatches('直接下载|立即下载|普通下载').visibleToUser().exists()");
    o = textMatches('直接下载|立即下载|普通下载').visibleToUser().findOnce() || descMatches('直接下载|立即下载|普通下载').visibleToUser().findOnce()
    if(o){
        func.clickObject(o);
        func.sleep(3200);
    }else{
        return false
    }
    func.sleep(60000, '等待中下载完成', "textMatches('安装').visibleToUser().exists() || descMatches('安装').visibleToUser().exists()");
    o = textMatches('安装').visibleToUser().findOnce() || descMatches('安装').visibleToUser().findOnce()
    if(o){
        func.sleep(3200);
        func.clickObject(o);
        func.sleep(3200);
    }else{
        return false
    }

    func.sleep(20000, '等待安装完成', "textMatches('完成|打开|安装').visibleToUser().exists() || descMatches('完成|打开|安装').visibleToUser().exists()");
    o = textMatches('安装').visibleToUser().findOnce() || descMatches('安装').visibleToUser().findOnce()
    if(o){
        func.sleep(5000);
        func.clickObject(o);
        func.sleep(3200);
    }
    func.sleep(20000, '等待安装完成', "textMatches('完成|打开|安装').visibleToUser().exists() || descMatches('完成|打开|安装').visibleToUser().exists()");
    xx = textMatches('安装').visibleToUser().findOnce() || descMatches('安装').visibleToUser().findOnce()
    if(xx){
        func.sleep(5000);
        // click(xx.bounds().centerX(), xx.bounds().centerY());
        func.clickObject(xx);
        func.sleep(3200);
    }
    func.sleep(20000, '等待安装完成', "textMatches('完成|打开|安装').visibleToUser().exists() || descMatches('完成|打开|安装').visibleToUser().exists()");
    yy = textMatches('安装').visibleToUser().findOnce() || descMatches('安装').visibleToUser().findOnce()
    if(yy){
        // log("安装3")
        func.sleep(5000);
        // click(yy.bounds().centerX(), yy.bounds().centerY());
        func.clickObject(yy);
        func.sleep(3200);
    }
    
    o = textMatches('完成|打开').visibleToUser().findOnce() || descMatches('完成|打开').visibleToUser().findOnce()
    if(o){

        return true
    }else{
        return false
    }
}

function refresh(){
    sleep(5000)
    can_up = true
    var ii = 7;
    // while(ii-- > 0 && !textMatches('自动|立即下载').visibleToUser().exists()){
    while(ii-- > 0 ){
        closeDialog()
        o = textMatches('立即下载').visibleToUser().findOnce() || descMatches('立即下载').visibleToUser().findOnce()
        if(o){
            if(can_up){
                can_up = up_app()
                func.restart(appname, package)
            }
        }
        if (currentPackage().toLowerCase() != package.toLowerCase()) {
            // log("开始返回")
            func.back();
            func.sleep(3200);
        }

        if(ii<5){
            func.sleep(3200);
            if (currentPackage().toLowerCase() != package.toLowerCase()) {
                func.restart(appname, package)
            }
        }
        o = textMatches('自动|立即下载').visibleToUser().exists()
        if(o){
            break
        }
    }

    o = textMatches('下次再说').visibleToUser().findOnce() || descMatches('下次再说').visibleToUser().findOnce()
    if(o){
        func.clickObject(o);
        func.sleep(3200);
    }
    o = textMatches('自动').visibleToUser().findOnce() || descMatches('自动').visibleToUser().findOnce()
    if(o){
        if(!o.selected()){
            func.clickObject(o);
            sleep(3000)
        }
    }
}

function sign() {
    refresh()
    o = textMatches('无障碍服务 关闭').visibleToUser().findOnce() || descMatches('无障碍服务 关闭').visibleToUser().findOnce()
    if (o) {
        // log("无障碍关闭 需要打开")
        func.clickObject(o);
        func.sleep(4000);

        o = textMatches('更多已下载的服务').visibleToUser().findOnce() || descMatches('更多已下载的服务').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            func.sleep(4000);
        }
        o = textMatches('94新').visibleToUser().findOnce() || descMatches('94新').visibleToUser().findOnce()
        if (o) {
            func.clickObject(o);
            func.sleep(4000);
        }
        o = textMatches('.*若关闭则只能执行不涉及自动操作的脚本.*').visibleToUser().findOnce() || descMatches('.*若关闭则只能执行不涉及自动操作的脚本.*').visibleToUser().findOnce()
        if (o) {
            // log("到达无障碍开关界面")
            o = checked(true).findOnce()
            if (!o) {
        
                o = textMatches('开启服务|使用服务').visibleToUser().findOnce() || descMatches('开启服务|使用服务').visibleToUser().findOnce()
                if (o) {
                    yy = o.bounds().centerY()
                    click(device.width * 0.9, yy)
                    func.sleep(3200);
                    o = textMatches('确定|同意|允许').visibleToUser().findOnce() || descMatches('确定|同意|允许').visibleToUser().findOnce()
                    if (o) {
                        func.clickObject(o);
                        func.sleep(3200);
                    }
                }
            }else{
                log("检测异常")
            }
            // o = checked(true).findOnce()
            // if (o) {
            //     log("打开了无障碍")
        
            // }
        }
        refresh()
    }

    hs_package = 'com.ss.android.ugc.live'
    dy_package = 'com.ss.android.ugc.aweme'
    have_dy = app.getAppName(dy_package)
    have_hs = app.getAppName(hs_package)
    if(!have_dy || classModule.noDouyin == 1){
        // log("缺少抖音,不跑抖音")
        o = textMatches('D音关注').visibleToUser().findOnce() || descMatches('D音关注').visibleToUser().findOnce()
        if(o){
          if(o.checked()){
                func.clickObject(o);
                func.sleep(3200); 
          }
        }
        o = textMatches('D音点赞').visibleToUser().findOnce() || descMatches('D音点赞').visibleToUser().findOnce()
        if(o){
            if(o.checked()){
                  func.clickObject(o);
                  func.sleep(3200); 
            }
          }
    }
    if(have_dy && classModule.noDouyin != 1){
        o = textMatches('D音关注').visibleToUser().findOnce() || descMatches('D音关注').visibleToUser().findOnce()
        if(o){
          if(!o.checked()){
                func.clickObject(o);
                func.sleep(3200); 
          }
        }
        o = textMatches('D音点赞').visibleToUser().findOnce() || descMatches('D音点赞').visibleToUser().findOnce()
        if(o){
            if(!o.checked()){
                  func.clickObject(o);
                  func.sleep(3200); 
            }
          }
    }

    if(!have_hs || classModule.nokuaishou == 1 ){
        // log("缺少火山,不跑火山")
        o = textMatches('H山关注').visibleToUser().findOnce() || descMatches('H山关注').visibleToUser().findOnce()
        if(o){
          if(o.checked()){
                func.clickObject(o);
                func.sleep(3200); 
          }
        }
        o = textMatches('H山点赞').visibleToUser().findOnce() || descMatches('H山点赞').visibleToUser().findOnce()
        if(o){
            if(o.checked()){
                  func.clickObject(o);
                  func.sleep(3200); 
            }
          }
    }

    if (have_hs && classModule.nokuaishou != 1) {
        // log("缺少火山,不跑火山")

        o = textMatches('H山关注').visibleToUser().findOnce() || descMatches('H山关注').visibleToUser().findOnce()
        if (o) {
            // log(o.checked())
            if (!o.checked()) {
                func.clickObject(o);
                func.sleep(3200);
            }
        }
        o = textMatches('H山点赞').visibleToUser().findOnce() || descMatches('H山点赞').visibleToUser().findOnce()
        if (o) {
            if (!o.checked()) {
                func.clickObject(o);
                func.sleep(3200);
            }
        }
    }
    
    
    o = textMatches('H山自动换号').visibleToUser().findOnce() || descMatches('H山自动换号').visibleToUser().findOnce()
    if(o){
        // log("暂时不支持换号")
        // log(o.checked())  
        if(o.checked()){
              func.clickObject(o);
              func.sleep(3200); 
        }
      }
    o = textMatches('K手关注').visibleToUser().findOnce() || descMatches('K手关注').visibleToUser().findOnce()
    if(o){
        // log("暂时不支持快手关注")
        // log(o.checked())  
        if(o.checked()){
            func.clickObject(o);
            func.sleep(3200); 
        }
    } 

    o = textMatches('运行 .*音量.*').visibleToUser().findOnce() || descMatches('运行 .*音量.*').visibleToUser().findOnce()
    if(o){
        func.clickObject(o);
        func.sleep(3200);
    }

    o = textMatches(appname).visibleToUser().findOnce() || descMatches(appname).visibleToUser().findOnce()
    if(o){
        log("权限出问题")
        toast("权限出问题")
        return false
    }
    o = textMatches('请先在个人中心登录').visibleToUser().findOnce() || descMatches('请先在个人中心登录').visibleToUser().findOnce()
    if(o){
        log("未登录 请先登录")
        toast("未登录 请先登录")
        sleep(500)
        o = textMatches('确定').visibleToUser().findOnce() || descMatches('确定').visibleToUser().findOnce()
        if(o){
            func.clickObject(o);
            func.sleep(3200);
        }
        return false
    }
    return true


    // o = textMatches(appname).visibleToUser().findOnce() || descMatches(appname).visibleToUser().findOnce()
    // if(o){
    //     return false
    // }
}

function exit_app(){

    var ii = 10;
    while (ii-- > 0) {

        func.home();
        func.clear();
        func.sleep(2000);
        app.openAppSetting(package);
        func.sleep(10000, '等待中', "textMatches('"+ appname +"').visibleToUser().exists() || descMatches('"+ appname +"').visibleToUser().exists()");
        sleep(3000)
        stop_button = textMatches('结束运行|强行停止|.*结束.*|.*强行.*').findOnce()
        if(stop_button){
            // log(stop_button.enable())
            // if(!stop_button.enable()){
            //     log("成功停止94")
            //     break
            // }
            func.clickObject(stop_button);
            func.sleep(2200);
            ok_button = textMatches('确定').findOnce()
            if(ok_button){
                func.clickObject(ok_button);
                func.sleep(2200);
            }

            stop_button = textMatches('结束运行|强行停止|.*结束.*|.*强行.*').findOnce()
            if(stop_button){
                
                log(stop_button.enabled())
                if(!stop_button.enabled()){
                    // log("成功停止94")
                    break
                }
            }



        }else{
            back()
            sleep(1500)
        }
    }
}

function hasDialog() {
    var func = classModule.func;
    setInterval(() => {
        // func.hasDialog();
        o = textMatches('.*允许').visibleToUser().findOnce();
        if (o) {
            xx = textMatches('.项允许').visibleToUser().findOnce();
            yy = textMatches(appname).visibleToUser().findOnce() || descMatches(appname).visibleToUser().findOnce()
            
            if(!xx && !yy){
                // log(100)
                func.clickObject(o);
                sleep(2000)
            }

        }
        o = textMatches('确定').visibleToUser().findOnce();
        if (o) {
            // log(200)
            func.clickObject(o);
            sleep(2000)
        }
        o = textMatches('立即开始').visibleToUser().findOnce();
        if (o) {
            // log(300)
            func.clickObject(o);
            sleep(2000)
        }
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

