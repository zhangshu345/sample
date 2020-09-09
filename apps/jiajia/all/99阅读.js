const appname = '99阅读';
const package = 'com.shoubang.vxread';
var dypackage = 'com.ss.android.ugc.aweme';

var classModule = {};
classModule.minMinutes = 20;
classModule.maxMinutes = 30;
classModule.noCheckFavorite = 0; //为1不验证点赞有效性
classModule.func = null;
 
classModule.start = function(){
    try{
        var img = captureScreen();
        img.recycle();
    }
    catch(e){
        var hasPer = false;
        threads.start(function(){ 
            var o = text('立即开始').visibleToUser().findOne(15000);
            if (o){
                sleep(100);
                //log('成功请求到截图权限')
                click(o.bounds().centerX(),o.bounds().centerY());
            }
            else if (hasPer){
                //log('A处已成功获取权限')
            }
            else{
                alert('没有截屏权限，您可以尝试：\n1、悬浮窗里停止任务并重新启动\n2、给予自阅后台弹窗权限\n3、上述完成后还不行，尝试重启手机')
            }
        })

        requestScreenCapture()
        hasPer = true;
    }

    var is2GMemory = func.is2GMemory;
    //var followimg = images.load('http://q.a.manyunni.net/images/dyfollow.png')
    //var unfollowimg = images.load('http://q.a.manyunni.net/images/dyunfollow.png')
    //followimg = images.grayscale(followimg);    //背景灰化
    //unfollowimg = images.grayscale(unfollowimg);    //滑块灰化

    //先判断当前是不是运行的app，不是的话就要打开
    var minutes = random(this.minMinutes,this.maxMinutes);   //生成运行时间
    func.log(appname,'启动，预计运行：' + minutes ,"**********************************************************");
    func.toast(appname + '预计运行时间：' + minutes + '分',2)
    var startDate = new Date(); //启动时间

    if (currentPackage() != package){
        var o = func.execApp(appname,package,15000,"textMatches('任务中心|领取任务|检测更新').visibleToUser().exists()")
        if (!o){
            toast("没有找到" + appname);
            return; //退出函数
        }
    }

    var tryUpdate = false;
    if (packageName(package).textMatches('检测更新|检测到新版本.*').visibleToUser().exists() || packageName(package).descMatches('检测更新|检测到新版本.*').visibleToUser().exists()){
        tryUpdate = true;
        this.func.toast('检测到更新，正在尝试安装。如果频繁失败请查看是不是安装更新失败',1)
        var o = id('android:id/button1').visibleToUser().findOnce() || packageName(package).text('确定').visibleToUser().findOnce() || packageName(package).desc('确定').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(90000,'尝试升级中',"textMatches('.*安装应用.*|允许|安装|确定').visibleToUser().exists()");
            o = text('允许').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                func.sleep(20)
                func.clickObject(o);
                func.sleep(3000);
            }
            func.sleep(2000)
            o = textMatches('继续安装|安装').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                func.sleep(20)
                func.clickObject(o);
                func.sleep(90000,'安装中',"textMatches('完成|打开').visibleToUser().exists()");
            }
            func.sleep(2000)
            o = textMatches('打开|确定').visibleToUser().findOnce()
            if (o){
                func.clickObject(o);
                func.sleep(15000,'运行中');
            }
        }
    } 

    dialogThread = threads.start(hasDialog);

    try{
        var bol = true,nomission = 0,first = true;
        var img1 = null, img2 = null, taskFinished = false,taskType = '';
        while(bol){
            var o = packageName(package).textMatches('观看.*教学视频.*').visibleToUser().exists()  || packageName(package).descMatches('观看.*教学视频.*').visibleToUser().exists();
            if (o){
                o = packageName(package).textStartsWith('kHPv8').visibleToUser().findOnce() || packageName(package).descStartsWith('kHPv8').visibleToUser().findOnce();;
                if (o){
                    func.clickObject(o)
                    this.func.sleep(2000);
                }
            }
            
            if (!packageName(package).text('99阅读').visibleToUser().exists()){
                this.func.restart(appname,package,4000);
            }
            if (packageName(package).textMatches('检测更新|检测到新版本.*').visibleToUser().exists() || packageName(package).descMatches('检测更新|检测到新版本.*').visibleToUser().exists()){
                if (tryUpdate){
                    this.func.sleep(90000,'检测到更新但没有安装成功，请尝试手动更新！切换下一平台中');
                    break;
                }
            }

            var o = text('知道了').findOnce();
            if (o){
                func.clickObject(o)
                func.sleep(2000);
                taskFinished = false;
                if (img1){
                    var rootpath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).getPath();
                    files.remove(java.io.File(rootpath + '/' + img1));
                }
            }

            if (packageName(package).textMatches('.*点击复制.*').visibleToUser().exists() || packageName(package).descMatches('.*点击复制.*').visibleToUser().exists()){
                this.func.swipeUp();
                this.func.sleep(2000);
            }
            o = text('观看DY视频').visibleToUser().findOnce() || className('android.view.View').filter(function(w){
                return (w.text() != '' && w.text().trim() == '观看DY视频') || (w.desc() != null && w.desc().trim() == '观看DY视频')
            }).findOnce();
            if (o){
                this.func.toast('点击观看DY视频',2)
                this.func.clickObject(o);
                if (first){
                    this.func.toast('检测是否需要抖音授权',2)
                    var ii = 12
                    while(ii-- > 0){
                        this.func.sleep(1000);
                        if ( textMatches('领取任务|今日签到').visibleToUser().exists() || descMatches('领取任务|今日签到').visibleToUser().exists())
                            break;
                    }
                }
                else{
                    this.func.sleep(3000);
                }
            }
            else{
                o = text('任务中心').visibleToUser().findOnce();
                if (o){
                    this.func.clickObject(o)
                    this.func.sleep(2000);
                }
            }
            
            //log('first=' + first)
            //log('选择=' + text('请选择要使用的应用').exists())
            if (first || textMatches('授权并登录|请选择要使用的应用').visibleToUser().exists()){
                if(text('请选择要使用的应用').exists())
                    selectApp()
                this.func.sleep(is2GMemory ? 6000 : 3000); 

                o = text('授权并登录').visibleToUser().findOnce();
                if (o){
                    this.func.clickObject(o);
                    this.func.sleep(3000);
                }
                first = false;
            }
            
            var needsign = false;
            o = text('领取任务').visibleToUser().findOnce() || desc('领取任务').visibleToUser().findOnce();
            if (o){
                this.func.toast('领取任务',2)
                this.func.clickObject(o)
                this.func.sleep(is2GMemory ? 6000 : 4000);
            }
            else{
                o = text('今日签到').visibleToUser().findOnce() || desc('今日签到').visibleToUser().findOnce();
                if (o){
                    needsign = true;
                    this.func.toast('今日签到',2)
                    this.func.clickObject(o)
                    this.func.sleep(is2GMemory ? 6000 : 4000);
                }
            }
            
            o = packageName(package).text('我知道了').visibleToUser().findOnce() || packageName(package).desc('我知道了').visibleToUser().findOnce();;
            if (o){
                this.func.clickObject(o)
                this.func.sleep(2000);
            }

            o = needsign || textContains('本任务类型：').findOnce() || descContains('本任务类型：').findOnce();
            if (o){
                nomission = 0;
                if (needsign){
                    taskType = '签到'
                }
                else{
                    if (o.text())
                    taskType = o.text().replace('本任务类型：','').trim();
                else
                    taskType = o.desc().replace('本任务类型：','').trim();
                }
                this.func.swipeUp();
                this.func.sleep(1000);
            
                if (!taskFinished && (taskType == '签到' || taskType == '点赞' || taskType == '个人中心关注' || taskType == '首页搜索关注')){ //没有完成任务，先去做任务
                    img1 = null;
                    img2 = null;
                    o = textMatches('点击复制\n打开\'DY\'做任务|打开\'DY\'做任务|打开\'DY\'').visibleToUser().findOnce() || descMatches('点击复制\n打开\'DY\'做任务|打开\'DY\'做任务|打开\'DY\'').visibleToUser().findOnce() || className('android.view.View').visibleToUser().filter(function(w){
                        return (w.text() != null && (w.text().indexOf('打开\'DY\'做任务') >= 0 || w.text().indexOf('打开\'DY\'') >= 0)) || (w.desc() != null && (w.desc().indexOf('打开\'DY\'做任务') >= 0 || w.desc().indexOf('打开\'DY\'') >= 0))
                    }).findOnce();
                    if (o){
                        hideLogo();    
                        this.func.clickObject(o);   
                        this.func.sleep(1000);
                        
                        o = packageName(package).text('前往观看').visibleToUser().findOnce() || packageName(package).desc('前往观看').visibleToUser().findOnce();
                        if (o){
                            this.func.clickObject(o);
                            this.func.sleep(1000);
                            this.func.back();

                            o = textMatches('点击复制\n打开\'DY\'做任务|打开\'DY\'做任务').visibleToUser().findOnce() || descMatches('点击复制\n打开\'DY\'做任务|打开\'DY\'做任务').visibleToUser().findOnce();
                            this.func.clickObject(o);   
                            this.func.sleep(1000);
                        }

                        switch(taskType){
                            case '签到':
                                selectApp();
                                o = packageName(dypackage).text('我').visibleToUser().findOne(15000);
                                if (o){
                                    func.clickObject(o);
                                    func.sleep(5000);
                                    var myCenter = false;
                                    if (packageName(dypackage).textMatches('编辑资料.*|分享主页.*|我的收藏.*').visibleToUser().exists()){
                                        this.func.toast('进入到了抖音“我”页面，准备截图',1);
                                        func.sleep(4000);
                                        myCenter = true;
                                    }

                                    if (myCenter){
                                        img1 = capture();
                                        if (img1){
                                            taskFinished = true;
                                            this.func.toast('截图成功',1)
                                        }
                                    }
                                    else if (textMatches('99阅读').exists() || text('提交任务').exists() || descMatches('99阅读').exists() || desc('提交任务').exists()){
                                        this.func.toast('本次任务没有转到抖音，失败了',2)
                                    }
                                }
                                break;
                            case '点赞':
                                log('准备点赞')
                                o = text('确定').visibleToUser().findOnce() || desc('确定').visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o)
                                    this.func.sleep(1000);
                                }
                                o = text(taskType).visibleToUser().findOne(2000) || desc(taskType).visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o)
                                    this.func.sleep(1500);

                                    o = text('确定').visibleToUser().findOnce() || desc('确定').visibleToUser().findOnce();
                                    if (o){
                                        func.clickObject(o)
                                        this.func.sleep(1000);
                                     }
                                }
                                
                                //launch(dypackage);
                                selectApp();
                                this.func.sleep((is2GMemory ? 18000 : 10000),"打开抖音中","classNameMatches('.*.TextView|.*.Button').visibleToUser().filter(function(w){return w.text() != '' && (w.text().trim().indexOf('前往') >= 0 || w.text().trim().indexOf('打开看看') >= 0 || w.text().trim().indexOf('我') >= 0);}).exists()")
                                o = classNameMatches('.*.TextView|.*.Button').visibleToUser().filter(function(w){return w.text() != '' && (w.text().trim().indexOf('前往') >= 0 || w.text().trim().indexOf('打开看看') >= 0);}).findOnce();
                                if (o){
                                    this.func.clickObject(o);
                                    this.func.sleep(3000);
                                }

                                for(var i = 0; i < 2; i++){
                                    var x = random(device.width / 4,device.width / 4 * 3);
                                    var y = random(device.height / 5,device.height / 3 * 2)
                                    click(x,y);
                                    func.sleep(random(40,60));
                                    click(x,y);
                                    func.sleep(random(40,60));
                                    click(x,y);            
                                    this.func.sleep(300);
                                }

                                func.sleep(3000)
                                if (checkVerifyCode()){ //判断有没有码，如果有，要重新处理
                                    for(var i = 0; i < 2; i++){
                                        var x = random(device.width / 4,device.width / 4 * 3);
                                        var y = random(device.height / 5,device.height / 3 * 2)
                                        click(x,y);
                                        func.sleep(random(40,60));
                                        click(x,y);
                                        func.sleep(random(40,60));
                                        click(x,y);
                                        this.func.sleep(300);
                                    }
                                }   

                                func.sleep(2000);
            
                                if (textMatches('99阅读').exists() || text('提交任务').exists() || descMatches('99阅读').exists() || desc('提交任务').exists()){
                                    this.func.toast('本次任务没有转到抖音，失败了',2)
                                }
                                else{
                                    img1 = capture(1);
                                    if (img1)
                                        taskFinished = true;
                                }
                                break;
                            case '首页搜索关注':
                                var key = getClip();
                                if (key == ''){
                                    this.func.toast('没有获取到要搜索的内容，如果是安卓10系统可能无法完成此关注任务！');
                                }
                                else{
                                    o = text(taskType).visibleToUser().findOne(2000) || desc(taskType).visibleToUser().findOnce();
                                    if (o){
                                        func.clickObject(o)
                                        this.func.sleep(1500);

                                        o = text('确定').visibleToUser().findOnce() || desc('确定').visibleToUser().findOnce();
                                        if (o){
                                            func.clickObject(o)
                                            this.func.sleep(1000);
                                        }
                                    }

                                    //launch(dypackage);
                                    //this.func.sleep(1500);
                                    selectApp();
                                    this.func.sleep((is2GMemory ? 18000 : 10000),"打开抖音中","packageName('" + dypackage + "').text('我').visibleToUser().exists()");
                                    
                                    var btnMe = packageName(dypackage).text('我').visibleToUser().findOnce();
                                    var srh = desc('搜索').visibleToUser().findOnce() || className('ImageView').visibleToUser().filter(function(w){return w.indexInParent() == 3 && w.bounds().bottom < 300;}).findOnce();
                                    if (srh){
                                        func.clickObject(srh)
                                    }
                                    else{
                                        o = packageName(dypackage).text('我').visibleToUser().findOnce();
                                        var x
                                        if (o) x = o.bounds().right;
                                        o = packageName(dypackage).text('推荐').visibleToUser().findOnce();
                                        var y;
                                        if (o) y = o.bounds().centerY();
                                        if (x && y) click(x,y);
                                    }

                                    o = className('EditText').visibleToUser().findOne(6000);
                                    if (o){
                                        func.clickObject(o)
                                        func.sleep(1000);
                                        o.setText(key);
                                        func.sleep(1000);
                                
                                        func.clickObject(btnMe);
                                        func.sleep(2000);
                                        var btnConcern;
                                        //o = packageName(dypackage).text('抖音号:' + key).visibleToUser().findOne(6000)
                                        o = packageName(dypackage).textStartsWith('抖音号:').filter(function(w){
                                            return w.text().toLowerCase().trim() == '抖音号:' + key.toLowerCase();
                                        }).visibleToUser().findOne(6000)
                                        if (o){
                                            //func.clickObject(o);
                                            func.sleep(2000);
                                            btnConcern = packageName(dypackage).text('关注').visibleToUser().filter(function(w){return w.bounds().centerY() < device.height / 3;}).findOnce();
                                            if (btnConcern){
                                                this.func.clickObject(btnConcern)
                                                this.func.sleep(2000);
            
                                                img1 = capture();
                                                if (img1)
                                                    taskFinished = true;
                                            }
                                            else if(packageName(dypackage).text('已关注').visibleToUser().filter(function(w){return w.bounds().centerY() < device.height / 3;}).exists()){
                                                img1 = capture();
                                                if (img1)
                                                    taskFinished = true;
                                            }
                                        }
                                        else if (textMatches('99阅读|提交任务').visibleToUser().exists()){
                                            this.func.toast('本次任务没有转到抖音，失败了',2)
                                        }
                                        else{
                                            o = packageName(dypackage).textMatches('关注|已关注').visibleToUser().find();
                                            if (o.length == 1){ //列表只有一个关注按钮
                                                if (o[0].text().trim() == '关注'){
                                                    btnConcern = o[0];
                                                    this.func.clickObject(o[0])
                                                    this.func.sleep(2000);
                                                }
            
                                                img1 = capture();
                                                if (img1)
                                                    taskFinished = true;
                                            }
                                        }

                                        func.sleep(3000);
                                        if (checkVerifyCode()){ //判断有没有码，如果有，要重新处理
                                            if (btnConcern){
                                                this.func.clickObject(btnConcern)
                                                this.func.sleep(2000);
                                                if (img1){  //删除之前的截图
                                                    var rootpath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_PICTURES).getPath();
                                                    files.remove(java.io.File(rootpath + '/' + img1));
                                                }
                                                img1 = capture();
                                                if (img1)
                                                    taskFinished = true;
                                            }
                                        }   
                                    }
                                    else{
                                        func.toast('没有进入搜索界面 ，本次任务放弃',2);
                                    }
                                }
                                break;
                            case '个人中心关注':
                                o = text(taskType).visibleToUser().findOne(2000) || desc(taskType).visibleToUser().findOnce();
                                if (o){
                                    func.clickObject(o)
                                    this.func.sleep(1500);

                                    o = text('确定').visibleToUser().findOnce() || desc('确定').visibleToUser().findOnce();
                                    if (o){
                                        func.clickObject(o)
                                        this.func.sleep(1000);
                                    }
                                }

                                selectApp();
                                this.func.sleep((is2GMemory ? 18000 : 10000),"打开抖音中","classNameMatches('.*.TextView|.*.Button').visibleToUser().filter(function(w){return w.text() != '' && (w.text().trim().indexOf('前往') >= 0 || w.text().trim().indexOf('打开看看') >= 0 || w.text().trim().indexOf('我') >= 0);}).exists()")
                                //this.func.sleep(is2GMemory ? 18000 : 10000); //等打开抖音

                                o = classNameMatches('.*.TextView|.*.Button').visibleToUser().filter(function(w){return w.text() != '' && (w.text().trim().indexOf('前往') >= 0 || w.text().trim().indexOf('打开看看') >= 0);}).findOnce();
                                if (o){
                                    this.func.clickObject(o);
                                    this.func.sleep(3000);
                                }
                                
                                o = packageName(dypackage).textMatches('关注.*|取消关注.*').visibleToUser().findOne(15000);
                                if (o){
                                    if (o.text().trim() == '关注'){
                                        this.func.toast('点击关注',1)
                                        func.clickObject(o);
                                        func.sleep(3000);
                                    }
                                }
                                
                                if (packageName(dypackage).textMatches('发消息.*|取消关注.*').visibleToUser().findOnce()){
                                    img1 = capture();
                                    if (img1){
                                        this.func.toast('截图成功',1)
                                        taskFinished = true;
                                    }
                                }
                                break;
                            default:
                                this.func.toast('未适配的',2)
                                giveUp()
                                taskFinished = false;
                        }
            
                        showLogo()
                        
                        
                        var ii = 5;
                        while(!textMatches('99阅读|提交任务|' + taskType).visibleToUser().exists() && !packageName(dypackage).text('我').visibleToUser().exists() && ii-- > 0){
                            this.func.back()
                            this.func.sleep(2500);
                        }
                        launch(package);
                        this.func.sleep(3000);
                        
                        o = text(taskType).visibleToUser().findOne(1000) || desc(taskType).visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o)
                            this.func.sleep(1500);

                            o = text('确定').visibleToUser().findOnce() || desc('确定').visibleToUser().findOnce();
                            if (o){
                                func.clickObject(o)
                                this.func.sleep(1000);
                            }
                        }
                        
                        ii = 5
                        while(!textMatches('99阅读|提交任务|提交截图|' + taskType).visibleToUser().exists() && !descMatches('99阅读|提交任务|提交截图|' + taskType).visibleToUser().exists() && ii-- > 0){
                            this.func.back()
                            this.func.sleep(50);
                            this.func.back()
                            this.func.sleep(3000);
                        }
                    }
                }
                
                //log('任务是否完成：' + taskFinished)
                if (taskFinished){  //完成任务了，要提交
                    this.func.toast('任务完成，准备提交')
                    //func.sleep(2000)

                    o = text(taskType).visibleToUser().findOne(2000) || desc(taskType).visibleToUser().findOnce();
                    if (o){
                        func.clickObject(o)
                        this.func.sleep(1500);

                        o = text('确定').visibleToUser().findOnce() || desc('确定').visibleToUser().findOnce();
                        if (o){
                            func.clickObject(o)
                            //this.func.sleep(1000);
                        }
                    }

                    o = textMatches('提交任务|提交截图').visibleToUser().findOne(2000) || descMatches('提交任务|提交截图').visibleToUser().findOnce();  //有提交任务按钮，要提交
                    if (o){
                        switch(taskType){
                            case '签到':
                            case '点赞':    //case '评论':
                            case '首页搜索关注':
                            case '个人中心关注':
                                if (img1 != ''){
                                    this.func.toast('有截图，准备上传',2)
                                    var jia = idMatches('image_jia').visibleToUser().findOnce();
                                    var jia2 = text('点击上传任务截图').visibleToUser().findOnce() || desc('点击上传任务截图').visibleToUser().findOnce();
                                    if (jia || jia2){
                                        if (jia)
                                            this.func.clickObject(jia);
                                        else
                                            this.func.clickObject(jia2,0,-100)
                                        func.sleep(2000);
                                        
                                        this.func.toast('查找截图',2)
                                        o = textMatches('打开文件|下载内容').visibleToUser().exists() || descMatches('打开文件|下载内容').visibleToUser().exists()
                                        if (o){
                                            fuc.back();//click(device.width - 1, o.bounds().centerY());
                                            //func.sleep(2000);
                                        }

                                        var tmp = text(img1).visibleToUser().findOne(4000) || id('android:id/title').filter(function(w){return w.text().trim() == img1}).findOnce();
                                        var ii = 3;
                                        while (ii-- > 0){
                                            if (tmp){
                                                this.func.toast('找到截图，选择上传',2)
                                                func.clickObject(tmp)
                                                func.sleep(2000);

                                                tmp = text(img1).visibleToUser().findOnce() || id('android:id/title').filter(function(w){return w.text().trim() == img1}).findOnce();
                                                if (!tmp){
                                                    this.func.sleep(2000);
                                                    break;
                                                }
                                                else{
                                                    press(tmp.bounds().centerX(),tmp.bounds().centerY(),2500);
                                                    o = text('打开').visibleToUser().findOne(2000);
                                                    if (o){
                                                        func.clickObject(o)
                                                        func.sleep(5000);
                                                    }
                                                    break;
                                                }
                                            }
                                            else{
                                                o = desc('列表视图').visibleToUser().findOne(2000) || id('sub_menu_grid').visibleToUser().findOnce();
                                                if (o){
                                                    this.func.clickObject(o);
                                                    this.func.sleep(2000);
                                                }
                                                tmp = text(img1).visibleToUser().findOnce() || id('android:id/title').filter(function(w){return w.text().trim() == img1}).findOnce();
                                            }
                                        }
                                         
                                        o = textMatches('提交任务|提交截图').visibleToUser().findOne(2000) || descMatches('提交任务|提交截图').visibleToUser().findOnce(); 
                                        if (o){
                                            this.func.toast('准备提交任务',2)
                                            this.func.clickObject(o);//提交任务
                                            this.func.sleep(8000);
                                            var rootpath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).getPath();
                                            files.remove(java.io.File(rootpath + '/' + img1));
                                        }
                                        else{   //没有找到图片
                                            func.toast('没有找到提交按钮',2)
                                            func.back();
                                        }
                                    }
                                    else{   //没有找到图片
                                        func.toast('没有找到截图的图片',2)
                                        func.back();
                                    }
                                }
                                break;
                        }
                    }
                }
                else{
                    //未完成任务，要放弃
                    //if (text('提交任务').visibleToUser().exists() || desc('提交任务').visibleToUser().exists() || taskType == '评论'){
                        giveUp();
                    //}
                }
                taskFinished = false;   //直接设置为未完成，供下次做任务
            }
            else{
                this.func.toast('未获取到任务类型，重新领取任务',2)
                o = textStartsWith('放弃任务').visibleToUser().findOnce() || descStartsWith('放弃任务').visibleToUser().findOnce();
                if (o){
                    this.func.clickObject(o);
                    o = text('确定').visibleToUser().findOne(3000) || desc('确定').visibleToUser().findOnce();
                    if (o){
                        this.func.clickObject(o);
                        //this.func.sleep(4000);
                    }
                }
                else{
                    nomission++;
                    this.func.back();
                }
                this.func.sleep(2000);
                taskFinished = false;
            }

            if (img1){
                var rootpath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).getPath();
                files.remove(java.io.File(rootpath + '/' + img1));
                img1 = '';
            }
            
            if (nomission >= 5){
                this.func.toast('当前没有任务',2)
                bol = false;
                nomission = 0;
            }
            

            var datediff = new Date().getTime() - startDate.getTime();
            if (datediff > minutes * 60 * 1000){
                bol = false;
                func.toast(appname + '运行完成',2)
            }
        }
    }
    catch(e){
        log(e.message + '\n\r' + e.stack)
        func.log(appname,'循环执行',e.message + '\n\r' + e.stack);
    } 
    finally{
        dialogThread.interrupt();
    }
    func.log(appname,'结束运行' ,"**********************************************************");
    clearCache();
    func.quit(package);
}

