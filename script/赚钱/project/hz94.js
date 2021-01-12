hz94 = {};
// 界面配置
hz94.config = {};
hz94.global = {};
// 全局cookie
hz94.cookieStr = "";
// 抖音关注完成标志
hz94.finishDyFocus = false;
// 抖音点赞完成标志
hz94.finishDyLike = false;
hz94.finishQDyFocus = false;
hz94.finishQDyLike = false;

// 快手关注完成标志
hz94.finishKsFocus = false;
// 快手点赞完成标志
hz94.finishKsLike = false;
// 火山关注完成标志
hz94.finishHsFocus = false;
// 火山点赞完成标志
hz94.finishHsLike = false;
hz94.finishNewsFocus = false;
hz94.stopByFinishNum=false;
hz94.host="";

var HzDouyinClass = require("./hzDouyin.js");
var HzDyJsClass = require("./hzDyJs.js");
var HzDyLowClass = require("./hzDyLow.js");

// var HzNewsClass = require("./hzNews.js");
var  hzServer = require("./hzServer.js");

var hzDouyin = new HzDouyinClass();
var hzDyJs = new HzDyJsClass();
var hzDyLow = new HzDyLowClass()
// var hzNews = new HzNewsClass()
var hzKuaiShou = require("./hzKuaiShou.js");
var hzHuoshan = require("./hzHuoshan.js");
var encrypt=require("./Gorgon.js");

md5 = encrypt.gorgon; 
hz94.getTask = function(type, hanType){
    var url = this.host+"/h8/userapi/task/gets.do";
    var data = {
        type: type,
        hanType: hanType
    }
    var r = hz94.urlPost(url, data);
    return r;
}
//shortid搜索用户
hz94.getDyInfo=function(shortID)
{
    //this.host="http://8.129.210.98/";
    var url = this.host+"/h8/rest/sjtask/getDyInfo";
    var post_data = {
        "shortid": shortID,
        "token":this.config.token
    }
    log("获取用户信息,这个过程可能比较久");
    //log(url);
    //log(post_data);
    var get_times=0;
    while(get_times<10)
    {
        if(get_times>8)
            this.global.error("如果一直显示 执行中，修改下你的抖音号会更容易成功哦");
        get_times++;
        var r = hz94.urlPostWithoutCookie(url, post_data,"");
        var data= r.obj;
        if (r.success == true ) 
        {
            log(r.msg);
            if(data.sec_uid)
            {
                log("返回昵称是:"+data.nickname);
                hzDouyin.nickname=data.nickname;
                this.config[shortID]=data.sec_uid;
                var sto = storages.create("hzConfigData");
                sto.put("config", this.config);
                return data;
            }
            else
            {
                log("返回数据有误");
                return "";
            }
        }
        else
        {
            sleep(10000);
        }
    }
    return "";
}

//不绑定  获取任务
hz94.getTaskWithNoBind = function(type, hanType,userid){
    //this.host="http://8.129.210.98";
    var url = this.host+"/h8/rest/sjtask/gzstask_gets";
    var data = {
        "type": type,
        "dyUserId":userid,
        "token":this.config.token,
        "hanType": hanType
    }
    //log(url);
    //log(data);
    var r = hz94.urlPostWithoutCookie(url, data,""); 
    //log(r.obj); 
    if (r.msg.indexOf("任务已完成") != -1) {
        if(type=="dy")
        {
            if (hanType == 1) {
                this.global.error("D音当天关注已完成");
                this.finishDyFocus = true;
            } else if (hanType == 2) {
                this.global.error("D音当天点赞已完成");
                this.finishDyLike = true;
            }
        }
        
        if(type=='hs')
        {
            if (hanType == 1) {
                this.global.error("H山当天关注已完成");
                this.finishHsFocus = true;
            } else if (hanType == 2) {
                this.global.error("H山当天点赞已完成");
                this.finishHsLike = true;
            }
        }
        if(type=='ks')
        {
            if (hanType == 1) {
                this.global.error("K手当天关注已完成");
                this.finishKsFocus = true;
            } else if (hanType == 2) {
                this.global.error("K手当天点赞已完成");
                this.finishKsLike = true;
            }
        }
        if(type=='tt')
        {
            if (hanType == 1) {
                this.global.error("news 当天关注已完成");
                this.finishNewsFocus = true;
            } 
        }
    }
    
    return r.obj;
}

//不绑定   任务
hz94.upTaskWithNoBind = function(type, taskId,userid,urlId,nickName,msgId,error){
    //this.host="http://8.129.210.98";
    var needlog = true
    if(msgId)
        needlog = false
    if(needlog)
        log("提交任务");
    var url = this.host+"/h8/rest/sjtask/gzstask_ups";
    if(msgId=="kslike")
    {
        msgId="";
        url = this.host+"/h8/rest/sjtask//gzstask_ups_ksc";
    }
    var timestamp = (new Date()).valueOf();
    var data = {
        "type": type,
        "dyUserId":userid,
        "urlId":urlId,
        "nickName":nickName,
        "token":this.config.token,
        "taskId": taskId,
        "timestamp":timestamp
    }
    //log(url);
    //log(data);
    if(msgId)
    {
        data['msgId']=msgId;
        data['error']=error;
        url = this.host+"/h8/rest/sjtask/gzstask_ups_pl";
    }
    var gorgon = md5(md5(data['type']+data['dyUserId']+data['urlId']+data['nickName']+data['token']+data['taskId']+data['timestamp']));
    //gorgon=gorgon.substr(0,gorgon.length-2)+'aa';
    //log(gorgon);
    var headers={
        headers: {
            'gorgon': gorgon
        }
    }
    var r = hz94.urlPostWithoutCookie(url, data,headers);
    //log(r);
    if (r.success == true) {
        if(needlog)
            log(r.msg);
        return true;
    } else {
        if(needlog)
        {
            if(!this.serverFailNum)
                this.serverFailNum = 0
            this.serverFailNum = this.serverFailNum + 1
            //if(this.serverFailNum%10==0)
            {
                log(data)
                this.global.error("提交失败" + r.msg);
            }
        }            
        return false;
    }
    
   
    return r;
}


//获取绑定账号
hz94.getBindList=function(type)
{
    var url = this.host + "/h8/userapi/task/getBindList.do";
    var data = {
        type: type
    }
    var r = hz94.urlPost(url, data); 
    return r;
}
//绑定账号
hz94.bindUser=function(type,id)
{
    var url = this.host + "/h8/userapi/adminUser/changeBind.do";
    var data = {
        type: type,
        id:id
    }
    var r = hz94.urlPost(url, data); 
    return r;
}
//绑定账号
hz94.getToken=function()
{
    //var host="http://94hz.58huluwa.com/";
    var host=this.host;
    var url = host + "/h8/userapi/adminUser/check_apps.do";
    var r = hz94.urlPost(url, []);
    return r;
}

// post请求
hz94.urlPost = function (url, data) {
    //log("请求:"+url);
    if (hz94.cookieStr == null || hz94.cookieStr == "") {
        throw new Error("urlPost error: cookieStr null, url:" + url + ",未登录");
    }
    var options = {
        headers: {
            'Cookie': hz94.cookieStr
        }
    };
    var logfunc=this.config.debug?log:this.global.error;
    try {
        var r = http.post(url, data, options);
        // log("code = " + r.statusCode);
         //log("html = " + r.body.string());
         var content=r.body.string();
         //log("json:" + content); 
         var json = JSON.parse(content);  
        // log("json:" + (json));

    } catch (e) {
        try {
            var r2 = http.post(url, data, options);
            var html = r2.body.string();
            if (html.indexOf("请输入账号") != -1) {   
                logfunc("未登录,请先在 个人中心 登录");
                log("登录掉线了");
                //alert("未登录,请先在 个人中心 登录");
                var cookieManager = android.webkit.CookieManager.getInstance();
                // cookieManager.removeSessionCookies(null);
                cookieManager.removeAllCookie(); 
                this.config.cookieStr="";
                var sto = storages.create("hzConfigData");
                sto.put("config", this.config);
            }
        } catch (e2) {
            logfunc("请求错误2： " + e2);
        }

        logfunc("请求错误： " + e);
    }
    if (r.statusCode != 200) {
        logfunc(json);

        logfunc("请求失败!" + r.body.string());
    }

    if (json.success == false && json.msg.indexOf("绑定") != -1) {
        alert(json.msg);
        logfunc(json.msg);
        log("没有绑定,终止");
        this.finish();
    }

    return json;
};


