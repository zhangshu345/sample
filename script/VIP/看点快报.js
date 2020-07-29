/*---------------------------------lib-------------------------------*/
left = 0;
top = 0;
right = device.width;
buttom = device.height;
w = device.width;
h = device.height;

function instantiation(varrurl) {
    yun = 1
    var  yunurl = "https://gitee.com/zhangshu345012/sample/raw/v2/apps/jiajia/fucation_lib1.js"
   
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

subapp = instantiation()
if (subapp != "") {
    eval(subapp)
    log("公共函数实例化成功")
} else {
    log("公共函数实例化失败,程序返回")
}
app_name = "看点快报"
var button_arr = [
    // ['id', 'overlay_update_close', 1], //安装更新 
    // ['id', 'layout_f_overlay_close', 1], //注册5000金币 
    ['id', 'permission_guide_close', 1], // 跳过推送
    ['text', '始终允许', 1],
    ['id', 'title_left_icon', 1], //返回按钮
]

function 初始化() {
    while (true) {
        is_first = id("btn_back").findOne(3000)
        if (is_first) {
            button = "id"
            vlause = "btn_back"
            result = control_click(button, vlause)
        } else {
            break
        }
    }
    close_windows(button_arr)
    button = "text"
    vlause = "看点"
    result = control_click(button, vlause)
    button = "text"
    vlause = "推荐"
    result = control_click(button, vlause)
    log("初始化完成")
    toast("初始化完成")
}

/*---------------------------------login-------------------------------*/
function login() {
    button = "text"
    vlause = "未登录"
    result = control_click(button, vlause)
    close_windows(button_arr)
    button = "text"
    vlause = "微信"
    result = control_click(button, vlause)
    wechat_agree()

}
/*---------------------------------login-------------------------------*/
/*--------------------------------sign------------------------------*/
// sign_work()
function sign_work() {
    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)
    close_windows(button_arr)
    haha = text("已签到").findOne(2000)
    if (haha) {
        初始化()
        return
    }


    ////进入福利中心
    num1 = 0
    while (true) {
        num1 = 0
        // close_windows(button_arr)
        if (num1 > 5) {
            log("签到进入福利红包异常")
            toast("签到进入福利红包异常")
            初始化()
            return
        }
        button = "text"
        vlause = "福利红包"
        result = control_click(button, vlause)
        result = text("金币商城").findOne("3000")
        if (result) {
            break
        }
        result = text("立即签到").findOne("3000")
        if (result) {
            break
        }

    }






    sleep(5000)
    button = "text"
    vlause = "立即签到"
    result = control_click(button, vlause, 0, 0, device.width, device.height * 0.7)
    if (result) {

        button = "text"
        vlause = ""
        result = control_click(button, vlause)

        button = "text"
        vlause = "我知道了"
        result = control_click(button, vlause)
    }

}
/*--------------------------------sign------------------------------*/

/*--------------------------------invite------------------------------*/
function invite(user_id) {
    user_id = user_id || "58XyTLw";
    // button = "text"
    // vlause = "同意并继续"
    // app_name = "刷视频"
    // index_page = "com.android.packageinstaller.permission.ui.GrantPermissionsActivity"
    // index_page2 = "com.boda.cvideo.controller.MainActivity"
    // inspect_app(app_name, index_page, button, vlause,index_page2)
    button = "text"
    vlause = "任务"
    result = control_click(button, vlause)
    close_windows(button_arr)
    button = "text"
    vlause = "去填写"
    result = control_click(button, vlause)
    if (!result) {
        toast("邀请失败")
        log("邀请失败")
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)
        button = "text"
        vlause = "推荐"
        result = control_click(button, vlause)
        log("初始化完成")
        toast("初始化完成")
        return
    }
    // 输入邀请
    button = 'textContains'
    vlause = '输入'
    control_input(button, vlause, user_id)

    button = "text"
    vlause = "立即提交"
    result = control_click(button, vlause)




}
/*--------------------------------invite------------------------------*/
/*--------------------------------video------------------------------*/


