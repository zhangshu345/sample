/*---------------------------------lib-------------------------------*/
left = 0;
top = 0;
right = device.width;
buttom = device.height;
w = device.width;
h = device.height;
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
     ['id', 'overlay_update_close',1], //安装更新 
     ['id', 'layout_f_overlay_close',1], //注册5000金币 
     ['id','__overlay_divide_line_countdown_close',1],// 签到关闭按钮？
     ['id','overlay_update_close',1],// 升级关闭按钮
     ['id','overlay_close',1],// 广告奖励


]

function 初始化(){
    close_windows(button_arr)
    button = "text"
    vlause = "首页"
    result = control_click(button, vlause)
}

/*---------------------------------login-------------------------------*/
function login(){
    button = "text"
	vlause = "微信登录立得0.5元"
    result = control_click(button, vlause)
    wechat_agree()
    while (true) {
        is_first = id("base_actionbar_up").findOne(3000)
        if (is_first) {
            button = "id"
            vlause = "base_actionbar_up"
            result = control_click(button, vlause)
        } else {
            break
        }
    }
}
/*---------------------------------login-------------------------------*/
/*--------------------------------sign------------------------------*/
function sign_work(){
    button = "text"
	vlause = "任务"
    result = control_click(button, vlause)

    button_info = textContains("签到奖励").findOne(3000);
    if(button_info){
        sleep(3000)
        button = "id"
        // vlause = "overlay_close" // 签到奖励
        vlause = "__overlay_divide_line_countdown_close" // 签到奖励
        result = control_click(button, vlause)
    }
    初始化()
}
/*--------------------------------sign------------------------------*/