// post请求
hz94.urlPostWithoutCookie = function (url, data,headers) {
    var json ="";
    //log("url:"+url);
    try {
        var r = http.post(url, data,headers);
        var content=r.body.string();
        //log("json:" + content); 
        json = JSON.parse(content);  
        //if(json)
        //log(json);  
        //var json = r.body.json(); 

    } catch (e) 
    {
        this.global.error("请求错误： " + e);
    }
    if (r.statusCode != 200) {
        this.global.error(json);
        this.global.error("请求失败!" + r.body.string());
    }

    if (json.success == false ) {
    //     if(data["hanType"] == 3)
    //         log(json.msg);
    //     else
    //         this.global.consolelog(json.msg);
    }

    return json;
};
 
// 脚本结束
hz94.finish = function () {
    log("hz94 执行完成");
    threads.shutDownAll();
    engines.stopAll();
    exit();
};

// 初始化配置
hz94.init = function (config) {
    this.config = config;
    // 设置全局cookie
    this.cookieStr = config.cookieStr;
    hzDouyin.global=this.global;
    hzHuoshan.global=this.global;
    hzKuaiShou.global=this.global;
    // hzNews.global=this.global;
    hzDyJs.global=this.global;
    hzDyLow.global=this.global;
    
}

// 抖音初始化
hz94.initDy = function (config) {
    hzDouyin.init(config);
    
    // 任务前养号
    if (config.bringBefore) {
        hzDouyin.doBringBefore();
    }
}

// 火山初始化
hz94.initHs = function (config) {
    hzHuoshan.init(config);
    // 任务前养号
    if (config.bringBefore) {
        hzHuoshan.doBringBefore();
    }
}

// 快手初始化
hz94.initKs = function (config) {
    hzKuaiShou.init(config);
    hzKuaiShou.openApp();
    sleep(8000);
    // 任务前养号
    if (config.bringBefore) {
        hzKuaiShou.doBringBefore(false);
    }
}


// 去火山首页
hz94.backHsHome = function () {
    hzHuoshan.popToRootViewController(0);
    // 火山版打开的是视频列表页,点开一个视频
    // hzHuoshan.gotoHuoShanAvByList();

}

// 去抖音首页
hz94.backDyHome = function () {
    hzDouyin.gotoHome();
    sleep(1000);
}

// 去快手首页
hz94.backKsHome = function () {
    
    hzKuaiShou.popToRootViewController();
}

// 跑火山点赞任务
hz94.runHsLike = function (config) {

    try {

        // 初始化火山
        this.initHs(config);

        // 无任务次数
        var waitNum = 0;
        // 总完成次数，用于重启脚本
        var finishNum = 0;
        // 失败次数
        var failNum = 0;
        this.global.taskBegin=true;
        while (true) {
            try {
                log("94 hs next~");
                // 当前界面不是火山，打开火山
                if (currentPackage() != hzHuoshan.getPackage()) {
                    app.launchPackage(hzHuoshan.getPackage());
                    sleep(10000);
                    hzHuoshan.gotoHuoShanAvByList();
                }

                if (this.finishHsLike) {
                    return 1;
                }
                // 领取任务,先获取关注，再获取点赞
                var task = {};
                var type = "hs";
                var hanType = 2;

                log("获取H山点赞任务中");
                var task=this.getTaskWithNoBind(type,hanType,hzHuoshan.dyUid);
                if (task != null && task.taskID != undefined && task.taskID != "") {

                    waitNum = 0; // 清0重新计数
                    log("taskId:" + task.taskID);
                    log("Get 点赞任务");

                    hzHuoshan.gotoDetail(task.douyin_url_id);
                    // 点赞前看

                    log("看视频");
                    
                    var wait=config.quickTask?(config.quickTask==2?random(3000, 5000):random(4000, 6000)):(random(7000, 15000) + config.taskInterval * 1000);
                    sleep(wait);
                    var doRes = hzHuoshan.doLike(task.douyin_url_id);
                    if (doRes) 
                    {
                        if(!config.quickTask)
                            sleep(1000);

                        this.upTaskWithNoBind(type,task.taskID,hzHuoshan.dyUid,task.douyin_url_id,hzHuoshan.userName,"","");
                        if(!config.quickTask)
                        {
                            // 返回首页
                            this.backHsHome();
                            sleep(1000);
                        }
                        
                        // 计数
                        failNum = 0;
                        finishNum++;
                        this.global.updateNum(false,true);
                        // 达到任务完成数判断
                        if (finishNum >= config.stopByFinishLikeNum) {
                            this.global.consolelog("已完成任务" + finishNum + "个,切换下个任务");
                            this.stopByFinishNum=true;
                            this.finishHsLike=true;
                            return 0;
                        }

                    } else {
                        failNum++;
                        this.global.updateNum(false,false);
                        if (failNum >= config.stopByFailNum) { // 连续失败达到设置值，切下个任务
                            this.global.consolelog("点赞连续失败" + failNum + ",切下个任务");
                            this.finishHsLike=true;
                            return -1;
                        }

                        // 返回首页
                        if(!config.quickTask)
                             this.backHsHome();
                        console.warn("任务失败");
                    }

                    // 任务中养号
                    if (config.bringOngoing) {
                        hzHuoshan.doBringOngoing(); 
                    }

                } else {
                    waitNum++;
                    if (waitNum >= 360) { // 10次无任务，切下一任务
                        log("连续360次无点赞任务，切下个任务");
                        return 0;
                    }
                    // 无任务间隔等待
                    this.global.consolewarn("暂无任务，休息5秒后继续");
                    sleep(5000);
                }

            } catch (e) {
                // 返回首页
                this.backHsHome();
                this.global.error(e);
                log("休息6秒重试");
                sleep(6000);
            }

        }
    } catch (e) {
        log("hslike,终止");
        this.global.error(e);
        this.finish();
    }
    this.global.taskBegin=false;
}
// 跑快手关注任务
hz94.runKsFocus = function (config)
{
    try 
    {

        // 初始化快手
        this.initKs(config);

        // 无任务次数
        var waitNum = 0;
      
        // 总完成次数，用于重启脚本
        var finishNum = 0;
        // 失败次数
        var failNum = 0;
        this.global.taskBegin=true;
        while (true) {
            try {
                log("94 ks next~");
                 
                if (currentPackage() != hzKuaiShou.getPackage()) {
                    app.launchPackage(hzKuaiShou.getPackage());
                    sleep(10000);
                }

                if (this.finishKsFocus) {
                    return 1;
                }

                // 领取任务,先获取关注，再获取点赞
                var task = {};
                var type = "ks";
                var hanType = 11;

                log("获取K山关注任务中");
                var task=this.getTaskWithNoBind(type,hanType,hzKuaiShou.ksUid);
                if (task != null && task.taskID != undefined && task.taskID != "") {
                    // log("task:"+task)

                    waitNum = 0; // 清0重新计数
                    log("taskId:" + task.taskID);
                    log("Get 关注任务");

                    hzKuaiShou.gotoUserProfile(task.douyin_url_id);

                    log("看" + config.taskInterval + "秒");
                    sleep(1000 + config.taskInterval * 1000);

                    var doRes = hzKuaiShou.doFocusByUserId(task.douyin_url_id);
                    if (doRes) {
                        if(doRes==-4)
                        {
                            return -1;//账号被封,不用做任务了
                        }
                        sleep(1000);

                        this.upTaskWithNoBind(type,task.taskID,hzKuaiShou.ksUid,task.douyin_url_id,hzKuaiShou.userName,"","");
                        // 返回首页
                        this.backKsHome();
                        sleep(1000);

                        // 计数
                        failNum = 0;
                        finishNum++;
                        this.global.updateNum(true,true);
                        // 达到任务完成数判断
                        if (finishNum >= config.stopByFinishFocusNum) {
                            this.global.consolelog("已完成任务" + finishNum + "个,切换下个任务");
                            this.stopByFinishNum=true;
                            this.finishKsFocus=true;
                            return 0;
                        }
                    } else {
                        failNum++;
                        this.global.updateNum(true,false);
                        if (failNum >= 5) { // 连续失败达到设置值，切下个任务
                            this.global.consolelog("关注连续失败" + failNum + ",切下个任务");
                            this.finishKsFocus=true;
                            return -1;
                        }
                        
                        // 返回首页
                        this.backKsHome();
                        console.warn("任务失败");
                    }

                    // 任务中养号
                    if (config.bringOngoing) {
                        hzKuaiShou.doBringBefore(true);
                    }

                } else {
                    waitNum++;
                     
                    if (waitNum >= 360) { // 10次无任务，切下一任务
                        log("连续360次无关注任务，切下个任务");
                        return 0
                    }
                    
                    // 无任务间隔等待
                    this.global.consolewarn("暂无任务，休息5秒后继续");
                    sleep(5000);
                }

            } catch (e) {
                // 返回首页
                this.backKsHome();
                this.global.error(e);
                log("休息6秒重试");
                sleep(6000);
            }

        }
    } catch (e) {
        log("ksfocus,终止");
        this.global.error(e);
        this.finish();
    }
    this.global.taskBegin=false;
}


