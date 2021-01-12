
var hzKuaiShou = {};
hzKuaiShou.ksUrl = "";
hzKuaiShou.ksUid = "";
hzKuaiShou.userName = "";
hzKuaiShou.config = {};
hzKuaiShou.captcha="";
hzKuaiShou.global = {};
hzKuaiShou.isInitListenDialog = false;
hzKuaiShou.fan =0;//粉丝数 进行上传
const HZ_KUAISHOU_PACKAGE = "com.smile.gifmaker";
const HZ_KUAISHOU_DETAIL = "kwai://work/";
const HZ_KUAISHOU_PROFILE = "kwai://profile";
const HZ_KUAISHOU_MAIN_ACTIVITY = "com.yxcorp.gifshow.HomeActivity";
var hasScreenPersion=false;
hzKuaiShou.init = function(config){
    this.config = config;
    this.setKsUrl(config.ksUrl);
    if (!this.isInitListenDialog) {
        this.updateDialog();
        this.isInitListenDialog = true;
    }
    // this.setUserId();
};

hzKuaiShou.setKsUrl = function(ksUrl){
    this.ksUrl = ksUrl;
};

hzKuaiShou.getKsUrl = function(){
    return this.dyUrl;
};

hzKuaiShou.setKsUid = function(ksUid){
    this.ksUid = ksUid
}

hzKuaiShou.getKsUid = function(){
    return this.ksUid;
}

hzKuaiShou.getPackage = function(){
    var p = HZ_KUAISHOU_PACKAGE;
    return p;
};

hzKuaiShou.getDetailScheme = function(){
    var d = HZ_KUAISHOU_DETAIL;
    return d;
};

hzKuaiShou.getProfileScheme = function(){
    return HZ_KUAISHOU_PROFILE;
};

hzKuaiShou.getMainActivity = function(){
    var m = HZ_KUAISHOU_MAIN_ACTIVITY;
    return m;
}

 
hzKuaiShou.openApp = function(){
    app.launchPackage(this.getPackage());
};

hzKuaiShou.gotoHome = function(){
    app.startActivity({
        action: "android.intent.action.VIEW",
        className: this.getMainActivity(),
        packageName: this.getPackage()
    });
}

hzKuaiShou.gotoMyProfile = function(){
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: this.getProfileScheme()+"/"+this.ksUid,
        packageName: this.getPackage()
    });
};

hzKuaiShou.gotoUserProfile = function(userId){
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: this.getProfileScheme()+"/"+userId,
        packageName: this.getPackage()
    });
};

hzKuaiShou.gotoDetail = function(awemeId){
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: this.getDetailScheme()+awemeId,
        packageName: this.getPackage()
    });
};

hzKuaiShou.doLike1 = function(awemeId){
    try{
        log("大屏模式点赞");
        let likeBtn = desc("喜欢").clickable(true).selected(false).findOnce();
        if (likeBtn != null) {
            sleep(100);
            likeBtn.click();
        }
        console.verbose("延迟2秒检测");
        sleep(2000);

        let likeBtnSelected = desc("喜欢").selected(true).findOnce();
        if(likeBtnSelected != null){
            log("点赞红心状态");
            return true;
        } else {
            console.warn("点赞失败");
            return false;
        }
       
    } catch(err) {
        console.warn("未找到喜欢控件2");
        return false;
    }
    
}

hzKuaiShou.doLike2 = function(awemeId){
    try{
        log("小屏模式点赞");
        let likeBtn = id("like_button").selected(false).findOnce();
        if (likeBtn != null) {
            sleep(100);
            likeBtn.click();
        } 
    
        console.verbose("延迟2秒检测");
        sleep(2000);

        let likeBtnSelected = id("like_button").selected(true).findOnce();
        if(likeBtnSelected != null)
        {
            log("点赞红心状态");
            return true;
        } else 
        {
            press(device.width / 2 + random(-100, 100), device.height*0.5 + random(0, 150), 1);
            sleep(50);
            press(device.width / 2 + random(-100, 100), device.height*0.5 + random(0, 150), 1);
            sleep(1000);
            let likeBtnSelected = id("like_button").selected(true).findOnce();
            if(likeBtnSelected != null)
            {
                log("点赞红心状态");
                return true;
            } 
            console.warn("点赞失败");
            return false;
        }
       
    } catch(err) {
        console.warn("未找到喜欢控件2");
        return false;
    }
    
}
hzKuaiShou.nextAv = function(){
    if(this.config.androidVersion >= 7){
        swipe(device.width/2,device.height-300, device.width/2, 300, 300);
        // swipe(device.width/2,device.height*4/5, device.width/2+50, device.height/5, 300);
    }
};

