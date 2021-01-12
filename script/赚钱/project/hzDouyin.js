
var DouyinClass = function () {
    this.dyUrl = "";
    this.dyUid = "";
    this.userName = "";
    this.global = {};
    this.appVersion = "";
    this.isInitListenDialog = false;
    this.config = {};
    this.shortID = "";
    this.secUid = "";
    this.quickVersion = false;//极速版本
    this.package = "com.ss.android.ugc.aweme";
    this.detail = "snssdk1128://aweme/detail/";
    this.profile = "snssdk1128://user/profile";
    this.appName = "抖音短视频"
    this.mainActivity = "com.ss.android.ugc.aweme.main.MainActivity";
    this.timestamp=0;
    this.doShortIDs="";//做过任务的抖音ID
    this.likeTooFastNotifyCount = 0;
    this.focusTooFastNotifyCount = 0;
    this.likeSleepTimes=0;
    this.focusSleepTimes=0;
    this.whoami = function(){
        log("i am DouyinClass")
    }
    // 初始化
    this.init = function (config) {
        this.curFocusNum =  -1
        this.config = config;
        this.checkIsInstallApp();
        // this.setDyUrl(config.dyUrl);
        // this.setUserId();
        this.initAppVersion();
        if(!this.isInitListenDialog){
            this.listenDialog();
            this.isInitListenDialog = true;
        }
    };

    // 检查抖音是否安装
    this.checkIsInstallApp = function () {
        var dy = app.getAppName(this.getPackage());
        if (dy == null) {
            var dyApp = this.getDyAppName();
            this.global.error("没有安装" + dyApp);
            this.finish();
        }
    }

    // 获取应用版本
    this.getAppVersion = function (package) {
        try {
            importPackage(android.content);
            var pckMan = context.getPackageManager();
            var packageInfo = pckMan.getPackageInfo(package, 0);
            return packageInfo.versionName;
        } catch (e) {
            throw new Error("获取版本失败");
        }
    }

    //获取应用版本名
    this.initAppVersion = function () {
        try {
            var package = this.getPackage();
            var dyApp = this.getDyAppName();
            this.appVersion = this.getAppVersion(package);
            log("唤醒版本号：" + dyApp + this.appVersion);
        } catch (e) {
            console.warn(e + ",获取电音版本失败")
        }
    }

    this.setDyUrl = function (dyUrl) {
        this.dyUrl = dyUrl;
    };

    this.getDyUrl = function () {
        return this.dyUrl;
    };

    this.getPackage = function () {
        var p = this.package;
        return p;
    };

    // 获取运行的抖音应用名
    this.getDyAppName = function () {
        var n =this.appName;
        return n;
    }

    this.getDetailScheme = function () {
        var d =this.detail;
        return d;
    };

    this.getProfileScheme = function () {
        return this.profile;
    };

    this.getMainActivity = function () {
        var m = this.mainActivity;
        return m;
    }

    // 回到脚本
    this.openApp = function () {
        app.launchPackage(this.getPackage());
    };
    // 打开抖音首页
    this.gotoHome = function () {
        if (currentPackage() != this.getPackage()) {
            this.openApp();
            sleep(10000);
        }

        var index = 0;
        while(index<10)
        {
            index++;
            {
                var firtPage = text("首页").findOnce();
                var tuijian = text("推荐").findOnce();
                var lbl=text("获赞").findOnce();
                var shouldGoHome=this.config.bringBefore||this.config.bringOngoing;
                if(lbl && this.global.isCorrectView(firtPage))
                {
                    if(shouldGoHome)
                    {//如果不用养号,回到rootviewcontroller就可以了,养号则要点击首页才有视频可看
                        log("点击首页");
                        this.clickFirtPage();
                    }
                    else
                    {   //如果不用养号,回到rootviewcontroller就可以了 
                        log("已经是首页");
                        break;
                    }
                    if(!this.config.quickTask)
                    {
                        sleep(1000);
                    }
                }
                if(this.global.isCorrectView(firtPage) &&this.global.isCorrectView(tuijian))
                {
                    log("已经是首页")
                    if(!this.config.quickTask)
                        sleep(2000);
                    break;
                }
            }

            if(currentPackage() == this.getPackage())
            {
                log("点击返回")
                back();
                sleep(2000);
            }            
        }

         if (currentPackage() != this.getPackage()) 
         {
            this.openApp();
            sleep(10000);
        }
    }

    // 打开我的主页
    this.gotoMyProfile = function () {
        var pindex = 0
        var p = text("我").findOnce()
        while(p&&pindex<4)
        {
            pindex++;
            p = p.parent()
            if(p.click())
                break;
        }
     };
     this.clickFirtPage = function(){
        var pindex = 0
        var p = text("首页").findOnce()
        while(p&&pindex<4)
        {
            pindex++;
            p = p.parent()
            if(p.click())
                break;
        }
     }

    // 打开用户主页
    this.gotoUserProfile = function (userId) {
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: this.getProfileScheme() + "/" + userId,
            packageName: this.getPackage()
        });
    };

    // 打开任务视频
    this.gotoDetail = function (awemeId) {
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: this.getDetailScheme() + awemeId,
            packageName: this.getPackage()
        });
    };

    // 点赞，安卓7以下，不检测上量
    this.doLikeLowVersionUncheck = function (awemeId) {
        try {
            auto.setWindowFilter((info) => {
                return true;
            });
            sleep(500);

            var likeBtn = null;
            let btn =  packageName(this.getPackage()).descContains("喜欢").className("android.widget.ImageView").boundsInside(device.width * 0.5, device.height * 0.3, device.width, device.height * 0.8).findOnce();
            if (btn != null && !btn.desc().match("已选中")) {
                likeBtn = btn.parent();
            }

            if (likeBtn != null) {
                sleep(100);
                likeBtn.click();
            } else {
                console.warn("未找到喜欢控件");
            }

        } catch (err) {
            console.warn("未找到喜欢控件2");
            return false;
        }
        sleep(1000)
        if(this.isLikeTooFast())
        {
            this.global.error("可能点赞手速太快")
            this.likeTooFastNotifyCount= this.likeTooFastNotifyCount +1
        }
        else
            this.likeTooFastNotifyCount = 0;
        return true;
    }
    this.isFocusTooTast = function(mode)
    {
        // mode 1:视频节目  2:主页界面
        if(mode == 1)
        {

        }
        else
        {
            var focusBtn = packageName(this.getPackage()).text("取消关注").clickable(true).findOnce();
            if(focusBtn)
                return false;
            var focusBtn = packageName(this.getPackage()).textContains("关注").clickable(true).findOnce();
            if (focusBtn == null) 
            {
                log("没有找到关注");
                return false;
            } 
            if(focusBtn.text().indexOf("取消关注")!=-1)
            {
                return false;
            }
            return true;
        }
        return false;
    }
    this.isLikeTooFast = function(){
        let btn =  packageName(this.getPackage()).descContains("未选中").findOnce();
        if(btn)
            return true
        else
            return false
    }

    // 点赞，安卓7以下，检测上量
    this.doLikeLowVersion = function (awemeId) {
        var oldNum = this.getLikeNum();
        try {
            auto.setWindowFilter((info) => {
                return true;
            });
            sleep(1000);

            var likeBtn = null;
            let btn = packageName(this.getPackage()).descContains("喜欢").className("android.widget.ImageView").boundsInside(device.width * 0.5, device.height * 0.3, device.width, device.height * 0.8).findOnce();
            if (btn != null && !btn.desc().match("已选中")) {
                likeBtn = btn.parent();
            }

            if (likeBtn != null) {
                sleep(100);
                likeBtn.click();
            } else {
                console.warn("未找到喜欢控件");
            }

        } catch (err) {
            console.warn("未找到喜欢控件2");
            return false;
        }
        sleep(1000)
        var isfast=this.isLikeTooFast(); 
         if(this.config.quickTask ==2)
        {
            back()
            sleep(100)
        }
        else if(this.config.quickTask)
        {
            this.gotoHome();
        }
        else
            sleep(2000); 

        var newNum = this.getLikeNum();
        // log("=====自检=====")
        log("点赞前：" + oldNum + "，点赞后：" + newNum);
        if (newNum <= oldNum) {
            console.warn("点赞失败");
            if(isfast)
            {
                this.global.error("可能点赞手速太快")
                this.likeTooFastNotifyCount= this.likeTooFastNotifyCount +1
            }
            else
                this.likeTooFastNotifyCount = 0;
            var res = false;
        } else {
            this.likeTooFastNotifyCount = 0;
            log("点赞成功");
            var res = true;
        }
        if(!this.config.quickTask)
        {
            this.gotoHome();
        }
        return res;
    }

    // 点赞，安卓7以上，不检测上量
    this.doLikeHighVersionUncheck = function (awemeId) {

        if(!this.config.debug)
        {
            press(device.width / 2 + random(-100, 100), device.height*0.4 + random(-150, 0), 1);
            sleep(50);
            press(device.width / 2 + random(-100, 100), device.height*0.4 + random(-150, 0), 1);
            sleep(50);
        } 
        else
        {
            press(device.width / 2 + random(-100, 100), device.height*0.5 + random(0, 150), 1);
            sleep(50);
            press(device.width / 2 + random(-100, 100), device.height*0.5 + random(0, 150), 1);
            sleep(50);
        }

        sleep(2000);
        if(this.isLikeTooFast())
        {
            this.global.error("可能点赞手速太快")
            this.likeTooFastNotifyCount= this.likeTooFastNotifyCount +1
        }
        else
            this.likeTooFastNotifyCount = 0;
        return true;
    }

    // 点赞，安卓7以上，检测上量
    this.doLikeHighVersion = function (awemeId) {
        var oldNum = this.getLikeNum();
        sleep(500)
        if(!this.config.debug)
        {
            press(device.width / 2 + random(-100, 100), device.height*0.4 + random(-150, 0), 1);
            sleep(50);
            press(device.width / 2 + random(-100, 100), device.height*0.4 + random(-150, 0), 1);
            sleep(50);
        }
        else
        {
            press(device.width / 2 + random(-100, 100), device.height*0.5 + random(0, 150), 1);
            sleep(50);
            press(device.width / 2 + random(-100, 100), device.height*0.5 + random(0, 150), 1);  
            sleep(50);
        }
        sleep(1000)
        var isfast=this.isLikeTooFast(); 
        if(this.config.quickTask ==2)
        {
            back()
            sleep(100)
        }
        else if(this.config.quickTask)
        {
            this.gotoHome();
        }
        else
            sleep(2000); // 延迟2秒再查看
        var newNum = this.getLikeNum();
        // log("=====自检=====")
        log("点赞前：" + oldNum + "，点赞后：" + newNum);
        if (newNum <= oldNum) {
            console.warn("点赞失败");
            if(isfast)
            {
                this.global.error("可能点赞手速太快")
                this.likeTooFastNotifyCount= this.likeTooFastNotifyCount +1
            }
            else
                this.likeTooFastNotifyCount = 0;
            var res = false;
        } else {
            this.likeTooFastNotifyCount = 0;
            log("点赞成功");
            var res = true;
        }
        if(!this.config.quickTask)
        {
            this.gotoHome();
        }
        return res;
    }

    // 点赞
    this.doLike = function (awemeId) {


        if (currentPackage() != this.getPackage()) 
        {
            app.launchPackage(this.getPackage());
            log("打开D音中..."); 
            sleep(8000); 
        }
        this.checkFast(false);
        var index = 0
        sleep(500)
        while(true)
        {
            index = index +1
            if(index>10)
                break
            let btn =  packageName(this.getPackage()).descContains("未选中").findOnce();
            if(btn)
                break
            else
                sleep(200)
        }


        if (!this.dyUrl&&!this.secUid&&!this.quickVersion) {
            if (this.config.androidVersion < 7) {
                return this.doLikeLowVersionUncheck(awemeId);
            } else {
                return this.doLikeHighVersionUncheck(awemeId);
            }
        } else {
            if (this.config.androidVersion < 7) {
                return this.doLikeLowVersion(awemeId);
            } else {
                return this.doLikeHighVersion(awemeId);
            }
        }

    };
    this.checkFast=function(focus)
    {
        if(focus&& this.focusSleepTimes>0||!focus&& this.likeSleepTimes>=3)
            return;
        if(this.likeTooFastNotifyCount>=3||this.focusTooFastNotifyCount>=3)
        {
            if(this.likeTooFastNotifyCount>=3)
            {
                this.likeTooFastNotifyCount=0;
                this.likeSleepTimes++;
            }
            if(this.focusTooFastNotifyCount>=3)
            {
                this.focusTooFastNotifyCount=0;
                this.focusSleepTimes++;
            }
            var pefix=focus?("关注手速过快"+this.focusSleepTimes):("点赞手速过快"+this.likeSleepTimes);
            var sleeptime = 60*25;
            this.global.error("操作太快了,倒计时25分钟后继续做任务");
            while(sleeptime>0)
            {
                sleeptime = sleeptime -10;
                sleep(10000);
                this.global.error(pefix+",休息"+sleeptime+"秒后继续");
            }
            
        }
    }
    // 打开用户主页关注，不检测上量
    this.doFocusByUserIdUncheck = function (userId) {
        try {
            var focusBtn = packageName(this.getPackage()).textContains("关注").clickable(true).findOnce();
            if (focusBtn == null) {
                return false;
            }

            sleep(1000);
            focusBtn.click();
            sleep(2000);
            return true;
        } catch (e) {
            console.warn("关注失败");
            return false;
        }
    };

    //通过shortid 
    this.doFocusByShortID = function(shortID)
    {
        try{ 
            this.gotoHome()
            sleep(1000)
            log("回到首页")
            this.gotoMyProfile()
            sleep(2000)
            log("进入我的主页界面")

            var lb_friend=packageName(this.getPackage()).desc("发现好友").findOnce();
            if(lb_friend == null)
            {
                lb_friend = packageName(this.getPackage()).text("好友").findOnce();
                if(lb_friend == null)
                    lb_friend = packageName(this.getPackage()).text("朋友").findOnce();
                if(lb_friend == null)
                    lb_friend = packageName(this.getPackage()).text("熟人").findOnce();
            }
            var pindex = 0
            while(pindex<4)
            {
                if(lb_friend.click())
                {
                    // log("点击好友或者朋友")
                    break
                }
                else
                    lb_friend = lb_friend.parent()
                pindex = pindex +1
            }
            // lb_friend.click()
            var p = lb_friend.parent().parent().click()
            // log("lb_friend:"+lb_friend)
            // log("p:"+p)
            sleep(2000)
            log("进入发现好友界面")
            var lb_cancel = packageName(this.getPackage()).text("取消").findOnce();
            if(lb_cancel)
            {
                log("取消")
                lb_cancel.click()
                sleep(1000)
            }
            else
            {
                var lb_forbid = packageName(this.getPackage()).text("禁止").findOnce();
                if(lb_forbid)
                {
                    log("禁止")
                    lb_forbid.click()
                    sleep(1000)
                }
                else
                {
                    var lb_forbid = packageName(this.getPackage()).text("拒绝").findOnce();
                    if(lb_forbid)
                    {
                        log("拒绝")
                        lb_forbid.click()
                        sleep(1000)
                    }
                    
                }
            }
            sleep(1000)
            var et = packageName(this.getPackage()).className("EditText").textContains("抖音号").findOnce();
            et.setText(shortID)
            sleep(1000)
            var b = et.bounds()
            if(this.config.androidVersion >= 7)
                click(b.centerX(), b.centerY())
            else
            {
                if(!this.global.clickView(et))
                    log("输入框不可点");
            }
            sleep(1500)
            packageName(this.getPackage()).text("搜索").findOnce().click();
            sleep(6000)
            var lb_focus = packageName(this.getPackage()).text("关注").findOnce();
            var p_lb_focus = lb_focus.parent()
            pindex = 0
            while(pindex<4)
            {
                if(p_lb_focus.click())
                {
                    log("点击搜索行")
                    break
                }
                else
                    p_lb_focus = p_lb_focus.parent()
                pindex = pindex +1
            }
            
            sleep(1000)
            if(currentActivity()=="com.ss.android.ugc.aweme.profile.ui.UserProfileActivity")
            {
                if(!text(shortID))
                {
                    log("进错了界面")
                    return false;
                }

                var focusBtn = packageName(this.getPackage()).textContains("关注").clickable(true).findOnce();
                if (focusBtn == null) {
                    return false;
                }
                focusBtn.click();
                sleep(1000);
                var isfast=this.isFocusTooTast(2);
                this.gotoHome();
              
                    if(isfast)
                    {
                        this.global.error("可能关注手速太快")
                        this.focusTooFastNotifyCount= this.focusTooFastNotifyCount +1
                    }
                    else
                        this.focusTooFastNotifyCount = 0;
            }
            else
            {
                log("没能进到用户界面 当前界面:"+currentActivity())
                return false;
            }
        }
        catch(e)
        {
            log("shortID 关注失败:"+e)
            return false
        }
    }
    this.doFocusByProduct= function (userId)
    {
        this.gotoUserProfile(userId);
        sleep(5000);
        var lbl=packageName(this.getPackage()).className("TextView").textContains("作品").findOnce();
        if(lbl)
        {
            var container=lbl.parent();
            if( container.className().indexOf("ActionBar") == -1 )
            {
                container=container.parent();
            }
            if( container.className().indexOf("ActionBar") == -1 )
            {
                container=container.parent();
            }
            if( container.className().indexOf("ActionBar")!= -1 &&!container.selected()&&container.clickable())
            {
                log("选中作品");
                container.click();
                sleep(500);
            }
        }
        if (this.config.androidVersion >= 7) 
        {

            log("滑动作品")
            swipe(device.width * 0.9, device.height * 0.8, device.width * 0.9, device.height * 0.1, 200); 
            sleep(500);

        }
        var icon=packageName(this.getPackage()).className("ImageView").descStartsWith("视频").findOnce();
        if(icon)
        {
            var container="";
            var parent=icon.parent();
            var childs=parent.children();
            for(var i=0;i<childs.length;i++)
            {
                if(childs[i].clickable()&&childs[i]!=icon)
                {
                    container=childs[i];
                    if(container.click())
                        log("container click 成功");
                }
            }
            if(!icon.clickable()&&!container)
            {
                log("作品不可点击");
                return -1;
            }
            if(!this.global.clickView(icon))
                log("icon no click");
          var btntime = 8000;
          var button ;
          while(btntime>0)
          {
            sleep(2000);
            btntime = btntime -2000;
            button=packageName(this.getPackage()).className("Button").descStartsWith("关注").clickable().findOnce();
            if(button)
                break;
          }
            if(!button)
            {
                if (this.config.androidVersion >= 7 && container)
                {
                    log("点开一个作品")
                    var b = container.bounds()  
                    click(b.centerX(), b.centerY())
                    btntime = 8000;
                    while(btntime>0)
                    {
                        sleep(2000);
                        btntime = btntime -2000;
                        button=packageName(this.getPackage()).className("Button").descStartsWith("关注").clickable().findOnce();
                        if(button)
                            break;
                    }
                }
            }
            if(button)
            {
                sleep(7000);
                button.click();
                sleep(2000);
               return 0;
            }
            else
            {
                log("关注按钮没找到");
            }
        }
        else
            log("没有找到作品");
        return -1;
    }
    this.logTime=function(taskname,shouldlog)
    {
        if(shouldlog)
        {
            cur = (new Date()).valueOf();
            log(taskname+"用时:"+(cur-this.timestamp));
            this.timestamp=cur;
        }
    }
     
    //快速关注
    this.quickFocus=function(userId,awemeid)
    {
        var shouldlog=false;
        this.timestamp= (new Date()).valueOf();
        if(!awemeid&&this.config.quickTask==1)
            log("视频ID不存在");
        if(awemeid&&this.config.quickTask==1)
        {
            //log("视频ID:"+awemeid);
            var state=false;
            if(/^\d+$/.test(awemeid))
            {
                this.gotoDetail(awemeid);
                sleep(6000);
                var button=packageName(this.getPackage()).className("Button").descStartsWith("关注").clickable().findOnce();
                if(button)
                {
                    var subviews=button.parent().children();
                    for(var i=0;i<subviews.length;i++)
                    {
                        var view=subviews[i];
                        if(view.clickable()&&view.className()=="android.widget.ImageView")
                        {
                            view.click();
                            sleep(2000);
                            state=true;
                            break;
                        }
                    }
                }
                else
                    log("没有找到关注按钮");
            }
            if(!state)
            {
                this.gotoUserProfile(userId);
                sleep(3000);
            }
        }
        else
        {
            this.gotoUserProfile(userId);
            sleep(3000);
            this.logTime("进入用户界面",shouldlog);
        }
        this.logTime("获取关注数",shouldlog);
        var focusBtn = packageName(this.getPackage()).textContains("关注").clickable(true).findOnce();
        if(!this.isCorrectFoucusBtn(focusBtn))
        {
            log(focusBtn);
            focusBtn=this.findFoucusBtn();
            if (focusBtn == null) 
            {
                log("没有找到关注按钮,稍等一会再找一次");
                sleep(3000);
                focusBtn=this.findFoucusBtn();
            }
        } 
        if (focusBtn == null) 
        {
            log("没找到关注按钮");
            return false;
        } 
        if(focusBtn.text().indexOf("取消关注")!=-1)
        {
            console.warn("任务重复,已经是关注状态");
            return false;
        }
        focusBtn.click();
        sleep(1000);
        var isfast=this.isFocusTooTast(2);
        this.logTime("关注用户",shouldlog);
        this.gotoHome();
        this.logTime("回到首页",shouldlog); 
       
        this.logTime("获取关注数",shouldlog);
       
        if(isfast)
        {
            this.global.error("可能关注手速太快")
            this.focusTooFastNotifyCount= this.focusTooFastNotifyCount +1
        }
        else
            this.focusTooFastNotifyCount = 0;
 
    }
    this.findFoucusBtn=function()
    {
        var btns = packageName(this.getPackage()).textContains("关注").clickable(true).find();
        for(var i=0;i<btns.length;i++)
        {
            if(this.isCorrectFoucusBtn(btns[i]))
            {
                return btns[i];
            }
        }
        return null;
    }
    this.isCorrectFoucusBtn=function(view)
    {
        if(view&&view.bounds().right<device.width&& view.bounds().left<view.bounds().right&& view.bounds().top<view.bounds().bottom&& view.bounds().bottom<device.height*0.5&&view.bounds().width()>device.width*0.3)
            return true;
        return false;
    }
    // 打开用户主页关注，检测上量
    this.doFocusByUserId = function (userId,shortID,awemeid,successCallback,failCallback){
        var lastFocusNum = this.curFocusNum 
        if(lastFocusNum != -1)
        {

            this.curFocusNum = this.getFocusNum()
             log("关注前：" + lastFocusNum + "，关注后：" + this.curFocusNum);

            if(this.curFocusNum>lastFocusNum)
            {
                log("关注成功");
                successCallback()
            }
            else            
            {
                log("关注失败");
                failCallback()
            }
        }
        else
           this.curFocusNum = this.getFocusNum() 

        this.doFocusNew(userId,shortID,awemeid)

    }
    this.doFocusNew = function (userId,shortID,awemeid) {

        if (currentPackage() != this.getPackage()) 
        {
            app.launchPackage(this.getPackage());
            log("打开D音中..."); 
            sleep(8000); 
        }
        this.checkFast(true);
        if(this.config.quickTask==0||this.config.quickTask==3)
        {
            log("shortID:"+shortID); 
        }
        if(this.config.quickTask==3 && shortID )
            return this.doFocusByShortID(shortID);
        if(this.config.quickTask&&userId)
                return this.quickFocus(userId,awemeid);
        var state=this.doFocusByProduct(userId);
        if(state!=-1)
            return state;
        if(this.config.androidVersion >= 7 && shortID && this.dyUrl)
            return this.doFocusByShortID(shortID)
        try {
            this.gotoUserProfile(userId);
            sleep(4000);
            if (!this.dyUrl) {
                log("uncheck")
                return this.doFocusByUserIdUncheck(userId);
            }

            var focusBtn = packageName(this.getPackage()).textContains("关注").clickable(true).findOnce();
            if (focusBtn == null) {
                return false;
            }

            sleep(1000);
            focusBtn.click();
            sleep(2000);
            var douBtn = packageName(this.getPackage()).textContains("抖一下").findOnce();
            if(douBtn && this.config.androidVersion >= 7)
            {

                var b = douBtn.bounds();       
                click(b.centerX(), b.centerY())
                sleep(1000)
            }
           
       
        } catch (e) {
            console.warn("关注失败"+e);
            return false;
        }
    };

    // 滑屏
    this.nextAv = function () {
        if (this.config.androidVersion >= 7) {
            // swipe(device.width / 2 - 50, device.height - 200, device.width / 2, 200, 300);
            swipe(device.width * 0.5, device.height * 0.7, device.width * 0.5, device.height * 0.1, 200);
        }
    };

    // 设置当前抖音任务号id
    this.setUserId = function () {
        var i = 0;
        while (true) {
            try {
                i++;
                // log("初始化dy...");
                var json = http.get(this.dyUrl);
                var string = JSON.stringify(json);
                // log(string);
                var m = string.match(/"user","(.*?)"/);
                this.dyUid = m[1];
                return;
            } catch (e) {
                if (i > 20) {
                    throw new Error("网络出错或抖音链接错误");
                }
                sleep(200);
            }
        }

    }

    // 用户抖音用户id
    this.getUserId = function () {
        return this.dyUid;
    }

    // 根据抖音链接获取用户信息
    this.getUserInfo = function () 
    {
        var secUid="";
        if(this.quickVersion||this.secUid)
            secUid=this.secUid;
        else
        {
            var json = http.get(this.dyUrl);
            var string = JSON.stringify(json);
            // log(string);
            var m = string.match(/"sec_uid","(.*?)"/);
            secUid = m[1];
        }
        // var res = http.get("https://www.iesdouyin.com/web/api/v2/user/info/?sec_uid=MS4wLjABAAAANSqT1808e3mTI8M98xa1w-HjMK3hBUKlpVZ1hXpOux4");
        var res = http.get("https://www.iesdouyin.com/web/api/v2/user/info/?sec_uid=" + secUid);
        
        var userInfoJson = res.body.json();
        
        if(this.quickVersion&& userInfoJson&&userInfoJson.user_info&&userInfoJson.user_info.nickname)
        {
            this.userName=userInfoJson.user_info.nickname;
            if(userInfoJson.user_info.uid)
                this.dyUid=userInfoJson.user_info.uid;
        }
        if(!this.config.debug &&userInfoJson&&userInfoJson.user_info)
        {
            following_count=userInfoJson.user_info.following_count;
            favoriting_count=userInfoJson.user_info.favoriting_count;
            if(favoriting_count>=10000)
                favoriting_count=0;
            this.global.updateFoucsLikeNum(following_count,favoriting_count);
        }
        return userInfoJson.user_info;
    }
    
    // 获取点赞数
    this.getLikeNum = function () {
        if(this.quickVersion&&!this.secUid&&this.dyUid)
        {
            this.updateNumByUI();
            return this.global.currentLikeCount;
        }
        if(this.bigLike  && this.dyUid)
        {
            var num = this.getLikeNumByUI()
            if(num<10000)
                this.bigLike = false
            return num
        }
        var num = this.getLikeNumByApi();
        if(num >=10000)
        {
            this.bigLike = true
            return this.getLikeNumByUI()
        }
        else
        {

            this.bigLike = false
            return num
        }
    
    };
    this.updateNumByUI=function()
    {
        this.gotoUserProfile(this.dyUid);
        sleep(3000);
        var lbl=text("获赞").findOnce();
        if(!lbl)
        {
            sleep(2000);
            lbl=text("获赞").findOnce();
        }
        if(lbl)
        {
            var lb_like =  packageName(this.getPackage()).textStartsWith("喜欢").findOnce();
            var likenum="";
            var focusnum="";
            if(lb_like)
            {
                  likenum=parseInt(lb_like.getText().replace("喜欢",'').trim());
            }
            var lb_focus = text("关注").findOnce();
            if(lb_focus)
            {
                var subviews=lb_focus.parent().children();
                for(var i=0;i<subviews.length;i++)
                {
                    var view=subviews[i];
                    var textContent=view.text();
                    if(textContent!="关注"&&view.className()=="android.widget.TextView")
                    {
                        focusnum = parseInt(textContent);
                        break;
                    }
                }
            }
            this.global.updateFoucsLikeNum(focusnum,likenum);
        }
    }
    this.getLikeNumByUI = function()
    {
        this.gotoUserProfile(this.dyUid);
        sleep(2000)
        var i = 0;
        while (true) {
            // log("获取关注数:" + i);
            try {
                i++;
                var lb_dya = textStartsWith("抖音号").findOnce();
                var lb_like =  packageName(this.getPackage()).textStartsWith("喜欢").findOnce();
                var lb_focus = text("关注").findOnce();
                if(lb_dya != null && lb_like != null && lb_focus !=null)
                {
                    
                    var like = lb_like.getText()
                    var like_num = null
                    like_num = like.replace("喜欢",'');
                    like_num = like.replace("喜欢 ",'');
                    log("like_num:"+like_num)
                    like_num=parseInt(like_num);
                    if(isNaN(like_num))
                        like_num=0;
                    back();
                    sleep(1000)
                    this.global.updateFoucsLikeNum("",like_num);
                    return like_num;
                }
                else
                {
                   if(lb_dya == null)
                        log("没有找到抖音号");
                    else if(lb_like == null)
                        log("没有找到喜欢按钮,可能当前绑定账号与当前做任务的号不匹配");
                    else if(lb_focus == null)
                        log("没有找到关注数量,请升级到最新版本");
                }
                if (i > 5) {
                    return -1;
                }

            } catch (e) {
                if (i > 1)
                 {
                    throw new Error("已5次获取关注数失败，放弃"+e);
                }
                sleep(200);
            }
        }
    }
    // 获取点赞数
    this.getLikeNumByApi = function () {
        var i = 0;
        while (true) {
            try {
                i++;
                var userInfo = this.getUserInfo();
                var num = userInfo.favoriting_count;
                return parseInt(num);
            } catch (e) {
                if (i > 20) {
                    throw new Error("已20次获取点赞数失败，放弃");
                }
                // this.global.error("获取点赞数失败,重试");
                sleep(200);
            }
        }
    }

    // 获取关注数
    this.getFocusNum = function () 
    {
        if(this.quickVersion&&!this.secUid&&this.dyUid)
        {
            this.updateNumByUI();
            return this.global.currentFollowingCount;
        }
        if(this.config.quickTask<2)
            sleep(3000);
        var i = 0;
        while (true) 
        {
            try {
                i++;
                var userInfo = this.getUserInfo();
                var num = userInfo.following_count;
                return parseInt(num);
            } catch (e) {
                if (i > 20) {
                    throw new Error("已20次获取关注数失败，放弃");
                }
                // this.global.error("获取点赞数失败,重试");
                sleep(200);
            }
        }
    }
    //监听弹窗事件(异常处理)
    this.listenDialog = function () {
    var version=this.config.androidVersion;
     var netthis = this
        threads.start(function () {
            var n = 1;
            while (true) {
                try {
                    if (currentPackage() != netthis.getPackage()) {
                        // console.warn("不是抖音")
                        sleep(3000);
                        continue;
                    }
                    netthis.global.closeGenernalDialog();
                    if (text('同步到今日头条').exists()) {
                        console.verbose("关闭");
                        // id("com.ss.android.ugc.aweme:id/dda").findOnce(1000).click();//点击关闭 9.9版本
                        id("com.ss.android.ugc.aweme:id/d5h").findOnce().click();//点击关闭
                    };
                    if (text('滑动查看更多').exists() || text('长按屏幕使用更多功能').exists()) {
                        console.verbose("返回");
                        back();
                    }
                    if (text('上滑查看更多视频').exists()) {
                        if (version >= 7) 
                        {
                            console.verbose("上滑"); 
                            swipe(device.width * 0.5, device.height * 0.9, device.width * 0.5, device.height * 0.1, 2000);
                        }
                        else
                        {
                            console.verbose("请自己 上滑关掉提示");
                        }
                    }
                    if (text('发现通讯录好友').exists()) {
                        console.verbose("取消");
                        text('取消').click();
                        text('暂时不要').click();
                    };
                    if (text('立刻预约').exists()) {
                        console.verbose("立刻预约");
                        text('立刻预约').click();
                    };
                    if (text('同意授权').exists()) {
                        console.verbose("同意授权");
                        text('同意授权').click();
                    };
                    if (text('好友推荐').exists()) {
                        console.verbose("关闭");
                        var lbl=text('好友推荐').findOnce();
                        if(lbl)
                        {
                            var subviews=lbl.parent().children();
                            for(var i=0;i<subviews.length;i++)
                            {
                                var view=subviews[i];
                                if(view.clickable()&&!view.desc())
                                {
                                    view.click();
                                    break;
                                }
                            }
                        }
                    };
                    if (text('取消').clickable(true).exists() && !textEndsWith("从相册选择").exists()
                        && !text("完成").exists() && !text("今日头条登录").exists() && !text("退出登录").exists() && !text("退出").exists() && !text("复制链接").exists()) {
                        console.verbose("取消");
                        text('取消').click();
                    };
                    sleep(2000);
                    n++;
                } catch (e) {
                    // this.global.error(e);
                }
            };

        });

    }

    // 脚本结束
    this.finish = function () {
        log("执行完成");
        threads.shutDownAll();
        engines.stopAll();
        exit();
    };

    // 任务前养号
    this.doBringBefore = function () {
        if (this.config.androidVersion < 7) {
            log("系统不支持滑屏，跳过养号");
            return ;
        }

        log("开始前养号");
        this.gotoHome();
        var config = this.config;
        var viewVideoNum = random(parseInt(config.beforeVideoNum1), parseInt(config.beforeVideoNum2));
        log("看视频" + viewVideoNum + "个");
        for (var i = 1; i <= viewVideoNum; i++) {
            this.nextAv();
            var viewTime = random(parseInt(config.beforeVideoTime1), parseInt(config.beforeVideoTime2));
            log("观看第" + i + "个视频" + viewTime + "秒");
            sleep(viewTime * 1000);
        }
        log("养号结束，准备开始任务");
    }

    // 任务中养号
    this.doBringOngoing = function () {
        if (this.config.androidVersion < 7) {
            log("系统不支持滑屏，跳过养号");
            return ;
        }

        log("任务中养号");
        this.gotoHome();
        var config = this.config;
        var viewVideoNum = random(parseInt(config.ongoingVideoNum1), parseInt(config.ongoingVideoNum2));
        log("看视频" + viewVideoNum + "个");
        for (var i = 1; i <= viewVideoNum; i++) {
            this.nextAv();
            var viewTime = random(parseInt(config.ongoingVideoTime1), parseInt(config.ongoingVideoTime2));
            log("观看第" + i + "个视频" + viewTime + "秒");
            sleep(viewTime * 1000);
        }
        log("看视频结束，继续任务");
    }
    
    this.getUserIdFromSettingUI=function()
    {
        var state = this.gotoSettingUI(0);
        if(state)
        {
            if (this.config.androidVersion >= 7) 
            {
                swipe(device.width * 0.9, device.height * 0.8, device.width * 0.9, device.height * 0.1, 500);
                sleep(1000);
                swipe(device.width * 0.9, device.height * 0.8, device.width * 0.9, device.height * 0.1, 500);
                sleep(1000);
                swipe(device.width * 0.9, device.height * 0.8, device.width * 0.9, device.height * 0.1, 500);
                sleep(1000);
            }
            var lbl=className("TextView").textContains("version").findOnce();
            if(lbl)
            {
                if(lbl.clickable())
                {
                    lbl.click();
                    lbl.click();
                    lbl.click();
                    lbl.click();
                    lbl.click();
                    lbl.click();
                }
                var useridlbl=className("TextView").textContains("UserId").findOnce();
                if(!useridlbl&&this.config.androidVersion >= 7)
                {
                    log("用户ID没出来,使用触控点击");
                    var centerx=lbl.bounds().left+lbl.bounds().width()*0.5;
                    var centery=lbl.bounds().top+lbl.bounds().height()*0.5;
                    click(centerx,centery);
                    click(centerx,centery);
                    click(centerx,centery);
                    click(centerx,centery);
                    click(centerx,centery);
                    click(centerx,centery);
                    sleep(500);
                    useridlbl=className("TextView").textContains("UserId").findOnce();
                }
                if(useridlbl)
                {
                    var content=useridlbl.text().replace("\n","").trim();
                    
                    var    urlRegex = /UserId:(.*)DeviceId/;
                    var items=urlRegex.exec(content);
                    if(items.length>1)
                    {
                        this.dyUid=items[1].trim();
                        return items[1].trim();
                    }
                    else
                    {
                        log(content);
                        log("正则未匹配到用户ID");
                    }
                }
                else
                {
                    log("用户ID没出来");
                }
            }
            else
            {
                log("没有找到底部版本号");
            }
        }
        return "";
    }
    this.parseUserIdWithLongUrl=function(url)
    {
        urlRegex = /share\/user\/(\d+)\?/;
        var items=urlRegex.exec(url);
        urlRegexSecid =/sec_uid=(.*?)(?=&|$)/;
        var itemsSecid=urlRegexSecid.exec(url);
        if(itemsSecid&& itemsSecid.length>1)
        {
            this.secUid=itemsSecid[1];
        }
        if(items&& items.length>1)
        {
            log("用户ID:"+items[1]);
            var correctName=this.userName.indexOf("用户")==-1&&this.userName.indexOf("User")==-1;
            if(this.shortID&&this.userName&&correctName&&this.secUid)
            {
                this.config['dy:'+this.shortID]=items[1]+"|"+this.userName+"|"+this.secUid;
                var sto = storages.create("hzConfigData");
                sto.put("config", this.config);
            }
            return items[1];
        }
        else
        {
            log("正则未匹配到用户ID");
            log("url:"+url);
        }     
        return "";
    }
    this.parseUserIdWithShortUrl=function(url)
    {
        var    urlRegex = /(https:\/\/v.douyin.com.*)/;
        var items=urlRegex.exec(url);
        if(items.length>1)
        {
             url=items[1];
        }
        this.setDyUrl(url.trim());
        var content="";
        try {
             content = http.get(url.trim());
        } catch (e) 
        {
            log("请求错误： " + e)
           if(trytimes<3)
                return this.getMyUserid(trytimes+1);
            else
                return "";
        }
        if(content&&content.statusCode != 200)
            log("请求失败: " + content.statusCode + " " + content.statusMessage);
        else
        {
            var string = JSON.stringify(content);
            var data =  JSON.parse(string);
            if(data)
            {
                var url=data.url.url;
                if(url)
                {
                    return this.parseUserIdWithLongUrl(url);
                }
                else
                {
                    log("返回的url为空");
                }
            }
            else
            {
                log("数据解析失败");
                log(string);
            }
        }
        return "";
    }
    //获取我的用户ID
    this.getMyUserid=function(trytimes )
    {
        if (currentPackage() != this.getPackage()) {
            this.openApp();
            sleep(10000);
        }
        log("获取用户ID");
        var mine = this.gotoMine();
        if(mine)
        {
            if(this.quickVersion)
                return this.shortID;
            if(this.shortID)
            {
                var userinfo=this.config['dy:'+this.shortID];
                if(userinfo)
                {
                    var arr=userinfo.split("|");
                    if(arr.length>2)
                    {
                        this.dyUid=arr[0];
                        this.userName=arr[1];
                        this.secUid=arr[2];
                        log("用户名:"+this.userName); 
                        log("用户ID:"+this.dyUid);
                        return arr[0];
                    }
                }
            }
            var icon = packageName(this.getPackage()).className("RelativeLayout").boundsInside(device.width*0.8, 0, device.width, device.height*0.2).clickable().findOnce();  
            if(icon)
            {
                icon.click();
                sleep(3000);
                var lbl=text("我的二维码").findOnce();
                if(!lbl)
                    lbl=text("个人名片").findOnce();
                if(lbl)
                {
                    if(!this.global.clickView(lbl))
                        log("我的二维码不可点");
                    sleep(5000);
                    var lbl=text("我的名片").findOnce();
                    if(lbl)
                    {
                        var lbl=packageName(this.getPackage()).id("title").boundsInside(device.width*0.2, device.height*0.3, device.width*0.8, device.height*0.8).findOnce();
                        if(lbl)
                        {
                            this.userName=lbl.text();
                            log("用户名:"+this.userName); 
                        }
                        else
                        {
                            log("没有找到用户名");
                        }
                        var icon="";
                        var icons = packageName(this.getPackage()).className("ImageView").boundsInside(device.width*0.8, 0, device.width, device.height*0.2).clickable().find();  
                        log("图片个数"+icons.length);
                        for(var i=0;i<icons.length;i++)
                        {
                            var item=icons[i];
                            if(  item.id() && item.id().indexOf("systemui") != -1 )
                            {
                                log("systemui");
                                continue;
                            }
                            var bounds = item.bounds()
                            if(bounds.left>bounds.right || bounds.top >bounds.bottom)
                            {
                                log("镜像图片")
                                continue;
                            }
                            if(!icon)
                                icon=item; 
                            else  if(item.bounds().right>icon.bounds().right)
                                icon=item;
                        }
                        if(icon)
                        {
                            icon.click();
                            sleep(3000);
                            var lbl=text("复制链接").findOnce(); 
                            if(lbl)
                            {
                                if(lbl.parent().clickable())
                                    lbl.parent().click();
                                else
                                    log("复制链接不可点");
                                sleep(2000);
                                var url=this.global.getClipBoardContent(this.getPackage());
                                back();
                                if(url)
                                {
                                    var    urlRegex = /(https:\/\/v.douyin.com.*)/;
                                    var state=urlRegex.test(url);
                                    if(!state)
                                    {
                                        log(url);
                                        if(url.indexOf("iesdouyin.com/share/user/")!=-1)
                                        {
                                            return this.parseUserIdWithLongUrl(url);
                                        }
                                        log("复制链接失败");
                                        return "";
                                    }
                                    return this.parseUserIdWithShortUrl(url);
                                }
                                else
                                {
                                    log("粘贴板内容为空");
                                }
                            }
                            else
                            {
                                log("分享按钮点击失败");
                            }
                        }
                        else
                        {
                            log("右上角分享按钮没找到");
                        }
                    }
                    else
                    {
                        log(curAc);
                        log("进入我的二维码界面失败");
                    }
                }
                else
                {
                    log("没有找到我的二维码");
                }
            }
            else
            {
                log("没找到右上角菜单图标");
            }
        }
        else
        {
            log("进入个人信息界面失败");
        }
        if(trytimes<3)
        {
            log("稍等重试");
            sleep(10000);
            return this.getMyUserid(trytimes+1);
        } 
        return "";
    }

    //切换账号 nickname
    this.changeAccount=function(nickname)
    {
        if (currentPackage() != this.getPackage()) 
        {
            app.launchPackage(this.getPackage());
            log("打开抖音中..."); 
            sleep(10000); 
        }
        var oldShortID=this.shortID;
        this.shortID="";
        this.userName="";
        this.dyUid="";
        this.secUid="";
        console.warn("任务:切换账号到"+nickname);
        var state=this.gotoChangeAccountUI(0);
        if(state)
        {
            var nickname_lbl= packageName(this.getPackage()).text(nickname).findOnce(); 
            if(nickname_lbl)
            {
                if(!this.global.clickView(nickname_lbl))
                    log("昵称不可点");
                sleep(1000);
                if (text("身份校验").exists()) 
                {
                    log("首页切换账号需要身份校验");
                    text("取消").click();
                    return false;
                }
                sleep(7000);
                log("获取用户ID对比是否切换成功"); 
                this.getMyUserid();
                if(this.shortID!=oldShortID)
                {
                    log("切换成功");
                    return true;
                }
                else
                {
                    log("切换失败");
                    return false;
                }
            }
            else
            {
                log("想要切换的账号:  "+nickname+ "  不存在,切换失败"); 
                sleep(5000);
                return false;
            }
        }
        else
        {
            log("切换账号"+nickname+"失败");
            return false;
        }
    }
    //获取我的账号列表
    this.getAccountList=function()
    {
        if (currentPackage() != this.getPackage()) 
        {
            app.launchPackage(this.getPackage());
            log("打开抖音中..."); 
            sleep(10000); 
        }
        log("获取账号列表");
        var state=this.gotoChangeAccountUI(0);
        if(state)
        {
            var names=new Array();
            var views=packageName(this.getPackage()).textContains("抖音").className("TextView").find();
            for(var i=0;i<views.length;i++)
            {
                var container=views[i].parent()
                var subviews=container.children();
                for(var j=0;j<subviews.length;j++)
                {
                    var view=subviews[j];
                    if(view.className()=="android.widget.TextView")
                    {
                        if(view.text()!="抖音短视频")
                        {
                            var nickname=view.text();
                            names.push(nickname);
                        }
                        break;
                    }
                }
            }
            if(views.length==0)
            {
                var views=packageName(this.getPackage()).className("TextView").find();
                for(var i=0;i<views.length;i++)
                {
                    var name=views[i].text().trim();
                    if(name&&name!="帐号切换"&&name!="管理"&&name!="添加帐号")
                    {
                        names.push(name);
                    }
                }
            }
            return names;
        }
        return "";
    }
    this.openModuleUI=function(trytimes)//抖音右侧菜单栏功能界面
    {
        var lbl= packageName(this.getPackage()).text("我的收藏").findOnce();
        if(lbl)
        {
            trytimes&&log("进入右侧菜单栏界面成功");
            return true;
        }
        log("准备进入右侧菜单栏界面");
        var mine = this.gotoMine();
        if(mine)
        {
            var icon = packageName(this.getPackage()).className("RelativeLayout").boundsInside(device.width*0.8, 0, device.width, device.height*0.2).clickable().findOnce();  
            if(icon)
            {
                icon.click();
                sleep(3000);
                return this.openModuleUI(trytimes+1);
            }
            else
            {
                log("个人页没找到右上角菜单图标");
            }
        }
        if(trytimes<3)
        {
            log("稍等重试");
            sleep(10000);
            return this.openModuleUI(trytimes+1);
        } 
        return false;
    }
    
    //进入切换账号界面
    this.gotoChangeAccountUI=function(trytimes)
    {
        var curAc = currentActivity();//com.ss.android.ugc.aweme.account.business.multiaccounts.MultiAccountsManagerActivity
        var lbl=text("添加帐号").findOnce();//添加5,6个账号后,添加账号会消失
        if(lbl||curAc.indexOf("MultiAccounts")!=-1)
        {
            trytimes&&log("进入切换账号成功");
            return true;
        }
        log("准备进入切换账号界面");
        var state = this.gotoSettingUI(0);
        if(state)
        {
            var lbl= packageName(this.getPackage()).text("帐号切换").findOnce(); 
            if(lbl)
            {
                log("找到帐号切换按钮");
                if(!this.global.clickView(lbl))
                {
                    log("帐号切换不可点");
                    log(lbl);
                    return false;
                }
                sleep(3000);
                return this.gotoChangeAccountUI(trytimes+1);
            }
            else
            {
                log("没有找到帐号切换按钮");
                this.global.error("建议升级最新版本抖音看看是否有切换账号功能");
                sleep(5000);
                return false;
            }
        }
        if(trytimes<3)
        {
            log("稍等重试");
            sleep(10000);
            return this.gotoChangeAccountUI(trytimes+1);
        } 
        return false;
    }
    this.gotoSettingUI=function(trytimes)//进入设置界面
    {
        var lbl=text("帐号与安全").findOnce();
        if(lbl)
        {
            trytimes&&log("进入设置界面成功");
            return true;
        }
        log("准备进入设置界面");
        var state = this.openModuleUI(0);
        if(state)
        {
            var lbl= packageName(this.getPackage()).text("设置").findOnce(); 
            if(lbl)
            {
                log("找到设置按钮");
                if(!this.global.clickView(lbl))
                {
                    log("设置不可点");
                    log(lbl);
                    return false;
                }
                sleep(3000);
                return this.gotoSettingUI(trytimes+1);
            }
            else
            {
                log("没有找到设置按钮");
                sleep(1000);
            }
        }
        if(trytimes<3)
        {
            log("稍等重试");
            sleep(10000);
            return this.gotoSettingUI(trytimes+1);
        } 
        return false;
    }
    this.findSendBtn=function()
    {
        var emoji=className("ImageView").desc("表情").clickable().findOnce();
        
        if(emoji)
        {
            var icons=className("ImageView").clickable().find();
            for(var i=0;i<icons.length;i++)
            {
                var item=icons[i];
                if(!item.desc()&&Math.abs(emoji.bounds().width()-item.bounds().width())<20 &&emoji.bounds().right<=item.bounds().left)
                    return item;
            }
        }
        else
            log("没有找到发送按钮左边图标");
        return "";
    }
    this.commentWithText=function(content,debug)
    {
        var icon=packageName(this.getPackage()).className("LinearLayout").descStartsWith("评论").clickable().findOnce();
        if(icon)
        {
            icon.click();
            sleep(3000);
            var textfield=packageName(this.getPackage()).className("EditText").clickable().findOnce();
            if(textfield)
            {
                this.config.debug&& console.hide();
                setText(0,content);
                var btn=this.findSendBtn(); 
                if(!btn)
                {
                    textfield.click();
                    sleep(3000);
                    btn=this.findSendBtn();
                }
                this.config.debug&& console.show(); 
                if(btn)
                {
                    btn.click();
                    sleep(3000);
                    setText(0,"");
                    var bind=packageName(this.getPackage()).text("暂不绑定").findOnce();
                    if(bind)
                    {
                        if(bind.clickable())
                            bind.click();
                        else if(bind.parent.clickable())
                            bind.parent.click();  
                    }
                    var lbl=packageName(this.getPackage()).text(content).findOnce();//有表情的情况判断不准
                    var ganggang=packageName(this.getPackage()).text("刚刚").findOnce();
                    var nickname=text(this.userName).findOnce();
                    if(lbl||ganggang||nickname)
                    {
                        if(debug)
                            log("评论成功");
                        return true;
                    }
                    else if(debug)
                        log("评论失败");
                }
                else if(debug)
                {
                    log("没找到发送按钮"); 
                    log(textfield);
                }
                else
                {
                    log("sleep 2")
                }
            }
            else if(debug)
                log("没有找到输入框");
        }
        else if(debug)
            log("没有找到评论图标");  
        return false;
    }
    
    this.gotoMine=function()//进入个人信息界面
    {
        var lbl= packageName(this.getPackage()).text("我的收藏").findOnce();
        if(lbl)//隐藏右边的菜单
        {
            back();
            sleep(2000);
        }
        this.gotoMyProfile();
        var lbl=text("获赞").findOnce();
        var home=text("首页").findOnce();
        if(lbl&&this.global.isCorrectView(home))
        {
            this.shortID="";
            var shortid_lbl=className("TextView").textStartsWith("抖音号").findOnce();
            if(shortid_lbl)
            {
                var douyinshortid = shortid_lbl.text().replace("抖音号：", "").trim();
                douyinshortid = douyinshortid.replace("抖音号:", "").trim();
                log(shortid_lbl.text());
                this.shortID=douyinshortid;
            }
            else
            {
                log("没有找到抖音号");
            }
            return true;
        }
        else
        {
            log("进入个人信息界面");
            var mineLbl = text("我").findOnce();
            !this.global.isCorrectView(mineLbl)&&this.gotoHome();//没有找到首页的我,回到首页
            this.gotoMyProfile();
            sleep(3000);
            var lbl=text("获赞").findOnce();
            if(lbl)
            {
                return this.gotoMine();
            }
            var curAc = currentActivity();
            if (curAc.indexOf("login") != -1) 
            {
                this.global.error("未登录状态,无法进入");
            }
            else
                log("进入个人信息界面失败");
        }
        return false;
    }
}
module.exports = DouyinClass;