// 跑快手点赞任务
hz94.runKsLike = function (config)
{
    try 
    {
        // 初始化快手
        this.initKs(config);

        // 无任务次数
        var waitNum = 0;
        // 总完成次数，用于重启脚本
        var finishNum = 0;
        // 失败次数
        var failNum = 0;
        this.global.taskBegin=true;
        while (true) {
            try {
                log("94 ks next~");
                 
                if (currentPackage() != hzKuaiShou.getPackage()) {
                    app.launchPackage(hzKuaiShou.getPackage());
                    sleep(10000);
                }

                if (this.finishKsLike) {
                    return 1;
                }

                 
                var task = {};
                var type = "ks";
                var hanType = 12;

                log("获取K山点赞任务中");
                var task=this.getTaskWithNoBind(type,hanType,hzKuaiShou.ksUid);
                if (task != null && task.taskID != undefined && task.taskID != "") {
                    // log("task:"+task)

                    waitNum = 0; // 清0重新计数
                    log("taskId:" + task.taskID);
                    log("Get 点赞任务");

                    hzKuaiShou.gotoDetail(task.douyin_url_id);

                    log("看" + config.taskInterval + "秒");
                    sleep(1000 + config.taskInterval * 1000);

                    var doRes = hzKuaiShou.doLike(task.douyin_url_id);
                    if (doRes) {
                        if(doRes==-4)
                        {
                            return -1;//账号被封,不用做任务了
                        }
                        sleep(1000);
                        this.upTaskWithNoBind(type,task.taskID,hzKuaiShou.ksUid,task.douyin_url_id,hzKuaiShou.userName,"kslike","");
                        // 返回首页
                        this.backKsHome();
                        sleep(1000);

                        // 计数
                        failNum = 0;
                        finishNum++;
                        this.global.updateNum(false,true);

                        // 达到任务完成数判断
                        if (finishNum >= config.stopByFinishLikeNum) {
                            this.global.consolelog("已完成任务" + finishNum + "个,切换下个任务");
                            this.stopByFinishNum=true;
                            this.finishKsLike=true;
                            return 0;
                        }
                    } else {
                        failNum++;
                        this.global.updateNum(false,false);
                        if (failNum >= 5) { // 连续失败达到设置值，切下个任务
                            this.global.consolelog("点赞连续失败" + failNum + ",切下个任务");
                            this.finishKsLike=true;
                            return -1;
                        }
                        
                        // 返回首页
                        this.backKsHome();
                        console.warn("任务失败");
                    }

                    // 任务中养号
                    if (config.bringOngoing) {
                        hzKuaiShou.doBringBefore(true);
                    }

                } else {
                    waitNum++;
                    if (waitNum >= 360) { // 10次无任务，切下一任务
                        log("连续360次无点赞任务，切下个任务");
                        return 0
                    }
                    
                    // 无任务间隔等待
                    this.global.consolewarn("暂无任务，休息5秒后继续");
                    sleep(5000);
                }

            } catch (e) {
                // 返回首页
                this.backKsHome();
                this.global.error(e);
                log("休息6秒重试");
                sleep(6000);
            }
        }
    } catch (e) {
        log("kslike,终止");
        this.global.error(e);
        this.finish();
    }
    this.global.taskBegin=false;
}


// 跑火山关注任务
hz94.runHsFocus = function (config) {

    try {

        // 初始化火山
        this.initHs(config);

        // 无任务次数
        var waitNum = 0;
        // 总完成次数，用于重启脚本
        var finishNum = 0;
        // 失败次数
        var failNum = 0;
        var thisTypeOver = false
        var oldTask = null
        this.global.taskBegin=true;
        while (true) {
            try {
                if(thisTypeOver)
                    return -1
                if(!this.config.quickTask)
                    log("94 hs next~");
                // log("当前可用内存："+Math.round(device.getAvailMem()/1024/1024)+"M");

                // 当前界面不是火山，打开火山
                if (currentPackage() != hzHuoshan.getPackage()) {
                    app.launchPackage(hzHuoshan.getPackage());
                    sleep(10000);
                    hzHuoshan.gotoHuoShanAvByList();
                }

                if (this.finishHsFocus) {
                    return 1;
                }
                 // 达到任务完成数判断
                 if (finishNum >= config.stopByFinishFocusNum) {
                    this.global.consolelog("已完成任务" + finishNum + "个,切换下个任务");
                    this.stopByFinishNum=true;
                    this.finishHsFocus=true;
                    return 0;
                }
                // 领取任务,先获取关注，再获取点赞
                var task = {};
                var type = "hs";
                var hanType = 1;

                log("获取H山关注任务中");
                var task=this.getTaskWithNoBind(type,hanType,hzHuoshan.dyUid);
                if (task != null && task.taskID != undefined && task.taskID != "") {
                    // log("task:"+task)

                    waitNum = 0; // 清0重新计数
                    log("taskId:" + task.taskID);
                    if(!this.config.quickTask)
                        log("Get 关注任务");

                    var arr=task.message.split("--");
                    if(this.config.quickTask==3)
                        log(task.taskName);
                    var that = this
                    var that_dyuid = hzHuoshan.dyUid
                    successCallback = function()
                    {
                        that.upTaskWithNoBind(type,oldTask.taskID,that_dyuid,oldTask.douyin_url_id,hzHuoshan.userName,"","");
                        
                        if(!config.quickTask)
                        {
                            // 返回首页
                            that.backHsHome();
                            sleep(1000);
                        }
                        // 计数
                        failNum = 0;
                        finishNum++;
                        that.global.updateNum(true,true);
                    }
                    failCallback = function()
                    {
                        failNum++;
                        that.global.updateNum(true,false);
                        if (failNum >= config.stopByFailNum) { // 连续失败达到设置值，切下个任务
                            that.global.consolelog("关注连续失败" + failNum + ",切下个任务");
                            thisTypeOver = true
                            that.finishHsFocus=true;
                        }
                        // 返回首页
                        if(!config.quickTask)
                            that.backHsHome();
                        console.warn("任务失败"+failNum); 
                    }
                    hzHuoshan.doFocusByUserId(task.douyin_url_id,arr[0],task.shortID,successCallback,failCallback);
                    oldTask = task
                    
                    // 任务中养号
                    if (config.bringOngoing) {
                        hzHuoshan.doBringOngoing();
                    }

                } else {
                    waitNum++;
                    if (waitNum >= 360) { // 10次无任务，切下一任务
                        log("连续360次无关注任务，切下个任务");
                        return 0
                    }
                    
                    // 无任务间隔等待
                    this.global.consolewarn("暂无任务，休息5秒后继续");
                    sleep(5000);
                }

            } catch (e) {
                // 返回首页
                this.backHsHome();
                this.global.error(e);
                log("休息6秒重试");
                sleep(6000);
            }

        }
    } catch (e) {
        this.global.error(e);
        this.finish();
    }
    this.global.taskBegin=false;
}