hzKuaiShou.getLikeNum = function(){
    log("前台检测");
    this.gotoMyProfile();
    sleep(1000);
    var likeNumBtn = textEndsWith("\n赞").findOnce();
    if(likeNumBtn != null){
        var likeNum = likeNumBtn.text();
        likeNum = likeNum.replace("\n赞", "");
        back();
        sleep(1000);
        return parseInt(likeNum);
    } else {
        back();
        throw new Error("获取喜欢数失败");
    }
}


hzKuaiShou.updateDialog = function(){
    var that=this;
    threads.start(function () {
        var n = 1;
       
        while (true) {
            try {
                
                if (currentPackage() != hzKuaiShou.getPackage()) {
                    sleep(3000);
                    if(currentPackage()=="com.android.systemui")
                    {
                        var btn=text("允许").findOnce();
                        if(btn)
                        {
                            log("允许");
                            if(btn.clickable())
                                btn.click();
                            else  if(btn.parent().clickable())
                                btn.parent().click();
                        }
                    }
                    continue;
                }
                that.global.closeGenernalDialog();
                var uiObj3 = text("妥妥好评").findOnce();
                if(uiObj3 != null){
                   var close= id("close").clickable(true).findOnce();
                   if(close)
                        close.click();
                    else if(uiObj3.clickable())
                        uiObj3.click();
                }
            
                var updateDia = text("版本升级").findOnce();
                var closeW = id("iv_close").clickable(true).findOnce();
                if(updateDia != null && closeW != null){
                    console.verbose("关闭升级");
                    closeW.click();
                }
                var uiObj3 = text("好友推荐").findOnce();
                if(uiObj3 != null){
                   var close= id("close_btn").clickable(true).findOnce();
                   if(close)
                        close.click();
                }
                var clickPlay = text("点击重播").findOnce();
                if(clickPlay)
                {
                    log("点击重播返回");
                    back();
                    sleep(1000);
                }
                sleep(2000);
                n++;
            } catch (e) {
                // this.global.error(e);
            }
        };

    });
};