function giveUp(){
    //func.swipeUp();
    //func.sleep(1000);
    //var o = text('放弃任务').visibleToUser().findOnce();
    //if (o){
        //func.clickObject(o);
        //func.sleep(2000);
        func.back();
        func.sleep(2000);
        o = packageName(package).textMatches('.*确定.*').visibleToUser().findOnce(3000) || packageName(package).descMatches('.*确定.*').visibleToUser().findOnce() || className('Button').visibleToUser().findOnce();
        if (o){
            func.clickObject(o);
            func.sleep(4000);
        }
    //}
}

function selectApp(){
    var appname = '抖音短视频';
    var ii = 5;
    while((text('请选择要使用的应用').visibleToUser().exists() || currentActivity().indexOf('ResolverActivity') > 0) && ii-- > 0){
        if (text('请选择要使用的应用').visibleToUser().exists() || currentActivity().indexOf('ResolverActivity') > 0){
            o = text(appname).visibleToUser().findOnce();
            if (o){
                //log('选择抖音')
                press(o.bounds().centerX(), o.bounds().centerY() - random(0,100),300);
                func.sleep(100);
            }
            else
                func.sleep(200);
        } 
        else
            func.sleep(500);
    }
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

        var rootpath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).getPath();
        files.create(rootpath + '/');
        name = Date.now() + '.png';
        path = rootpath + '/' + name;
        var rsl = images.save(img, path, "png", 100);
        app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE,android.net.Uri.fromFile(java.io.File(path))))
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