// 跑抖音点赞任务
hz94.runDyLike = function (config) {

    try {

        // 抖音初始化
        this.initDy(config);

        // 无任务次数
        var waitNum = 0;
        // 总完成次数，用于重启脚本
        var finishNum = 0;
        // 失败次数
        var failNum = 0;
        var zanTimes=0;
        this.global.taskBegin=true;
        while (true) {
            try {
                if(!this.config.quickTask)
                    log("94 dy next~");
                if (currentPackage() != hzDouyin.getPackage()) {
                    app.launchPackage(hzDouyin.getPackage());
                    sleep(10000);
                }

                if (this.finishDyLike) {
                    return 1;
                }

                // 领取任务,先获取关注，再获取点赞
                var task = {};
                var type =  "dy";
                var hanType = 2;
                log("获取D音点赞任务中");
                var task=this.getTaskWithNoBind(type,hanType,hzDouyin.dyUid);
                if (task != null && task.taskID != undefined && task.taskID != "") {
                    waitNum = 0; // 清0重新计数
                    log("taskId:" + task.taskID);
                    if(!this.config.quickTask)
                        log("Get 点赞任务");

                    hzDouyin.gotoDetail(task.douyin_url_id);

                    // 点赞前看
                    if(this.config.quickTask!=2)
                    {
                        sleep(random(4000, 6000));
                    }


                    var doRes = hzDouyin.doLike(task.douyin_url_id);
                    if (doRes) {
                        this.upTaskWithNoBind(type,task.taskID, hzDouyin.dyUid,task.douyin_url_id,hzDouyin.userName,"","");
                      
                        // 计数
                        failNum = 0;
                        finishNum++;
                        this.global.updateNum(false,true);
                        // 达到任务完成数判断
                        if (finishNum >= config.stopByFinishLikeNum) {
                           this.global.consolelog("已完成任务" + finishNum + "个,停止脚本");
                           this.stopByFinishNum=true;
                           this.finishDyLike=true;
                           return 0;
                        }
                    } else {
                        failNum++;
                        this.global.updateNum(false,false);
                        if (failNum >= config.stopByFailNum) { // 连续失败达到设置值，切下个任务
                            this.global.consolelog("点赞连续失败" + failNum + ",切下个任务");
                            this.finishDyLike=true;
                            return -1;
                        }
                        
                        // 返回首页
                        
                        console.warn("任务失败");
                    }
                    zanTimes++;
                    if(zanTimes%5==0)
                        log("点赞已做次数:"+zanTimes);
                    if(zanTimes%30==0)
                    {
                        this.runCommentTask(false);
                    }
                    if (config.bringOngoing) {
                        hzDouyin.doBringOngoing();
                    }

                } else {
                    waitNum++;
                    if (waitNum >= 360) { // 10次无任务，切下一任务
                        log("连续360次无点赞任务，切下个任务");
                        return 0;
                    }
                    
                    // 无任务间隔等待
                    this.global.consolewarn("暂无任务，休息5秒后继续");
                    sleep(5000);
                }

            } catch (e) {
                // 返回首页
                this.backDyHome();
                this.global.error(e);
                log("休息6秒重试");
                sleep(6000);
            }

        }
    } catch (e) {
        log("hsfocus,终止");
        this.global.error(e);
        this.finish();
    }
    this.global.taskBegin=false;
}
hz94.runDyLowLike = function (config) {

    try {

        // 抖音初始化
        hzDyLow.init(config);
        if (config.bringBefore) {
            hzDyLow.doBringBefore();
        }
        // 无任务次数
        var waitNum = 0;
        // 总完成次数，用于重启脚本
        var finishNum = 0;
        // 失败次数
        var failNum = 0;
        this.global.taskBegin=true;
        while (true) {
            try {
                log("94 dy next~");
               
                if (currentPackage() != hzDyLow.getPackage()) {
                    app.launchPackage(hzDyLow.getPackage());
                    sleep(10000);
                }

                if (this.finishDyLike) {
                    return 1;
                }

                // 领取任务,先获取关注，再获取点赞
                var task = {};
                var type =  "dy";
                var hanType = 2;

                log("获取D音点赞任务中");
                var task=this.getTaskWithNoBind(type,hanType,hzDyLow.dyUid);
                if (task != null && task.taskID != undefined && task.taskID != "") {
                    waitNum = 0; // 清0重新计数
                    log("taskId:" + task.taskID);
                    log("Get 点赞任务");

                    hzDyLow.gotoDetail(task.douyin_url_id);

                    // 点赞前看
                    log("看视频");
                    sleep(2000);
                    var doRes = hzDyLow.doLike(task.douyin_url_id);
                    if (doRes) {
                        this.upTaskWithNoBind(type,task.taskID, hzDyLow.dyUid,task.douyin_url_id,hzDyLow.userName,"","");
                        // 返回首页
                     
                        // 计数
                        failNum = 0;
                        finishNum++;
                        this.global.updateNum(false,true);
                        // 达到任务完成数判断
                        if (finishNum >= config.stopByFinishLikeNum) {
                            this.global.consolelog("已完成任务" + finishNum + "个,切换下个任务");
                            this.stopByFinishNum=true;
                            this.finishDyLike=true;
                            return 0;
                        }

                    } else {
                        failNum++;
                        this.global.updateNum(false,false);
                        if (failNum >= config.stopByFailNum) { // 连续失败达到设置值，切下个任务
                            this.global.consolelog("点赞连续失败" + failNum + ",切下个任务");
                            this.finishDyLike=true;
                            return -1;
                        }
                        
                        // 返回首页
                        hzDyLow.gotoHome();
                        console.warn("任务失败");
                    }

                    if (config.bringOngoing) {
                        hzDyLow.doBringOngoing();
                    }

                } else {
                    waitNum++;
                    if (waitNum >= 360) { // 10次无任务，切下一任务
                        log("连续360次无点赞任务，切下个任务");
                        return 0;
                    }
                    
                    // 无任务间隔等待
                    this.global.consolewarn("暂无任务，休息5秒后继续");
                    sleep(5000);
                }

            } catch (e) {
                // 返回首页
                hzDyLow.gotoHome()
                this.global.error(e);
                log("休息6秒重试");
                sleep(6000);
            }

        }
    } catch (e) {
        log("dylowlike,终止");
        this.global.error(e);
        this.finish();
    }
    this.global.taskBegin=false;
}

