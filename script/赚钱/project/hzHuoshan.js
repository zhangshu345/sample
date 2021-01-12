
var hzHuoshan = {};
hzHuoshan.dyUrl = "";
hzHuoshan.dyUid = "";
hzHuoshan.shortID="";//火山号
hzHuoshan.doShortIDs="";//做过任务的火山号
hzHuoshan.appVersion = "";
hzHuoshan.isInitListenDialog = false;
hzHuoshan.config = {};
hzHuoshan.userName = "";
hzHuoshan.secUid = "";
hzHuoshan.global = {};
hzHuoshan.useAPI =false;//使用api获取票数
const HZ_DOUYIN_PACKAGE = "com.ss.android.ugc.live";
const HZ_DOUYIN_DETAIL = "snssdk1112://item?id=";
const HZ_DOUYIN_PROFILE = "snssdk1112://profile?id=";
const HZ_DOUYIN_MAIN_ACTIVITY = "com.ss.android.ugc.live.main.MainActivity";

// 初始化
hzHuoshan.init = function (config) {
    this.config = config;
    this.curFocusNum = -1
    this.checkIsInstallApp();
    // this.setDyUrl(config.dyUrl);
    // this.setUserId();
    this.initAppVersion();
    if (!this.isInitListenDialog) {
        this.listenDialog();
        this.isInitListenDialog = true;
    }
};

// 检查抖音是否安装
hzHuoshan.checkIsInstallApp = function () {
    var dy = app.getAppName(this.getPackage());
    if (dy == null) {
        var dyApp = this.getDyAppName();
        this.global.error("没有安装" + dyApp);
        this.finish();
    }
}


// 获取应用版本
hzHuoshan.getAppVersion = function (package) {
    try {
        importPackage(android.content);
        var pckMan = context.getPackageManager();
        var applicationInfo = pckMan.getApplicationInfo(package,128);

        return applicationInfo.metaData.get("SS_VERSION_NAME");
        // var packageInfo = pckMan.getPackageInfo(package, 0);
        // return packageInfo.versionName;
    } catch (e) {
        log(e);
        throw new Error("获取版本失败");
    }
}

// Return 1 if a > b
// Return -1 if a < b
// Return 0 if a == b

function compare(a, b) {
    if (a === b) {
       return 0;
    }

    var a_components = a.split(".");
    var b_components = b.split(".");

    var len = Math.min(a_components.length, b_components.length);

    // loop while the components are equal
    for (var i = 0; i < len; i++) {
        // A bigger than B
        if (parseInt(a_components[i]) > parseInt(b_components[i])) {
            return 1;
        }

        // B bigger than A
        if (parseInt(a_components[i]) < parseInt(b_components[i])) {
            return -1;
        }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (a_components.length > b_components.length) {
        return 1;
    }

    if (a_components.length < b_components.length) {
        return -1;
    }

    // Otherwise they are the same.
    return 0;
}


//获取应用版本名
hzHuoshan.initAppVersion = function () {
    try {
        var package = this.getPackage();
        var dyApp = this.getDyAppName();
        this.appVersion = this.getAppVersion(package);
        log("唤醒版本号：" + dyApp + this.appVersion);
         
        
    } catch (e) {
        console.warn(e + ",获取电音版本失败")
    }
}

hzHuoshan.setDyUrl = function (dyUrl) {
    this.dyUrl = dyUrl;
};

hzHuoshan.getDyUrl = function () {
    return this.dyUrl;
};

hzHuoshan.getPackage = function () {
    var p = HZ_DOUYIN_PACKAGE;
    return p;
};

// 获取运行的抖音应用名
hzHuoshan.getDyAppName = function () {
    n = "抖音火山版";
    return n;
}

hzHuoshan.getDetailScheme = function () {
    var d = HZ_DOUYIN_DETAIL;
    return d;
};

hzHuoshan.getProfileScheme = function () {
    return HZ_DOUYIN_PROFILE;
};

hzHuoshan.getMainActivity = function () {
    var m = HZ_DOUYIN_MAIN_ACTIVITY;
    return m;
}

hzHuoshan.openApp = function () {
    app.launchPackage(this.getPackage());
};

 
// 打开火山首页
hzHuoshan.gotoHome = function () {
    this.popToRootViewController(0);

}

// 打开用户主页
hzHuoshan.gotoUserProfile = function (userId) {
    app.startActivity({
        action: "android.intent.action.VIEW",
        packageName: this.getPackage,
        data: HZ_DOUYIN_PROFILE + userId,
    });
};

// 打开任务视频
hzHuoshan.gotoDetail = function (awemeId) {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: this.getDetailScheme() + awemeId,
        packageName: this.getPackage()
    });
};

