const appname = '66联盟';
const package = 'com.toutiaozuqiu.and.liuliu';
var dypackage = 'com.ss.android.ugc.aweme';
var kspackage = 'com.smile.gifmaker';

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


var plButton = null;
var currentTarget = 1;  
var rootpath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_PICTURES).getPath() + '/Screenshots';

function refresh(){
    var ii = 7;
    while(ii-- > 0 && !textMatches('观看KS视频').visibleToUser().exists()){
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


function to_target(){

    refresh()
    o = packageName(package).textMatches('首页').findOnce()
    if (o){
        func.clickObject(o);
    }
    var ii = 5;
    while(ii-- > 0 && !textMatches('观看KS视频').visibleToUser().exists()){
        swipe(device.width * 0.2,device.height * 0.7,device.width * 0.75,device.height * 0.75,30);
        func.sleep(2300);
    }
    var ii = 5;
    while(ii-- > 0){
        var o = textMatches('观看KS视频').visibleToUser().findOnce() 
        if (o){
            // log(o)
            // func.clickObject(o);
            click(o.bounds().centerX(), o.bounds().centerY());
            func.sleep(10000, '进入任务中心...', "textMatches('咨询客服').visibleToUser().exists() ");
        }
        var o = text('咨询客服').visibleToUser().findOnce() 
        if (o){
            break
        }
    }


}
// to_target()

classModule.start = function(){
    toast("hahaha")
    log(11)
    log(this.noDouyin)
    log(this.nokuaishou)
    log(22)
    if (this.noDouyin == 1 && this.nokuaishou == 1){
        this.func.toast('抖音和快手都不做，直接退出66任务',1);
        return;
    }
    exit()
        // sleep(3000)
        // threads.start(function(){
        //     star_ing = text("立即开始").findOne(1000)
        //     if(star_ing){
        //         star_ing.click()
        //         return
        //     }
        // })
        // if (!requestScreenCapture()) {
        //     alert("请求截图权限失败！");
        //     return
        // }



    // if (this.noDouyin == 1 && this.nokuaishou == 1){
    //     this.func.toast('抖音和快手都不做，直接退出66任务',1);
    //     return;
    // }
    // try{
    //     var img = captureScreen();
    //     img.recycle();
    // }
    // catch(e){
    //     var hasPer = false;
    //     threads.start(function(){
    //         var o = text('立即开始').visibleToUser().findOne(15000);
    //         if (o){
    //             sleep(100);
    //             //log('成功请求到截图权限')
    //             click(o.bounds().centerX(),o.bounds().centerY());
    //         }
    //         else if (hasPer){
    //             //log('A处已成功获取权限')
    //         }
    //         else{
    //             alert('没有截屏权限，您可以尝试：\n1、悬浮窗里停止任务并重新启动\n2、给予自阅后台弹窗权限\n3、上述完成后还不行，尝试重启手机')
    //         }
    //     })

    //     requestScreenCapture()
    //     hasPer = true;
    // }
    sleep(2000)

    cfg = func.loadConfig(appname);
    log(cfg)
    var lastdate = cfg.lastdate || '';
    var nowdate = new Date() .toLocaleDateString();
    var ksgzLimited = Number(cfg.ksgzLimited) || 0;
    var ksdzLimited = Number(cfg.ksdzLimited) || 0;
    if (lastdate != nowdate){    //是新的一天
        lastdate = nowdate;
        cfg.lastdate = lastdate;
        cfg.ksgzLimited = 0;   //复位为初始
        cfg.ksdzLimited = 0;   //复位为初始
        this.func.saveConfig(appname,JSON.stringify(cfg))
    } 

    if(ksgzLimited>=30){
        toast("今日关注已经达到上限....跳过66联盟")
        return
    }
    var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口
    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间
    if (currentPackage() != package){
        // var o = func.execApp(appname,package,15000,"textMatches('检测到新版本.*|任务中心|首页').visibleToUser().exists()")
        var o = func.execApp(appname,package,15000,"textMatches('观看KS视频').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            return; //退出函数
        }else{
            sleep(2000)
        }
    }

    // hideLogo()
    // func.sleep(10000,"隐藏");
    // showLogo()
    // func.sleep(10000,"显示");
    // return
    try{
        to_target()
        var bol = true;
        var img1 = null, img2 = null, taskFinished = false,taskType = '';
        // if (this.noDouyin == 1) currentTarget = 1;  //不跑抖音，转快手
        var noTaskTimes = 0;
        no_work = 0
        while (bol) {



            toast("今日关注次数"+ksgzLimited)
            log("今日关注次数",ksgzLimited)
            sleep(1000)
            if(no_work >5 ){
                break
            }

            if(ksgzLimited>=30){
                toast("今日关注已经达到上限....跳过66联盟")
                bol = false
                break
            }
            o = textMatches('当前不需要帮忙.*').visibleToUser().findOnce();
            if(o){
                o = textMatches('确定').visibleToUser().findOnce();
                if(o){
                    func.clickObject(o)
                    // ksgzLimited +=1
                    func.sleep(10000, '当前无任务等待中..尝试次数:'+(no_work)+'次')
                    no_work += 1
                    continue
                }
            }

            o = !textMatches('咨询客服').visibleToUser().exists()
            if(o){
                to_target()
            }
            var noTask = false;



            keys = '.*关注'
            o = textMatches(keys).visibleToUser().findOnce();
            if(o){
                func.clickObject(o)
                func.sleep(10000, '等待中', "textMatches('当前不需要帮忙.*|去看看|确定|去验证|当前任务异常|.*我知道了.*|好的').visibleToUser().exists() ");
                o = textMatches('确定').visibleToUser().findOnce();
                if(o){
                    func.clickObject(o)
                    // func.sleep(10000, '当前无任务等待中....')
                    func.sleep(10000, '当前无任务等待中..尝试次数:'+(no_work)+'次')
                    // ksgzLimited +=1
                    no_work += 1
                    continue
                }
                o = textMatches('去验证|当前任务异常|.*我知道了.*').visibleToUser().findOnce();
                if(o){
                    toast("66任务异常")
                    break
                }
            }


            // 未知  保留原代码
            o = packageName(package).text('好的').visibleToUser().findOnce();
            if (o) {
                this.func.clickObject(o);
                this.func.sleep(2000);
                for (var i = 0; i < 6; i++) {
                    this.func.swipeUp();
                    this.func.sleep(500);
                }
                this.func.sleep(4000);

                o = packageName(package).text('开始做任务').visibleToUser().findOnce();
                if (o) {
                    func.clickObject(o);
                    func.sleep(2000);
                }
            }
            sleep(1000)
            o = textMatches('去看看').visibleToUser().findOnce() || descMatches('去看看').visibleToUser().findOnce()
            if (o) {
                func.clickObject(o)
                hideLogo();
                func.sleep(60000, "等待快手启动中....", "idMatches('" + kspackage + ":id/.*avatar.*|slide_play_right_follow_avatar_view').visibleToUser().exists() ");
                // func.sleep(10000, "等待快手启动中....");
                var ok = false;

                var followTrys = 5;
                while (followTrys-- > 0) {
                    sleep(1000)
                    toast("关注中....")
                    o = idMatches(kspackage + ':id/(follow_button_layout|avatar)').visibleToUser().findOnce();
                    if(o){
                        have_click = false
                        j = idMatches('.*follow_button_layout.*').visibleToUser().findOnce();
                        if (j) {
                            have_click = true
                            func.clickObject(j)
                            sleep(2000)
                        }
                        k = id(kspackage + ':id/avatar').visibleToUser().findOnce();
                        if (have_click && k) {
                            ok = true;
                            break
                        }
                    }
                    
                    o = idMatches(kspackage + ':id/(slide_play_right_follow_avatar_view|slide_play_right_follow_button)').visibleToUser().findOnce();
                    if(o){
                        have_click = false
                        j = idMatches('.*slide_play_right_follow_button.*').visibleToUser().findOnce();
                        if (j) {
                            have_click = true
                            func.clickObject(j)
                            sleep(2000)
                        }
                        k = id(kspackage + ':id/slide_play_right_follow_avatar_view').visibleToUser().findOnce();
                        // if (!j && k) {
                        if (have_click && k) {
                            ok = true;
                            break
                            
                        }
                    }

                }
                if (ok) {
                    ksgzLimited +=1
                    cfg.ksgzLimited = ksgzLimited; 
                    func.saveConfig(appname,JSON.stringify(cfg))
                    sleep(2000)
                    img1 = capture();
                    taskFinished = true
                    sleep(2000)

                } else if (followTrys <= 0) {  //连续五次尝试用完
                    // ksgzLimited = 41;
                    ksgzLimited +=3
                }
                showLogo()
                var ii = 5
                while (!textEndsWith('客服').visibleToUser().exists() && !textStartsWith('爆音').visibleToUser().exists() && !textMatches('提交任务|提交截图|我知道了').visibleToUser().exists() && !descMatches('提交任务|提交截图|我知道了').visibleToUser().exists() && ii-- > 0) {
                    this.func.back()
                    this.func.sleep(50);
                    this.func.back()
                    //log('返回一次')
                    this.func.sleep(4000);
                }

                if (!taskFinished && (textMatches('您的截图|提交').visibleToUser().exists() || descMatches('您的截图|提交').visibleToUser().exists())) { //没完成任务，且回到提交界面，要返回放弃
                    this.func.back();
                    this.func.sleep(2000);
                }
                // taskFinished = true
                if (taskFinished) {  //完成任务了，要提交
                    func.sleep(2000)
                    o = packageName(package).text('我知道了').visibleToUser().findOnce() || packageName(package).desc('我知道了').visibleToUser().findOnce();
                    if (o) {
                        this.func.clickObject(o)
                        this.func.sleep(2000);
                    }

                    o = textMatches('提交|提交任务|提交截图|上传截图|upload.*').visibleToUser().findOnce() || descMatches('提交|提交任务|提交截图|上传截图|upload.*').visibleToUser().findOnce();  //有提交任务按钮，要提交
                    if (!o) {
                        this.func.sleep(5000);
                        o = textMatches('提交|提交任务|提交截图|上传截图|upload.*').visibleToUser().findOnce() || descMatches('提交|提交任务|提交截图|上传截图|upload.*').visibleToUser().findOnce();  //有提交任务按钮，要提交
                    }
                    if (o) {
                        if (img1 != '') {
                            this.func.toast('有截图，准备上传', 2)
                            var jia = textMatches('上传截图|upload.*').visibleToUser().findOnce() || descMatches('上传截图|upload.*').visibleToUser().findOnce();
                            if (jia) {
                                var ii = 3;
                                while (ii-- > 0) {
                                    this.func.clickObject(jia);
                                    func.sleep(3000);
                                    if (!textMatches('上传截图|upload.*').visibleToUser().exists() && !descMatches('上传截图|upload.*').visibleToUser().exists()) {
                                        break;
                                    }
                                }

                                this.func.toast('查找截图', 2)
                                if (text('打开文件').visibleToUser().exists()) {
                                    o = text('打开文件').visibleToUser().findOnce();
                                    click(device.width - 1, o.bounds().centerY());
                                    func.sleep(2000);
                                }

                                var tmp = text(img1).visibleToUser().findOnce() || id('android:id/title').filter(function (w) { return w.text().trim() == img1 }).findOnce();
                                var ii = 3;
                                while (ii-- > 0) {
                                    if (tmp) {
                                        this.func.toast('找到截图，选择上传', 2)
                                        func.clickObject(tmp)
                                        func.sleep(2000);

                                        tmp = text(img1).visibleToUser().findOnce() || id('android:id/title').filter(function (w) { return w.text().trim() == img1 }).findOnce();
                                        if (!tmp) {
                                            this.func.sleep(3000);
                                        }
                                        else {
                                            press(tmp.bounds().centerX(), tmp.bounds().centerY(), 2500);
                                            this.func.sleep(500);
                                            o = text('打开').visibleToUser().findOne(2000);
                                            if (o) {
                                                this.func.clickObject(o)
                                                this.func.sleep(5000);
                                            }
                                        }

                                        if (textMatches('上传截图|点击上传').visibleToUser().filter(function (w) { return w.bounds().centerY() < device.height / 2; }).exists() || descMatches('上传截图|点击上传').visibleToUser().filter(function (w) { return w.bounds().centerY() < device.height / 2; }).exists()) { //还有上传按钮，继续
                                            this.func.toast('重新开始选择图片!')
                                            jia = textMatches('上传截图|点击上传').visibleToUser().findOnce() || descMatches('上传截图|点击上传').visibleToUser().findOnce();
                                            this.func.clickObject(jia);
                                            func.sleep(3000);

                                            if (text('打开文件').visibleToUser().exists()) {
                                                o = text('打开文件').visibleToUser().findOnce();
                                                click(device.width - 1, o.bounds().centerY());
                                                func.sleep(2000);
                                            }
                                            tmp = text(img1).visibleToUser().findOnce() || id('android:id/title').filter(function (w) { return w.text().trim() == img1 }).findOnce();
                                        }
                                        else
                                            break;

                                    }
                                    else {
                                        func.sleep(2000);
                                        o = desc('列表视图').visibleToUser().findOnce() || id('sub_menu_grid').visibleToUser().findOnce();
                                        if (o) {
                                            this.func.clickObject(o);
                                            this.func.sleep(2000);
                                        }
                                        tmp = text(img1).visibleToUser().findOnce() || id('android:id/title').filter(function (w) { return w.text().trim() == img1 }).findOnce();
                                    }
                                }
                            }

                            o = textMatches('提交|提交任务|提交截图').visibleToUser().findOnce() || descMatches('提交|提交任务|提交截图').visibleToUser().findOnce();
                            if (o) {
                                this.func.toast('准备提交任务', 2)
                                this.func.clickObject(o);//提交任务
                                this.func.sleep(6000);
                                files.remove(java.io.File(rootpath + '/' + img1));
                                img1 = '';
                            }
                            else {   //没有找到图片
                                func.toast('没有找到提交按钮', 2)
                                func.back();
                            }
                        }

                        taskFinished = false;

                        if (img1) {
                            // log("开始删除截图.....")
                            files.remove(java.io.File(rootpath + '/' + img1));
                        }
                        // log("截图上传完毕")
                        img1 = null;
                        img2 = null;
                    }
                }
                else {
                    giveUp();
                }
            }

            if (noTask || textStartsWith('休息一下').exists() || textStartsWith('暂时没有').exists() || (currentTarget == 1 && ksgzLimited == 1)) {
                noTaskTimes++;
            }


            if (this.noDouyin == 1 && ksgzLimited > 30) {  //快手关注点赞都上限了
                bol = false;
                this.func.toast('快手关注上限退出', 2);
            }
            if (noTaskTimes >= 5) {
                bol = false;
                func.toast('连续五次无任务退出', 2)
            }
            else {
                var datediff = new Date().getTime() - startDate.getTime();
                if (datediff > minutes * 60 * 1000) {
                    bol = false;
                    func.toast(appname + '运行完成', 2)
                }
            }
        }
    }
    catch(e){
        log(e.message + e.stack)
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
    } 
    
    thread.interrupt();
    func.log(appname,'结束运行' ,"**********************************************************");
    clearCache();
    func.quit(package);
}

function giveUp(){
    var o = textMatches('提交|提交任务|提交截图').visibleToUser().exists() || descMatches('提交|提交任务|提交截图').visibleToUser().exists();
    if (o){
        func.back();
        func.sleep(3000);
    }

    o = textMatches('放弃任务|不看了').visibleToUser().findOnce();
    if (o){
        this.func.toast('放弃任务',2)
        this.func.clickObject(o);
        func.sleep(3000);

        o = text('确定').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(2000);
            func.back();
            func.sleep(1000);
        }
    }
    /*else{
        this.func.toast('没有获取到任务',2)
        this.func.back();
    }*/
    this.func.sleep(3000);
}


function capture(isAnalyse){

    var name = null;
    var img = captureScreen();
    if (img){
        if (classModule.noCheckFavorite == 0){
            if (isAnalyse == 1){
                var isok = images.findColorInRegion(img, "#f52832", device.width * 0.8, 0, device.width * 0.15, device.height, 30);
                if (!isok){
                    errmsg = '截图分析点赞无效，要放弃任务';
                    func.toast(errmsg,1);
                    return name;
                }
                else
                    func.toast('截图分析点赞有效',1)
            }
        }
        else{
            func.toast('不分析点赞的有效性',1)
        }

        //var rootpath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).getPath();
        files.createWithDirs(rootpath + '/');
        //name = Date.now() + '.png';
        var dt = new Date()
        var y = String(dt.getFullYear());
        var m = String(dt.getMonth() + 1);
        m = (m.length == 1) ? '0' + m : m;
        var d = String(dt.getDate());
        d = (d.length == 1) ? '0' + d : d;
        var H = String(dt.getHours());
        H = (H.length == 1) ? '0' + H : H;
        var M = String(dt.getMinutes());
        M = (M.length == 1) ? '0' + M : M;
        var S = String(dt.getSeconds());
        S = (S.length == 1) ? '0' + S : S;
        var ms = String(dt.getMilliseconds());
        if (ms.length == 1)
            ms = '00' + ms;
        else if (ms.length == 2)
            ms = '0' + ms;
            name = 'Screenshot_' + y + '-' + m + '-' + d + '-' + H + '-' + M + '-' + S + '-' + ms + '_' + (currentTarget == 0 ? dypackage : kspackage) + '.png';

        path = rootpath + '/' + name;
        try{
            var rsl = images.save(img, path, "png", 100);
            app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE,android.net.Uri.fromFile(java.io.File(path))))
        }
        catch(e){
            func.toast('保存截图文件出错：' + e.message,1);
            name = '';
        }
    }

    return name;
}