// watch_video()
function watch_video() {
    toast("子任务--->看视频")
    log("子任务--->看视频")
    ////进入福利中心
    num1 = 0
    while (true) {
        num1 = 0
        // close_windows(button_arr)
        if (num1 > 5) {
            log("进入福利红包异常")
            toast("进入福利红包异常")
            初始化()
            return
        }
        button = "text"
        vlause = "我的"
        result = control_click(button, vlause)
        close_windows(button_arr)
        button = "text"
        vlause = "福利红包"
        result = control_click(button, vlause)
        result = text("金币商城").findOne("5000")
        if (result) {
            break
        }
    }
    toast("已经进入个人中心")
    log("已经进入个人中心")
    //  防未签到
    sleep(2000)
    button = "text"
    vlause = "立即签到"
    result = control_click(button, vlause, 0, 0, device.width, device.height * 0.7)
    if (result) {
        button = "text"
        vlause = ""
        result = control_click(button, vlause)

        button = "text"
        vlause = "我知道了"
        result = control_click(button, vlause)
    }


    ///获取观看视频次数
    num1 = 0
    var numArr = null
    while (true) {
        num1 += 1
        if (num1 > 5) {
            log("查找视频次数失败")
            toast("查找视频次数失败")
            初始化()
            return

        }

        var video_title = textStartsWith("观看视频").boundsInside(0, 0, device.width, device.height * 0.8).findOne(2000);
        if (video_title) {
            video_title1 = video_title.parent().parent()
            var r = video_title1.bounds()
            var video_title = textEndsWith("/10").boundsInside(r.left, r.top, r.right, r.bottom).findOne(4000)

            if (video_title) {
                var reult_str = video_title.text()
                log("reult_str+++" + reult_str)
                if (reult_str) {
                    var numArr = reult_str.match(/\d+/g)
                    log("numArr---->" + numArr)
                    break
                }
            }
        }
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
    }

    if (!numArr) {
        log("查找视频次数失败2")
        toast("查找视频次数失败2")
        初始化()
        return
    }
    初始化()
    log(numArr)
    look_num = numArr[1] - numArr[0]
    log(look_num)
    look_num += 5
    toast("获取观看次数" + look_num)
    log("获取观看次数" + look_num)

    if (look_num <= 0) {
        初始化()
        return
    }
    初始化()
    sleep(1000)
    num = 0
    while(true){
        num += 1 
        if(num >10){
            toast("观看视频程序异常!!!")
            log("观看视频程序异常!!!")
            return
        }
        button = "text"
        vlause = "视频"
        result = control_click(button, vlause)
        button_info = id("video_play").boundsInside(0, 0 , device.width, device.height / 2).findOne(3000)
        if (button_info){
            var xy_info = button_info.bounds()
            if (  0 < xy_info.centerX() && xy_info.centerX() < device.width 
            &&0 < xy_info.centerY() && xy_info.centerY() < device.height){
                toast("成功进入视频界面")
                log("成功进入视频界面")
                break
            }
        }

    
    }






    sleep(2100)    
    look_num = 10
    have_num = 0
    while (true) {
        if (have_num > look_num) {
            toast("观看任务结束")
            log("观看任务结束")
            break
        }


        result = id("video_play").boundsInside(0,  device.height*0.2 , device.width, device.height*0.6).findOne(3000)
        if (!result) {
            swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
        } else {
            sleep(500)
            first_video = result.parent().parent()
            r = first_video.bounds()
            log(r.centerX(), '----', r.centerY())
            if (text("广告").boundsInside(r.left, r.top, r.right, r.bottom).exists()) {
                swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
                toast("广告视频跳过")
                log("广告视频跳过")
                sleep(2000)
                continue
            }

            button = "id"
            vlause = "video_play"
            result = control_click(button, vlause, 0, h * 0.5, w, h)

            have_num += 1
            log("成功开始观看" + have_num)
            toast("成功开始观看" + have_num)
            sleep(5000)
            while (true) {
                is_first = id("title_left_icon").findOne(3000)
                if (is_first) {
                    toast("误触广告退出")
                    console.log("误触广告退出");
                    is_first.click()
                } else {
                    break
                }
            }

            swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
            sleep(2000)

        }
    }
    初始化()
}





