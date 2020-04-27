/*---------------------------------lib-------------------------------*/
left = 0;
top = 0;
right = device.width;
buttom = device.height;
w = device.width;
h = device.height;
function instantiation() {
  
    yunurl = "https://gitee.com/zhangshu345012/sample/raw/v1/apps/jiajia/fucation_lib1.js"
    var r = http.get(yunurl);
    if (r.statusCode == 200) {
            return r.body.string()

    } else {
            return ""
    }
}

subapp = instantiation()
if (subapp != "") {
    eval(subapp)
    log("公共函数实例化成功")
}
else {
    log("公共函数实例化失败,程序返回")
}

var  button_arr = [
    ['text','✕',1],// X号
     ['id', 'overlay_update_close',1], //安装更新 
     ['id', 'layout_f_overlay_close',1], //注册5000金币 
     ['id','overlay_close',1],// 签到奖励 广告奖励
     ['id','overlay_update_close',1],///更新
     ['id','__overlay_divide_line_countdown_close',1],// 广告奖励


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
        button = "text"
        vlause = "✕" // 签到奖励
        result = control_click(button, vlause)
    }
    初始化()
}
/*--------------------------------sign------------------------------*/

/*--------------------------------invite------------------------------*/
function invite(user_id){
    user_id = user_id || "5013887780";
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
    close_windows(button_arr)
    button = "text"
    vlause = "任务" 
    result = control_click(button, vlause)
    button_info = textContains("签到奖励").findOne(3000);
    if(button_info){
        sleep(3000)
        button = "id"
        vlause = "overlay_close" // 签到奖励
        result = control_click(button, vlause)
        初始化()
    }
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




        num1 += 2
        console.log("看广告---异常检测次数" + num1);
        toast("numnumnum----"+num1)
        if (num1 > 3) {
            console.log('看广告---循环检测失败');
            toast("检测失败")
            初始化()
            return
        }

        //看完标志
        break_button = text("看视频赚金币(20/20)").findOne(500)
        if (break_button) {
            console.log("已完成");
            初始化()
            return
        }

        var video_title = textStartsWith("看视频赚金币(").boundsInside(left, top, right, device.height * 0.8).findOne(1000)
        if (video_title) {
            var reult_str = video_title.text()
            if (reult_str) {
                var numArr = reult_str.match(/\d+/g)
                break
            }

        }
        close_windows(button_arr)
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
    }
    log(numArr)
    look_num = numArr[1] - numArr[0]
    log(look_num)
    // look_num = 10
    console.log("看广告---执行看视频的次数是" + look_num);
    for (j = 0; j < look_num; j++) {
        console.log("当前看视频的次数是:" + j);
        var video_title = textStartsWith("看视频赚金币(").boundsInside(left, top, right, device.height).findOne(5000);
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
                初始化()
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
            click(device.width*0.1,device.height*0.07)
            // click(device.width*0.075,device.height*0.06)
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
            get_reward = id("overlay_close").findOne(8000)
            if (get_reward) {
                log("领取奖励")
                toast("领取奖励")
                button = "id"
                vlause = "overlay_close"
                result = control_click(button, vlause)
            } else {
                log("异常3")
                toast("异常3")
            }
            get_reward = id("overlay_close").findOne(1000)
            if (!get_reward) {
                break
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

}

/*--------------------------------video------------------------------*/
/*---------------------------------star-------------------------------*/
function is_login(){
    login_result = read_cfg_j(app_name,"have_login")
    if(login_result=="yes"){
    	toast("读取--已登录")
        log("读取--已登录")
        return true
    }
    result = textContains("微信登录").findOne(3000)
    if(result){
        return false
    }else{
        write_cfg_j(app_name,"have_login","yes")
        return true
    }

}
function 启动线程(type, sign) {

	button = "text"
	vlause = "同意并继续"
	app_name = "淘金号"
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
        // sign_work()

    }
    // 文章
    if (istype == 1) {
        console.log("不支持文章操作");
        return
    }
    if (istype == 2) {
        watch_video()
        while(true){

            result = text("推荐").findOne(500)
            if(!result){
                初始化()
                continue
            }
            var c = random(10000, 15000)
            sleep(c)
            close_windows(button_arr)
            log("淘金号上滑")
            toast("淘金号上滑")
            swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
        }
        

    }
}


// login()
// close_windows(button_arr)
// sign_work()
// invite()

// 启动线程(2,1)

// watch_video()   
// click(device.width*0.075,device.height*0.06)