// mark :以下功能 开发by zyh
hzKuaiShou.doBringBefore=function(ongoing)
{
    if (this.config.androidVersion < 7) {
        log("系统不支持滑屏，跳过养号");
        return;
    }
     
    var isBigMode=false;
    var isRefresh=false;
    log("开始前养号");
    this.popToRootViewController();   
    var config = this.config;
    isBigMode=desc("发现").clickable(true).findOnce()?false:true;
    log("判断当前模式为:"+(isBigMode?"大屏模式":"小屏模式"));
    var viewVideoNum = random(parseInt(config.beforeVideoNum1), parseInt(config.beforeVideoNum2));
    if(ongoing)
        viewVideoNum = random(parseInt(config.ongoingVideoNum1), parseInt(config.ongoingVideoNum2));
    log("看视频" + viewVideoNum + "个");

    for (var i = 1; i <= viewVideoNum; i++) 
    {
        //选中发现
        if(isBigMode)
        {
            var items=className("android.view.View").boundsInside(10, 10, device.width*0.8, device.height*0.3).clickable().find();//没有文字,没有子控件,发现是图片
            if(items&&items.length>1)
            {
                var find_tab=items[2];
                if(find_tab&&!find_tab.selected())
                {
                    find_tab.click();
                    sleep(1000);
                }
                if(isRefresh==false)
                {
                    find_tab.click();
                    sleep(2000);
                    isRefresh=true;//第一次刷新一下首页,因为有时首页没视频
                }
            }
        }
        else
        {
            var home_tab=desc("首页").clickable(true).findOnce();
            if(home_tab&&!home_tab.selected())
            {
                home_tab.click();
                sleep(1000);
            }
            var find_tab=desc("发现").clickable(true).findOnce();
            if(find_tab&&!find_tab.selected())
            {
                find_tab.click();
                sleep(1000);
            }
            this.enterVideoDetail();
        }
        
        var adlbl=id("slide_ad_icon").findOnce();
        if(adlbl)
        {
            log("滑到了广告");
            if(isBigMode)
            {
                this.nextAv();
                sleep(1000); 
            }
            else
                back();
            i--;
            continue;
        }
        var viewTime = random(parseInt(config.beforeVideoTime1), parseInt(config.beforeVideoTime2));
        if(ongoing)
            viewTime = random(parseInt(config.ongoingVideoTime1), parseInt(config.ongoingVideoTime2));
        console.verbose("观看第" + i + "个视频" + viewTime + "秒");
        sleep(viewTime * 1000);
        if(!isBigMode)
        {
            this.clickBack();
            sleep(3000); 
        }
        log("滑几下");
        this.nextAv();
        sleep(1000); 
        this.nextAv();
        sleep(1000); 
        this.nextAv();
        sleep(1000); 
    }
    log("养号结束，准备开始任务");
}
hzKuaiShou.enterVideoDetail=function()
{
    var curAc = currentActivity();
    if(curAc!=this.getMainActivity())
    {
        back();
        sleep(4000);
    }
    var cover=id("player_cover").boundsInside(100, 100, device.width, device.height).findOnce();
    this.global.clickView(cover);
}
hzKuaiShou.clickBack=function()
{
    var back_btn=id("back_btn").findOnce();
    if(back_btn)
        back_btn.click();
    else
    {
        var left_btn=id("left_btn").findOnce();
        if(left_btn)
            left_btn.click();
        else
        {
            back();
        }
    }
}

hzKuaiShou.popToRootViewController=function()
{
    var curAc = currentActivity();
    if(curAc==this.getMainActivity())
    {
        var setLbl=text("设置").findOnce();
        if(this.global.isCorrectView(setLbl))
        {
            back();
            sleep(1000);
        }
        return;
    }
    var back_btn=id("back_btn").findOnce();
    var left_btn=id("left_btn").findOnce();
    
    if(back_btn||left_btn)
    {
        if(back_btn!=null)
            back_btn.click();
        else if(left_btn!=null)
        left_btn.click();
        log("点返回"); 
        sleep(5000);
        this.popToRootViewController(); 
    }
    else
    {
        back();
        sleep(1000);
    }
}
 
