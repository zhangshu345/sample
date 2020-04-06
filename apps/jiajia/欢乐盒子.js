/*---------------------------------lib-------------------------------*/
function instantiation(varrurl) {
    yun = 1
    var yunurl = "http://yuedu.xiequbo.cn/"
    yunurl = yunurl + varrurl + ".js"
    if (yun == 1) {
        var r = http.get(yunurl);
        // log("code = " + r.statusCode);
        if (r.statusCode == 200) {
            return r.body.string()

        } else {
            return ""
        }
    }
    if (yun == 0) {
        var c = files.cwd()
        var filepath = files.join(c, varrurl) + ".js"
        var r = files.read(filepath)
        return r
    }
}

subapp = instantiation("apps/fucation_lib1")
if (subapp != "") {
    eval(subapp)
    log("公共函数实例化成功")
}
else {
    log("公共函数实例化失败,程序返回")
}

var  button_arr = [
	

]
var app_name = "欢乐盒子"
var w = device.width;
var h = device.height;
function 弹窗检测() {
    // log("检测弹窗....")
    sleep(200)
    if (id("img_close").exists()) {
        // id("img_close").findOne().click()
        log("检测到弹窗x")
        sleep(3000)
        var c = id("img_close").findOne(1000).click()
        if (c && c.clickable) {
            c.click()
            return
        }
        back()
        return
    }
    if (id("dialog_close").exists()) {
        sleep(3000)
        var c = id("dialog_close").findOne(1000).click()
        if (c && c.clickable) {
            c.click()
            return
        }
        back()
        return
    }
    if (id("tv_rewardButton").exists()) {
        // id("img_close").findOne().click()
        log("检测到弹窗看视频")
        sleep(3000)
        back()
        return
    }
    //漂移红包弹窗
    if (id("tv_btn").exists()) {
        // id("img_close").findOne().click()
        log("检测到看视频弹窗")
        sleep(1000)
        back()
        sleep(500)
    }
    //关闭广告视频
    if (id("tt_video_ad_close").exists()) {
        // id("img_close").findOne().click()
        log("检测到广告弹窗提示")
        sleep(1000)
        // id("btn_continue_watch").findOne().click()
        // back()
        var d = id("tt_video_ad_close").findOne(5000);
        if (!d) {
            console.log("找不到视频广告关闭按钮");
            return
        }
        var b = d.bounds()
        click(b.centerX(), b.centerY())
        return
    }
    var current_Activity = currentActivity()
    if(current_Activity =="com.qq.e.ads.PortraitADActivity"){
        sleep(35000)
        back()
        sleep(1000)
    }
    if (id("lay_main").exists()) {
        // id("img_close").findOne().click()
        log("检测到弹窗层")
        sleep(3000)
        back()
        return
    }
    if (id("btn_close").exists()) {
        // id("img_close").findOne().click()
        log("检测到账号弹窗提示")
        sleep(3000)
        back()
        return
    }
    if (id("btn_continue_watch").exists()) {
        // id("img_close").findOne().click()
        log("检测到继续播放弹窗提示")
        sleep(3000)
        id("btn_continue_watch").findOne().click()
        return
    }
    if (text("始终允许").exists()) {
        text("始终允许").findOne().click()
        log("检测到始终允许")
        return
    }
    if (id("other_red_pack").exists()) {
        // id("img_close").findOne().click()
        log("检测到继续播放弹窗提示")
        sleep(3000)
        back()
        return
    }

    // log("未检测弹窗....")
    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()) {
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }
    }
}

// function 推荐列表() {
//     log("进入推荐列表")
//     弹窗检测()
//     swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
//     sleep(3000)

//     log("开始检测")
//     var uc = id("from_text").find();
//     for (var i = 0; i < uc.length; i++) {
//         var c = uc[i].parent()
//         var b = c.bounds()
//         if ((b.right - b.left) == w && b.bottom > 0) {
//             if (id("logo").boundsInside(b.left, b.top, b.right, b.bottom).exists()) {
//                 continue
//             }
//             if (id("time").boundsInside(b.left, b.top, b.right, b.bottom).exists()) {
//                 continue
//             }
//             弹窗检测()
//             if (b.centerY > 0.8 * h) {
//                 break
//             }
//             click(b.centerX(), b.centerY())
//             // sleep(30000)
//             // back()
//             头条详情()
//             break
//         }
//     }
// }