hz94.runCommentTask =function(quickVersion)
{
    var task=this.getTaskWithNoBind(quickVersion?"js":"dy", 3,quickVersion?hzDyJs.shortID: hzDouyin.dyUid);
    if (task != null && task.taskID != undefined && task.taskID != "") 
    {
        hzDouyin.gotoDetail(task.douyin_url_id);
        sleep(5000);
        toast("随机评论养号中");
        var state=hzDouyin.commentWithText(task.message,false); 
        this.upTaskWithNoBind(quickVersion?"js":"dy",task.taskID,quickVersion?hzDyJs.shortID: hzDouyin.dyUid,task.douyin_url_id,quickVersion?hzDyJs.userName: hzDouyin.userName,task.msgId,state?0:1);
        back();
    }
    else
    {
        log("sleep 1");
    }
}
hz94.fakeParams =function(userid,config)
{
    hzDouyin.config=config;
    hzHuoshan.config=config;
    hzKuaiShou.config=config;
    hzDouyin.dyUid=userid;
    hzHuoshan.dyUid=userid;
    hzKuaiShou.ksUid=userid;
    hzDouyin.userName="郁桐12345678910123"; 
    hzHuoshan.userName="测试账号";
    hzKuaiShou.userName="测试账号";
}
// 跑抖音关注任务
hz94.runDyFocus = function (config) {

    try {

        // 抖音初始化
        this.initDy(config);

        // 无任务次数
        var waitNum = 0;
        // 总完成次数，用于重启脚本
        var finishNum = 0;
        // 失败次数
        var failNum = 0;
        var FocusTimes=0;
        var thisTypeOver = false
        var oldTask = null
        this.global.taskBegin=true;
        while (true) {
            try {
                if(thisTypeOver)
                    return -1
                if(!this.config.quickTask)
                    log("94 dy next~");
                if (currentPackage() != hzDouyin.getPackage()) 
                {
                    app.launchPackage(hzDouyin.getPackage());
                    sleep(10000);
                }

                if ( this.finishDyFocus) {
                    return 1;
                }

                // 领取任务,先获取关注，再获取点赞
                var task = {};
                var type = "dy";
                var hanType =  1;
                
                // 达到任务完成数判断
                if (finishNum >= config.stopByFinishFocusNum) {
                    this.global.consolelog("已完成任务" + finishNum + "个,切换下个任务");
                    this.stopByFinishNum=true;
                    this.finishDyFocus=true;
                    return 0;
                }
                log("获取D音关注任务中");             
                var task=this.getTaskWithNoBind(type,hanType,hzDouyin.dyUid);
                
                if (task != null && task.taskID != undefined && task.taskID != "") 
                {

                    waitNum = 0; // 清0重新计数
                    log("taskId:" + task.taskID);
                    if(!this.config.quickTask)
                        log("Get 关注任务");

                    var arr=task.message.split("--");
                    if(this.config.quickTask==3)
                        log(task.taskName);
                    var that = this
                    var that_dyuid = hzDouyin.dyUid

                    var successCallback = function()
                    {
                        if(!that.config.quickTask)
                            sleep(1000);    
                        
                        that.upTaskWithNoBind(type,oldTask.taskID, that_dyuid, oldTask.douyin_url_id,hzDouyin.userName,"","");
                        
                        if(!that.config.quickTask)
                        {
                             // 返回首页
                            that.backDyHome();
                            sleep(1000);
                        }
                        // 计数
                        failNum = 0;
                        finishNum++;
                        that.global.updateNum(true,true);
                    }
                    var failCallback = function()
                    {
                        failNum++;
                        that.global.updateNum(true,false);
                        if (failNum >= config.stopByFailNum) { // 连续失败达到设置值，切下个任务
                            that.global.consolelog("关注连续失败" + failNum + ",切下个任务");
                            that.finishDyFocus=true;
                           thisTypeOver = true
                        }
                        // 返回首页
                        if(!that.config.quickTask)
                            that.backDyHome();
                        console.warn("任务失败");
                    }
                    hzDouyin.doFocusByUserId(task.douyin_url_id,task.shortID,arr[0],successCallback,failCallback);
                    oldTask = task
                
                    FocusTimes++;
                    log("关注已做次数:"+FocusTimes);
                    if(FocusTimes%10==0)
                    {
                        this.runCommentTask(false);
                    }
                    if (config.bringOngoing) {
                        hzDouyin.doBringOngoing();
                    }

                } else {
                    waitNum++;
                    if (waitNum >= 360) { // 10次无任务，切下一任务
                        log("连续360次无关注任务，切下个任务");
                        return 0;
                    }

                    // 无任务间隔等待
                    this.global.consolewarn("暂无任务，休息5秒后继续");
                    sleep(5000);
                }

            } catch (e) {
                // 返回首页
                this.backDyHome();
                this.global.error(e);
                log("休息6秒重试");
                sleep(6000);
            }

        }
    } catch (e) {
        log("dyfocus,终止");
        this.global.error(e);
        this.finish();
    }
    this.global.taskBegin=false;
}
hz94.runDyLowFocus = function (config) {

    try {

        // 抖音初始化
        hzDyLow.init(config);
        if (config.bringBefore) {
            hzDyLow.doBringBefore();
        }
        // 无任务次数
        var waitNum = 0;
        // 总完成次数，用于重启脚本
        var finishNum = 0;
        // 失败次数
        var failNum = 0;
        var FocusTimes=0;
        this.global.taskBegin=true;
        while (true) {
            try {
                log("94 dy low  next~");
                if (currentPackage() != hzDyLow.getPackage()) {
                    app.launchPackage(hzDyLow.getPackage());
                    sleep(10000);
                }

                if ( this.finishDyFocus) {
                    return 1;
                }

                // 领取任务,先获取关注，再获取点赞
                var task = {};
                var type = "dy";
                var hanType =  1;
                log("获取D音关注任务中");
                var task=this.getTaskWithNoBind(type,hanType,hzDyLow.dyUid);
                if (task != null && task.taskID != undefined && task.taskID != "") 
                {

                    waitNum = 0; // 清0重新计数
                    log("taskId:" + task.taskID);
                    log("Get 关注任务");
                    var doRes = hzDyLow.doFocusByUserId(task.douyin_url_id,task.shortID);
                    if (doRes) {
                        if(!this.config.quickTask)
                            sleep(1000);

                      
                        this.upTaskWithNoBind(type,task.taskID, hzDyLow.dyUid,task.douyin_url_id,hzDyLow.userName,"","");
                        // 返回首页
                        hzDyLow.gotoHome();
                            sleep(1000);

                        // 计数
                        failNum = 0;
                        finishNum++;
                        this.global.updateNum(true,true);
                        // 达到任务完成数判断
                        if (finishNum >= config.stopByFinishFocusNum) {
                            this.global.consolelog("已完成任务" + finishNum + "个,切换下个任务");
                            this.stopByFinishNum=true;
                            this.finishDyFocus=true;
                            return 0;
                        }

                   

                    } else {
                        failNum++;
                        if (failNum >= config.stopByFailNum) { // 连续失败达到设置值，切下个任务
                            this.global.consolelog("关注连续失败" + failNum + ",切下个任务");
                            this.finishDyFocus=true;
                            return -1;
                        }
                        this.global.updateNum(true,false);
                        // 返回首页
                        hzDyLow.gotoHome();
                        console.warn("任务失败");
                    }
                    FocusTimes++;
                    log("关注已做次数:"+FocusTimes);
                    // if(FocusTimes%10==0)
                    // {
                    //     this.runCommentTask(false);
                    // }
                    if (config.bringOngoing) {
                        hzDyLow.doBringOngoing();
                    }

                } else {
                    waitNum++;
                    if (waitNum >= 360) { // 10次无任务，切下一任务
                        log("连续360次无关注任务，切下个任务");
                        return 0;
                    }

                    
                    // 无任务间隔等待
                    this.global.consolewarn("暂无任务，休息5秒后继续");
                    sleep(5000);
                }

            } catch (e) {
                // 返回首页
                hzDyLow.gotoHome();
                this.global.error(e);
                log("休息6秒重试");
                sleep(6000);
            }

        }
    } catch (e) {
        log("dylowfocus,终止");
        this.global.error(e);
        this.finish();
    }
    this.global.taskBegin=false;
}