hzKuaiShou.getMyUserid = function (trytimes ) 
{
    if(currentPackage() != this.getPackage()){
        this.openApp();
        sleep(10000);
    }
    log("获取用户ID");
    this.popToRootViewController();
    var icon=id("left_btn").clickable().findOnce();
    if(icon)
    {
        icon.click();
        sleep(3000);
        var icon=id("tab_avatar").desc("头像").clickable().findOnce();
        if(icon)
        {
            icon.click();
            sleep(4000);
            var curAc = currentActivity();
            if(curAc=="com.yxcorp.gifshow.profile.activity.MyProfileActivity")
            {
                var lbl=id("user_name_tv").findOnce();
                if(lbl)
                {
                    this.userName=lbl.text();
                    log("用户名:"+ this.userName);
                }
                else
                {
                    log("没有找到用户名");
                }
                var lbl=id("profile_settings_button").findOnce()
                if(lbl)
                {
                    if(lbl.text().indexOf("完善资料") != -1)
                    {
                        log("资料不完善，请完善资料到百分百");
                        return -1;
                    }
                }
                else
                {
                    log("没有找到完善资料");
                }
                var clickMore=false;
                var icon=id("share_profile_btn").clickable().findOnce();
                if(!icon)
                {
                    icon=id("more_btn").desc("更多").clickable().findOnce();
                    clickMore=true;
                }
                if(icon)
                {
                    icon.click();
                    sleep(3000);
                    if(clickMore)
                    {
                        var lbl=text("分享个人主页").findOnce();
                        if(!this.global.clickView(lbl))
                        {
                            log("没有找到分享个人主页");
                        }
                        else
                            sleep(2000);
                    }
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
                            var    urlRegex = /(https:\/\/.*)复制/;
                            var items=urlRegex.exec(content);
                            if(items.length>1)
                            {
                                var url=items[1];
                                this.dyUrl=url.trim();
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
                                            urlRegex = /shareObjectId=(\d+)/;
                                            var items=urlRegex.exec(url);
                                            if(items&& items.length>1)
                                            {
                                                log("用户ID:"+items[1]);
                                                !this.config.debug&&this.getFocusLikeNum(items[1],true);//获取票数
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
                        log("没有找到复制链接");
                    }
                }
                else
                {
                    log("没有找到分享按钮");
                }
            }
            else
            {
                log("无法进入个人信息界面");
            }
        }
        else
        {
            log("没有找到我的头像");
        }
    }
    else
    {
        log("首页没找到菜单按钮");
    }
    if(trytimes<3)
    {
        log("稍等重试");
        sleep(10000);
        return this.getMyUserid(trytimes+1);
    } 
    return "";
}

hzKuaiShou.doLike = function(awemeId)
{
    var oldNum = this.getFocusLikeNum(this.ksUid,false); 
    sleep(2000);
    var curAc = currentActivity();
    if(curAc!="com.yxcorp.gifshow.detail.PhotoDetailActivity")
    {
        this.gotoDetail(awemeId);
        sleep(4000);
        curAc = currentActivity(); 
    }
    if(curAc!="com.yxcorp.gifshow.detail.PhotoDetailActivity")
    {
        console.warn("进入视频详情页面失败");
        return false;
    }

    var likeBtn = id("like_button").clickable().findOnce();//小屏模式
    var state=0;
    if(likeBtn){
        state = this.doLike2(awemeId);
    }
    else
    {
        state = this.doLike1(awemeId);
    }
    sleep(5000);
    var curAc = currentActivity();
    if(curAc=="com.yxcorp.gifshow.webview.KwaiWebViewActivity"||curAc=="com.yxcorp.gifshow.webview.KwaiYodaWebViewActivity")
    {
        this.checkScreenPersion();
        var code1=text("验证码").findOnce();
        var code2=text("获取语音验证码").findOnce();
        if(code1||code2)
        {
            this.global.error("快手账号被封禁,需要解封才能点赞");
            sleep(10000);
            return -4;
        }
        else
        {
            if (this.config.androidVersion >= 7) 
            {
                if(!this.captcha)
                {
                    this.captcha = require("./Captcha.js"); 
                }
                this.captcha.close();
            }
            else
            {
                log("系统版本低于7.0,划图跳过");
            }
        }
    }
    if(state)
    {
        var newNum  = this.getFocusLikeNum(this.ksUid,false); 
        log("点赞前：" + oldNum + "，点赞后：" + newNum);
        if (newNum <= oldNum) {
            console.warn("点赞失败");
            return false;
        } else {
            log("点赞成功");
            return true;
        }
    }
    return false;
}
hzKuaiShou.checkScreenPersion=function()
{
    if(!hasScreenPersion)
    {
        requestScreenCapture(false); 
        hasScreenPersion=true;
    }
}
// 打开用户主页关注
hzKuaiShou.doFocusByUserId = function (uid) 
{
    try {
        this.fan=0;
        var oldNum = this.getFocusLikeNum(this.ksUid,true); 
        sleep(4000);
        var curAc = currentActivity();
        if(curAc!="com.yxcorp.gifshow.profile.activity.UserProfileActivity")
        {
            this.gotoUserProfile(uid);
            sleep(4000);
            curAc = currentActivity(); 
        }
        if(curAc!="com.yxcorp.gifshow.profile.activity.UserProfileActivity")
        {
            console.warn("进入关注页面失败");
            return false;
        }
        var follow_btn=packageName(this.getPackage()).id("header_follow_button").findOnce();
        if(follow_btn!=null)
        {
            var cover=packageName(this.getPackage()).id("player_cover_container").clickable().findOnce();//查看用户是否有作品
            if(cover)
            {
                if(this.config.androidVersion >= 7)
                {
                    swipe(device.width/2,device.height-300, device.width/2, 300, 300);
                    sleep(2000);
                    swipe(device.width/2,device.height-300, device.width/2, 300, 300);
                    sleep(2000);
                    var item=packageName(this.getPackage()).id("player_cover_container").clickable().findOnce();
                    if(item)
                        cover=item;
                }
                cover.click();
                log("看视频几秒"); 
                sleep(8000);
                var curAc = currentActivity();
                if(curAc!="com.yxcorp.gifshow.detail.PhotoDetailActivity")
                {
                    console.warn("进入作品页失败,跳过");
                    return false;
                }
                else
                {
                    var follow_btn=packageName(this.getPackage()).id("follow_text_container").findOnce();//小屏模式关注  在右上角
                    if(follow_btn)
                    {
                        follow_btn.parent().click(); 
                        sleep(2000);
                    }
                    else
                    {
                        follow_btn=packageName(this.getPackage()).id("slide_play_right_follow_button").findOnce();//大屏模式关注, 在右边中间 ,类似抖音UI
                        if(follow_btn)
                        {
                            log("点关注");
                            if(!this.global.clickView(follow_btn))
                                log("关注按钮不可点"); 
                            sleep(4000);
                        }
                        else
                        {
                            console.warn("未找到关注控件");
                            return false;
                        }
                    }
                }
            }
            else
            {
                follow_btn.click(); 
                sleep(1000);
            }
        }
        else
        {
            var unfollow_btn=packageName(this.getPackage()).id("header_follow_status_button").findOnce();
            if(unfollow_btn!=null)
            {
                console.warn("此用户已关注,跳过");
            }
            else
            {
                console.warn("未找到关注控件，关注失败");
            }
            return false;
        }
    } catch (e) {
        console.warn("未找到关注控件2");
        return false;
    }
    
    sleep(5000);
    var curAc = currentActivity();
    if(curAc=="com.yxcorp.gifshow.webview.KwaiWebViewActivity"||curAc=="com.yxcorp.gifshow.webview.KwaiYodaWebViewActivity")
    {
        this.checkScreenPersion();
        var code1=text("验证码").findOnce();
        var code2=text("获取语音验证码").findOnce();
        if(code1||code2)
        {
            this.global.error("快手账号被封禁,需要解封才能关注");
            sleep(10000);
            return -4;
        }
        else
        {
            if (this.config.androidVersion >= 7) 
            {
                if(!this.captcha)
                {
                    this.captcha = require("./Captcha.js"); 
                }
                this.captcha.close();
            }
            else
            {
                log("系统版本低于7.0,划图跳过");
            }
        }
    }
    var newNum = this.getFocusLikeNum(this.ksUid,true);
    log("关注前：" + oldNum + "，关注后：" + newNum);
    if (newNum <= oldNum) {
        console.warn("关注失败");
        return false;
    } else {
        log("关注成功");
        return true;
    }

}
hzKuaiShou.getFocusLikeNum=function(uid,isFocus)
{
    if(uid == null)
    {
        log("no uid")
        return -1;
    }
    var curAc = currentActivity();
    if(curAc!="com.yxcorp.gifshow.profile.activity.MyProfileActivity")
    {
        this.gotoUserProfile(uid);
        sleep(8000); 
    }
    var i = 0;
    while (true) 
    {
        try 
        {
            i++;
            var follow_btn=id("following").findOnce();
            var zanbtn=className("TextView").textContains("赞").findOnce();
            var follownum=follow_btn?  parseInt(follow_btn.getText()):"";
            var zannum=zanbtn? parseInt(zanbtn.getText()):"";
            log("关注数:"+follownum+",点赞数:"+zannum);
            this.global.updateFoucsLikeNum(follownum,zannum);
            if(isFocus&&follow_btn)
            {
                back();
                sleep(1000);
                return follownum;
            }
            if(!isFocus&& zanbtn)
            {
                back();
                sleep(1000);
                return zannum;
            }
            if (i > 5) 
            {
                log("没有找到数量");
                return -1;
            }
         } 
         catch (e) 
         {
                if (i > 5) 
                {
                    throw new Error("已5次获取失败，放弃"); 
                }
                sleep(200);
        }
    }
}
 
module.exports = hzKuaiShou;