function 头条详情(){
    var w = device.width;
    var h = device.height;
    var i = 0
    while (true) {
        弹窗检测()
        if (i > 28) {
            back()
            break
        }
        if (id("report_icon").boundsInside(0, device.height / 2, device.width + 15, device.height).exists()) {
            // log(id("report_icon").findOne().bounds())
            弹窗检测()
            swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
            sleep(3000)
            i = i + 3
            弹窗检测()
            if (id("report_icon").findOne().bounds().top > h) {
                continue
            }
            back()
            break
        }
        sleep(5000)
        i = i + 5
        弹窗检测()
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
    }
    log("结束详情")
}


// function 头条详情() {
//     var i = 0
//     while (true) {
//         log(i)
//         弹窗检测()
//         //防止推荐列表到底刷新不出来卡主。
//         if (i > 45) {
//             toast("超过观看时间，返回文章列表")
//             back()
//             break
//         }
//         if (id("report_icon").boundsInside(0, device.height / 2, device.width + 15, device.height).exists()) {
//             // log(id("report_icon").findOne().bounds())
//             弹窗检测()
//             swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
//             sleep(3000)
//             i = i + 3
//             弹窗检测()
//             if (id("report_icon").findOne().bounds().top > h) {
//                 continue
//             }
//             // back()
//             推荐列表()
//             back()
//             break
//         }
//         sleep(5000)
//         i = i + 5
//         弹窗检测()
//         swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
//     }
//     log("结束详情")
// }

function 文章() {
    弹窗检测()
    var zx = text("头条资讯").findOne().parent()
    zx.click()
    sleep(3000)
    while (true) {
        log("开始检测")
        弹窗检测()
        var uc = id("img_del").find();
        for (var i = 0; i < uc.length; i++) {
            var c = uc[i].parent()
            var b = c.bounds()
            if ((b.right - b.left) == w) {
                if (id("logo").boundsInside(b.left, b.top, b.right, b.bottom).exists()) {
                    continue
                }
                弹窗检测()
                click(b.centerX(), b.centerY())
                // sleep(30000)
                // back()
                log("阅读文章详情")
                头条详情()
                break
            }
        }
        sleep(1000)
        弹窗检测()
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.5 + random(10, 30), random(220, 235))
        sleep(3000)
    }
}

function 视频() {
    var zx = text("小视频").findOne().parent()
    zx.click()
    sleep(1500)
    while (true) {
        log("开始检测")
        弹窗检测()
        sleep(45000)
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.5 + random(10, 30), random(220, 235))
    }
}

function 签到() {
    //进入签到页面，无法分析布局，找不到控件id，同时查找任务二字的坐标会出现异常，采用查找逛逛金币来获取位置

	sign_reullt =  read_cfg_j(app_name,"have_sign")
	if(sign_reullt=="yes"){
		toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }

    if (textContains("逛逛领币").exists()) {
        var c = textContains("逛逛领币").findOne(1000)
        var b = c.bounds()
        sleep(2000)
        click(b.centerX() + 0.2 * w, b.centerY())
    }
    else {
        return
    }
    if (textContains("立即签到").exists()) {
        log("立即签到找到了")
        var c = textContains("立即签到").findOne(1000)
        var b = c.bounds()
        sleep(1000)
        if (b.centerX() < 0 || b.centerY() < 0 || b.centerX() > w || b.centerY() > h) {
            return
        }
        click(b.centerX(), b.centerY())
        sleep(5000)
        弹窗检测()
        write_cfg_j(app_name,"have_sign","yes")
    }
}
function appinit() {
    // waitForActivity("c.l.a.views.AppBoxHomeActivity")
    // sleep(1000)
    // back()
    // sleep(1000)
    // 弹窗检测()
    var current_Activity = currentActivity()
    var i = 0
    for(i;i<15;i++)
    {
        if(current_Activity =="c.l.a.views.AppBoxHomeActivity")
        {
            log("进入到首页")
            sleep(500)
            弹窗检测()
            sleep(500)
            back()
            break
        }
        else
        {
            sleep(2000)
        }
    }
}
//----------------------------------闪电盒子子线程--------------------------------------------//
// exports.启动线程 = function (type,sign) {
function 启动线程(type, sign) {
    var istype = type || 1;
    var issign = sign || 0;
    // appinit()

    button = "text"
    vlause = "我知道了"

    index_page = "c.l.a.views.AppBoxHomeActivity"
    inspect_app(app_name, index_page, button, vlause)
    弹窗检测()
    result = is_login()
    if(!result){
        toast("登录")
        log("登录")
        login()
    }

    签到()
    // if (issign == 1) {
    //     签到()
    // }
    sleep(500)
    if (istype == 1) {
        appinit()
        文章()
    }
    if (istype == 2) {
        视频()
    }
}


