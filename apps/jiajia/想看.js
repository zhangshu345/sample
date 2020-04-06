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
} else {
    log("公共函数实例化失败,程序返回")
}
w = device.width;
h = device.height;


var button_arr = [
    ['id', 'cash_close', 1], // 3毛体现关闭
    ['text', '我知道了', 1],
    ['id', 'closeIv', 1],
    ['id', 'btn_close', 1], // 阅读日
    ['id', ' iv_close', 1], //关闭签到
    ['id', 'fudai_icon', 1],
    ['id', 'more_minute_btn', 1],
    ['id', 'openPermissionTv', 2],
    ['id', 'cash_action', 2],
    ['id', 'constraintLayout2', 2],
    ['id', 'btn_close', 1],
    ['id', 'close_iv', 1],
    ['id', 'close_btn', 1],
    ['id', ' btn_close', 1], // 武汉祈福

]


app_name = "想看"
var w = device.width;
var h = device.height;

function 初始化() {
    close_windows(button_arr)
    while (true) {
        is_first = id("img_back").findOne(3000)
        if (is_first) {
            is_first.click()
        } else {
            break
        }
    }
    result = control_click(button, vlause)
    button = "text"
    vlause = "首页"


}



function 弹窗() {
    if (id("fudai_icon").exists()) {
        log("检测到福袋")
        id("fudai_icon").findOne(1000).click()
        sleep(1000)
        if (id("more_minute_btn").exists()) {
            id("more_minute_btn").findOne(1000).click()
            sleep(1000)
        }
    }
    if (id("more_minute_btn").exists()) {
        log("检测到继续观看")
        id("more_minute_btn").findOne(1000).click()
        sleep(1000)
    }
    //推送弹窗|新版本
    if (id("openPermissionTv").exists()) {
        // id("openPermissionTv").findOne(1000).click()
        log("检测到新版本")
        back()
        sleep(1000)
    }
    //发现提现提醒
    if (id("cash_action").exists()) {
        // id("cash_action").findOne(1000).click()
        log("检测到提现提醒")
        back()
        sleep(1000)
    }
    if (id("constraintLayout2").exists()) {
        // id("cash_action").findOne(1000).click()
        back()
        sleep(1000)
    }
    if (id("btn_close").exists()) {
        log("检测到关闭窗")
        back()
        sleep(1000)
    }
    //签到框
    // if (id("iv_close").exists()) {
    //     log("检测到签到框")
    //     back()
    //     sleep(1000)
    // }
    //好友提醒
    if (id("close_iv").exists()) {
        log("检测到好友提醒")
        id("close_iv").findOne(1000).click()
        // back()
        sleep(1000)
    }
    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()) {
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }
    }
    sleep(1000)
}

function 文章详情() {
    var i = 0
    while (true) {
        if (i > 40) {
            back()
            break
        }
        sleep(3000)
        i = i + 3
        弹窗()
        swipe(w * 0.6, h * 0.8, w * 0.6, h * 0.6, random(220, 335))
    }
}

function 文章() {
    while (true) {
        var c = id("tvTitle").boundsInside(0, 0, w, h).find()
        log(c.length)
        sleep(1000)
        for (var i = 0; i < c.length; i++) {
            log(i)
            log("标题：" + c[i].text())
            var d = c[i].parent()
            if (d == null) {
                continue
            }
            var b = d.bounds()
            log(b)
            if (id("video_item_play_btn").boundsInside(b.left, b.top, b.right, b.bottom).exists()) {
                log("本内容为视频，不予播放")
                continue
            }
            if (id("tv_download_state").boundsInside(b.left, b.top, b.right, b.bottom).exists()) {
                log("检测到广告内容，跳过")
                continue
            }
            if (id("tvInfo").boundsInside(b.left, b.top, b.right, b.bottom).textContains("广告").exists()) {
                log("发现广告内容，跳过")
                continue
            }
            if (b.width() != w) {
                log("检测到异常文章，文章不阅读")
                continue
            }
            sleep(1000)
            log("检测到文章")
            弹窗()
            click(b.centerX(), b.centerY())
            文章详情()
        }
        sleep(1000)
        弹窗()
        金币()
        sleep(1000)
        弹窗()
        // swipe(w * 0.6, h * 0.8, w * 0.6, h * 0.5, random(220, 235))
        swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))

    }

}

//我的金币
function 我的金币() {
    sleep(1000)
    if (id("tv_tab_title").textContains("我的").exists()) {
        var d = id("tv_tab_title").textContains("我的").findOne(1000)
        var c = d.parent()
        if (c) {
            var b = c.bounds()
            sleep(500)
            click(b.centerX(), b.centerY())
            sleep(2000)
            var coin = id("myCoinTv").findOne(1000)
            if (coin) {
                b = coin.bounds()
                sleep(500)
                click(b.centerX(), b.centerY())
                sleep(2000)
                //查找今日收益
                var e = textContains("今日金币").findOne(1000)
                if (e) {
                    log("检测到今日金币")
                    log(e.text())
                    var num = e.text().replace(/[^0-9]/ig, "")
                    log(num)
                }
                sleep(1000)
                back()
                sleep(2000)
            }
        }
    }
    if (id("tv_tab_title").textContains("首页").exists()) {
        var d = id("tv_tab_title").textContains("首页").findOne(1000)
        var c = d.parent()
        if (c) {
            var b = c.bounds()
            sleep(500)
            click(b.centerX(), b.centerY())
            sleep(2000)
        }
    }
}