function read(x, y) {
    num = 0 
    while(true) {
        if (num > 5 ){
            toast("进入文章失败")
            log("进入文章失败")
            while (true) {
                is_first = id("title_left_icon").findOne(3000)
                if (is_first) {
                    toast("开始退出操作")
                    console.log("开始退出操作");
                    is_first.click()
                } else {
                    break
                }
            }

            return false
        }
        click(x,y)
        sleep(2000)
        if(currentActivity()  == "com.tencent.thinker.bizmodule.news.normal.NewsDetailActivity"){
            log("进入文章成功")
            toast("进入文章成功")
            break
        }
        if(currentActivity()  == "com.tencent.thinker.bizmodule.news.web.WebDetailActivity"){
            log("网络文章，退出")
            toast("网络文章，退出")
            while (true) {
                is_first = id("title_left_icon").findOne(3000)
                if (is_first) {
                    toast("开始退出操作")
                    console.log("开始退出操作");
                    is_first.click()
                } else {
                    break
                }
            }

            return false
        }

    }
    // 确保已经进入文章
    wecha_share = id("writing_comment_share_usual").findOne(2000)
    if (!wecha_share) {
        log("分享失败1")
        toast("分享失败1")

        return false
    }
    num = 0
    while (true) {
        num += 1
        if (num > 5) {
            log("分享失败2")
            toast("分享失败2")
            break
        }
        button = "id"
        vlause = "writing_comment_share_usual"
        result = control_click(button, vlause)
        sleep(2000)
        if (currentActivity() == "com.tencent.mm.ui.transmit.SelectConversationUI") {
            log("分享成功")
            toast("分享成功")
            sleep(1000)
            back()
            sleep(1000)
            break
        }
    }
    ///分享操作完成
    num = 0 
    while(true){
        num += 1
        if(num>50){
            toast("阅读异常")
            log("阅读异常")
            初始化()
            return
        }
        swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
        result = text("朋友圈") .boundsInside(0, 0, device.width, device.height * 0.8).findOne(2000);
        if(result){
            log("阅读完成")
            toast("阅读完成")
            break 
        }
    }

    while (true) {
        is_first = id("title_left_icon").findOne(3000)
        if (is_first) {
            toast("开始退出操作")
            console.log("开始退出操作");
            is_first.click()
        } else {
            break
        }
    }

    return true
  




}




function essay(need_num) {
    var w = device.width;
    var h = device.height;
    num = 0
    have_read = 0
    while (true) {
        num += 1
        if(num>500){
            break
        }
        if (have_read > need_num) {
            break
        }
        // first_video_close = id('root_layout').boundsInside(0, h * 0.2, w, h * 0.8).find(500)
        first_video_close = id('root_layout').boundsInside(0, h * 0.2, w, h * 0.8).find()
        log(first_video_close.length)
        for (j = 0; j < first_video_close.length; j++) {
            // log(1)
            button_info = first_video_close[j]


            r = button_info.bounds()
            log(r.centerX(), '----', r.centerY())
            if (id("tips_text").boundsInside(r.left, r.top, r.right, r.bottom).exists()) {
                // log(button_info.desc())
                log("视频" + button_info.desc() + "跳过")
                toast("视频" + button_info.desc() + "跳过")
                continue
            }
            
            log("开始看"+have_read+"篇")
            toast("开始看"+have_read+"篇")
            read_reult = read(r.centerX(), r.centerY())
            if (read_reult){
                have_read += 1
            }else{
                continue
            }

        }
        swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.2 + random(10, 30), random(220, 235))
        sleep(1000)

    }
}





