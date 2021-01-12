var NewsClass = function () {
  	this.package = "com.ss.android.article.news";
    this.profile = "snssdk143://profile?uid=";
    this.uid = "";
    this.isInitListenDialog = false;
    this.isXiaoMi=false;
    this.global = {};
    // 69722830785
	this.init = function(config)
	{
		this.androidVersion = config.androidVersion;
        this.config=config;
        if(!this.isInitListenDialog)
        {
            this.listenDialog();
            this.isInitListenDialog = true;
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
                           sleep(3000);
                           continue;
                       }
                       netthis.global.closeGenernalDialog();
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
                       if (text('忽略').exists()) {
                           console.verbose("忽略");
                           text('忽略').click();
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
                       if (text('取消').clickable(true).exists() && !textEndsWith("名片分享").exists()
                           && !text("完成").exists() && !text("名片分享").exists() && !text("退出登录").exists() && !text("退出").exists() && !text("复制链接").exists()) {
                           text('取消').click();
                       };
                       if (text('跳过').exists()) {
                           console.verbose("跳过");
                           text('跳过').click();
                       };
                        
                       sleep(3000);
                       n++;
                   } catch (e) {
                       // this.global.error(e);
                   }
               };
   
           });
   
       }
	this.runWithConfig = function(config,delegate)
	{
        this.init(config);
        var deviceName=device.brand.toLowerCase();
        log("当前设备:"+deviceName);
        this.isXiaoMi=deviceName.indexOf("xiaomi")!=-1||deviceName.indexOf("redmi")!=-1;
		if(this.androidVersion<7)
		{
			log("安卓7以下不能做news 任务")
			return 0;
        }
		this.delegate = delegate
		if(!this.userName||!this.uid)
            this.uid=this.getMyUserid(0);
        if(!this.uid)
        {
            log("获news ID失败,跳过news 任务");
            return 0;
        }
         try {

			// 初始化火山

			// 无任务次数
			var waitNum = 0;
			// 当前完成任务次数，用于重启抖音
			var restartFinishNum = 0;
			// 总完成次数，用于重启脚本
			var finishNum = 0;
			// 失败次数
			var failNum = 0;
			
			while (true) {
			    try {
			        // log("当前可用内存："+Math.round(device.getAvailMem()/1024/1024)+"M");

			        // 当前界面不是火山，打开火山
			        if (currentPackage() != this.getPackage()) {
			            app.launchPackage(this.getPackage());
			            sleep(10000);
			        }

			        if (this.finishNewsFocus) {
			            return 1;
			        }
			        
			        // 领取任务,先获取关注，再获取点赞
			        var task = {};
			        var type = "tt";
			        var hanType = 1;

			        console.verbose("获取news 关注任务中");

			        
			        var task=delegate.getTaskWithNoBind(type,hanType,this.uid);
			        if (task != null && task.taskID != undefined && task.taskID != "") {
			            for (var item in task){
					        // log(item+":"+task[item]);
					    }
			            waitNum = 0; // 清0重新计数

			    
                        log("taskId:" + task.taskID);
			            var doRes = this.doFocusByUserId(task.douyin_url_id);
			            if (doRes) {
			                
			                // 提交任务
			                delegate.upTaskWithNoBind(type,task.taskID,this.uid,task.douyin_url_id,this.userName,"","");
			                
			                
		                    this.gotoHome();
		                    sleep(1000);
			                // 计数
			                failNum = 0;
			                restartFinishNum++;
			                finishNum++;

			                // 达到任务完成数判断
			                if (finishNum >= config.stopByFinishFocusNum) {
                                this.global.consolelog("已完成任务" + finishNum + "个,切换下个任务");
                                return 0;
			                }

			                

			            } else {
			                failNum++;
			                if (failNum >= config.stopByFailNum) { // 连续失败达到设置值，切下个任务
			                    log("关注连续失败" + failNum + ",切下个任务");
			                    return -1;
			                }

			                this.gotoHome();

			                console.warn("任务失败"+failNum); 
			            }

			           

			        } else {
			            waitNum++;
			            if (waitNum >= 360) { // 10次无任务，切下一任务
			                log("连续360次无关注任务，切下个任务");
			                return 0
			            }
			            
			            // 无任务间隔等待
			            console.verbose("暂无任务，休息5秒后继续");
			            sleep(5000);
			        }

			    } catch (e) {
			        // 返回首页
			        this.gotoHome();
			        this.global.error(e);
			        console.verbose("休息6秒重试");
			        sleep(6000);
			    }

			}
		} catch (e) {
			this.global.error(e);
			delegate.finish();
		}


	}
	this.getFocusNum = function()
	{
        this.gotoUserProfile(this.uid);
        sleep(3000);
        var focus=text("关注").className("TextView").findOnce();
        if(focus)
        {
            var subviews=focus.parent().children();
            for(var i=0;i<subviews.length;i++)
            {
                var view=subviews[i];
                var content=view.text().trim();
                if(view.className()=="android.widget.TextView"&&/^\d+$/.test(content))
                {
                    back();
                   return content;
                }
            }
        }
        log("找不到关注标签");
        back();
		return 0;
	}
	this.doFocusByUserId = function(uid)
	{
		var oldNum = this.getFocusNum()
		this.gotoUserProfile(uid)
		sleep(3000)
		var lbl=className("TextView").text("[add]关注").clickable().findOnce();
		if(lbl)
		{
			lbl.click()
		}
		else
		{
			log("没有找到关注按钮,"+uid);
			return false
		}
		sleep(1000);
		var newNum = this.getFocusNum()
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
	this.gotoMyProfile = function () {
     
        var pindex = 0
        var p = text("我的").findOnce()
        while(p&&pindex<4)
        {
            pindex++;
            p = p.parent()
            if(p.click())
                break;
        }
     };
     
    this.getUserName=function(lbl,trytimes)
    {
        var subviews=lbl.parent().children();
        for(var i=0;i<subviews.length;i++)
        {
            var view=subviews[i];
            if(view.className()=="android.widget.TextView")
            {
            	var content=view.text().trim();
                if(content.indexOf("个人主页") == -1)
            	{
            		log("用户名0:"+content);
	               this.userName=content;
	               return content;
	            }
	        }
	        var cc = view.children()
	        for(var j=0;j<cc.length;j++)
	        {
	            var view=cc[j];
	            if(view.className()=="android.widget.TextView")
	            {
	            	var content=view.text().trim();
	            	if(content.indexOf("个人主页") == -1)
	            	{
	            		log("用户名1:"+content);
		               this.userName=content;
		               return content;
		            }
	                
	            }
	        }
        }
        if(trytimes==0)
            return this.getUserName(lbl.parent(),1);
        return "";
    }
    this.getUrlInfo=function(url,trytimes)
    {
        var    urlRegex =  /(https:\/\/[\w/\.\?&=]+)/;
        var state=urlRegex.test(url);
        if(!state)
        {
            log(url);
            log("没有匹配到https链接");
            return "";
        }
        var items=urlRegex.exec(url);
        if(items.length>1)
        {
             url=items[1];
        }
        var content="";
        try {
             content = http.get(url.trim());
        } catch (e) 
        {
            log("请求错误： " + e)
           if(trytimes<3)
                return this.getMyUserid(url, trytimes+1);
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
                    var urlRegex = /user_id=(\d+?)(?=&|$)/;
                    var items=urlRegex.exec(url);
                    if(items&&items.length>1)
                    {
                        log("用户ID:"+items[1]);
                        return items[1];
                    }
                    else
                    {
                        log("正则未匹配到用户ID2");
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
        return "";
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
        if(lbl)
        {
           
            {
                var lbl=text("个人主页").findOnce();
                if(lbl)
                {
                    this.getUserName(lbl,0);
                    if(!this.global.clickView(lbl))
                        log("个人主页不可点");

                       
                    sleep(5000);
                    var curAc = currentActivity();
                    if(curAc=="com.bytedance.ugc.profile.user.profile.UserProfileActivity")
                    {
						var lbl=className("TextView").descStartsWith("分享").clickable().findOnce();
                        if(lbl)
                        {

					        lbl.click();
					        sleep(1000);
                        }
                        else
                        {
                            log("没有找到分享按钮");
                        }
                        var lbl_share=text("名片分享").findOnce();//有些设备存在可能找不到,加多一个朋友圈提高准确性
                        var friendShare=text("朋友圈").findOnce();
                        if(lbl_share||friendShare)
                        {
                        	var bds = lbl_share?lbl_share.bounds():friendShare.bounds(); 
	                        swipe(device.width*0.8,bds.top, device.width*0.2, bds.top, 300);
                            sleep(1000);
                            swipe(device.width*0.8,bds.top, device.width*0.2, bds.top, 300);//有些手机只划到系统分享,钉钉之类,正常用户分享选项更多,尽量划到最右边
	                        sleep(1000);
                        }
                        else
                            log("没有找到名片分享");
                        var lbl_cp=text("复制链接").findOnce();

                        if(lbl_cp)
                        {
                        	if(!this.global.clickView(lbl_cp))
		                        log("复制链接不可点");
                            //复制出来的可能是https://profile.zjurl.cn/rogue/ugc/profile/?version_code=793&version_name=70903&user_id=3043042597828456&media_id=0&request_source=1&active_tab=dongtai&device_id=65&app_name=news_article&tt_from=copy_link&utm_source=copy_link&utm_medium=toutiao_android&utm_campaign=client_share 或https://m.toutiao.com/is/Jfb8cuM/短链接
		                    sleep(2000);
	                        var url=this.global.getClipBoardContent();
                            back();
	                        if(url)
	                        {
	                            var urlRegex = /user_id=(\d+?)(?=&|$)/;
	                            var items=urlRegex.exec(url);
	                            if(items&&items.length>1)
	                            {
	                                log("用户ID:"+items[1]);
                                    return items[1];
	                            }
	                            else
	                            {
	                                log("正则未匹配到用户ID1");
	                                return this.getUrlInfo(url);
	                            }    
			                }
	                        else
	                        {
	                            log("粘贴板内容为空");
	                        }
                        }
                        else
                        {
                        	log("没有找到复制链接"+lbl_share)
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
                    log("没有找到个人主页");
                }
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

	this.gotoHome = function()
	{
		if (currentPackage() != this.getPackage()) {
            this.openApp();
            sleep(10000);
        }

        var index = 0;
        while(index<10)
        {
            index++;
            // if(curAc == this.getMainActivity())
            {
                var firtPage = text("首页").findOnce();
                var tuijian = text("我的").findOnce();
                var lbl=text("获赞").findOnce();
                if(lbl != null && firtPage != null)
                {
                    log("点击首页");
                    this.clickFirtPage();
                    {
                        sleep(1000);
                    }
                }
                if(firtPage != null &&tuijian != null)
                {
                    log("已经是首页")
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
	 
    this.getProfileScheme = function () {
        return this.profile;
    };

    this.getPackage = function () {
        var p = this.package;
        return p;
    };
    this.openApp = function () {
        app.launchPackage(this.getPackage());
    };
	   // 打开用户主页
    this.gotoUserProfile = function (userId) {
        app.startActivity({
            action: "android.intent.action.VIEW",
            data:this.getProfileScheme() + userId,
            packageName: this.getPackage()
        });
    };
      // 通过网页链接 打开用户主页
    this.gotoUserProfileWithUrl = function (userId) 
    {
       
        app.startActivity({
            action: "android.intent.action.VIEW",
            data:"https://profile.zjurl.cn/rogue/ugc/profile/?user_id=" + userId,
            packageName: this.getPackage()
        });
    };
}
module.exports = NewsClass;