// 跑抖音Q关注任务
hz94.runQDyFocus = function (config) {

    try {

        // 抖音初始化
        hzDyJs.init(config);
        // 任务前养号
        if (config.bringBefore) {
            hzDyJs.doBringBefore();
        }

        // 无任务次数
        var waitNum = 0;
        // 总完成次数，用于重启脚本
        var finishNum = 0;
        // 失败次数
        var failNum = 0;
        var FocusTimes=0;
        var thisTypeOver = false
        var oldTask = null
        this.global.taskBegin=true;
        while (true) {
            try {
                if(thisTypeOver)
                    return -1
                if(!this.config.quickTask)
                    log("94 dyQ next~");
               
                if (currentPackage() != hzDyJs.getPackage()) {
                    app.launchPackage(hzDyJs.getPackage());
                    sleep(10000);
                }
                // 达到任务完成数判断
                if (finishNum >= config.stopByFinishFocusNum) {
                    this.global.consolelog("已完成任务" + finishNum + "个,切换下个任务");
                    this.stopByFinishNum=true;
                    this.finishQDyFocus=true;
                    return 0;
                }
                // 领取任务,先获取关注，再获取点赞
                var task = {};
                var type =  hzDyJs.secUid? "js":"dy";
                var hanType =  1;
                log("获取D音极速关注任务中");
                var that_shortID =hzDyJs.secUid?hzDyJs.shortID:hzDyJs.dyUid;
                var task=this.getTaskWithNoBind(type,hanType,that_shortID);
                var that=this;
                if (task != null && task.taskID != undefined && task.taskID != "") 
                {

                    waitNum = 0; // 清0重新计数

                
                    log("taskId:" + task.taskID);
                    if(!this.config.quickTask)
                        log("Get 关注任务");

                    var arr=task.message.split("--");
                    if(this.config.quickTask==3)
                        log(task.taskName);
                    var that = this
                    var successCallback = function()
                    {
                        if(!that.config.quickTask)
                            sleep(1000);

                        that.upTaskWithNoBind(type,oldTask.taskID,that_shortID,oldTask.douyin_url_id,hzDyJs.userName?hzDyJs.userName:hzDyJs.shortID,"","");
                        
                        if(!that.config.quickTask)
                        {
                            // 返回首页
                            hzDyJs.gotoHome();
                            sleep(1000);
                        }

                        // 计数
                        failNum = 0;
                        finishNum++;
                        that.global.updateNum(true,true);
                    }
                    var failCallback = function()
                    {
                        failNum++;
                        that.global.updateNum(true,false);
                        if (failNum >= config.stopByFailNum) { // 连续失败达到设置值，切下个任务
                            that.global.consolelog("关注连续失败" + failNum + ",切下个任务");
                            that.finishQDyFocus=true;
                            thisTypeOver = true
                        }
                        
                        // 返回首页
                        if(!that.config.quickTask)
                            hzDyJs.gotoHome();
                        console.warn("任务失败");
                    }
                    var doRes = hzDyJs.doFocusByUserId(task.douyin_url_id,task.shortID,arr[0],successCallback,failCallback);
                    oldTask = task
                    
                    FocusTimes++;
                    log("关注已做次数:"+FocusTimes);
                    if(FocusTimes%10==0)
                    {
                        this.runCommentTask(true);
                    }
                    if (config.bringOngoing) {
                        hzDyJs.doBringOngoing();
                    }

                } else {
                    waitNum++;
                    if (waitNum >= 360) { // 10次无任务，切下一任务
                        log("连续360次无关注任务，切下个任务");
                        return 0;
                    }

                    // 无任务间隔等待
                    this.global.consolewarn("暂无任务，休息5秒后继续");
                    sleep(5000);
                }

            } catch (e) {
                // 返回首页
                hzDyJs.gotoHome();
                this.global.error(e);
                log("休息6秒重试");
                sleep(6000);
            }

        }
    } catch (e) {
        log("qdyfocus,终止");
        this.global.error(e);
        this.finish();
    }
    this.global.taskBegin=false;
}
// 跑抖音点赞任务
hz94.runQDyLike = function (config) {

    try {

        // 抖音初始化
        // 抖音初始化
        hzDyJs.init(config);
        // 任务前养号
        if (config.bringBefore) {
            hzDyJs.doBringBefore();
        }
        // 无任务次数
        var waitNum = 0;
        // 总完成次数，用于重启脚本
        var finishNum = 0;
        // 失败次数
        var failNum = 0;
        var zanTimes=0;
        this.global.taskBegin=true;
        while (true) {
            try {
                log("94 Qdy next~");
               
                if (currentPackage() != hzDyJs.getPackage()) {
                    app.launchPackage(hzDyJs.getPackage());
                    sleep(10000);
                }
                // 领取任务,先获取关注，再获取点赞
                var task = {};
                var type =  hzDyJs.secUid? "js":"dy";
                var hanType = 2;

                log("获取D音点赞任务中");
                var that_shortID =hzDyJs.secUid?hzDyJs.shortID:hzDyJs.dyUid;
                var task=this.getTaskWithNoBind(type,hanType,that_shortID);
                if (task != null && task.taskID != undefined && task.taskID != "") {
                    waitNum = 0; // 清0重新计数
                    log("taskId:" + task.taskID);
                    log("Get 点赞任务");

                    hzDyJs.gotoDetail(task.douyin_url_id);

                    // 点赞前看
                    log("看视频");

                    if(this.config.quickTask!=2)
                        sleep(random(4000, 6000));
                    

                    var doRes = hzDyJs.doLike(task.douyin_url_id);
                    if (doRes) {
                        if(!this.config.quickTask)
                            sleep(1000);

                        this.upTaskWithNoBind(type,task.taskID,that_shortID,task.douyin_url_id,hzDyJs.userName?hzDyJs.userName:hzDyJs.shortID,"","");
                        failNum = 0;
                        finishNum++;
                        this.global.updateNum(false,true);
                        // 达到任务完成数判断
                        if (finishNum >= config.stopByFinishLikeNum) {
                            this.global.consolelog("已完成任务" + finishNum + "个,切换下个任务");
                            this.stopByFinishNum=true;
                            this.finishQDyLike=true;
                            return 0;
                        }

                    } else {
                        failNum++;
                        this.global.updateNum(false,false);
                        if (failNum >= config.stopByFailNum) { // 连续失败达到设置值，切下个任务
                            this.global.consolelog("点赞连续失败" + failNum + ",切下个任务");
                            this.finishQDyLike=true;
                            return -1;
                        }
                        
                        // 返回首页
                        if(!this.config.quickTask)
                            hzDyJs.gotoHome();
                        console.warn("任务失败"); 
                    }
                    zanTimes++;
                    if(zanTimes%5==0)
                        log("点赞已做次数:"+zanTimes);
                    if(zanTimes%30==0)
                    {
                        this.runCommentTask(true);
                    }
                    if (config.bringOngoing) {
                        hzDyJs.doBringOngoing();
                    }

                } else {
                    waitNum++;
                    if (waitNum >= 360) { // 360次无任务，切下一任务
                        log("连续360次无点赞任务，切下个任务");
                        return 0;
                    }
                     
                    // 无任务间隔等待
                    this.global.consolewarn("暂无任务，休息5秒后继续");
                    sleep(5000);
                }

            } catch (e) {
                // 返回首页
                hzDyJs.gotoHome();
                this.global.error(e);
                log("休息6秒重试");
                sleep(6000);
            }

        }
    } catch (e) {
        log("qdylike,终止");
        this.global.error(e);
        this.finish();
    }
    this.global.taskBegin=false;
}
//做抖音低版本任务
hz94.doDyLowTask = function (config) 
{
    this.global.initData("斗士");
    if(config.androidVersion >=7)
    {
        if(!hzDyLow.dyUid||!hzDyLow.userName)
            hzDyLow.dyUid=hzDyLow.getMyUserid(0);
        if(hzDyLow.userName.indexOf("用户")!=-1||hzDyLow.userName.indexOf("User")!=-1)
        {
            this.global.error("因为当前昵称为系统默认昵称,请修改好你的昵称");
            sleep(8000);
            this.finish();
        }
        else
        {
            if(hzDyLow.dyUid)
            {
                if (config.doDyFocus && !this.finishDyFocus) {
                    log("D音关注开始");
                    taskRet = hz94.runDyLowFocus(config);
                    log("等待3秒后切任务");
                    sleep(3000);
                } 
        
                // 电音点赞
                if (config.doDyLike && !this.finishDyLike) {
                    log("D音点赞开始");
                    taskRet = hz94.runDyLowLike(config);
                    log("等待3秒后切任务");
                    sleep(3000);
                } 
                this.global.taskBegin=false;
            }
            else
            {
                log("获取D音ID失败,跳过D音任务");
                sleep(5000);
            }
        }
    }
    else
    {
        this.global.error("android 7.0以下不支持5.8.0D音版本做任务")
    }
}
hz94.doDyTask = function (config) 
{
    if(!hzDouyin.dyUid||!hzDouyin.userName)
        hzDouyin.dyUid=hzDouyin.getMyUserid(0);//获取抖音号
    if(hzDouyin.shortID&&hzDouyin.doShortIDs.indexOf(hzDouyin.shortID)!=-1)//判断当前抖音号是否已做过任务
    {
        console.warn("当前号已经做过,跳过");
        return 0;
    }
    if(!hzDouyin.dyUid)
    {
        log("抖音用户ID获取失败,跳过此号任务");
        sleep(5000);
        return 0;
    }
    if(hzDouyin.userName.indexOf("用户")!=-1||hzDouyin.userName.indexOf("User")!=-1)
    {
        this.global.error("因为当前昵称为系统默认昵称,请修改好你的昵称");
        sleep(8000);
        this.finish();
        return 0;
    }
    config.DyAutoChange&&hzDouyin.shortID&&(hzDouyin.doShortIDs instanceof Array)&&hzDouyin.doShortIDs.push(hzDouyin.shortID);//标记当前号已做任务
    // log("调试模式,任务不做");
    // sleep(5000);
    // return 0;
    this.global.initData("斗士");
    try {
        hzDouyin.getUserInfo(); //获取票数
    } catch (e) {
        
    }
    var taskRet=0;
    if (config.doDyFocus && !this.finishDyFocus) {
        log("D音关注开始");
        taskRet = hz94.runDyFocus(config);
        log("等待3秒后切任务");
        sleep(3000);
    }
    // 电音点赞
    if (config.doDyLike && !this.finishDyLike) {
        log("D音点赞开始");
        taskRet = hz94.runDyLike(config);
        log("等待3秒后切任务");
        sleep(3000);
    }
    this.global.taskBegin=false;
    return taskRet;
}
hz94.doHsTask = function (config) 
{
    hzHuoshan.useAPI=false;
    !hzHuoshan.shortID&&hzHuoshan.getMyShortID();//获取抖音号
    if(hzHuoshan.shortID&&hzHuoshan.doShortIDs.indexOf(hzHuoshan.shortID)!=-1)//判断当前抖音号是否已做过任务
    {
        console.warn("当前号已经做过,跳过");
        return 0;
    }
    hzHuoshan.dyUid=hzHuoshan.getMyUserid(0);
    if(!hzHuoshan.userName)
        hzHuoshan.userName=hzHuoshan.getMyNickName(0);
    if(!hzHuoshan.dyUid)
    {
        log("H山用户ID获取失败,跳过此号任务");
        sleep(5000);
        return 0;
    }
    if(hzHuoshan.userName.indexOf("用户")!=-1||hzHuoshan.userName.indexOf("User")!=-1)
    {
        this.global.error("因为当前昵称为系统默认昵称,请修改好你的昵称");
        sleep(8000);
        this.finish();
        return 0;
    }
    var userinfo=this.config['hs:'+hzHuoshan.shortID];
    var hasSave=userinfo&& userinfo.split("|").length>2;//是否已经保存过
    if(hzHuoshan.shortID&&!hasSave&&hzHuoshan.dyUid&&hzHuoshan.userName&&hzHuoshan.secUid)
    {
        this.config['hs:'+hzHuoshan.shortID]=hzHuoshan.dyUid+"|"+hzHuoshan.userName+"|"+hzHuoshan.secUid;
        var sto = storages.create("hzConfigData");
        sto.put("config", this.config);
    }
    this.global.initData("伙士");
    config.HsAutoChange&&hzHuoshan.shortID&&(hzHuoshan.doShortIDs instanceof Array)&&hzHuoshan.doShortIDs.push(hzHuoshan.shortID);//标记当前号已做任务 
    if(hzHuoshan.secUid)
    {
        hzHuoshan.useAPI=hzHuoshan.checkSecuid();//测试secuid是否可用
        log("api "+(hzHuoshan.useAPI?"1":"0"));//标记是否可用API
    }
    // log("调试模式,任务不做");
    // sleep(5000);
    // return 0;
    var taskRet=0;
    // 火山关注
    if (config.doHsFocus && !this.finishHsFocus) {
        log("H山关注开始");
 
        taskRet = hz94.runHsFocus(config);
        log("等待3秒后切任务"); 
        sleep(3000);
    }  
    var candohslike = true
    if(hzHuoshan.appVersion == "3.2.0")
    {
        candohslike = false
        log("3.2.0版本 无法做H山点赞任务")
    }
    // 火山点赞
    if (config.doHsLike && !this.finishHsLike && candohslike) {
        log("H山点赞开始");
        taskRet = hz94.runHsLike(config);
        log("等待3秒后切任务");
        sleep(3000);
    }  
    this.global.taskBegin=false;
    return taskRet;
}
//arr2是要删除的
hz94.removeArry=function(arr1,arr2)
{
    for(var i=0;i<arr2.length;i++)
    {
        for(var j=0;j<arr1.length;j++)
        {
            if(arr1[j]==arr2[i]){
                arr1.splice(j,1);
                j--;
            }
        }
    }
    return arr1;
}
//是否只有一种任务类型
hz94.onlyOneTypeTask=function ()
{
     
    var types=["doDyFocus","doDyLike","doQDyFocus","doQDyLike","doHsFocus","doHsLike","doKsFocus","doKsLike","doNewsFocus"];  
    var taskNum=0;
    for(var i=0;i<types.length;i++)
    {
        var tasktype=types[i];
        if(this.config[tasktype])
        {
            taskNum++;
        }
    }
    return taskNum<=1;
}
//所有任务类型都做完了
hz94.isFinishAllTypeTask=function()
{
    if(this.config.doDyFocus&&this.finishDyFocus==false)
        return false;
    if(this.config.doDyLike&&this.finishDyLike==false)
        return false;
    if(this.config.doQDyFocus&&this.finishQDyFocus==false)
        return false;
    if(this.config.doQDyLike&&this.finishQDyLike==false)
        return false;
    if(this.config.doHsFocus&&this.finishHsFocus==false)
        return false;
    if(this.config.doHsLike&&this.finishHsLike==false)
        return false;
    if(this.config.doKsFocus&&this.finishKsFocus==false)
        return false;
    if(this.config.doKsLike&&this.finishKsLike==false)
        return false;
    if(this.config.doNewsFocus&&this.finishNewsFocus==false)
        return false;
    return true;
}
hz94.run = function (config) {
    this.init(config);
    while (true) {

        // 抖音关注
        var taskRet = 0
        if (config.doDyFocus||config.doDyLike)
        {
            hzDouyin.quickVersion=false;
            hzDouyin.init(config);
            var isLowVersion = false
            if(hzServer.needUpdate(hzDouyin.appVersion,"7.0.1"))
                isLowVersion = true
            if(isLowVersion)
            {
                this.doDyLowTask(config);
            }
            else
            {
                if(config.DyAutoChange)
                {
                    log("获取斗士账号列表,判断是否有多个账号");
                    var names=hzDouyin.getAccountList();
                    log(names);
                    if(names.length>1)
                    {
                        var doNames=new Array();//做过任务的用户名
                        hzDouyin.doShortIDs=new Array();
                        taskRet=this.doDyTask(config); 
                        doNames.push(hzDouyin.userName);
                        while(true)
                        {
                            log("更新账号列表");
                            var names=hzDouyin.getAccountList();
                            log(names);
                            var remainderNames=this.removeArry(names,doNames);
                            log("未切换账号列表"); 
                            log(remainderNames);
                            if(remainderNames.length>0)
                            {
                                var user=remainderNames[0]; 
                                doNames.push(user);
                                var state=hzDouyin.changeAccount(user);  
                                if(!state)
                                    continue;
                                hzDouyin.gotoHome();
                                this.finishDyFocus=false; 
                                this.finishDyLike=false; 
                                hzDouyin.likeSleepTimes=0;
                                hzDouyin.focusSleepTimes=0;
                                sleep(10000);
                                taskRet=this.doDyTask(config); 
                            }
                            else
                            {
                                console.warn("账号已切换完毕");
                                sleep(5000);
                                break;
                            }
                        }
                    }
                    else
                    {
                        names.length==1?log("只有一个账号不用切换"):log("获取斗士账号列表失败");
                        sleep(5000);
                        taskRet=this.doDyTask(config); 
                    }
                }
                else
                    taskRet=this.doDyTask(config); 
            }
        }
        if (config.doQDyFocus||config.doQDyLike)
        {
            hzDyJs.init(config);
            hzDyJs.quickVersion=true;
            hzDyJs.shortID="";
            hzDyJs.secUid="";
            hzDyJs.dyUid="";
            this.global.initData("极速");
            var shortID=hzDyJs.getMyUserid(0);
            if(shortID)
            {
                var secuid=this.config[shortID];
                if(secuid)
                {
                    hzDyJs.secUid=secuid;
                    var userinfo="";
                    try {
                        userinfo=hzDyJs.getUserInfo();//校验secuid是否有效,并更新Uid,nickname
                    } catch (e) {
                        
                    }
                    if(!userinfo)//secuid无效,重新获取secuid
                    {
                        secuid="";
                        hzDyJs.secUid="";
                    }
                }
                if(!secuid)
                {
                    var userinfo=this.getDyInfo(shortID);
                    //log(userinfo);
                    if(userinfo)
                    {
                        hzDyJs.userName=userinfo.nickname;
                        hzDyJs.secUid=userinfo.sec_uid;
                        secuid=userinfo.sec_uid;
                    }
                }
                if(!secuid)
                {
                    var userid=hzDyJs.getUserIdFromSettingUI();
                    if(!userid)
                    {
                        this.global.error("获取用户信息失败,跳过D音极速版任务");
                        sleep(5000);
                    }
                    else
                        hzDyJs.updateNumByUI();
                }
                if(secuid||hzDyJs.dyUid)
                {
                    if (config.doQDyFocus &&!this.finishQDyFocus) {
                        log("D音极速版关注开始");
                        taskRet = hz94.runQDyFocus(config);
                        log("等待3秒后切任务");
                        sleep(3000);
                    } 
                    // 电音点赞
                    if (config.doQDyLike&&!this.finishQDyLike) {
                        log("D音极速版点赞开始");
                        taskRet = hz94.runQDyLike(config);
                        log("等待3秒后切任务");
                        sleep(3000);
                    }
                    this.global.taskBegin=false;
                }
            }
            else
            {
                log("获取D音极速版ID失败,跳过D音极速版任务");
                sleep(5000);
            }
        }
        if(config.doHsFocus||config.doHsLike)
        {
            hzHuoshan.init(config);
            if(config.HsAutoChange  && hzHuoshan.appVersion != "3.2.0")
            {
                log("获取H山账号列表,判断是否有多个账号");
                var names=hzHuoshan.getAccountList();
                log(names);
                if(names.length>1)
                {
                    var doNames=new Array();//做过任务的用户名
                    hzHuoshan.doShortIDs=new Array();
                    var curName=hzHuoshan.getCurrentAccount();
                    curName&&doNames.push(curName);
                    taskRet=this.doHsTask(config); 
                    while(true)
                    {
                        log("获取H山账号列表,更新列表");
                        var names=hzHuoshan.getAccountList();
                        log(names);
                        var remainderNames=this.removeArry(names,doNames);
                        log("未切换账号列表"); 
                        log(remainderNames);
                        if(remainderNames.length>0)
                        {
                            var user=remainderNames[0]; 
                            doNames.push(user);
                            var state=hzHuoshan.changeAccount(user);  
                            if(!state)
                                continue;
                            hzHuoshan.popToRootViewController(0);
                            this.finishHsFocus=false; 
                            this.finishHsLike=false; 
                            sleep(10000);
                            taskRet=this.doHsTask(config); 
                        }
                        else
                        {
                            console.warn("账号已切换完毕");
                            sleep(5000);
                            break;
                        }
                    }
                }
                else
                {
                    names.length==1?log("只有一个账号不用切换"):log("获取H山账号列表失败");
                    sleep(5000);
                    taskRet=this.doHsTask(config); 
                }
            }
            else
            {
                taskRet=this.doHsTask(config); 
            }
        }
        if(config.doKsFocus||config.doKsLike)
        {
            hzKuaiShou.init(config);
            this.global.initData("筷子");
            if(!hzKuaiShou.userName||!hzKuaiShou.ksUid)
                hzKuaiShou.ksUid=hzKuaiShou.getMyUserid(0);
            if(hzKuaiShou.ksUid==-1)
            {
                console.warn("因为资料不完善,快手任务终止");
                sleep(2000);
                this.finishKsFocus=true;
                this.finishKsLike=true;
            }
            else if(hzKuaiShou.ksUid)
            {
                // 快手关注
                if (config.doKsFocus && !this.finishKsFocus) 
                {
                    log("筷子关注开始");
                    taskRet = hz94.runKsFocus(config); 
                    log("等待3秒后切任务");
                    sleep(3000);
                    
                } 
                // 快手点赞
                if (config.doKsLike && !this.finishKsLike) {
                    log("筷子点赞开始");
                    taskRet = hz94.runKsLike(config);
                    log("等待3秒后切任务");
                    sleep(3000);
                }
                this.global.taskBegin=false;
            }
            else
            {
                log("获取K手ID失败,跳过K手任务");
                sleep(5000);
            }
        }

        // if(config.doNewsFocus)
        // {
        //     this.global.initData("头条");
        //         // news 关注
        //     if (!this.finishNewsFocus) 
        //     {
        //         log("news 任务开始");
        //         choosedNum++;
        //         taskRet = hzNews.runWithConfig(config,this); 
        //         log("等待3秒后切任务");
        //         sleep(3000);
        //     } 
        //     else 
        //     {
        //         doNewsFocus = 0;
        //     }
        //     this.global.taskBegin=false;
        // }
        var that=this;
        var posCallback = function()
        {
            log("end end");
            that.finish();
        }
        var finishTips="";
        if(this.onlyOneTypeTask())
        {
            if(this.stopByFinishNum)
                finishTips="已经成功完成配置数量的任务，停止运行";
            else
                finishTips="当前选中任务连续失败个数达到当前设置值，停止运行";
        }
        else if(this.isFinishAllTypeTask())
            finishTips="已完成所有任务";

        if(finishTips)
        {
            this.global.consolelog(finishTips);
            this.global.alert(finishTips,posCallback);
            sleep(10000000)
        }
    }
}

module.exports = hz94;