function invite(user_id) {
    user_id = user_id || "3758809222";
    button = "text"
    vlause = "我知道了"
    app_name = "欢乐盒子"
    index_page = "c.l.a.views.AppBoxHomeActivity"
    inspect_app(app_name, index_page, button, vlause)

    // 取消推送
    button = "id"
    vlause = "dialog_close"
    result = control_click(button, vlause)
    // 完成三次有效阅读
    result = id("tv_rewardTop").findOne(3000)
    if (result) {
        sleep(3000)
        button = "id"
        vlause = "img_close"
        result = control_click(button, vlause)
    }

    // 进入个人中心
    button = "id"
    vlause = "user_icon"
    result = control_click(button, vlause)
    // 判断是否登录成功 
    result = text("登录/注册").findOne(3000)
    if (result) {
        console.log("未登录");
        toast("未登录")
        return
    }

    button = "text"
    vlause = "输入红包口令"
    result = control_click(button, vlause)

    // 输入邀请
    button = 'id'
    vlause = 'invitation_code'
    control_input(button, vlause, user_id)

    // 拆红包
    button = "id"
    vlause = "action"
    result = control_click(button, vlause)

    result = text("恭喜您收到来自好友的").findOne(3000)
    if (result) {
        console.log("邀请成功")
        toast("邀请成功")

    }

}
function is_login(){

    login_result = read_cfg_j(app_name,"have_login")
    if(login_result=="yes"){
    	toast("读取--已登录")
        log("读取--已登录")
        return true
    }

    button = "id"
    vlause = "user_icon"
    result = control_click(button, vlause)
    result2 = textContains("登录").findOne(1500)
    if(result2 ){
        弹窗检测()
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)
        return false
    }else{
        弹窗检测()
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)
        return true
    }
}


function login() {
    // button = "text"
    // vlause = "我知道了"
    // app_name = "欢乐盒子"
    // index_page = "c.l.a.views.AppBoxHomeActivity"
    // inspect_app(app_name, index_page, button, vlause)
    // // 双重检查
    // while (true) {
    //     is_first = text("始终允许").findOne(3000)
    //     if (is_first) {
    //         toast("允许授权")
    //         console.log("允许授权");
    //         is_first.click()
    //     } else {
    //         break
    //     }
    // }
    // 取消推送
    button = "id"
    vlause = "dialog_close"
    result = control_click(button, vlause)
    // 登录已有账号
    result = text("登录已有账号").findOne(3000)
    if (result) {
        button = "text"
        vlause = "登录已有账号"
        result = control_click(button, vlause)
    } else {
        // 进入个人中心
        button = "id"
        vlause = "user_icon"
        result = control_click(button, vlause)
        // 判断是否登录成功 
        result = text("登录/注册").findOne(3000)

        if (!result) {
            console.log("已登录");
            toast("已登录")
            return
        }
        //登录
        button = "text"
        vlause = "登录/注册"
        result = control_click(button, vlause)

    }




    // 微信一键登录
    button = "text"
    vlause = "微信一键登录"
    result = control_click(button, vlause)
    // 微信授权 
    wechat_agree()
    num = 0
    while (true) {
        num +=1
        if(num>5){
            toast("返回异常")
            console.log("返回异常");  
            break
        }
        is_first = id("back").findOne(3000)
        if (is_first) {
            toast("返回")
            console.log("返回");
            is_first.click()
        } else {
            break
        }
    }
    弹窗检测()
    button = "text"
    vlause = "首页"
    result = control_click(button, vlause)
    write_cfg_j(app_name,"have_login","yes")

}
// login()
// invite()
// 启动线程(1,1)