function checkVerifyCode(){
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

function hasDialog(){
    setInterval(() => {
        try{
            var o = textMatches('关闭应用|以后再说|马上去关注|同意授权|暂不需要').visibleToUser().findOnce() || textEndsWith('关闭应用').visibleToUser().findOnce() || textStartsWith('关闭应用').visibleToUser().findOnce();
            if (o){
                press(o.bounds().centerX(),o.bounds().centerY(),200)
            }

            o = textMatches('.*是否放弃任务?.*').visibleToUser().findOnce() || descMatches('.*是否放弃任务?.*').visibleToUser().findOnce();
            if (o){
                o = textMatches('确定').visibleToUser().findOnce() || descMatches('确定').visibleToUser().findOnce() || className('Button').visibleToUser().findOnce();
                if (o)
                    func.clickObject(o);
            }
            if(text('发现通讯录好友').visibleToUser().exists()){
                o = text('取消').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                }
            }
    
            if(text('抖音短视频没有响应').visibleToUser().exists()){
                o = text('确定').visibleToUser().findOnce();
                if (o){
                    func.clickObject(o);
                }
            }
    
            o = packageName(dypackage).textMatches('允许|继续观看|稍后|我知道了').visibleToUser().findOnce();
            if (o){
                func.clickObject(o);
            }  
            if (packageName(dypackage).text('立即更新').visibleToUser().exists()){
                o = className('ImageView').filter(function(w){return w.bounds().centerX() > device.width * 0.7;}).visibleToUser().findOnce();
                func.clickObject(o)
            }
        }
        catch(e){log(e.message + e.stack)}
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