/*--------------------------------invite------------------------------*/
function invite(user_id){
    user_id = user_id || "13887780";
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
    if(!result){
        toast("邀请失败")
        log("邀请失败")
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)
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
function watch_video(){
    toast("子任务")
    log("子任务")
    num1 = 0
    while (true) {

        close_windows(button_arr)
        button = "text"
        vlause = "任务" 
        result = control_click(button, vlause)
        // 签到相关
        // button_info = textContains("签到奖励").findOne(3000);
        // if(button_info){
        //     sleep(3000)
        //     button = "id"
        //     vlause = "overlay_close" // 签到奖励
        //     result = control_click(button, vlause)
        // }
        // button = "text"
        // vlause = "首页"
        // result = control_click(button, vlause)




        num1 += 1
        console.log("看广告---异常检测次数" + num1);
        if (num1 > 2) {
            console.log('看广告---循环检测失败');
            // button = "text"
            // vlause = "首页"
            // result = control_click(button, vlause)
            初始化()
            return
            // return
        }

        //看完标志
        break_button = text("看视频赚金币(20/20)").findOne(500)
        if (break_button) {
            console.log("已完成");
            close_windows(button_arr)
            button = "text"
            vlause = "首页"
            result = control_click(button, vlause)
            return
        }

        var video_title = textStartsWith("看视频赚金币(").boundsInside(left, top, right, device.height * 0.8).findOne(500)
        if (video_title) {
            var reult_str = video_title.text()
            if (reult_str) {
                var numArr = reult_str.match(/\d+/g)
                break
            }

        }
        close_windows(button_arr)
        // swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
    }
    log(numArr)
    look_num = numArr[1] - numArr[0]
    log(look_num)

    console.log("看广告---执行看视频的次数是" + look_num);
    for (j = 0; j < look_num; j++) {
        console.log("当前看视频的次数是:" + j);
        var video_title = textStartsWith("看视频赚金币(").boundsInside(left, top, right, device.height * 0.8).findOne(5000);
        if(!video_title){
            console.log("点击观看异常！！！");
            toast("点击观看异常！！！")
            continue
        }
        first_video_parent = video_title.parent()
        var r = first_video_parent.bounds()
        num = 0
        while (true) {
            width = device.width;
            height = device.height;
            num += 1
            if (num > 5) {
                log("点击观看异常")
                toast("点击观看异常")
                // 初始化()
                return
            }
            video_button = text("去观看").boundsInside(r.left, r.top, r.right, r.bottom).findOne(4000)
            if (video_button) {
                // log("点击 '去观看' ")
                // toast("点击 '去观看' ")
                // video_button.click()
                button = "text"
                vlause = "去观看"
                result = control_click(button, vlause)
                sleep(3000)

            }
            video_button = text("去观看").boundsInside(r.left, r.top, r.right, r.bottom).findOne(1000)
            if (!video_button) {
                break
            }
        }
        // 广告的活动页面 com.qq.e.ads.PortraitADActivity
        // 外部的页面是 com.boda.cvideo.controller.MainActivity
        //  关闭的坐标  75/125  720,1520
        num = 0
        while (true) {
            console.log("检测关闭中");
            toast("检测关闭中")
            log("-------->"+num)
            num += 1
            sleep(1000)
            if (num > 15) {
                // log("观看异常")
                // toast("观看异常")
                // click(device.width*0.88,device.height*0.085)
                初始化()
                // back()
                break
            }
            button = "id"
            vlause = "tt_video_ad_close"
            result = control_click(button, vlause)
            if (result) {
                log("退出广告")
                toast("退出广告")
                break
            }
            button = "id"
            vlause = "tt_video_ad_close_layout"
            result = control_click(button, vlause)
            if (result) {
                log("退出广告")
                toast("退出广告")
                break
            }
            // click(device.width*0.1,device.height*0.08)
            click(device.width*0.075,device.height*0.06)
            sleep(1000)
            if(currentActivity() =="com.boda.cvideo.controller.MainActivity"){
                toast("通过盲点跳出")
                log("通过盲点跳出")
                break
            }




        }
        num = 0
        while (true) {
            num += 1
            if (num > 50) {
                log("异常4")
                toast("异常4")
                初始化()
                return
            }
            get_reward = id("__overlay_divide_line_countdown_close").findOne(3000)
            if (get_reward) {
                log("领取奖励")
                toast("领取奖励")
                button = "id"
                vlause = "__overlay_divide_line_countdown_close"
                result = control_click(button, vlause)
                break
            } else {
                log("异常3")
                toast("异常3")
            }
            get_reward = id("overlay_close").findOne(3000)
            if (get_reward) {
                log("领取奖励")
                toast("领取奖励")
                button = "id"
                vlause = "overlay_close"
                result = control_click(button, vlause)
                break
            } else {
                log("异常3")
                toast("异常3")
            }

        }

        while (true) {
            sleep(2000)
            is_first = textContains("00:").findOne(3000)
            if (is_first) {
                toast("技能冷却中")
                console.log("技能冷却中");
            } else {
                break
            }
        }

    }
    初始化()

}

/*--------------------------------video------------------------------*/
/*---------------------------------star-------------------------------*/
function is_login(){
    result = textContains("微信登录").findOne(3000)
    if(result){
        return false
    }else{
        return true
    }

}
function 启动线程(type, sign) {

	button = "text"
	vlause = "同意并继续"
	app_name = "刷视频"
    index_page = "com.android.packageinstaller.permission.ui.GrantPermissionsActivity"
    index_page2 = "com.boda.cvideo.controller.MainActivity"
    inspect_app(app_name, index_page, button, vlause,index_page2)
    close_windows(button_arr)
    result = is_login()

    if(!result){
        log("进行登录操作")
        toast("进行登录操作")
        login()
        close_windows(button_arr)
    }
    close_windows(button_arr)

    var istype = type || 2;
    var issign = sign || 0;
    if (issign == 1) {
        log("签到")
        toast("签到")
        sign_work()

    }
    // 文章
    if (istype == 1) {
        console.log("不支持文章操作");
        return
    }
    if (istype == 2) {
        watch_video()
        while(true){
            log("刷视频上滑")
            toast("刷视频上滑")
            var c = random(10000, 15000)
            sleep(c)
            close_windows(button_arr)
            swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
        }
        

    }
}


// login()
// close_windows(button_arr)
// sign()
// invite()

// 启动线程(2,1)

// watch_video()