// 点赞，安卓7以下， 检测上量
hzHuoshan.doLikeLowVersionBy320 = function (awemeId) {
    var oldNum = this.getLikeNum();
    try {
        if(this.config.quickTask<2)
            sleep(1000);
        auto.setWindowFilter((info) => {
            return true;
        });
        if(this.config.quickTask<2)
            sleep(500);

        var likeBtn = null;

        let btn = id("a2q").findOnce()
        likeBtn = btn;

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
    if(!this.config.quickTask)
        sleep(2000); // 延迟2秒再查看
    else
        this.popToRootViewController(0);
    var newNum = this.getLikeNum();
    // log("=====自检=====")
    log("点赞前：" + oldNum + "，点赞后：" + newNum);
    if (newNum <= oldNum) {
        console.warn("点赞失败");
        var res = false;
    } else {
        log("点赞成功");
        var res = true;
    }
    return res;
}
hzHuoshan.doLikeLowVersion = function (awemeId) {
    
    var oldNum = this.getLikeNum();
    try {
        if(this.config.quickTask<2)
            sleep(1000);
        auto.setWindowFilter((info) => {
            return true;
        });
        if(this.config.quickTask<2)
            sleep(500);

        var likeBtn = null;

        let btn = packageName(this.getPackage()).descContains("喜欢按钮").className("android.widget.LinearLayout").boundsInside(device.width * 0.5, device.height * 0.3, device.width, device.height * 0.8).findOnce();
        likeBtn = btn;

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

    if(!this.config.quickTask)
        sleep(2000); // 延迟2秒再查看
    else
        this.popToRootViewController(0);    
    var newNum = this.getLikeNum();
    // log("=====自检=====")
    log("点赞前：" + oldNum + "，点赞后：" + newNum);
    if (newNum <= oldNum) {
        console.warn("点赞失败");
        var res = false;
    } else {
        log("点赞成功");
        var res = true;
    }
    return res;
}
// 点赞，安卓7以上，检测上量
hzHuoshan.doLikeHighVersion = function (awemeId) {
    var oldNum = this.getLikeNum();

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
    if(!this.config.quickTask)
        sleep(2000); // 延迟2秒再查看
    else
        this.popToRootViewController(0);

    var newNum = this.getLikeNum();
    // log("=====自检=====")
    log("点赞前：" + oldNum + "，点赞后：" + newNum);
    if (newNum <= oldNum) {
        console.warn("点赞失败");
        var res = false;
    } else {
        log("点赞成功");
        var res = true;
    }
    return res;
}

// 点赞
hzHuoshan.doLike = function (awemeId) {
        if (currentPackage() != this.getPackage()) 
        {
            app.launchPackage(this.getPackage());
            log("打开H山中..."); 
            sleep(8000); 
        }

        if(this.appVersion == "3.2.0")
        {
            return this.doLikeLowVersionBy320(awemeId)
        }
        if (this.config.androidVersion < 7) {
            return this.doLikeLowVersion(awemeId);
        } else {
            return this.doLikeHighVersion(awemeId);
        }
};
 //快速关注
 hzHuoshan.quickFocus=function(userId,awemeid)
 {
    
    if(!awemeid&&this.config.quickTask==1)
        log("视频ID不存在");
    var oldNum = this.getFocusNum();

    if(awemeid&&this.config.quickTask==1)
    {
        log("视频ID:"+awemeid);
        var state=false;
        if(/^\d+$/.test(awemeid))
        {
            this.gotoDetail(awemeid);
            sleep(6000);
            var button=packageName(this.getPackage()).text("关注").clickable(true).findOnce();
            if(button)
            {
                var subviews=button.parent().parent().children();
                for(var i=0;i<subviews.length;i++)
                {
                    var view=subviews[i];
                    if(view.clickable()&&view.className()=="android.widget.TextView")
                    {
                        view.click();
                        state=true;
                        sleep(2000);
                        break;
                    }
                }
            }
            else
                log("没有找到关注按钮");
        }
        if(!state)
        {
            log("作品页进用户页失败");
            this.gotoUserProfile(userId);
            sleep(3000);
        }
    }
    else
    {
        this.gotoUserProfile(userId);
        sleep(3000);
    }
     var lbl=packageName(this.getPackage()).text("发私信").findOnce();
     if(lbl)
     {
        this.global.error("任务重复,已经是关注状态");
        return false;
    }
    var focusW = packageName(this.getPackage()).text("关注").findOnce();
    if (focusW != null) 
    {  
        if(!this.global.clickView(focusW))
        {
            log("关注按钮不可点");
            return false;
        }
     }else 
     {
         console.warn("未找到关注控件，关注失败");
         return false;
     }
     sleep(500);
     this.gotoHome();
      
     var newNum = this.getFocusNum();
     log("关注前：" + oldNum + "，关注后：" + newNum);
     if (newNum <= oldNum) {
         console.warn("关注失败");
         return false;
     } else {
         log("关注成功");
         return true;
     }
 }
  
 hzHuoshan.clickRightBarItem = function (index)//假如右边有二个按钮0是第1个  1是第二个  2 是第三个 
 {
    var items = packageName("com.ss.android.ugc.live").className("ImageView").boundsInside(device.width*0.7, 0, device.width, device.height*0.2).find(); 
    var icons = new Array();
    if(items.length>1)
    {
        for(var i=0;i<items.length;i++)
        {
            var item=items[i];
            if(!item.clickable() && !item.parent().clickable())
                continue;
            var bounds = item.bounds()
            if(bounds.left>bounds.right || bounds.top >bounds.bottom)
                continue;
            icons.push(item);
        }
    }
    let length = icons.length;
    for (let i = 1; i < length; i++) //插入排序  ,按横坐标从小到大排序
    {
        let key = icons[i], j = i - 1;
        while (j>=0&&icons[j].bounds().right > key.bounds().right) 
        {
            icons[j + 1] = icons[j];
            j--;
        }
        icons[j + 1] = key;
      }
      if(icons.length>index)
      {
          var icon=icons[index];
          this.global.clickView(icon);
          return true;
      }
      return false;
 } 
 hzHuoshan.doFocusByShortId = function (shortID) 
 {
    var oldNum = this.getFocusNum();
    var state=this.gotoSelfProfile(0);
    if(state)
    {
       this.clickRightBarItem(0);
       sleep(3000);
       var lbl=packageName("com.ss.android.ugc.live").text("发现好友").findOnce();
       if(!lbl)
       {
            log("没有找到发现好友");
            return false;
       }
       this.clickRightBarItem(0);
        sleep(3000);
        var edit = packageName("com.ss.android.ugc.live").className("EditText").findOnce();
        if(edit)
        {
            edit.setText(shortID);
            this.global.clickView(edit);
            sleep(2000);
            var searchLbl=packageName("com.ss.android.ugc.live").text("搜索").className("TextView").findOnce();
            if(searchLbl)
            {
                this.global.clickView(searchLbl);
                sleep(4000);
                var fans = packageName("com.ss.android.ugc.live").textContains("粉丝数").findOnce();
                if(fans)
                {
                    this.global.clickView(fans);
                    sleep(2000);
                }
                var focusLbl=packageName("com.ss.android.ugc.live").text("关注").className("TextView").findOnce();
                if(!focusLbl)
                {
                    log("没有搜索到用户,关注不可见");
                    return false;
                }
                this.global.clickView(focusLbl,3);
                sleep(2000);
            }
            else
            {
                log("点击搜索框没有找到搜索按钮");
                return false;
            }
        }
        else
        {
            log("没有找到搜索框");
            return false;
        }
         
    }
    else
    {
        return false;
    }
    this.gotoHome();
      
     var newNum = this.getFocusNum();
     log("关注前：" + oldNum + "，关注后：" + newNum);
     if (newNum <= oldNum) {
         console.warn("关注失败");
         return false;
     } else {
         log("关注成功");
         return true;
     }
 }
// 打开用户主页关注, 检测上量
hzHuoshan.doFocusByUserId= function (userId,awemeid,shortID,successCallback,failCallback) 
{
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
    {
        this.curFocusNum = this.getFocusNum() 

    }
   this.doFocusNew(userId,awemeid,shortID)

}
hzHuoshan.doFocusNew= function (userId,awemeid,shortID) {
    try {
        if (currentPackage() != this.getPackage()) 
        {
            app.launchPackage(this.getPackage());
            log("打开H山中..."); 
            sleep(8000); 
        }

        if(this.appVersion == "3.2.0")
        {
            return this.doFocusByProductByLow320()
        }
        if(this.config.quickTask==3)
        {
            log("shortID:"+shortID); 
            if(shortID)
                return this.doFocusByShortId(shortID);
        }

        if(this.config.quickTask&&userId)
            return this.quickFocus(userId,awemeid);
        hzHuoshan.gotoUserProfile(userId);
        log("看" + config.taskInterval + "秒");
        sleep(1000 + config.taskInterval * 1000);

         var oldNum = this.getFocusNum();
        var ret = this.doFocusByProduct()
        if(ret !=0 )
        {
            var focusW = packageName(this.getPackage()).text("关注").findOnce();
            if (focusW != null) 
            { // 低版本
                if(!this.global.clickView(focusW))
                {
                    log("关注按钮不可点");
                    return false;
                }
    
            } else {
                console.warn("未找到关注控件，关注失败");
                return false;
            }
            sleep(2000);
            this.doFocusByPrivateMsg();
    }
         
    } catch (e) {
        log(e);
        console.warn("未找到关注控件2");
        return false;
    }

    var newNum = this.getFocusNum();
    log("关注前：" + oldNum + "，关注后：" + newNum);
    if (newNum <= oldNum) {
        console.warn("关注失败");
        return false;
    } else {
        log("关注成功");
        return true;
    }
};

//点击作品关注
// "com.ss.android.ugc.live.detail.DetailActivity"
hzHuoshan.doFocusByProductByLow320 = function(){
    try{
        if (this.config.androidVersion >= 7) {
            log("滑动作品")
            swipe(device.width * 0.5, device.height * 0.8, device.width * 0.5, device.height * 0.1, 200);
            sleep(1000)
        }
        var rcVector = packageName(this.getPackage()).classNameContains("RecyclerView").find()
        var rv = null;
        for(var index =0;index<rcVector.size();index++)
        {
            var one = rcVector.get(index)
            if(rv == null)
            {
                rv = one
            }
            else
            {
                var lastBound = rv.bounds()
                var thisBound = one.bounds()
                if(thisBound.top<lastBound.top)
                    rv = one
            }
        }
        if (this.config.androidVersion >= 7)
        {
             log("点开一个作品")
            var a = rv.bounds()
            var b = a
            for(var index=0;index<rv.childCount();index++)
            {
                var tempb = rv.child(0).bounds()
                if(tempb.top>0 && tempb.bottom <device.height)
                {

                    b = tempb
                    break;
                }
            }
            click(b.centerX(), b.centerY())
            sleep(1000)
        }
        else
        {
             log("打开一个作品")
            for(var i =0;i<rv.childCount();i++)
            {
                var child = rv.child(i);
                var needBreak = false
                for(var j=0;j<child.childCount();j++)
                {
                    var cc = child.child(j)
                    if(cc.click())
                    {
                        log("fucking in zuopin")
                        needBreak = true
                        break;
                    }

                }
                if(needBreak)
                    break
            }
            sleep(2000);

        }
        
        let t = random(3, 5);
        sleep(1000*t)
        var btn_follow = packageName(this.getPackage()).text("关注").findOnce();
        if(btn_follow !=null)
        {
            btn_follow.click()
            let t2 = random(1, 3);
            sleep(1000*t2)
            back()
            sleep(1000)
            return 0;
        }
        log("作品界面没有找到关注按钮") 
        back()
        sleep(1000)           
        return -1;
    }
    catch (e) {
        log("fuck except"+e)
        return -1;        
    }
}

hzHuoshan.doFocusByProduct = function(){
    
    try{
        this.config.debug&&console.hide();
         var lbl_works=packageName(this.getPackage()).className("TextView").textContains("作品").findOnce();
        if(lbl_works)
        {
           
            if (this.config.androidVersion >= 7) 
            {
                log("选中作品");
                click(lbl_works.bounds().centerX(), lbl_works.bounds().centerY())
                sleep(1500);
            }
        }
        if (this.config.androidVersion >= 7) {
            log("滑动作品")
            swipe(device.width * 0.9, device.height * 0.8, device.width * 0.9, device.height * 0.1, 200);
            sleep(1000);
            swipe(device.width * 0.9, device.height * 0.8, device.width * 0.9, device.height * 0.1, 200);
            sleep(1000);
            swipe(device.width * 0.9, device.height * 0.8, device.width * 0.9, device.height * 0.1, 200);
        }
        var rcVector = packageName(this.getPackage()).classNameContains("RecyclerView").find();
        var rv = null;
        for(var index =0;index<rcVector.size();index++)
        {
            var one = rcVector.get(index)
            if(rv == null && one.bounds().top<lbl_works.bounds().top)
            {
                rv = one
            }
            else if(rv !=null)
            {
                var lastBound = rv.bounds()
                var thisBound = one.bounds()
                if(thisBound.top>lastBound.top)
                    rv = one
            }
        }
        if (this.config.androidVersion >= 7)
        { 
            log("点开一个作品"+rv.childCount()+"  : "+rcVector.size())
            var a = rv.bounds()
            var b = a
            for(var index=0;index<rv.childCount();index++)
            {
                var tempb = rv.child(0).bounds()
                if(tempb.top>0 && tempb.bottom <device.height)
                {

                    b = tempb
                    break;
                }
            }
            click(b.centerX(), b.centerY())
            sleep(2000)
        }
        else
        {
             log("打开一个作品")
            for(var i =0;i<rv.childCount();i++)
            {
                var child = rv.child(i);
                var needBreak = false
                for(var j=0;j<child.childCount();j++)
                {
                    var cc = child.child(j)
                    if(cc.click())
                    {
                        log("fucking in zuopin")
                        needBreak = true
                        break;
                    }

                }
                if(needBreak)
                    break
            }
            sleep(2000);

        }
        this.config.debug&&console.show();
        let t = random(3, 5);
        sleep(1000*t)
        var btn_follow = packageName(this.getPackage()).text("关注").findOnce();
        if(btn_follow !=null)
        {
            btn_follow.click()
            let t2 = random(1, 3);
            sleep(1000*t2)
            back()
            sleep(1000)
            return 0;
        }
        log(btn_follow);
        log("作品界面没有找到关注按钮") 
        back()
        sleep(1000)           
        return -1;
    }
    catch (e) {
        log("fuck except"+e)
        return -1;        
    }
}


// 私信关注
hzHuoshan.doFocusByPrivateMsg = function () {
    try {
        var privateMsgBtn = text("发私信").clickable(true).findOnce();
        if (privateMsgBtn != null) {
            log("进入私信关注");
            sleep(500);

            privateMsgBtn.click();
            sleep(1000);

            var msgW = textContains("发消息").className("EditText").clickable(true).findOnce();
            sleep(3000);
            msgW.setText("你好啊");
            sleep(1000);

            var sendW = text("发送").clickable(true).findOnce();
            sendW.click();
            sleep(2000);

            var focusW = text("关注").clickable(true).findOnce();
            if (focusW == null) { // 没出来关注，点下右上角再返回
                var titleW = id("title").findOnce();
                var moreW = titleW.parent().child(2);
                moreW.click();
                sleep(1500);
                back();
                sleep(1500);
                focusW = text("关注").clickable(true).findOnce();
            }
            focusW.click();

            sleep(1000);
            back();
            sleep(1000);
        }

    } catch (e) {
        log("私信完成");
        sleep(1000);
        back();
        sleep(1000);
    }

    if (textContains("发消息").className("EditText").clickable(true).exists()) {
        sleep(1000);
        back();
    }
}

// 滑屏
hzHuoshan.nextAv = function () {
    if (this.config.androidVersion >= 7) {
        if(this.appVersion == "3.2.0")        
            swipe(device.width * 0.5, device.height * 0.8, device.width * 0.5, device.height * 0.05, 100);
        else
            swipe(device.width * 0.5, device.height * 0.7, device.width * 0.5, device.height * 0.1, 200);

    }
};

// 设置抖音用户id
hzHuoshan.setUserId = function (uid ) {
    if(uid != null)
    {
        this.dyUid = uid;
        return;
    } 
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

hzHuoshan.getUserId = function () {
    return this.dyUid;
}

// 获取用户信息
hzHuoshan.getUserInfoOld = function () {
    var i = 0;
    while (true) {
        try {
            i++;
            var json = http.get(this.dyUrl);
            var string = JSON.stringify(json);
            // log(string);
            var m = string.match(/"to_user_id","(.*?)"/);
            var tuid = m[1];
            // log(tuid);
            var iid = "2049143284964909"

            var url = "http://api3-normal-c-lq.huoshan.com/hotsoon/user/profile/_get_profile/?to_user_id=" + tuid + "&iid=" + iid + "&device_id=67800502678&ac=wifi&mac_address=9C%3A2E%3AA1%3A0F%3A6F%3AD4&channel=xiaomi&aid=1112&app_name=live_stream&version_code=935&version_name=9.3.5&device_platform=android&device_type=Redmi+Note+5&device_brand=xiaomi&language=zh&os_api=28&os_version=9&resolution=1080*2040&dpi=408"

            var header = {
                "Content-Type": "application/json",
                "Access-Control-Expose-Headers": "tt-idc-switch"
            }
            var res = http.get(url, {
                headers: header
            });

            var userInfoJson = res.body.json();
            // log(userInfoJson.data.stats)
            return userInfoJson.data.stats;
        } catch (e) {
            log("getUserInfo e:" + e);
            if (i > 20) {
                throw new Error("网络出错或火山链接错误");
            }
            sleep(200);
        }
    }
}

// 获取点赞数
hzHuoshan.getLikeNum = function () {
  
    if(this.useAPI)
    {
        var num=this.getLikeNumByApi();
        return num;
    }
    
    var num =  this.getLikeNumByUidByUI(this.getUserId());
    return num;
};
//测试secuid是否可用
hzHuoshan.checkSecuid=function()
{
    var i = 0;
    while (true) {
        try {
            i++;
            var userInfo = this.getUserInfo();
            return userInfo?true:false;
        } catch (e) 
        {
            if (i > 3) 
            {
                return false;
            }
            sleep(200);
        }
    }
}
// 根据抖音链接获取用户信息
hzHuoshan.getUserInfo = function () 
{
    var res = http.get("https://www.iesdouyin.com/web/api/v2/user/info/?sec_uid=" + this.secUid);
    var userInfoJson = res.body.json();
    if(userInfoJson&&userInfoJson.user_info)
    {
        this.global.updateFoucsLikeNum(userInfoJson.user_info.following_count,userInfoJson.user_info.favoriting_count);
    }
    return userInfoJson.user_info;
}

// 获取点赞数
hzHuoshan.getLikeNumByApi = function () {
    var i = 0;
    while (true) {
       // log("获取点赞数:" + i);
        try {
            i++;
            var userInfo = this.getUserInfo();
            //var num = userInfo.favorite_item_count;
            var num = userInfo.favoriting_count;
            return parseInt(num);
        } catch (e) {
            if (i > 20) {
                return 0;
            }
            // this.global.error("获取点赞数失败,重试");
            sleep(200);
        }
    }
}
// 3034297588777399  
// 获取关注数
    hzHuoshan.getFocusNumByUidByUI = function (uid) {
    if(uid == null)
    {
        log("no uid")
        return -1;
    }
    if(!this.config.quickTask)
         sleep(5000);
    this.gotoUserProfile(uid);
    sleep(2000);
    var i = 0;
    while (true) {
        // log("获取关注数:" + i);
        try {
            i++;
            var btnProduct = textStartsWith("作品").findOnce();
            var btnLike = textStartsWith("喜欢").findOnce();
            var lb_focus = hzHuoshan.getLb_focus();
            if(this.appVersion == "3.2.0")
            {
                btnProduct  = "a"
                btnLike = "a"
            }

            if(btnProduct != null && btnLike != null && lb_focus !=null)
            {
                
                var num = lb_focus.getText();
                var btnLike = textStartsWith("喜欢").findOnce();
                var likenum = btnLike?btnLike.getText():"";
                // log("this focus num"+num)
                if(!this.config.quickTask)
                {
                    back();
                    sleep(1000);
                }
                this.global.updateFoucsLikeNum(num,likenum);
                return parseInt(num)
            }
            else
            {
               if(btnProduct == null)
                    log("没有找到作品按钮");
                else if(btnLike == null)
                    log("没有找到喜欢按钮,可能当前绑定账号与当前做任务的号不匹配");
                else if(lb_focus == null)
                    log("没有找到关注数量,请升级火山到最新版本");
            }
            if (i > 5) {
                return -1;
            }

        } catch (e) {
            if (i > 5) {
                throw new Error("已5次获取关注数失败，放弃");
            }
            sleep(200);
        }
    }
}

hzHuoshan.getLb_focus = function()
{
    var lb_focus;
    var layout=text("关注").find();//获取所有关注label
    layout.forEach(function(child){
        if(child.parent().className()=="android.widget.LinearLayout")
         {//android.widget.FrameLayout是关注按钮,android.widget.LinearLayout是下面关注的容器
            child.parent().children().forEach(function(ele){//子控件有2个,关注标签,和关注数标签
                var value=ele.getText();
                if(ele.getText()!="关注"&&parseInt(value)>=0)//不是关注标签,就是关注数标签 
                {
                    lb_focus=ele; 
                    //log("关注数:"+value); 
                }
            });
        }
    });
    if(lb_focus)
        return lb_focus;  
    var lb_focus;
    // log("appVersion:"+this.appVersion)
    if(this.appVersion == "9.4.5")
    {
        lb_focus = id("edq").findOnce();
        return lb_focus;
    }
    else if(this.appVersion == "9.5.0")
    {
        lb_focus = id("edg").findOnce();
        return lb_focus;
    }
    if(lb_focus == null)
        lb_focus = id("e_z").findOnce();
    if(lb_focus == null)
        lb_focus = id("e5o").findOnce();
    if(lb_focus == null)
        lb_focus = id("e8c").findOnce();
    if(lb_focus == null)
        lb_focus = id("e3c").findOnce();
    if(lb_focus == null)
        lb_focus = id("e0m").findOnce();
    return lb_focus;
}

hzHuoshan.getLikeNumByUidByUIBylow320 = function (uid) {
    if(uid == null)
    {
        log("no uid")
        return -1;
    }
    // log("uid is "+uid)
    this.gotoUserProfile(uid);
    sleep(3000);
    var i = 0;
    while (true) {
        // log("获取点赞数:" + i);
        try {
            i++;
            var btnFans = textStartsWith("粉丝").findOnce();
            var lbLike = id("a3e").findOnce()
            var btnFocusList = textStartsWith("关注").findOnce();
            if(btnFans != null && lbLike != null && btnFocusList !=null)
            {
                var num = lbLike.getText()
                log("喜欢数:"+num)
                num = num.replace(/[^\d]/g,' ');
                back();
                sleep(1000)
                this.global.updateFoucsLikeNum("",num);
                return parseInt(num)
            }
            else
            {
                if(btnFans == null)
                    log("没有找到粉丝按钮");
                else if(lbLike == null)
                    log("没有找到喜欢按钮,可能当前绑定账号与当前做任务的号不匹配");
                else if(btnFocusList == null)
                    log("没有找到关注数量");
                else
                    log("fuck")
                if (i > 5) {
                    return -1;
                }
            }
        } catch (e) {
            if (i > 5) 
            {
                throw new Error("已5次获取关注数失败，放弃"+e);
            }
            sleep(200);
        }
    }
}
hzHuoshan.getLikeNumByUidByUI = function (uid) {
    if(this.appVersion == "3.2.0")
    {
        return this.getLikeNumByUidByUIBylow320(uid);
    }
    if(uid == null)
    {
        log("no uid")
        return -1;
    }
    // log("uid is "+uid)
    this.gotoUserProfile(uid);
    sleep(this.config.quickTask?2000:3000);
    var i = 0;
    while (true) {
        // log("获取点赞数:" + i);
        try {
            i++;
            var lb_focus = hzHuoshan.getLb_focus();


            var btnProduct = textStartsWith("作品").findOnce();
            var btnLike = textStartsWith("喜欢").findOnce();
            if(btnProduct != null && btnLike != null && lb_focus !=null)
            {
                var num = btnLike.getText()
                var follow_num = lb_focus.getText();
                num = num.replace(/[^\d]/g,' ');
                back();
                sleep(1000)
                this.global.updateFoucsLikeNum(follow_num,num);
                return parseInt(num)
            }
            else
            {
                if(btnProduct == null)
                    log("没有找到作品按钮");
                else if(btnLike == null)
                    log("没有找到喜欢按钮,可能当前绑定账号与当前做任务的号不匹配");
                else if(lb_focus == null)
                    log("没有找到关注数量,请升级火山到最新版本");
                if (i > 5) {
                    return -1;
                }
            }
        } catch (e) {
            if (i > 5) {
                throw new Error("已5次获取关注数失败，放弃");
            }
            sleep(200);
        }
    }
}


// 获取关注数
hzHuoshan.getFocusNum = function () {
    if(this.useAPI)
    {
        var i = 0;
        while (true) 
        {
            //log("获取关注数:" + i);
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
    return this.getFocusNumByUidByUI(this.getUserId());
    
}
 
//监听弹窗事件(异常处理)
hzHuoshan.listenDialog = function () {
    var that=this;
    var version=this.config.androidVersion;
    threads.start(function () {
        var n = 1;
        while (true) {
            try {

                if (currentPackage() != hzHuoshan.getPackage()) {
                    // console.warn("不是抖音")
                    sleep(3000);
                    continue;
                }
                that.global.closeGenernalDialog();
                if (text('同步到今日头条').exists()) {
                    console.verbose("关闭");
                    id("com.ss.android.ugc.aweme:id/d5h").findOnce().click();//点击关闭
                };
                 
                if (text('滑动查看更多').exists() || text('长按屏幕使用更多功能').exists()||text('上滑查看更多视频').exists()) {
                    console.verbose("上滑");
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
                if (text('放弃').clickable().exists()) 
                {
                    console.verbose("放弃编辑");
                    text('放弃').clickable().click();  
                };

                if (text('发现通讯录好友').exists()) {
                    console.verbose("取消");
                    text('取消').click();
                };
                if (text('同意授权').exists()) {
                    console.verbose("同意授权");
                    text('同意授权').click();
                };
                if (text('好友推荐').exists()) {
                    console.verbose("关闭");
                    id("x6").findOnce().click();//点击关闭
                };
                if (text('取消').clickable(true).exists() && !textEndsWith("从相册选择").exists()
                    && !text("完成").exists() && !text("今日头条登录").exists() && !text("退出登录").exists() && !text("退出").exists() && !text("复制链接").exists()) {
                    console.verbose("取消");
                    text('取消').click();
                };
                if (text("提示").exists()) {
                    console.verbose("同意");
                    text('同意').click();
                };
                if (text('我再想想').exists()) {
                    console.verbose("我再想想");
                    text('我再想想').click();
                };
                if (text('去同步').exists()) {
                    console.verbose("去同步");
                    text('去同步').click();
                };
                var lbl=text('知道了').findOnce();
                if (lbl) 
                {
                    that.global.clickView(lbl);
                    console.verbose("知道了"); 
                }

                sleep(2000);
                n++;
            } catch (e) {
            }
        };

    });

}


hzHuoshan.gotoHuoShanAvByListBylow320 = function () {
    var titleAv = id("com.ss.android.ugc.live:id/arz").text("视频").findOnce();
    if(titleAv)
    {
        sleep(200)
        click(titleAv.bounds().centerX(), titleAv.bounds().centerY());
        sleep(2000)
    }
    var titleLive = text("直播").findOnce();
    var avList = id("azt").boundsInside(0, 0, device.width, device.height).find();
    if (titleAv != null && titleLive != null) {
        if(avList.size()>1)
        {
            var oneAv = avList.get(1);
            click(oneAv.bounds().centerX(), oneAv.bounds().centerY());
            sleep(2000);
        }
    }
}
// 从火山首页点进去视频页
hzHuoshan.gotoHuoShanAvByList = function () {
    try {
        // log(curAc)
        if (this.config.androidVersion >= 7) {

            if(this.appVersion == "3.2.0")
            {
                return this.gotoHuoShanAvByListBylow320()
            }
            var titleAv = packageName(this.getPackage()).text("视频").findOnce();
            if(titleAv)
            {
                sleep(200)
                click(titleAv.bounds().centerX(), titleAv.bounds().centerY());
                sleep(2000)
            }

            var titleAv = id("com.ss.android.ugc.live:id/title").text("视频").findOnce();
            var titleLive = packageName(this.getPackage()).text("直播").findOnce();
            var avList = packageName(this.getPackage()).descEndsWith("点赞").boundsInside(0, 0, device.width, device.height).find();
            if (titleAv != null && titleLive != null) {
                if(avList.size()>1)
                {
                    var oneAv = avList.get(1);
                    click(oneAv.bounds().centerX(), oneAv.bounds().centerY());
                    sleep(2000);
                }
                
            }
        }
    } catch (e) {

    }
}


// 脚本结束
hzHuoshan.finish = function () {
    log("hs 执行完成");
    threads.shutDownAll();
    engines.stopAll();
    exit();
};
// 任务前养号
hzHuoshan.doBringBefore = function () {
    if (this.config.androidVersion < 7) {
        log("系统不支持滑屏，跳过养号");
        return;
    }

    log("开始前养号");
    this.gotoHome();
    sleep(10000);
    this.gotoHuoShanAvByList(); 
    sleep(2000)
    var config = this.config;
    var viewVideoNum = random(parseInt(config.beforeVideoNum1), parseInt(config.beforeVideoNum2));
    log("看视频" + viewVideoNum + "个");
    for (var i = 1; i <= viewVideoNum; i++) {
        this.gotoHuoShanAvByList();
        this.nextAv();
        var viewTime = random(parseInt(config.beforeVideoTime1), parseInt(config.beforeVideoTime2));
        log("观看第" + i + "个视频" + viewTime + "秒");
        sleep(viewTime * 1000);
    }
    log("养号结束，准备开始任务");
}

// 有任务养号
hzHuoshan.doBringOngoing = function () {
    if (this.config.androidVersion < 7) {
        log("系统不支持滑屏，跳过养号");
        return;
    }

    log("任务中养号");
    this.gotoHome();
    sleep(3000);
    var config = this.config;
    var viewVideoNum = random(parseInt(config.ongoingVideoNum1), parseInt(config.ongoingVideoNum2));
    log("看视频" + viewVideoNum + "个");
    for (var i = 1; i <= viewVideoNum; i++) {
        this.gotoHuoShanAvByList();
        this.nextAv();
        var viewTime = random(parseInt(config.ongoingVideoTime1), parseInt(config.ongoingVideoTime2));
        log("观看第" + i + "个视频" + viewTime + "秒");
        sleep(viewTime * 1000);
    }
    log("看视频结束，继续任务");
}

hzHuoshan.clickFirtPage = function(){
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
hzHuoshan.isInHome=function()
{
    var firtPage = text("视频").findOnce();
    var tuijian = text("直播").findOnce();
    var lbl_mypage= text("进入我的主页").findOnce();
    if(this.global.isCorrectView(firtPage) &&this.global.isCorrectView(tuijian) && !this.global.isCorrectView(lbl_mypage))
    {
       return true;
    }
    return false;
}
hzHuoshan.popToRootViewController=function(try_times)
{
    
    if (currentPackage() != this.getPackage())
    {
        this.openApp();
        sleep(10000);
    }
    var index = 0;
    while(index<10)
    {
        index++;

        var firtPage = text("首页").findOnce();
        var my = text("我的").findOnce();
        var huoli = text("粉丝").findOnce();
        if(this.global.isCorrectView(my) && this.global.isCorrectView(firtPage) && this.global.isCorrectView(huoli))//个人中心
        {
            if(this.config.bringBefore||this.config.bringOngoing)//如果不用养号,回到rootviewcontroller就可以了,养号则要点击首页才有视频可看
            {
                log("点击首页");
                this.clickFirtPage();
            }
            if(!this.config.quickTask)
                sleep(1000);
        }
        if(this.isInHome())
        {
            log("已经是首页");
            if(!this.config.quickTask)
                sleep(2000);
            break;
        }
        var icon = packageName("com.ss.android.ugc.live").className("ImageView").boundsInside(0, 0, device.width*0.2, device.height*0.13).clickable().findOnce();  
        if(!icon)
           icon = packageName("com.ss.android.ugc.live").className("TextView").boundsInside(0, 0, device.width*0.2, device.height*0.13).clickable().findOnce();   

        if(icon&&icon.id() !="com.ss.android.ugc.live:id/u6")//u6  3.2.0版本 
        {
            icon.click();
            log("点返回"); 
            var wait= this.config.quickTask==0?4000:2000;
            sleep(wait); 
        }
        else
        {
            log("点返回2"); 
            back();
            sleep(1000);
        }
        
    }
     if (currentPackage() != this.getPackage()) {
        this.openApp();
        sleep(10000);
    }
}
//火山左侧菜单栏功能界面
hzHuoshan.openModuleUI=function(try_times)
{
   if(try_times>5)
    {
        log("打开左侧菜单栏界面失败");
        sleep(5000);
        return false;
    }
    var lbl= packageName("com.ss.android.ugc.live").text("进入我的主页").findOnce();
    if(lbl)
    {
        if(try_times)
            log("打开左侧菜单栏界面成功");
        return true;
    }
    else
    {
        if(!this.isInHome())
        {
            this.popToRootViewController(0);
            return this.openModuleUI(try_times+1);  
        }
        else
        {
            var icon = packageName("com.ss.android.ugc.live").className("android.view.ViewGroup").boundsInside(0, 0, device.width*0.3, device.height*0.2).clickable().findOnce();     
            if(icon)
            {
                icon.click();
                sleep(3000);
            }
            else
            {
                var icon = packageName("com.ss.android.ugc.live").className("android.view.View").boundsInside(0, 0, device.width*0.3, device.height*0.2).clickable().findOnce(); 
                if(icon)
                {
                    icon.click();
                    sleep(3000);
                }
                else
                {
                    log("没有找到首页用户头像");
                }   
            }
            return this.openModuleUI(try_times+1);
        }
    }
}
//进入设置界面
hzHuoshan.gotoSettingUI=function(try_times)
{
    if(try_times>3)
    {
        log("打开设置界面失败");
        sleep(5000);
        return false;
    }
    var activity_name=currentActivity();
    var lbl= packageName("com.ss.android.ugc.live").text("火山号").findOnce();
    if(activity_name=="com.ss.android.ugc.live.manager.SettingActivity"||lbl)
    {
        if(try_times)
            log("打开设置界面成功");
        var shortID="";
        if(lbl)
        {
            var subviews=lbl.parent().children();
            for(var i=0;i<subviews.length;i++)
            {
                var view=subviews[i];
                var textContent=view.text();
                if(view.className()=="android.widget.TextView"&&textContent.indexOf("火山号")==-1)
                {
                    shortID=textContent.trim();
                    log("火山号:"+shortID);
                    this.shortID=shortID;
                }
            }
        }
        return true;
    }
    else
    {
        var state=this.openModuleUI(0);
        if(state)
        {
            var lbl= packageName("com.ss.android.ugc.live").text("设置").findOnce(); 
            if(lbl)
            {
                log("找到设置按钮");
                if(!this.global.clickView(lbl))
                {
                    log("设置不可点");
                    log(lbl);
                }
                sleep(3000);
            }
            else
            {
                log("没有找到设置按钮");
                sleep(1000);
            }
            return this.gotoSettingUI(try_times+1);
        }
        else
        {
            log("打开设置界面失败");
            return false;
        }
    }
}
//进入切换账号界面
hzHuoshan.gotoChangeAccountUI=function(try_times)
{
    if(try_times>3)
    {
        log("打开切换账号界面失败");
        sleep(5000);
        return false;
    }
    var activity_name=currentActivity();
    var lbl= text("切换账号").findOnce(); 
    if(activity_name=="com.ss.android.ugc.live.account.ui.AccountSwitchActivity"||lbl)
    {
        if(try_times)
            log("打开切换账号界面成功");
        return true;
    }
    else
    {
        var state=this.gotoSettingUI(0);
        if(state)
        {
            var lbl= packageName("com.ss.android.ugc.live").text("切换账号").findOnce(); 
            if(lbl)
            {
                if(!this.global.clickView(lbl))
                {
                    log("切换账号不可点");
                    log(lbl);
                }
                sleep(3000);
            }
            else
            {
                log("没有找到切换账号按钮");
            }
            return this.gotoChangeAccountUI(try_times+1);
        }
        else
        {
            log("打开切换账号界面失败");
            return false;
        }
    }
}

//进入我的主页
hzHuoshan.gotoSelfProfile=function(try_times)
{
    if(try_times>3)
    {
        log("打开我的主页失败");
        sleep(5000);
        return false;
    }
    var lbl=packageName("com.ss.android.ugc.live").text("编辑资料").findOnce();
    if(lbl)
    {
        if(try_times)
            log("打开我的主页成功");
        return true;
    }
    else
    {
        var state=this.openModuleUI(0);
        if(state)
        {
            var lbl= packageName("com.ss.android.ugc.live").text("进入我的主页").findOnce();
            if(lbl)
            {
                if(!this.global.clickView(lbl))
                    log("进入我的主页不可点");
                sleep(3000);
            }
            else
            {
                log("没有找到我的主页");
            }
            return this.gotoSelfProfile(try_times+1);
        }
        else
        {
            log("打开我的主页失败");
            return false;
        }
    }
}
hzHuoshan.gotoMyProfile = function () {
   
    var pindex = 0
    var p = text("我的").findOnce()
    while(p&&pindex<4)
    {
        pindex++;
        p = p.parent()
        if(p.click())
            break;
    }
    log("我的主页")
 };

//获取我的用户ID

hzHuoshan.getMyUseridByLow320 = function(trytimes)
{
     log("获取用户ID2");

     if(trytimes>=3)
        return "";

    this.gotoHome();
    this.gotoMyProfile();
    sleep(3000);
    var btnShare = id("am4").findOnce()
    if(btnShare)
    {
        btnShare.click()
        sleep(1000)
        var lbCopy = text("复制链接").findOnce()
        if(lbCopy)
        {
            if(lbCopy.parent().click())
            {
                sleep(2000)
                var content=this.global.getClipBoardContent(this.getPackage()); 

                back();
                if(content)
                {
                    urlRegex = /share_ht_uid=(\d+)/;
                    var items=urlRegex.exec(content);
                    if(items&&items.length>1)
                    {
                        log("用户ID:"+items[1]);
                        return items[1];
                    }
                    else
                    {
                        log("正则未匹配到用户ID");
                        log("content:"+content);
                    }  
                }
            }
            else
            {
                log("复制链接无")
            }
        }
        else
        {
            log("复制链接无")
            return hzHuoshan.getMyUseridByLow320(trytimes+1)
        }
    }
    else
    {
        log("分享按钮无")
        return hzHuoshan.getMyUseridByLow320(trytimes+1)
    }
}
//获取火山号
hzHuoshan.getMyShortID=function()
{
    if (currentPackage() != this.getPackage()) 
    {
        this.openApp();
        sleep(10000);
    }
    log("获取火山号");
    var state=this.gotoSettingUI(0);
    if(state)
    {
        !this.shortID&&log("没有找到火山号");
        return this.shortID;
    }
    return false;
}
hzHuoshan.getMyUserid=function(trytimes)
{
    if (currentPackage() != this.getPackage()) {
        this.openApp();
        sleep(10000);
    }
    if(this.appVersion == "3.2.0")
    {
        return this.getMyUseridByLow320(trytimes);
    }
    if(hzHuoshan.shortID)
    {
        var userinfo=this.config['hs:'+this.shortID];
        if(userinfo)
        {
            var arr=userinfo.split("|");
            if(arr.length>2)
            {
                hzHuoshan.dyUid=arr[0];
                hzHuoshan.userName=arr[1];
                hzHuoshan.secUid=arr[2];
                log("用户名:"+this.userName); 
                log("用户ID:"+this.dyUid);
                return arr[0];
            }
        }
    }
    log("获取用户ID1");
    var state=this.gotoSelfProfile(0);
    if(state)
    {
        sleep(2000);
        var ok=this.clickRightBarItem(1);
        if(ok)
        {
            sleep(3000);
            var lbl=text("复制链接").findOnce();
            if(lbl)
            {
                if(lbl.parent().clickable())
                    lbl.parent().click();
                else
                    log("复制链接不可点");
                sleep(2000);
                var content=this.global.getClipBoardContent(this.getPackage());

                back();
                if(content)
                {
                    var    urlRegex = /(https:\/\/.*)复制此链接/;
                    var items=urlRegex.exec(content);
                    if(items.length>1)
                    {
                        var url=items[1];
                        this.setDyUrl(url.trim());
                        var content="";
                        try {
                             content = http.get(url.trim());
                        } catch (e) {
                            log("请求错误： " + e)
                           if(trytimes<3)
                                return this.getMyUserid(trytimes+1);
                            else
                                return "";
                        }
                        if(content.statusCode != 200)
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
                                    urlRegexSecid =/to_user_id=(.*?)(?=&|$)/;
                                    var itemsSecid=urlRegexSecid.exec(url);
                                    if(itemsSecid&& itemsSecid.length>1)
                                    {
                                        this.secUid=itemsSecid[1];
                                    }
                                    else
                                        log("userid2");   

                                    urlRegex = /share_ht_uid=(\d+)(?=&|$)/;
                                    var items=urlRegex.exec(url);
                                    if(items&&items.length>1)
                                    {
                                        log("用户ID:"+items[1]);
                                        return items[1];
                                    }
                                    else
                                    {
                                        log("正则未匹配到用户ID");
                                        log("url:"+url);
                                    } 
                                   
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
                    }
                    else
                    {
                        log("正则没有匹配到链接");
                        log("粘贴板内容为:"+content);
                    }
                }
                else
                {
                    log("粘贴板内容为空");
                }
            }
            else
            {
                log("按钮个数:"+items.length);
                log("分享按钮点击失败");
            }
        }
        else
        {
            log("没找到分享按钮");
        }
    }
    if(trytimes<3)
    {
        log("稍等重试");
        sleep(10000);
        return this.getMyUserid(trytimes+1);
    } 
    return "";
}

//进入编辑资料界面
hzHuoshan.gotoEditProfile=function(try_times)
{
    if(try_times>3)
    {
        log("打开编辑资料界面失败");
        sleep(5000);
        return false;
    }
    var activity_name=currentActivity();
    var lbl= text("编辑资料").findOnce();
    if(activity_name=="com.ss.android.ugc.live.profile.edit.EditProfileActivity"||lbl)
    {
        if(try_times)
            log("打开编辑资料界面成功");
        return true;
    }
    else
    {
        var state=this.gotoSelfProfile(0);
        if(state)
        {
            var lbl= packageName("com.ss.android.ugc.live").text("编辑资料").findOnce();
            if(lbl)
            {
                if(!this.global.clickView(lbl))
                    log("编辑资料不可点");
                sleep(3000);
            }
            else
            {
                log("没有找到文字编辑资料");
            }
            return this.gotoEditProfile(try_times+1);
        }
        else
        {
            log("打开编辑资料界面失败");
            return false;
        }
    }
}
//获取我的昵称
hzHuoshan.getMyNickNameLow320=function(try_times)
{
    if(try_times>3)
    {
        log("获取我的昵称失败");
        sleep(5000);
        return "";
    }
    var activity_name=currentActivity();
    var nick_lbl=text("昵称").findOnce();
    if(activity_name=="com.ss.android.ugc.live.profile.ui.MyProfileEditActivity"||nick_lbl)
    {
        if(nick_lbl)
        {
            var container=nick_lbl.parent();
            var nickname="";
            container.children().forEach(function(ele){
                if(ele.className()=="android.widget.EditText")
                {
                    nickname=""+ele.getText();
                    this.userName=nickname;
                    log("当前昵称是:"+nickname);
                }
            });
            back();
            sleep(2000);
            if (text('放弃').clickable().exists()) 
            {
                log("放弃编辑");
                text('放弃').clickable().click();  
            };
            return nickname;
        }
        else
        {
            log("没有找到昵称label");
            sleep(2000);
            return this.getMyNickNameLow320(try_times+1);
        }
    }
    else
    {
        var lbl= text("编辑").findOnce();
        if(lbl)
        {
            if(!this.global.clickView(lbl))
                log("编辑不可点");
            sleep(3000);
        }      
         return this.getMyNickNameLow320(try_times+1);
        
    }
}

hzHuoshan.getMyNickName=function(try_times)
{
    if (currentPackage() != this.getPackage()) 
    {
        app.launchPackage(this.getPackage());
        log("打开H山中..."); 
        sleep(10000); 
    }
    if(this.appVersion == "3.2.0")
    {
        return this.getMyNickNameLow320(try_times);
    }
    if(try_times>3)
    {
        log("获取我的昵称失败");
        sleep(5000);
        return "";
    }
    var activity_name=currentActivity();
    var nick_lbl=text("昵称").findOnce();
    if(activity_name=="com.ss.android.ugc.live.profile.edit.EditProfileActivity"||nick_lbl)
    {
        if(nick_lbl)
        {
            var container=nick_lbl.parent();
            var nickname="";
            container.children().forEach(function(ele){
                if(ele.className()=="android.widget.EditText")
                {
                    nickname=""+ele.getText();
                    this.userName=nickname;
                    log("当前昵称是:"+nickname);
                }
            });
            back();
            sleep(2000);
            if (text('放弃').clickable().exists()) 
            {
                log("放弃编辑");
                text('放弃').clickable().click();  
            };
            return nickname;
        }
        else
        {
            log("没有找到昵称label");
            sleep(2000);
            return this.getMyNickName(try_times+1);
        }
    }
    else
    {
        var state=this.gotoEditProfile(0);
        if(state)
        {
            return this.getMyNickName(try_times+1);
        }
        else
        {
            log("获取我的昵称失败");
            return "";
        }
    }
}
//获取我的账号列表
hzHuoshan.getAccountList=function(try_times)
{
    if (currentPackage() != this.getPackage()) 
    {
        app.launchPackage(this.getPackage());
        log("打开H山中..."); 
        sleep(10000); 
    }
    var state=this.gotoChangeAccountUI();
    if(state)
    {
        var names=new Array();
        var views=packageName(this.getPackage()).className("android.view.ViewGroup").clickable().find();
        for(var i=0;i<views.length;i++)
        {
            var container=views[i];
            
            var subviews=container.children();
             
            for(var j=0;j<subviews.length;j++)
            {
                var view=subviews[j];
                if(view.className()=="android.widget.TextView")
                {
                    if(view.text()!="添加或注册账号")
                    {
                        var nickname=view.text();
                        names.push(nickname);
                    }
                    break;
                }
            }
        }
        return names;
    }
    return "";
}
//切换账号列表 选中的那个账号
hzHuoshan.getCurrentAccount=function()
{
    var box=packageName(this.getPackage()).className("CheckBox").clickable(true).selected().findOnce();
    if(box)
    {
        var subviews=box.parent().children();
        for(var i=0;i<subviews.length;i++)
        {
            var view=subviews[i];
            if(view.className()=="android.widget.TextView")
            {
                return view.text();
            }
        }
    }
    return "";
}
//切换账号 nickname
hzHuoshan.changeAccount=function(nickname)
{
    if (currentPackage() != this.getPackage()) 
    {
        app.launchPackage(this.getPackage());
        log("打开H山中..."); 
        sleep(10000); 
    }
    var oldShortID=hzHuoshan.shortID;
    hzHuoshan.shortID="";
    hzHuoshan.userName="";
    hzHuoshan.dyUid="";
    hzHuoshan.secUid="";
    console.warn("任务:切换账号到"+nickname);
    var state=this.gotoChangeAccountUI(0);
    if(state)
    {
        var nickname_lbl= text(nickname).findOnce(); 
        if(nickname_lbl)
        {
            nickname_lbl.parent().click();
            sleep(1000);
            if (text("参数错误").exists()) 
            {
                log("切换失败,参数错误");
                return false;
            }
            sleep(4000);
            if (text("不同意").exists()) {
                log("切换失败,需要绑定手机号码才能切换");
                text("不同意").click();
                return false;
            }
            else if (textContains("账号已过期").exists()) {
                log("切换失败,此账号已过期");
                text("删除").click();
                return false;
            }
            else
            {
                log("获取火山号对比是否切换成功"); 
                hzHuoshan.getMyShortID();
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
module.exports = hzHuoshan;