function deleteFilesByDirectory(directory) {
    if (directory != null && files.exists(directory) && files.isDir(directory)) {
        var allfiles = files.listDir(directory);
        for(var i = 0; i < allfiles.length; i++){
            log('删除结果：' + files.removeDir(directory + '/' + allfiles[i]));
        }
    }
}

function clearCache(){
    var internalCache = String(context.getCacheDir()).replace(/\/[a-z]*\.[a-z]*[\.a-z]*\//gi,'/' + dypackage + '/');
    deleteFilesByDirectory(internalCache)

    if (android.os.Environment.getExternalStorageState().equals(android.os.Environment.MEDIA_MOUNTED)) {
        //外部存储
        var externalCache = String(context.getExternalCacheDir()).replace(/\/[a-z]*\.[a-z]*[\.a-z]*\//gi,'/' + dypackage + '/');
        func.deleteFilesByDirectory(externalCache);
        externalCache = externalCache.replace('/cache','/files');
        deleteFilesByDirectory(externalCache);
    }
    
    //其它文件
    var otherFiles = String(context.getFilesDir()).replace(/\/[a-z]*\.[a-z]*[\.a-z]*\//gi,'/' + dypackage + '/');
    deleteFilesByDirectory(otherFiles)

    var sharedPreference = "/data/data/" + dypackage + "/shared_prefs";
    deleteFilesByDirectory(sharedPreference)
}

function hideLogo(){
    ui.run(function(){
        try{
            win_1.logo.setVisibility(android.view.View.GONE);
            win_2.logo.setVisibility(android.view.View.GONE);
        }
        catch(e){}
    })
}

  
function showLogo(){
    //threads.start(function(){
    //    var cur = currentPackage(),ii = 15;
    //    while((cur == dypackage) && ii-- > 0){
    //        func.sleep(1000);
    //    }

        ui.run(function(){
            try{
                win_1.logo.setVisibility(android.view.View.VISIBLE);
                win_2.logo.setVisibility(android.view.View.VISIBLE);
            }
            catch(e){}
        })
    //});
}

function hasDialog(){
    var func = classModule.func;
    setInterval(() => {
        try{
            var o = textMatches('关闭应用|以后再说|同意授权|暂不需要|我知道了').visibleToUser().findOnce() || descMatches('关闭应用|以后再说|同意授权|暂不需要|我知道了').visibleToUser().findOnce() || textEndsWith('关闭应用').visibleToUser().findOnce() || textStartsWith('关闭应用').visibleToUser().findOnce();
            if (o){
                press(o.bounds().centerX(),o.bounds().centerY(),200)
            }
    
            if(text('抖音短视频没有响应').visibleToUser().exists()){
                o = text('确定').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                }
            }
            if(text('发现通讯录好友').visibleToUser().exists()){
                o = text('取消').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                }
            }
    
            o = packageName(dypackage).textMatches('允许|继续观看|稍后|同意授权|知道了').visibleToUser().findOnce();
            if (o){
                if (!className('EditText').visibleToUser().exists())
                    func.clickObject(o);
            }  
            if (packageName(dypackage).text('立即更新').visibleToUser().exists()){
                o = className('ImageView').filter(function(w){return w.bounds().centerX() > device.width * 0.7;}).visibleToUser().findOnce();
                func.clickObject(o)
            }
            if (idMatches('.*tv_upgrade_now').visibleToUser().exists()){
                o = idMatches('.*iv_close').visibleToUser().findOnce();
                if(o){
                    func.clickObject(o);
                }
            }
        }
        catch(e){log(e.message + e.stack)}
    },3000);
}

function checkKsVerifyCode(){
    func.sleep(3000);
    if (classModule.waitingVerifyCode > 0)
    {
        func.sleep(classModule.waitingVerifyCode * 1000);
    }
    var r = false;
    var o = null;
    o = textMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic.*').exists() || descMatches('拖动滑块| *向右拖动滑块填充拼图 *|cutPic?.*').exists();
    if(o){ //出来滑块
        var captchaType = 1318;
        func.toast('检测到滑块验证',2)
        var jsdati_user = func.loadConfigText("jsdati_user") || '';
        var jsdati_pass = func.loadConfigText("jsdati_pass") || '';
        if (jsdati_user != '' && jsdati_pass != ''){
            func.sleep(5000);
            var bgPic = textStartsWith('bgPic?').findOne(6000) || descStartsWith('bgPic?').findOnce()
            if (bgPic){
                func.toast('正在提交联众识别',2);
                var sliderX = bgPic.bounds().left;   //底图的x坐标
                var sliderY = bgPic.bounds().top;    //底图的y坐标
                var offset = 0;
            
                try{
                    var img = captureScreen1();  //获取背景图
                    func.sleep(500);
                    var sliderImg = images.clip(img, sliderX, sliderY, bgPic.bounds().width(), bgPic.bounds().height()) //这个是滑块，上下高度各减10，左宽减1/3，右宽不减
                    var d = getCode(jsdati_user,jsdati_pass,sliderImg,captchaType);
                    if (d.code == 0){
                        func.toast('联众识别到滑块',2);
                        var s = d.data.res;
                        var diff = parseInt(s.split(',')[0]) - offset;

                        var o = textMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce() || descMatches(' *向右拖动滑块填充拼图 *').visibleToUser().findOnce();
                        if (o) {
                            this.func.sleep(200);
                            var x = o.bounds().left + o.bounds().width() * 0.1;
                            swipe(x, o.bounds().centerY(), x + diff,o.bounds().centerY(),random(600,1200));
                            func.sleep(3000);
                            r = true;   //滑块成功
                        }
                    }
                    else{
                        func.toast('没有成功识别:' + d.msg,2)
                    }
                }
                catch(e){
                    log(e.message + e.stack)
                }
            }
            else{
                func.toast('出来滑块，但未捕捉到位置，10秒后返回',2);
                func.sleep(10000);
                func.back();
            }
        }
        else{
            func.toast('没有设置联众账号密码，不能自动过码',2)
        }
    }
    return r;
}

function checkVerifyCode(){
    if (classModule.waitingVerifyCode > 0)
    {
        func.sleep(classModule.waitingVerifyCode * 1000);
    }
    var r = false;
        
    var captchaType = 0;
    if (packageName(dypackage).textMatches('.*请完成下列验证后继续.*|.*按住左边按钮拖动完成上方拼图.*').visibleToUser().exists()){
        captchaType = 1318;
    }
    else if (packageName(dypackage).textMatches('.*请在下图中 依次.*').visibleToUser().exists()){
        captchaType = 1303;
    }
    if (captchaType > 0){
        var jsdati_user =  func.loadConfigText("jsdati_user") || '';
        var jsdati_pass =  func.loadConfigText("jsdati_pass") || '';
        if (jsdati_user != '' && jsdati_pass != ''){
            func.toast('出来验证码，准备提交联众分析，请稍等!',1)
            //底图
            var baseTop = 0; baseLeft = 0;
            if (captchaType == 1318){
                o = className('android.view.View').filter(function(w){return w.childCount() == 3}).findOnce();
                if (o.find(text('刷新')).length > 0)
                    o = className('android.view.View').filter(function(w){return w.childCount() == 2 && w.child(0).className() == 'android.widget.Image' && w.child(1).className() == 'android.widget.Image'}).findOnce();
            }
            else
                o = className('android.widget.LinearLayout').findOnce();
            if (o){
                baseTop = o.bounds().top;
                baseLeft = o.bounds().left;

                var img = captureScreen();  //获取背景图
                func.sleep(500);
                var sliderImg = images.clip(img, o.bounds().left, o.bounds().top, o .bounds().width(), o .bounds().height()) //这个是滑块，上下高度各减10，左宽减1/3，右宽不减
                
                var d = getCode(jsdati_user,jsdati_pass,sliderImg,captchaType);    //1318是滑块，1303是点字
                if (d.code == 0){
                    func.toast('联众识别到验证码',1);
                    var s = d.data.res;
                    if (captchaType == 1318){
                        var diff = parseInt(s.split(',')[0]);
                        var o = packageName(dypackage).textMatches('.*按住左边按钮拖动完成上方拼图.*').visibleToUser().findOnce();
                        if (o) {
                            func.toast('开始滑动',1)
                            swipe(o.bounds().left + 20 , o.bounds().centerY(), o.bounds().left + diff,o.bounds().centerY(),random(900,1800));
                            func.sleep(1000);
                            r = true;   //滑块成功
                        }
                    }
                    else if (captchaType == 1303){
                        func.toast('开始选字',1)
                        var ss = s.split('|');
                        for (var iij in ss){
                            var loc = ss[iij];
                            var x = Number(loc.split(',')[0]) || 0;
                            var y = Number(loc.split(',')[1]) || 0;
                            x += baseLeft;
                            y += baseTop;
                            click(x,y);
                            func.sleep(2000);
                        }
                        o = packageName(dypackage).textMatches(' *确认 *').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o)
                            func.sleep(1000);
                            r = true;   //选字成功
                        }
                    }
                }
                else{
                    func.toast('没有成功识别：' + d.message,1)
                }
            }
            else{
                func.toast('识别验证码图失败!',1)
            }
        }
        else{
            func.toast('出来验证码，没有设置联众账号密码!',1)
        }
    }
    
    return r;
}

function getCode(username,password,img,captchaType) {
    http.__okhttp__.setTimeout(3e4);
    var r = images.toBase64(img, format = "png"), i = device.release, c = device.model, s = device.buildId;
    try {
        var n = http.postJson("https://v2-api.jsdama.com/upload", {
            softwareId: 3797,
            softwareSecret: "cp1dIX7DwHuDXkDKWAT0k7Pxx781U0fi8H777TPP",
            username: username,
            password: password,
            captchaData: r,
            captchaType: captchaType,
            captchaMinLength: 0,
            captchaMaxLength: 0,
            workerTipsId: 0
        }, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android " + i + "; " + c + " Build/" + s + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 Mobile Safari/537.36",
            }
        });
    } catch (e) {
        return {
            code: "-1",
            msg: "网络链接超时...",
            data: {}
        };
    }
    var d = n.body.json(), p = d.code, m = d.message;
    if ("10079009" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142006" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142004" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142005" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10079006" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("0" == p) {
        return {
            code: p,
            msg: m,
            data: {
                res: d.data.recognition
            }
        };
    }
    return d;
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
classModule.start()


