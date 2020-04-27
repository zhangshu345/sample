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
} else {
    log("公共函数实例化失败,程序返回")
}
app_name = "天天爱清理"
var button_arr = [
    ['id', 'iv_close', 1], //新人红包
    ['id', 'iv_close', 1], //新人红包
    ['text', '以后更新', 1], //更新
]

function 初始化() {
    while(true){
        // idnex_button  = id("image_red_bg_icon").findOne(500)
        // if(idnex_button){
        //     log("初始化完成")
        //     toast("初始化完成")
        //     break
        // }

        while (true) {
            is_first = id("btn_back").findOne(1000)
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
        vlause = "视频"
        result = control_click(button, vlause)
        idnex_button  = id("image_red_bg_icon").findOne(500)
        if(idnex_button){
            log("初始化完成")
            toast("初始化完成")
            break
        }

    }
    
}

/*---------------------------------login-------------------------------*/





// login()
function login() {
    
    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)
    close_windows(button_arr)
    button = "text"
    vlause = "立即登录"
    result = control_click(button, vlause)
    button = "text"
    vlause = "确定"
    result = control_click(button, vlause)

    sleep(2000)

    // WeChat_button_list = text("微信").find(3000);
    WeChat_button_list = text("微信").find();
    for (j = 0; j < WeChat_button_list.length; j++) {
        log(j)
        WeChat_button = WeChat_button_list[j]
        if(j == WeChat_button_list.length-1) {
            var xy_info = WeChat_button.bounds()
            log(xy_info.centerX(),"-----",xy_info.centerY())
            click(xy_info.centerX(),xy_info.centerY())
        } 
    }

    button = "text"
    vlause = "微信一键登录"
    result = control_click(button, vlause)

    wechat_agree()


}
/*---------------------------------login-------------------------------*/
/*--------------------------------sign------------------------------*/
// sign_work()
function sign_work() {
    sign_reullt = read_cfg_j(app_name, "have_sign")
    if (sign_reullt == "yes") {
        toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }


    button = "text"
    vlause = "赚钱"
    result = control_click(button, vlause)
    // close_windows(button_arr)
    button_info = textContains("已签到").findOne(3000);
    if(button_info){
        log("签到成功")
        toast("签到成")
        write_cfg_j(app_name, "have_sign", "yes")
        back()
    }

    write_cfg_j(app_name, "have_sign", "yes")

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
    close_windows(button_arr)
    button = "text"
    vlause = "视频"
    result = control_click(button, vlause)
    while(true){
        back_butoon = text("广告").findOne(500)
        if(back_butoon){
            back()
            sleep(1000)
        }
        var c = random(10000, 15000)
        sleep(c)
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
    }

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
        first_video_close = id('root_layout').boundsInside(0, h * 0.2, w, h * 0.8).find(500)
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
    essay(look_num)
   
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
    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)
    
    result = textContains("复制").findOne(3000)
    if (!result) {
        return false
    } else {
        write_cfg_j(app_name,"have_login","yes")
        return true
    }

}

// 启动线程(2,1)
function 启动线程(type, sign) {

    button = "text"
    vlause = "同意"

    index_page = "com.jifen.open.framework.biz.main.MainActivity"
    inspect_app(app_name, index_page, button, vlause)
    close_windows(button_arr)
    result = is_login()
    if (!result) {
        log("进行登录操作")
        toast("进行登录操作")
        login()
        // 初始化()
        close_windows(button_arr)
    }
    var istype = type || 2;
    var issign = sign || 0;
    sign_work()
    // if (issign == 1) {
    //     log("签到--子任务中签")
    //     toast("签到--子任务中签")
    //     sign_work()
    //     // 初始化()

    // }
    // // 文章
    if (istype == 1) {
        console.log("不支持文章操作");
        return
    }
    if (istype == 2) {
        初始化()
        watch_video()
        
    }
}


// login()
// close_windows(button_arr)
// sign_work()
// invite()



// watch_video()   
// click(device.width*0.075,device.height*0.06)