// watch_essay()
function watch_essay() {
    toast("子任务--->看文章")
    log("子任务--->看文章")
    ////进入福利中心
    num1 = 0
    while (true) {
        num1 = 0
        // close_windows(button_arr)
        if (num1 > 5) {
            log("进入福利红包异常")
            toast("进入福利红包异常")
            初始化()
            return
        }
        button = "text"
        vlause = "我的"
        result = control_click(button, vlause)
        close_windows(button_arr)
        button = "text"
        vlause = "福利红包"
        result = control_click(button, vlause)
        result = text("金币商城").findOne("5000")
        if (result) {
            break
        }
    }
    toast("已经进入个人中心")
    log("已经进入个人中心")
    //  防未签到
    sleep(2000)
    button = "text"
    vlause = "立即签到"
    result = control_click(button, vlause, 0, 0, device.width, device.height * 0.7)
    if (result) {
        button = "text"
        vlause = ""
        result = control_click(button, vlause)

        button = "text"
        vlause = "我知道了"
        result = control_click(button, vlause)
    }


    ///获取观看视频次数
    num1 = 0
    var numArr = null
    while (true) {
        num1 += 1
        if (num1 > 5) {
            log("查找视频次数失败")
            toast("查找视频次数失败")
            初始化()
            return

        }

        var video_title = textStartsWith("阅读文章").boundsInside(0, 0, device.width, device.height * 0.8).findOne(2000);
        if (video_title) {
            video_title1 = video_title.parent().parent().parent().parent()
            var r = video_title1.bounds()
            var video_title = textEndsWith("/10").boundsInside(r.left, r.top, r.right, r.bottom).findOne(4000)

            if (video_title) {
                var reult_str = video_title.text()
                log("reult_str+++" + reult_str)
                if (reult_str) {
                    var numArr = reult_str.match(/\d+/g)
                    log("numArr---->" + numArr)
                    break
                }
            }
        }
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
    }

    if (!numArr) {
        log("查找视频次数失败2")
        toast("查找视频次数失败2")
        初始化()
        return
    }
    初始化()
    log(numArr)
    look_num = numArr[1] - numArr[0]
    log(look_num)
    toast("获取观看文章次数" + look_num)
    log("获取观看看文章次数" + look_num)
    essay(look_num+5)
   
}

/*--------------------------------video------------------------------*/
/*---------------------------------star-------------------------------*/
function is_login() {
    login_result = read_cfg_j(app_name,"have_login")
    if(login_result=="yes"){
    	toast("读取--已登录")
        log("读取--已登录")
        return true
    }

    result = textContains("未登录").findOne(3000)
    if (result) {
        return false
    } else {
        write_cfg_j(app_name,"have_login","yes")
        return true
    }

}

function 启动线程(type, sign) {

    button = "text"
    vlause = "我知道了"

    index_page = "com.tencent.reading.activity.SplashActivity"
    index_page2 = "com.tencent.reading.push.permission.guide.PermissionGuideDialogActivity"
    index_page3 = "com.android.packageinstaller.permission.ui.GrantPermissionsActivity"
    inspect_app(app_name, index_page, button, vlause, index_page2, index_page3)
    close_windows(button_arr)
    result = is_login()

    if (!result) {
        log("进行登录操作")
        toast("进行登录操作")
        login()
        初始化()
        close_windows(button_arr)
    }
    close_windows(button_arr)

    var istype = type || 2;
    var issign = sign || 0;
    if (issign == 1) {
        log("签到--子任务中签")
        toast("签到--子任务中签")
        // sign_work()
        // 初始化()

    }
    // // 文章
    if (istype == 1) {
        console.log("不支持文章操作");
        return
    }
    if (istype == 2) {
        watch_essay()
        watch_video()
        
    }
}


// login()
// close_windows(button_arr)
// sign_work()
// invite()

// 启动线程(2,1)

// watch_video()   
// click(device.width*0.075,device.height*0.06)