//定时金币
function 金币() {
    var jb = id("tv_box_time_new").findOne(2000)
    if (jb) {
        if (jb.text() == "领金币") {
            var b = jb.bounds()
            click(b.centerX(), b.centerY())
        }

    }
}
//点击到该页面自动签到

function 签到() {
    sign_reullt = read_cfg_j(app_name, "have_sign")
    if (sign_reullt == "yes") {
        toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }
    sleep(1000)
    var c = id("tab_icon_img").findOne(1000)
    if (c) {
        var b = c.bounds()
        sleep(500)
        click(b.centerX(), b.centerY())
        sleep(2000)
        弹窗()
    }
    if (id("tv_tab_title").textContains("首页").exists()) {
        var d = id("tv_tab_title").textContains("首页").findOne(1000)
        var c = d.parent()
        if (c) {
            var b = c.bounds()
            sleep(500)
            click(b.centerX(), b.centerY())
            sleep(2000)
        }
    }
    write_cfg_j(app_name, "have_sign", "yes")
}
///////////
// watch_video()



function watch_video() {
    num = 0
    while (true) {
        num += 1
        if (num > 5) {
            log("进入视频页面失败")
            toast("进入视频页面失败")
            初始化()
            return
        }
        close_windows(button_arr)
        button = "text"
        vlause = "视频"
        result = control_click(button, vlause, 0, device.height * 0.5, device.width, device.height)
        if (result) {
            break
        }

    }

    while (true) {
        is_first = id("img_back").findOne(500)
        if (is_first) {
            is_first.click()
        }
        result = id("video_item_play_btn").boundsInside(0, device.height * 0.2, device.width, device.height * 0.6).findOne(3000)
        if (!result) {
            button = "text"
            vlause = "视频"
            result = control_click(button, vlause, 0, device.height * 0.5, device.width, device.height)
            swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
        } else {
            sleep(500)

            button = "id"
            vlause = "video_item_play_btn"//  播放按钮
            // vlause = "iv_comment_icon" //  评论按钮
            result = control_click(button, vlause, 0, h * 0.5, w, h)


            result = id("comment_bar_share_wx").findOne(3000)
            if (!result) {
                toast("观看视频失败1")
                log("观看视频失败1")
                video_button = text("视频").findOne(3000)
                if (video_button) {
                    button = "text"
                    vlause = "视频"
                    result = control_click(button, vlause, 0, device.height * 0.5, device.width, device.height)
                    sleep(1000)
                    swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
                    continue
                }
                is_first = id("img_back").findOne(3000)
                if (is_first) {
                    is_first.click()
                    continue
                }
                num = 0
                while (true) {
                    back()
                    button = "text"
                    vlause = "视频"
                    result = control_click(button, vlause, 0, device.height * 0.5, device.width, device.height)
                    sleep(1000)
                    swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
                    if (result) {
                        break
                    }
                    num += 1
                    if (num > 5) {
                        log("进入视频页面失败")
                        toast("进入视频页面失败")
                        初始化()
                        return
                    }
                    close_windows(button_arr)
                }

            } else {
                log("正在观看")
                toast("正在观看")
                num = 0
                while (true) {
                    log("观看中.....")
                    toast("观看中.....")
                    sleep(2000)
                    button = "id"
                    vlause = "fudai_icon"
                    result = control_click(button, vlause)
                    if (result) {
                        sleep(3000)
                        num = 0
                        while (true) {
                            num += 1
                            if (num > 5) {
                                back()
                                break
                            }
                            button = "text"
                            vlause = "继续阅读"
                            result1 = control_click(button, vlause)
    
                            button = "id"
                            vlause = "iv_close"
                            result2 = control_click(button, vlause)
                            if (result1 || result2) {
                                break
                            }
                        }
                    }
                    Continue_button =  text("继续阅读").findOne(500)
                    button = "text"
                    vlause = "继续阅读"
                    result = control_click(button, vlause)
                    num += 1
                    if (num > 20) {
                        break
                    }
                    watch_button = text("重新播放").findOne(1000)
                    if (watch_button) {
                        break
                    }
                }
                // button = "id"
                // vlause = "fudai_icon"
                // result = control_click(button, vlause)
                // if (result) {
                //     sleep(3000)
                //     num = 0
                //     while (true) {
                //         num += 1
                //         if (num > 5) {
                //             back()
                //             break
                //         }
                //         button = "text"
                //         vlause = "继续阅读"
                //         result1 = control_click(button, vlause)

                //         button = "id"
                //         vlause = "iv_close"
                //         result2 = control_click(button, vlause)
                //         if (result1 || result2) {
                //             break
                //         }
                //     }
                // }
                ////// 

                button = "text"
                vlause = "继续阅读"
                result = control_click(button, vlause)
                button = "id"
                vlause = "iv_close"
                result = control_click(button, vlause)

                while (true) {
                    is_first = id("img_back").findOne(3000)
                    if (is_first) {
                        is_first.click()
                    }else{
                        back()
                    }
                    sleep(1000)
                    var current_Activity = currentActivity()
                    if(current_Activity == "com.bikan.reading.activity.MainActivity"){
                        break
                    }
                    
                }
                swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
                sleep(2000)
            }
        }



    }





}





