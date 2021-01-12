
var HzDouyinClass = require("./hzDouyin.js");

var hzDyLow = function () {
    HzDouyinClass.call(this);
    
    this.whoami = function(){
        log("i am hzDyLowClass")
    }
    this.getMyUserid=function(trytimes )
    {
        if (currentPackage() != this.getPackage()) {
            this.openApp();
            sleep(10000);
        }
        log("获取用户ID");
        this.gotoHome();
        this.gotoMyProfile();
        sleep(3000);
        var lbl=text("获赞").findOnce();
        var douyinshortid="";
        if(lbl)
        {
            var shortid_lbl=className("TextView").textStartsWith("抖音号").findOnce();
            if(shortid_lbl)
            {
                douyinshortid = shortid_lbl.text().replace("抖音号：", "").trim();
                douyinshortid = douyinshortid.replace("抖音号:", "").trim();
                log(shortid_lbl.text());
                this.shortID=douyinshortid;
                var p = shortid_lbl.parent()
                var pp = p.parent()
                var lbname= null;
                for(var index=0;index<pp.childCount();index++)
                {
                    var child = pp.child(index)
                    if(child.className()=="android.widget.TextView")
                    {
                        if(lbname == null)
                            lbname = child
                        else
                        {
                            if(lbname.bounds().top>child.bounds().top)
                                lbname = child
                        }
                    }
                }
                if(lbname)
                {

                    this.userName = lbname.text()
                    log(this.userName)
                }
                else
                {
                    log("没有发现username")
                }
            }
            else
            {
                log("没有找到抖音号");
            }
           
            var icon = packageName("com.ss.android.ugc.aweme").className("RelativeLayout").boundsInside(device.width*0.8, 0, device.width, device.height*0.2).clickable().findOnce();  
            if(icon)
            {
                icon.click();
                sleep(3000);
                var lbl=text("设置").findOnce();
                if(lbl)
                {
                    if(!this.global.clickView(lbl,3))
                        log("设置不可点");
                    sleep(5000);
                    var curAc = currentActivity();
                    if(curAc=="com.ss.android.ugc.aweme.setting.ui.DouYinSettingNewVersionActivity")
                    {
                        swipe(device.width * 0.5, device.height * 0.9, device.width * 0.5, device.height * 0.1, 200);
                        sleep(500)
                        swipe(device.width * 0.5, device.height * 0.9, device.width * 0.5, device.height * 0.1, 200);
                        sleep(500)
                        swipe(device.width * 0.5, device.height * 0.9, device.width * 0.5, device.height * 0.1, 200);
                        sleep(500)
                        swipe(device.width * 0.5, device.height * 0.9, device.width * 0.5, device.height * 0.1, 200);
                        sleep(500)
                        swipe(device.width * 0.5, device.height * 0.9, device.width * 0.5, device.height * 0.1, 200);
                        sleep(500)
                        swipe(device.width * 0.5, device.height * 0.9, device.width * 0.5, device.height * 0.1, 200);
                        sleep(500)
                        var lbver = textContains("version").findOnce()
                        if(lbver)
                        {
                            var x = lbver.bounds().centerX()
                            var y = lbver.bounds().centerY()
                            press(x, y, 1);
                            sleep(50);
                            press(x, y, 1);
                            sleep(50);
                            press(x, y, 1);
                            sleep(50);
                            press(x, y, 1);
                            sleep(50);
                            press(x, y, 1);
                            sleep(2000);
                            var lbuid = textContains("UserId").findOnce()
                            if(lbuid)
                            var content = lbuid.text()
                            urlRegex = /UserId: (\d+)/;
                            var items=urlRegex.exec(content);
                            if(items&&items.length>1)
                            {
                                back()
                                var uid = items[1]
                                log("uid:"+uid)
                                return uid
                            }
                            log("uid exec failed")

                        }
                        else
                        {
                            log("查找版本失败")
                        }

                       

                    }
                    else
                    {
                        log(curAc);
                        log("进入设置界面失败");
                    }
                }
                else
                {
                    log("没有找到设置");
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
     // 打开用户主页关注，检测上量
    this.doFocusByUserId = function (userId,shortID) {

        if (currentPackage() != this.getPackage()) 
        {
            app.launchPackage(this.getPackage());
            log("打开D音中..."); 
            sleep(8000); 
        }
        
        if(!this.config.quickTask)
        {
            log("shortID:"+shortID);
            log("url:"+this.dyUrl);
        }
        
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

            var oldNum = this.getFocusNum();
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
           
            // log("=====自检=====")
            var newNum = this.getFocusNum();
            log("关注前：" + oldNum + "，关注后：" + newNum);
            if (newNum <= oldNum) {
                console.warn("关注失败");
                return false;
            } else {
                log("关注成功");
                return true;
            }
        } catch (e) {
            console.warn("关注失败"+e);
            return false;
        }
    };
     this.doLike = function (awemeId) {


        if (currentPackage() != this.getPackage()) 
        {
            app.launchPackage(this.getPackage());
            log("打开D音中..."); 
            sleep(8000); 
        }

      
        return this.doLikeHighVersion(awemeId);

    };
    this.focusWithoutTouch=function(jump)
    {
        if(jump)
        {
            var icons=packageName(this.getPackage()).className("ImageView").boundsInside(0, device.height * 0.2, device.width, device.height).find();//只有一个作品有时找不到
            //log(icons);
            var icon="";
            for(var i=0;i<icons.length;i++)
            {
                var view=icons[i];
                if(view.bounds().width()>=(device.width/3.0-50)&&view.bounds().width()<=(device.width/3.0+50))
                {
                    icon=view;
                    break;
                }
            }
            if(icon)
                this.global.clickView(icon);
            else
            {
                log("没有找到作品图标进入");
                return -2;
            }
            sleep(4000);
        }
        var icons=packageName(this.getPackage()).className("ImageView").boundsInside(device.width * 0.8, device.height * 0.2, device.width, device.height*0.6).find();//
        var minWidth=9999;
        var icon="";
        for(var i=0;i<icons.length;i++)
        {
            var view=icons[i];
            if(view.bounds().left<device.width&& view.bounds().left<view.bounds().right&& view.bounds().top<view.bounds().bottom&&view.bounds().width()<minWidth)
            {
                icon=view;
                minWidth=view.bounds().width();
            }
        }
        if(icon)
        {
            this.global.clickView(icon);
        }
        else
        {
            log("没有找到关注按钮");
            return -1;
        }
        return 1;
    }
    this.doFocusByProduct= function (userId)
    {
     // auto.setWindowFilter((info) => {
     //        return true;
     //    });
        var oldNum = this.getFocusNum();
        this.gotoUserProfile(userId);
        sleep(5000);
       
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
        if (this.config.androidVersion >= 7) 
        {

            log("滑动作品")
            swipe(device.width * 0.5, device.height * 0.8, device.width * 0.5, device.height * 0.1, 200);
            sleep(1000);

        }
        
        var state=this.focusWithoutTouch(true);
        if(state==1)
        {
            sleep(1000)
            var newNum = this.getFocusNum();
            log("关注前：" + oldNum + "，关注后：" + newNum);
            if (newNum <= oldNum) {
                console.warn("关注失败");
                return false;
            } else 
            {
                log("关注成功");
                return true;
            }
        }

        if (this.config.androidVersion >= 7)
        {
            if(state==-2)
            {
                var rcVector = packageName(this.getPackage()).classNameContains("RecyclerView").find()
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
                this.config.debug&& console.hide();
                click(b.centerX(), b.centerY())
                sleep(2000)
                this.config.debug&& console.show(); 
            }
             
            var btnfocus=packageName(this.getPackage()).className("Button").descStartsWith("关注").boundsInside(device.width * 0.2, device.height * 0.2, device.width, device.height * 0.8).clickable().findOnce();//5.8以上
            if(!btnfocus)
               btnfocus = id("b80").findOnce();//5.8
            if(!btnfocus)
                btnfocus=packageName(this.getPackage()).className("Button").textContains("关注").clickable().findOnce();//主页关注
            var state=0;
            if(!btnfocus)//进入了视频页,没找到关注按钮
                state=this.focusWithoutTouch(false);//再找一次关注的+号
            if(btnfocus||state==1)
            {
                if(btnfocus)
                {
                    sleep(7000);
                    btnfocus.click();
                    sleep(2000);
                }
                var newNum = this.getFocusNum();
                log("关注前：" + oldNum + "，关注后：" + newNum);
                if (newNum <= oldNum) {
                    console.warn("关注失败");
                    return false;
                } else 
                {
                    log("关注成功");
                    return true;
                }
            }
            else
            {
                log("没找到关注按钮")
                return false
            }
        }
        else
            log("没有找到作品");
        
        
        return -1;
    }
    // 获取关注数
    this.getFocusNum = function () {
        return this.getNumByType("focus")
    }
    this.getLikeNum = function () {
        return this.getNumByType("like")
    }
    this.getNumByType = function (type) {
        this.gotoUserProfile(this.dyUid);
        sleep(2000)
        var i = 0;
        while (true) {
            // log("获取关注数:" + i);
            try {
                i++;
                var lb_works = textStartsWith("作品").findOnce();
                var lb_like = id("title").textStartsWith("喜欢").findOnce();
                var lb_focus = text("关注").findOnce();
             

                if(lb_works != null && lb_like != null && lb_focus !=null)
                {
                    
                    var focus = lb_focus.getText()
                    var like = lb_like.getText()
                    var works = lb_works.getText()
                    var p_focus = lb_focus.parent()
                    var focus_num = null
                    var like_num = null
                    for(var index=0;index<p_focus.childCount();index++)
                    {
                        var child = p_focus.child(index)
                        if(child.getText()!=focus)
                        {
                            focus_num =child.getText()
                            log("focus_num:"+focus_num)
                        }
                    }
                    like_num = like.replace("喜欢",'');
                    like_num = like.replace("喜欢 ",'');
                    log("like_num:"+like_num)
                   
                    // log("this focus num"+num)
                    back();
                    sleep(1000)
                    this.global.updateFoucsLikeNum(focus_num,like_num);
                    if(type=="focus")
                        return parseInt(focus_num)
                    else
                        return parseInt(like_num)
                }
                else
                {
                   if(lb_works == null)
                        log("没有找到作品按钮");
                    else if(lb_like == null)
                        log("没有找到喜欢按钮,可能当前绑定账号与当前做任务的号不匹配");
                    else if(lb_focus == null)
                        log("没有找到关注数量,请升级火山到最新版本");
                }
                // var userInfo = this.getUserInfo();
                // var num = userInfo.following_count;
                // return parseInt(num);
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
}
//查找通迅录 com.ss.android.ugc.aweme.friends.ui.RecommendContactActivity  跳过

module.exports = hzDyLow;