function appinit() {
    sleep(2000)
    back()
    sleep(2000)
    弹窗()
}

function is_login() {
    login_result = read_cfg_j(app_name, "have_login")
    if (login_result == "yes") {
        toast("读取--已登录")
        log("读取--已登录")
        return true
    }

    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)
    result = text("我的金币").findOne(2000)
    if (result) {
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)
        write_cfg_j(app_name, "have_login", "yes")
        return true
    }
    button = "text"
    vlause = "首页"
    result = control_click(button, vlause)
    return false
}
// 启动线程(1,1)
function 启动线程(type, sign) {



    button = "text"
    vlause = "我知道了"
    // app_name = "想看"
    index_page = "com.bikan.reading.activity.MainActivity"
    index_page2 = "com.bikan.reading.activity.PushPermissionDialogActivity"

    inspect_app(app_name, index_page, button, vlause, index_page2)
    close_windows(button_arr)
    toast("88888888888888888888888")
    result = is_login()
    if (!result) {
        login()
        close_windows(button_arr)
        button = "id"
        vlause = "white_back"
        result = control_click(button, vlause)

        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)
    }


    // exports.启动线程=function (type,sign){
    var istype = type || 1;
    var issign = sign || 0;
    // appinit()
    签到()
    // if (issign == 1) {
    //     log("开始签到")
    //     签到()
    //     log("结束签到")
    // }
    sleep(500)
    if (istype == 1) {
        log("开始文章")
        // 文章()
        watch_video()
    }
    if (istype == 2) {
        log("本模块暂不支持视频")
        // 视频()
    }
}
//----------------------------------------//


function invite(user_id) {
    user_id = user_id || "5O5RZ92";
    button = "text"
    vlause = "我知道了"
    app_name = "想看"
    index_page = "com.bikan.reading.activity.MainActivity"
    inspect_app(app_name, index_page, button, vlause)
    //新人红包
    button = "id"
    vlause = "close_btn"
    result = control_click(button, vlause)
    // 阅读翻倍
    button = "id"
    vlause = "iv_close"
    result = control_click(button, vlause)

    // 赚金币  
    button = "text"
    vlause = "赚金币"
    result = control_click(button, vlause)

    // 签到成功
    button = "id"
    vlause = "iv_close"
    result = control_click(button, vlause)

    // 上滑控件寻找
    invite_button = false
    num = 1
    while (true) {
        num += 1
        if (num > 7) {
            break
        }
        var w = device.width;
        var h = device.height;
        left = 0;
        top = 0;
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
        invite_button = text("去填写").boundsInside(left, top, device.width, device.height * 0.8).findOne(500)
        if (invite_button) {
            break
        }
    }
    if (invite_button) {
        button = "text"
        vlause = "去填写"
        result = control_click(button, vlause)
    } else {
        toast("邀请失败")
        log("邀请失败")
        return
    }

    button = 'id'
    vlause = 'et_input_invitation_code'
    control_input(button, vlause, user_id)

    // 确认
    button = "id"
    vlause = "tv_confirm_commit"
    result = control_click(button, vlause)

    message = text("成功填写邀请码").findOne(3000)
    if (message) {
        console.log("邀请成功");
        toast("邀请成功")
    }

}

function login() {

    // //新人红包
    // button = "id"
    // vlause = "close_btn"
    // result = control_click(button, vlause)  
    // // 阅读翻倍
    // button = "id"
    // vlause = "iv_close"
    // result = control_click(button, vlause)  
    // // 新人体现
    // button = "id"
    // vlause = "cash_close"
    // result = control_click(button, vlause)  

    // 进入个人中心
    // button = "text"
    // vlause = "我的"
    // result = control_click(button, vlause)  
    // sleep(3000)
    result = text("微信登录").findOne(1000)
    if (result) {
        button = "text"
        vlause = "微信登录"
        result = control_click(button, vlause)
    }

    sleep(2000)
    // 微信一键登录
    result = text("微信一键登录").findOne(1000)
    if (result) {
        button = "text"
        vlause = "微信一键登录"
        result = control_click(button, vlause)
        if (!result) {
            console.log("已经登录");
            toast("已经登录")
            return
        }

        // 微信授权 
        wechat_agree()
    }

}
// login()



// invite()
// 启动线程(1, 1)